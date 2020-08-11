import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from '../components/ContainerComponents';

const CheckEmailPage = (props) => {
	return (
		<FlexContainer h_center column>
			<h1 style={{ textAlign: 'center' }}>Thank You for Registering your Account.</h1>
			<h2 style={{ textAlign: 'center' }}>Check your Email for a Link to Verifiy your Account</h2>
			<FlexContainer h_center>
				<FlexContainer v_i_center wrap>
					<p style={{ textAlign: 'center', width: '100%' }}>
						If you do not recieve a verification email, make sure to check your spam folder.
					</p>
					<p style={{ textAlign: 'center', width: '100%' }}>If still not there please contact support.</p>
					<FlexContainer h_center>
						<Link to="/contact">
							<button style={{ marginLeft: '10px' }} className="button primary">
								Contact Support
							</button>
						</Link>
					</FlexContainer>
				</FlexContainer>
			</FlexContainer>
		</FlexContainer>
	);
};
export default CheckEmailPage;
