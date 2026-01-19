import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/Layout.tsx", [
    route("/", "routes/LandingPage.tsx"),
    route("/jobs", "routes/JobsFeed.tsx"),
    route("/about", "routes/About.tsx"),
    route("/companies", "routes/CompaniesPage.tsx"),
    route("/domains", "routes/Domains.tsx"),
    route("/hireme", "routes/HireMe.tsx"),
    route("/company/:companySlug", "routes/CompanyPage.tsx"),
    route("/domain/:domainSlug", "routes/DomainPage.tsx"),
    route("/job/:jobSlug", "routes/JobPage.tsx"),
    route("*", "routes/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
