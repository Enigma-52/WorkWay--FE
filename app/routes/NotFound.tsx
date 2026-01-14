import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6 max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img src="/logo.png" alt="WorkWay" className="w-28 h-28 opacity-90" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-semibold tracking-tight mb-6">
          404
        </h1>

        <p className="text-lg text-muted-foreground mb-2">
          This page does not exist.
        </p>

        <p className="text-base text-muted-foreground mb-10">
          Either the link is broken, or the page has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/jobs"
            className="px-5 py-2.5 rounded-md border border-border text-sm hover:bg-accent transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
