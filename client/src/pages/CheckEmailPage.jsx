import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from '../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const CheckEmailPage = (props) => {
	return (
		<FlexContainer h_center column>
			<MetaTags>
				<title>Glow LEDs Check Email</title>
				<meta property="og:title" content="Glow LEDs Check Email" />
				<meta name="description" content="Glow LEDs Check Email" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
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
