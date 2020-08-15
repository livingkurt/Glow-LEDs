import React, { useEffect, useState } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const OrderPaymentCompletePage = (props) => {
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
			<MetaTags>
				<title>Payment Complete | Glow LEDs</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
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
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			{props.loadingPay ? (
				<FlexContainer h_center column>
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : props.errorPay ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>Page Error</h3>
					<h3 style={{ textAlign: 'center' }}>{props.errorPay} </h3>
				</FlexContainer>
			) : (
				<div>
					<h1 style={{ textAlign: 'center' }}>Payment Successful</h1>
					<p style={{ textAlign: 'center' }}>Thank you for your payment </p>
					<p style={{ textAlign: 'center' }}>We appreciate your support</p>
					<p style={{ textAlign: 'center' }}> We will notify you when your order ships!</p>
					<FlexContainer h_center wrap row h_between styles={{ width: '100%' }}>
						<Link to={'/account/order/' + props.match.params.id}>
							<button style={{ margin: '15px' }} className="button primary">
								View Order
							</button>
						</Link>
						<Link to="/account/orders">
							<button style={{ margin: '15px' }} className="button primary">
								Your Orders
							</button>
						</Link>
						<Link to="/collections/all/products">
							<button style={{ margin: '15px' }} className="button primary">
								Products
							</button>
						</Link>
					</FlexContainer>
				</div>
			)}
		</FlexContainer>
	);
};
export default OrderPaymentCompletePage;
