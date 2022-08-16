import React from "react";
import ReactTooltip from "react-tooltip";

const GLButton = ({ children, icon, onClick, onKeyUp, className, disabled, variant, fullWidth, tooltip, ...otherProps }) => {
  return (
    <>
      <div className="column ai-c pos-rel" data-tip={tooltip}>
        <button
          type="button"
          className={`${variant ? "btn" : ""} ${variant} ${className} ${fullWidth ? "w-100per" : ""}`}
          onClick={variant !== "disabled" && onClick}
          onKeyUp={onKeyUp}
          {...otherProps}
        >
          {children}
        </button>
      </div>
      {tooltip && <ReactTooltip className="br-10px" />}
    </>
  );
};

export default GLButton;
