import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, createPayOrderGuest } from '../../actions/orderActions';
import { GuestCheckoutSteps } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';
import Cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { LoadingPayments } from '../../components/UtilityComponents';
import { validate_promo_code, validate_passwords } from '../../utils/validations';
import { Carousel } from '../../components/SpecialtyComponents';

const PlaceOrderPublicPage = (props) => {
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
	const [ create_account, set_create_account ] = useState();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ account_create, set_account_create ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');
	const [ passwords_complete, set_passwords_complete ] = useState('');
	const [ passwords_check, set_passwords_check ] = useState(false);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');

	useEffect(() => {
		dispatch(listPromos());
		// dispatch(listUsers(''));
		return () => {};
	}, []);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

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

	const check_password = async (e) => {
		e.preventDefault();
		const validation_data = { password, rePassword };
		// console.log({ data });
		const request = await validate_passwords(validation_data);
		console.log({ request });
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);
		set_passwords_complete('');
		set_passwords_check(false);
		if (request.isValid) {
			set_passwords_complete('Passwords Verified');
			set_passwords_check(true);
		}
	};

	const placeOrderHandler = async (token, create_account) => {
		set_create_account(create_account);
		dispatch(
			createPayOrderGuest(
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
				create_account,
				password,
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
				if (create_account) {
					console.log('account');
					props.history.push('/checkout/paymentacccountcomplete/' + order._id);
					// props.history.push('/checkout/order/receipt/' + order._id);
				} else {
					console.log('order');
					props.history.push('/checkout/paymentcomplete/' + order._id);
					// props.history.push('/checkout/order/receipt/' + order._id);
				}
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
				if (promo.percentage_off) {
					setItemsPrice(items_price - items_price * (promo.percentage_off / 100));
					setTaxPrice(0.0875 * (items_price - items_price * (promo.percentage_off / 100)));
				} else if (promo.amount_off) {
					setItemsPrice(items_price - items_price * (promo.amount_off / 100));
					setTaxPrice(0.0875 * (items_price - items_price * (promo.amount_off / 100)));
				}
				if (promo.free_shipping) {
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
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
				shipping,
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
				<GuestCheckoutSteps step1 step2 step3 step4 />
			) : shipping && shipping.hasOwnProperty('first_name') ? (
				<GuestCheckoutSteps step1 step2 step3 />
			) : (
				<GuestCheckoutSteps step1 />
			)}
			<LoadingPayments loading={payment_loading} error={error} />
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h1>Shipping</h1>
						<div className="wrap jc-b">
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
								<Link to="/checkout/shipping">
									<button className="button primary">
										{shipping && shipping.hasOwnProperty('first_name') ? (
											'Edit Shipping'
										) : (
											'Add Shipping'
										)}
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h1>Shopping Cart</h1>
								<div className="column">
									<Link to="/collections/all/products">
										<li style={{ marginBottom: '0', borderBottom: 0 }}>
											<button className="button secondary full-width" style={{ marginBottom: 0 }}>
												Continue Shopping
											</button>
										</li>
									</Link>
									<label style={{ textAlign: 'right' }}>Price</label>
								</div>
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
											<div className="ai-c h-25px">
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
															dispatch(
																addToCart(
																	item.pathname,
																	e.target.value,
																	item.diffuser_cap_color && item.diffuser_cap_color,
																	item.diffuser_cap && item.diffuser_cap.name
																)
															)}
													>
														{[ ...Array(item.countInStock).keys() ].map((x) => (
															<option key={x + 1} defaultValue={parseInt(x + 1)}>
																{parseInt(x + 1)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
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
								{shipping && shipping.hasOwnProperty('first_name') && shippingPrice > 0 ? (
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
						shipping.hasOwnProperty('first_name') &&
						!account_create && (
							<div>
								<StripeCheckout
									name="Glow LEDs"
									description={`Pay for Order`}
									amount={totalPrice.toFixed(2) * 100}
									token={(token) => placeOrderHandler(token, false)}
									stripeKey={process.env.REACT_APP_STRIPE_KEY}
									onChange={handleChangeFor('cardNumber')}
								>
									<button className="button secondary full-width mb-12px">Pay for Order</button>
								</StripeCheckout>
							</div>
						)}
						{loading_checkboxes ? (
							<div>Loading...</div>
						) : (
							<li>
								<label htmlFor="account_create mb-20px">Create Account</label>
								<input
									type="checkbox"
									name="account_create"
									defaultChecked={account_create}
									id="account_create"
									onChange={(e) => {
										set_account_create(e.target.checked);
									}}
								/>
							</li>
						)}
						{account_create && (
							<li className="column">
								<label htmlFor="password">Password</label>
								<input
									className="form_input"
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label className="validation_text fs-16px jc-c ">{password_validations}</label>
							</li>
						)}
						{account_create && (
							<li className="column">
								<label htmlFor="rePassword">Re-Enter Password</label>
								<input
									className="form_input"
									type="password"
									id="rePassword"
									name="rePassword"
									onChange={(e) => setRePassword(e.target.value)}
								/>
								<label className="validation_text fs-16px jc-c ">{re_password_validations}</label>
							</li>
						)}
						{account_create && (
							<li className="column">
								<label className="fs-16px jc-c ta-c mb-12px" style={{ color: '#3dff3d' }}>
									{passwords_complete}
								</label>
								<button className="button primary" onClick={(e) => check_password(e)}>
									Check Password
								</button>
							</li>
						)}

						{shipping &&
						shipping.hasOwnProperty('first_name') &&
						passwords_check && (
							<div>
								<StripeCheckout
									name="Glow LEDs"
									description={`Pay for Order`}
									amount={totalPrice.toFixed(2) * 100}
									token={(token) => placeOrderHandler(token, true)}
									stripeKey={process.env.REACT_APP_STRIPE_KEY}
									onChange={handleChangeFor('cardNumber')}
								>
									<button className="button primary full-width mb-12px">
										Pay for Order/Create Account
									</button>
								</StripeCheckout>
							</div>
						)}
						{user_data &&
						user_data.isAdmin &&
						users && (
							<div>
								<button
									onClick={create_order_without_paying}
									className="button primary full-width mb-12px"
								>
									Create Order Without Paying
								</button>

								<div className="ai-c h-25px mv-10px mb-30px jc-c">
									<div className="custom-select">
										<select
											className="qty_select_dropdown"
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
						<div className="column">
							<div htmlFor="order_note">Add a note</div>
							<textarea
								name="order_note"
								value={order_note}
								id="order_note"
								style={{ width: '100%', height: '100px' }}
								onChange={(e) => set_order_note(e.target.value)}
							/>
							<h4>{no_note_warning()}</h4>
						</div>
					</ul>
				</div>
			</div>
			<Carousel />
		</div>
	);
};

export default PlaceOrderPublicPage;
