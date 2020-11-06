import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderPaymentAccountCompletePublicPage = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Payment Complete | Glow LEDs</title>
				<meta property="og:title" content="Payment Complete | Glow LEDs" />
				<meta name="twitter:title" content="Payment Complete | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
			</Helmet>
			<div>
				<h1 style={{ textAlign: 'center' }}>Payment Successful</h1>
				<p style={{ textAlign: 'center' }}>Thank you for your payment </p>
				<p style={{ textAlign: 'center' }}>We appreciate your support</p>
				<p style={{ textAlign: 'center' }}> We will notify you when your order ships!</p>

				<div className="wrap row jc-b w-100per">
					<Link to="/collections/all/products">
						<button style={{ margin: '15px' }} className="button primary">
							Products
						</button>
					</Link>
					<Link to="/pages/featured">
						<button style={{ margin: '15px' }} className="button primary">
							Featured Videos
						</button>
					</Link>
					<Link to="/pages/music">
						<button style={{ margin: '15px' }} className="button primary">
							NTRE Music
						</button>
					</Link>
				</div>
				<h1 style={{ textAlign: 'center' }}>Account Created Successfully</h1>
				<p style={{ textAlign: 'center' }}>Thank you for signing up with glow-leds</p>
			</div>
			<div className="wrap row jc-b w-100per">
				<Link to="/account/login">
					<button style={{ margin: '15px' }} className="button primary">
						Login
					</button>
				</Link>
			</div>
		</div>
	);
};
export default OrderPaymentAccountCompletePublicPage;
