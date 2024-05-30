import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const GLBoolean = ({ boolean, tooltip }) => {
  return (
    <Box>
      {tooltip ? (
        <Tooltip title={boolean ? `Does ${tooltip}` : `Does not ${tooltip}`}>
          {boolean ? <CheckCircle color="white" /> : <Cancel color="white" />}
        </Tooltip>
      ) : (
        <>{boolean ? <CheckCircle color="white" /> : <Cancel color="white" />}</>
      )}
    </Box>
  );
};

GLBoolean.propTypes = {
  boolean: PropTypes.bool.isRequired,
  tooltip: PropTypes.string,
};

GLBoolean.defaultProps = {
  tooltip: "",
};

export default GLBoolean;
