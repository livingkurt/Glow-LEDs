import React from "react";
import ReactTooltip from "react-tooltip";

const GLButton = ({ children, tooltip }) => {
  return (
    <>
      <div data-tip={tooltip}>{children}</div>
      {tooltip && <ReactTooltip className="br-10px" />}
    </>
  );
};

export default GLButton;
