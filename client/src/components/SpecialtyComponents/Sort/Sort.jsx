// React
import React, { useState } from 'react';
// Styles
import './sort.css';
import { Label } from '../../UtilityComponents';
import { FlexContainer } from '../../ContainerComponents';

const Sort = (props) => {
	return (
		<FlexContainer v_i_center>
			<Label>Sort By</Label>
			<div className="select_dropdown_container">
				<select name="sortOrder" className="select_dropdown" onChange={props.sortHandler}>
					<option defaultValue="">-----</option>
					<option defaultValue="lowest">Lowest</option>
					<option defaultValue="highest">Highest</option>
				</select>
				<i className="fas fa-sort-up icon_styles" />
			</div>
		</FlexContainer>
	);
};

export default Sort;
