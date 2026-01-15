import { CompanyHeader } from "~/components/CompanyPage/CompanyHeader";
import { TeamBreakdown } from "~/components/CompanyPage/TeamBreakdown";
import { JobsSection } from "~/components/CompanyPage/JobsSection";

import { getCompanyDetails } from "~/api/services/companyService";
import { useLoaderData } from "react-router";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { companySlug: string };
}) {
  try {
    const companySlug = params.companySlug || "";
    console.log("companySlug", companySlug);
    const res = await getCompanyDetails({
      fetchRequest: request,
      slug: companySlug,
    });
    console.log("res", res);
    return res?.data;
  } catch (e) {
    return null;
  }
}

export default function CompanyPage() {
  const companyData = useLoaderData<any>();

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

// export default function CompanyPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <CompanyHeader company={companyData} />

//       <main className="container mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main content - Jobs */}
//           <div className="lg:col-span-2 animate-fade-in">
//             <JobsSection jobs={companyData.jobs} />
//           </div>

//           {/* Sidebar - Team Breakdown */}
//           <aside
//             className="lg:col-span-1 animate-fade-in"
//             style={{ animationDelay: "0.1s" }}
//           >
//             <div className="sticky top-6">
//               <TeamBreakdown jobs={companyData.jobs} />
//             </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// }
