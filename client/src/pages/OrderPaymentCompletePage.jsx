import React, { useEffect, useState } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../components/UtilityComponents';

const OrderPaymentCompletePage = (props) => {
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (successPay) {
				props.history.push('/paymentcomplete/' + props.match.params.id);
			}
		},
		[ successPay ]
	);
	return (
		<FlexContainer h_center column>
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
						<Link to={'/order/' + props.match.params.id}>
							<button style={{ margin: '15px' }} className="button primary">
								View Order
							</button>
						</Link>
						<Link to="/userorders">
							<button style={{ margin: '15px' }} className="button primary">
								Your Orders
							</button>
						</Link>
						<Link to="/allproducts">
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
