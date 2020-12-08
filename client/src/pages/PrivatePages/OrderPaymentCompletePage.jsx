import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const OrderPaymentCompletePage = (props) => {
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
				<h1 style={{ textAlign: 'center' }}>Payment Successful</h1>
				<p style={{ textAlign: 'center' }}>Thank you for your payment </p>
				<p style={{ textAlign: 'center' }}>We appreciate your support</p>
				<p style={{ textAlign: 'center' }}> We will notify you when your order ships!</p>
				<div h_center wrap row h_between styles={{ width: '100%' }}>
					<Link to={'/secure/account/order/' + props.match.params.id}>
						<button style={{ margin: '15px' }} className="button primary">
							View Order
						</button>
					</Link>
					<Link to="/secure/account/orders">
						<button style={{ margin: '15px' }} className="button primary">
							Your Orders
						</button>
					</Link>
					<Link to="/collections/all/products">
						<button style={{ margin: '15px' }} className="button primary">
							Products
						</button>
					</Link>
				</div>
				<p style={{ textAlign: 'center' }}>
					{' '}
					Make sure to check your spam folder for the confirmation email. If you do not recieve a confirmation
					email please contact support
				</p>
			</div>
		</div>
	);
};
export default OrderPaymentCompletePage;
