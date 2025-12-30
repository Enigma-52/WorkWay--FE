interface JobSectionProps {
  heading: string;
  content: string[];
  index: number;
}

const JobSection = ({ heading, content, index }: JobSectionProps) => {
  // Determine if content item is a bullet point (starts with action verb or specific pattern)
  const isBulletPoint = (text: string): boolean => {
    const bulletPatterns = [
      /^Developing/,
      /^Preparing/,
      /^Contacting/,
      /^Processing/,
      /^Working/,
      /^Have \d+/,
      /^Strong/,
      /^Self-motivated/,
      /^Excellent/,
      /^Highly/,
      /^Understanding/,
      /^If you're/,
    ];
    return bulletPatterns.some((pattern) => pattern.test(text));
  };

  // Split content into paragraphs and bullet points
  const paragraphs: string[] = [];
  const bullets: string[] = [];

  content.forEach((item) => {
    if (isBulletPoint(item)) {
      bullets.push(item);
    } else {
      paragraphs.push(item);
    }
  });

  return (
    <section className="py-12 mb-8 md:py-16 border-b border-border last:border-b-0">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h2 className="section-heading mb-1 text-primary">{heading}</h2>

        <div className="space-y-6">
          {/* Render paragraphs */}
          {paragraphs.map((text, i) => (
            <p key={`p-${i}`} className="content-block text-base md:text-lg">
              {text}
            </p>
          ))}

          {/* Render bullet points */}
          {bullets.length > 0 && (
            <ul className="space-y-4 mt-8">
              {bullets.map((text, i) => (
                <li
                  key={`b-${i}`}
                  className="content-block text-base md:text-lg pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full"
                >
                  {text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobSection;
