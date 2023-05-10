import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { unmountComponentAtNode } from "react-dom";
import { Alert } from "@mui/material";

const SnackBarReqLoadBar = ({ formData, loadMessage, successMessage, failMessage, containerNode, path, updateState }) => {
  const [progress, setProgress] = useState(0);
  const [successStat, setSuccessStat] = useState(false);
  const [failStat, setFailStat] = useState(false);

  const sendRequest = () => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", path, true);
    xhr.upload.onprogress = evt => {
      if (evt.lengthComputable) {
        const percentComplete = (evt.loaded / evt.total) * 100;
        setProgress(percentComplete);
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        updateState(xhr.response);
      }
    };
    xhr.onload = () => {
      if (xhr.status === 201) {
        setSuccessStat(true);
        if (progress < 100) {
          setTimeout(() => {
            unmountComponentAtNode(containerNode);
          }, 3000);
        }
      } else {
        setFailStat(true);
        setTimeout(() => {
          unmountComponentAtNode(containerNode);
        }, 3000);
      }
    };
    xhr.send(formData);
  };

  useEffect(() => {
    sendRequest();
    return () => {
      setProgress(0);
      setSuccessStat(false);
      setFailStat(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successStat) {
      setProgress(100);
    }
    return () => {};
  }, [successStat]);

  const getSeverity = () => {
    if (successStat || failStat) {
      return successStat ? "success" : "error";
    }
    return "success";
  };

  // eslint-disable-next-line consistent-return
  const determine_alert_color = severity => {
    switch (severity) {
      case "success":
        return "#4caf50";
      case "info":
        return "#2196f3";
      case "warning":
        return "#ffc107";
      case "error":
        return "#f44336";
      default:
    }
  };

  return (
    <div style={{ zIndex: "10000", position: "fixed", top: "75px", left: "50%", transform: "translateX(-50%)" }}>
      <Alert
        elevation={10}
        variant="filled"
        severity={getSeverity()}
        style={{ backgroundColor: determine_alert_color(getSeverity()), color: "white" }}
      >
        {successStat || failStat ? (
          <>
            {successStat && successMessage}
            {failStat && failMessage}
          </>
        ) : (
          <>
            {loadMessage}
            <LinearProgress variant="determinate" value={progress} />
          </>
        )}
      </Alert>
    </div>
  );
};

SnackBarReqLoadBar.propTypes = {
  containerNode: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  loadMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  failMessage: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired
};

export default SnackBarReqLoadBar;
