import React, { useEffect, useState } from 'react';
import { FlexContainer } from '../../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const OrderPaymentCompletePublicPage = (props) => {
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (successPay) {
				props.history.push('/checkout/paymentcomplete/' + props.match.params.id);
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
			{/* {props.loadingPay ? (
				<FlexContainer h_center column>
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : props.errorPay ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>Payment Not Complete</h3>
					<label style={{ textAlign: 'center' }}>Maybe try a different card {props.errorPay} </label>
				</FlexContainer>
			) : ( */}
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
					<Link to="/account/register">
						<button style={{ margin: '15px' }} className="button primary">
							Create Account
						</button>
					</Link>
				</FlexContainer>
				<p style={{ textAlign: 'center' }}>
					{' '}
					If you are trying to make a new order, Refresh the Page and go back to cart to start checkout
					process
				</p>
			</div>
			{/* )} */}
		</FlexContainer>
	);
};
export default OrderPaymentCompletePublicPage;
