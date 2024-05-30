import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const GLIconButton = ({ tooltip, onClick, children, ...otherProps }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton aria-label={tooltip} onClick={onClick} {...otherProps}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default GLIconButton;
