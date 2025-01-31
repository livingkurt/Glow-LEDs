import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import store from "./store";
import "./scss/style.scss";
import App from "./App";
import Covy from "./shared/GlowLEDsComponents/GLCovy/GLCovy";

Sentry.init({
  dsn: "https://162d5e12385bab4ccb7be8dc9529b4dd@o4508738260434944.ingest.us.sentry.io/4508738263515136",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/glow-leds\.com/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE,
});

Covy();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Sentry.ErrorBoundary>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Sentry.ErrorBoundary>
);
