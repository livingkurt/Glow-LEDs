import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPayOrderGuest } from '../../actions/orderActions';
import { CartItem, GuestCheckoutSteps, Stripe } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';

import { Loading, LoadingPayments } from '../../components/UtilityComponents';
import { validate_promo_code, validate_passwords } from '../../utils/validations';
import { Carousel } from '../../components/SpecialtyComponents';
import { API_External, API_Products, API_Promos, API_Shipping } from '../../utils';
import { ShippingChoice } from '../../components/SpecialtyComponents/ShippingComponents';
import { determine_total, prnt, state_names } from '../../utils/helper_functions';

const PlaceOrderPublicPage = (props) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error: error_order } = orderCreate;
	// console.log({ orderCreate });

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: error_pay } = orderPay;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;
	// console.log({ orderPay });
	const items_price = determine_total(cartItems);

	const [ shipping_rates, set_shipping_rates ] = useState({});
	const [ current_shipping_speed, set_current_shipping_speed ] = useState('');
	const [ loading, set_loading ] = useState(false);
	const [ handling_costs, set_handling_costs ] = useState(5 / 60 * 20);
	const [ packaging_cost, set_packaging_cost ] = useState(0.5);
	const [ shipment_id, set_shipment_id ] = useState('');
	const [ shipping_rate, set_shipping_rate ] = useState({});
	const [ hide_pay_button, set_hide_pay_button ] = useState(true);
	const [ parcel, set_parcel ] = useState('');

	const [ shippingPrice, setShippingPrice ] = useState(0);
	const [ previousShippingPrice, setPreviousShippingPrice ] = useState(0);
	const [ promo_code, set_promo_code ] = useState('');
	const [ loading_payment, set_loading_payment ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ taxPrice, setTaxPrice ] = useState(0.0875 * items_price);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ tax_rate, set_tax_rate ] = useState(0);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ user, set_user ] = useState(userInfo);
	// const [ create_account, set_create_account ] = useState();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ create_account, set_create_account ] = useState(false);
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');
	const [ passwords_complete, set_passwords_complete ] = useState('');
	const [ passwords_check, set_passwords_check ] = useState(false);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');
	const [ show_promo_code, set_show_promo_code ] = useState(false);
	const [ show_promo_code_input_box, set_show_promo_code_input_box ] = useState(true);
	const [ tip, set_tip ] = useState(0);
	const [ error, set_error ] = useState();

	useEffect(() => {
		dispatch(listPromos());
		// dispatch(listUsers(''));
		// set_loading(false);
		return () => {};
	}, []);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	useEffect(
		() => {
			const shipping_storage = sessionStorage.getItem('shippingAddress');
			// console.log({ shipping_storage });
			if (shipping_storage) {
				dispatch(saveShipping(JSON.parse(shipping_storage)));
			}
			dispatch(savePayment({ paymentMethod: 'stripe' }));
			setItemsPrice(determine_total(cartItems));

			return () => {};
		},
		[ cartItems, dispatch, setItemsPrice ]
	);

	useEffect(
		() => {
			if (error_order) {
				set_loading_payment(false);
				set_error(error_order);
			}
			return () => {};
		},
		[ error_order, set_loading_payment ]
	);
	useEffect(
		() => {
			if (shipping && Object.keys(shipping).length > 0) {
				set_loading(true);
				const package_volume = cartItems.reduce((a, c) => a + c.package_volume, 0);
				if (!package_volume) {
					set_loading(false);
					set_hide_pay_button(false);
					setShippingPrice(0);
					set_free_shipping_message('Free');
				} else {
					get_shipping_rates();
				}
				get_tax_rates();
			}
			return () => {};
		},
		[ shipping ]
	);

	const get_shipping_rates = async () => {
		if (
			shipping &&
			cartItems.reduce((a, c) => a + c.package_length, 0) === 0 &&
			cartItems.reduce((a, c) => a + c.package_width, 0) === 0 &&
			cartItems.reduce((a, c) => a + c.package_width, 0) === 0
		) {
			setShippingPrice(0);
			set_free_shipping_message('Free');
		} else {
			const get_shipping_rates_res = await API_Shipping.get_shipping_rates({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				userInfo,
				tip,
				order_note,
				promo_code: show_message && promo_code
			});
			// console.log(get_shipping_rates_res);
			if (get_shipping_rates_res.data.message) {
				set_error(get_shipping_rates_res);
			} else {
				// console.log('Shipment Ran');
				set_shipping_rates(get_shipping_rates_res.data.shipment);
				set_shipment_id(get_shipping_rates_res.data.shipment.id);
				set_loading(false);
				set_parcel(get_shipping_rates_res.data.parcel._id);
			}
		}
	};
	const choose_shipping_rate = (rate, speed) => {
		setShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		setPreviousShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		set_hide_pay_button(false);
		set_shipping_rate(rate);
		set_current_shipping_speed({ rate, speed });
		get_promo_code();
		set_show_promo_code(true);
	};

	const re_choose_shipping_rate = () => {
		setShippingPrice(0);
		setPreviousShippingPrice(0);
		set_hide_pay_button(true);
		set_shipping_rate({});
	};
	const get_tax_rates = async () => {
		setTaxPrice(0);
		set_loading(true);
		const { data } = await API_External.get_tax_rates();
		const result = state_names.find((obj) => {
			return obj.short_name === shipping.state || obj.long_name === shipping.state;
		});
		const tax_rate = parseFloat(data[result.long_name || shipping.state]) / 100;
		if (!isNaN(tax_rate)) {
			set_tax_rate(tax_rate);
			if (shipping.international) {
				setTaxPrice(0);
				return;
			}
			setTaxPrice(tax_rate * itemsPrice);
		}
		set_loading(false);
	};

	const get_promo_code = () => {
		const promo_code_storage = sessionStorage.getItem('promo_code');
		if (promo_code_storage && promo_code_storage.length > 0) {
			// console.log({ promo_code_storage });
			set_promo_code(promo_code_storage.toLowerCase());
			activate_promo_code(promo_code_storage);
		}
	};

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

	const placeOrderHandler = async (paymentMethod) => {
		// console.log({ create_account });
		// set_create_account(create_account);
		dispatch(
			createPayOrderGuest(
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
					tip,
					promo_code: show_message && promo_code,
					parcel
				},
				create_account,
				password,
				paymentMethod
			)
		);

		set_loading_payment(true);
		console.log({ cartItems });
		cartItems.forEach(async (item) => {
			// console.log({ item });
			if (item.finite_stock) {
				// const { data: product } = await API_Products.get_product(item.product);
				// console.log({ product });
				const new_count = item.countInStock - item.qty;
				// console.log({ new_count });
				const { data: res } = await API_Products.update_stock(item.product, new_count);
			}
			//  else if (item.product_option.finite_stock) {
			// 	const new_count = item.product_option.count_in_stock - item.qty;
			// 	// console.log({ new_count });
			// 	const { data: res } = await API_Products.update_product_option_stock(
			// 		item.product,
			// 		item.product_option,
			// 		new_count
			// 	);
			// 	// console.log({ res });
			// }
		});
		if (promo_code) {
			// const { data } = await API_Promos.get_promo(promo_code.toLowerCase());
			// const promo_codes = data.promos.map((promo) => promo.promo_code.toLowerCase());
			// console.log({ promo_codes });
			const data = promos.find((promo) => promo.promo_code === promo_code.toLowerCase());
			// console.log({ data });
			// console.log({ single_use: data.single_use });
			if (data.single_use) {
				await API_Promos.promo_code_used(promo_code.toLowerCase());
			}
		}
		sessionStorage.removeItem('shippingAddress');
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
				if (create_account) {
					// console.log('account');
					// props.history.push('/checkout/paymentacccountcomplete/' + order._id);
					props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
				} else {
					// console.log('order');
					// props.history.push('/checkout/paymentcomplete/' + order._id);
					props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
				}
				set_loading_payment(false);
				empty_cart();
			} else if (error_pay) {
			}
		},
		[ successPay ]
	);
	useEffect(
		() => {
			if (error_pay) {
				set_loading_payment(false);
				set_error(error_pay);
			}
		},
		[ error_pay ]
	);

	const checkoutHandler = () => {
		props.history.push('/account/login?redirect=shipping');
	};

	useEffect(
		() => {
			// console.log({ tip });

			setTotalPrice(
				tip === 0 || tip === '' || isNaN(tip)
					? itemsPrice + shippingPrice + taxPrice
					: itemsPrice + shippingPrice + taxPrice + parseInt(tip)
			);
		},
		[ itemsPrice, taxPrice, tip, shippingPrice ]
	);

	const [ promo_code_validations, set_promo_code_validations ] = useState('');

	const check_code = (e) => {
		e.preventDefault();
		// console.log({ promo_code, });
		console.log({ userInfo });
		const data = { promo_code: promo_code, promos, userInfo, items_price };
		// console.log({ data });
		const request = validate_promo_code(data);

		set_promo_code_validations(request.errors.promo_code);
		console.log(request);
		console.log({ promo_code });

		if (request.isValid) {
			activate_promo_code(promo_code.toLowerCase());
		} else {
			set_promo_code('');
		}
	};

	const activate_promo_code = (code) => {
		const promo = promos.find((promo) => promo.promo_code === code.toLowerCase());
		console.log({ isValid: promo, promo_code: code.toLowerCase() });
		let promo_excluded = 0;
		let promo_included = 0;
		if (promo) {
			if (promo.exclude) {
				const category_cart_items = cartItems
					.filter((item) => promo.excluded_categories.includes(item.category))
					.reduce((a, item) => a + item.price, 0);
				const product_cart_items = cartItems
					.filter((item) => promo.excluded_products.includes(item.pathname))
					.reduce((a, item) => a + item.price, 0);
				promo_excluded = category_cart_items + product_cart_items;
			}
			// if (promo.include) {
			// 	const category_cart_items = cartItems.filter((item) =>
			// 		promo.included_categories.includes(item.category)
			// 	);
			// 	console.log({ category_cart_items });
			// 	const product_cart_items = cartItems.filter((item) => promo.included_products.includes(item.pathname));
			// 	console.log({ product_cart_items });
			// 	// promo_included = category_cart_items + product_cart_items;
			// }

			// console.log({ promo_excluded });
			// console.log({ promo_included });
			if (show_message) {
				set_promo_code_validations('Can only use one promo code at a time');
			} else {
				if (promo.percentage_off) {
					if (items_price === promo_excluded) {
						set_promo_code_validations('All Items Excluded from Promo');
						return;
					}
					setItemsPrice(items_price - (items_price - promo_excluded) * (promo.percentage_off / 100));
					setTaxPrice(
						tax_rate * (items_price - (items_price - promo_excluded) * (promo.percentage_off / 100))
					);
				} else if (promo.amount_off) {
					setItemsPrice(items_price - promo.amount_off);
					setTaxPrice(tax_rate * (items_price - promo.amount_off));
					// setItemsPrice(items_price - (items_price - promo_excluded) - promo.amount_off);
					// setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) - promo.amount_off));
				}
				if (promo.free_shipping) {
					setPreviousShippingPrice(shippingPrice);
					setShippingPrice(0);
					set_free_shipping_message('Free');
				}
				set_show_message(
					`${promo.promo_code} ${promo.percentage_off
						? `${promo.percentage_off}% Off`
						: `$${promo.amount_off} Off`}`
				);
			}
		}
		set_show_promo_code_input_box(false);
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
			// set_loading(true);
			// get_shipping_rates();
			setShippingPrice(previousShippingPrice);
		}
		set_show_promo_code_input_box(true);
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
			<LoadingPayments
				loading={loading_payment}
				error={error}
				set_error={set_error}
				set_loading_payment={set_loading_payment}
			/>
			<div className="placeorder">
				<div className="placeorder-info">
					<div className="placeorder-info-container">
						<h2>Shipping</h2>

						<div className="wrap jc-b">
							{shipping &&
							shipping.hasOwnProperty('first_name') && (
								<div className="paragraph_font lh-25px">
									<div>
										{shipping.first_name} {shipping.last_name}
									</div>
									<div>
										{shipping.address_1} {shipping.address_2}
									</div>
									{!shipping.international ? (
										<div>
											{shipping.city}, {shipping.state} {shipping.postalCode}, {shipping.country}
										</div>
									) : (
										<div>
											<div>
												{shipping.city}, {shipping.state} {shipping.postalCode}
											</div>
											<div>{shipping.country}</div>
										</div>
									)}
									<div>{shipping.international && 'International'}</div>
									<div>{shipping.email}</div>
								</div>
							)}
							<div style={{ marginTop: '5px' }}>
								<Link to="/checkout/shipping">
									<button
										className={`btn primary ${shipping && !shipping.hasOwnProperty('first_name')
											? 'bob'
											: ''}`}
									>
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
					<div className="placeorder-info-container">
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
									<CartItem item={item} index={index} key={index} show_qty={true} />
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
								{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
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
							<Loading loading={loading} />
							<div>
								{shipping && shipping.hasOwnProperty('first_name') && shippingPrice > 0 ? (
									'$' + shippingPrice.toFixed(2)
								) : (
									free_shipping_message
								)}
							</div>
						</li>
						{tip > 0 && (
							<li className="pos-rel">
								<div>Tip</div>
								<div>${tip.toFixed(2)}</div>
							</li>
						)}
						<li>
							<div>Order Total</div>
							<div>
								{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
									'$' + totalPrice.toFixed(2)
								) : (
									'------'
								) : (
									'------'
								)}
							</div>
						</li>
						<ShippingChoice
							rates={shipping_rates.rates}
							choose_shipping_rate={choose_shipping_rate}
							hide_pay_button={hide_pay_button}
							shipping={shipping}
							current_shipping_speed={current_shipping_speed}
							re_choose_shipping_rate={re_choose_shipping_rate}
						/>
						{loading_checkboxes ? (
							<div>Loading...</div>
						) : (
							<li>
								<label htmlFor="create_account mb-20px">Create Account</label>
								<input
									type="checkbox"
									name="create_account"
									defaultChecked={create_account}
									id="create_account"
									onChange={(e) => {
										set_create_account(e.target.checked);
									}}
								/>
							</li>
						)}
						{create_account && (
							<li className="">
								<label htmlFor="password">Password</label>
								<input
									// className="form_input"
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label className="validation_text fs-16px jc-c ">{password_validations}</label>
							</li>
						)}
						{create_account && (
							<li className="">
								<label htmlFor="rePassword">Re-Enter Password</label>
								<input
									// className="form_input"
									type="password"
									id="rePassword"
									name="rePassword"
									onChange={(e) => setRePassword(e.target.value)}
								/>
								<label className="validation_text fs-16px jc-c ">{re_password_validations}</label>
							</li>
						)}
						{create_account && (
							<li className="">
								<label className="fs-16px jc-c ta-c mb-12px" style={{ color: '#3dff3d' }}>
									{passwords_complete}
								</label>
								<button className="btn primary" onClick={(e) => check_password(e)}>
									Check Password
								</button>
							</li>
						)}
						{show_promo_code && (
							<div>
								{show_promo_code_input_box && (
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
								)}
								<label className="validation_text" style={{ textAlign: 'center' }}>
									{promo_code_validations}
								</label>
								{show_message && (
									<div className="promo_code mv-2rem">
										<button className="btn icon" onClick={() => remove_promo()}>
											<i className="fas fa-times mr-5px" />
										</button>
										{show_message}
									</div>
								)}
							</div>
						)}
						<div className="w-100per mb-1rem">
							<div htmlFor="order_note">Add a note</div>
							<input
								type="text"
								name="order_note"
								// value={order_note}
								id="order_note"
								className="w-100per"
								onChange={(e) => set_order_note(e.target.value)}
							/>
						</div>
						<li>
							<div className="w-100per ">
								<label htmlFor="tip" className="fs-16px">
									Leave a Tip 💙
								</label>
								<input
									type="number"
									min="0.01"
									step="1"
									name="tip"
									id="tip"
									placeholder="$0.00"
									// onFocus={(this.placeholder = '')}
									onFocus={() => this.placeholder('')}
									onBlur={() => this.placeholder('$0.00')}
									defaultValue={`$${tip && parseInt(tip).toFixed(2)}`}
									// defaultValue={tip}
									className="w-100per"
									onChange={(e) => set_tip(parseInt(e.target.value))}
								/>
							</div>
						</li>
						{!loading &&
						!hide_pay_button &&
						shipping &&
						shipping.hasOwnProperty('first_name') &&
						!create_account && <Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />}

						{!hide_pay_button &&
						shipping &&
						shipping.hasOwnProperty('first_name') &&
						create_account &&
						passwords_check && <Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />}
					</ul>
				</div>
			</div>
			<Carousel
				product_pathname={props.match.params.pathname}
				category={'accessories'}
				title="Accessories You May Need"
				add_to_cart={true}
			/>
			<Carousel title="Suggested Products" add_to_cart={true} random={true} />
		</div>
	);
};

export default PlaceOrderPublicPage;
