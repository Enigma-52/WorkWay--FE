// src/routes.tsx
import type { RouteObject } from "react-router-dom";
import JobPage, { loader as jobLoader } from "./pages/JobPage";
import Index from "./pages/Index";

export const routes: RouteObject[] = [
  {
    path: "/job/:slug",
    element: <JobPage />,
    loader: jobLoader,
  },
  {
    path: "/",
    element: <Index />,
  },
];
