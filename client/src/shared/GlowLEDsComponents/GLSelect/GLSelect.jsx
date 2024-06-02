import React from "react";
import { FormControl, Select, MenuItem, Typography, Box } from "@mui/material";

const GLSelect = ({
  label,
  value,
  onChange,
  placeholder,
  options,
  getOptionLabel,
  valueKey,
  fullWidth,
  width,
  size,
}) => {
  return (
    <Box mt={1}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <FormControl fullWidth={fullWidth} sx={{ width }}>
        <Select
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          size={size}
          displayEmpty
          sx={{
            backgroundColor: "#4d5061",
            color: "white",
            "&:hover": { backgroundColor: "#393e55" },
            "&.Mui-focused": { backgroundColor: "#393e55" },
          }}
        >
          <MenuItem disabled={options[0].isAddOn} value={undefined}>
            {placeholder} {options[0].isAddOn && "(Optional +$)"}
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={valueKey ? option[valueKey] : option}>
              {getOptionLabel(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GLSelect;
