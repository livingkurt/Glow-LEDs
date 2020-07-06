// React
import React from 'react';
// Styles
import './search.css';
// Components
import { ButtonWord, EditorInput } from '../../UtilityComponents/index';
import { FlexContainer } from '../../ContainerComponents';

const Search = (props) => {
	return (
		<form
			onSubmit={props.submitHandler}
			style={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				justifyContent: 'center',
				marginRight: '20px'
			}}
		>
			<FlexContainer h_between v_i_center class="search_container" styles={{ width: '300px' }}>
				<EditorInput
					name="searchKeyword"
					on_change_function={props.setSearchKeyword}
					styles={{ marginRight: '5px', maxWidth: '200px' }}
				/>
				<button type="submit" className="button primary">
					Search
				</button>
			</FlexContainer>
		</form>
	);
};

export default Search;
