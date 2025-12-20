const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold">WorkWay</span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
            Built by engineers.
            <br />
            For people who want jobs.
            <br />
            <span className="text-foreground">Not dopamine.</span>
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-xs text-muted-foreground/60">
            © 2024 WorkWay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
