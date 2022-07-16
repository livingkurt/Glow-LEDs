import React from "react";
import Icon from "@material-ui/core/Icon";
import styles from "./GLInput.module.scss";

const GLInput = ({
  style,
  value,
  helperText,
  error,
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
  classes,
  dataTest,
  autoFocus,
  restrictCharacters,
}) => {
  const shouldRenderIcon = icon && iconPosition;

  return (
    <div>
      <input
        className={className}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        variant={variant}
        onKeyDown={restrictCharacters}
      />
      {displayHelperText &&
      helperText && (
        <div className={style.helperTextContainer}>
          {/* <FormHelperText error={error}>
            <Typography component="span" align="center" variant="body2">
              {helperText}
            </Typography>
          </FormHelperText> */}
          <label className="validation_text" style={{ textAlign: "center" }}>
            {helperText}
          </label>
        </div>
      )}
    </div>
  );
};

export default GLInput;
