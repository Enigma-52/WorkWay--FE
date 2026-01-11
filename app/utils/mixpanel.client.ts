import mixpanel from "mixpanel-browser";

let initialized = false;

export function initMixpanel() {

  if (typeof window === "undefined") return;
  if (initialized) return;

  mixpanel.init("572f2bc3511f9a768d95e72b7e925c37", {
    autocapture: true,
    track_pageview: false,
    record_sessions_percent: 0,
  });

  initialized = true;

  // Expose for debugging
  (window as any).mixpanel = mixpanel;
}

export default mixpanel;
