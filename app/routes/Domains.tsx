import { motion } from "framer-motion";
import type { Route } from "./+types/Domains";
import { getAllDomainDetails } from "~/api/services/filterService";
import DomainCard from "~/components/DomainPage/DomainCard";
import { getDomainIcon } from "~/utils/domainIcons";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  const title = "Browse Jobs by Domain | WorkWay";
  const description =
    "Explore jobs across all major domains including software engineering, design, data science, finance, marketing, operations and more. Find your next role on WorkWay.";

  const canonicalUrl = "https://www.workway.dev/domains";
  const ogImage = "https://www.workway.dev/logo.png";

  return [
    { title },
    { name: "description", content: description },
    { rel: "canonical", href: canonicalUrl },

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

export async function loader({ request }: Route.LoaderArgs): Promise<any> {
  try {
    const res = await getAllDomainDetails({ fetchRequest: request });
    const data = res?.data;
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export default function Domains() {
  const domains = useLoaderData<any>();
  if (!domains) return null;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pb-20 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Browse Jobs by <span className="text-primary">Domain</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore opportunities across every industry and specialization.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {domains.map((d: any, index: number) => {
              const Icon = getDomainIcon(d.domain);

              return (
                <DomainCard
                  key={d.slug}
                  domain={d.domain}
                  slug={d.slug}
                  icon={<Icon className="h-6 w-6" />}
                  jobCount={d.job_count}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-24 max-w-4xl"
        >
          <div className="rounded-xl border border-border bg-card/50 p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Find Your Perfect Job Domain
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                WorkWay makes job hunting simple by organizing opportunities
                across all major industries and domains. Whether you're a
                software engineer looking for your next challenge, a designer
                seeking creative opportunities, or a healthcare professional
                ready to make a difference—we've got you covered.
              </p>

              <p>
                Each domain page features curated job listings with no spam, no
                duplicate postings, and no corporate soul damage. Our
                intelligent matching system ensures you see only relevant
                opportunities that match your skills and experience.
              </p>

              <p>
                From <strong className="text-foreground">Engineering</strong>{" "}
                and <strong className="text-foreground">Design</strong> to{" "}
                <strong className="text-foreground">Healthcare</strong> and{" "}
                <strong className="text-foreground">Finance</strong>—explore
                thousands of verified positions from companies that actually
                care about hiring great talent.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Remote-friendly",
                "Verified listings",
                "No duplicates",
                "Fast applications",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
