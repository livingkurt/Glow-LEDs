// React
import React from "react";


const Content = (props) => {

  const content_styles = {
    width: "75%",
    gridArea: "main",
    backgroundColor: "#737373",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    background: "linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%)",
    borderRadius: "20px",
    margin: "20px auto",
    padding: "2rem"
  }

  return (
    <div style={{ ...content_styles, ...props.styles }} className="content">
      {props.children}
    </div>
  );
}

export default Content;
