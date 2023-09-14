import React from "react";
import { Provider } from "react-redux";
import store from "./store";
// import './scss/css_reset.scss';
import "./scss/style.scss";

import { createRoot } from "react-dom";
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

const root = document.getElementById("root");
const reactRoot = createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorView}>
      <React.StrictMode>{path.pathname === "/links" ? <Links /> : <App />}</React.StrictMode>
    </ErrorBoundary>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
reportWebVitals();

// import { createRoot } from 'react-dom';
// import App from './App';

// const root = document.getElementById('root');
// const reactRoot = createRoot(root);
// reactRoot.render(<App />);
