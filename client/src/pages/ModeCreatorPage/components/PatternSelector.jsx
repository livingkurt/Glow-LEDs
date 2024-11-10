import { Box, Paper, Typography, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";

const PatternSelector = ({ pattern, patterns = [], onChange }) => {
  console.log({ pattern, patterns });
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Pattern Settings"}
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {"Flashing Patterns"}
          </Typography>
          <GLAutocomplete
            value={pattern.name}
            onChange={(e, value) => onChange({ ...pattern, name: value })}
            options={patterns}
            fullWidth
            label="Flashing Patterns"
            getOptionLabel={option => option.name}
          />
        </Box>
      </Box>
    </Paper>
  );
};

PatternSelector.propTypes = {
  pattern: PropTypes.object.isRequired,
  patterns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PatternSelector;
