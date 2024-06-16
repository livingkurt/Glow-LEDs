import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const HeaderButton = ({ to, align, ariaLabel, children, onClick, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Link to={to} aria-label={ariaLabel}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(1),
          cursor: "pointer",
          transition: "background-color 0.3s",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: theme.palette.grey[600],
          },
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
