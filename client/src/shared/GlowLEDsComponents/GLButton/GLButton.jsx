import * as React from "react";

const GLButton = ({ children, icon, onClick, onKeyUp, className, disabled, variant, fullWidth, ...otherProps }) => {
  console.log({ variant });
  return (
    <button
      type="button"
      className={`${variant ? "btn" : ""} ${variant} ${className} ${fullWidth ? "w-100per" : ""}`}
      onClick={variant !== "disabled" && onClick}
      onKeyUp={onKeyUp}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default GLButton;
