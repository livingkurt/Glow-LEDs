// React
import React from "react";
// Styles
import './title.css'


const Title = (props) => {

  return (
    <div className="title">
      <h2 style={props.styles}>{props.children}</h2>
    </div >
  );
}

export default Title;
