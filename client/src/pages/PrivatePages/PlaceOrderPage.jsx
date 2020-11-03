import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPayOrder, createOrder } from '../../actions/orderActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';
import Cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { Loading, LoadingPayments } from '../../components/UtilityComponents';
import { validate_promo_code } from '../../utils/validations';
import { SuggestedProducts, Carousel } from '../../components/SpecialtyComponents';
import { listUsers } from '../../actions/userActions';

const PlaceOrderPage = (props) => {
	const discount_percent = 0.2;
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	// console.log({ cartItems });
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error, loading } = orderCreate;
	console.log({ orderCreate });

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	// console.log({ orderPay });

	const userList = useSelector((state) => state.userList);
	const { loading: loading_users, users, error: error_users } = userList;

	const promoList = useSelector((state) => state.promoList);
	const { loading: promo_loading, promos, error: promo_error } = promoList;
	// console.log({ orderPay });
	const items_price =
		cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
			? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
			: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0);

	const [ shippingPrice, setShippingPrice ] = useState(0);
	const [ promo_code, set_promo_code ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ taxPrice, setTaxPrice ] = useState(0.0875 * items_price);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ user, set_user ] = useState(user_data);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');

	useEffect(() => {
		dispatch(listPromos());
		dispatch(listUsers(''));
		return () => {};
	}, []);

	useEffect(
		() => {
			const shipping_cookie = Cookie.getJSON('shipping');
			if (shipping_cookie) {
				dispatch(saveShipping(shipping_cookie));
			}
			// const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');
			// if (diffuser_cap_cookie) {
			// 	set_diffuser_cap(diffuser_cap_cookie);
			// 	console.log({ diffuser_cap_cookie });
			// }
			dispatch(savePayment({ paymentMethod: 'stripe' }));
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
			if (error) {
				set_payment_loading(false);
			}
			// calculate_shipping();
			// setTotalPrice(itemsPrice + shippingPrice + taxPrice);
			return () => {};
		},
		[ error ]
	);
	useEffect(
		() => {
			if (shipping) {
				if (shipping.international) {
					calculate_international();
				} else {
					calculate_shipping();
					calculate_shipping();
				}
			}
			// calculate_shipping();
			// setTotalPrice(itemsPrice + shippingPrice + taxPrice);
			return () => {};
		},
		[ shipping ]
	);

	useEffect(
		() => {
			setTotalPrice(itemsPrice + shippingPrice + taxPrice);
			return () => {};
		},
		[ shippingPrice ]
	);

	// const taxPrice = 0.0875 * itemsPrice;
	// const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const [ order_note, set_order_note ] = useState('');

	const dispatch = useDispatch();

	const calculate_shipping = () => {
		const volume = cartItems.reduce((a, c) => a + c.volume * c.qty, 0);
		console.log(volume);
		if (volume === 0) {
			console.log(0);
			setShippingPrice(0);
		} else if (volume <= 10) {
			console.log(5);
			setShippingPrice(5);
		} else if (volume > 10 && volume <= 165) {
			console.log(8);
			setShippingPrice(7);
		} else if (volume > 165 && volume <= 250) {
			console.log(8);
			setShippingPrice(9);
		} else if (volume > 250 && volume <= 405) {
			console.log(10);
			setShippingPrice(10);
			console.log(12);
		} else if (volume > 405 && volume < 500) {
			setShippingPrice(12);
			console.log(500);
		} else if (volume > 500) {
			setShippingPrice(15);
		}

		// if (itemsPrice >= 50) {
		// 	setShippingPrice(0);
		// }
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
		console.log({ user_data });
		console.log({ user });
		dispatch(
			createPayOrder(
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
					promo_code
				},
				token
			)
		);

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
				// props.history.push('/secure/checkout/paymentcomplete/' + order._id);
				props.history.push('/secure/emails/order/' + order._id);
				set_payment_loading(false);
				empty_cart();
			} else if (errorPay) {
			}
		},
		[ successPay ]
	);
	useEffect(
		() => {
			if (errorPay) {
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
		// if (name.includes('Diffuser Caps + Adapters Starter Kit')) {
		// 	// console.log('Caps');
		// 	// if (!categories.includes('diffuser_adapters')) {
		// 	return "Don't Forget: Add a note of the caps you want or a random pair will be sent to you";
		// 	// }
		// }
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

	useEffect(
		() => {
			setTotalPrice(itemsPrice + shippingPrice + taxPrice);
		},
		[ itemsPrice ]
	);

	const [ promo_code_validations, set_promo_code_validations ] = useState('');

	// const promo_codes = [ '' ];
	const check_code = () => {
		const data = { promo_code, promos, user_data };
		const request = validate_promo_code(data);

		set_promo_code_validations(request.errors.promo_code);
		console.log(request);

		if (request.isValid) {
			const promo = promos.find((promo) => promo.promo_code === promo_code.toLowerCase());
			if (show_message) {
				set_promo_code_validations('Can only use one promo code at a time');
			} else {
				// else if (user_data._id && promo.user === user_data._id){

				// }
				setItemsPrice(items_price - items_price * (promo.percentage_off / 100));
				setTaxPrice(0.0875 * (items_price - items_price * (promo.percentage_off / 100)));
				if (promo_code === 'freeshipping') {
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
				set_show_message(promo.promo_code);
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
	const handleChangeFor = (type) => ({ error }) => {
		/* handle error */
		console.log({ type });
		console.log({ error });
	};

	const create_order_without_paying = () => {
		// create an order
		console.log({ user });
		dispatch(
			createOrder({
				orderItems: cartItems,
				shipping: { ...shipping, email: user.email },
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				user,
				order_note,
				promo_code
			})
		);

		set_payment_loading(false);
		props.history.push('/secure/glow/orders');
		empty_cart();
	};
	return (
		<div>
			<Helmet>
				<title>Place Order | Glow LEDs</title>
				<meta property="og:title" content="Place Order | Glow LEDs" />
				<meta name="twitter:title" content="Place Order | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
			</Helmet>
			{successPay ? (
				<CheckoutSteps step1 step2 step3 step4 />
			) : shipping && shipping.hasOwnProperty('first_name') ? (
				<CheckoutSteps step1 step2 step3 />
			) : (
				<CheckoutSteps step1 />
			)}
			<LoadingPayments loading={payment_loading} error={error} />
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
									<li className=" row cart_items" key={index}>
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img src={item.display_image} alt="product" />
											</Link>
										</div>
										<div className=" label cart-name">
											<div className="mb-10px">
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mini_diffuser_caps' ||
														item.category === 'frosted_diffusers') &&
														item.diffuser_cap_color}{' '}
													{item.name} {item.diffuser_cap && `w (${item.diffuser_cap.name})`}
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
										<div className=" cart_item">
											<div className="cart-price ">
												{item.sale_price !== 0 ? (
													<div>
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
										</div>
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
							{show_message && free_shipping_message !== 'Free' ? (
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
								{shipping && shipping.hasOwnProperty('first_name') && shippingPrice > 0 ? (
									'$' + shippingPrice.toFixed(2)
								) : (
									free_shipping_message
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
							<div>
								<StripeCheckout
									name="Glow LEDs"
									description={`Pay for Order`}
									amount={totalPrice.toFixed(2) * 100}
									token={(token) => placeOrderHandler(token)}
									stripeKey={process.env.REACT_APP_STRIPE_KEY}
									onChange={handleChangeFor('cardNumber')}
								>
									<button className="button primary full-width mb-12px">Pay for Order</button>
								</StripeCheckout>
							</div>
						)}
						{user_data &&
						user_data.isAdmin &&
						users && (
							<div>
								<button
									onClick={create_order_without_paying}
									className="button secondary full-width mb-12px"
								>
									Create Order Without Paying
								</button>

								<div className="ai-c h-25px mv-10px mb-30px jc-c">
									<div className="custom-select w-100per">
										<select
											className="qty_select_dropdown w-100per"
											defaultValue={user_data.first_name}
											onChange={(e) => set_user(JSON.parse(e.target.value))}
										>
											<option key={1} defaultValue="">
												---Choose User for Order---
											</option>
											{users.map((user, index) => (
												<option key={index} value={JSON.stringify(user)}>
													{user.first_name} {user.last_name}
												</option>
											))}
										</select>
										<span className="custom-arrow" />
									</div>
								</div>
							</div>
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
			{/* <SuggestedProducts /> */}
			<Carousel />
		</div>
	);
};

export default PlaceOrderPage;
