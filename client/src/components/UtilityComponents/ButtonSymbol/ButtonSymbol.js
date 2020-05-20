// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {

  const button_symbol_classes = "button_symbol " + props.class

  return (
    <button
      style={props.styles}
      arg={props.arg}
      onClick={() => props.on_click_function ? props.on_click_function(props.arg) : ""}
      className={button_symbol_classes}>{props.children}</button>
  );
}

export default ButtonSymbol;

