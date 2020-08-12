// React
import React, { useState } from 'react';
import { FlexContainer } from '../ContainerComponents';

const Sort = (props) => {
	return (
		<FlexContainer v_i_center styles={{ marginLeft: '13px' }}>
			<label>Sort By</label>
			<div className="select_dropdown_container">
				<select name="sortOrder" className="select_dropdown" onChange={props.sortHandler}>
					<option value="category">Category</option>
					<option value="newest">Newest</option>
					<option value="lowest">Lowest</option>
					<option value="highest">Highest</option>
				</select>
				<i className="fas fa-sort-up icon_styles" />
			</div>
		</FlexContainer>
	);
};

export default Sort;
