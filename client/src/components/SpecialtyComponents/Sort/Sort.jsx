// React
import React from 'react';
// Styles
import './sort.css';
import { Label } from '../../UtilityComponents';

const Sort = (props) => {
	return (
		<div className="">
			<Label>Sort By</Label>
			<select name="sortOrder" className="select-css" onChange={props.sortHandler}>
				{/* <option defaultValue="">Newest</option> */}
				<option defaultValue="lowest">Lowest</option>
				<option defaultValue="highest">Highest</option>
			</select>
		</div>
	);
};

export default Sort;
