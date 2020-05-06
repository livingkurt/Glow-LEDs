// React
import React from "react";
// Styles
import './block_container.css'


function BlockContainer(props) {
  return (
    <div className="block_container" style={props.styles}>
      {props.children}
    </div>
  );
}

export default BlockContainer;
