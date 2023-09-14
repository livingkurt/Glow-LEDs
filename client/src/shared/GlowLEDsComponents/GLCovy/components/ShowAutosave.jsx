import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const ShowSnackbar = ({ containerRoot, message, open, severity, duration, horizontal, vertical }) => {
  const handleClose = () => {
    containerRoot.unmount();
  };

  // eslint-disable-next-line consistent-return
  const determine_alert_color = () => {
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
    <Snackbar
      anchorOrigin={{ horizontal, vertical }}
      id="covy-snackbar"
      message={message}
      open={open}
      autoHideDuration={duration}
      // onClose={() => handleClose()}
    >
      <Alert
        elevation={10}
        variant="filled"
        severity={severity}
        style={{ backgroundColor: determine_alert_color(), color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ShowSnackbar.defaultProps = {
  duration: 4000,
  horizontal: "right",
  vertical: "top",
};

ShowSnackbar.propTypes = {
  containerRoot: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  duration: PropTypes.number,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
};

export default ShowSnackbar;
