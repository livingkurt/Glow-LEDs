import { StrictMode } from "react";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import App from "./App";

export const AppWithSentry = ({ store }) => {
  if (import.meta.env.PROD) {
    return (
      <Sentry.ErrorBoundary>
        <Provider store={store}>
          <StrictMode>
            <App />
          </StrictMode>
        </Provider>
      </Sentry.ErrorBoundary>
    );
  }

  return (
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  );
};
