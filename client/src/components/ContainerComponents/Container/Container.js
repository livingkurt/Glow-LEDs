// React
import React from "react";
// Styles
import './container.css'


function Container({ children }) {
  return (
    <div className="main fade_in">
      {children}
    </div>
  );
}

export default Container;
