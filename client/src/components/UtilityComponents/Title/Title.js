// React
import React from "react";
// Styles
import './title.css'


const Title = (props) => {

  return (
    <div className="title">
      <h1 style={props.styles}>{props.children}</h1>
    </div >
  );
}

export default Title;
