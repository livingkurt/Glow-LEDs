// React
import React, { useState } from 'react';
import { FlexContainer } from '../ContainerComponents';

const Sort = (props) => {
	return (
		<FlexContainer v_i_center styles={{ marginLeft: '13px' }}>
			<label aria-label="sortOrder" htmlFor="sortOrder" className="select-label">
				Sort By
			</label>
			<div className="custom-select">
				<select name="sortOrder" onChange={props.sortHandler}>
					{props.sort_options.map((option) => {
						return <option value={option.toLowerCase()}>{option}</option>;
					})}
					{/* <option value="category">Category</option>
					<option value="newest">Newest</option>
					<option value="lowest">Lowest</option>
					<option value="highest">Highest</option> */}
				</select>
				<span className="custom-arrow" />
			</div>
		</FlexContainer>
	);
};

export default Sort;
