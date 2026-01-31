var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, useLocation, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useLoaderData, useNavigate, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { ArrowRight, Linkedin, Github, X, ArrowLeft, Sparkles, Search, Briefcase, MapPin, Check, Zap, Rocket, Building2, Users, Database, Target, Building, TrendingUp, Filter, BarChart3, Code, User, Settings, Clock, UserCheck, LayoutGrid, ListChecks, ChevronDown, Flame, ChevronLeft, ChevronRight, LineChart, FileSearch, UserCog, TestTube, Scale, Wrench, Wallet, Headphones, Megaphone, Palette, Cpu, Layers, UserPlus, Globe, ChevronUp, ArrowUpRight, Folder, ExternalLink, SlidersHorizontal, Code2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const initMixpanel = void 0;
const mixpanel = void 0;
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-PMBBRGCPM5"
      }), /* @__PURE__ */ jsx("script", {
        dangerouslySetInnerHTML: {
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PMBBRGCPM5');
            `
        }
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const location = useLocation();
  useEffect(() => {
    initMixpanel();
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && window.mixpanel) {
      mixpanel.track("Page View", {
        path: location.pathname
      });
    }
  }, [location.pathname]);
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout: Layout$1,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-muted-foreground/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground font-bold text-base px-8 py-6 rounded-xl hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_60px_hsl(82_100%_55%/0.3)] hover:shadow-[0_0_80px_hsl(82_100%_55%/0.5)] transition-all duration-300",
        primary: "bg-primary text-primary-foreground font-bold tracking-wide uppercase hover:shadow-[0_0_40px_hsl(152_100%_50%/0.3)] hover:scale-[1.02] active:scale-[0.98]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Navbar = () => {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 h-14 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "WorkWay", className: "w-9 h-9" }),
      /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "WorkWay" })
    ] }) }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/jobs",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Jobs"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/companies",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Companies"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/domains",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Domains"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/hireme",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Create your Hire Me Profile"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { size: "sm", className: "gap-1", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/companies", children: [
      "Get Started",
      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
    ] }) })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-background", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start text-center md:text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "WorkWay", className: "w-10 h-10" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold", children: "WorkWay" })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-sm", children: "WorkWay helps you discover companies, understand how they hire, and find the right roles using real hiring data — not noise." }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-xs text-muted-foreground/60", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " WorkWay. Built in public."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-center text-center", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-4", children: "Product" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/about",
            className: "hover:text-foreground transition-colors",
            children: "About WorkWay"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/domains",
            className: "hover:text-foreground transition-colors",
            children: "Browse Domains"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/companies",
            className: "hover:text-foreground transition-colors",
            children: "Browse Companies"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end text-center md:text-right", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium mb-4", children: "Creator" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium text-foreground", children: "Rohit Singh" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Building WorkWay" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.linkedin.com/in/rohitsingh52/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "LinkedIn",
            children: /* @__PURE__ */ jsx(Linkedin, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/Enigma-52",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "GitHub",
            children: /* @__PURE__ */ jsx(Github, { className: "h-5 w-5" })
          }
        )
      ] })
    ] })
  ] }) }) });
};
const Layout = UNSAFE_withComponentProps(function AppLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex flex-col bg-background text-foreground",
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("main", {
      className: "flex-1",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const OnboardingModal = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    currentRole: "",
    dreamRole: "",
    location: "",
    openTo: [],
    superpower: ""
  });
  const [employerData, setEmployerData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    hiringFor: "",
    urgency: ""
  });
  const totalSteps = role === "candidate" ? 5 : role === "employer" ? 4 : 1;
  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    if (step === 1) setRole(null);
  };
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(1);
  };
  const toggleOpenTo = (option) => {
    setCandidateData((prev) => ({
      ...prev,
      openTo: prev.openTo.includes(option) ? prev.openTo.filter((o) => o !== option) : [...prev.openTo, option]
    }));
  };
  const renderStep = () => {
    if (step === 0) {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }),
            "Let's get you set up"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "What brings you here?" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Pick your path. No wrong answers." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleRoleSelect("candidate"),
              className: "group relative p-6 rounded-2xl border-2 border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-left",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 pr-12", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "I'm looking for work" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Find jobs, track applications, get hired. No more spreadsheet chaos." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: [
                  "Let's go ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleRoleSelect("employer"),
              className: "group relative p-6 rounded-2xl border-2 border-border/50 bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-left",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3 pr-12", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "I'm hiring" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Post jobs, find talent, skip the circus. Real candidates, real fast." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: [
                  "Let's go ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              ]
            }
          )
        ] })
      ] });
    }
    if (role === "candidate") {
      if (step === 1) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "First, the basics." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "We promise not to spam you. Ever." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "What should we call you?" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Your name",
                  value: candidateData.name,
                  onChange: (e) => setCandidateData({ ...candidateData, name: e.target.value }),
                  className: "h-12 bg-background/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Where can we reach you?" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  placeholder: "you@email.com",
                  value: candidateData.email,
                  onChange: (e) => setCandidateData({
                    ...candidateData,
                    email: e.target.value
                  }),
                  className: "h-12 bg-background/50"
                }
              )
            ] })
          ] })
        ] });
      }
      if (step === 2) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "What's your current situation?" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No judgment. We've all been there." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Current role (or last one)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "e.g. Frontend Developer, Product Designer...",
                  value: candidateData.currentRole,
                  onChange: (e) => setCandidateData({
                    ...candidateData,
                    currentRole: e.target.value
                  }),
                  className: "h-12 bg-background/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                "Where are you based?"
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "City, Country or 'Remote'",
                  value: candidateData.location,
                  onChange: (e) => setCandidateData({
                    ...candidateData,
                    location: e.target.value
                  }),
                  className: "h-12 bg-background/50"
                }
              )
            ] })
          ] })
        ] });
      }
      if (step === 3) {
        const openToOptions = [
          "Full-time",
          "Part-time",
          "Contract",
          "Freelance",
          "Remote",
          "Hybrid",
          "On-site"
        ];
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "What are you open to?" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Select all that apply. Be honest." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: openToOptions.map((option) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => toggleOpenTo(option),
              className: cn(
                "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all",
                candidateData.openTo.includes(option) ? "border-primary bg-primary/10 text-primary" : "border-border/50 hover:border-muted-foreground/50"
              ),
              children: [
                candidateData.openTo.includes(option) && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 inline mr-1" }),
                option
              ]
            },
            option
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Dream role (be specific)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "e.g. Senior Engineer at a climate tech startup",
                value: candidateData.dreamRole,
                onChange: (e) => setCandidateData({
                  ...candidateData,
                  dreamRole: e.target.value
                }),
                className: "h-12 bg-background/50"
              }
            )
          ] })
        ] });
      }
      if (step === 4) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "One last thing." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "This helps us match you better. Optional but powerful." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
              "What's your superpower?"
            ] }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "e.g. I can debug CSS faster than anyone. I turn stakeholder chaos into clear PRDs. I make backend magic happen...",
                value: candidateData.superpower,
                onChange: (e) => setCandidateData({
                  ...candidateData,
                  superpower: e.target.value
                }),
                className: "min-h-[120px] bg-background/50 resize-none"
              }
            )
          ] })
        ] });
      }
      if (step === 5) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Rocket, { className: "w-10 h-10 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold", children: [
              "You're all set, ",
              candidateData.name.split(" ")[0] || "friend",
              "!"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "Your WorkWay profile is ready. Time to find that dream role." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/20 text-left space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: "What happens next:" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• We'll curate jobs based on your preferences" }),
              /* @__PURE__ */ jsx("li", { children: "• Your Hire Me page is live (you can edit anytime)" }),
              /* @__PURE__ */ jsx("li", { children: "• Start applying with one click" })
            ] })
          ] })
        ] });
      }
    }
    if (role === "employer") {
      if (step === 1) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Let's set up your hiring HQ." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Quick intro so we can help you hire faster." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Your name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "What should we call you?",
                  value: employerData.name,
                  onChange: (e) => setEmployerData({ ...employerData, name: e.target.value }),
                  className: "h-12 bg-background/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Work email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  placeholder: "you@company.com",
                  value: employerData.email,
                  onChange: (e) => setEmployerData({ ...employerData, email: e.target.value }),
                  className: "h-12 bg-background/50"
                }
              )
            ] })
          ] })
        ] });
      }
      if (step === 2) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Tell us about your company." }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "This helps candidates understand who you are." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-primary" }),
                "Company name"
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Acme Inc.",
                  value: employerData.company,
                  onChange: (e) => setEmployerData({
                    ...employerData,
                    company: e.target.value
                  }),
                  className: "h-12 bg-background/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-sm font-medium flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-primary" }),
                "Team size"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: ["1-10", "11-50", "51-200", "200+"].map((size) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setEmployerData({ ...employerData, teamSize: size }),
                  className: cn(
                    "py-3 rounded-xl border-2 text-sm font-medium transition-all",
                    employerData.teamSize === size ? "border-primary bg-primary/10 text-primary" : "border-border/50 hover:border-muted-foreground/50"
                  ),
                  children: size
                },
                size
              )) })
            ] })
          ] })
        ] });
      }
      if (step === 3) {
        const urgencyOptions = [
          { value: "asap", label: "ASAP", desc: "Yesterday, actually" },
          { value: "soon", label: "This month", desc: "Moving fast" },
          { value: "exploring", label: "Exploring", desc: "Building pipeline" }
        ];
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "What are you hiring for?" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Help us surface the right candidates." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "Role(s) you're filling" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "e.g. Senior Backend Engineer, Product Designer",
                  value: employerData.hiringFor,
                  onChange: (e) => setEmployerData({
                    ...employerData,
                    hiringFor: e.target.value
                  }),
                  className: "h-12 bg-background/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: "How urgent?" }),
              /* @__PURE__ */ jsx("div", { className: "grid gap-2", children: urgencyOptions.map((opt) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setEmployerData({ ...employerData, urgency: opt.value }),
                  className: cn(
                    "p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                    employerData.urgency === opt.value ? "border-primary bg-primary/10" : "border-border/50 hover:border-muted-foreground/50"
                  ),
                  children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium", children: opt.label }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: opt.desc })
                    ] }),
                    employerData.urgency === opt.value && /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary" })
                  ]
                },
                opt.value
              )) })
            ] })
          ] })
        ] });
      }
      if (step === 4) {
        return /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-10 h-10 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold", children: [
              "Welcome aboard, ",
              employerData.name.split(" ")[0] || "friend",
              "!"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground max-w-md mx-auto", children: [
              employerData.company || "Your company",
              " is ready to hire smarter."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/20 text-left space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: "What happens next:" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [
              /* @__PURE__ */ jsx("li", { children: "• Post your first job in under 2 minutes" }),
              /* @__PURE__ */ jsx("li", { children: "• Access our candidate database" }),
              /* @__PURE__ */ jsx("li", { children: "• Track applicants in one clean pipeline" })
            ] })
          ] })
        ] });
      }
    }
  };
  const isLastStep = step === totalSteps;
  const canProceed = () => {
    if (step === 0) return false;
    if (role === "candidate") {
      if (step === 1) return candidateData.name && candidateData.email;
      if (step === 2) return candidateData.currentRole;
      if (step === 3) return candidateData.openTo.length > 0;
      return true;
    }
    if (role === "employer") {
      if (step === 1) return employerData.name && employerData.email;
      if (step === 2) return employerData.company && employerData.teamSize;
      if (step === 3) return employerData.hiringFor && employerData.urgency;
      return true;
    }
    return false;
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[520px] p-0 gap-0 bg-background border-border/50 overflow-hidden", children: [
    step > 0 && /* @__PURE__ */ jsx("div", { className: "h-1 bg-muted", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-primary transition-all duration-500",
        style: { width: `${step / totalSteps * 100}%` }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "p-6 sm:p-8", children: renderStep() }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between", children: [
      step > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: handleBack, className: "gap-2", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        "Back"
      ] }) : /* @__PURE__ */ jsx("div", {}),
      step > 0 && /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: isLastStep ? () => onOpenChange(false) : handleNext,
          disabled: !canProceed(),
          className: "gap-2",
          children: [
            isLastStep ? "Let's go!" : "Continue",
            !isLastStep && /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] })
  ] }) });
};
const Hero = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-background to-card" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "container relative z-10 px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 opacity-0 animate-fade-up", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground font-mono", children: "now in beta" })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 opacity-0 animate-fade-up stagger-1", children: [
        "Job hunting is ",
        /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "cooked." }),
        /* @__PURE__ */ jsx("br", {}),
        "So we fixed it."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up stagger-2", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6", children: [
          "WorkWay is where jobs, applications, and hiring",
          /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
          "stop being a mess and start making sense."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 text-sm font-mono text-foreground/80", children: [
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-md bg-card border border-border", children: "No spam." }),
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-md bg-card border border-border", children: "No déjà vu listings." }),
          /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-md bg-card border border-border", children: "No corporate soul damage." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 opacity-0 animate-fade-up stagger-3", children: [
        /* @__PURE__ */ jsx(Button, { variant: "hero", size: "xl", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/companies", children: [
          "Enter WorkWay",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-1" })
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "yes, it actually works" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(OnboardingModal, { open: showOnboarding, onOpenChange: setShowOnboarding })
  ] });
};
const SocialProof = () => {
  const badges = [
    { icon: Briefcase, text: "applying every day" },
    { icon: Users, text: "hiring seriously" },
    { icon: Zap, text: "extremely tired of other job platforms" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 border-y border-border bg-card/30", children: /* @__PURE__ */ jsxs("div", { className: "container px-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mb-8 font-mono text-sm", children: "Used by people who are:" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 md:gap-6", children: badges.map((badge, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300",
        children: [
          /* @__PURE__ */ jsx(badge.icon, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: badge.text })
        ]
      },
      index
    )) })
  ] }) });
};
const ProblemSection = () => {
  const platforms = ["LinkedIn", "Naukri", "YC Jobs", "4 ATS tabs", "a Google Sheet titled final_final_v7.xlsx"];
  const problems = [
    "apply to the same job twice",
    "forget where you applied",
    "rewrite the same intro",
    "lose track",
    "question your life choices"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center", children: [
      "Be honest.",
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "This is your current setup." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 md:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-mono text-sm uppercase tracking-wider", children: "You open:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: platforms.map((platform, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-destructive/60" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-sm", children: platform })
            ]
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-mono text-sm uppercase tracking-wider", children: "You:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: problems.map((problem, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "✗" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-sm", children: problem })
            ]
          },
          index
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl text-muted-foreground leading-relaxed", children: [
      'This is not "the grind".',
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "This is bad software." })
    ] }) })
  ] }) }) });
};
const SolutionSection = () => {
  const features = [
    { icon: Database, text: "Aggregates jobs from Greenhouse, Lever, YC Jobs", color: "from-emerald-500 to-teal-500" },
    { icon: Target, text: "Lets you apply + track everything in one place", color: "from-blue-500 to-cyan-500" },
    { icon: Building, text: "Handles in-house startup jobs directly", color: "from-violet-500 to-purple-500" },
    { icon: TrendingUp, text: "Shows company context (funded? hiring? relevant?)", color: "from-orange-500 to-amber-500" },
    { icon: Filter, text: "Gives recruiters actual signal, not resume spam", color: "from-rose-500 to-pink-500" }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-card/30" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "container px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary", children: "The Solution" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4", children: "So we built a platform" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient", children: "that isn't dumb." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 mb-16", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "group relative p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-x-1 overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300` }),
            /* @__PURE__ */ jsx("div", { className: `absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500` }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-[1px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300`, children: /* @__PURE__ */ jsx("div", { className: "w-full h-full rounded-xl bg-background flex items-center justify-center", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-foreground" }) }) }),
              /* @__PURE__ */ jsx("span", { className: "text-lg md:text-xl font-medium text-foreground/90 group-hover:text-foreground transition-colors", children: feature.text })
            ] })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-block p-8 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl text-muted-foreground", children: "It's a job platform." }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl md:text-3xl font-bold mt-2", children: [
          "But with a ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "brain." })
        ] })
      ] }) })
    ] }) })
  ] });
};
const ForCandidates = () => {
  const cards = [
    {
      icon: Search,
      title: "Find jobs without digging",
      description: "Search once. Filters actually work. Chat if you're lazy."
    },
    {
      icon: Zap,
      title: "Apply without friction",
      description: "External ATS? Fine. In-house roles? Short message. Done."
    },
    {
      icon: BarChart3,
      title: "Track everything",
      description: "Where you applied. What happened. What's hot. What's dead."
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-primary font-mono text-sm uppercase tracking-wider mb-4", children: "For Candidates" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold", children: [
        "For people who are",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "actually applying." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: cards.map((card, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "group p-8 rounded-2xl border border-border bg-card card-gradient hover:border-primary/30 transition-all duration-300 hover:-translate-y-1",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(card.icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-3", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: card.description })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("p", { className: "text-center mt-12 text-lg font-mono text-primary", children: 'No more "did I apply here?"' })
  ] }) }) });
};
const HireMeProfiles = () => {
  const profileItems = [
    { icon: Code, label: "skills" },
    { icon: Briefcase, label: "projects" },
    { icon: User, label: "experience" },
    { icon: Settings, label: "preferences" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 bg-card/30 border-y border-border overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-primary font-mono text-sm uppercase tracking-wider mb-4", children: "Hire Me Profiles" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-6", children: [
        "Your resume, but online",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "and not ugly." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8 leading-relaxed", children: "Every user gets a Hire Me page. Recruiter opens it → understands you in 30 seconds." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 mb-8", children: profileItems.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50",
          children: [
            /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-sm", children: item.label })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
          "AI helps you polish it."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "You still stay in control." }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "No LinkedIn influencer energy." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative p-8 rounded-2xl border border-border bg-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 pb-6 border-b border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg", children: "Alex Chen" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Full-Stack Engineer" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"].map(
          (skill) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20",
              children: skill
            },
            skill
          )
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg bg-background/50", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: "5+" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Years Exp" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg bg-background/50", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: "12" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Projects" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg bg-background/50", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: "Open" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Status" })
          ] })
        ] })
      ] })
    ] })
  ] }) }) }) });
};
const ForEmployers = () => {
  const features = [
    { icon: Clock, text: "Post jobs in minutes", stat: "< 5 min" },
    { icon: UserCheck, text: "Get candidates who actually fit", stat: "90% match" },
    { icon: LayoutGrid, text: "Manage applicants in a clean pipeline", stat: "No chaos" },
    { icon: ListChecks, text: "Shortlist without spreadsheets", stat: "1-click" },
    { icon: BarChart3, text: "See what's working (and what isn't)", stat: "Real data" }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-32 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 w-1/2 h-96 bg-gradient-to-r from-primary/5 to-transparent blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-0 w-1/2 h-96 bg-gradient-to-l from-primary/5 to-transparent blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-primary font-mono text-sm uppercase tracking-wider mb-4 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }),
          "For Employers"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold", children: "Hiring without" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2", children: /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "the circus." }),
          /* @__PURE__ */ jsx("svg", { className: "absolute -bottom-2 left-0 w-full", viewBox: "0 0 200 12", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M2 10C50 2 150 2 198 10", stroke: "hsl(82 100% 55%)", strokeWidth: "3", strokeLinecap: "round", className: "opacity-60" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 ${index === features.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full", children: feature.stat })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors", children: feature.text })
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl border border-destructive/30 bg-destructive/5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🚫" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg text-foreground/80", children: "No ATS bloat." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl border border-destructive/30 bg-destructive/5", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "💸" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg text-foreground/80", children: "No enterprise pricing jumpscare." })
        ] })
      ] })
    ] }) })
  ] });
};
const AISection = () => {
  const doItems = [
    "match candidates better",
    "improve job descriptions",
    "power semantic search",
    "help recruiters find talent faster"
  ];
  const dontItems = [
    "hallucinate jobs",
    "write motivational quotes",
    "replace humans"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 bg-card/30 border-y border-border", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-primary", children: "AI Inside" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold", children: [
        "Yes, there's AI.",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No, it's not cringe." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl border border-primary/30 bg-primary/5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm uppercase tracking-wider text-primary mb-6", children: "We use AI to:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: doItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-primary" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: item })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-2xl border border-destructive/30 bg-destructive/5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm uppercase tracking-wider text-destructive mb-6", children: "We don't use AI to:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: dontItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 text-destructive" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: item })
        ] }, index)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-center mt-12 text-xl font-semibold", children: [
      "Assist ",
      ">",
      " automate.",
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Always." })
    ] })
  ] }) }) });
};
const MarketSignals = () => {
  const signals = [
    { icon: TrendingUp, label: "recently funded companies" },
    { icon: Building, label: "active hiring signals" },
    { icon: Briefcase, label: "open roles tied to real growth" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-primary font-mono text-sm uppercase tracking-wider mb-4", children: "Market Signals" }),
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-6", children: [
      "Know who's",
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "actually hiring." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-12", children: "We track what matters so you're not applying into the void." }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-6", children: signals.map((signal, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(signal.icon, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-foreground", children: signal.label })
        ]
      },
      index
    )) })
  ] }) }) });
};
const WhatWeAreNot = () => {
  const notItems = [
    "Social feeds",
    "Engagement farming",
    '"Career guru" content',
    "Resume roasting",
    "Fake urgency banners"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 bg-card/30 border-y border-border", children: /* @__PURE__ */ jsx("div", { className: "container px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-12", children: [
      "Things we",
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "refused" }),
      " to build."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-12", children: notItems.map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-5 py-3 rounded-full border border-destructive/30 bg-destructive/5 text-foreground/80",
        children: [
          /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-destructive" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-sm", children: item })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsxs("p", { className: "text-xl text-muted-foreground", children: [
      "Just tools that help you get hired.",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: "Or hire faster." })
    ] })
  ] }) }) });
};
const FinalCTA = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  return /* @__PURE__ */ jsxs("section", { className: "py-32 md:py-40 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" }) }),
    /* @__PURE__ */ jsx("div", { className: "container px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl md:text-6xl font-bold mb-6", children: [
        "Stop fighting",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "job platforms." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground mb-12", children: "Use one that's on your side." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "hero",
            size: "xl",
            className: "group animate-pulse-glow",
            onClick: () => setShowOnboarding(true),
            children: [
              "Start using WorkWay",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-1" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground font-mono", children: "takes less time than opening LinkedIn" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(OnboardingModal, { open: showOnboarding, onOpenChange: setShowOnboarding })
  ] });
};
function meta$7({}) {
  const title = "WorkWay — Jobs Simplified. Find Your Next Opportunity";
  const description = "WorkWay helps you discover the right jobs faster. Browse thousands of opportunities, explore companies, and apply with confidence.";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "jobs, careers, hiring, job search, workway, tech jobs, startup jobs, remote jobs, fresher jobs, internships"
    },
    // Open Graph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    }
  ];
}
const Index = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-background text-foreground",
    children: /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsxs("div", {
        className: "max-w-6xl mx-auto px-6 space-y-32",
        children: [/* @__PURE__ */ jsx(SocialProof, {}), /* @__PURE__ */ jsx(ProblemSection, {}), /* @__PURE__ */ jsx(SolutionSection, {}), /* @__PURE__ */ jsx("section", {
          id: "candidates",
          children: /* @__PURE__ */ jsx(ForCandidates, {})
        }), /* @__PURE__ */ jsx(HireMeProfiles, {}), /* @__PURE__ */ jsx("section", {
          id: "employers",
          children: /* @__PURE__ */ jsx(ForEmployers, {})
        }), /* @__PURE__ */ jsx(AISection, {}), /* @__PURE__ */ jsx(MarketSignals, {}), /* @__PURE__ */ jsx(WhatWeAreNot, {}), /* @__PURE__ */ jsx(FinalCTA, {})]
      })]
    })
  });
};
const LandingPage = UNSAFE_withComponentProps(Index);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LandingPage,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  const title = "Jobs Feed — Discover New Opportunities | WorkWay";
  const description = "Explore a personalized feed of the latest job opportunities across top companies. The WorkWay jobs feed is coming soon.";
  const canonicalUrl = "https://www.workway.dev/jobs";
  const ogImage = "https://www.workway.dev/logo.png";
  return [
    // Basic
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // Canonical
    {
      rel: "canonical",
      href: canonicalUrl
    },
    // Robots
    {
      name: "robots",
      content: "index, follow"
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: canonicalUrl
    },
    {
      property: "og:image",
      content: ogImage
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: ogImage
    }
  ];
}
const JobsFeed = UNSAFE_withComponentProps(function JobsFeed2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative overflow-hidden border-b border-border bg-gradient-hero",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto container relative py-16 md:py-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "mx-auto max-w-3xl text-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6",
            children: [/* @__PURE__ */ jsx(Sparkles, {
              className: "h-4 w-4 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-mono text-sm text-primary",
              children: "WorkWay Jobs Feed"
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4",
            children: ["Your Personalized ", /* @__PURE__ */ jsx("span", {
              className: "text-primary",
              children: "Jobs Feed"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto",
            children: "A smart feed of the latest and most relevant jobs across top companies — tailored for you."
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "mx-auto container py-12",
      children: /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-3xl",
        children: /* @__PURE__ */ jsxs("div", {
          className: "rounded-xl border border-border bg-card/40 p-12 text-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
            children: /* @__PURE__ */ jsx(Briefcase, {
              className: "h-8 w-8 text-primary"
            })
          }), /* @__PURE__ */ jsx("h2", {
            className: "font-display text-2xl font-semibold mb-3",
            children: "Coming Soon"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground max-w-md mx-auto",
            children: "We’re building a personalized jobs feed that learns what you care about and surfaces the best opportunities for you. This will be available shortly."
          })]
        })
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JobsFeed,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const About = UNSAFE_withComponentProps(function About2() {
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-background text-foreground",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-6 py-20",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "mb-12",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold mb-4",
          children: "About WorkWay"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg text-muted-foreground",
          children: "WorkWay is a hiring intelligence platform that helps you discover companies, understand how they are hiring, and find the right roles faster — using data, not noise."
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mb-12",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-semibold mb-3",
          children: "What is WorkWay?"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-muted-foreground leading-relaxed",
          children: ["Most job platforms show you a list of jobs. WorkWay shows you how companies actually hire.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "We organize job postings into structured company pages where you can see:"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "list-disc ml-6 mt-4 space-y-2 text-muted-foreground",
          children: [/* @__PURE__ */ jsx("li", {
            children: "Which teams are hiring"
          }), /* @__PURE__ */ jsx("li", {
            children: "Which locations are growing"
          }), /* @__PURE__ */ jsx("li", {
            children: "What tech stack companies are using"
          }), /* @__PURE__ */ jsx("li", {
            children: "Whether a company is scaling engineering, sales, or product"
          }), /* @__PURE__ */ jsx("li", {
            children: "What kind of roles and seniority they prefer"
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mb-12",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-semibold mb-3",
          children: "Why WorkWay Exists"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-muted-foreground leading-relaxed",
          children: ["Job searching today is noisy, repetitive, and inefficient.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "Candidates apply blindly. Companies repost the same roles. Nobody tells you:"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "list-disc ml-6 mt-4 space-y-2 text-muted-foreground",
          children: [/* @__PURE__ */ jsx("li", {
            children: "Is this company actually growing?"
          }), /* @__PURE__ */ jsx("li", {
            children: "Which team is getting budget?"
          }), /* @__PURE__ */ jsx("li", {
            children: "Are they hiring juniors or seniors?"
          }), /* @__PURE__ */ jsx("li", {
            children: "Is this a product-heavy or sales-heavy company?"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground mt-4",
          children: "WorkWay answers these questions using hiring data."
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mb-12",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-semibold mb-3",
          children: "How It Works"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground leading-relaxed",
          children: "We continuously collect and structure job postings and derive signals from them:"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "list-disc ml-6 mt-4 space-y-2 text-muted-foreground",
          children: [/* @__PURE__ */ jsx("li", {
            children: "Team structure from job titles"
          }), /* @__PURE__ */ jsx("li", {
            children: "Tech stack from job descriptions"
          }), /* @__PURE__ */ jsx("li", {
            children: "Growth areas from hiring patterns"
          }), /* @__PURE__ */ jsx("li", {
            children: "Geographic expansion from locations"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground mt-4",
          children: "This turns raw job listings into company intelligence."
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mb-16",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-semibold mb-3",
          children: "Our Vision"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-muted-foreground leading-relaxed",
          children: ["We believe hiring data is one of the most honest signals about a company.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), "WorkWay aims to become the default place where:"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "list-disc ml-6 mt-4 space-y-2 text-muted-foreground",
          children: [/* @__PURE__ */ jsx("li", {
            children: "Candidates research companies before applying"
          }), /* @__PURE__ */ jsx("li", {
            children: "Founders benchmark hiring against competitors"
          }), /* @__PURE__ */ jsx("li", {
            children: "Engineers discover fast-growing teams early"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "border-t pt-8 flex items-center justify-between",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-muted-foreground",
          children: "Start exploring companies and roles on WorkWay."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/jobs",
          className: "px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium",
          children: "Explore Jobs"
        })]
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
const SearchBar = ({ value, onChange }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: 'Search by company name (e.g. "Anthropic", "Discord", "Jane Street")',
        value,
        onChange: (e) => onChange(e.target.value),
        className: "w-full rounded-xl border border-border bg-secondary py-4 pl-12 pr-4 font-display text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      }
    )
  ] });
};
const FilterBar = ({
  hiringFilter,
  sortBy,
  onHiringFilterChange,
  onSortChange
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: hiringFilter,
        onChange: (e) => onHiringFilterChange(e.target.value),
        className: "appearance-none rounded-lg border border-border bg-secondary px-4 py-2 pr-10 text-sm text-foreground focus:border-primary focus:outline-none cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "All Companies" }),
          /* @__PURE__ */ jsx("option", { value: "hiring", children: "Actively Hiring" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })
  ] }) });
};
const iconMap = {
  trending: Flame,
  new: Sparkles,
  hiring: Briefcase,
  featured: Zap
};
const FeaturedSection = ({ title, icon, companies }) => {
  const Icon = iconMap[icon];
  if (companies.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card/50 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: companies.slice(0, 6).map((company) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/company/${company.slug}`,
        className: "hover:cursor-pointer flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 transition-all hover:border-primary/50 hover:bg-secondary",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: company.logo_url || "",
              alt: company.name,
              className: "h-6 w-6 rounded-md object-cover",
              onError: (e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  company.name
                )}&background=1a1a2e&color=b4ff39&size=64`;
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: company.name })
        ]
      },
      company.id
    )) })
  ] });
};
const CompanyCard = ({ company }) => {
  return /* @__PURE__ */ jsxs("div", { className: "group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:glow-subtle", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-secondary", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: company.logo_url || "",
          alt: `${company.name} logo`,
          className: "h-full w-full object-cover",
          onError: (e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=1a1a2e&color=b4ff39&size=128`;
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-semibold text-foreground truncate", children: company.name }),
          company.is_actively_hiring && company.jobs_open_count > 0 && /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary", children: "Hiring" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: company.description && company.description.length > 50 ? `${company.description.slice(0, 50)}...` : company.description })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm text-muted-foreground", children: [
        company.jobs_open_count,
        " open jobs"
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/company/${company.slug}`,
          className: "hover:cursor-pointer flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100",
          children: [
            "View company",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mt-8", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-all hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
      }
    ),
    getPageNumbers().map(
      (page, index) => typeof page === "number" ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onPageChange(page),
          className: `hover:cursor-pointer flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm transition-all ${currentPage === page ? "bg-primary text-primary-foreground" : "border border-border bg-secondary text-foreground hover:border-primary/50"}`,
          children: page
        },
        index
      ) : /* @__PURE__ */ jsx("span", { className: "px-2 text-muted-foreground", children: page }, index)
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-all hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      }
    )
  ] });
};
const PLATFORM = { WEB: 2 };
const METHOD = {
  GET: "GET"
};
const AUTH_COOKIE = "aKookie";
class ApiError extends Error {
  constructor(_status, _statusText, _response, _url) {
    super();
    __publicField(this, "response");
    __publicField(this, "status");
    __publicField(this, "statusText");
    __publicField(this, "url");
    this._status = _status;
    this._statusText = _statusText;
    this.status = _status;
    this.statusText = _statusText;
    this.response = _response;
    this.url = _url;
  }
  toString() {
    return `Request to ${this.url} failed with ${this.status} ${this.statusText}`;
  }
}
const DEFAULT_QUERY_PARAMS = { os: PLATFORM.WEB, cv: 1 };
const isServer = () => typeof window === "undefined";
function getBaseUrl() {
  if (isServer()) {
    const url = process.env.PROXY_SERVER_URL;
    if (!url) {
      throw new Error("PROXY_SERVER_URL is not set");
    }
    return url;
  }
  return window.location.origin;
}
function getAuthToken(request) {
  const cookie = request.headers.get("cookie") || "";
  const authCookie = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${AUTH_COOKIE}=`));
  return (authCookie == null ? void 0 : authCookie.split("=")[1]) || "";
}
function buildUrl(endpoint, query) {
  const baseUrl = getBaseUrl();
  const url = new URL(endpoint, baseUrl);
  const allParams = { ...DEFAULT_QUERY_PARAMS, ...query };
  for (const [key, value] of Object.entries(allParams)) {
    if (value !== void 0 && value !== null) {
      url.searchParams.append(key, String(value));
    }
  }
  return url.toString();
}
async function fetchHelper(options) {
  const url = buildUrl(options.url, options.query);
  const token = options.useAuth ? getAuthToken(options.fetchRequest) : "";
  const headers = {
    "x-remix-server": "true",
    Authorization: `Bearer ${token}`
  };
  if (!options.formdata) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body !== void 0 ? options.formdata ? options.body : JSON.stringify(options.body) : void 0,
    credentials: "include",
    mode: "cors"
  });
  const json = await response.json();
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, json, url);
  }
  return {
    status: response.status,
    data: json
  };
}
async function get({
  url,
  useAuth = true,
  query,
  fetchRequest
}) {
  const apiResponse = await fetchHelper({
    url,
    useAuth,
    query,
    fetchRequest,
    method: METHOD.GET
  });
  return {
    status: apiResponse.status,
    data: apiResponse.data
  };
}
const COMPANY_API_PREFIX = "/api/company";
function getCompanyDetails({
  fetchRequest,
  slug
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/details`,
    useAuth: false,
    fetchRequest,
    query: { slug }
  });
}
function getCompanyOverview({
  fetchRequest
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/overview`,
    useAuth: false,
    fetchRequest
  });
}
function getAllCompanies({
  fetchRequest,
  q,
  page,
  limit,
  letter,
  hiring
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/`,
    useAuth: false,
    fetchRequest,
    query: { q, page, limit, letter, hiring }
  });
}
function meta$5() {
  const title = "Browse Companies Hiring on WorkWay — Find Top Employers & Open Jobs";
  const description = "Explore thousands of companies hiring across startups and tech firms. Browse company profiles, open roles, teams, and hiring details on WorkWay.";
  const ogImage = "https://www.workway.dev/logo.png";
  return [
    // Basic
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:image",
      content: ogImage
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: ogImage
    }
  ];
}
async function loader$4({
  request
}) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const page = url.searchParams.get("page") || "1";
    const limit = url.searchParams.get("limit") || "20";
    const letter = url.searchParams.get("letter") || "ALL";
    const hiring = url.searchParams.get("hiring") || "false";
    const [overviewRes, listRes] = await Promise.all([getCompanyOverview({
      fetchRequest: request
    }), getAllCompanies({
      fetchRequest: request,
      q,
      page,
      limit,
      letter,
      hiring
    })]);
    const overview = overviewRes == null ? void 0 : overviewRes.data;
    const list = listRes == null ? void 0 : listRes.data;
    if (!overview || !list) return null;
    return {
      overview,
      list
    };
  } catch (e) {
    console.error("Companies loader failed:", e);
    return null;
  }
}
const CompaniesPage = UNSAFE_withComponentProps(function CompaniesPage2() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  if (!data) return null;
  const {
    overview,
    list
  } = data;
  const {
    stats,
    trending,
    recently_added,
    actively_hiring
  } = overview;
  const {
    companies,
    meta: meta2
  } = list;
  const q = searchParams.get("q") || "";
  searchParams.get("letter") || "ALL";
  const hiring = searchParams.get("hiring") || "false";
  Number(searchParams.get("page") || "1");
  function updateParams(next) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "") sp.delete(k);
      else sp.set(k, v);
    });
    navigate(`?${sp.toString()}`);
  }
  const handleSearchChange = (value) => {
    updateParams({
      q: value,
      page: "1"
    });
  };
  const handleHiringFilterChange = (value) => {
    updateParams({
      hiring: value === "hiring" ? "true" : "false",
      page: "1"
    });
  };
  const handlePageChange = (p) => {
    updateParams({
      page: String(p)
    });
  };
  const totalPages = Math.ceil(meta2.total / meta2.limit);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-background",
    children: /* @__PURE__ */ jsxs("main", {
      className: "pt-16",
      children: [/* @__PURE__ */ jsx("section", {
        className: "border-b border-border bg-gradient-hero",
        children: /* @__PURE__ */ jsx("div", {
          className: "container mx-auto px-4 py-16",
          children: /* @__PURE__ */ jsxs("div", {
            className: "mx-auto max-w-3xl text-center",
            children: [/* @__PURE__ */ jsxs("h1", {
              className: "font-display text-4xl font-bold text-foreground md:text-5xl",
              children: ["Browse Companies Hiring on", " ", /* @__PURE__ */ jsx("span", {
                className: "text-gradient",
                children: "WorkWay"
              })]
            }), /* @__PURE__ */ jsxs("p", {
              className: "mt-4 text-lg text-muted-foreground",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-mono text-primary",
                children: overview.stats.total_companies.toLocaleString()
              }), " ", "companies •", " ", /* @__PURE__ */ jsx("span", {
                className: "font-mono text-primary",
                children: overview.stats.total_jobs.toLocaleString()
              }), " ", "open jobs • Startups to large tech firms"]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-8",
              children: /* @__PURE__ */ jsx(SearchBar, {
                value: q,
                onChange: handleSearchChange
              })
            })]
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 py-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-8 grid gap-4 md:grid-cols-3",
          children: [/* @__PURE__ */ jsx(FeaturedSection, {
            title: "Trending Companies",
            icon: "trending",
            companies: trending
          }), /* @__PURE__ */ jsx(FeaturedSection, {
            title: "Recently Added",
            icon: "new",
            companies: recently_added
          }), /* @__PURE__ */ jsx(FeaturedSection, {
            title: "Actively Hiring",
            icon: "hiring",
            companies: actively_hiring
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mb-6",
          children: /* @__PURE__ */ jsx(FilterBar, {
            hiringFilter: hiring === "true" ? "hiring" : "all",
            sortBy: "jobs",
            onHiringFilterChange: handleHiringFilterChange,
            onSortChange: () => {
            }
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-6 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(Building2, {
            className: "h-5 w-5 text-muted-foreground"
          }), /* @__PURE__ */ jsxs("span", {
            className: "text-muted-foreground",
            children: ["Showing", " ", /* @__PURE__ */ jsx("span", {
              className: "font-mono text-foreground",
              children: meta2.total
            }), " ", "companies"]
          })]
        }), companies.length > 0 ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx("div", {
            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
            children: companies.map((company) => /* @__PURE__ */ jsx(CompanyCard, {
              company
            }, company.id))
          }), /* @__PURE__ */ jsx(Pagination, {
            currentPage: meta2.page,
            totalPages,
            onPageChange: handlePageChange
          })]
        }) : /* @__PURE__ */ jsxs("div", {
          className: "py-16 text-center",
          children: [/* @__PURE__ */ jsx(Building2, {
            className: "mx-auto h-12 w-12 text-muted-foreground/50"
          }), /* @__PURE__ */ jsx("h3", {
            className: "mt-4 font-display text-lg font-semibold text-foreground",
            children: "No companies found"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-muted-foreground",
            children: "Try searching: Jane Street, Duolingo , Anthropic"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-16 rounded-xl border border-border bg-card/30 p-8",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "font-display text-xl font-semibold text-foreground",
            children: "Discover Top Hiring Companies on WorkWay"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 text-muted-foreground leading-relaxed",
            children: "WorkWay indexes hundreds of companies hiring across startups and enterprises. Discover companies, explore their open roles, and learn about their teams, culture, and tech stacks. From fast-growing startups to established tech giants, find your next opportunity at companies that are actively looking for talent like you."
          })]
        })]
      })]
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompaniesPage,
  loader: loader$4,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const DOMAIN_API_PREFIX = "/api/filter/domain";
function getDomainJobs({
  fetchRequest,
  slug,
  page = 1,
  employment_type = "all",
  employment_level = "all",
  location = "all"
}) {
  return get({
    url: `${DOMAIN_API_PREFIX}/`,
    useAuth: false,
    fetchRequest,
    query: { slug, page, employment_type, employment_level, location }
  });
}
function getAllDomainDetails({
  fetchRequest
}) {
  return get({
    url: `${DOMAIN_API_PREFIX}/all`,
    useAuth: false,
    fetchRequest
  });
}
const DomainCard = ({
  domain,
  slug,
  icon,
  jobCount,
  index
}) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.05 },
      children: /* @__PURE__ */ jsx(Link, { to: `/domain/${slug}`, className: "group block", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(82_100%_55%/0.15)]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground", children: icon }),
          /* @__PURE__ */ jsxs("h3", { className: "mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary", children: [
            "All ",
            domain,
            " Jobs"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4 font-mono text-sm text-muted-foreground", children: [
            jobCount.toLocaleString(),
            " openings"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary", children: [
            /* @__PURE__ */ jsx("span", { children: "Explore jobs" }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] })
        ] })
      ] }) })
    }
  );
};
const DOMAIN_ICON_MAP = {
  "Software Engineering": Code,
  Backend: Database,
  Frontend: Layers,
  "Full-stack": Layers,
  Android: Cpu,
  DevOps: Settings,
  "AI / Data Science": LineChart,
  "Design / Creative": Palette,
  "Product / Project": Briefcase,
  "Customer Acquisition": Megaphone,
  "Support / Customer Success": Headphones,
  "Talent / HR": Users,
  "Accounts / Finance": Wallet,
  Operations: Wrench,
  Legal: Scale,
  "QA / Testing": TestTube,
  Admin: UserCog,
  "Admin / Office": UserCog,
  Research: FileSearch,
  Analyst: LineChart,
  Other: Briefcase
};
function getDomainIcon(domainName) {
  return DOMAIN_ICON_MAP[domainName] || Briefcase;
}
function meta$4({}) {
  const title = "Browse Jobs by Domain | WorkWay";
  const description = "Explore jobs across all major domains including software engineering, design, data science, finance, marketing, operations and more. Find your next role on WorkWay.";
  const canonicalUrl = "https://www.workway.dev/domains";
  const ogImage = "https://www.workway.dev/logo.png";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      rel: "canonical",
      href: canonicalUrl
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: canonicalUrl
    },
    {
      property: "og:image",
      content: ogImage
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: ogImage
    }
  ];
}
async function loader$3({
  request
}) {
  try {
    const res = await getAllDomainDetails({
      fetchRequest: request
    });
    const data = res == null ? void 0 : res.data;
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}
const Domains = UNSAFE_withComponentProps(function Domains2() {
  const domains = useLoaderData();
  if (!domains) return null;
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-background",
    children: /* @__PURE__ */ jsxs("main", {
      className: "container mx-auto px-4 pb-20 pt-32",
      children: [/* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        className: "mx-auto mb-16 max-w-3xl text-center",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl",
          children: ["Browse Jobs by ", /* @__PURE__ */ jsx("span", {
            className: "text-primary",
            children: "Domain"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto max-w-2xl text-lg text-muted-foreground",
          children: "Explore opportunities across every industry and specialization."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-6xl",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          children: domains.map((d, index) => {
            const Icon = getDomainIcon(d.domain);
            return /* @__PURE__ */ jsx(DomainCard, {
              domain: d.domain,
              slug: d.slug,
              icon: /* @__PURE__ */ jsx(Icon, {
                className: "h-6 w-6"
              }),
              jobCount: d.job_count,
              index
            }, d.slug);
          })
        })
      }), /* @__PURE__ */ jsx(motion.section, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          duration: 0.5,
          delay: 0.8
        },
        className: "mx-auto mt-24 max-w-4xl",
        children: /* @__PURE__ */ jsxs("div", {
          className: "rounded-xl border border-border bg-card/50 p-8 md:p-12",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "mb-6 text-2xl font-semibold text-foreground",
            children: "Find Your Perfect Job Domain"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-4 text-muted-foreground",
            children: [/* @__PURE__ */ jsx("p", {
              children: "WorkWay makes job hunting simple by organizing opportunities across all major industries and domains. Whether you're a software engineer looking for your next challenge, a designer seeking creative opportunities, or a healthcare professional ready to make a difference—we've got you covered."
            }), /* @__PURE__ */ jsx("p", {
              children: "Each domain page features curated job listings with no spam, no duplicate postings, and no corporate soul damage. Our intelligent matching system ensures you see only relevant opportunities that match your skills and experience."
            }), /* @__PURE__ */ jsxs("p", {
              children: ["From ", /* @__PURE__ */ jsx("strong", {
                className: "text-foreground",
                children: "Engineering"
              }), " ", "and ", /* @__PURE__ */ jsx("strong", {
                className: "text-foreground",
                children: "Design"
              }), " to", " ", /* @__PURE__ */ jsx("strong", {
                className: "text-foreground",
                children: "Healthcare"
              }), " and", " ", /* @__PURE__ */ jsx("strong", {
                className: "text-foreground",
                children: "Finance"
              }), "—explore thousands of verified positions from companies that actually care about hiring great talent."]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-8 flex flex-wrap gap-3",
            children: ["Remote-friendly", "Verified listings", "No duplicates", "Fast applications"].map((tag) => /* @__PURE__ */ jsx("span", {
              className: "rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs text-muted-foreground",
              children: tag
            }, tag))
          })]
        })
      })]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Domains,
  loader: loader$3,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  const title = "Hire Me Profile — Create Your Hiring Profile | WorkWay";
  const description = "Create your Hire Me profile on WorkWay and let companies discover you. Build a professional profile, showcase your skills, and get discovered by top employers. Coming soon.";
  const canonicalUrl = "https://www.workway.dev/hireme";
  const ogImage = "https://www.workway.dev/logo.png";
  return [
    // Basic
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // Canonical
    {
      rel: "canonical",
      href: canonicalUrl
    },
    // Robots
    {
      name: "robots",
      content: "index, follow"
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: canonicalUrl
    },
    {
      property: "og:image",
      content: ogImage
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: ogImage
    }
  ];
}
const HireMe = UNSAFE_withComponentProps(function Hireme() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative overflow-hidden border-b border-border bg-gradient-hero",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto container relative py-16 md:py-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "mx-auto max-w-3xl text-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6",
            children: [/* @__PURE__ */ jsx(Sparkles, {
              className: "h-4 w-4 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-mono text-sm text-primary",
              children: "WorkWay Hire Me"
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4",
            children: ["Create Your ", /* @__PURE__ */ jsx("span", {
              className: "text-primary",
              children: "Hire Me"
            }), " Profile"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto",
            children: "A professional profile that lets companies discover you directly — showcase your skills, experience, and what you want to work on."
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "mx-auto container py-12",
      children: /* @__PURE__ */ jsx("div", {
        className: "mx-auto max-w-3xl",
        children: /* @__PURE__ */ jsxs("div", {
          className: "rounded-xl border border-border bg-card/40 p-12 text-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
            children: /* @__PURE__ */ jsx(UserPlus, {
              className: "h-8 w-8 text-primary"
            })
          }), /* @__PURE__ */ jsx("h2", {
            className: "font-display text-2xl font-semibold mb-3",
            children: "Coming Soon"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground max-w-md mx-auto mb-6",
            children: "We’re building a simple, powerful “Hire Me” profile that lets you create a single page companies can browse and contact you from. This will be available shortly."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mx-auto max-w-md rounded-lg border border-border bg-secondary/40 p-6 text-left",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-3 mb-3",
              children: [/* @__PURE__ */ jsx(Briefcase, {
                className: "h-5 w-5 text-primary mt-0.5"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "List your skills, experience, and preferred roles"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-3 mb-3",
              children: [/* @__PURE__ */ jsx(Briefcase, {
                className: "h-5 w-5 text-primary mt-0.5"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Get discovered by companies hiring in your domain"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-3",
              children: [/* @__PURE__ */ jsx(Briefcase, {
                className: "h-5 w-5 text-primary mt-0.5"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Share one clean WorkWay profile link instead of multiple docs"
              })]
            })]
          })]
        })
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HireMe,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function getUniqueLocations(jobs) {
  return [...new Set(jobs.map((job) => job.location))];
}
function getUniqueExperienceLevels(jobs) {
  return [...new Set(jobs.map((job) => job.experience_level))];
}
function getUniqueDomains(jobs) {
  return [...new Set(jobs.map((job) => job.domain))];
}
function getJobsByDomain(jobs) {
  return jobs.reduce((acc, job) => {
    const domain = job.domain;
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(job);
    return acc;
  }, {});
}
function getDomainStats(jobs) {
  const byDomain = getJobsByDomain(jobs);
  return Object.entries(byDomain).map(([domain, domainJobs]) => ({ domain, count: domainJobs.length })).sort((a, b) => b.count - a.count);
}
function CompanyHeader({ company }) {
  const locations = getUniqueLocations(company.jobListings);
  const domains = getUniqueDomains(company.jobListings);
  const stats = [
    { label: "Open Roles", value: company.jobListings.length, icon: Briefcase },
    { label: "Locations", value: locations.length, icon: MapPin },
    { label: "Domains", value: domains.length, icon: Users }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "relative overflow-hidden border-b border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
          company.logo_url ? /* @__PURE__ */ jsx("div", { className: "w-20 h-20", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: company.logo_url,
              alt: `${company.name} logo`,
              className: "w-full h-full object-contain p-2"
            }
          ) }) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl gradient-card border border-border flex items-center justify-center glow-subtle", children: /* @__PURE__ */ jsx(Building2, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight gradient-text", children: company.name }),
            company.website && /* @__PURE__ */ jsxs(
              "a",
              {
                href: company.website,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-mono",
                children: [
                  /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5" }),
                  company.website.replace("https://", "")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: company.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: stats.map((stat) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "gradient-card border border-border rounded-xl px-6 py-4 min-w-[120px] border-glow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsx(stat.icon, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-foreground", children: stat.value })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: stat.label })
          ]
        },
        stat.label
      )) })
    ] }) })
  ] });
}
function TeamBreakdown({ jobs }) {
  const stats = getDomainStats(jobs);
  const maxCount = Math.max(...stats.map((s) => s.count));
  return /* @__PURE__ */ jsxs("section", { className: "border border-border rounded-xl gradient-card overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-border", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Team Breakdown" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Open roles by domain" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: stats.map((stat) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "px-6 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors",
        children: [
          /* @__PURE__ */ jsx("span", { className: "flex-1 font-medium", children: stat.domain }),
          /* @__PURE__ */ jsx("div", { className: "w-32 h-2 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-500",
              style: { width: `${stat.count / maxCount * 100}%` }
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "w-8 text-right font-mono text-sm text-primary", children: stat.count })
        ]
      },
      stat.domain
    )) })
  ] });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function JobFilters$1({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedExperience,
  onExperienceChange,
  locations,
  experienceLevels: experienceLevels2,
  onReset
}) {
  const hasFilters = searchQuery || selectedLocation !== "all" || selectedExperience !== "all";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search roles...",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10 bg-secondary border-border focus:border-primary focus:ring-primary/20"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Select, { value: selectedLocation, onValueChange: onLocationChange, children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px] bg-secondary border-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Location" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Locations" }),
        locations.map((loc) => /* @__PURE__ */ jsx(SelectItem, { value: loc, children: loc }, loc))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Select, { value: selectedExperience, onValueChange: onExperienceChange, children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[160px] bg-secondary border-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Experience" }) }),
      /* @__PURE__ */ jsxs(SelectContent, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Levels" }),
        experienceLevels2.map((level) => /* @__PURE__ */ jsx(SelectItem, { value: level, children: level }, level))
      ] })
    ] }),
    hasFilters && /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onReset,
        className: "text-muted-foreground hover:text-foreground",
        children: [
          /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-1" }),
          "Clear"
        ]
      }
    )
  ] });
}
function JobCard$2({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1e3 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  return /* @__PURE__ */ jsx(Link, { to: `/job/${job.slug}`, className: "block", children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between px-5 py-4 hover:bg-secondary/50 transition-all duration-200 border-b border-border last:border-b-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-medium text-foreground group-hover:text-primary transition-colors truncate", children: job.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-1.5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5" }),
          job.location
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
          job.experience_level
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-secondary", children: job.employment_type })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-mono", children: formatDate(job.updated_at) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground",
          asChild: true,
          children: /* @__PURE__ */ jsxs("a", { href: job.url, target: "_blank", rel: "noopener noreferrer", children: [
            "Apply",
            /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3.5 h-3.5 ml-1" })
          ] })
        }
      )
    ] })
  ] }) });
}
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
function DomainAccordion({ jobsByDomain }) {
  const domains = Object.keys(jobsByDomain).sort(
    (a, b) => jobsByDomain[b].length - jobsByDomain[a].length
  );
  if (domains.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "No jobs match your filters." }) });
  }
  return /* @__PURE__ */ jsx(Accordion, { type: "multiple", defaultValue: domains, className: "space-y-3", children: domains.map((domain) => /* @__PURE__ */ jsxs(
    AccordionItem,
    {
      value: domain,
      className: "border border-border rounded-xl overflow-hidden gradient-card data-[state=open]:border-glow",
      children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-5 py-4 hover:no-underline hover:bg-secondary/30 transition-colors [&[data-state=open]>svg]:rotate-180", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Folder, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: domain }),
          /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary", children: [
            jobsByDomain[domain].length,
            " roles"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "pb-0", children: /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: jobsByDomain[domain].map((job) => /* @__PURE__ */ jsx(JobCard$2, { job }, job.id)) }) })
      ]
    },
    domain
  )) });
}
function JobsSection({ jobs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const locations = useMemo(() => getUniqueLocations(jobs), [jobs]);
  const experienceLevels2 = useMemo(
    () => getUniqueExperienceLevels(jobs),
    [jobs]
  );
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = searchQuery === "" || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
      const matchesExperience = selectedExperience === "all" || job.experience_level === selectedExperience;
      return matchesSearch && matchesLocation && matchesExperience;
    });
  }, [jobs, searchQuery, selectedLocation, selectedExperience]);
  const jobsByDomain = useMemo(
    () => getJobsByDomain(filteredJobs),
    [filteredJobs]
  );
  const handleReset = () => {
    setSearchQuery("");
    setSelectedLocation("all");
    setSelectedExperience("all");
  };
  return /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Open Positions" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredJobs.length,
          " of ",
          jobs.length,
          " roles"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      JobFilters$1,
      {
        searchQuery,
        onSearchChange: setSearchQuery,
        selectedLocation,
        onLocationChange: setSelectedLocation,
        selectedExperience,
        onExperienceChange: setSelectedExperience,
        locations,
        experienceLevels: experienceLevels2,
        onReset: handleReset
      }
    ),
    /* @__PURE__ */ jsx(DomainAccordion, { jobsByDomain })
  ] });
}
function meta$2({
  data,
  params
}) {
  var _a;
  const company = data;
  if (!company) {
    return [{
      title: "Company Not Found — WorkWay"
    }];
  }
  const name = company.name || params.companySlug || "Company";
  const count = ((_a = company.jobListings) == null ? void 0 : _a.length) || 0;
  const title = count > 0 ? `${name} Careers — ${count} Open Jobs | WorkWay` : `${name} Careers & Company Profile | WorkWay`;
  const description = count > 0 ? `Apply to ${count} open roles at ${name}. View open jobs, teams, and hiring details on WorkWay.` : `Explore ${name}'s company profile, teams, and hiring information on WorkWay.`;
  const logo = company.logo_url || "https://www.workway.dev/logo.png";
  return [
    // Basic
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:image",
      content: logo
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: logo
    }
  ];
}
async function loader$2({
  request,
  params
}) {
  try {
    const companySlug = params.companySlug || "";
    const res = await getCompanyDetails({
      fetchRequest: request,
      slug: companySlug
    });
    const data = res == null ? void 0 : res.data;
    return data && Object.keys(data).length > 0 ? data : null;
  } catch (e) {
    return null;
  }
}
const CompanyPage = UNSAFE_withComponentProps(function CompanyPage2() {
  const companyData = useLoaderData();
  if (!companyData) {
    return /* @__PURE__ */ jsx("div", {
      children: "Company not found"
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background",
    children: [/* @__PURE__ */ jsx(CompanyHeader, {
      company: companyData
    }), /* @__PURE__ */ jsx("main", {
      className: "container mx-auto px-6 py-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "lg:col-span-2 animate-fade-in",
          children: /* @__PURE__ */ jsx(JobsSection, {
            jobs: companyData.jobListings
          })
        }), /* @__PURE__ */ jsx("aside", {
          className: "lg:col-span-1 animate-fade-in",
          style: {
            animationDelay: "0.1s"
          },
          children: /* @__PURE__ */ jsx("div", {
            className: "sticky top-6",
            children: /* @__PURE__ */ jsx(TeamBreakdown, {
              jobs: companyData.jobListings
            })
          })
        })]
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CompanyPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function JobCard$1({ job }) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(job.created_at).getTime()) / (1e3 * 60 * 60 * 24)
  );
  const timeAgo = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;
  return /* @__PURE__ */ jsx(Link, { to: `/job/${job.slug}`, className: "block", children: /* @__PURE__ */ jsxs("article", { className: "group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:glow-subtle animate-fade-in", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-lg bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary", children: [
          job.company_logo_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: job.company_logo_url,
              alt: `${job.company} logo`,
              className: "h-full w-full object-contain p-2",
              onError: (e) => {
                var _a;
                e.currentTarget.style.display = "none";
                (_a = e.currentTarget.nextElementSibling) == null ? void 0 : _a.classList.remove(
                  "hidden"
                );
              }
            }
          ) : null,
          /* @__PURE__ */ jsx(
            Building2,
            {
              className: `h-6 w-6 text-muted-foreground ${job.company_logo ? "hidden" : ""}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors", children: job.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: job.company })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
              job.location
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
              timeAgo
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "font-mono text-xs", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "mr-1 h-3 w-3" }),
              job.employment_type
            ] }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-primary/30 text-primary",
                children: job.experience_level
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-start", children: /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          size: "sm",
          className: "group/btn ...",
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: job.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: (e) => e.stopPropagation(),
              children: [
                "Apply",
                /* @__PURE__ */ jsx(ExternalLink, { className: "ml-1.5 h-3.5 w-3.5" })
              ]
            }
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground line-clamp-2", children: job.description })
  ] }) });
}
const experienceLevels = [
  "Intern",
  "Junior",
  "Mid-level",
  "Senior",
  "Staff",
  "Lead",
  "Manager",
  "Director"
];
const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
function JobFilters({
  searchQuery,
  onSearchChange,
  experienceLevel,
  onExperienceLevelChange,
  employmentType,
  onEmploymentTypeChange,
  location,
  onLocationChange,
  onClearFilters,
  activeFiltersCount
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search jobs, companies...",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          className: "pl-10 bg-secondary border-border focus:border-primary focus:ring-primary/20"
        }
      ),
      searchQuery && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onSearchChange(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: "Filters" })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: experienceLevel, onValueChange: onExperienceLevelChange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[160px] bg-secondary border-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Experience" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Levels" }),
          experienceLevels.map((level) => /* @__PURE__ */ jsx(SelectItem, { value: level, children: level }, level))
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: employmentType, onValueChange: onEmploymentTypeChange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[140px] bg-secondary border-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Type" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Types" }),
          employmentTypes.map((type) => /* @__PURE__ */ jsx(SelectItem, { value: type, children: type }, type))
        ] })
      ] }),
      activeFiltersCount > 0 && /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onClearFilters,
          className: "text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsx(X, { className: "mr-1 h-3 w-3" }),
            "Clear (",
            activeFiltersCount,
            ")"
          ]
        }
      )
    ] }),
    activeFiltersCount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      experienceLevel && experienceLevel !== "all" && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
        experienceLevel,
        /* @__PURE__ */ jsx("button", { onClick: () => onExperienceLevelChange("all"), children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
      ] }),
      employmentType && employmentType !== "all" && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
        employmentType,
        /* @__PURE__ */ jsx("button", { onClick: () => onEmploymentTypeChange("all"), children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
      ] }),
      location && location !== "all" && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
        location,
        /* @__PURE__ */ jsx("button", { onClick: () => onLocationChange("all"), children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
      ] })
    ] })
  ] });
}
function JobPagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(-5);
    return pages.slice(currentPage - 3, currentPage + 2);
  };
  const visiblePages = getVisiblePages();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "icon",
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "border-border hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
      }
    ),
    visiblePages[0] > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => onPageChange(1),
          className: "font-mono text-muted-foreground hover:text-foreground",
          children: "1"
        }
      ),
      visiblePages[0] > 2 && /* @__PURE__ */ jsx("span", { className: "px-2 text-muted-foreground", children: "..." })
    ] }),
    visiblePages.map((page) => /* @__PURE__ */ jsx(
      Button,
      {
        variant: page === currentPage ? "default" : "ghost",
        size: "sm",
        onClick: () => onPageChange(page),
        className: `font-mono ${page === currentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: page
      },
      page
    )),
    visiblePages[visiblePages.length - 1] < totalPages && /* @__PURE__ */ jsxs(Fragment, { children: [
      visiblePages[visiblePages.length - 1] < totalPages - 1 && /* @__PURE__ */ jsx("span", { className: "px-2 text-muted-foreground", children: "..." }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => onPageChange(totalPages),
          className: "font-mono text-muted-foreground hover:text-foreground",
          children: totalPages
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "icon",
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "border-border hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      }
    )
  ] });
}
function meta$1({
  data,
  location,
  params
}) {
  if (!data) {
    return [{
      title: "Jobs — WorkWay"
    }];
  }
  const {
    domain,
    meta: meta2
  } = data;
  const url = new URL(location.pathname + location.search, "https://www.workway.dev");
  const page = url.searchParams.get("page");
  const employment_type = url.searchParams.get("employment_type");
  const employment_level = url.searchParams.get("employment_level");
  const locationFilter = url.searchParams.get("location");
  const domainName = (domain == null ? void 0 : domain.name) || "Jobs";
  const total = (meta2 == null ? void 0 : meta2.total) || 0;
  let title = `${domainName} Jobs (${total.toLocaleString()} Open Roles) | WorkWay`;
  let description = `Browse ${total.toLocaleString()} open ${domainName.toLowerCase()} jobs across top companies. Find the latest roles, apply directly, and explore opportunities on WorkWay.`;
  const parts = [];
  if (employment_level && employment_level !== "all") {
    parts.push(employment_level);
  }
  if (employment_type && employment_type !== "all") {
    parts.push(employment_type);
  }
  if (locationFilter && locationFilter !== "all") {
    parts.push(`in ${locationFilter}`);
  }
  if (parts.length > 0) {
    const suffix = parts.join(" ");
    title = `${domainName} Jobs ${suffix} | WorkWay`;
    description = `Browse ${domainName.toLowerCase()} jobs ${suffix}. Find open roles across top companies and apply on WorkWay.`;
  }
  if (page && page !== "1") {
    title = `${title} — Page ${page}`;
  }
  const canonicalUrl = `https://www.workway.dev${location.pathname}${location.search}`;
  const ogImage = "https://www.workway.dev/logo.png";
  return [
    // Basic
    {
      title
    },
    {
      name: "description",
      content: description
    },
    // Canonical
    {
      rel: "canonical",
      href: canonicalUrl
    },
    // Robots
    {
      name: "robots",
      content: "index, follow"
    },
    // OpenGraph
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: canonicalUrl
    },
    {
      property: "og:image",
      content: ogImage
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: ogImage
    }
  ];
}
async function loader$1({
  request,
  params
}) {
  try {
    const domainSlug = params.domainSlug || "";
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const employment_type = url.searchParams.get("employment_type") || "all";
    const employment_level = url.searchParams.get("employment_level") || "all";
    const location = url.searchParams.get("location") || "all";
    const res = await getDomainJobs({
      fetchRequest: request,
      slug: domainSlug,
      page,
      employment_type,
      employment_level,
      location
    });
    const data = res == null ? void 0 : res.data;
    return data && Object.keys(data).length > 0 ? data : null;
  } catch (e) {
    return null;
  }
}
const DomainPage = UNSAFE_withComponentProps(function DomainPage2() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  if (!data) return null;
  const {
    domain,
    jobs,
    meta: meta2
  } = data;
  searchParams.get("q") || "";
  const experienceLevel = searchParams.get("employment_level") || "all";
  const employmentType = searchParams.get("employment_type") || "all";
  const location = searchParams.get("location") || "all";
  const currentPage = Number(searchParams.get("page") || "1");
  function updateParams(next) {
    const sp = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "" || v === "all") sp.delete(k);
      else sp.set(k, v);
    });
    navigate(`?${sp.toString()}`);
  }
  const handleFilterChange = (key) => (value) => {
    updateParams({
      [key]: value,
      page: "1"
    });
  };
  const handleSearchChange = (value) => {
    updateParams({
      location: value || "all",
      page: "1"
    });
  };
  const clearFilters = () => {
    updateParams({
      employment_level: null,
      employment_type: null,
      location: null,
      page: "1"
    });
  };
  const activeFiltersCount = [experienceLevel !== "all", employmentType !== "all", location !== "all"].filter(Boolean).length;
  const totalPages = (meta2 == null ? void 0 : meta2.total_pages) || 1;
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-background ",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative overflow-hidden border-b border-border bg-gradient-hero",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto container relative py-16 md:py-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-3xl",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6",
            children: [/* @__PURE__ */ jsx(Code2, {
              className: "h-4 w-4 text-primary"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-mono text-sm text-primary",
              children: domain.name
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4",
            children: [domain.name, " ", /* @__PURE__ */ jsx("span", {
              className: "text-primary",
              children: "Jobs"
            })]
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-lg text-muted-foreground mb-8 max-w-2xl",
            children: ["Browse latest ", domain.name, " roles across top companies."]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap gap-6",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(Briefcase, {
                className: "h-5 w-5 text-primary"
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-mono text-sm text-muted-foreground",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-foreground font-semibold",
                  children: meta2.total
                }), " ", "open positions"]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(TrendingUp, {
                className: "h-5 w-5 text-primary"
              }), /* @__PURE__ */ jsxs("span", {
                className: "font-mono text-sm text-muted-foreground",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-foreground font-semibold",
                  children: "Updated"
                }), " ", "daily"]
              })]
            })]
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "mx-auto container py-8 md:py-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid gap-8",
        children: [/* @__PURE__ */ jsx(JobFilters, {
          searchQuery: location === "all" ? "" : location,
          onSearchChange: handleSearchChange,
          experienceLevel,
          onExperienceLevelChange: handleFilterChange("employment_level"),
          employmentType,
          onEmploymentTypeChange: handleFilterChange("employment_type"),
          location,
          onLocationChange: handleFilterChange("location"),
          onClearFilters: clearFilters,
          activeFiltersCount
        }), /* @__PURE__ */ jsx("div", {
          className: "flex items-center justify-between",
          children: /* @__PURE__ */ jsxs("p", {
            className: "text-sm text-muted-foreground",
            children: ["Showing", " ", /* @__PURE__ */ jsx("span", {
              className: "font-mono text-foreground",
              children: jobs.length
            }), " ", "jobs"]
          })
        }), jobs.length > 0 ? /* @__PURE__ */ jsx("div", {
          className: "grid gap-4",
          children: jobs.map((job, index) => /* @__PURE__ */ jsx("div", {
            style: {
              animationDelay: `${index * 50}ms`
            },
            children: /* @__PURE__ */ jsx(JobCard$1, {
              job
            })
          }, job.id))
        }) : /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col items-center justify-center py-16 text-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "rounded-full bg-secondary p-4 mb-4",
            children: /* @__PURE__ */ jsx(Briefcase, {
              className: "h-8 w-8 text-muted-foreground"
            })
          }), /* @__PURE__ */ jsx("h3", {
            className: "font-display text-xl font-semibold mb-2",
            children: "No jobs found"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground mb-4",
            children: "Try adjusting your filters"
          }), /* @__PURE__ */ jsx("button", {
            onClick: clearFilters,
            className: "text-primary hover:underline font-mono text-sm",
            children: "Clear all filters"
          })]
        }), totalPages > 1 && /* @__PURE__ */ jsx("div", {
          className: "mt-8",
          children: /* @__PURE__ */ jsx(JobPagination, {
            currentPage,
            totalPages,
            onPageChange: (p) => updateParams({
              page: String(p)
            })
          })
        })]
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DomainPage,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const JobBadge = ({
  children,
  variant = "default",
  className
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" && "border border-border bg-secondary text-secondary-foreground",
        variant === "primary" && "border border-primary/30 bg-primary/10 text-primary",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      ),
      children
    }
  );
};
const JobSection = ({ heading, content, index }) => {
  return /* @__PURE__ */ jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.05 },
      className: "job-card",
      children: [
        /* @__PURE__ */ jsx("h3", { className: "section-heading", children: heading }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: content.map((item, i) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-start gap-3 text-muted-foreground leading-relaxed",
            children: [
              content.length > 1 && /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }),
              /* @__PURE__ */ jsx("span", { className: content.length === 1 ? "" : "", children: item })
            ]
          },
          i
        )) })
      ]
    }
  );
};
const JobCard = ({
  id,
  title,
  slug,
  company_logo_url,
  company,
  location,
  employment_type,
  domain
}) => {
  return /* @__PURE__ */ jsx(Link, { to: `/job/${slug}`, className: "group block", children: /* @__PURE__ */ jsxs("div", { className: "job-card h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors", children: company_logo_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: company_logo_url,
          alt: `${company} logo`,
          className: "max-h-8 max-w-full object-contain"
        }
      ) : /* @__PURE__ */ jsx(Building2, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-muted-foreground", children: company })
    ] }),
    /* @__PURE__ */ jsx("h4", { className: "mb-3 text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(JobBadge, { variant: "primary", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "mr-1 h-3 w-3" }),
        location
      ] }),
      /* @__PURE__ */ jsxs(JobBadge, { children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "mr-1 h-3 w-3" }),
        employment_type
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 pt-3 border-t border-border", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: domain }) })
  ] }) });
};
const JOB_API_PREFIX = "/api/job";
function getJobDetails({
  fetchRequest,
  slug
}) {
  return get({
    url: `${JOB_API_PREFIX}/details`,
    useAuth: false,
    fetchRequest,
    query: { slug }
  });
}
const JOB_DOMAINS = [
  { name: "Android", slug: "android" },
  { name: "Backend", slug: "backend" },
  { name: "Frontend", slug: "frontend" },
  { name: "iOS", slug: "ios" },
  { name: "Full-stack", slug: "full-stack" },
  { name: "DevOps", slug: "devops" },
  { name: "AI / Data Science", slug: "ai-data-science" },
  { name: "Customer Acquisition", slug: "customer-acquisition" },
  { name: "Talent / HR", slug: "talent-hr" },
  { name: "Accounts / Finance", slug: "accounts-finance" },
  { name: "Product / Project", slug: "product-project" },
  { name: "Support / Customer Success", slug: "support-customer-success" },
  { name: "Operations", slug: "operations" },
  { name: "Legal", slug: "legal" },
  { name: "Design / Creative", slug: "design-creative" },
  { name: "QA / Testing", slug: "qa-testing" },
  { name: "Admin / Office", slug: "admin-office" },
  { name: "AI", slug: "ai" },
  { name: "Software Engineering", slug: "software-engineering" },
  { name: "Analyst", slug: "analyst" },
  { name: "Research", slug: "research" },
  { name: "Other", slug: "other" }
];
function getDomainSlug(name) {
  const domain = JOB_DOMAINS.find((d) => d.name === name);
  return domain ? domain.slug : "other";
}
function meta({
  data,
  params
}) {
  const job = data;
  if (!job) {
    return [{
      title: "Job Not Found — WorkWay"
    }, {
      name: "robots",
      content: "noindex"
    }];
  }
  const titleText = `${job.title} at ${job.company} (${job.location}) | WorkWay`;
  const descriptionText = `Apply for the ${job.title} role at ${job.company} in ${job.location}. ${job.experience_level} · ${job.employment_type}. View full job details and apply.`;
  const image = job.company_logo_url || job.logo_url || "https://www.workway.dev/logo.png";
  const url = `https://www.workway.dev/job/${job.slug}`;
  return [{
    title: titleText
  }, {
    name: "description",
    content: descriptionText
  }, {
    rel: "canonical",
    href: url
  }, {
    property: "og:title",
    content: titleText
  }, {
    property: "og:description",
    content: descriptionText
  }, {
    property: "og:type",
    content: "website"
  }, {
    property: "og:url",
    content: url
  }, {
    property: "og:image",
    content: image
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }, {
    name: "twitter:title",
    content: titleText
  }, {
    name: "twitter:description",
    content: descriptionText
  }, {
    name: "twitter:image",
    content: image
  }];
}
async function loader({
  request,
  params
}) {
  try {
    const jobSlug = params.jobSlug || "";
    const res = await getJobDetails({
      fetchRequest: request,
      slug: jobSlug
    });
    const data = res == null ? void 0 : res.data;
    return data && Object.keys(data).length > 0 ? data : null;
  } catch (e) {
    return null;
  }
}
const JobPage = UNSAFE_withComponentProps(function JobPage2() {
  var _a, _b, _c;
  const jobData = useLoaderData();
  const domainJobs = (jobData == null ? void 0 : jobData.similarJobsByDomain) || [];
  const companyJobs = (jobData == null ? void 0 : jobData.otherJobsByCompany) || [];
  if (!jobData) {
    return /* @__PURE__ */ jsx("div", {
      children: "Job not found"
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-background flex justify-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-7xl",
      children: [/* @__PURE__ */ jsxs("section", {
        className: "relative overflow-hidden border-b border-border/50",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute inset-0 overflow-hidden",
          children: /* @__PURE__ */ jsx("div", {
            className: "absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "container relative py-16 md:py-24",
          children: [/* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              x: -10
            },
            animate: {
              opacity: 1,
              x: 0
            },
            transition: {
              duration: 0.3
            },
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/jobs",
              className: "mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: [/* @__PURE__ */ jsx(ArrowLeft, {
                className: "h-4 w-4"
              }), "Back to Jobs"]
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "max-w-3xl",
              children: [/* @__PURE__ */ jsx(motion.div, {
                initial: {
                  opacity: 0,
                  y: 10
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                transition: {
                  duration: 0.4,
                  delay: 0.1
                },
                className: "mb-6",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-3 mb-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "flex h-12 w-12 items-center justify-center rounded-xl bg-secondary",
                    children: jobData.company_logo_url ? /* @__PURE__ */ jsx("img", {
                      src: jobData.company_logo_url,
                      alt: `${jobData.company} logo`,
                      className: "max-h-10 max-w-full object-contain"
                    }) : /* @__PURE__ */ jsx(Building2, {
                      className: "h-6 w-6 text-primary"
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col",
                    children: [/* @__PURE__ */ jsx(Link, {
                      to: `/company/${jobData.company_slug}`,
                      className: "text-lg font-medium text-foreground hover:text-primary transition-colors",
                      children: jobData.company
                    }), jobData.company_url && /* @__PURE__ */ jsxs("a", {
                      href: jobData.company_url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors",
                      children: [jobData.company_url.replace(/^https?:\/\//, "").replace(/\/$/, ""), /* @__PURE__ */ jsx(ExternalLink, {
                        className: "h-3 w-3"
                      })]
                    })]
                  })]
                })
              }), /* @__PURE__ */ jsx(motion.h1, {
                initial: {
                  opacity: 0,
                  y: 10
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                transition: {
                  duration: 0.4,
                  delay: 0.15
                },
                className: "mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl",
                children: jobData.title
              }), /* @__PURE__ */ jsxs(motion.div, {
                initial: {
                  opacity: 0,
                  y: 10
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                transition: {
                  duration: 0.4,
                  delay: 0.2
                },
                className: "flex flex-wrap gap-3",
                children: [/* @__PURE__ */ jsxs(JobBadge, {
                  variant: "primary",
                  children: [/* @__PURE__ */ jsx(MapPin, {
                    className: "mr-1.5 h-3 w-3"
                  }), jobData.location]
                }), /* @__PURE__ */ jsxs(JobBadge, {
                  children: [/* @__PURE__ */ jsx(Briefcase, {
                    className: "mr-1.5 h-3 w-3"
                  }), jobData.employment_type]
                }), /* @__PURE__ */ jsxs(JobBadge, {
                  children: [/* @__PURE__ */ jsx(Clock, {
                    className: "mr-1.5 h-3 w-3"
                  }), jobData.experience_level]
                }), /* @__PURE__ */ jsx(JobBadge, {
                  variant: "muted",
                  children: jobData.domain
                })]
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                scale: 0.95
              },
              animate: {
                opacity: 1,
                scale: 1
              },
              transition: {
                duration: 0.4,
                delay: 0.25
              },
              className: "flex flex-col gap-3",
              children: [/* @__PURE__ */ jsx("a", {
                href: jobData.url,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxs(Button, {
                  size: "xl",
                  className: "cursor-pointer w-full lg:w-auto",
                  children: ["Apply Now", /* @__PURE__ */ jsx(ExternalLink, {
                    className: "ml-2 h-5 w-5"
                  })]
                })
              }), /* @__PURE__ */ jsx("p", {
                className: "text-center text-xs text-muted-foreground lg:text-left",
                children: "You'll be redirected to the company's career page"
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("section", {
        className: "py-16 md:py-24",
        children: /* @__PURE__ */ jsx("div", {
          className: "container",
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid gap-6 lg:grid-cols-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "space-y-6 lg:col-span-2",
              children: jobData.description.map((section, index) => /* @__PURE__ */ jsx(JobSection, {
                heading: section.heading,
                content: section.content,
                index
              }, index))
            }), /* @__PURE__ */ jsx("div", {
              className: "lg:sticky lg:top-24 lg:h-fit",
              children: /* @__PURE__ */ jsxs(motion.div, {
                initial: {
                  opacity: 0,
                  x: 20
                },
                animate: {
                  opacity: 1,
                  x: 0
                },
                transition: {
                  duration: 0.4,
                  delay: 0.3
                },
                className: "job-card",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "mb-6 text-lg font-semibold text-foreground",
                  children: "Job Summary"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between border-b border-border pb-4",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Company"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-foreground",
                      children: jobData.company
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between border-b border-border pb-4",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Location"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-foreground",
                      children: jobData.location
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between border-b border-border pb-4",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Type"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-foreground",
                      children: jobData.employment_type
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between border-b border-border pb-4",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Level"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-foreground",
                      children: jobData.experience_level
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "text-sm text-muted-foreground",
                      children: "Domain"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-foreground",
                      children: jobData.domain
                    })]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "mt-8",
                  children: /* @__PURE__ */ jsx("a", {
                    href: jobData.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /* @__PURE__ */ jsxs(Button, {
                      className: " cursor-pointer w-full",
                      children: ["Apply for this role", /* @__PURE__ */ jsx(ExternalLink, {
                        className: "ml-2 h-4 w-4"
                      })]
                    })
                  })
                })]
              })
            })]
          })
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "border-t border-border/50 py-16 md:py-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container",
          children: [/* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: true
            },
            transition: {
              duration: 0.4
            },
            className: "mb-8 flex items-center justify-between",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-foreground",
              children: "Similar roles you might like"
            }), /* @__PURE__ */ jsxs(Link, {
              to: `/domain/${getDomainSlug((_a = domainJobs[0]) == null ? void 0 : _a.domain)}`,
              className: "hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex",
              children: ["View all ", (_b = domainJobs[0]) == null ? void 0 : _b.domain, " roles", /* @__PURE__ */ jsx(ArrowRight, {
                className: "h-4 w-4"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
            children: domainJobs.map((job, index) => /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: true
              },
              transition: {
                duration: 0.4,
                delay: index * 0.1
              },
              children: /* @__PURE__ */ jsx(JobCard, {
                ...job
              })
            }, job.id))
          })]
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "border-t py-16 md:py-24",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container",
          children: [/* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: 0
            },
            viewport: {
              once: true
            },
            transition: {
              duration: 0.4
            },
            className: "mb-8 flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-bold text-foreground",
              children: ["More roles at ", jobData.company]
            }), /* @__PURE__ */ jsxs(Link, {
              to: `/company/${(_c = companyJobs[0]) == null ? void 0 : _c.company_slug}`,
              className: "hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex",
              children: ["View company profile", /* @__PURE__ */ jsx(ArrowRight, {
                className: "h-4 w-4"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
            children: companyJobs.map((job, index) => /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              whileInView: {
                opacity: 1,
                y: 0
              },
              viewport: {
                once: true
              },
              transition: {
                duration: 0.4,
                delay: index * 0.1
              },
              children: /* @__PURE__ */ jsx(JobCard, {
                ...job
              })
            }, job.id))
          })]
        })
      })]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JobPage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const NotFound = UNSAFE_withComponentProps(function NotFound2() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-background text-foreground",
    children: /* @__PURE__ */ jsxs("div", {
      className: "text-center px-6 max-w-lg",
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex justify-center mb-10",
        children: /* @__PURE__ */ jsx("img", {
          src: "/logo.png",
          alt: "WorkWay",
          className: "w-28 h-28 opacity-90"
        })
      }), /* @__PURE__ */ jsx("h1", {
        className: "text-7xl md:text-8xl font-semibold tracking-tight mb-6",
        children: "404"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-lg text-muted-foreground mb-2",
        children: "This page does not exist."
      }), /* @__PURE__ */ jsx("p", {
        className: "text-base text-muted-foreground mb-10",
        children: "Either the link is broken, or the page has been moved."
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-center gap-4",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition",
          children: "Go to Home"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/jobs",
          className: "px-5 py-2.5 rounded-md border border-border text-sm hover:bg-accent transition",
          children: "Browse Jobs"
        })]
      })]
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CkVvJWmp.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/index-DC3a2I_H.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-KDvZTgix.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/index-DC3a2I_H.js"], "css": ["/assets/root-CDKzV_Xf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Layout": { "id": "routes/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Layout-B8cRlFt5.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/button-ByHbeIX_.js", "/assets/arrow-right-Coei0215.js", "/assets/createLucideIcon-D3BbpBAm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/LandingPage": { "id": "routes/LandingPage", "parentId": "routes/Layout", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/LandingPage-D6K6mVEe.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/button-ByHbeIX_.js", "/assets/input-CYkXr_Mh.js", "/assets/index-C8gwEPcf.js", "/assets/arrow-left-BpLbA_Sz.js", "/assets/arrow-right-Coei0215.js", "/assets/sparkles-ycsvchR1.js", "/assets/search-vkNNraTb.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/map-pin-D5qOwAyi.js", "/assets/zap-CcIWPO5H.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/building-2-BAxPKenl.js", "/assets/users-CGo4-umT.js", "/assets/settings-BnkspFiC.js", "/assets/trending-up-DoyXpN50.js", "/assets/index-DC3a2I_H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/JobsFeed": { "id": "routes/JobsFeed", "parentId": "routes/Layout", "path": "/jobs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/JobsFeed-D9KeViY2.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/sparkles-ycsvchR1.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/createLucideIcon-D3BbpBAm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/About": { "id": "routes/About", "parentId": "routes/Layout", "path": "/about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/About-D0NkTzg3.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/CompaniesPage": { "id": "routes/CompaniesPage", "parentId": "routes/Layout", "path": "/companies", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/CompaniesPage-B9_6S2t7.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/search-vkNNraTb.js", "/assets/chevron-down-mv3dysYs.js", "/assets/zap-CcIWPO5H.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/sparkles-ycsvchR1.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/arrow-right-Coei0215.js", "/assets/chevron-left-D2Z-6cwG.js", "/assets/building-2-BAxPKenl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Domains": { "id": "routes/Domains", "parentId": "routes/Layout", "path": "/domains", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Domains-DFBNi4M8.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/proxy-C9nKnctC.js", "/assets/arrow-right-Coei0215.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/users-CGo4-umT.js", "/assets/settings-BnkspFiC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/HireMe": { "id": "routes/HireMe", "parentId": "routes/Layout", "path": "/hireme", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/HireMe-Da1AHl7Y.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/sparkles-ycsvchR1.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/briefcase-Bo_Uucgm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/CompanyPage": { "id": "routes/CompanyPage", "parentId": "routes/Layout", "path": "/company/:companySlug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/CompanyPage-CGYwK0Rr.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/map-pin-D5qOwAyi.js", "/assets/users-CGo4-umT.js", "/assets/building-2-BAxPKenl.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/input-CYkXr_Mh.js", "/assets/select-CvirS32t.js", "/assets/button-ByHbeIX_.js", "/assets/search-vkNNraTb.js", "/assets/index-C8gwEPcf.js", "/assets/chevron-down-mv3dysYs.js", "/assets/index-DC3a2I_H.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/DomainPage": { "id": "routes/DomainPage", "parentId": "routes/Layout", "path": "/domain/:domainSlug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/DomainPage-CPoeJngH.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/button-ByHbeIX_.js", "/assets/building-2-BAxPKenl.js", "/assets/map-pin-D5qOwAyi.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/external-link-CSBkVtz5.js", "/assets/input-CYkXr_Mh.js", "/assets/select-CvirS32t.js", "/assets/search-vkNNraTb.js", "/assets/createLucideIcon-D3BbpBAm.js", "/assets/chevron-left-D2Z-6cwG.js", "/assets/trending-up-DoyXpN50.js", "/assets/index-DC3a2I_H.js", "/assets/chevron-down-mv3dysYs.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/JobPage": { "id": "routes/JobPage", "parentId": "routes/Layout", "path": "/job/:jobSlug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/JobPage-B-cl_Kgu.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js", "/assets/button-ByHbeIX_.js", "/assets/proxy-C9nKnctC.js", "/assets/building-2-BAxPKenl.js", "/assets/map-pin-D5qOwAyi.js", "/assets/briefcase-Bo_Uucgm.js", "/assets/arrow-left-BpLbA_Sz.js", "/assets/external-link-CSBkVtz5.js", "/assets/arrow-right-Coei0215.js", "/assets/createLucideIcon-D3BbpBAm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/NotFound": { "id": "routes/NotFound", "parentId": "routes/Layout", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/NotFound-CL_ikVdS.js", "imports": ["/assets/chunk-EPOLDU6W-9_GPlBXh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-02e583c9.js", "version": "02e583c9", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/Layout": {
    id: "routes/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/LandingPage": {
    id: "routes/LandingPage",
    parentId: "routes/Layout",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/JobsFeed": {
    id: "routes/JobsFeed",
    parentId: "routes/Layout",
    path: "/jobs",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/About": {
    id: "routes/About",
    parentId: "routes/Layout",
    path: "/about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/CompaniesPage": {
    id: "routes/CompaniesPage",
    parentId: "routes/Layout",
    path: "/companies",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/Domains": {
    id: "routes/Domains",
    parentId: "routes/Layout",
    path: "/domains",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/HireMe": {
    id: "routes/HireMe",
    parentId: "routes/Layout",
    path: "/hireme",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/CompanyPage": {
    id: "routes/CompanyPage",
    parentId: "routes/Layout",
    path: "/company/:companySlug",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/DomainPage": {
    id: "routes/DomainPage",
    parentId: "routes/Layout",
    path: "/domain/:domainSlug",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/JobPage": {
    id: "routes/JobPage",
    parentId: "routes/Layout",
    path: "/job/:jobSlug",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/NotFound": {
    id: "routes/NotFound",
    parentId: "routes/Layout",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
