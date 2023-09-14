import React from "react";
import "./checkbox.css";

const Checkbox = ({ checkboxState, onCheck }) => {
  return (
    <div>
      <label className="checkbox_label">
        <input id="checkbox_input" type="checkbox" checked={checkboxState} />
        <span className="checkbox_span" onClick={() => onCheck()} />
      </label>
    </div>
  );
};

export default Checkbox;
