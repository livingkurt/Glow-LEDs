// React
import React from "react";
// Styles
import './content.css'


const Content = (props) => {


  return (
    <div style={props.styles} className="content">
      {props.children}
    </div>
  );
}

export default Content;
