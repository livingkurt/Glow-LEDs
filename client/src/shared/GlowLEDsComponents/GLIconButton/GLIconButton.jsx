import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const GLIconButton = ({ title, onClick, children }) => {
  return (
    <Tooltip title={title}>
      <GLIconButton title={title} onClick={onClick}>
        {children}
      </GLIconButton>
    </Tooltip>
  );
};

export default GLIconButton;
