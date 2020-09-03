import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import MetaTags from 'react-meta-tags';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import Cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { Loading } from '../../components/UtilityComponents';
import { validate_promo_code, humanize } from '../../utils/helper_functions';

const PlaceOrderPage = (props) => {
	const discount_percent = 0.2;
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	// console.log({ cartItems });
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order } = orderCreate;
	console.log({ order });

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	// console.log({ orderPay });
	const items_price =
		cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
			? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
			: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0);

	const [ shippingPrice, setShippingPrice ] = useState(5);
	const [ promo_code, set_promo_code ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ taxPrice, setTaxPrice ] = useState(0.0875 * items_price);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ diffuser_cap, set_diffuser_cap ] = useState('');

	useEffect(
		() => {
			const shipping_cookie = Cookie.getJSON('shipping');
			const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');
			if (shipping_cookie) {
				dispatch(saveShipping(shipping_cookie));
			}
			if (diffuser_cap_cookie) {
				set_diffuser_cap(diffuser_cap_cookie);
				console.log({ diffuser_cap_cookie });
			}
			dispatch(savePayment({ paymentMethod: 'paypal' }));
			setItemsPrice(
				cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
					? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
					: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0)
			);

			return () => {};
		},
		[ cartItems ]
	);

	useEffect(
		() => {
			if (shipping) {
				if (shipping.international) {
					calculate_international();
				} else {
					calculate_shipping();
				}
			}
			// calculate_shipping();
			setTotalPrice(itemsPrice + shippingPrice + taxPrice);
			return () => {};
		},
		[ shipping ]
	);

	// const taxPrice = 0.0875 * itemsPrice;
	// const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const [ order_note, set_order_note ] = useState('');

	const dispatch = useDispatch();

	const calculate_shipping = () => {
		const volume = cartItems.reduce((a, c) => a + c.volume * c.qty, 0);
		if (volume === 0) {
			setShippingPrice(0);
		} else if (volume <= 10) {
			setShippingPrice(5);
		} else if (volume > 10 && volume < 250) {
			setShippingPrice(9);
		} else if (volume > 250 && volume < 405) {
			setShippingPrice(10);
		} else if (volume > 405 && volume < 500) {
			setShippingPrice(12);
		} else if (volume > 500) {
			setShippingPrice(15);
		}
		// console.log({ shippingPrice });
		setTotalPrice(itemsPrice + shippingPrice + taxPrice);
	};
	const calculate_international = () => {
		const volume = cartItems.reduce((a, c) => a + c.volume * c.qty, 0);
		if (volume === 0) {
			setShippingPrice(0);
		} else if (volume <= 10) {
			setShippingPrice(17);
		} else if (volume > 10 && volume < 250) {
			setShippingPrice(17);
		} else if (volume > 250 && volume < 405) {
			setShippingPrice(20);
		} else if (volume > 405 && volume < 500) {
			setShippingPrice(40);
		} else if (volume > 500) {
			setShippingPrice(80);
		}
		setTotalPrice(itemsPrice + shippingPrice + taxPrice);
		// console.log({ shippingPrice });
	};

	const placeOrderHandler = (token) => {
		// create an order
		console.log({ shippingPrice });
		dispatch(
			createOrder(
				{
					orderItems: cartItems,
					shipping,
					payment,
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
					user_data,
					order_note,
					promo_code,
					product: diffuser_cap._id
				},
				token
			)
		);
		empty_cart();
		set_payment_loading(true);
	};

	const empty_cart = () => {
		console.log(cartItems);
		for (let item of cartItems) {
			dispatch(removeFromCart(item.pathname));
		}
	};

	useEffect(
		() => {
			if (successPay && order) {
				props.history.push('/secure/checkout/paymentcomplete/' + order._id);
				set_payment_loading(false);
			} else if (errorPay) {
			}
		},
		[ successPay ]
	);
	useEffect(
		() => {
			if (successPay && order) {
				props.history.push('/secure/checkout/paymentcomplete/' + order._id);
				set_payment_loading(false);
			}
		},
		[ errorPay ]
	);

	const checkoutHandler = () => {
		props.history.push('/account/login?redirect=shipping');
	};

	const no_note_warning = () => {
		const name = cartItems.map((cartItem) => {
			return cartItem.name;
		});
		if (name.includes('Diffuser Caps + Adapters Starter Kit')) {
			// console.log('Caps');
			// if (!categories.includes('diffuser_adapters')) {
			return "Don't Forget: Add a note of the caps you want or a random pair will be sent to you";
			// }
		}
	};

	// const handleSuccessPayment = (paymentResult, token) => {
	// 	console.log('handleSuccessPayment');
	// 	dispatch(payOrder(order, paymentResult, user_data, token));
	// 	set_payment_loading(false);
	// 	// if (successPay) {
	// 	props.history.push('/secure/checkout/paymentcomplete/' + props.match.params.id);
	// 	// }
	// };

	useEffect(
		() => {
			setTotalPrice(itemsPrice + shippingPrice + taxPrice);
		},
		[ itemsPrice, taxPrice ]
	);

	const [ promo_code_validations, set_promo_code_validations ] = useState('');

	const promo_codes = [ 'giveaway20' ];
	const check_code = () => {
		const data = { promo_code, promo_codes };
		const request = validate_promo_code(data);

		set_promo_code_validations(request.errors.promo_code);
		console.log(request);
		if (request.isValid) {
			if (show_message) {
				set_promo_code_validations('Promo Code in Use');
			} else {
				console.log(promo_code);
				// if (promo_code === 'Glow' || promo_code === 'glow') {
				setItemsPrice(items_price - items_price * discount_percent);
				setTaxPrice(0.0875 * (items_price - items_price * discount_percent));
				set_show_message(promo_code);
				// set_promo_code('');
			}
		}
		// else {
		//   set_show_message('Promo Code Not Valid')
		// }
	};

	const remove_promo = () => {
		setItemsPrice(items_price);
		setTaxPrice(0.0875 * items_price);
		set_show_message('');
	};

	return (
		<div>
			<MetaTags>
				<title>Place Order | Glow LEDs</title>
				<meta property="og:title" content="Place Order | Glow LEDs" />
				<meta name="twitter:title" content="Place Order | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
			</MetaTags>
			{successPay ? (
				<CheckoutSteps step1 step2 step3 step4 />
			) : shipping && shipping.hasOwnProperty('first_name') ? (
				<CheckoutSteps step1 step2 step3 />
			) : (
				<CheckoutSteps step1 />
			)}
			<Loading loading={payment_loading} />
			{payment_loading && (
				<div className="payment_message">
					<p>Wait a moment while we process your Payment</p>
					<p>Please Do not Refresh Page</p>
				</div>
			)}
			{errorPay && (
				<div className="payment_error_message">
					<p>Your Payment has Failed</p>
					<p>Please Check your card number or Contact Support for assistance</p>
				</div>
			)}

			{/* <Loading loading={loadingPay} error={errorPay} /> */}
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h1>Shipping</h1>
						<FlexContainer h_between wrap>
							{shipping &&
							shipping.hasOwnProperty('first_name') && (
								<div className="label">
									<div>
										{shipping.first_name} {shipping.last_name}
									</div>
									<div>{shipping.address}</div>
									<div>
										{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
									</div>
									<div>{shipping.international && 'International'}</div>
									<div>{shipping.email}</div>
								</div>
							)}
							<div style={{ marginTop: '5px' }}>
								<Link to="/secure/checkout/shipping">
									<button className="button primary">
										{shipping && shipping.hasOwnProperty('first_name') ? (
											'Edit Shipping'
										) : (
											'Add Shipping'
										)}
									</button>
								</Link>
							</div>
						</FlexContainer>
					</div>

					{/* <div>
						<h1>Payment</h1>
						
						<div className="label">Payment Method: paypal</div>
					</div> */}
					{/* <div className="label">Payment Method: {cart.payment.paymentMethod}</div> */}
					<div>
						<ul className="cart-list-container">
							<li>
								<h1>Shopping Cart</h1>
								<FlexContainer column>
									<Link to="/collections/all/products">
										<li style={{ marginBottom: '0', borderBottom: 0 }}>
											<button className="button secondary full-width" style={{ marginBottom: 0 }}>
												Continue Shopping
											</button>
										</li>
									</Link>
									<label style={{ textAlign: 'right' }}>Price</label>
								</FlexContainer>
							</li>
							{cartItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								cartItems.map((item, index) => (
									<li key={index}>
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img src={item.display_image} alt="product" />
											</Link>
										</div>
										<div className=" label cart-name">
											<div className="mb-10px">
												<Link to={'/collections/all/products/' + item.pathname}>
													{item.name === 'Diffuser Caps + Adapters Starter Kit' ? (
														`${item.name} w (${diffuser_cap.name})`
													) : (
														item.name
													)}
												</Link>
											</div>
											{/* <div>Qty: {item.qty}</div> */}
											<FlexContainer v_i_center styles={{ height: '25px' }}>
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label"
												>
													Qty:
												</label>
												<div className="custom-select">
													<select
														defaultValue={item.qty}
														className="qty_select_dropdown"
														onChange={(e) =>
															dispatch(addToCart(item.pathname, e.target.value))}
														// >
														// onChange={(e) => console.log(e.target.value)}
													>
														{[ ...Array(item.countInStock).keys() ].map((x) => (
															<option key={x + 1} defaultValue={parseInt(x + 1)}>
																{parseInt(x + 1)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</FlexContainer>
										</div>
										<FlexContainer column>
											<div className="cart-price">
												{item.sale_price !== 0 ? (
													<div style={{ width: '230px' }}>
														<del style={{ color: 'red' }}>
															<label style={{ color: 'white' }}>
																${item.price ? item.price.toFixed(2) : item.price}
															</label>
														</del>{' '}
														<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
														On Sale!
													</div>
												) : (
													<label>${item.price ? item.price.toFixed(2) : item.price}</label>
												)}
											</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="button icon"
													onClick={() => dispatch(removeFromCart(item.pathname))}
												>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</FlexContainer>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
				<div className="placeorder-action">
					<ul>
						<li>
							<h1 style={{ marginTop: '0px' }}>Order Summary</h1>
						</li>
						<li>
							<div>Items</div>
							{show_message ? (
								<div>
									<del style={{ color: 'red' }}>
										<label style={{ color: 'white' }}>${items_price.toFixed(2)}</label>
									</del>{' '}
									<i class="fas fa-arrow-right" /> ${itemsPrice.toFixed(2)}
								</div>
							) : (
								<div>${itemsPrice.toFixed(2)}</div>
							)}
						</li>
						<li>
							<div>Tax</div>
							<div>${taxPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>
								{shipping && shipping.hasOwnProperty('first_name') ? (
									'$' + shippingPrice.toFixed(2)
								) : (
									'------'
								)}
							</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>
								{shipping && shipping.hasOwnProperty('first_name') ? (
									'$' + totalPrice.toFixed(2)
								) : (
									'------'
								)}
							</div>
						</li>
						{shipping &&
						shipping.hasOwnProperty('first_name') && (
							<StripeCheckout
								name="Glow LEDs"
								description={`Pay for Order`}
								amount={totalPrice.toFixed(2) * 100}
								token={(token) => placeOrderHandler(token)}
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
							>
								<button className="button primary full-width" style={{ marginBottom: '12px' }}>
									Pay for Order
								</button>
							</StripeCheckout>
						)}
						<div className="mv-10px">
							<label htmlFor="promo_code">Promo Code</label>
							<div className="row">
								<input
									type="text"
									value={promo_code}
									name="promo_code"
									id="promo_code"
									className="w-100per"
									onChange={(e) => set_promo_code(e.target.value)}
								/>
								<button className="button primary" onClick={() => check_code()}>
									Apply
								</button>
							</div>
						</div>
						<label className="validation_text" style={{ textAlign: 'center' }}>
							{promo_code_validations}
						</label>
						{show_message && (
							<div className="promo_code mv-1rem">
								<button className="button icon" onClick={() => remove_promo()}>
									<i className="fas fa-times mr-5px" />
								</button>
								{show_message}
							</div>
						)}
						<FlexContainer column>
							<div htmlFor="order_note">Add a note</div>
							<textarea
								name="order_note"
								value={order_note}
								id="order_note"
								style={{ width: '100%', height: '100px' }}
								onChange={(e) => set_order_note(e.target.value)}
							/>
							<h4>{no_note_warning()}</h4>
						</FlexContainer>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderPage;
