import React from "react";
import { Box, Checkbox, FormControlLabel, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectOption, setIsAddonChecked } from "../productPageSlice";
import "react-medium-image-zoom/dist/styles.css";
import GLToggleButtons from "../../../shared/GlowLEDsComponents/GLToggleButtons/GLToggleButtons";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLColorButtons from "../../../shared/GlowLEDsComponents/GLColorButtons/GLColorButtons";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const CustomizationOption = ({ index, option, selectedOption }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const productPage = useSelector(state => state.products.productPage);
  const { isAddonChecked } = productPage;

  const handleChange = value => {
    const fullSelectedOption = option.values.find(opt => opt.name === value);
    dispatch(selectOption({ index, selectedOption: fullSelectedOption, option }));
  };

  const handleAddonCheckboxChange = event => {
    dispatch(setIsAddonChecked(event.target.checked));
    if (!event.target.checked) {
      // If unchecked, clear the selection
      dispatch(selectOption({ index, selectedOption: undefined, option }));
    }
  };

  const renderOptionComponent = () => {
    switch (option.optionType) {
      case "dropdown":
        return (
          <GLSelect
            label={option.name}
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            placeholder={`Select ${option.name}`}
            options={option.values}
            valueKey="name"
            fullWidth
            details={option.details}
            getOptionLabel={option => (
              <>
                {option.name}
                {option.additionalCost > 0 && ` (+ $${option.additionalCost})`}
              </>
            )}
          />
        );
      case "buttons":
        return (
          <GLToggleButtons
            ariaLabel={`${option.name} group`}
            value={selectedOption?.name}
            label={option.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
            details={option.details}
          />
        );
      case "colors":
        return (
          <GLColorButtons
            ariaLabel={`${option.name} group`}
            label={option.name}
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
            isAddOn={option.isAddOn}
            details={option.details}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box key={index} display="flex" flexDirection="column">
      {option.isAddOn ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={isAddonChecked}
              onChange={handleAddonCheckboxChange}
              name={`addon-${option.name}`}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 }, // Increase icon size
                padding: "12px", // Increase padding around the icon
              }}
              icon={<CheckBoxOutlineBlank sx={{ color: "white" }} />}
              checkedIcon={<CheckBox sx={{ color: "white" }} />}
            />
          }
          label={`Add ${option.name} + $${option.values[0].additionalCost?.toFixed(2)}`}
        />
      ) : null}
      {(!option.isAddOn || (option.isAddOn && isAddonChecked)) && (
        <Box display="flex" justifyContent="space-between" gap={2} alignItems="center">
          <Box width="100%">{renderOptionComponent()}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomizationOption;
