import React from "react";
import { Box } from "@mui/material";

const LineBreak = ({ line_break }) => {
  if (!line_break) return null;

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height: "20px", // Adjust this value to match your line break image height
      }}
    >
      <img
        src={line_break?.link}
        alt="Line break"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          height: "100%",
          width: "auto",
        }}
      />
    </Box>
  );
};

export default LineBreak;
