// React
import React from 'react';

const Search = (props) => {
	return (
		<form onSubmit={props.submitHandler} className="jc-c w-100per">
			<div className="jc-b ai-c search_container">
				<label aria-label="searchKeyword" htmlFor="searchKeyword" />
				<input
					name="searchKeyword"
					placeholder="Search"
					onChange={(e) => props.setSearchKeyword(e.target.value)}
					className="form_input search mv-0px"
				/>
				<button type="submit" className="btn primary w-50px mb-0px">
					{/* Search {props.category && 'Category'} */}
					<i className="fas fa-search" />
				</button>
			</div>
		</form>
	);
};

export default Search;
