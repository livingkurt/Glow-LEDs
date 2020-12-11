import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPayOrder, createOrder, createOrderGuest } from '../../actions/orderActions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';
import Cookie from 'js-cookie';
import StripeCheckout from 'react-stripe-checkout';
import { LoadingPayments } from '../../components/UtilityComponents';
import { validate_promo_code } from '../../utils/validations';
import { Carousel } from '../../components/SpecialtyComponents';
import { listUsers } from '../../actions/userActions';
import { API_External, API_Products } from '../../utils';

const PlaceOrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error } = orderCreate;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;
	const items_price =
		cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
			? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
			: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0);

	const [ shippingPrice, setShippingPrice ] = useState(0);
	const [ promo_code, set_promo_code ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ tax_rate, set_tax_rate ] = useState(0);
	const [ taxPrice, setTaxPrice ] = useState(0);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ user, set_user ] = useState(user_data);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');
	const [ loading_tax_rate, set_loading_tax_rate ] = useState(false);
	const [ no_user, set_no_user ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const dispatch = useDispatch();

	const [ order_note, set_order_note ] = useState('');
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
			stableDispatch(listPromos());
			stableDispatch(listUsers(''));

			return () => {};
		},
		[ stableDispatch ]
	);

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

	const placeOrderHandler = async (token) => {
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
		if (promo_code) {
			await API_Products.promo_code_used(promo_code);
		}
	};

	const create_order_without_paying = async () => {
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
		if (promo_code) {
			await API_Products.promo_code_used(promo_code);
		}
	};

	const create_order_without_user = async () => {
		dispatch(
			createOrderGuest({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				order_note,
				promo_code
			})
		);

		props.history.push('/secure/glow/orders');
		empty_cart();
		if (promo_code) {
			await API_Products.promo_code_used(promo_code);
		}
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
				props.history.push('/secure/checkout/order/receipt/' + order._id + '/order/true');
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
		setTaxPrice(tax_rate * items_price);
		setShippingPrice(shippingPrice);
		set_free_shipping_message('');
		set_show_message('');
		if (shipping) {
			if (shipping.international) {
				calculate_international();
			} else {
				calculate_shipping();
				calculate_shipping();
			}
		}
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
									<li className="row cart_items" key={index}>
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img src={item.display_image} alt={item.name} title="Product Image" />
											</Link>
										</div>
										<div className=" abel cart-name">
											<div className="mb-10px">
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mega_diffuser_caps' ||
														item.category === 'frosted_diffusers') &&
														item.diffuser_cap_color}{' '}
													{item.name} {item.diffuser_cap && `w (${item.diffuser_cap.name})`}{' '}
													{item.qty > 1 && item.qty + 'x'}
												</Link>
											</div>
											{/* <div>Qty: {item.qty}</div> */}
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
										<div className="">
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
						{user_data && user_data.isAdmin && users && loading_checkboxes ? (
							<div>Loading...</div>
						) : (
							<li>
								<label htmlFor="no_user mb-20px">No User</label>
								<input
									type="checkbox"
									name="no_user"
									defaultChecked={no_user}
									id="no_user"
									onChange={(e) => {
										set_no_user(e.target.checked);
									}}
								/>
							</li>
						)}
						{user_data &&
						user_data.isAdmin &&
						users &&
						!no_user && (
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
						{user_data &&
						user_data.isAdmin &&
						users &&
						no_user && (
							<div>
								<button
									onClick={create_order_without_user}
									className="button secondary full-width mb-12px"
								>
									Create Order Without User
								</button>
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
			{/* <SuggestedProducts /> */}
			<Carousel />
		</div>
	);
};

export default PlaceOrderPage;
