import type { Route } from "./+types/JobPage";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  Building2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import JobBadge from "~/components/JobPage/JobBadge";
import JobSection from "~/components/JobPage/JobSection";
import JobCard from "~/components/JobPage/JobCard";
import { Button } from "~/components/ui/button";
import { getJobDetails } from "~/api/services/jobService";
import { useLoaderData } from "react-router";
import { getDomainSlug } from "~/utils/helper";

export function meta({ data, params }: Route.MetaArgs) {
  const job = data as any;

  if (!job) {
    return [
      { title: "Job Not Found — WorkWay" },
      { name: "robots", content: "noindex" },
    ];
  }

  const titleText = `${job.title} at ${job.company} (${job.location}) | WorkWay`;

  const descriptionText = `Apply for the ${job.title} role at ${job.company} in ${job.location}. ${job.experience_level} · ${job.employment_type}. View full job details and apply.`;

  const image =
    job.company_logo_url || job.logo_url || "https://www.workway.dev/logo.png";

  const url = `https://www.workway.dev/job/${job.slug}`;

  return [
    { title: titleText },
    { name: "description", content: descriptionText },

    { rel: "canonical", href: url },

    { property: "og:title", content: titleText },
    { property: "og:description", content: descriptionText },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titleText },
    { name: "twitter:description", content: descriptionText },
    { name: "twitter:image", content: image },
  ];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<any> {
  try {
    const jobSlug = params.jobSlug || "";
    const res = await getJobDetails({
      fetchRequest: request,
      slug: jobSlug,
    });
    const data = res?.data;
    return data && Object.keys(data).length > 0 ? (data as any) : null;
  } catch (e) {
    return null;
  }
}

export default function JobPage() {
  const jobData = useLoaderData<typeof loader>();
  const domainJobs = jobData?.similarJobsByDomain || [];
  const companyJobs = jobData?.otherJobsByCompany || [];

  if (!jobData) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-7xl">
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Background Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <div className="container relative py-16 md:py-24">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/jobs"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Jobs
              </Link>
            </motion.div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              {/* Job Info */}
              <div className="max-w-3xl">
                {/* Company */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                      {jobData.company_logo_url ? (
                        <img
                          src={jobData.company_logo_url}
                          alt={`${jobData.company} logo`}
                          className="max-h-10 max-w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to={`/company/${jobData.company_slug}`}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {jobData.company}
                      </Link>
                      {jobData.company_url && (
                        <a
                          href={jobData.company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {jobData.company_url
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                >
                  {jobData.title}
                </motion.h1>

                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                  <JobBadge variant="primary">
                    <MapPin className="mr-1.5 h-3 w-3" />
                    {jobData.location}
                  </JobBadge>
                  <JobBadge>
                    <Briefcase className="mr-1.5 h-3 w-3" />
                    {jobData.employment_type}
                  </JobBadge>
                  <JobBadge>
                    <Clock className="mr-1.5 h-3 w-3" />
                    {jobData.experience_level}
                  </JobBadge>
                  <JobBadge variant="muted">{jobData.domain}</JobBadge>
                </motion.div>
              </div>

              {/* Apply CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex flex-col gap-3"
              >
                <a href={jobData.url} target="_blank" rel="noopener noreferrer">
                  <Button size="xl" className="cursor-pointer w-full lg:w-auto">
                    Apply Now
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground lg:text-left">
                  You'll be redirected to the company's career page
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-6 lg:col-span-2">
                {jobData.description.map((section: any, index: number) => (
                  <JobSection
                    key={index}
                    heading={section.heading}
                    content={section.content}
                    index={index}
                  />
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="job-card"
                >
                  <h3 className="mb-6 text-lg font-semibold text-foreground">
                    Job Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="text-sm text-muted-foreground">
                        Company
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {jobData.company}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="text-sm text-muted-foreground">
                        Location
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {jobData.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="text-sm text-muted-foreground">
                        Type
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {jobData.employment_type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="text-sm text-muted-foreground">
                        Level
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {jobData.experience_level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Domain
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {jobData.domain}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href={jobData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className=" cursor-pointer w-full">
                        Apply for this role
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Roles Section */}
        <section className="border-t border-border/50 py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-foreground">
                Similar roles you might like
              </h2>
              <Link
                to={`/domain/${getDomainSlug(domainJobs[0]?.domain)}`}
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
              >
                View all {domainJobs[0]?.domain} roles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {domainJobs.map((job: any, index: number) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* More Roles at Company Section */}
        <section className="border-t py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold text-foreground">
                More roles at {jobData.company}
              </h2>
              <Link
                to={`/company/${companyJobs[0]?.company_slug}`}
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
              >
                View company profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companyJobs.map((job: any, index: number) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
