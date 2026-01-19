import { useState, useMemo } from "react";
import { Code2, Briefcase, TrendingUp } from "lucide-react";
import { JobCard } from "~/components/DomainPage/JobCard";
import { JobFilters } from "~/components/DomainPage/JobFilters";
import { JobPagination } from "~/components/DomainPage/JobPagination";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/DomainPage";
import { getDomainJobs } from "~/api/services/filterService";

export function meta({ data, location, params }: Route.MetaArgs) {
  if (!data) {
    return [{ title: "Jobs — WorkWay" }];
  }

  const { domain, meta } = data as any;

  const url = new URL(
    location.pathname + location.search,
    "https://www.workway.dev",
  );

  const page = url.searchParams.get("page");
  const employment_type = url.searchParams.get("employment_type");
  const employment_level = url.searchParams.get("employment_level");
  const locationFilter = url.searchParams.get("location");

  const domainName = domain?.name || "Jobs";
  const total = meta?.total || 0;

  // Base title
  let title = `${domainName} Jobs (${total.toLocaleString()} Open Roles) | WorkWay`;

  // Base description
  let description = `Browse ${total.toLocaleString()} open ${domainName.toLowerCase()} jobs across top companies. Find the latest roles, apply directly, and explore opportunities on WorkWay.`;

  // Filter-aware refinements (but still indexable)
  const parts: string[] = [];

  if (employment_level && employment_level !== "all") {
    parts.push(employment_level);
  }
  if (employment_type && employment_type !== "all") {
    parts.push(employment_type);
  }
  if (locationFilter && locationFilter !== "all") {
    parts.push(`in ${locationFilter}`);
  }

  if (parts.length > 0) {
    const suffix = parts.join(" ");
    title = `${domainName} Jobs ${suffix} | WorkWay`;
    description = `Browse ${domainName.toLowerCase()} jobs ${suffix}. Find open roles across top companies and apply on WorkWay.`;
  }

  // Pagination
  if (page && page !== "1") {
    title = `${title} — Page ${page}`;
  }

  const canonicalUrl = `https://www.workway.dev${location.pathname}${location.search}`;

  const ogImage = "https://www.workway.dev/logo.png"; // optional static image

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

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<any> {
  try {
    const domainSlug = params.domainSlug || "";

    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const employment_type = url.searchParams.get("employment_type") || "all";
    const employment_level = url.searchParams.get("employment_level") || "all";
    const location = url.searchParams.get("location") || "all";

    const res = await getDomainJobs({
      fetchRequest: request,
      slug: domainSlug,
      page,
      employment_type,
      employment_level,
      location,
    });

    const data = res?.data;
    return data && Object.keys(data).length > 0 ? data : null;
  } catch (e) {
    return null;
  }
}

export default function DomainPage() {
  const data = useLoaderData<any>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!data) return null;

  const { domain, jobs, meta } = data;

  const searchQuery = searchParams.get("q") || "";
  const experienceLevel = searchParams.get("employment_level") || "all";
  const employmentType = searchParams.get("employment_type") || "all";
  const location = searchParams.get("location") || "all";
  const currentPage = Number(searchParams.get("page") || "1");

  function updateParams(next: Record<string, string | null>) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "" || v === "all") sp.delete(k);
      else sp.set(k, v);
    });
    navigate(`?${sp.toString()}`);
  }

  const handleFilterChange = (key: string) => (value: string) => {
    updateParams({ [key]: value, page: "1" });
  };

  const handleSearchChange = (value: string) => {
    // 🔴 location is simple text search
    updateParams({ location: value || "all", page: "1" });
  };

  const clearFilters = () => {
    updateParams({
      employment_level: null,
      employment_type: null,
      location: null,
      page: "1",
    });
  };

  const activeFiltersCount = [
    experienceLevel !== "all",
    employmentType !== "all",
    location !== "all",
  ].filter(Boolean).length;

  const totalPages = meta?.total_pages || 1;

  return (
    <div className="min-h-screen bg-background ">
      {/* Hero Section (unchanged UI, only dynamic data) */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto container relative py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm text-primary">
                {domain.name}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {domain.name} <span className="text-primary">Jobs</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Browse latest {domain.name} roles across top companies.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">
                    {meta.total}
                  </span>{" "}
                  open positions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">Updated</span>{" "}
                  daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto container py-8 md:py-12">
        <div className="grid gap-8">
          <JobFilters
            searchQuery={location === "all" ? "" : location}
            onSearchChange={handleSearchChange}
            experienceLevel={experienceLevel}
            onExperienceLevelChange={handleFilterChange("employment_level")}
            employmentType={employmentType}
            onEmploymentTypeChange={handleFilterChange("employment_type")}
            location={location}
            onLocationChange={handleFilterChange("location")}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-mono text-foreground">{jobs.length}</span>{" "}
              jobs
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="grid gap-4">
              {jobs.map((job: any, index: number) => (
                <div key={job.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-secondary p-4 mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                No jobs found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline font-mono text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8">
              <JobPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => updateParams({ page: String(p) })}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
