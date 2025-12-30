interface JobFooterProps {
  platform: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
}

const JobFooter = ({
  platform,
  jobId,
  createdAt,
  updatedAt,
}: JobFooterProps) => {
  const formatDate = (dateString: string): string => {
    return dateString.split("T")[0];
  };

  return (
    <footer className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex flex-wrap gap-x-8 gap-y-3 meta-text">
          <span>Platform: {platform}</span>
          <span className="hidden md:inline text-border">·</span>
          <span>Job ID: {jobId}</span>
          <span className="hidden md:inline text-border">·</span>
          <span>Created: {formatDate(createdAt)}</span>
          <span className="hidden md:inline text-border">·</span>
          <span>Updated: {formatDate(updatedAt)}</span>
        </div>
      </div>
    </footer>
  );
};

export default JobFooter;
