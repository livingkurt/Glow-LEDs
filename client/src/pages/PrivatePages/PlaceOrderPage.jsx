import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, payOrder } from '../../actions/orderActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
// import { email_order } from '../../actions/emailActions';
import MetaTags from 'react-meta-tags';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import Cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { Loading } from '../../components/UtilityComponents';

const PlaceOrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	console.log({ shipping });

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	// if (!shipping.address) {
	// 	props.history.push('/secure/checkout/shipping');
	// } else if (!payment.paymentMethod) {
	// 	props.history.push('/secure/checkout/payment');
	// }
	// const itemsPrice = cartItems.reduce((a, c) => (a + c.sale_price !== 0 ? c.sale_price : c.price * c.qty), 0);
	const itemsPrice =
		cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
			? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
			: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0);

	const [ shippingPrice, setShippingPrice ] = useState(5);
	const [ place_order_state, set_place_order_state ] = useState(false);
	const [ payment_loading, set_payment_loading ] = useState(false);

	useEffect(
		() => {
			// if (shipping) {
			// 	if (shipping.country === 'United States' || shipping.country === 'US' || shipping.country === 'USA') {
			// 		calculate_shipping();
			// 	} else {
			// 		calculate_international();
			// 	}
			// }

			// calculate_shipping();
			console.log({ shippingPrice });
			// set_place_order_state(shipping === {});
			const shipping_cookie = Cookie.getJSON('shipping');
			if (shipping_cookie) {
				dispatch(saveShipping(shipping_cookie));
			}
			dispatch(savePayment({ paymentMethod: 'paypal' }));

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
			return () => {};
		},
		[ shipping ]
	);
	// useEffect(
	// 	() => {
	// 		// if (shipping) {
	// 		// 	if (shipping.country === 'United States' || shipping.country === 'US' || shipping.country === 'USA') {
	// 		// 		calculate_shipping();
	// 		// 	} else {
	// 		// 		calculate_international();
	// 		// 	}
	// 		// }
	// 		// calculate_shipping();
	// 		console.log({ shippingPrice });
	// 		// set_place_order_state(shipping === {});
	// 		const shipping_cookie = Cookie.getJSON('shipping');
	// 		if (shipping_cookie) {
	// 			dispatch(saveShipping(shipping_cookie));
	// 		}
	// 		dispatch(savePayment({ paymentMethod: 'paypal' }));

	// 		return () => {};
	// 	},
	// 	[ shipping ]
	// );

	// useEffect(
	// 	() => {
	// 		if (shipping.hasOwnProperty("first_name")) {
	// 			set_place_order_state(true);
	// 		}

	// 		return () => {};
	// 	},
	// 	[ shipping ]
	// );

	// const shippingPrice = itemsPrice > 100 ? 0 : 5;
	useEffect(
		() => {
			// dispatch(addToCart(pathname, qty));
		},
		[ cartItems ]
	);

	const taxPrice = 0.0875 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;
	// const totalPrice = itemsPrice + taxPrice;

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
		console.log({ shippingPrice });
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
		console.log({ shippingPrice });
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
					order_note
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
			}
		},
		[ successPay ]
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

	return (
		<div>
			<MetaTags>
				<title>Place Order | Glow LEDs</title>
				<meta property="og:title" content="Place Order | Glow LEDs" />
				<meta name="twitter:title" content="Place Order | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
			</MetaTags>
			{console.log(shipping === {})}
			{console.log(shipping === '')}
			{/* {set_place_order_state(shipping === {})} */}
			{successPay ? (
				<CheckoutSteps step1 step2 step3 step4 />
			) : shipping && shipping.hasOwnProperty('first_name') ? (
				<CheckoutSteps step1 step2 step3 />
			) : (
				<CheckoutSteps step1 />
			)}
			<Loading loading={payment_loading} />
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
							{console.log({ shipping })}
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
											<img src={item.display_image} alt="product" />
										</div>
										<div className=" label cart-name">
											<div>
												<Link to={'/collections/all/products/' + item.pathname}>
													{item.name}
												</Link>
											</div>
											{/* <div>Qty: {item.qty}</div> */}
											<FlexContainer v_i_center styles={{ height: '25px' }}>
												Qty:{' '}
												<div className="qty_select_dropdown_container">
													{console.log({ item })}
													<select
														// defaultValue={item.qty}
														value={item.qty}
														className="qty_select_dropdown"
														onChange={(e) =>
															dispatch(addToCart(item.pathname, e.target.value))}
													>
														{[ ...Array(item.countInStock).keys() ].map((x) => (
															<option key={x + 1} defaultValue={parseInt(x + 1)}>
																{parseInt(x + 1)}
															</option>
														))}
													</select>
													<i className="fas fa-sort-up icon_styles" />
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
							<div>${itemsPrice.toFixed(2)}</div>
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
							{/* <div>Free Shipping</div> */}
						</li>

						<li>
							<div>Order Total</div>
							{/* <div>${totalPrice.toFixed(2)}</div> */}
							<div>
								{shipping && shipping.hasOwnProperty('first_name') ? (
									'$' + totalPrice.toFixed(2)
								) : (
									'------'
								)}
							</div>
						</li>
						{console.log({ shipping })}
						{shipping &&
						shipping.hasOwnProperty('first_name') && (
							<StripeCheckout
								name="Glow LEDs"
								// description={order.orderItems.map((item) => {
								// 	return `${item.qty}x - ${item.name}`;
								// })}
								// description={`Pay for Order: ${order._id}`}
								description={`Pay for Order`}
								amount={totalPrice.toFixed(2) * 100}
								token={(token) => placeOrderHandler(token)}
								// token={(token) => console.log(token)}
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
							>
								<button className="button primary full-width" style={{ marginBottom: '12px' }}>
									Pay for Order
								</button>
							</StripeCheckout>
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
