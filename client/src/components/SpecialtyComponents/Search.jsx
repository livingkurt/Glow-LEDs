// React
import React from 'react';
import { FlexContainer } from '../ContainerComponents';

const Search = (props) => {
	return (
		<form
			onSubmit={props.submitHandler}
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center'
				// marginRight: '20px'
			}}
		>
			<FlexContainer h_between v_i_center wrap class="search_container">
				<label aria-label="searchKeyword" htmlFor="searchKeyword" />
				<input
					name="searchKeyword"
					placeholder="Search"
					onChange={(e) => props.setSearchKeyword(e.target.value)}
					style={{ marginRight: '5px', width: '200px' }}
					className="form_input"
				/>
				<button type="submit" className="button primary search">
					Search {props.category && 'Category'}
				</button>
			</FlexContainer>
		</form>
	);
};

export default Search;
