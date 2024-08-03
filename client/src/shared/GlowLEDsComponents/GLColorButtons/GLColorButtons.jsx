import React from "react";
import { Box, ToggleButton, ToggleButtonGroup, useTheme, useMediaQuery, lighten } from "@mui/material";

const GLColorButtons = ({ ariaLabel, value, onChange, options, disabledOptions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const hasFilamentOptions = options.some(option => "filament" in option);

  const processedOptions = options
    .filter(option => !hasFilamentOptions || option?.filament?.active)
    .map(option => ({
      ...option,
      normalizedColorCode: option.filament?.color_code || option.colorCode,
    }));

  const handleColorChange = (event, newValue) => {
    const syntheticEvent = {
      target: {
        value: newValue,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleColorChange}
      aria-label={ariaLabel}
      sx={{
        flexWrap: "wrap",
        justifyContent: "flex-start",
        "& .MuiToggleButtonGroup-grouped": {
          margin: "5px !important",
          "&:not(:first-of-type)": {
            marginLeft: "5px !important",
          },
        },
      }}
    >
      {processedOptions.map(option => (
        <ToggleButton
          key={option.name}
          value={option.name}
          disabled={disabledOptions?.includes(option.name)}
          sx={{
            backgroundColor: option.name === "Clear" ? "transparent" : option.normalizedColorCode,
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
            border: option.name === "Clear" ? "1px solid white" : "none",
            "&.MuiToggleButton-root": {
              border: option.name === "Clear" ? "1px solid white !important" : "none !important",
            },
            "&:hover": {
              backgroundColor:
                option.name === "Clear" ? "rgba(255, 255, 255, 0.1)" : lighten(option.normalizedColorCode, 0.1),
            },
            "&.Mui-selected": {
              backgroundColor:
                option.name === "Clear" ? "rgba(255, 255, 255, 0.2)" : lighten(option.normalizedColorCode, 0.1),
            },
            "&.Mui-selected:hover": {
              backgroundColor:
                option.name === "Clear" ? "rgba(255, 255, 255, 0.3)" : lighten(option.normalizedColorCode, 0.1),
            },
            "&.Mui-disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        />
      ))}
    </ToggleButtonGroup>
  );
};

export default GLColorButtons;
