// React
import React from "react";
// Styles
import './flex_container.css'


function FlexContainer(props) {
  return (
    <div className="flex_container" style={props.styles}>
      {props.children}
    </div>
  );
}

export default FlexContainer;
