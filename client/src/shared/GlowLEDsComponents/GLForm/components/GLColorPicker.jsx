import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { MuiColorInput } from "mui-color-input";

const GLColorPicker = ({ fieldName, fieldState, fieldData, handleInputChange }) => {
  const handleChange = newValue => {
    handleInputChange(fieldName, newValue);
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs>
        <MuiColorInput
          format="hex"
          value={fieldState || fieldData.defaultColor || "#ffffff"}
          onChange={handleChange}
          label={fieldData.label || "Color"}
          fullWidth
          margin="normal"
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
};

GLColorPicker.defaultProps = {
  fieldState: "#ffffff",
};

export default GLColorPicker;
