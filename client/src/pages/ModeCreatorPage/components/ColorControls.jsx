import { useState } from "react";

import { isMobile } from "react-device-detect";
import {
  hexToHSV,
  hsvToHex,
  generateBrightnessLevels,
  generateSaturationLevels,
  getDisplayLevel,
} from "../modeCreatorPageHelpers";
import Box from "@mui/material/Box";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Delete from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Portal from "@mui/material/Portal";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const ColorControls = ({
  color,
  onUpdate,
  microlight,
  anchorEl,
  onClose,
  onDuplicate,
  onRemove,
  activeControl,
  setActiveControl,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileDevice = isMobile || isSmallScreen;

  const handleControlClick = (control, event) => {
    event.stopPropagation();
    setActiveControl(control === activeControl ? null : control);
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

    const sortedLevels = levels.sort((a, b) => b.value - a.value);

    if (isMobileDevice) {
      return (
        <Dialog
          open={Boolean(activeControl)}
          onClose={() => setActiveControl(null)}
          PaperProps={{
            sx: {
              p: 2,
              maxWidth: "100%",
              width: "auto",
              m: 2,
            },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            {`Select ${activeControl === "brightness" ? "Brightness" : "Saturation"} Level`}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              justifyItems: "center",
            }}
          >
            {sortedLevels.map(({ value, hex }, index) => {
              const levelNumber = sortedLevels.length - index;
              return (
                <Box
                  key={value}
                  onClick={() => handleLevelSelect(activeControl, value)}
                  sx={{
                    backgroundColor: hex,
                    cursor: "pointer",
                    border: theme => `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    color: theme => theme.palette.getContrastText(hex),
                    fontWeight: "medium",
                    fontSize: "2rem",
                  }}
                >
                  {levelNumber}
                </Box>
              );
            })}
          </Box>
        </Dialog>
      );
    }

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
              onClick={() => handleLevelSelect(activeControl, value)}
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

  const controlsContent = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, position: "relative" }}>
      {isMobileDevice && (
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Box
            onClick={onDuplicate}
            sx={{
              p: 1.5,
              cursor: "pointer",
              borderRadius: 1,
              transition: "all 0.2s ease",
            }}
          >
            <ContentCopy /> {"Duplicate"}
          </Box>
          <Box
            onClick={onRemove}
            sx={{
              p: 1.5,
              cursor: "pointer",
              borderRadius: 1,
            }}
          >
            <Delete /> {"Remove"}
          </Box>
        </Box>
      )}
      {microlight?.saturation_control && (
        <Box
          onClick={e => handleControlClick("saturation", e)}
          sx={{
            p: 1.5,
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
          <Typography variant="body1">
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
            p: 1.5,
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
          <Typography variant="body1">
            {"Brightness: "}
            {color.brightness !== undefined
              ? getDisplayLevel(color.brightness, microlight.brightness_levels)
              : microlight.brightness_levels}
          </Typography>
        </Box>
      )}
      {renderLevels()}
    </Box>
  );

  if (isMobileDevice) {
    return (
      <Dialog
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: "100%",
            width: "auto",
            m: 2,
          },
        }}
      >
        {controlsContent}
      </Dialog>
    );
  }

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
          {controlsContent}
        </Paper>
      </Box>
    </Portal>
  );
};

export default ColorControls;
