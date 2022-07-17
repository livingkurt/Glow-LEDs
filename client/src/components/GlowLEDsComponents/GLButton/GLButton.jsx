import React from "react";

const GLButton = ({
  children,
  icon,
  onClick,
  onKeyUp,
  className,
  disabled,
  variant,
  fullWidth,
  ...otherProps
}) => {
  return (
    <button
      type="button"
      className={`${variant ? "btn" : ""} ${variant} ${className} ${fullWidth
        ? "w-100per"
        : ""}`}
      onClick={onClick}
      onKeyUp={onKeyUp}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default GLButton;
