import { Link } from "react-router";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">About WorkWay</h1>
          <p className="text-lg text-muted-foreground">
            WorkWay is a hiring intelligence platform that helps you discover
            companies, understand how they are hiring, and find the right roles
            faster — using data, not noise.
          </p>
        </header>

        {/* What */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">What is WorkWay?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Most job platforms show you a list of jobs. WorkWay shows you how
            companies actually hire.
            <br />
            <br />
            We organize job postings into structured company pages where you can
            see:
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-muted-foreground">
            <li>Which teams are hiring</li>
            <li>Which locations are growing</li>
            <li>What tech stack companies are using</li>
            <li>Whether a company is scaling engineering, sales, or product</li>
            <li>What kind of roles and seniority they prefer</li>
          </ul>
        </section>

        {/* Why */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Why WorkWay Exists</h2>
          <p className="text-muted-foreground leading-relaxed">
            Job searching today is noisy, repetitive, and inefficient.
            <br />
            <br />
            Candidates apply blindly. Companies repost the same roles. Nobody
            tells you:
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-muted-foreground">
            <li>Is this company actually growing?</li>
            <li>Which team is getting budget?</li>
            <li>Are they hiring juniors or seniors?</li>
            <li>Is this a product-heavy or sales-heavy company?</li>
          </ul>

          <p className="text-muted-foreground mt-4">
            WorkWay answers these questions using hiring data.
          </p>
        </section>

        {/* How */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            We continuously collect and structure job postings and derive
            signals from them:
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-muted-foreground">
            <li>Team structure from job titles</li>
            <li>Tech stack from job descriptions</li>
            <li>Growth areas from hiring patterns</li>
            <li>Geographic expansion from locations</li>
          </ul>

          <p className="text-muted-foreground mt-4">
            This turns raw job listings into company intelligence.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe hiring data is one of the most honest signals about a
            company.
            <br />
            <br />
            WorkWay aims to become the default place where:
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2 text-muted-foreground">
            <li>Candidates research companies before applying</li>
            <li>Founders benchmark hiring against competitors</li>
            <li>Engineers discover fast-growing teams early</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="border-t pt-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            Start exploring companies and roles on WorkWay.
          </p>
          <Link
            to="/jobs"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
          >
            Explore Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
