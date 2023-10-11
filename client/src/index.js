import React from "react";
import ReactDOM from "react-dom"; // Add this line
import { Provider } from "react-redux";
import store from "./store";
// import './scss/css_reset.scss';
import "./scss/style.scss";

// Remove this line: import { createRoot } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { ErrorView } from "./shared/SharedComponents";
import Links from "./Links";
import Covy from "./shared/GlowLEDsComponents/GLCovy/GLCovy";
import config from "./config";

Bugsnag.start({
  apiKey: config.REACT_APP_BUGSNAG_KEY,
  plugins: [new BugsnagPluginReact()],
});

Covy();
const path = new URL(window.location.href);

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorView}>
      <React.StrictMode>{<App />}</React.StrictMode>
      {/* <React.StrictMode>{path.pathname === "/links" ? <Links /> : <App />}</React.StrictMode> */}
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
reportWebVitals();
