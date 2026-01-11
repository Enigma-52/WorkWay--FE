import compression from "compression";
import express from "express";
import { isbot } from "isbot";
import mixpanel from "mixpanel-browser";

// Create an instance of the Mixpanel object, your token is already added to this snippet
mixpanel.init('572f2bc3511f9a768d95e72b7e925c37', {
  autocapture: true,
  record_sessions_percent: 0,
})


// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.VITE_ENV === "dev";
const PORT = Number.parseInt(process.env.PORT || "5173");

const app = express();

app.get("/api/cron/daily", async (req, res) => {
  const secret =
    req.get("x-cron-secret") ||
    req.query.secret;

  if (secret !== process.env.CRON_SECRET) {
    return res.status(403).send("Forbidden");
  }
  res.send("OK");
});

app.get("/sitemap.xml", async (req, res) => {
  const backendUrl = "https://workway-be.onrender.com/api";

  const r = await fetch(`${backendUrl}/sitemap.xml`);
  const xml = await r.text();

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

app.use(compression());
app.disable("x-powered-by");

app.set('trust proxy', true);

// Request logging middleware
app.use((req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const method = req.method;
  const url = req.originalUrl;
  const referer = req.get('Referer') || '-';
  const timestamp = new Date().toISOString();
  if(process.env.VITE_ENV !== 'dev') {
    console.log(`[${timestamp}] ${method} ${url} | IP: ${ip} | UA: ${userAgent} | Referer: ${referer}`);
  }

  next();
});

// Allowed good crawlers - search engines, social media previews, and SEO tools
const ALLOWED_CRAWLERS = [
  // Google
  /Googlebot/i,
  /Googlebot-Image/i,
  /Googlebot-News/i,
  /Googlebot-Video/i,
  /AdsBot-Google/i,
  /Mediapartners-Google/i,
  /Google-InspectionTool/i,
  // Bing/Microsoft
  /Bingbot/i,
  /msnbot/i,
  /adidxbot/i,
  // Yahoo
  /Slurp/i,
  // Yandex
  /YandexBot/i,
  // DuckDuckGo
  /DuckDuckBot/i,
  // Baidu
  /Baiduspider/i,
  // Social media previews
  /facebookexternalhit/i,
  /Facebot/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /WhatsApp/i,
  /Slackbot/i,
  /TelegramBot/i,
  /Discordbot/i,
  // Other legitimate tools
  /Pinterest/i,
  /Applebot/i,
  // Uptime/monitoring
  /UptimeRobot/i,
  /Pingdom/i,
  // SEO tools (for site audits)
  /SemrushBot/i,
  /AhrefsBot/i,
  /MJ12bot/i,
  /DotBot/i,
  /DataForSeoBot/i,
  /Screaming Frog/i,
  /RogerBot/i,
];

// Explicitly blocked bots (AI scrapers, training bots, malicious crawlers)
const BLOCKED_BOTS = [
  // AI training/scraping bots
  /GPTBot/i,
  /ChatGPT-User/i,
  /CCBot/i,
  /anthropic-ai/i,
  /ClaudeBot/i,
  /Claude-Web/i,
  /cohere-ai/i,
  /Google-Extended/i,
  /PerplexityBot/i,
  /YouBot/i,
  // Chinese scrapers
  /Bytespider/i,
  /PetalBot/i,
  /Sogou/i,
  // Content scrapers
  /magpie-crawler/i,
  /Omgili/i,
  /omgilibot/i,
];

// Suspicious bot patterns - outdated Chrome on Windows 7 from datacenter IPs
const SUSPICIOUS_BOT_PATTERN = /Windows NT 6\.1.*Chrome\/126\.0\.6478/i;
const TENCENT_CLOUD_RANGES = /^43\.(12[89]|1[3-8][0-9]|19[01])\./;

/**
 * Check if user agent matches any pattern in the list
 */
function matchesAny(ua, patterns) {
  return patterns.some(pattern => pattern.test(ua));
}

/**
 * Bot filtering middleware
 * - Allows legitimate search engine crawlers and social media bots
 * - Blocks AI scrapers, SEO tools, and unknown bots
 */
app.use((req, res, next) => {

  const cronSecret =
    req.get("x-cron-secret") ||
    req.query.secret;

  if (cronSecret && cronSecret === process.env.CRON_SECRET) {
    return next();
  }

  const ua = req.get('User-Agent') || '';
  const ip = req.ip || req.headers['x-forwarded-for'] || '';
  const clientIp = Array.isArray(ip) ? ip[0] : ip.split(',')[0].trim();

  // Block explicitly banned bots first
  if (matchesAny(ua, BLOCKED_BOTS)) {
    res.set('X-Blocked-By', 'bot-firewall');
    if (process.env.VITE_ENV !== 'dev') {
      console.log(`[BOT BLOCKED - Explicit] IP: ${clientIp} | UA: ${ua}`);
    }
    return res.status(403).end('Forbidden');
  }

  // Block suspicious bot pattern (Chrome 126 on Windows 7 from Tencent Cloud)
  if (SUSPICIOUS_BOT_PATTERN.test(ua) && TENCENT_CLOUD_RANGES.test(clientIp)) {
    res.set('X-Blocked-By', 'bot-firewall');
    if (process.env.VITE_ENV !== 'dev') {
      console.log(`[BOT BLOCKED - Suspicious] IP: ${clientIp} | UA: ${ua}`);
    }
    return res.status(403).end('Forbidden');
  }

  // Check if it's a bot using isbot library
  if (isbot(ua)) {
    // Allow if it's a known good crawler
    if (matchesAny(ua, ALLOWED_CRAWLERS)) {
      return next();
    }

    // Block unknown bots
    res.set('X-Blocked-By', 'bot-firewall');
    if (process.env.VITE_ENV !== 'dev') {
      console.log(`[BOT BLOCKED - Unknown] IP: ${clientIp} | UA: ${ua}`);
    }
    return res.status(403).end('Forbidden');
  }

  next();
});

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
  );
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
