import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import React from "react";

const GLBoolean = ({ boolean, tooltip }) => {
  return (
    <Box p={0.5}>
      <Tooltip title={boolean ? `Does ${tooltip}` : `Does not ${tooltip}`}>
        {boolean ? <CheckCircle color="white" /> : <Cancel color="white" />}
      </Tooltip>
    </Box>
  );
};

export default GLBoolean;
