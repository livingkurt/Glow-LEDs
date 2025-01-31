import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration, ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "your-backend-dsn-here",
  integrations: [
    // Enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // Enable profiling
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
});

export default Sentry;
