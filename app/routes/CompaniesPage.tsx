import { useState, useMemo } from "react";
import { Building2 } from "lucide-react";
import SearchBar from "~/components/CompaniesPage/SearchBar";
import AlphabetBar from "~/components/CompaniesPage/AlphabetBar";
import FilterBar from "~/components/CompaniesPage/FilterBar";
import FeaturedSection from "~/components/CompaniesPage/FeaturedSection";
import CompanyCard from "~/components/CompaniesPage/CompanyCard";
import Pagination from "~/components/CompaniesPage/Pagination";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import {
  getCompanyOverview,
  getAllCompanies,
} from "~/api/services/companyService";
import type { Route } from "./+types/CompaniesPage";

export type CompaniesLoaderData = {
  overview: any;
  list: any;
};

export function meta() {
  const title =
    "Browse Companies Hiring on WorkWay — Find Top Employers & Open Jobs";
  const description =
    "Explore thousands of companies hiring across startups and tech firms. Browse company profiles, open roles, teams, and hiring details on WorkWay.";

  const ogImage = "https://www.workway.dev/logo.png";

  return [
    // Basic
    { title },
    { name: "description", content: description },

    // OpenGraph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
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
}: Route.LoaderArgs): Promise<CompaniesLoaderData | null> {
  try {
    const url = new URL(request.url);

    const q = url.searchParams.get("q") || "";
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "20";
    const letter = url.searchParams.get("letter") || "ALL";
    const hiring = url.searchParams.get("hiring") || "false";

    // Call both APIs in parallel
    const [overviewRes, listRes] = await Promise.all([
      getCompanyOverview({
        fetchRequest: request,
      }),
      getAllCompanies({
        fetchRequest: request,
        q,
        page,
        limit,
        letter,
        hiring,
      }),
    ]);

    const overview = overviewRes?.data;
    const list = listRes?.data;

    if (!overview || !list) return null;

    return {
      overview,
      list,
    };
  } catch (e) {
    console.error("Companies loader failed:", e);
    return null;
  }
}

export default function CompaniesPage() {
  const data = useLoaderData<CompaniesLoaderData>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!data) return null;

  const { overview, list } = data;
  const { stats, trending, recently_added, actively_hiring } = overview;
  const { companies, meta } = list;

  const q = searchParams.get("q") || "";
  const letter = searchParams.get("letter") || "ALL";
  const hiring = searchParams.get("hiring") || "false";
  const page = Number(searchParams.get("page") || "1");

  // Helper to update URL params
  function updateParams(next: Record<string, string | null>) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "") sp.delete(k);
      else sp.set(k, v);
    });
    navigate(`?${sp.toString()}`);
  }

  // Handlers
  const handleSearchChange = (value: string) => {
    updateParams({ q: value, page: "1" });
  };

  const handleLetterClick = (l: string | null) => {
    updateParams({ letter: l ?? "ALL", page: "1" });
  };

  const handleHiringFilterChange = (value: string) => {
    updateParams({ hiring: value === "hiring" ? "true" : "false", page: "1" });
  };

  const handlePageChange = (p: number) => {
    updateParams({ page: String(p) });
  };

  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-hero">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                Browse Companies Hiring on{" "}
                <span className="text-gradient">WorkWay</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                <span className="font-mono text-primary">
                  {overview.stats.total_companies.toLocaleString()}
                </span>{" "}
                companies •{" "}
                <span className="font-mono text-primary">
                  {overview.stats.total_jobs.toLocaleString()}
                </span>{" "}
                open jobs • Startups to large tech firms
              </p>

              <div className="mt-8">
                <SearchBar value={q} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
        </section>

        {/* <AlphabetBar
          activeLetter={letter === "ALL" ? null : letter}
          onLetterClick={handleLetterClick}
          availableLetters={new Set()} // optional: can compute later from backend
        /> */}

        <div className="container mx-auto px-4 py-8">
          {/* Featured */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <FeaturedSection
              title="Trending Companies"
              icon="trending"
              companies={trending}
            />
            <FeaturedSection
              title="Recently Added"
              icon="new"
              companies={recently_added}
            />
            <FeaturedSection
              title="Actively Hiring"
              icon="hiring"
              companies={actively_hiring}
            />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <FilterBar
              hiringFilter={hiring === "true" ? "hiring" : "all"}
              sortBy={"jobs"} // you can remove sort from UI or keep disabled
              onHiringFilterChange={handleHiringFilterChange}
              onSortChange={() => {}}
            />
          </div>

          {/* Result count */}
          <div className="mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Showing{" "}
              <span className="font-mono text-foreground">{meta.total}</span>{" "}
              companies
            </span>
          </div>

          {/* Grid */}
          {companies.length > 0 ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {companies.map((company: any) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>

              <Pagination
                currentPage={meta.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="py-16 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                No companies found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try searching: Jane Street, Duolingo , Anthropic
              </p>
            </div>
          )}
          <div className="mt-16 rounded-xl border border-border bg-card/30 p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Discover Top Hiring Companies on WorkWay
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              WorkWay indexes hundreds of companies hiring across startups and
              enterprises. Discover companies, explore their open roles, and
              learn about their teams, culture, and tech stacks. From
              fast-growing startups to established tech giants, find your next
              opportunity at companies that are actively looking for talent like
              you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
