import React from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../../../slices/snackbarSlice";

const GLSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(state => state.snackbar);
  const { open, message, severity, horizontal, vertical, duration } = snackbar;

  const handleClose = () => {
    dispatch(hideSnackbar());
  };
  const determineAlertColor = () => {
    switch (severity) {
      case "success":
        return "#3e6e3f";
      case "info":
        return "#496cba";
      case "warning":
        return "#ba8f49";
      case "error":
        return "#ba4949";
      default:
        return "#3e6e3f";
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: horizontal || "center", vertical: vertical || "top" }}
      id="covy-snackbar"
      message={message}
      open={open}
      autoHideDuration={duration || 4000}
      onClose={handleClose}
    >
      <Alert
        elevation={10}
        variant="filled"
        severity={severity || "success"}
        style={{ backgroundColor: determineAlertColor(), color: "white", fontSize: "16px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GLSnackbar;
