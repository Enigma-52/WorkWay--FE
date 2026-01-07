import { useLoaderData } from "react-router-dom";

import JobHero from "../components/JobPage/Hero";
import JobSection from "../components/JobPage/Section";
import StickyApply from "../components/JobPage/StickyApply";
import { getJobBySlug } from "../services/jobService";

export async function loader({ params }: { params: { slug?: string } }) {
  const { slug } = params;

  const jobDetails = await getJobBySlug(slug || '');

  return jobDetails;
}

const jobData = {
  id: "4",
  company_id: "1",
  company: "Jane Street",
  slug: "jane-street-accounts-receivable-operations-specialist-7850640002",
  platform: "greenhouse",
  job_id: "7850640002",
  title: "Accounts Receivable Operations Specialist",
  url: "https://job-boards.greenhouse.io/janestreet/jobs/7850640002",
  description: [
    {
      content: [
        "We are looking for an Accounts Receivable Operations Specialist to handle highly specialized accounts receivable tasks that are crucial to our firm. There are many tough problems to solve and we are big believers in finding exceptional, smart people to tackle them.",
        "You'll sit on the New York Accounting team and will partner closely with Operations, Trading, and our Accounting teams in London and Hong Kong.",
        "Some of the day-to-day responsibilities of this role include:",
        "Developing and implementing process improvements to streamline receivables workflows",
        "Preparing month-end reconciliations",
        "Contacting clearing firms and customers for payment details; escalating any overdue bills to our trading desks",
        "Processing day-to-day settlements, invoice adjustments, or customer refunds in partnership with our Operations team",
        "Working with clients and clearing firms to resolve financial discrepancies",
      ],
      heading: "About the Position",
    },
    {
      content: [
        "Have 3+ years of experience in an accounts receivable role; a background in finance or experience at a trading firm is a plus",
        "Strong Excel skills, comfortable working with large data sets to find patterns and identify irregularities",
        "Self-motivated, detail-oriented critical thinker who can multitask in a fast-moving, highly intellectual environment",
        "Excellent interpersonal skills; trustworthy and able to communicate effectively and discreetly with clearing firms and customers and relay relevant information to sales traders",
        "Highly organized; able to track information closely and create clear workflows",
        "Understanding of end to end billing and collections processes",
        "If you're a recruiting agency and want to partner with us, please reach out to agency-partnerships@janestreet.com.",
      ],
      heading: "About You",
    },
  ],
  experience_level: "Mid-level",
  employment_type: "Full-Time",
  domain: "Accounts / Finance",
  location: "New York, New York, United States",
  created_at: "2025-12-21T16:21:04.831Z",
  updated_at: "2025-12-21T16:21:02.645Z",
};

const JobPage = () => {
  const jobDetails = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">
            Workway
          </span>
        </div>
      </header>

      {/* Hero */}
      <JobHero
        title={jobData.title}
        company={jobData.company}
        location={jobData.location}
        experienceLevel={jobData.experience_level}
        employmentType={jobData.employment_type}
        domain={jobData.domain}
        url={jobData.url}
      />

      {/* Content Sections */}
      {jobData.description.map((section, index) => (
        <JobSection
          key={section.heading}
          heading={section.heading}
          content={section.content}
          index={index}
        />
      ))}

      {/* Sticky Apply */}
      <StickyApply url={jobData.url} />
    </main>
  );
};

export default JobPage;
