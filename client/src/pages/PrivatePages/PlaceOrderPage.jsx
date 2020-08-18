import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
// import { email_order } from '../../actions/emailActions';
import MetaTags from 'react-meta-tags';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import Cookie from 'js-cookie';

const PlaceOrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

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

	useEffect(
		() => {
			calculate_shipping();
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
		if (volume <= 10) {
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

	const placeOrderHandler = () => {
		// create an order
		console.log({ shippingPrice });
		dispatch(
			createOrder({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				user_data,
				order_note
			})
		);
	};

	useEffect(
		() => {
			if (success) {
				props.history.push('/secure/account/order/' + order._id);
			}
		},
		[ success ]
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

	return (
		<div>
			<MetaTags>
				<title>Place Order | Glow LEDs</title>
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
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
				/>
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			{console.log(shipping === {})}
			{console.log(shipping === '')}
			{/* {set_place_order_state(shipping === {})} */}
			{shipping && shipping.hasOwnProperty('first_name') ? (
				<CheckoutSteps step1 step2 />
			) : (
				<CheckoutSteps step1 />
			)}
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
							<div>Shipping</div>
							<div>${shippingPrice.toFixed(2)}</div>
							{/* <div>Free Shipping</div> */}
						</li>
						<li>
							<div>Tax</div>
							<div>${taxPrice.toFixed(2)}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>${totalPrice.toFixed(2)}</div>
						</li>
						{console.log({ shipping })}
						{shipping &&
						shipping.hasOwnProperty('first_name') && (
							<li>
								<button className="button primary full-width" onClick={placeOrderHandler}>
									Start Payment Process
								</button>
							</li>
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
