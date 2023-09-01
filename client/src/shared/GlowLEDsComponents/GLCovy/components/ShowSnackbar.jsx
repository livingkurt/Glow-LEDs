import * as React from "react";
import PropTypes from "prop-types";
import { unmountComponentAtNode } from "react-dom";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const ShowSnackbar = ({ containerNode, message, open, severity, duration, horizontal, vertical }) => {
  const handleClose = () => {
    unmountComponentAtNode(containerNode);
  };

  // eslint-disable-next-line consistent-return
  const determine_alert_color = () => {
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
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal, vertical }}
      id="covy-snackbar"
      message={message}
      open={open}
      autoHideDuration={duration}
      onClose={() => handleClose()}
    >
      <Alert
        elevation={10}
        variant="filled"
        severity={"success"}
        style={{ backgroundColor: determine_alert_color(), color: "white", fontSize: "16px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ShowSnackbar.defaultProps = {
  duration: 4000,
  horizontal: "center",
  vertical: "top",
};

ShowSnackbar.propTypes = {
  containerNode: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  duration: PropTypes.number,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
};

export default ShowSnackbar;
