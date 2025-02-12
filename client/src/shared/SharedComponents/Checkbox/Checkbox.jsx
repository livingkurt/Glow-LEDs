import "./checkbox.css";

const Checkbox = ({ checkboxState, onCheck }) => {
  return (
    <div>
      <div className="checkbox_label">
        <input id="checkbox_input" type="checkbox" checked={checkboxState} />
        <span className="checkbox_span" onClick={() => onCheck()} />
      </div>
    </div>
  );
};

export default Checkbox;
