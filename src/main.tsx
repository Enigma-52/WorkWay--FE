import React from "react";
import ReactDOM from "react-dom/client";
import { PostHogProvider } from "posthog-js/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: "2025-05-24",
        capture_exceptions: true,
        debug: import.meta.env.MODE === "development",
      }}
    >
      <RouterProvider router={router} />
    </PostHogProvider>
  </React.StrictMode>
);
