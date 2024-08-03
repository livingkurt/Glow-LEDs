import React from "react";
import { ToggleButtonGroup, ToggleButton, Box, useTheme } from "@mui/material";

const GLToggleButtons = ({ ariaLabel, value, onChange, options, additionalCostLabel, sx, disabledOptions }) => {
  const theme = useTheme();
  return (
    <ToggleButtonGroup
      aria-label={ariaLabel}
      value={value}
      exclusive
      color="primary"
      onChange={onChange}
      sx={{
        ...sx,
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        "& .MuiToggleButton-root": {
          color: "white",
          width: "100%",
          padding: "8px 16px",
          position: "relative", // For absolute positioning of pseudo-element
        },
        "& .Mui-selected": {
          backgroundColor: "white !important",
          color: `${theme.palette.primary.main} !important`,
        },
        "& .Mui-disabled": {
          backgroundColor: theme.palette.grey[600],
          color: `${theme.palette.grey[400]} !important`,
          cursor: "not-allowed",
          overflow: "hidden", // Ensure the pseudo-element doesn't overflow
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "10%", // Start the line at 10% from the left
            right: "10%", // End the line at 10% from the right
            borderTop: `2px solid ${theme.palette.grey[400]}`,
            transform: "translateY(-50%) rotate(-45deg)", // Center the line vertically
            transformOrigin: "center", // Rotate around the center
          },
        },
      }}
    >
      {options.map((option, index) => (
        <ToggleButton
          key={index}
          value={option.name}
          aria-label={option.name}
          disabled={disabledOptions?.includes(option.name)}
          sx={{
            "&:hover": { backgroundColor: "#393e55" },
          }}
        >
          {option.name}
          {option.additionalCost > 0 && ` (${additionalCostLabel} $${option.additionalCost})`}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default GLToggleButtons;
