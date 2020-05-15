// React
import React from "react";
// Styles
import './flex_container_props.css'


function FlexContainerProps(props) {

  const styles = {
    display: "flex",
    justifyContent: props.h_center ? "center" : props.h_left ? "flex-start" : props.h_right ? "flex-end" : props.h_between ? "space-between" : props.h_around ? "space-around" : props.h_evenly ? "space-evenly" : '',
    margin: props.h_center ? "0 auto" : props.h_left ? "0 auto 0 0" : props.h_right ? "0 0 0 auto" : '',
    alignContent: props.v_center ? "center" : props.v_left ? "flex-start" : props.v_right ? "flex-end" : props.v_between ? "space-between" : props.v_around ? "space-around" : props.v_evenly ? "space-evenly" : '',
    flexDirection: props.column ? "column" : props.row ? "row" : '',
    flexWrap: props.wrap ? "wrap" : '',
  }
  return (
    <div style={{ ...styles, ...props.styles }}>
      {props.children}
    </div >
  );
}

export default FlexContainerProps;
