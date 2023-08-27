import * as React from "react";
import ReactTooltip from "react-tooltip";

const GLButton = ({
  children,
  icon,
  onClick,
  onKeyUp,
  className,
  disabled,
  variant,
  fullWidth,
  tooltip,
  ...otherProps
}) => {
  return (
    <>
      <button
        type="button"
        data-tip={tooltip}
        className={`${variant ? "btn" : ""} ${variant} ${className} ${fullWidth ? "w-100per" : ""}`}
        onClick={variant !== "disabled" && onClick}
        onKeyUp={onKeyUp}
        {...otherProps}
      >
        {children}
      </button>
      {tooltip && <ReactTooltip className="br-10px" />}
    </>
  );
};

export default GLButton;
