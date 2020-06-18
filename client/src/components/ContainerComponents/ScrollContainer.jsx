// React
import React from "react";


const ScrollContainer = (props) => {

  const scroll_container_styles = {
    height: "83vh",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "scroll",
    border: "1px silver solid",
    overflowX: "auto",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  }

  return (
    <div className="scroll_container" style={{ ...scroll_container_styles, ...props.styles }}>
      {props.children}
    </div>
  );
}

export default ScrollContainer;