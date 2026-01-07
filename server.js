import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
let templateHtml = "";
let ssrManifest;

if (isProduction) {
  const indexPath = path.resolve(__dirname, "./dist/client/index.html");
  const manifestPath = path.resolve(__dirname, "./dist/client/.vite/ssr-manifest.json");
  
  if (fs.existsSync(indexPath)) {
    templateHtml = fs.readFileSync(indexPath, "utf-8");
  } else {
    console.error("Production build not found. Run 'npm run build' first.");
  }
  
  if (fs.existsSync(manifestPath)) {
    ssrManifest = fs.readFileSync(manifestPath, "utf-8");
  }
}

async function createServer() {
  const app = express();

  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv(path.resolve(__dirname, "./dist/client"), { extensions: [] }));
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, "");

      let template;
      let render;
      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = templateHtml;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const rendered = await render(url, ssrManifest);
      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "");

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
        console.error(e.stack);
        res.status(500).end(e.stack);
      } else {
        // Log error server-side but don't expose details to client
        console.error("SSR Error:", e);
        res.status(500).end("Internal Server Error");
      }
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  })
);
