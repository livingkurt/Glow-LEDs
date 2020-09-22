// React
import React from 'react';
import { FlexContainer } from '../ContainerComponents';

const Search = (props) => {
	return (
		<form
			onSubmit={props.submitHandler}
			className="mr-10px"
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center'
			}}
		>
			<div className="jc-b ai-c search_container">
				<label aria-label="searchKeyword" htmlFor="searchKeyword" />
				<input
					name="searchKeyword"
					placeholder="Search"
					onChange={(e) => props.setSearchKeyword(e.target.value)}
					className="form_input search"
				/>
				<button type="submit" className="button primary">
					{/* Search {props.category && 'Category'} */}
					<i class="fas fa-search" />
				</button>
			</div>
		</form>
	);
};

export default Search;
