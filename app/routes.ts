import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/LandingPage.tsx"),
    route("/about", "routes/About.tsx"),

    route("*", "routes/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
