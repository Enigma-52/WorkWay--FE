import type { Route } from "./+types/LandingPage";

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

export default function LandingPage() {
  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1>WorkWay</h1>

      <p style={{ fontSize: 18, marginTop: 12 }}>
        Jobs, simplified. Find the right opportunities without the noise.
      </p>

      <p style={{ marginTop: 24 }}>
        WorkWay helps you explore companies, discover relevant jobs, and apply
        faster — all in one clean and simple experience.
      </p>

      <div style={{ marginTop: 32 }}>
        <button
          style={{
            padding: "12px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
          onClick={() => alert("Client hydration works!")}
        >
          Get Started
        </button>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <p style={{ color: "#666" }}>
        (Developer note: If you can see this text in “View Page Source”, SSR is
        working correctly.)
      </p>
    </main>
  );
}
