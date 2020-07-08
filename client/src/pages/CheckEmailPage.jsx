import React from 'react';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

const CheckEmailPage = (props) => {
	return (
		<FlexContainer h_center column>
			<h1 style={{ textAlign: 'center' }}>Thank You for Registering your Account.</h1>
			<h2 style={{ textAlign: 'center' }}>Check your Email for a Link to Verifiy your Account</h2>
		</FlexContainer>
	);
};
export default CheckEmailPage;
