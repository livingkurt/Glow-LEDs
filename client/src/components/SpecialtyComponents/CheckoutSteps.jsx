import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const CheckoutSteps = (props) => {
	return (
		<div className="checkout-steps">
			<div className={props.step1 ? 'active' : ''}>
				<Link to="/login?redirect=shipping">Login</Link>
			</div>
			<div className={props.step2 ? 'active' : ''}>
				<Link to="/shipping">Shipping</Link>
			</div>
			<div className={props.step3 ? 'active' : ''}>
				<Link to="/payment">Payment</Link>
			</div>
			<div className={props.step4 ? 'active' : ''}>
				<Link to="/placeorder">Place Order</Link>
			</div>
		</div>
	);
};

export default CheckoutSteps;
