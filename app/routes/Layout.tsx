import { Outlet } from "react-router";
import Navbar from "~/components/Layout/Navbar";
import Footer from "~/components/Layout/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
