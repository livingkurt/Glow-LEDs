import { useState } from "react";
import { Box, IconButton, Paper, Slider, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ColorPicker = ({ color, onChange, onRemove }) => {
  const [showAdjustments, setShowAdjustments] = useState(false);

  const handleColorClick = () => {
    setShowAdjustments(!showAdjustments);
  };

  const handleHueChange = event => {
    const input = event.target;
    const rgb = hexToRgb(input.value);
    onChange({
      ...color,
      hue: rgb,
    });
  };

  const handleSaturationChange = (_, value) => {
    onChange({
      ...color,
      saturation: value,
    });
  };

  const handleBrightnessChange = (_, value) => {
    onChange({
      ...color,
      brightness: value,
    });
  };

  const rgbToHex = (r, g, b) => {
    const toHex = n => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToRgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          red: parseInt(result[1], 16),
          green: parseInt(result[2], 16),
          blue: parseInt(result[3], 16),
        }
      : { red: 0, green: 0, blue: 0 };
  };

  const currentHex = rgbToHex(color.hue.red, color.hue.green, color.hue.blue);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: showAdjustments ? 300 : "auto",
        transition: "width 0.3s ease",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          onClick={handleColorClick}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            cursor: "pointer",
            backgroundColor: currentHex,
            filter: `saturate(${color.saturation}%) brightness(${color.brightness}%)`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <IconButton onClick={onRemove} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>

      {showAdjustments && (
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <Box>
            <input type="color" value={currentHex} onChange={handleHueChange} style={{ width: "100%", height: 40 }} />
          </Box>

          <Box>
            <Typography variant="caption" color="textSecondary">
              {"Saturation"}
            </Typography>
            <Slider
              value={color.saturation}
              onChange={handleSaturationChange}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography variant="caption" color="textSecondary">
              {"Brightness"}
            </Typography>
            <Slider
              value={color.brightness}
              onChange={handleBrightnessChange}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ColorPicker;
