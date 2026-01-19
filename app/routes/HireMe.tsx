import { Briefcase, Sparkles, UserPlus } from "lucide-react";
import type { Route } from "./+types/HireMe";

export function meta({}: Route.MetaArgs) {
  const title = "Hire Me Profile — Create Your Hiring Profile | WorkWay";
  const description =
    "Create your Hire Me profile on WorkWay and let companies discover you. Build a professional profile, showcase your skills, and get discovered by top employers. Coming soon.";

  const canonicalUrl = "https://www.workway.dev/hireme";
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

export default function Hireme() {
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
                WorkWay Hire Me
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Create Your <span className="text-primary">Hire Me</span> Profile
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A professional profile that lets companies discover you directly —
              showcase your skills, experience, and what you want to work on.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-card/40 p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>

            <h2 className="font-display text-2xl font-semibold mb-3">
              Coming Soon
            </h2>

            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We’re building a simple, powerful “Hire Me” profile that lets you
              create a single page companies can browse and contact you from.
              This will be available shortly.
            </p>

            <div className="mx-auto max-w-md rounded-lg border border-border bg-secondary/40 p-6 text-left">
              <div className="flex items-start gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  List your skills, experience, and preferred roles
                </p>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Get discovered by companies hiring in your domain
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Share one clean WorkWay profile link instead of multiple docs
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
