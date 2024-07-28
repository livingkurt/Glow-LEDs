import React from "react";
import { FormControl, Select, MenuItem, Typography, Box, useTheme, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";

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
  details,
}) => {
  const theme = useTheme();
  return (
    <Box mt={1}>
      <Box display="flex" alignItems={"center"} gap={1}>
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
        {details && (
          <Tooltip title={details}>
            <Info color="white" size="large" />
          </Tooltip>
        )}
      </Box>
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
