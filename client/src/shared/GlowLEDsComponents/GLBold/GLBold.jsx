import React from "react";

const GLBold = ({ children, color }) => {
  return <span style={{ WebkitTextStroke: `1.5px ${color}` }}>{children}</span>;
};

export default GLBold;
