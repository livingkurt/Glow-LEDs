import React from "react";

const GLButton = ({
  text,
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
        {text && <span>{text}</span>}
        {icon && <i className={icon} />}
      </button>
    </div>
  );
};

export default GLButton;
