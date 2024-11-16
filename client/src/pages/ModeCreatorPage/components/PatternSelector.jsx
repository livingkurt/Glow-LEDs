import { Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";

const PatternSelector = ({ pattern, onChange, microlight }) => {
  if (!microlight?.flashing_patterns?.length) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          {"No patterns available for this microlight"}
        </Typography>
      </Paper>
    );
  }

  const handlePatternSelect = (_, selectedPattern) => {
    if (selectedPattern) {
      onChange({
        ...selectedPattern,
        name: selectedPattern.name,
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {"Pattern Selection"}
      </Typography>
      <GLAutocomplete
        options={microlight.flashing_patterns}
        value={pattern}
        onChange={handlePatternSelect}
        getOptionLabel={option => option.name}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        label="Select Pattern"
        size="medium"
        placeholder="Search patterns..."
      />
    </Box>
  );
};

PatternSelector.propTypes = {
  pattern: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    on_dur: PropTypes.number,
    off_dur: PropTypes.number,
    gap_dur: PropTypes.number,
    dash_dur: PropTypes.number,
    group_size: PropTypes.number,
    blend_speed: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  microlight: PropTypes.shape({
    flashing_patterns: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        on_dur: PropTypes.number,
        off_dur: PropTypes.number,
        gap_dur: PropTypes.number,
        dash_dur: PropTypes.number,
        group_size: PropTypes.number,
        blend_speed: PropTypes.number,
      })
    ),
  }),
};

PatternSelector.defaultProps = {
  pattern: null,
  microlight: {
    flashing_patterns: [],
  },
};

export default PatternSelector;
