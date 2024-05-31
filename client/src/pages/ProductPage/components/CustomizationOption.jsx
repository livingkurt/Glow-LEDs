import React from "react";
import { Box, Typography, FormControl, Select, MenuItem, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectOption } from "../productPageSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CustomizationOption = ({ index, option, selectedOption }) => {
  const dispatch = useDispatch();

  const handleChange = value => {
    // Find the full option object based on the value
    const fullSelectedOption = option.values.find(opt => opt.name === value);
    // Dispatch the full option object
    dispatch(selectOption({ index, selectedOption: fullSelectedOption, option }));
  };

  return (
    <Box key={index} mb={2} display={"flex"} justifyContent={"space-between"} gap={2} alignItems={"center"}>
      <Box width={"100%"}>
        <>
          <Typography variant="subtitle1" gutterBottom>
            {option.name}
          </Typography>
          {option.optionType === "dropdown" ? (
            <FormControl fullWidth>
              <Select
                labelId={`option-${index}-label`}
                id={`option-${index}`}
                value={selectedOption?.name}
                onChange={e => handleChange(e.target.value)}
                placeholder={`Select ${option.name}`}
                displayEmpty
                sx={{
                  backgroundColor: "#4d5061",
                  color: "white",
                  "&:hover": { backgroundColor: "#393e55" },
                  "&.Mui-focused": { backgroundColor: "#393e55" },
                }}
              >
                <MenuItem disabled={!option.isAddOn} key={0} value={undefined}>
                  Select {option.name} {option.isAddOn && "(Optional +$)"}
                </MenuItem>
                {option.values.map((value, valueIndex) => (
                  <MenuItem key={valueIndex} value={value.name}>
                    {value.name}
                    {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : option.optionType === "buttons" ? (
            <ToggleButtonGroup
              aria-label={`${option.name} group`}
              value={selectedOption?.name}
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
                  value={value.name}
                  aria-label={value.name}
                  sx={{
                    "&:hover": { backgroundColor: "#393e55" },
                  }}
                >
                  {value.name}
                  {value.additionalCost > 0 && ` (+ $${value.additionalCost})`}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          ) : null}
        </>
      </Box>
      <Box mt={5}>
        {selectedOption?.product?.images_object[0]?.link && (
          <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.95)">
            <img
              src={selectedOption?.product?.images_object[0]?.link}
              alt={selectedOption.name}
              style={{ maxWidth: "100px", borderRadius: 10 }}
            />
          </Zoom>
        )}
      </Box>
    </Box>
  );
};

export default CustomizationOption;
