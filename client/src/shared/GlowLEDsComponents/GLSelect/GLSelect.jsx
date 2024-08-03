import React from "react";
import { FormControl, Select, MenuItem, Box, useTheme } from "@mui/material";

const GLSelect = ({ value, onChange, placeholder, options, getOptionLabel, valueKey, fullWidth, width, size }) => {
  const theme = useTheme();

  return (
    <Box>
      <FormControl fullWidth={fullWidth} sx={{ width }}>
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          size={size}
          displayEmpty
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": { backgroundColor: "#393e55" },
            "&.Mui-focused": { backgroundColor: "#393e55" },
          }}
        >
          <MenuItem disabled={options[0].isAddOn} value={undefined}>
            {placeholder} {options[0].isAddOn && "(Optional +$)"}
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={valueKey ? option[valueKey] : option}
              disabled={option?.product?.count_in_stock === 0}
            >
              {getOptionLabel(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GLSelect;
