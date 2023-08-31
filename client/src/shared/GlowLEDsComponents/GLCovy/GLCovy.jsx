import * as React from "react";
import { createRoot } from "react-dom";
import ShowSnackbar from "./components/ShowSnackbar";
import SnackBarReqLoadBar from "./components/SnackBarReqLoadBar";
import ShowAutosave from "./components/ShowAutosave";

const containerNode = document.getElementById("covy-container");
const loaderContainerNode = document.getElementById("covy-loader-container");

const containerRoot = createRoot(containerNode);
const loaderContainerRoot = createRoot(loaderContainerNode);

const Covy = () => ({
  says: msg => console.log(msg),
  showSnackbar: ({ message, severity, horizontal = "center", vertical = "top", duration = 4000 }) =>
    containerRoot.render(
      <ShowSnackbar
        anchorOrigin={{ horizontal, vertical }}
        containerNode={containerNode}
        duration={duration}
        message={message}
        severity={severity}
        open
      />
    ),
  showSnackBarReqLoadBar: ({ formData, loadMessage, successMessage, failMessage, path, updateState }) =>
    loaderContainerRoot.render(
      <SnackBarReqLoadBar
        containerNode={loaderContainerNode}
        path={path}
        formData={formData}
        loadMessage={loadMessage}
        successMessage={successMessage}
        failMessage={failMessage}
        updateState={updateState}
      />
    ),
  showAutosave: ({ message, severity, horizontal, vertical, duration }) =>
    containerRoot.render(
      <ShowAutosave
        anchorOrigin={{ horizontal, vertical }}
        containerNode={containerNode}
        duration={duration}
        message={message}
        severity={severity}
        open
      />
    ),
});

window.Covy = Covy();

export default Covy;
