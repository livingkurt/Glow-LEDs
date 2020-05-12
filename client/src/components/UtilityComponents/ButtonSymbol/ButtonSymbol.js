// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {

  return (
    <div >
      <button
        style={props.styles}
        arg={props.arg}
        onClick={() => props.on_click_function(props.arg)}
        className="button_symbol">{props.children}</button>
    </div>
  );
}

export default ButtonSymbol;

