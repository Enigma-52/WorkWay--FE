import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routes";
import { matchRoutes, Params } from "react-router-dom";
import App from "./App";

type LoaderFunction = (args: { 
  params: Params<string>; 
  request: Request 
}) => Promise<unknown>;

export async function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries for SSR
        retry: false,
        // Disable refetching for SSR
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        // Set stale time for SSR
        staleTime: Infinity,
      },
    },
  });

  // Match routes to execute loaders
  const matches = matchRoutes(routes, url);
  if (matches) {
    const loaderPromises = matches
      .filter((match) => match.route.loader)
      .map((match) => {
        const loader = match.route.loader as LoaderFunction;
        return loader({ params: match.params, request: new Request(url) });
      });

    // Wait for all loaders to complete
    try {
      await Promise.all(loaderPromises);
    } catch (error) {
      console.error("Error loading data for SSR:", error);
    }
  }

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StaticRouter>
    </React.StrictMode>
  );

  return { html, head: "" };
}
