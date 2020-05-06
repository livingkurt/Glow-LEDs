// React
import React from "react";
// Styles
import './button_symbol.css'


const ButtonSymbol = (props) => {

  return (
    <div >
      <button
        style={props.styles}
        id={props.id}
        onClick={() => props.on_click_function(props.id, props.priority)}
        className="button_symbol">{props.children}</button>
    </div>
  );
}

export default ButtonSymbol;

