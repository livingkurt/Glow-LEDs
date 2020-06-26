import React from 'react';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

const CheckEmailPage = (props) => {
	return (
		<FlexContainer h_center column>
			<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Thank You for Registering your Account.</Title>
			<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
				Check your Email for a Link to Verifiy your Account
			</Title>
		</FlexContainer>
	);
};
export default CheckEmailPage;
