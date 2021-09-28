// React
import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
import { loadStripe } from '@stripe/stripe-js';

const Stripe = (props) => {
	const [ stripePromise, setStripePromise ] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_KEY));
	return (
		<div>
			<Elements stripe={stripePromise}>
				<StripeForm pay_order={props.pay_order}  loading_payment={props.loading_payment}/>
			</Elements>
		</div>
	);
};

export default Stripe;
