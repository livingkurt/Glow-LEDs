import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectOption } from "../productPageSlice";

const CustomizationOption = ({ index, option, selectedOption }) => {
  const dispatch = useDispatch();
  const [showAddOn, setShowAddOn] = useState(!option.isAddOn);

  const handleChange = value => {
    // Find the full option object based on the value
    const fullOption = option.values.find(opt => opt.value === value);
    // Dispatch the full option object
    dispatch(selectOption({ index, selectedOption: fullOption }));
  };

  const handleAddOnChange = event => {
    setShowAddOn(event.target.checked);

    // Find the default option value for this option
    const defaultOption = option.values.find(value => value.isDefault);

    if (event.target.checked) {
      // If the checkbox is checked, dispatch the default option with additional cost
      dispatch(
        selectOption({
          index,
          selectedOption: defaultOption,
        })
      );
    } else {
      // If the checkbox is unchecked, dispatch the default option without additional cost
      dispatch(selectOption({ index, selectedOption: {} }));
    }
  };

  return (
    <Box key={index} mb={2}>
      {option.isAddOn && (
        <FormControlLabel
          control={
            <Checkbox checked={showAddOn} onChange={handleAddOnChange} name={`option-${index}-addon`} color="primary" />
          }
          label={`Add Ons`}
        />
      )}
      {showAddOn && (
        <>
          <Typography variant="subtitle1" gutterBottom>
            {option.name}
          </Typography>
          {option.optionType === "dropdown" ? (
            <FormControl fullWidth>
              <Select
                labelId={`option-${index}-label`}
                id={`option-${index}`}
                value={selectedOption?.value}
                onChange={e => handleChange(e.target.value)}
                placeholder={`Select ${option.name}`}
                sx={{
                  backgroundColor: "#4d5061",
                  color: "white",
                  "&:hover": { backgroundColor: "#393e55" },
                  "&.Mui-focused": { backgroundColor: "#393e55" },
                }}
              >
                {option.values.map((value, valueIndex) => (
                  <MenuItem key={valueIndex} value={value.value}>
                    {value.value}
                    {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : option.optionType === "buttons" ? (
            <ToggleButtonGroup
              aria-label={`${option.name} group`}
              value={selectedOption?.value}
              exclusive
              color="primary"
              onChange={e => handleChange(e.target.value)}
              sx={{
                backgroundColor: "#4d5061",
                width: "100%",
                "& .MuiToggleButton-root": {
                  color: "white",
                  width: "100%",
                  padding: "8px 16px",
                },
                "& .Mui-selected": {
                  backgroundColor: "white !important",
                  color: "#4d5061 !important",
                },
              }}
            >
              {option.values.map((value, valueIndex) => (
                <ToggleButton
                  key={valueIndex}
                  value={value.value}
                  aria-label={value.value}
                  sx={{
                    "&:hover": { backgroundColor: "#393e55" },
                  }}
                >
                  {value.value}
                  {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default CustomizationOption;
