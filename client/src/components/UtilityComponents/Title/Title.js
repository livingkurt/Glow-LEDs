// React
import React from "react";
// Styles
import './title.css'


const Title = (props) => {

  const title_styles = {
    display: "flex",
    fontFamily: "heading_font",
    margin: "0px"
  }

  return (
    <h1 className={props.class} style={{ ...title_styles, ...props.styles }}>{props.children}</h1>
  );
}

export default Title;
