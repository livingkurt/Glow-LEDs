import { Box, Paper, Typography } from "@mui/material";
import GLAutocomplete from "../../GLAutocomplete/GLAutocomplete";
import PropTypes from "prop-types";

const GLOptionSelector = ({ fieldName, fieldData, onChange, classes, formErrors, index }) => {
  const currentOptions = fieldData.getCurrentOptions?.(index) || [];
  const selectedOptions = fieldData.getSelectedOptions?.(index) || [];

  const handleOptionChange = (optionName, selectedValue) => {
    // Find the index of the option in selectedOptions
    const optionIndex = selectedOptions.findIndex(
      opt =>
        opt.name === selectedValue.name || // Match by new value name
        currentOptions.some(
          (
            current // Or match by option group
          ) => current.name === optionName && current.values.some(v => v.name === opt.name)
        )
    );

    let updatedOptions = [...selectedOptions];

    if (optionIndex !== -1) {
      // Update existing option
      updatedOptions[optionIndex] = selectedValue;
    } else {
      // Add new option if not found
      updatedOptions.push(selectedValue);
    }

    onChange(updatedOptions);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {fieldData.label || "Select Options"}
        </Typography>
        {currentOptions?.map((option, optionIndex) => {
          const selectedValue = option.values.find(v => selectedOptions.some(selected => selected.name === v.name));

          return (
            <GLAutocomplete
              key={`${option.name}-${optionIndex}`}
              label={option.name}
              value={selectedValue || null}
              options={option.values || []}
              getOptionLabel={opt => opt.name}
              isOptionEqualToValue={(opt, val) => opt._id === val._id}
              onChange={(_, newValue) => handleOptionChange(option.name, newValue)}
              customClasses={classes}
              helperText={formErrors && formErrors[`${fieldName}.${option.name}`]}
              error={formErrors && Boolean(formErrors[`${fieldName}.${option.name}`])}
            />
          );
        })}
      </Paper>
    </Box>
  );
};
GLOptionSelector.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
  formErrors: PropTypes.object,
  index: PropTypes.number,
};

GLOptionSelector.defaultProps = {
  classes: {},
  formErrors: {},
  currentOptions: [],
  index: 0,
};

export default GLOptionSelector;
