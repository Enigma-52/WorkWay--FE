import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ForCandidates from "@/components/landing/ForCandidates";
import HireMeProfiles from "@/components/landing/HireMeProfiles";
import ForEmployers from "@/components/landing/ForEmployers";
import AISection from "@/components/landing/AISection";
import MarketSignals from "@/components/landing/MarketSignals";
import WhatWeAreNot from "@/components/landing/WhatWeAreNot";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
