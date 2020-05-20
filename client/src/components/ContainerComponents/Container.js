// React
import React from "react";


function Container(props) {

  const container_styles = {
    display: "grid",
    gridTemplateAreas: "\"header\" \"main\" \"footer\"",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "16rem 1fr 5rem",
    height: "100%"
  }

  return (
    <div style={{ ...container_styles, ...props.styles }} className="fade_in">
      {props.children}
    </div>
  );
}

export default Container;
