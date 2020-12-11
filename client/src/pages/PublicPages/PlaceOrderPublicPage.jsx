import React, { useState, useEffect, useCallback } from 'react';
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
import { API_External } from '../../utils';

const PlaceOrderPublicPage = (props) => {
	const dispatch = useDispatch();
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error } = orderCreate;
	console.log({ orderCreate });

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;
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
	const [ tax_rate, set_tax_rate ] = useState(0);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ user, set_user ] = useState(user_data);
	const [ create_account, set_create_account ] = useState();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ account_create, set_account_create ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	const [ loading_tax_rate, set_loading_tax_rate ] = useState(false);

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

	const stableDispatch = useCallback(dispatch, []);
	const stable_setItemsPrice = useCallback(setItemsPrice, []);
	const stable_set_payment_loading = useCallback(set_payment_loading, []);
	const stable_calculate_international = useCallback(calculate_international, []);
	const stable_calculate_shipping = useCallback(calculate_shipping, []);

	useEffect(
		() => {
			const shipping_cookie = Cookie.getJSON('shipping');
			if (shipping_cookie) {
				stableDispatch(saveShipping(shipping_cookie));
			}
			stableDispatch(savePayment({ paymentMethod: 'stripe' }));
			stable_setItemsPrice(
				cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
					? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
					: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0)
			);

			return () => {};
		},
		[ cartItems, stableDispatch, stable_setItemsPrice ]
	);

	useEffect(
		() => {
			if (error) {
				stable_set_payment_loading(false);
			}
			return () => {};
		},
		[ error, stable_set_payment_loading ]
	);
	useEffect(
		() => {
			if (shipping) {
				if (shipping.international) {
					stable_calculate_international();
				} else {
					stable_calculate_shipping();
					stable_calculate_shipping();
				}
				get_tax_rates();
			}
			return () => {};
		},
		[ shipping ]
	);

	const get_tax_rates = async () => {
		setTaxPrice(0);
		set_loading_tax_rate(true);
		const { data } = await API_External.get_tax_rates();
		const tax_rate = parseFloat(data[shipping.state]) / 100;

		if (isNaN(tax_rate)) {
			console.log('Not a Number');
		} else {
			console.log({ [shipping.state]: tax_rate });
			set_tax_rate(tax_rate);
			if (shipping.international) {
				setTaxPrice(0);
				return;
			}
			setTaxPrice(tax_rate * itemsPrice);
		}
		set_loading_tax_rate(false);
	};

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
					// props.history.push('/checkout/paymentacccountcomplete/' + order._id);
					props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
				} else {
					console.log('order');
					// props.history.push('/checkout/paymentcomplete/' + order._id);
					props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
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

	const check_code = (e) => {
		e.preventDefault();
		const data = { promo_code, promos, user_data, items_price };
		const request = validate_promo_code(data);

		set_promo_code_validations(request.errors.promo_code);
		console.log(request);

		if (request.isValid) {
			const promo = promos.find((promo) => promo.promo_code === promo_code.toLowerCase());
			const category_cart_items = cartItems
				.filter((item) => promo.excluded_categories.includes(item.category))
				.reduce((a, item) => a + item.price, 0);
			const product_cart_items = cartItems
				.filter((item) => promo.excluded_products.includes(item.pathname))
				.reduce((a, item) => a + item.price, 0);
			const total_excluded_price = category_cart_items + product_cart_items;
			console.log({ total_excluded_price });
			if (show_message) {
				set_promo_code_validations('Can only use one promo code at a time');
			} else {
				if (promo.percentage_off) {
					if (items_price === total_excluded_price) {
						set_promo_code_validations('All Items Excluded from Promo');
						return;
					}
					setItemsPrice(items_price - (items_price - total_excluded_price) * (promo.percentage_off / 100));
					setTaxPrice(
						tax_rate * (items_price - (items_price - total_excluded_price) * (promo.percentage_off / 100))
					);
				} else if (promo.amount_off) {
					setItemsPrice(items_price - promo.amount_off);
					setTaxPrice(tax_rate * (items_price - promo.amount_off));
				}
				if (promo.free_shipping) {
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
				if (promo_code === 'freeshipping') {
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
				set_show_message(
					`${promo.promo_code} ${promo.percentage_off
						? `${promo.percentage_off}% Off`
						: `$${promo.amount_off} Off`}`
				);
			}
		} else {
			set_promo_code('');
		}
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

	return (
		<div>
			<Helmet>
				<title>Place Order | Glow LEDs</title>
				<meta property="og:title" content="Place Order" />
				<meta name="twitter:title" content="Place Order" />
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
						<h2>Shipping</h2>
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
								<h2>Shopping Cart</h2>
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
												<img src={item.display_image} title="Product Image" alt={item.name} />
											</Link>
										</div>
										<div className=" label cart-name">
											<div className="mb-10px">
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mega_diffuser_caps' ||
														item.category === 'frosted_diffusers') &&
														item.diffuser_cap_color}{' '}
													{item.name} {item.diffuser_cap && `w (${item.diffuser_cap.name})`}
													{item.qty > 1 && item.qty + 'x'}
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
																${item.price && (item.price * item.qty).toFixed(2)}
															</label>
														</del>{' '}
														<i class="fas fa-arrow-right" /> ${item.sale_price && (item.sale_price * item.qty).toFixed(2)}{' '}
														On Sale!
													</div>
												) : (
													<label>${item.price && (item.price * item.qty).toFixed(2)}</label>
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
							<h2 style={{ marginTop: '0px' }}>Order Summary</h2>
						</li>
						{!show_message && (
							<li>
								<div>Subtotal</div>
								<div>${itemsPrice.toFixed(2)}</div>
							</li>
						)}

						{show_message && (
							<li>
								<del style={{ color: 'red' }}>
									<div style={{ color: 'white' }}>Subtotal</div>
								</del>
								<div>
									<del style={{ color: 'red' }}>
										<label style={{ color: 'white' }}>${items_price.toFixed(2)}</label>
									</del>
								</div>
							</li>
						)}
						{show_message && (
							<li>
								<div>Discount</div>
								<div>-${(items_price - itemsPrice).toFixed(2)}</div>
							</li>
						)}
						{show_message && (
							<li>
								<div>New Subtotal</div>
								<div>${itemsPrice.toFixed(2)}</div>
							</li>
						)}

						<li>
							<div>Tax</div>
							<div>
								{!loading_tax_rate ? shipping && shipping.hasOwnProperty('first_name') ? (
									`$${taxPrice.toFixed(2)}`
								) : (
									'------'
								) : (
									'------'
								)}
							</div>
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
								{!loading_tax_rate ? shipping && shipping.hasOwnProperty('first_name') ? (
									'$' + totalPrice.toFixed(2)
								) : (
									'------'
								) : (
									'------'
								)}
							</div>
						</li>
						{!loading_tax_rate &&
						shipping &&
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
						<div className="mv-10px">
							<label htmlFor="promo_code">Promo Code</label>

							<form onSubmit={(e) => check_code(e)} className="row">
								<input
									type="text"
									value={promo_code}
									name="promo_code"
									id="promo_code"
									className="w-100per"
									style={{ textTransform: 'uppercase' }}
									onChange={(e) => set_promo_code(e.target.value)}
								/>
								<button
									className="button primary"
									// onTouchStart={() => (e)()}
									// onClick={() => check_code()}
									style={{ curser: 'pointer' }}
								>
									Apply
								</button>
							</form>
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
