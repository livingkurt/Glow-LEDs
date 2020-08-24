import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
require('dotenv').config();

const StripeButton = () => {
	return (
		<StripeCheckout
			name="Pay for Order"
			description={`Order paid by ${user_data.name}`}
			amount={order.totalPrice * 100}
			token={(token) => handleSuccessPayment(token)}
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
			<button className="btn full-width" style={{ backgroundColor: '#804747' }}>
				Pay for Order
			</button>
		</StripeCheckout>
	);
};

export default StripeButton;
