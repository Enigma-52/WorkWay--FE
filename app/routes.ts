import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "routes/LandingPage.tsx"),
] satisfies RouteConfig;
