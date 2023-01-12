// React
import React from "react";

const Content = props => {
  return (
    <main style={props.style} className="content">
      {props.children}
    </main>
  );
};

export default Content;
