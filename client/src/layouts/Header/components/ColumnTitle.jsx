import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const ColumnTitle = ({ align, ariaLabel, children, onClick, sx, hasColumnRows, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
        ...sx,
      }}
      onClick={onClick}
      {...otherProps}
    >
      <Typography
        variant="h6"
        align={align}
        sx={{
          color: theme.palette.common.white,
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default ColumnTitle;
