import React from "react";

function Background(props) {

  const background_styles = {
    background: "linear-gradient(180deg, rgb(85, 103, 138) 12%, rgb(156, 83, 83) 56%)",
    backgroundRepeat: "repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    zIndex: "-1",
    margin: "0",
    padding: "0",
    overflowY: "overlay"
  }
  return (
    <div style={{ ...background_styles, ...props.styles }}>
      {props.children}
    </div>
  );
}

export default Background;
