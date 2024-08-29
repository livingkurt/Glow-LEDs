import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography, IconButton, Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectOption, setIsAddonChecked } from "../productPageSlice";
import GLToggleButtons from "../../../shared/GlowLEDsComponents/GLToggleButtons/GLToggleButtons";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLColorButtons from "../../../shared/GlowLEDsComponents/GLColorButtons/GLColorButtons";
import { CheckBox, CheckBoxOutlineBlank, Clear, Info } from "@mui/icons-material";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const CustomizationOption = ({ index, option, selectedOption, updateValidationError }) => {
  const dispatch = useDispatch();
  const productPage = useSelector(state => state.products.productPage);
  const { isAddonChecked } = productPage;

  const handleChange = value => {
    const fullSelectedOption = option.values.find(opt => opt.name === value);
    if (fullSelectedOption && fullSelectedOption.product.count_in_stock > 0) {
      dispatch(selectOption({ index, selectedOption: fullSelectedOption, option }));
      updateValidationError(index, null);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddonCheckboxChange = event => {
    dispatch(setIsAddonChecked(event.target.checked));
    if (!event.target.checked) {
      dispatch(selectOption({ index, selectedOption: undefined, option }));
      updateValidationError(index, null);
    }
  };

  const handleInfoClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    handleChange("");
  };

  const open = Boolean(anchorEl);
  const id = open ? `info-popover-${index}` : undefined;

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
          label={`Add ${option.name} + $${option.values[0].additionalCost?.toFixed(2)}`}
        />
      ) : null}
      {(!option.isAddOn || (option.isAddOn && isAddonChecked)) && (
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box display="flex" alignItems={"center"} gap={1}>
              <Typography variant="subtitle1">
                {option.isAddOn ? "OPTIONAL: " : ""}
                {option.name}
              </Typography>
              <Typography variant="body1">{!selectedOption?.name ? "" : `(${selectedOption?.name})`}</Typography>
              {option.details && (
                <>
                  <IconButton onClick={handleInfoClick} size="large" aria-describedby={id}>
                    <Info color="white" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleInfoClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          backgroundColor: "#585858",
                          color: "white",
                          maxWidth: "300px",
                          maxHeight: "200px",
                          overflow: "auto",
                        },
                      },
                    }}
                  >
                    <Typography sx={{ p: 2 }}>{option.details}</Typography>
                  </Popover>
                </>
              )}
            </Box>
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
