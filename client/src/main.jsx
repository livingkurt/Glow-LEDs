import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./scss/style.scss";
import App from "./App";
import Covy from "./shared/GlowLEDsComponents/GLCovy/GLCovy";

Covy();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
