// React
import React from "react";


function BlockContainer(props) {

  const block_container_styles = {
    padding: "20px"
  }

  return (
    <div style={{ ...props.styles, ...block_container_styles }} className={props.class}>
      {props.children}
    </div>
  );
}

export default BlockContainer;
