import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const HeaderButton = ({ to, align, ariaLabel, children, onClick, sx, hasColumnRows, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Link to={to} aria-label={ariaLabel}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          cursor: "pointer",
          borderRadius: hasColumnRows ? "10px 0px 0px 10px" : "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            backgroundColor: theme.palette.grey[600],
            transform: "translateY(-2px)",
          },
          ...sx,
        }}
        onClick={onClick}
        {...otherProps}
      >
        <Typography
          variant="button"
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
    </Link>
  );
};

export default HeaderButton;
