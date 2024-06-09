import React from "react";
import { Box, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectOption } from "../productPageSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import GLToggleButtons from "../../../shared/GlowLEDsComponents/GLToggleButtons/GLToggleButtons";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLColorButtons from "../../../shared/GlowLEDsComponents/GLColorButtons/GLColorButtons";

const CustomizationOption = ({ index, option, selectedOption }) => {
  const dispatch = useDispatch();

  const handleChange = value => {
    const fullSelectedOption = option.values.find(opt => opt.name === value);
    dispatch(selectOption({ index, selectedOption: fullSelectedOption, option }));
  };

  return (
    <Box key={index} display={"flex"} justifyContent={"space-between"} gap={2} alignItems={"center"}>
      <Box width={"100%"}>
        {option.optionType === "dropdown" && (
          <GLSelect
            label={option.name}
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
              </>
            )}
          />
        )}
        {option.optionType === "buttons" && (
          <GLToggleButtons
            ariaLabel={`${option.name} group`}
            value={selectedOption?.name}
            label={option.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
          />
        )}
        {option.optionType === "colors" && (
          <GLColorButtons
            ariaLabel={`${option.name} group`}
            label={option.name}
            value={selectedOption?.name}
            onChange={e => handleChange(e.target.value)}
            options={option.values}
          />
        )}
      </Box>
      {/* {selectedOption?.product?.images_object[0]?.link && (
        <Box mt={5}>
          <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.95)">
            <Tooltip title="Click to Expand" placement="top">
              <img
                src={selectedOption?.product?.images_object[0]?.link}
                alt={selectedOption.name}
                style={{
                  maxWidth: "75px",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: `5px solid ${selectedOption?.product?.color_code}`,
                }}
              />
            </Tooltip>
          </Zoom>
        </Box>
      )} */}
    </Box>
  );
};

export default CustomizationOption;
