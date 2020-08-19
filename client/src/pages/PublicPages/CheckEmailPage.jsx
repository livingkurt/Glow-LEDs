import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const CheckEmailPage = (props) => {
	return (
		<FlexContainer h_center column>
			<MetaTags>
				<title>Check Email | Glow LEDs</title>
				<meta property="og:title" content="Check Email | Glow LEDs" />
				<meta name="twitter:title" content="Check Email | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
				{/* <meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/> */}

				{/* <meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}

				{/* <meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
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
						<Link to="/pages/contact/did_not_recieve_verification_email">
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
