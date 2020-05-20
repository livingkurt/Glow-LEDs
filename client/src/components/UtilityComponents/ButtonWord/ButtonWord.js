// React
import React from "react";
// Styles
import './button_word.css'


function ButtonWord(props) {

  const button_word_classes = "button_word " + props.class

  return (
    <button
      index={props.index}
      id={props.id}
      onClick={e => props ? "" : props.on_click_function(e)}
      style={props.styles}
      className={button_word_classes} >{props.children}</button>
  );
}

export default ButtonWord;