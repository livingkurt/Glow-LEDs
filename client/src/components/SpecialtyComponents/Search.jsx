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
				justifyContent: 'center',
				marginRight: '20px'
			}}
		>
			<FlexContainer h_between v_i_center class="search_container" styles={{ width: '300px' }}>
				<input
					name="searchKeyword"
					onChange={(e) => props.setSearchKeyword(e.target.value)}
					style={{ marginRight: '5px', width: '200px' }}
					className="form_input"
				/>
				<button type="submit" className="button primary">
					Search
				</button>
			</FlexContainer>
		</form>
	);
};

export default Search;
