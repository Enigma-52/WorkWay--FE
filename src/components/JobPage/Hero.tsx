import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobHeroProps {
  title: string;
  company: string;
  location: string;
  experienceLevel: string;
  employmentType: string;
  domain: string;
  url: string;
}

const JobHero = ({
  title,
  company,
  location,
  experienceLevel,
  employmentType,
  domain,
  url,
}: JobHeroProps) => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Company */}
        <p className="text-muted-foreground text-sm md:text-base font-medium mb-4">
          {company}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 text-balance">
          {title}
        </h1>

        {/* Location */}
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          {location}
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="chip">{experienceLevel}</span>
          <span className="chip">{employmentType}</span>
          <span className="chip">{domain}</span>
        </div>

        {/* CTA */}
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" className="group">
              Apply
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default JobHero;
