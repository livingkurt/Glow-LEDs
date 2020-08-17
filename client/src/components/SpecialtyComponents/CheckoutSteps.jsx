import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const CheckoutSteps = (props) => {
	return (
		<div className="checkout-steps">
			<div className={props.step1 ? 'active' : ''}>Login</div>
			<div className={props.step2 ? 'active' : ''}>
				<Link to="/secure/checkout/shipping">Shipping</Link>
			</div>
			<div className={props.step3 ? 'active' : ''}>
				<Link to="/secure/checkout/payment">Payment</Link>
			</div>
			<div className={props.step4 ? 'active' : ''}>
				<Link to="/secure/checkout/placeorder">Place Order</Link>
			</div>
		</div>
	);
};

export default CheckoutSteps;
