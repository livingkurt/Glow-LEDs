import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const EmailSentPage = (props) => {
	return (
		<FlexContainer h_center column>
			<MetaTags>
				<title>Email Sent | Glow LEDs</title>
				<meta property="og:title" content="Check Email | Glow LEDs" />
				<meta name="twitter:title" content="Check Email | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
			</MetaTags>
			<h1 style={{ textAlign: 'center' }}>Email Sent Successfully!</h1>
			{/* <h1 style={{ textAlign: 'center' }}>Thank You for Contacting Glow LEDs</h1> */}
			<h2 style={{ textAlign: 'center' }}>Thank You for Contacting Glow LEDs</h2>
			<p style={{ textAlign: 'center' }}>We'll answer your questions/requests as soon as possible.</p>
			<p style={{ textAlign: 'center' }}>Thank you for your patience and support!</p>
			<p style={{ textAlign: 'center' }}>
				Check out our Frequently Asked Questions page to learn more about our process
			</p>
			<Link to="/pages/faq">
				<FlexContainer h_center>
					<button className="button primary " style={{ margin: 'auto' }}>
						Frequently Asked Questions
					</button>
				</FlexContainer>
			</Link>
		</FlexContainer>
	);
};
export default EmailSentPage;
