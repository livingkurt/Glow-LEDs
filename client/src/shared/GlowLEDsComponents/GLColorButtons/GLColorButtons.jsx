import React from "react";
import { Box, Tooltip, ToggleButton, ToggleButtonGroup, Typography, useTheme, useMediaQuery } from "@mui/material";

const GLColorButtons = ({ ariaLabel, value, onChange, options, label }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={1}>
      <Typography variant="subtitle1" gutterBottom>
        {label} ({!value ? "Select Color" : value})
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
        aria-label={ariaLabel}
        sx={{
          flexWrap: "wrap",
          justifyContent: "flex-start",
          "& .MuiToggleButtonGroup-grouped": {
            margin: "5px !important",
            border: 0,
          },
        }}
      >
        {console.log({ options })}
        {options
          .filter(option => option?.product?.color_object?.filament?.active)
          .map(option => (
            <Tooltip key={option.name} title={option.name} placement="top">
              <ToggleButton
                value={option.name}
                sx={{
                  backgroundColor: option.colorCode,
                  borderRadius: "10px !important",
                  width: isMobile ? 40 : 50,
                  height: isMobile ? 30 : 40,
                  padding: 0,
                  minWidth: "auto",
                  boxShadow:
                    value === option.name
                      ? "inset 0 4px 6px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)"
                      : "0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  transform: value === option.name ? "translateY(2px)" : "translateY(0)",
                  "&:hover": {
                    backgroundColor: option.colorCode,
                  },
                  "&.Mui-selected": {
                    backgroundColor: option.colorCode,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: option.colorCode,
                  },
                }}
              />
            </Tooltip>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default GLColorButtons;
