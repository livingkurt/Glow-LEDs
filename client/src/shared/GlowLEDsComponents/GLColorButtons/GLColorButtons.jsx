import React from "react";
import {
  Box,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery,
  lighten,
} from "@mui/material";
import { Clear, Info } from "@mui/icons-material";
import GLIconButton from "../GLIconButton/GLIconButton";

const GLColorButtons = ({ ariaLabel, value, onChange, options, label, isAddOn, details }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const hasFilamentOptions = options.some(option => "filament" in option);

  const processedOptions = options
    .filter(option => !hasFilamentOptions || option?.filament?.active)
    .map(option => ({
      ...option,
      normalizedColorCode: option.filament?.color_code || option.colorCode,
    }));

  const handleClear = () => {
    const syntheticEvent = {
      target: {
        value: "",
      },
    };
    onChange(syntheticEvent);
  };

  const handleColorChange = (event, newValue) => {
    const syntheticEvent = {
      target: {
        value: newValue,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <Box mt={1}>
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Box display="flex" alignItems={"center"} gap={1}>
          <Typography variant="subtitle1">
            {isAddOn ? "OPTIONAL: " : ""}
            {label}
          </Typography>
          {details && (
            <Tooltip title={details}>
              <Info color="white" size="large" />
            </Tooltip>
          )}
          <Typography variant="body1">{!value ? "" : `(${value})`}</Typography>
        </Box>
        {value && isAddOn && (
          <GLIconButton ml={2} onClick={handleClear} tooltip={`Clear Optional: ${label}`}>
            <Clear color="white" />
          </GLIconButton>
        )}
      </Box>
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
          <Tooltip key={option.name} title={option.name} placement="top">
            <ToggleButton
              value={option.name}
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
              }}
            />
          </Tooltip>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default GLColorButtons;
