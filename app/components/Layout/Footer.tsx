const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="WorkWay" className="w-10 h-10" />
              <span className="text-lg font-semibold">WorkWay</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              WorkWay helps you discover companies, understand how they hire,
              and find the right roles using real hiring data — not noise.
            </p>

            <p className="mt-6 text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} WorkWay. All rights reserved.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-sm font-medium mb-4">About</h4>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About WorkWay
              </a>
              <a
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
