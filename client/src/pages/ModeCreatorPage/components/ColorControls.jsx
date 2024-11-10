import { useState } from "react";
import { Box, Paper, Typography, Portal } from "@mui/material";
import { hexToHSV, hsvToHex, generateBrightnessLevels, generateSaturationLevels } from "../modeCreatorPageHelpers";

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
          // Calculate the level number (4,3,2,1) based on index
          const levelNumber = sortedLevels.length - index;
          // Calculate the actual value to use (map 4->100, 3->66.66, 2->33.33, 1->0)
          const actualValue = ((levelNumber - 1) / (sortedLevels.length - 1)) * 100;

          return (
            <Box
              key={value}
              onClick={() => handleLevelSelect(activeControl, actualValue)}
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
                color: value > 50 ? "black" : "white",
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
                  {color.saturation
                    ? Math.ceil((color.saturation / 100) * (microlight.saturation_levels || 4))
                    : microlight.saturation_levels || 4}
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
                  {color.brightness
                    ? Math.ceil((color.brightness / 100) * (microlight.brightness_levels || 4))
                    : microlight.brightness_levels || 4}
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
