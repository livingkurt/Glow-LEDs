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
				<StripeForm
					pay_order={props.pay_order}
					loading_payment={props.loading_payment}
					set_loading_payment={props.set_loading_payment}
					guest={props.guest}
					date_1={props.date_1}
					date_2={props.date_2}
				/>
			</Elements>
		</div>
	);
};

export default Stripe;
