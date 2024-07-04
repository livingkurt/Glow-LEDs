import React from "react";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";

/* eslint-disable max-lines-per-function */
const GLTextFieldV2 = ({
  style,
  value,
  helperText,
  error,
  required,
  fullWidth,
  displayHelperText,
  type,
  icon,
  iconPosition,
  iconFontSize,
  iconColor,
  onChange,
  label,
  placeholder,
  name,
  variant,
  classes,
  dataTest,
  autoFocus,
  restrictCharacters,
  maxLength,
  InputProps,
  disabled,
  multiline,
  maxRows,
  minRows,
  loading,
  inputProps,
  upperCase,
  lowerCase,
  noSpace,
  ...otherProps
}) => {
  const handleChange = event => {
    let newValue = event.target.value;

    // Convert the value to uppercase if upperCase is true
    if (upperCase) {
      newValue = newValue.toUpperCase();
    }
    // Convert the value to lowercase if lowerCase is true
    if (lowerCase) {
      newValue = newValue.toLowerCase();
    }
    // Remove all spaces if noSpace is true
    if (noSpace) {
      // This will remove all spaces from the string
      newValue = newValue.replace(/ /g, "");
    }
    // Finally, call the original onChange handler with the modified value
    if (onChange) {
      onChange({ ...event, target: { ...event.target, value: newValue } });
    }
  };

  const setInputAdornment = () => (
    <InputAdornment position={iconPosition}>
      <Icon color={iconColor} fontSize={iconFontSize}>
        {icon}
      </Icon>
    </InputAdornment>
  );

  const shouldRenderIcon = icon && iconPosition;

  return (
    <div data-test="mui-text-field-container">
      <TextField
        classes={{ ...classes }}
        value={value}
        placeholder={placeholder}
        error={error}
        required={required}
        fullWidth={fullWidth}
        type={type}
        disabled={disabled}
        onChange={handleChange}
        label={label}
        variant={variant}
        autoFocus={autoFocus}
        multiline={multiline}
        minRows={minRows}
        helperText={helperText}
        maxRows={maxRows}
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "white !important",
            "&:hover": {
              backgroundColor: "white !important",
            },
            "&:focus": {
              backgroundColor: "white !important",
            },
          },
        }}
        {...otherProps}
        inputProps={{
          name,
          "data-test": dataTest,
          maxLength,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          startAdornment: shouldRenderIcon && iconPosition === "start" ? setInputAdornment() : null,
          endAdornment: shouldRenderIcon && iconPosition === "end" ? setInputAdornment() : null,
          style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
          ...InputProps,
        }}
      />
    </div>
  );
};

GLTextFieldV2.defaultProps = {
  value: undefined,
  classes: null,
  icon: null,
  iconFontSize: "inherit",
  iconColor: "inherit",
  iconPosition: null,
  helperText: null,
  placeholder: null,
  displayHelperText: false,
  required: false,
  error: false,
  fullWidth: true,
  variant: "outlined",
  label: null,
  type: "text",
  name: null,
  dataTest: "mui-text-field-container",
  autoFocus: false,
  restrictCharacters: x => x,
  maxLength: null,
  InputProps: {},
  disabled: false,
  multiline: false,
  minRows: 1,
  maxRows: 10,
  loading: false,
  upperCase: false,
  lowerCase: false,
  noSpace: false,
};

GLTextFieldV2.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({
    inputContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    helperTextContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  classes: PropTypes.object,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  displayHelperText: PropTypes.bool,
  type: PropTypes.oneOf(["password", "search", "text", "email", "date", "tel", "number"]),
  iconFontSize: PropTypes.oneOf(["inherit", "default", "small", "large"]),
  iconColor: PropTypes.oneOf(["inherit", "primary", "secondary", "action", "error", "disabled"]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
  dataTest: PropTypes.string,
  autoFocus: PropTypes.bool,
  restrictCharacters: PropTypes.func,
  maxLength: PropTypes.number,
  InputProps: PropTypes.object,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  loading: PropTypes.bool,
  upperCase: PropTypes.bool,
  lowerCase: PropTypes.bool,
  noSpace: PropTypes.bool,
};

export default GLTextFieldV2;
/* eslint-enable max-lines-per-function */
