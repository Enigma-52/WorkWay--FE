import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StickyApplyProps {
  url: string;
}

const StickyApply = ({ url }: StickyApplyProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if window is defined (SSR-safe)
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Ready to apply?
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto group"
            >
              Apply
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyApply;
