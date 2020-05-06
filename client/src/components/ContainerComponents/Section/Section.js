// React
import React from "react";
// Styles
import './section.css'


const Section = (props) => {


  return (
    <div style={props.styles} className="section">
      {props.children}
    </div>
  );
}

export default Section;
