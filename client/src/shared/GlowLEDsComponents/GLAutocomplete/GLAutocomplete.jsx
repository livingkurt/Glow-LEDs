/* eslint-disable max-lines-per-function */
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";

import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";

const GLAutocomplete = ({
  loading,
  value,
  options,
  getOptionLabel,
  helperText,
  label,
  variant,
  name,
  onChange,
  onBlur,
  disabled,
  error,
  classes,
  freeSolo,
  disableCloseOnSelect,
  getOptionDisabled,
  inputColor,
  inputType,
  limitTags,
  multiple,
  showCheckbox,
  chipColor,
  restrictCharacters,
  chipsOptionsDisabled,
  inputPropsTextField,
  onInputChange,
  onOpen,
  onClose,
  onHighlightChange,
  onKeyDown,
  chipLabel,
  textFieldDataTest,
  margin,
  optionDisplay,
  customClasses,
  isOptionEqualToValue,
  ...otherProps
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="medium" />;
  const checkedIcon = <CheckBoxIcon fontSize="medium" />;
  return (
    <div>
      {loading ? (
        <Autocomplete
          disabled={disabled}
          value={value || null}
          size="small"
          color={inputColor}
          freeSolo={freeSolo}
          disableCloseOnSelect={disableCloseOnSelect}
          limitTags={limitTags}
          multiple={multiple}
          onInputChange={onInputChange}
          onOpen={onOpen}
          onClose={onClose}
          onHighlightChange={onHighlightChange}
          onKeyDown={onKeyDown}
          options={options}
          getOptionLabel={option => (option ? getOptionLabel(option) || "" : "")}
          isOptionEqualToValue={(option, val) => (option && val ? isOptionEqualToValue(option, val) : false)}
          getOptionDisabled={option => {
            if (!option) return false;
            if (getOptionDisabled) return getOptionDisabled(option);
            if (chipsOptionsDisabled) return chipsOptionsDisabled(option);
            return false;
          }}
          renderInput={params => (
            <TextField
              {...params}
              className={customClasses?.outlinedInput}
              inputProps={{ ...params.inputProps, onKeyDown: restrictCharacters, ...inputPropsTextField }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "white", // This also ensures the filled variant has a white background
                },
              }}
              InputProps={{
                ...params.InputProps, // Spread existing props
                className: customClasses.input, // Your custom props here
              }}
              InputLabelProps={{
                ...params.InputLabelProps, // Spread existing props
                className: customClasses.label, // Your custom props here
              }}
              FormHelperTextProps={{
                className: error ? customClasses.errorHelperText : customClasses.helperText,
              }}
              name={name}
              margin={margin}
              data-test={textFieldDataTest}
              type={inputType}
              label={label}
              variant={variant}
              error={error}
              helperText={helperText}
            />
          )}
          renderTags={
            chipsOptionsDisabled
              ? (tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      key={option}
                      style={{ fontSize: "1.6rem" }}
                      label={!chipLabel ? option : option[chipLabel]}
                      {...getTagProps({ index })}
                      disabled={chipsOptionsDisabled ? chipsOptionsDisabled(option) : false}
                      color={!chipLabel ? "" : typeof chipColor === "function" ? chipColor(option) : chipColor}
                      size="medium"
                    />
                  ))
              : false
          }
          renderOption={(props, option, { selected }) => {
            return showCheckbox ? (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  size="large"
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {typeof optionDisplay === "function" ? optionDisplay(option) : option[optionDisplay] || option.name}
              </li>
            ) : (
              <li {...props}>
                {typeof optionDisplay === "function" ? optionDisplay(option) : option[optionDisplay] || option.name}
              </li>
            );
          }}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <Skeleton variant="text" height={80} className={classes.skeleton} animation="wave" />
      )}
    </div>
  );
};

GLAutocomplete.defaultProps = {
  loading: true,
  chipLabel: "name",
  freeSolo: false,
  multiple: false,
  showCheckbox: false,
  margin: "normal",
  textFieldDataTest: "",
  disableCloseOnSelect: false,
  chipsOptionsDisabled: () => false,
  value: [],
  options: [],
  getOptionLabel: option => (option ? option.name : ""),
  getOptionDisabled: x => x,
  restrictCharacters: x => x,
  onInputChange: x => x,
  onOpen: x => x,
  onClose: x => x,
  onHighlightChange: x => x,
  onKeyDown: x => x,
  isOptionEqualToValue: x => x,
  helperText: "",
  label: "",
  variant: "outlined",
  name: "",
  onChange: x => x,
  onBlur: x => x,
  disabled: false,
  error: null,
  classes: {},
  inputColor: "default",
  chipColor: () => "primary",
  inputType: "text",
  limitTags: 5,
  inputPropsTextField: {},
  customClasses: {},
};

GLAutocomplete.propTypes = {
  loading: PropTypes.bool,
  freeSolo: PropTypes.bool,
  multiple: PropTypes.bool,
  chipLabel: PropTypes.string,
  disableCloseOnSelect: PropTypes.bool,
  textFieldDataTest: PropTypes.string,
  showCheckbox: PropTypes.bool,
  chipsOptionsDisabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string, PropTypes.number]),
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  getOptionLabel: PropTypes.func,
  restrictCharacters: PropTypes.func,
  getOptionDisabled: PropTypes.func,
  onInputChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onHighlightChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  error: PropTypes.bool,
  classes: PropTypes.object,
  inputColor: PropTypes.string,
  chipColor: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  inputType: PropTypes.string,
  limitTags: PropTypes.number,
  inputPropsTextField: PropTypes.object,
  customClasses: PropTypes.object,
};

export default GLAutocomplete;
