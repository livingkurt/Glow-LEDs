import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

const GuestCheckoutPage = (props) => {
	return (
		<div className="form">
			<Helmet>
				<title>Guest Decision | Glow LEDs</title>
				<meta property="og:title" content="Guest Decision" />
				<meta name="twitter:title" content="Guest Decision" />
				<link rel="canonical" href="https://www.glow-leds.com/account/decision" />
				<meta property="og:url" content="https://www.glow-leds.com/account/decision" />
			</Helmet>
			<ul className="form-container">
				<li>
					<h2>Continue as User</h2>
					<p>Track Orders with Ease!</p>
					<Link to="/account/login?redirect=/secure/checkout/placeorder">
						<button className="btn primary w-100per">Login</button>
					</Link>
				</li>
				<li>
					<h2>Continue as Guest</h2>
					<Link to="/checkout/placeorder">
						<button className="btn primary w-100per">Guest Checkout</button>
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default GuestCheckoutPage;
