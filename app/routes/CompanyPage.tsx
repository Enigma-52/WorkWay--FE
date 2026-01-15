import type { Route } from "./+types/CompanyPage";
import { CompanyHeader } from "~/components/CompanyPage/CompanyHeader";
import { TeamBreakdown } from "~/components/CompanyPage/TeamBreakdown";
import { JobsSection } from "~/components/CompanyPage/JobsSection";
import { type Company } from "~/data/companyData";
import { getCompanyDetails } from "~/api/services/companyService";
import { useLoaderData } from "react-router";

export function meta({ data, params }: Route.MetaArgs) {
  const company = data as CompanyLoaderData;
  if (!company) {
    return [{ title: "Company Not Found — WorkWay" }];
  }

  const name = company.name || params.companySlug || "Company";
  const count = company.jobListings?.length || 0;

  const title =
    count > 0
      ? `${name} Careers — ${count} Open Jobs | WorkWay`
      : `${name} Careers & Company Profile | WorkWay`;

  const description =
    count > 0
      ? `Apply to ${count} open roles at ${name}. View open jobs, teams, and hiring details on WorkWay.`
      : `Explore ${name}'s company profile, teams, and hiring information on WorkWay.`;

  const logo = company.logo_url || "/og-default.png";

  return [
    // Basic
    { title },
    { name: "description", content: description },

    // OpenGraph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: logo },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: logo },
  ];
}

type CompanyLoaderData = Company | null;

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<CompanyLoaderData> {
  try {
    const companySlug = params.companySlug || "";
    const res = await getCompanyDetails({
      fetchRequest: request,
      slug: companySlug,
    });
    const data = res?.data;
    return data && Object.keys(data).length > 0 ? (data as Company) : null;
  } catch (e) {
    return null;
  }
}

export default function CompanyPage() {
  const companyData = useLoaderData<typeof loader>();

  if (!companyData) {
    return <div>Company not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader company={companyData} />

      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Jobs */}
          <div className="lg:col-span-2 animate-fade-in">
            <JobsSection jobs={companyData.jobListings} />
          </div>

          {/* Sidebar - Team Breakdown */}
          <aside
            className="lg:col-span-1 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="sticky top-6">
              <TeamBreakdown jobs={companyData.jobListings} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
