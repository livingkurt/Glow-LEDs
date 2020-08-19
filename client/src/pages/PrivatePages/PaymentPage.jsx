import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../../actions/cartActions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import { validate_payment } from '../../utils/helper_functions';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

const PaymentPage = (props) => {
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	console.log({ payment });

	const [ paymentMethod, setPaymentMethod ] = useState('');
	const [ loading, set_loading ] = useState(true);
	console.log({ paymentMethod });

	const [ payment_method_validations, set_payment_method_validations ] = useState('');

	useEffect(
		() => {
			// if (payment) {
			setPaymentMethod('paypal');
			// }

			return () => {};
		},
		[ payment ]
	);
	setTimeout(() => {
		set_loading(false);
	}, 500);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { paymentMethod };
		const request = validate_payment(data);
		set_payment_method_validations(request.errors.paymentMethod);
		if (request.isValid) {
			dispatch(savePayment({ paymentMethod }));
			props.history.push('placeorder');
		}
	};
	return (
		<div>
			<MetaTags>
				<title>Payment | Glow LEDs</title>
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/payment" />
				{/* <meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/> */}
				<meta property="og:title" content="Payment | Glow LEDs" />
				{/* <meta
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
				/> */}
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/payment" />

				<meta name="twitter:title" content="Payment | Glow LEDs" />
				{/* <meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
			</MetaTags>
			<CheckoutSteps step1 step2 step3 />
			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<ul className="form-container">
						<li>
							<h1>Payment</h1>
						</li>

						<li>
							{loading ? (
								<div>Loading...</div>
							) : (
								<div>
									<input
										type="radio"
										name="paymentMethod"
										id="paymentMethod"
										defaultChecked={payment ? payment.paymentMethod === 'paypal' : false}
										defaultValue="paypal"
										value={paymentMethod}
										onChange={(e) => setPaymentMethod(e.target.value)}
									/>
									<label htmlFor="paymentMethod">Paypal</label>
								</div>
							)}
							<label className="validation_text" style={{ marginTop: '1rem', justifyContent: 'center' }}>
								{payment_method_validations}
							</label>
						</li>

						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
						<li>
							<Link to="/secure/checkout/shipping">
								<button class="button secondary full-width">Back to Shipping</button>
							</Link>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};
export default PaymentPage;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { savePayment } from '../actions/cartActions';
// import { CheckoutSteps } from '../components/SpecialtyComponents';
// import { validate_payment } from '../utils/helper_functions';

// const PaymentPage = (props) => {
// 	const cart = useSelector((state) => state.cart);
// 	const { cartItems, shipping, payment } = cart;
// 	console.log({ payment });

// 	const [ paymentMethod, setPaymentMethod ] = useState('');
// 	const [ loading, set_loading ] = useState(true);
// 	console.log({ paymentMethod });

// 	const [ payment_method_validations, set_payment_method_validations ] = useState('');

// 	useEffect(
// 		() => {
// 			if (payment) {
// 				setPaymentMethod('paypal');
// 			}

// 			return () => {};
// 		},
// 		[ payment ]
//   );
//   setTimeout(() => {
//     set_loading(true)
//   }, 3000);

// 	const dispatch = useDispatch();

// 	const submitHandler = (e) => {
// 		e.preventDefault();
// 		const data = { paymentMethod };
// 		const request = validate_payment(data);
// 		set_payment_method_validations(request.errors.paymentMethod);
// 		if (request.isValid) {
// 			dispatch(savePayment({ paymentMethod }));
// 			props.history.push('placeorder');
// 		}
// 	};
// 	return (
// 		<div>
// 			<CheckoutSteps step1 step2 step3 />
// 			<div className="form">
// 				<form onSubmit={submitHandler} style={{ width: '100%' }}>
// 					<ul className="form-container">
// 						<li>
// 							<h1>Payment</h1>
// 						</li>

// 						<li>
// 							{!payment ? (
// 								<div>Loading...</div>
// 							) : (
// 								<div>
// 									<input
// 										type="radio"
// 										name="paymentMethod"
// 										id="paymentMethod"
// 										defaultChecked={paymentMethod === 'paypal'}
// 										value="paypal"
// 										defaultValue={paymentMethod}
// 										onChange={(e) => setPaymentMethod(e.target.value)}
// 									/>
// 									<label htmlFor="paymentMethod">Paypal</label>
// 								</div>
// 							)}

// 							<label className="validation_text" style={{ marginTop: '1rem', justifyContent: 'center' }}>
// 								{payment_method_validations}
// 							</label>
// 						</li>

// 						<li>
// 							<button type="submit" className="button primary">
// 								Continue
// 							</button>
// 						</li>
// 					</ul>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default PaymentPage;