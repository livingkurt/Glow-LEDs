// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {

  return (
    <button
      style={props.styles}
      arg={props.arg}
      onClick={() => props ? props.on_click_function(props.arg) : ""}
      className="button_symbol">{props.children}</button>
  );
}

export default ButtonSymbol;

