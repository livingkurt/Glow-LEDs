import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectOption, setIsAddonChecked } from "../eventPageSlice";
import GLToggleButtons from "../../../shared/GlowLEDsComponents/GLToggleButtons/GLToggleButtons";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLColorButtons from "../../../shared/GlowLEDsComponents/GLColorButtons/GLColorButtons";
import { CheckBox, CheckBoxOutlineBlank, Clear } from "@mui/icons-material";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLInfoPopover from "../../../shared/GlowLEDsComponents/GLInfoPopover/GLInfoPopover";

const CustomizationOption = ({ index, option, selectedOption, updateValidationError }) => {
  const dispatch = useDispatch();
  const productPage = useSelector(state => state.products.productPage);
  const { isAddonChecked } = productPage;

  const handleChange = value => {
    if (value === null || value === "" || value === selectedOption?.name) {
      // Deselect the option
      dispatch(selectOption({ index, selectedOption: undefined, option }));
      updateValidationError(index, null);
    } else {
      const fullSelectedOption = option.values.find(opt => opt.name === value);
      if (fullSelectedOption && fullSelectedOption.product.count_in_stock > 0) {
        dispatch(selectOption({ index, selectedOption: fullSelectedOption, option }));
        updateValidationError(index, null);
      }
    }
  };

  const handleAddonCheckboxChange = event => {
    dispatch(setIsAddonChecked(event.target.checked));
    if (!event.target.checked) {
      dispatch(selectOption({ index, selectedOption: undefined, option }));
      updateValidationError(index, null);
    }
  };

  const handleClear = () => {
    handleChange("");
  };

  const renderOptionComponent = () => {
    switch (option.optionType) {
      case "dropdown":
        return (
          <GLSelect
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            placeholder={`Select ${option.name}`}
            options={option.values}
            valueKey="name"
            fullWidth
            getOptionLabel={option => (
              <>
                {option.name}
                {option.additionalCost > 0 && ` (+ $${option.additionalCost})`}
                {option.product?.count_in_stock === 0 && " (Out of Stock)"}
              </>
            )}
          />
        );
      case "buttons":
        return (
          <GLToggleButtons
            ariaLabel={`${option.name} group`}
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
            disabledOptions={option.values.filter(opt => opt.product?.count_in_stock === 0).map(opt => opt.name)}
          />
        );
      case "colors":
        return (
          <GLColorButtons
            ariaLabel={`${option.name} group`}
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
            isAddOn={option.isAddOn}
            disabledOptions={option.values.filter(opt => opt.product?.count_in_stock === 0).map(opt => opt.name)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box key={index} my={2}>
      {option.isAddOn ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={isAddonChecked}
              onChange={handleAddonCheckboxChange}
              name={`addon-${option.name}`}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 28 },
                padding: "12px",
              }}
              icon={<CheckBoxOutlineBlank sx={{ color: "white" }} />}
              checkedIcon={<CheckBox sx={{ color: "white" }} />}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
              Add {option.name} + ${option.values[0].additionalCost?.toFixed(2)}{" "}
              {option.details && <GLInfoPopover details={option.details} />}
            </Box>
          }
        />
      ) : null}
      {(!option.isAddOn || (option.isAddOn && isAddonChecked)) && (
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            {option.optionType !== "checkbox" && (
              <Box display="flex" alignItems={"center"} gap={1}>
                <Typography variant="subtitle1">
                  {option.isAddOn ? "OPTIONAL: " : ""}
                  {option.name}
                </Typography>
                <Typography variant="body1">{!selectedOption?.name ? "" : `(${selectedOption?.name})`}</Typography>
                {option.details && <GLInfoPopover details={option.details} />}
              </Box>
            )}
            {selectedOption?.name && option.isAddOn && (
              <GLIconButton ml={2} onClick={handleClear} tooltip={`Clear Optional: ${option.name}`}>
                <Clear color="white" />
              </GLIconButton>
            )}
          </Box>

          {renderOptionComponent()}
        </Box>
      )}
    </Box>
  );
};

export default CustomizationOption;
