import type { Route } from "./+types/LandingPage";
import Navbar from "~/components/LandingPage/Navbar";
import Hero from "~/components/LandingPage/Hero";
import SocialProof from "~/components/LandingPage/SocialProof";
import ProblemSection from "~/components/LandingPage/ProblemSection";
import SolutionSection from "~/components/LandingPage/SolutionSection";
import ForCandidates from "~/components/LandingPage/ForCandidates";
import HireMeProfiles from "~/components/LandingPage/HireMeProfiles";
import ForEmployers from "~/components/LandingPage/ForEmployers";
import AISection from "~/components/LandingPage/AISection";
import MarketSignals from "~/components/LandingPage/MarketSignals";
import WhatWeAreNot from "~/components/LandingPage/WhatWeAreNot";
import FinalCTA from "~/components/LandingPage/FinalCTA";
import Footer from "~/components/LandingPage/Footer";

export function meta({}: Route.MetaArgs) {
  const title = "WorkWay — Jobs Simplified. Find Your Next Opportunity";
  const description =
    "WorkWay helps you discover the right jobs faster. Browse thousands of opportunities, explore companies, and apply with confidence.";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "jobs, careers, hiring, job search, workway, tech jobs, startup jobs, remote jobs, fresher jobs, internships",
    },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        <Navbar />
      </div>
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          <SocialProof />
          <ProblemSection />
          <SolutionSection />
          <section id="candidates">
            <ForCandidates />
          </section>
          <HireMeProfiles />
          <section id="employers">
            <ForEmployers />
          </section>
          <AISection />
          <MarketSignals />
          <WhatWeAreNot />
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
