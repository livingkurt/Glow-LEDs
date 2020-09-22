// React
import React, { useState } from 'react';
import { FlexContainer } from '../ContainerComponents';

const Sort = (props) => {
	return (
		<div className="ai-c">
			{/* <label aria-label="sortOrder" htmlFor="sortOrder" className="select-label w-100per">
				Sort By
			</label> */}
			<div className="custom-select">
				<select name="sortOrder" className="sort_select" onChange={props.sortHandler}>
					<option className="grey_option" disabled="disabled" selected="selected" value="">
						Sort By
					</option>
					{props.sort_options.map((option) => {
						return <option value={option.toLowerCase()}>{option}</option>;
					})}
				</select>
				<span className="custom-arrow" />
			</div>
		</div>
	);
};

export default Sort;
