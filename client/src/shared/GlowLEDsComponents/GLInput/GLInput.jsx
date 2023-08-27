import * as React from "react";
import styles from "./GLInput.module.scss";
import "./GLInput.scss";

const GLInput = ({
  style,
  value,
  helperText,
  error,
  id,
  className,
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
  dataTest,
  autoFocus,
  restrictCharacters,
  inputClasses,
  inputProps,
  containerProps,
}) => {
  return (
    <>
      <div className="w-100per column pos-rel place_div" {...containerProps}>
        <input
          onChange={onChange}
          value={value}
          className={`zoom_f gl_input ${value ? "filled" : ""} place_input ${
            error ? "validation" : ""
          }  ${inputClasses}`}
          type={type}
          name={name}
          style={{ ...style }}
          id={id}
          required={required}
          autoFocus={autoFocus}
          spellcheck="false"
          {...inputProps}
        />
        <span htmlFor="name" className="fs-16px pos-abs place_holder">
          {label}
        </span>
      </div>
      {helperText && (
        <label className={`helper_text ${error ? "validation" : ""}`}>
          {helperText} {required && "Required"}
        </label>
      )}
    </>
  );
};

export default GLInput;
