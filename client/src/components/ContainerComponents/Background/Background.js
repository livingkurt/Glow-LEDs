import React from "react";
import './background.css'

function Background({ children }) {
  return (
    <div id="bg">
      {children}
    </div>
  );
}

export default Background;
