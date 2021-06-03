// React
import React from 'react';

const Sort = (props) => {
	return (
		<div className="ai-c mv-1rem ">
			<div className="custom-select">
				<select name="sortOrder" className="sort_select w-221px" onChange={props.sortHandler}>
					<option className="grey_option" disabled="disabled" selected="selected" value="">
						Sort By
					</option>
					{props.sort_options.map((option, index) => {
						return <option key={index} value={option.toLowerCase()}>{option}</option>;
					})}
				</select>
				<span className="custom-arrow" />
			</div>
		</div>
	);
};

export default Sort;
