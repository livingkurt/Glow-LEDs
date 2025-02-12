
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import App from "./App";

export const AppWithSentry = ({ store }) => {
  if (import.meta.env.PROD) {
    return (
      <Sentry.ErrorBoundary>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </Sentry.ErrorBoundary>
    );
  }

  return (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
};
