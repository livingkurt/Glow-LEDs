import React from "react";

const GLButton = ({ children, icon, onClick, onKeyUp, className, disabled, variant, fullWidth, ...otherProps }) => {
  return (
    <button
      type="button"
      className={`${variant ? "btn" : ""} ${variant} ${className} ${fullWidth ? "w-100per" : ""}`}
      onClick={variant !== "disabled" ? onClick : x => x}
      onKeyUp={onKeyUp}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default GLButton;
