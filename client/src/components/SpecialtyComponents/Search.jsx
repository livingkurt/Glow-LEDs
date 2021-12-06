// React
import React from 'react';

const Search = (props) => {
	return (
		<form onSubmit={props.submitHandler} className={'jc-c w-100per ' + props.className}>
			<div className="jc-b ai-c search_container w-100per">
				<label aria-label="search" htmlFor="search" />
				<input
					name="search"
					placeholder="Search"
					value={props.search}
					onChange={(e) => props.set_search(e.target.value)}
					className="form_input search mv-0px"
				/>
				<button type="submit" className="btn primary w-50px mb-0px">
					<i className="fas fa-search" />
				</button>
			</div>
		</form>
	);
};

export default Search;
