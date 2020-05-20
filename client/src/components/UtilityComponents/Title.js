// React
import React from "react";


const Title = (props) => {

  const title_styles = {
    display: "flex",
    fontFamily: "heading_font",
  }

  return (
    <h1 className={props.class} style={{ ...title_styles, ...props.styles }}>{props.children}</h1>
  );
}

export default Title;
