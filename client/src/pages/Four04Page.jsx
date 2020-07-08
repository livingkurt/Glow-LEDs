import React from 'react';
import { Title, Label } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

const Four04Page = (props) => {
	return (
		<FlexContainer h_center column t_center>
			<h1 styles={{ margin: '20px auto' }}>404 Page Not Found</h1>
			<label>Sorry About that</label>
		</FlexContainer>
	);
};
export default Four04Page;
