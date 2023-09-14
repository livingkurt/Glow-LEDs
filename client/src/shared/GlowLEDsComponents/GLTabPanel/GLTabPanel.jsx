import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const GLTabPanel = ({ children, value, index, classes, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes}
      {...other}
    >
      {value === index && (
        <Box style={{ overflow: "auto" }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

GLTabPanel.defaultProps = {
  children: {},
  classes: "",
};

GLTabPanel.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default GLTabPanel;
