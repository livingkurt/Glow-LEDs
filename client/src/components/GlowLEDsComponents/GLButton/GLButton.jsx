import React from "react";
import ReactTooltip from "react-tooltip";

const GLButton = ({ children, icon, onClick, onKeyUp, className, disabled, variant, fullWidth, tooltip, ...otherProps }) => {
  const button = (
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
  if (tooltip) {
    return (
      <>
        <div className="column ai-c pos-rel" data-tip={tooltip}>
          {button}
        </div>
        {tooltip && <ReactTooltip className="br-10px" />}
      </>
    );
  } else {
    return button;
  }
};

export default GLButton;
