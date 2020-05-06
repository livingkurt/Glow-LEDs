// React
import React from "react";
// Styles
import './button_word.css'


function ButtonWord(props) {

  return (
    <div>
      <button
        index={props.index}
        id={props.id}
        onClick={e => props.on_click_function(e)}
        style={props.styles}
        className="button_word">{props.children}</button>
    </div>
  );
}

export default ButtonWord;

// );