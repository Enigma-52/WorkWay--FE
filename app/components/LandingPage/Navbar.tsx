import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import OnboardingModal from "./OnboardingModal";

const Navbar = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container px-4">
          <div className="flex items-center justify-between p-3 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  W
                </span>
              </div>
              <span className="text-lg font-bold">WorkWay</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#candidates"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                For Candidates
              </a>
              <a
                href="#employers"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                For Employers
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </div>

            {/* CTA */}
            <Button
              variant="default"
              size="sm"
              className="group"
              onClick={() => setShowOnboarding(true)}
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </nav>

      <OnboardingModal open={showOnboarding} onOpenChange={setShowOnboarding} />
    </>
  );
};

export default Navbar;
