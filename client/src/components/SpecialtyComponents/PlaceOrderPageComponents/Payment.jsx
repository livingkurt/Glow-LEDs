import React from 'react';
import { Stripe } from '../../SpecialtyComponents';

const Payment = (props) => {
	return (
		<div className="w-100per">
			<Stripe pay_order={props.placeOrderHandler} loading_payment={props.loading_payment} />
		</div>
	);
};

export default Payment;
