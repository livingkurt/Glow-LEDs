import { Paper, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";

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

  const handlePatternSelect = selectedPattern => {
    onChange({
      ...selectedPattern,
      name: selectedPattern.name,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {"Pattern Selection"}
      </Typography>
      <Grid container spacing={1}>
        {microlight.flashing_patterns.map(p => (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={p._id}>
            <Paper
              elevation={pattern?._id === p._id ? 4 : 1}
              sx={{
                p: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                bgcolor: pattern?._id === p._id ? "primary.main" : "background.paper",
                color: pattern?._id === p._id ? "primary.contrastText" : "text.primary",
                "&:hover": {
                  transform: "translateY(-2px)",
                  bgcolor: pattern?._id === p._id ? "primary.dark" : "action.hover",
                },
              }}
              onClick={() => handlePatternSelect(p)}
            >
              <Typography variant="body2" gutterBottom>
                {p.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
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
