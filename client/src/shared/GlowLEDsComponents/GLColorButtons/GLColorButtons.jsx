import React from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

const GLColorButtons = ({ ariaLabel, value, onChange, options, label }) => {
  return (
    <Box mt={1}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label={ariaLabel}>
        {options.map(option => (
          <ToggleButton
            key={option.name}
            value={option.name}
            style={{
              backgroundColor: option.colorCode,
              borderRadius: "10px",
              width: 50,
              height: 40,
              margin: 5,
              boxShadow:
                value === option.name
                  ? "inset 0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)"
                  : "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s, transform 0.3s",
              transform: value === option.name ? "translateY(2px)" : "translateY(0)",
            }}
          />
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default GLColorButtons;
