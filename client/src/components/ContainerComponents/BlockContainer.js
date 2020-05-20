// React
import React from "react";


function BlockContainer(props) {
  return (
    <div style={props.styles} className={props.class}>
      {props.children}
    </div>
  );
}

export default BlockContainer;
