// React
import React from "react";
// Styles
import './editor_input.css'
import Label from '../Label/Label'


const EditorInput = (props) => {

  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <Label styles={{ marginBottom: "20px" }}>{props.label}</Label>
      <input
        defaultValue={props.value}
        onChange={e => props.on_change_function(e)}
        className="editor_input"
        style={props.styles}
        id={props.id}
        placeholder={props.label}
        name={props.name} />
    </div>
  );
}

export default EditorInput;

