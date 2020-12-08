import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderPaymentAccountCompletePublicPage = (props) => {
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Payment Complete | Glow LEDs</title>
				<meta property="og:title" content="Payment Complete" />
				<meta name="twitter:title" content="Payment Complete" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/paymentcomplete/" />
			</Helmet>
			<div>
				<h1 className="ta-c">Payment Successful</h1>
				<div className="jc-c">
					<h3 className="mr-1rem mv-0px">Order Number: </h3>
					<h4 className="mv-0px">{props.match.params.id}</h4>
				</div>
				<p className="ta-c">Thank you for your payment </p>
				<p className="ta-c">We appreciate your support</p>

				<p className="ta-c"> We will notify you when your order ships!</p>
				<div className="jc-c">
					<div className="wrap row jc-c max-w-800px">
						<Link to={'/checkout/order/' + props.match.params.id}>
							<button style={{ margin: '15px' }} className="button primary">
								View Order
							</button>
						</Link>
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
				</div>
				<p className="ta-c mv-2rem">
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support
				</p>
				<h2 className="ta-c">Account Created Successfully</h2>
				<p className="ta-c">Thank you for signing up with glow-leds</p>
			</div>
			<div className="wrap row jc-c w-100per ">
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
