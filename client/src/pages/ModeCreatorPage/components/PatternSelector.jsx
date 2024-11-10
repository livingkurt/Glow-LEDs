import { Box, Paper, Slider, Typography, ToggleButton, ToggleButtonGroup, Select, MenuItem } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TuneIcon from "@mui/icons-material/Tune";

const PatternSelector = ({ pattern, patterns = [], onChange }) => {
  const handleSpeedChange = (_, value) => {
    onChange({
      ...pattern,
      speed: value,
    });
  };

  const handleDirectionChange = (_, value) => {
    if (value) {
      onChange({
        ...pattern,
        direction: value,
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Pattern Settings"}
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {"Pattern Type"}
          </Typography>
          <Select
            value={pattern.pattern_type}
            onChange={e => onChange({ ...pattern, pattern_type: e.target.value })}
            fullWidth
          >
            {patterns.map(p => (
              <MenuItem key={p._id} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {pattern.pattern_type !== "solid" && (
          <>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {"Speed"}
              </Typography>
              <Slider
                value={pattern.speed}
                onChange={handleSpeedChange}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: "Slow" },
                  { value: 50, label: "Medium" },
                  { value: 100, label: "Fast" },
                ]}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {"Direction"}
              </Typography>
              <ToggleButtonGroup value={pattern.direction} onChange={handleDirectionChange} exclusive fullWidth>
                <ToggleButton value="forward" aria-label="forward">
                  <ArrowForwardIcon sx={{ mr: 1 }} />
                  {"Forward"}
                </ToggleButton>
                <ToggleButton value="backward" aria-label="backward">
                  <ArrowBackIcon sx={{ mr: 1 }} />
                  {"Backward"}
                </ToggleButton>
                <ToggleButton value="alternate" aria-label="alternate">
                  <SwapHorizIcon sx={{ mr: 1 }} />
                  {"Alternate"}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PatternSelector;
