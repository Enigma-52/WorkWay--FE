import { ArrowRight } from "lucide-react";
import type { Company } from "~/data/companyData";
import { Link } from "react-router";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:glow-subtle">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
          <img
            src={company.logo_url || ""}
            alt={`${company.name} logo`}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=1a1a2e&color=b4ff39&size=128`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground truncate">
              {company.name}
            </h3>
            {company.is_actively_hiring && company.jobs_open_count > 0 && (
              <span className="flex-shrink-0 rounded-full bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary">
                Hiring
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {company.description && company.description.length > 50
              ? `${company.description.slice(0, 50)}...`
              : company.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-sm text-muted-foreground">
          {company.jobs_open_count} open jobs
        </span>
        <Link
          to={`/company/${company.slug}`}
          className="hover:cursor-pointer flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          View company
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
