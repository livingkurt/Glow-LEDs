// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://ef35b0775a9ecd31de7edc7c2068a1d4@o4508738260434944.ingest.us.sentry.io/4508738339471360",
    integrations: [nodeProfilingIntegration()],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
  });
}

// Manually call startProfiler and stopProfiler
// to profile the code in between
if (process.env.NODE_ENV === "production") {
  Sentry.profiler.startProfiler();

  // Starts a transaction that will also be profiled
  Sentry.startSpan(
    {
      name: "My First Transaction",
    },
    () => {
      // the code executing inside the transaction will be wrapped in a span and profiled
    }
  );

  // Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
  // your application until the process exits or stopProfiling is called.
  Sentry.profiler.stopProfiler();
}
