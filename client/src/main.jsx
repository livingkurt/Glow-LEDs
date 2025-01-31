import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import store from "./store";
import "./scss/style.scss";
import Covy from "./shared/GlowLEDsComponents/GLCovy/GLCovy";
import { AppWithSentry } from "./AppWithSentry";

// Only initialize Sentry in production
if (import.meta.env.PROD) {
  // Using Vite's env variable
  Sentry.init({
    dsn: "https://162d5e12385bab4ccb7be8dc9529b4dd@o4508738260434944.ingest.us.sentry.io/4508738263515136",
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/glow-leds\.com/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}

Covy();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<AppWithSentry store={store} />);
