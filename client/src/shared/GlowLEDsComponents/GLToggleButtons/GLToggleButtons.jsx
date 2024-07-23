import React from "react";
import { ToggleButtonGroup, ToggleButton, Typography, Box, useTheme } from "@mui/material";

const GLToggleButtons = ({ label, ariaLabel, value, onChange, options, additionalCostLabel, sx }) => {
  const theme = useTheme();
  return (
    <Box mt={1}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <ToggleButtonGroup
        aria-label={ariaLabel}
        value={value}
        exclusive
        color="primary"
        onChange={onChange}
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: "100%",
          "& .MuiToggleButton-root": {
            color: "white",
            width: "100%",
            padding: "8px 16px",
          },
          "& .Mui-selected": {
            backgroundColor: "white !important",
            color: `${theme.palette.primary.main} !important`,
          },
        }}
      >
        {options.map((option, index) => (
          <ToggleButton
            key={index}
            value={option.name}
            aria-label={option.name}
            sx={{
              "&:hover": { backgroundColor: "#393e55" },
            }}
          >
            {option.name}
            {option.additionalCost > 0 && ` (${additionalCostLabel} $${option.additionalCost})`}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default GLToggleButtons;
