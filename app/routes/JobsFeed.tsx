import { Briefcase, Sparkles } from "lucide-react";
import type { Route } from "./+types/JobsFeed";

export function meta({}: Route.MetaArgs) {
  const title = "Jobs Feed — Discover New Opportunities | WorkWay";
  const description =
    "Explore a personalized feed of the latest job opportunities across top companies. The WorkWay jobs feed is coming soon.";

  const canonicalUrl = "https://www.workway.dev/jobs";

  const ogImage = "https://www.workway.dev/logo.png";

  return [
    // Basic
    { title },
    { name: "description", content: description },

    // Canonical
    { rel: "canonical", href: canonicalUrl },

    // Robots
    { name: "robots", content: "index, follow" },

    // OpenGraph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImage },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];
}

export default function JobsFeed() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                WorkWay Jobs Feed
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Your Personalized <span className="text-primary">Jobs Feed</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A smart feed of the latest and most relevant jobs across top
              companies — tailored for you.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-card/40 p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>

            <h2 className="font-display text-2xl font-semibold mb-3">
              Coming Soon
            </h2>

            <p className="text-muted-foreground max-w-md mx-auto">
              We’re building a personalized jobs feed that learns what you care
              about and surfaces the best opportunities for you. This will be
              available shortly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
