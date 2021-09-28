// React
import React from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const StripeForm = (props) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement)
		});

		if (error) {
			console.log({ error });
			return;
		}
		console.log({ paymentMethod });
		props.pay_order(paymentMethod);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement
				options={{
					iconStyle: 'solid',
					style: {
						base: {
							iconColor: '#c4f0ff',
							color: '#fff',
							fontWeight: 500,
							fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
							fontSize: '1.2rem',
							fontSmoothing: 'antialiased',
							':-webkit-autofill': { color: 'white' },
							'::placeholder': { color: 'white' }
						},
						invalid: {
							iconColor: '#ffc7ee',
							color: '#ffc7ee'
						}
					}
				}}
			/>
			{!props.loading_payment && 
				<button type="submit" className="btn primary w-100per mb-12px bob" disabled={!stripe}>
					Complete Order
				</button>
			}
		</form>
	);
};

export default StripeForm;
