import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPayOrder, createOrder, createOrderGuest } from '../../actions/orderActions';
import { CheckoutSteps, Stripe } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { addToCart, removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';
import Cookie from 'js-cookie';

import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loading, LoadingPayments } from '../../components/UtilityComponents';
import { validate_promo_code } from '../../utils/validations';
import { Carousel } from '../../components/SpecialtyComponents';
import { listUsers } from '../../actions/userActions';
import { API_External, API_Orders, API_Products, API_Shipping } from '../../utils';
import { cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';

const PlaceOrderPage = (props) => {
	// const promo_code_ref = useRef(null);
	// const order_note_ref = useRef(null);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
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

	const [ shipping_rates, set_shipping_rates ] = useState({});
	const [ current_shipping_speed, set_current_shipping_speed ] = useState('');
	const [ loading_shipping, set_loading_shipping ] = useState(false);
	const [ handling_costs, set_handling_costs ] = useState(5 / 60 * 20);
	const [ packaging_cost, set_packaging_cost ] = useState(0);
	const [ shipment_id, set_shipment_id ] = useState('');
	const [ shipping_rate, set_shipping_rate ] = useState({});
	const [ hide_pay_button, set_hide_pay_button ] = useState(true);
	const [ parcel, set_parcel ] = useState('');

	const [ shippingPrice, setShippingPrice ] = useState(0);
	const [ previousShippingPrice, setPreviousShippingPrice ] = useState(0);
	const [ promo_code, set_promo_code ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ tax_rate, set_tax_rate ] = useState(0);
	const [ taxPrice, setTaxPrice ] = useState(0);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ user, set_user ] = useState(userInfo);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');
	const [ loading_tax_rate, set_loading_tax_rate ] = useState(false);

	const [ no_user, set_no_user ] = useState(false);

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const dispatch = useDispatch();

	const [ order_note, set_order_note ] = useState('');
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const stableDispatch = useCallback(dispatch, []);
	const stable_setItemsPrice = useCallback(setItemsPrice, []);
	const stable_set_payment_loading = useCallback(set_payment_loading, []);
	// const stable_calculate_international = useCallback(calculate_international, []);
	// const stable_calculate_shipping = useCallback(calculate_shipping, []);

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
				set_loading_shipping(true);
				// if (shipping.international) {
				// 	calculate_international();
				// } else {
				// const weight_ounces = cartItems.reduce((a, c) => a + c.weight_ounces, 0);
				const package_volume = cartItems.reduce((a, c) => a + c.package_volume, 0);
				console.log({ package_volume });
				if (!package_volume) {
					set_loading_shipping(false);
					set_hide_pay_button(false);
					setShippingPrice(0);
					set_free_shipping_message('Free');
				} else {
					get_shipping_rates();
				}

				// }

				// get_shipping_rates();
				get_tax_rates();
			}
			return () => {};
		},
		[ shipping ]
	);

	const get_shipping_rates = async () => {
		if (
			cartItems.reduce((a, c) => a + c.package_length, 0) === 0 &&
			cartItems.reduce((a, c) => a + c.package_width, 0) === 0 &&
			cartItems.reduce((a, c) => a + c.package_width, 0) === 0
		) {
			setShippingPrice(0);
			set_free_shipping_message('Free');
		} else {
			const response = await API_Shipping.get_shipping_rates({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				userInfo,
				order_note,
				promo_code: show_message && promo_code
			});
			console.log({ response });
			console.log({ message: response.message });
			const data = response.data;
			console.log({ data });
			if (data) {
				set_shipping_rates(data.shipment);
				set_shipment_id(data.shipment.id);
				set_loading_shipping(false);
				set_parcel(data.parcel._id);
				// set_loading_shipping(false);
			}

			// if (sorted_rates[0]) {
			// 	// setShippingPrice(parseFloat(sorted_rates[0].rate) + packaging_cost + handling_costs);
			// 	setShippingPrice(parseFloat(sorted_rates[0].retail_rate) + packaging_cost);
			// 	// set_shipment_id(data.id);
			// }
		}
	};

	const choose_shipping_rate = (rate, speed) => {
		setShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		setPreviousShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		set_hide_pay_button(false);
		set_shipping_rate(rate);
		set_current_shipping_speed({ rate, speed });
	};

	const re_choose_shipping_rate = () => {
		setShippingPrice(0);
		setPreviousShippingPrice(0);
		set_hide_pay_button(true);
		set_shipping_rate({});
	};

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

	const placeOrderHandler = async (paymentMethod) => {
		// create an order
		console.log({ userInfo });
		console.log({ user });
		dispatch(
			createPayOrder(
				{
					orderItems: cartItems,
					shipping: shipment_id
						? {
								...shipping,
								shipment_id,
								shipping_rate
							}
						: shipping,
					payment,
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
					userInfo,
					order_note,
					promo_code: show_message && promo_code,
					parcel
				},
				paymentMethod
			)
		);

		set_payment_loading(true);
		console.log({ cartItems });
		cartItems.forEach(async (item) => {
			// console.log({ item });
			if (item.finite_stock) {
				// const { data: product } = await API_Products.get_product(item.product);
				// console.log({ product });
				const new_count = item.countInStock - item.qty;
				console.log({ new_count });
				const { data: res } = await API_Products.update_stock(item.product, new_count);
				console.log({ res });
			} else if (item.product_option.finite_stock) {
				const new_count = item.product_option.count_in_stock - item.qty;
				console.log({ new_count });
				const { data: res } = await API_Products.update_product_option_stock(
					item.product,
					item.product_option,
					new_count
				);
				console.log({ res });
			}
		});
		if (promo_code) {
			const { data } = await API_Orders.get_promo(promo_code.toLowerCase());
			console.log({ data });
			if (data.single_use) {
				await API_Orders.promo_code_used(promo_code.toLowerCase());
			}
		}
	};
	// 	const save_shipment_id = (shipment_id) => {
	// 	dispatch(
	// 		saveShipping({
	// 			...shipping,
	// 			shipment_id
	// 		})
	// 	);
	// };

	const create_order_without_paying = async () => {
		// create an order
		console.log({ user });
		dispatch(
			createOrder({
				orderItems: cartItems,
				shipping: {
					...shipping,
					email: user.email,
					shipment_id: shipment_id && shipment_id,
					shipping_rate: shipping_rate && shipping_rate
				},
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				user,
				order_note,
				promo_code,
				parcel
			})
		);

		set_payment_loading(false);
		props.history.push('/secure/glow/orders');
		empty_cart();
		// if (promo_code) {
		// 	await API_Products.promo_code_used(promo_code);
		// }
		cartItems.forEach(async (item) => {
			if (item.finite_stock) {
				const new_count = item.countInStock - item.qty;
				const { data: res } = await API_Products.update_stock(item.product, new_count);
			}
		});
		if (promo_code) {
			const { data } = await API_Orders.get_promo(promo_code.toLowerCase());
			console.log({ data });
			if (data.single_use) {
				await API_Orders.promo_code_used(promo_code.toLowerCase());
			}
		}
	};

	const create_order_without_user = async () => {
		dispatch(
			createOrderGuest({
				orderItems: cartItems,
				shipping: shipment_id
					? {
							...shipping,
							shipment_id,
							shipping_rate
						}
					: shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				order_note,
				promo_code,
				parcel
			})
		);

		props.history.push('/secure/glow/orders');
		empty_cart();
		// if (promo_code) {
		// 	await API_Products.promo_code_used(promo_code);
		// }
		cartItems.forEach(async (item) => {
			if (item.finite_stock) {
				const new_count = item.countInStock - item.qty;
				const { data: res } = await API_Products.update_stock(item.product, new_count);
			}
		});
		if (promo_code) {
			const { data } = await API_Orders.get_promo(promo_code.toLowerCase());
			console.log({ data });
			if (data.single_use) {
				await API_Orders.promo_code_used(promo_code.toLowerCase());
			}
		}
	};

	const empty_cart = () => {
		console.log(cartItems);
		for (let item of cartItems) {
			dispatch(removeFromCart(item));
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
		// console.log({ promo_code: promo_code_ref.current.value });
		console.log({ userInfo });
		const data = { promo_code: promo_code, promos, userInfo, items_price };
		// console.log({ data });
		const request = validate_promo_code(data);

		set_promo_code_validations(request.errors.promo_code);
		console.log(request);
		console.log({ promo_code });

		if (request.isValid) {
			const promo = promos.find((promo) => promo.promo_code === promo_code.toLowerCase());
			console.log({ isValid: promo, promo_code: promo_code });
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
					setPreviousShippingPrice(shippingPrice);
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
				// if (promo_code_ref.current.value === 'freeshipping') {
				// 	setPreviousShippingPrice(shippingPrice);
				// 	setShippingPrice(0);
				// 	set_free_shipping_message('Free');
				// }
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
			// if (shipping.international) {
			// 	calculate_international();
			// } else {
			// 	calculate_shipping();
			// 	calculate_shipping();
			// }
			// set_loading_shipping(true);
			// get_shipping_rates();
			setShippingPrice(previousShippingPrice);
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
									<div>
										{shipping.address_1} {shipping.address_2}
									</div>
									<div>
										{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
									</div>
									<div>{shipping.international && 'International'}</div>
									<div>{shipping.email}</div>
								</div>
							)}
							<div style={{ marginTop: '5px' }}>
								<Link to="/secure/checkout/shipping">
									<button className="btn primary">
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
								<div className="">
									<Link to="/collections/all/products">
										<li style={{ marginBottom: '0', borderBottom: 0 }}>
											<button className="btn secondary w-100per" style={{ marginBottom: 0 }}>
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
													{determine_product_name(item, false)}
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
																	item.color && item.color,
																	item.diffuser_cap && item.diffuser_cap,
																	item.product_option && item.product_option,
																	item.display_image
																)
															)}
													>
														{[ ...Array(item.countInStock).keys() ].map((x, index) => (
															<option key={index} defaultValue={parseInt(x + 1)}>
																{parseInt(x + 1)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</div>
										<div className="">
											<div className="cart-price">{cart_sale_price_switch(item)}</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="btn icon"
													onClick={() => dispatch(removeFromCart(item))}
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
						<li className="pos-rel">
							<div>Shipping</div>
							<Loading loading={loading_shipping} />
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
						{hide_pay_button &&
						shipping_rates.rates && (
							<div>
								{shipping &&
								shipping.international && (
									<div>
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'FirstClassPackageInternationalService' && (
													<div className=" mv-1rem jc-b  ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Standard</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div>1-3+ Weeks</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Standard')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'PriorityMailInternational' && (
													<div className=" mv-1rem jc-b  ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Prority</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div>6-10 Days</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Standard')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'ExpressMailInternational' && (
													<div className=" mv-1rem jc-b  ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Express</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div>3-5 Days</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Standard')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
									</div>
								)}
								{shipping &&
								!shipping.international && (
									<div>
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'First' && (
													<div className=" mv-1rem jc-b  ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Standard</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div>
																{' '}
																{rate.est_delivery_days}{' '}
																{rate.est_delivery_days === 1 ? 'Day' : 'Days'}
															</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Standard')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'Priority' && (
													<div className=" mv-1rem jc-b  ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Priority</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div>
																{' '}
																{rate.est_delivery_days}{' '}
																{rate.est_delivery_days === 1 ? 'Day' : 'Days'}
															</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Priority')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
										{/* {shipping_rates.rates.find((rate, index) => rate.service) === 'First' < shipping_rates.rates.find((rate, index) => rate.service === 'Ground')} */}
										{/* {shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'Ground' && (
													<div className=" mv-1rem jc-b  ai-c">
														<div className="shipping_rates jc-b w-100per wrap ">
															<div className="service">Ground</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div> {rate.est_delivery_days} Days</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Ground')}
														>
															Select
														</button>
													</div>
												)
											);
										})} */}
										{shipping_rates.rates.map((rate, index) => {
											return (
												rate.service === 'Express' && (
													<div className=" mv-1rem jc-b ai-c" key={index}>
														<div className="shipping_rates jc-b w-100per wrap">
															<div className="service">Express</div>
															<div>
																{' '}
																${(parseFloat(rate.retail_rate) +
																	packaging_cost).toFixed(2)}{' '}
															</div>
															<div> 1-2 Days</div>
														</div>
														<button
															className="custom-select-shipping_rates"
															onClick={() => choose_shipping_rate(rate, 'Express')}
														>
															Select
														</button>
													</div>
												)
											);
										})}
									</div>
								)}
							</div>
						)}

						<li>
							{!hide_pay_button &&
							current_shipping_speed && (
								<div className=" mv-1rem jc-b ai-c w-100per">
									<div className="shipping_rates jc-b w-100per ">
										<div>
											{current_shipping_speed.speed} ${(parseFloat(
												current_shipping_speed.rate.retail_rate
											) + packaging_cost).toFixed(2)}{' '}
											{/* {determine_delivery_speed(current_shipping_speed.speed)}{' '} */}
											{current_shipping_speed.rate.est_delivery_days}{' '}
											{current_shipping_speed.rate.est_delivery_days === 1 ? 'Day' : 'Days'}
										</div>
									</div>
									<button
										className="custom-select-shipping_rates w-10rem"
										onClick={() => re_choose_shipping_rate()}
									>
										Change
									</button>
								</div>
							)}
						</li>
						{/* {!loading_tax_rate &&
						!hide_pay_button &&
						shipping &&
						shipping.hasOwnProperty('first_name') && (
							<div>
								<StripeCheckout
									name="Glow LEDs"
									description={`Complete Order`}
									amount={totalPrice.toFixed(2) * 100}
									token={(token) => placeOrderHandler(token)}
									stripeKey={process.env.REACT_APP_STRIPE_KEY}
									onChange={handleChangeFor('cardNumber')}
								>
									<button className="btn primary w-100per mb-12px">Complete Order</button>
								</StripeCheckout>
							</div>
						)} */}
						<div className="mv-10px">
							<label htmlFor="promo_code">Promo Code</label>

							<form onSubmit={(e) => check_code(e)} className="row">
								<input
									type="text"
									// value={promo_code}
									name="promo_code"
									id="promo_code"
									className="w-100per"
									style={{ textTransform: 'uppercase' }}
									// ref={promo_code_ref}
									onChange={(e) => {
										set_promo_code(e.target.value.toUpperCase());
									}}
								/>
								<button
									className="btn primary"
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
								<button className="btn icon" onClick={() => remove_promo()}>
									<i className="fas fa-times mr-5px" />
								</button>
								{show_message}
							</div>
						)}
						<div className="w-100per">
							<div htmlFor="order_note">Add a note</div>
							<input
								type="text"
								name="order_note"
								// value={order_note}
								id="order_note"
								className="w-100per"
								// ref={order_note_ref}
								onChange={(e) => set_order_note(e.target.value)}
							/>
							<h4>{no_note_warning()}</h4>
						</div>
						{!loading_tax_rate &&
						!hide_pay_button &&
						shipping &&
						shipping.hasOwnProperty('first_name') && <Stripe pay_order={placeOrderHandler} />}
						{/* {!loading_tax_rate &&
						!hide_pay_button &&
						shipping &&
						shipping.hasOwnProperty('first_name') && (
							<div>
								<Elements stripe={stripePromise}>
									<Form />
								</Elements>
							</div>
						)} */}
						{userInfo &&
						userInfo.isAdmin && (
							<div>
								{loading_checkboxes ? (
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
								{userInfo &&
								userInfo.isAdmin &&
								users &&
								!no_user && (
									<div>
										<button
											onClick={create_order_without_paying}
											className="btn secondary w-100per mb-12px"
										>
											Create Order Without Paying
										</button>

										<div className="ai-c h-25px mv-10px mb-30px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
													defaultValue={userInfo.first_name}
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
								{userInfo &&
								userInfo.isAdmin &&
								users &&
								no_user && (
									<div>
										<button
											onClick={create_order_without_user}
											className="btn secondary w-100per mb-12px"
										>
											Create Order Without User
										</button>
									</div>
								)}
							</div>
						)}
					</ul>
				</div>
			</div>
			{/* <SuggestedProducts /> */}
			<Carousel />
		</div>
	);
};

export default PlaceOrderPage;
