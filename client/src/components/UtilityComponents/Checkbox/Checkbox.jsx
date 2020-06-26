// React
import React from 'react';
// Styles
import './checkbox.css';
// import { API } from "../../../utils";

const Checkbox = (props) => {
	// console.log({ "Checkbox": props.checkboxState })
	return (
		<div>
			<label className="checkbox_label">
				<input id="checkbox_input" type="checkbox" checked={props.checkboxState} />
				<span className="checkbox_span" onClick={() => props.onCheck()} />
			</label>
		</div>
	);
};

export default Checkbox;
