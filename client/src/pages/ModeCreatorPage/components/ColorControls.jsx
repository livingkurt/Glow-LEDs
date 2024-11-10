import { useState } from "react";
import { Box, Popper, Paper, ClickAwayListener, Typography, Fade } from "@mui/material";
import { hexToHSV, hsvToHex, generateBrightnessLevels, generateSaturationLevels } from "../modeCreatorPageHelpers";

const ColorControls = ({ color, onUpdate, microlight, anchorEl, onClose }) => {
  const [activeControl, setActiveControl] = useState(null);
  const [levelsAnchor, setLevelsAnchor] = useState(null);

  const handleControlClick = (control, event) => {
    event.stopPropagation();
    setActiveControl(control);
    setLevelsAnchor(event.currentTarget);
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

    onUpdate(updatedColor);
    setActiveControl(null);
    setLevelsAnchor(null);
  };

  const renderLevels = () => {
    if (!activeControl || !levelsAnchor) return null;

    const hsv = hexToHSV(color.colorCode);
    const levels =
      activeControl === "brightness"
        ? generateBrightnessLevels(hsv.h, hsv.s, microlight.brightness_levels || 4)
        : generateSaturationLevels(hsv.h, hsv.v, microlight.saturation_levels || 4);

    return (
      <Popper open={Boolean(levelsAnchor)} anchorEl={levelsAnchor} placement="right-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={4}
              sx={{
                p: 1,
                mt: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {levels.map(({ value, hex }) => (
                <Box
                  key={value}
                  onClick={() => handleLevelSelect(activeControl, value)}
                  sx={{
                    width: 120,
                    height: 30,
                    backgroundColor: hex,
                    cursor: "pointer",
                    borderRadius: 1,
                    border: theme => `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: value > 50 ? "black" : "white",
                    fontWeight: "medium",
                    fontSize: "0.75rem",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {`${value}%`}
                </Box>
              ))}
            </Paper>
          </Fade>
        )}
      </Popper>
    );
  };

  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top" transition>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={4}
          sx={{
            p: 1.5,
            minWidth: 120,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {microlight?.brightness_control && (
              <Box
                onClick={e => handleControlClick("brightness", e)}
                sx={{
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor: activeControl === "brightness" ? "primary.main" : "grey.100",
                  color: activeControl === "brightness" ? "white" : "text.primary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: activeControl === "brightness" ? "primary.dark" : "grey.200",
                  },
                }}
              >
                <Typography variant="body2">
                  {"Brightness: "}
                  {color.brightness || 100}
                  {"%"}
                </Typography>
              </Box>
            )}

            {microlight?.saturation_control && (
              <Box
                onClick={e => handleControlClick("saturation", e)}
                sx={{
                  p: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  bgcolor: activeControl === "saturation" ? "primary.main" : "grey.100",
                  color: activeControl === "saturation" ? "white" : "text.primary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: activeControl === "saturation" ? "primary.dark" : "grey.200",
                  },
                }}
              >
                <Typography variant="body2">
                  {"Saturation: "}
                  {color.saturation || 100}
                  {"%"}
                </Typography>
              </Box>
            )}
          </Box>

          {renderLevels()}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ColorControls;
