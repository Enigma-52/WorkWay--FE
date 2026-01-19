import { Flame, Sparkles, Zap, Briefcase } from "lucide-react";
import type { Company } from "~/data/companyData";
import { Link } from "react-router";

interface FeaturedSectionProps {
  title: string;
  icon: "trending" | "new" | "hiring" | "featured";
  companies: Company[];
}

const iconMap = {
  trending: Flame,
  new: Sparkles,
  hiring: Briefcase,
  featured: Zap,
};

const FeaturedSection = ({ title, icon, companies }: FeaturedSectionProps) => {
  const Icon = iconMap[icon];

  if (companies.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {companies.slice(0, 6).map((company) => (
          <Link
            to={`/company/${company.slug}`}
            key={company.id}
            className="hover:cursor-pointer flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 transition-all hover:border-primary/50 hover:bg-secondary"
          >
            <img
              src={company.logo_url || ""}
              alt={company.name}
              className="h-6 w-6 rounded-md object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    company.name,
                  )}&background=1a1a2e&color=b4ff39&size=64`;
              }}
            />
            <span className="text-sm font-medium text-foreground">
              {company.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
