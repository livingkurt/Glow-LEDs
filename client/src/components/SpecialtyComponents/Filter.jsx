// React
import React from 'react';

const Filter = (props) => {
	return (
		<div className="ai-c">
			<div className="custom-select">
				<select name="filterOrder" className="filter_select" onChange={props.filterHandler}>
					<option className="grey_option" disabled="disabled" selected="selected" value="">
						Filter By
					</option>
					{props.filter_options.map((option) => {
						return <option value={option.toLowerCase()}>{option}</option>;
					})}
				</select>
				<span className="custom-arrow" />
			</div>
		</div>
	);
};

export default Filter;
