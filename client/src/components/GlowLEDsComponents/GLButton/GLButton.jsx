import React from "react";

const GLButton = ({
  children,
  icon,
  onClick,
  onKeyUp,
  className,
  disabled,
  variant,
  ...otherProps
}) => {
  return (
    <div
      className={disabled ? "disabled-button-container" : "button-container"}
    >
      <button
        type="button"
        className={`btn ${variant} ${className}`}
        onClick={onClick}
        onKeyUp={onKeyUp}
        {...otherProps}
      >
        {children && <span>{children}</span>}
        {icon && <i className={icon} />}
      </button>
    </div>
  );
};

export default GLButton;
