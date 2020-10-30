import React, { useEffect, useState } from 'react';
import { FlexContainer } from '../../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const OrderPaymentAccountCompletePublicPage = (props) => {
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (successPay) {
				props.history.push('/checkout/paymentacccountcomplete/' + props.match.params.id);
			}
		},
		[ successPay ]
	);
	return (
		<FlexContainer h_center column>
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

				<FlexContainer h_center wrap row h_between styles={{ width: '100%' }}>
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
				</FlexContainer>
				<h1 style={{ textAlign: 'center' }}>Account Created Successfully</h1>
				<p style={{ textAlign: 'center' }}>Thank you for signing up with glow-leds</p>
				{/* <p style={{ textAlign: 'center' }}>
					Your temporary password is{' '}
					<label style={{ fontFamily: 'helvetica', color: '#ff4040' }}>glowleds </label>(all lowercase)
				</p>
				<p style={{ textAlign: 'center' }}>
					Be sure to login and change your password to keep your account secure.
				</p> */}
			</div>
			<FlexContainer h_center wrap row h_between styles={{ width: '100%' }}>
				<Link to="/account/login">
					<button style={{ margin: '15px' }} className="button primary">
						Login
					</button>
				</Link>
			</FlexContainer>
		</FlexContainer>
	);
};
export default OrderPaymentAccountCompletePublicPage;
