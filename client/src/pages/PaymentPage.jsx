import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Title } from '../components/UtilityComponents';

const PaymentPage = (props) => {
	const [ paymentMethod, setPaymentMethod ] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePayment({ paymentMethod }));
		props.history.push('placeorder');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<ul className="form-container">
						<li>
							<h1>Payment</h1>
						</li>

						<li>
							<div>
								<input
									type="radio"
									name="paymentMethod"
									id="paymentMethod"
									defaultValue="paypal"
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<label htmlFor="paymentMethod">Paypal</label>
							</div>
						</li>

						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};
export default PaymentPage;
