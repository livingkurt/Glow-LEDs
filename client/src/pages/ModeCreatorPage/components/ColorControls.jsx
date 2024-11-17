import { useState } from "react";
import { Box, Paper, Typography, Portal } from "@mui/material";
import {
  hexToHSV,
  hsvToHex,
  generateBrightnessLevels,
  generateSaturationLevels,
  getDisplayLevel,
} from "../modeCreatorPageHelpers";

const ColorControls = ({ color, onUpdate, microlight, anchorEl, onClose }) => {
  const [activeControl, setActiveControl] = useState(null);

  const handleControlClick = (control, event) => {
    event.stopPropagation();
    setActiveControl(control);
  };

  const handleLevelSelect = (type, value) => {
    const hsv = hexToHSV(color.colorCode);
    let updatedColor;

    if (type === "brightness") {
      updatedColor = {
        ...color,
        colorCode: hsvToHex(hsv.h, hsv.s, value),
        brightness: value,
      };
    } else {
      updatedColor = {
        ...color,
        colorCode: hsvToHex(hsv.h, value, hsv.v),
        saturation: value,
      };
    }

    // Update the color
    onUpdate(updatedColor);

    // Only close the active control menu
    setActiveControl(null);
  };

  if (!anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  const renderLevels = () => {
    if (!activeControl) return null;

    const hsv = hexToHSV(color.colorCode);
    const levels =
      activeControl === "brightness"
        ? generateBrightnessLevels(hsv.h, hsv.s, microlight?.brightness_levels || 4)
        : generateSaturationLevels(hsv.h, hsv.v, microlight?.saturation_levels || 4);

    // Sort levels from highest to lowest
    const sortedLevels = levels.sort((a, b) => b.value - a.value);

    return (
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          left: "100%",
          top: 0,
          ml: 1,
          p: 1.5,
        }}
      >
        {sortedLevels.map(({ value, hex }, index) => {
          const levelNumber = sortedLevels.length - index;

          return (
            <Box
              key={value}
              onClick={() => handleLevelSelect(activeControl, value)} // Use the actual value directly
              sx={{
                backgroundColor: hex,
                cursor: "pointer",
                border: theme => `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                color: theme => theme.palette.getContrastText(hex),
                fontWeight: "medium",
                fontSize: "2rem",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                mb: 1,
                "&:last-child": {
                  mb: 0,
                },
              }}
            >
              {levelNumber}
            </Box>
          );
        })}
      </Paper>
    );
  };

  return (
    <Portal>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: theme => theme.zIndex.modal - 1,
        }}
        onClick={onClose}
      >
        <Paper
          elevation={4}
          onClick={e => e.stopPropagation()}
          sx={{
            position: "fixed",
            left: `${rect.right + 10}px`,
            top: `${rect.top}px`,
            p: 1.5,
            minWidth: 120,
            zIndex: theme => theme.zIndex.modal,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, position: "relative" }}>
            {microlight?.saturation_control && (
              <Box
                onClick={e => handleControlClick("saturation", e)}
                sx={{
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor: activeControl === "saturation" ? "grey.500" : "white",
                  color: activeControl === "saturation" ? "white" : "text.primary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: activeControl === "saturation" ? "grey.600" : "grey.200",
                  },
                }}
              >
                <Typography variant="body2">
                  {"Saturation: "}
                  {color.saturation !== undefined
                    ? getDisplayLevel(color.saturation, microlight.saturation_levels)
                    : microlight.saturation_levels}
                </Typography>
              </Box>
            )}
            {microlight?.brightness_control && (
              <Box
                onClick={e => handleControlClick("brightness", e)}
                sx={{
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor: activeControl === "brightness" ? "grey.500" : "white",
                  color: activeControl === "brightness" ? "white" : "text.primary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: activeControl === "brightness" ? "grey.600" : "grey.200",
                  },
                }}
              >
                <Typography variant="body2">
                  {"Brightness: "}
                  {color.brightness !== undefined
                    ? getDisplayLevel(color.brightness, microlight.brightness_levels)
                    : microlight.brightness_levels}
                </Typography>
              </Box>
            )}
            {renderLevels()}
          </Box>
        </Paper>
      </Box>
    </Portal>
  );
};

export default ColorControls;
