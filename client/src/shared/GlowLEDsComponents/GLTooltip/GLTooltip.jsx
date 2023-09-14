import React from "react";
import Tooltip from "@mui/material/Tooltip";

const GLTooltip = ({ children, tooltip, ...otherProps }) => {
  return (
    <Tooltip title={tooltip} arrow>
      <span {...otherProps}>{children}</span>
    </Tooltip>
  );
};

export default GLTooltip;
