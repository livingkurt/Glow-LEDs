import React from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Grid, Box, TextField } from "@mui/material";

const GLColorPicker = ({ fieldName, fieldState, fieldData, handleInputChange, localState, setLocalState }) => {
  const preset_colors = ["#333333", "#333333", "#FFFFFF", "#7d7c7c", "#585858", "#4c4f60"];

  return (
    <Grid container key={fieldName} alignItems="center" spacing={2}>
      <Grid item>
        <Box
          sx={{
            padding: "5px",
            background: "#fff",
            borderRadius: "4px",
            boxShadow: 1,
            cursor: "pointer",
          }}
          onClick={() => setLocalState({ ...localState, [fieldName + "_picker"]: !localState[fieldName + "_picker"] })}
        >
          <Box
            sx={{
              width: "36px",
              height: "14px",
              borderRadius: "4px",
              bgcolor: fieldState || fieldData.defaultColor,
            }}
          />
        </Box>
        {localState[fieldName + "_picker"] && (
          <ClickAwayListener onClickAway={() => setLocalState({ ...localState, [fieldName + "_picker"]: false })}>
            <Box sx={{ position: "absolute", zIndex: "2" }}>
              <SketchPicker
                color={fieldState || fieldData.defaultColor}
                presetColors={preset_colors}
                onChangeComplete={color => handleInputChange(fieldName, color.hex)}
              />
            </Box>
          </ClickAwayListener>
        )}
      </Grid>
      <Grid item xs>
        <TextField
          variant="outlined"
          type="text"
          size="small"
          margin="normal"
          fullWidth
          label={fieldData.label || "Background"}
          name={fieldName}
          id={fieldName}
          value={fieldState || fieldData.defaultColor}
          onChange={e => handleInputChange(fieldName, e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

GLColorPicker.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldState: PropTypes.string,
  fieldData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  localState: PropTypes.object.isRequired,
  setLocalState: PropTypes.func.isRequired,
};

GLColorPicker.defaultProps = {
  fieldState: "",
};

export default GLColorPicker;
