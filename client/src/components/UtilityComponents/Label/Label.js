// React
import React, { useState, useEffect } from "react";
// Styles
import './label.css'


function Label(props) {
  return (
    <label style={props.styles} className="label">
      {props.children}
    </label>
  );
}

export default Label;