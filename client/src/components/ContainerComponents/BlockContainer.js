// React
import React from "react";


function BlockContainer(props) {
  return (
    <div style={props.styles}>
      {props.children}
    </div>
  );
}

export default BlockContainer;
