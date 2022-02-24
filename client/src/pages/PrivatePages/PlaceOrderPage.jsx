import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPayOrder, createOrder, createOrderGuest, createPayOrderGuest } from '../../actions/orderActions';
import { CartItem, CheckoutSteps, Stripe } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { removeFromCart, saveShipping, savePayment } from '../../actions/cartActions';
import { listPromos } from '../../actions/promoActions';
import { Loading, LoadingPayments } from '../../components/UtilityComponents';
import { validate_login, validate_passwords, validate_promo_code, validate_shipping } from '../../utils/validations';
import { Carousel } from '../../components/SpecialtyComponents';
import { listUsers, login, logout, update } from '../../actions/userActions';
import { API_External, API_Products, API_Promos, API_Shipping } from '../../utils';
import { ShippingChoice, ShippingSpeed } from '../../components/SpecialtyComponents/ShippingComponents';
import Autocomplete from 'react-google-autocomplete';
import { determine_total, prnt, state_names } from '../../utils/helper_functions';
import { check_authentication } from '../../utils/react_helper_functions';
import { Shipping } from '../../components/SpecialtyComponents/PlaceOrderPageComponents';

const PlaceOrderPage = (props) => {
	// const promo_code_ref = useRef(null);
	// const order_note_ref = useRef(null);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo, loading: user_loading, success: user_success } = userLogin;
	console.log({ user_loading });
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, error: error_order } = orderCreate;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: error_pay } = orderPay;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;
	const items_price = determine_total(cartItems);

	const [ shipping_rates, set_shipping_rates ] = useState({});
	const [ current_shipping_speed, set_current_shipping_speed ] = useState('');
	const [ handling_costs, set_handling_costs ] = useState(5 / 60 * 20);
	const [ packaging_cost, set_packaging_cost ] = useState(0);
	const [ shipment_id, set_shipment_id ] = useState('');
	const [ shipping_rate, set_shipping_rate ] = useState({});
	const [ hide_pay_button, set_hide_pay_button ] = useState(true);
	const [ parcel, set_parcel ] = useState('');
	const [ paymentMethod, set_paymentMethod ] = useState('stripe');
	const [ create_account, set_create_account ] = useState(false);
	// const [ password, setPassword ] = useState('');
	// const [ rePassword, setRePassword ] = useState('');

	// const [ password_validations, setPasswordValidations ] = useState('');
	// const [ re_password_validations, setRePasswordValidations ] = useState('');
	// const [ passwords_complete, set_passwords_complete ] = useState('');
	// const [ passwords_check, set_passwords_check ] = useState(false);

	const [ show_email, set_show_email ] = useState(true);
	const [ show_shipping, set_show_shipping ] = useState(false);
	const [ show_payment, set_show_payment ] = useState(false);
	const [ show_review, set_show_review ] = useState(false);

	const [ is_guest, set_is_guest ] = useState(true);

	const [ email_completed, set_email_completed ] = useState(false);
	const [ shipping_completed, set_shipping_completed ] = useState(false);
	const [ payment_completed, set_payment_completed ] = useState(false);
	const [ review_completed, set_review_completed ] = useState(false);

	// const [ email, setEmail ] = useState('');
	const [ password, set_password ] = useState('');
	const [ new_password, set_new_password ] = useState('');

	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ loading_login, set_loading_login ] = useState(false);

	const [ shippingPrice, setShippingPrice ] = useState(0);
	const [ previousShippingPrice, setPreviousShippingPrice ] = useState(0);
	const [ promo_code, set_promo_code ] = useState('');
	const [ loading_payment, set_loading_payment ] = useState(false);
	const [ itemsPrice, setItemsPrice ] = useState(items_price);
	const [ tax_rate, set_tax_rate ] = useState(0);
	const [ taxPrice, setTaxPrice ] = useState(0);
	const [ totalPrice, setTotalPrice ] = useState(0);
	const [ show_message, set_show_message ] = useState('');
	const [ user, set_user ] = useState(userInfo);
	const [ free_shipping_message, set_free_shipping_message ] = useState('------');
	const [ loading, set_loading ] = useState(false);
	const [ show_promo_code, set_show_promo_code ] = useState(false);
	const [ show_promo_code_input_box, set_show_promo_code_input_box ] = useState(true);
	const [ tip, set_tip ] = useState(0);
	const [ error, set_error ] = useState();

	const [ no_user, set_no_user ] = useState(false);
	const [ paid, set_paid ] = useState(false);

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const dispatch = useDispatch();

	const [ order_note, set_order_note ] = useState('');
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const stable_setItemsPrice = useCallback(setItemsPrice, []);
	const stable_set_loading_payment = useCallback(set_loading_payment, []);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listPromos({}));
				dispatch(listUsers({}));
			}
			return () => (clean = false);
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(savePayment({ paymentMethod }));
			}
			return () => (clean = false);
		},
		[ paymentMethod ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				const shipping_storage = sessionStorage.getItem('shippingAddress');
				console.log({ shipping_storage });
				if (shipping_storage) {
					dispatch(saveShipping(JSON.parse(shipping_storage)));
				}

				dispatch(savePayment({ paymentMethod }));
				stable_setItemsPrice(determine_total(cartItems));
				// if (!show_message && promo_code) {
				// 	activate_promo_code(promo_code.toLowerCase());
				// }
			}
			return () => (clean = false);
		},
		[ cartItems, dispatch, stable_setItemsPrice ]
	);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (error_order) {
					stable_set_loading_payment(false);
					set_error(error_order);
				}
			}
			return () => (clean = false);
		},
		[ error_order, stable_set_loading_payment ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (shipping && Object.keys(shipping).length > 0) {
					set_loading_shipping(true);
					const package_volume = cartItems.reduce((a, c) => a + c.package_volume, 0);
					console.log({ package_volume });
					if (!package_volume) {
						set_loading(false);
						set_hide_pay_button(false);
						setShippingPrice(0);
						set_free_shipping_message('Free');
					} else {
						if (shipping.hasOwnProperty('first_name')) {
							get_shipping_rates();
						}
					}
					if (shipping.international) {
						setTaxPrice(0);
					} else {
						get_tax_rates();
					}
				}
				// if (!show_message && promo_code) {
				// 	activate_promo_code(promo_code.toLowerCase());
				// }
			}
			return () => (clean = false);
		},
		[ shipping ]
	);

	const [ loading_shipping, set_loading_shipping ] = useState();

	const get_shipping_rates = async () => {
		if (
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
			console.log(get_shipping_rates_res);
			if (get_shipping_rates_res.data.message) {
				set_error(get_shipping_rates_res);
			} else {
				console.log('Shipment Ran');
				set_shipping_rates(get_shipping_rates_res.data.shipment);
				set_shipment_id(get_shipping_rates_res.data.shipment.id);
				set_parcel(get_shipping_rates_res.data.parcel._id);
				// setTimeout(() => {
				set_loading_shipping(false);
				// }, 1000);
			}
		}
	};

	const [ show_shipping_complete, set_show_shipping_complete ] = useState();

	const choose_shipping_rate = (rate, speed) => {
		setShippingPrice(parseFloat(rate.retail_rate || rate.rate) + packaging_cost);
		setPreviousShippingPrice(parseFloat(rate.retail_rate || rate.rate) + packaging_cost);
		set_hide_pay_button(false);
		set_shipping_rate(rate);
		set_current_shipping_speed({ rate, speed });
		get_promo_code();
		set_show_promo_code(true);
		set_show_shipping_complete(true);
		// set_show_payment(true);
	};

	const re_choose_shipping_rate = () => {
		setShippingPrice(0);
		setPreviousShippingPrice(0);
		set_hide_pay_button(true);
		set_shipping_rate({});
		set_show_payment(false);
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
		console.log({ promo_code_storage });
		if (promo_code_storage && promo_code_storage.length > 0) {
			console.log({ promo_code_storage });
			set_promo_code(promo_code_storage.toLowerCase());
			set_show_promo_code(true);
			set_show_message(promo_code_storage);
			set_show_promo_code_input_box(false);
			activate_promo_code(promo_code_storage);
		}
	};

	const placeOrderHandler = async (paymentMethod) => {
		check_authentication();
		if (userInfo && userInfo.first_name) {
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
						tip,
						promo_code: show_message && promo_code,
						parcel: parcel || null
					},
					paymentMethod
				)
			);
		} else {
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
						order_note,
						tip,
						promo_code: show_message && promo_code,
						parcel: parcel || null,
						guest: true
					},
					create_account,
					new_password,
					paymentMethod
				)
			);
		}

		set_loading_payment(true);
		dimminish_stock();
		promo_code_used();
		sessionStorage.removeItem('shippingAddress');
	};

	const dimminish_stock = async () => {
		const request = await API_Products.update_stock(cartItems);
		console.log({ dimminish_stock: request });
	};

	const promo_code_used = async () => {
		if (promo_code) {
			await API_Promos.promo_code_used(promo_code.toLowerCase());
		}
	};
	// const data = new Date()
	const today = new Date();
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
				user: user._id,
				order_note,
				tip,
				promo_code,
				parcel: parcel ? parcel : null,
				isPaid: paid ? paid : false,
				paidAt: paid ? today : null
			})
		);

		set_loading_payment(false);
		// empty_cart();
		dimminish_stock();
		promo_code_used();
		props.history.push('/secure/glow/orders?page=1?limit=10');
		// if (promo_code) {
		// 	await API_Products.promo_code_used(promo_code);
		// }
		// cartItems.forEach(async (item) => {
		// 	if (item.finite_stock) {
		// 		const new_count = item.quantity - item.qty;
		// 		const { data: res } = await API_Products.update_stock(item.product, new_count);
		// 	}
		// });
		// if (promo_code) {
		// 	const { data } = await API_Promos.get_promo(promo_code.toLowerCase());
		// 	console.log({ data });
		// 	if (data.single_use) {
		// 		await API_Promos.promo_code_used(promo_code.toLowerCase());
		// 	}
		// }
		sessionStorage.removeItem('shippingAddress');
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
				tip,
				promo_code,
				parcel
			})
		);

		props.history.push('/secure/glow/orders?page=1?limit=10');
		// empty_cart();
		dimminish_stock();
		promo_code_used();
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
			let clean = true;
			if (clean) {
				if (successPay && order) {
					props.history.push('/pages/complete/order/' + order._id);
					set_loading_payment(false);
					empty_cart();
				} else if (error_pay) {
				}
			}
			return () => (clean = false);
		},
		[ successPay ]
	);
	// useEffect(
	// 	() => {
	// 		let clean = true;
	// 		if (clean) {
	// 			if (successPay && order) {
	// 				// props.history.push('/secure/checkout/paymentcomplete/' + order._id);
	// 				if (userInfo && userInfo.first_name) {
	// 					props.history.push('/secure/checkout/order/receipt/' + order._id + '/order/true');
	// 				} else {
	// 					props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
	// 				}
	// 				set_loading_payment(false);
	// 				empty_cart();
	// 			} else if (error_pay) {
	// 			}
	// 		}
	// 		return () => (clean = false);
	// 	},
	// 	[ successPay ]
	// );

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (error_pay) {
					set_loading_payment(false);
					set_error(error_pay);
				}
			}
			return () => (clean = false);
		},
		[ error_pay ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				console.log({ tip });

				setTotalPrice(
					tip === 0 || tip === '' || isNaN(tip)
						? itemsPrice + shippingPrice + taxPrice
						: itemsPrice + shippingPrice + taxPrice + parseInt(tip)
				);
				// if (!show_message && promo_code) {
				// 	activate_promo_code(promo_code.toLowerCase());
				// }
			}
			return () => (clean = false);
		},
		[ itemsPrice, taxPrice, tip, shippingPrice ]
	);

	const [ promo_code_validations, set_promo_code_validations ] = useState('');

	const check_code = (e) => {
		e.preventDefault();
		console.log({ userInfo });
		console.log({ cartItems });
		const data = { promo_code: promo_code, promos, userInfo, items_price, cartItems };
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
		console.log({ code });
		console.log({ promos });
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

			console.log({ promo_excluded });
			console.log({ promo_included });
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
				if (promo.percentage_off) {
					set_show_message(`${promo.promo_code.toUpperCase()} ${promo.percentage_off}% Off`);
				} else if (promo.amount_off) {
					set_show_message(`${promo.promo_code.toUpperCase()} $${promo.amount_off} Off`);
				} else if (promo.promo_code.toUpperCase() === 'SHIPPING') {
					set_show_message(`${promo.promo_code.toUpperCase()} $${previousShippingPrice.toFixed(2)} Off`);
				}
				// set_show_message(
				// 	`${promo.promo_code.toUpperCase()} ${promo.percentage_off > 0
				// 		? `${promo.percentage_off}% Off`
				// 		: `$${promo.amount_off} Off`}`
				// );
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
			setShippingPrice(previousShippingPrice);
		}
		set_show_promo_code_input_box(true);
	};

	// const check_password = async (e) => {
	// 	e.preventDefault();
	// 	const validation_data = { password, rePassword };
	// 	// console.log({ data });
	// 	const request = await validate_passwords(validation_data);
	// 	console.log({ request });
	// 	setPasswordValidations(request.errors.password);
	// 	setRePasswordValidations(request.errors.rePassword);
	// 	set_passwords_complete('');
	// 	set_passwords_check(false);
	// 	if (request.isValid) {
	// 		set_passwords_complete('Passwords Verified');
	// 		set_passwords_check(true);
	// 	}
	// };

	// const cart = useSelector((state) => state.cart);
	// const { shipping } = cart;
	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;

	// const AddressPredictions = useAddressPredictions('Aus');
	// console.log({ AddressPredictions });

	const [ email, set_email ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ address_1, set_address_1 ] = useState('');
	const [ address_2, set_address_2 ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('');
	const [ postalCode, setPostalCode ] = useState('');
	const [ country, setCountry ] = useState('United States');
	const [ international, setInternational ] = useState(false);
	// const [ loading, set_loading ] = useState(true);
	const [ all_shipping, set_all_shipping ] = useState([]);
	const [ save_shipping, set_save_shipping ] = useState(false);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (shipping && shipping.first_name && shipping.first_name.length > 1) {
					console.log({ ShippingPage: shipping });
					set_email(shipping.email);
					set_first_name(shipping.first_name);
					set_last_name(shipping.last_name);
					set_address_1(shipping.address_1);
					set_address_2(shipping.address_2);
					setCity(shipping.city);
					setState(shipping.state);
					setPostalCode(shipping.postalCode);
					setCountry(shipping.country);
					setInternational(shipping.international);
				}
			}
			return () => (clean = false);
		},
		[ shipping ]
	);

	useEffect(() => {
		let clean = true;
		if (clean) {
			if (userInfo.isAdmin) {
				get_all_shipping();
			}
		}
		return () => (clean = false);
	}, []);

	const get_all_shipping = async () => {
		const { data } = await API_Shipping.get_all_shipping();
		set_all_shipping(data);
		console.log({ data });
	};

	// const [ email_validations, set_email_validations ] = useState('');
	const [ first_name_validations, set_first_name_validations ] = useState('');
	const [ last_name_validations, set_last_name_validations ] = useState('');
	const [ address_validations, set_address_validations ] = useState('');
	const [ city_validations, set_city_validations ] = useState('');
	const [ state_validations, set_state_validations ] = useState('');
	const [ postal_code_validations, set_postal_code_validations ] = useState('');
	const [ country_validations, set_country_validations ] = useState('');
	const [ international_validations, set_international_validations ] = useState('');
	// const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			email: email ? email : userInfo.email,
			first_name,
			last_name,
			address_1,
			address_2,
			city,
			state,
			postalCode,
			country,
			international
		};
		console.log({ data });
		const request = validate_shipping(data);
		// set_email_validations(request.errors.email);
		set_first_name_validations(request.errors.first_name);
		set_last_name_validations(request.errors.last_name);
		set_address_validations(request.errors.address_1);
		set_city_validations(request.errors.city);
		set_state_validations(request.errors.state);
		set_postal_code_validations(request.errors.postalCode);
		set_country_validations(request.errors.country);
		set_international_validations(request.errors.international);

		console.log(request);
		console.log(request.errors.email);
		if (request.isValid) {
			dispatch(
				saveShipping({
					first_name,
					last_name,
					email: email ? email : userInfo.email,
					address_1,
					address_2,
					city,
					state,
					postalCode,
					country: international ? country : 'US',
					international
				})
			);
			const paymentMethod = 'stripe';
			dispatch(savePayment({ paymentMethod }));
			save_shipping_to_user();
			// props.history.push('placeorder');
			set_show_shipping(false);
			set_shipping_completed(true);
		}
	};
	setTimeout(() => {
		set_loading(false);
	}, 500);

	const save_shipping_to_user = () => {
		if (save_shipping) {
			dispatch(
				update({
					...userInfo,
					shipping: {
						first_name,
						last_name,
						email: userInfo.email,
						address_1,
						address_2,
						city,
						state,
						postalCode,
						country: international ? country : 'US',
						international
					}
				})
			);
		}
	};

	const update_shipping = (shipping) => {
		shipping = JSON.parse(shipping);
		console.log({ shipping });
		set_email(shipping.email);
		set_first_name(shipping.first_name);
		set_last_name(shipping.last_name);
		set_address_1(shipping.address_1);
		set_address_2(shipping.address_2);
		setCity(shipping.city);
		setState(shipping.state);
		setPostalCode(shipping.postalCode);
		setCountry(shipping.country);
		setInternational(shipping.international);
	};
	const use_saved_shipping = (e, shipping, user) => {
		e.preventDefault();
		console.log({ shipping });
		set_email(user.email);
		set_first_name(shipping.first_name);
		set_last_name(shipping.last_name);
		set_address_1(shipping.address_1);
		set_address_2(shipping.address_2);
		setCity(shipping.city);
		setState(shipping.state);
		setPostalCode(shipping.postalCode);
		setCountry(shipping.country);
		setInternational(shipping.international);
	};

	// const [ address, setAddress ] = React.useState('');
	// const [ coordinates, setCoordinates ] = React.useState({
	// 	lat: null,
	// 	lng: null
	// });

	// const handleSelect = async (value) => {
	// 	const results = await geocodeByAddress(value);
	// 	const latLng = await getLatLng(results[0]);
	// 	setAddress(value);
	// 	setCoordinates(latLng);
	// };

	// const [ searchValue, setSearchValue ] = useState('');
	// const [ predictions, setPredictions ] = useState([]);

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const results = await googleAutocomplete(searchValue);
	// 	if (results) {
	// 		setPredictions(results);
	// 	}
	// };

	const update_google_shipping = (shipping) => {
		console.log({ shipping });

		const street_number = shipping.address_components.filter((comp) => comp.types.includes('street_number'))[0];
		console.log({ street_number });
		const address = shipping.address_components.filter((comp) => comp.types.includes('route'))[0];
		console.log({ address });
		const address_1 = `${street_number.long_name} ${address.short_name}`;
		const city = shipping.address_components.filter((comp) => comp.types.includes('locality'))[0];
		console.log({ city });
		const state = shipping.address_components.filter((comp) =>
			comp.types.includes('administrative_area_level_1')
		)[0];
		console.log({ state });
		const country = shipping.address_components.filter((comp) => comp.types.includes('country'))[0];
		console.log({ country });
		const postal_code = shipping.address_components.filter((comp) => comp.types.includes('postal_code'))[0];
		console.log({ postal_code });
		set_address_1(address_1);
		setCity(city.long_name);
		setState(state.short_name);
		setPostalCode(postal_code.long_name);
		console.log({ country: country.short_name });
		setCountry(country.short_name);
		if (country.short_name !== 'US') {
			setInternational(true);
			setState(state.short_name);
			setCountry(country.long_name);
		}
	};

	// const [ login, set_login ] = useState(userInfo.hasOwnProperty('first_name') ? true : false);

	console.log({ email_completed });

	const show_hide_steps = (step) => {
		if (step === 'email') {
			set_show_email(true);
			set_show_shipping(false);
			set_show_payment(false);
			set_show_review(false);
			set_shipping_completed(false);
			set_payment_completed(false);
			re_choose_shipping_rate();
		}
		if (step === 'shipping') {
			set_show_shipping(true);
			set_show_email(false);
			set_show_payment(false);
			set_show_review(false);
			// set_shipping_completed(false);
			set_payment_completed(false);
			re_choose_shipping_rate();
		}
		if (step === 'payment') {
			set_show_payment(true);
			set_show_shipping(false);
			set_show_email(false);
			set_show_review(false);
			set_shipping_completed(false);
			set_payment_completed(false);
			re_choose_shipping_rate();
		}
		if (step === 'review') {
			set_show_review(true);
			set_show_payment(false);
			set_show_shipping(false);
			set_show_email(false);
		}
	};

	const next_step = (step) => {
		if (step === 'email') {
			set_show_email(true);
			set_show_shipping(false);
			set_show_payment(false);
			set_show_review(false);
			set_shipping_completed(true);
		}
		if (step === 'shipping') {
			if (email.length > 0) {
				set_show_shipping(true);
				set_show_email(false);
				set_show_payment(false);
				set_show_review(false);
				set_email_completed(true);
				set_shipping_completed(true);
				re_choose_shipping_rate();
				setEmailValidations('');
			} else {
				setEmailValidations('Email Field Empty');
			}
		}
		if (step === 'payment') {
			set_show_payment(true);
			set_show_shipping(false);
			set_show_email(false);
			set_show_review(false);
			set_shipping_completed(true);
			set_show_shipping_complete(false);
			// re_choose_shipping_rate();
		}
		if (step === 'review') {
			set_show_review(true);
			set_show_payment(false);
			set_show_shipping(false);
			set_show_email(false);
			set_payment_completed(true);
		}
	};

	// const userLogin = useSelector((state) => state.userLogin);
	// const { loading: user_loading, userInfo, error } = userLogin;
	// const errors = useSelector((state) => state.errors);
	// console.log({ errors });
	// console.log({ error });
	// const { loading, userInfo, error } = errors;
	// console.log({ userInfo });
	// const dispatch = useDispatch();
	// const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const history = useHistory();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (userInfo && userInfo.hasOwnProperty('first_name')) {
					set_email(userInfo.email);
					// props.history.push(redirect);
				}
			}
			return () => (clean = false);
		},
		[ userInfo ]
	);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (userInfo && userInfo.hasOwnProperty('first_name') && user_success) {
					history.push('/secure/checkout/placeorder');
				}
			}
			return () => (clean = false);
		},
		[ user_success ]
	);

	setTimeout(() => {
		set_loading_login(false);
	}, 3000);

	const submit_login = (e) => {
		e.preventDefault();
		const data = { email, password };
		const request = validate_login(data);

		setEmailValidations(request.errors.email);
		setPasswordValidations(request.errors.password);
		if (request.isValid) {
			dispatch(login({ email: email.toLowerCase(), password }));
			// console.log({ email, password });
			// set_loading_login(user_loading);
			// if (!user_loading) {
			// if (userInfo && userInfo.hasOwnProperty('first_name')) {
			// 	history.push('/secure/checkout/placeorder');
			// }
			// }

			// dispatch(loginUser(email, password));
		}
	};
	const submit_logout = (e) => {
		e.preventDefault();
		dispatch(logout(userInfo.refresh_token));
		history.push('/checkout/placeorder');
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
			<LoadingPayments loading={loading_payment} error={error} set_error={set_error} />
			<Loading loading={user_loading} />
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<div className="jc-b">
							<h2>1. Email</h2>
							{email_completed &&
							!show_email && (
								<button className="btn secondary mv-10px" onClick={() => show_hide_steps('email')}>
									Edit
								</button>
							)}
						</div>
						{show_email ? (
							<div className="w-100per">
								{userInfo && userInfo.hasOwnProperty('first_name') ? (
									<div>
										<ul className="shipping-container mv-0px ph-2rem pv-0px">
											<li>
												<pre className="phrase_font  mv-0px">
													Signed in with {userInfo.email} {'\n'}Not you?
													<button
														className="btn nav title_font m-10px"
														onClick={(e) => submit_logout(e)}
													>
														Logout
													</button>
												</pre>
											</li>
											<li className="mv-0px">
												<button
													className="btn primary w-100per bob"
													onClick={() => next_step('shipping')}
												>
													Continue
												</button>
											</li>
										</ul>
									</div>
								) : is_guest ? (
									<ul className="shipping-container mv-0px ph-2rem pv-0px">
										<li>
											<label htmlFor="email">Email</label>
											<input
												type="text"
												value={email}
												name="email"
												id="email"
												onChange={(e) => set_email(e.target.value)}
											/>
										</li>
										<label className="validation_text" style={{ justifyContent: 'center' }}>
											{email_validations}
										</label>
										<pre className="phrase_font mv-0px mt-10px">
											You'll recieve receipts and notifications at this email address.{'\n'}Already
											have an account?{' '}
											<button
												className="btn nav title_font mb-15px"
												onClick={() => set_is_guest((is_guest) => (is_guest ? false : true))}
											>
												Login
											</button>
										</pre>

										<button className="btn primary bob" onClick={() => next_step('shipping')}>
											Continue
										</button>
									</ul>
								) : (
									<ul className="shipping-container mv-0px ph-2rem pv-0px">
										<li>
											<label htmlFor="email">Email</label>
											<input
												type="text"
												value={email}
												name="email"
												id="email"
												onChange={(e) => set_email(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="password">Password</label>
											<input
												type="password"
												value={password}
												name="password"
												id="password"
												onChange={(e) => set_password(e.target.value)}
											/>
										</li>
										<pre className="phrase_font mv-0px">
											Don't have an account?{' '}
											<button
												className="btn nav title_font mb-15px"
												onClick={() => set_is_guest((is_guest) => (is_guest ? false : true))}
											>
												Continue as Guest
											</button>
										</pre>
										<li>
											<button className="btn primary bob" onClick={(e) => submit_login(e)}>
												{/* <button className="btn primary" onClick={() => next_step('shipping')}> */}
												Continue
											</button>
										</li>
									</ul>
								)}
							</div>
						) : (
							<div className="wrap jc-b w-100per">
								<div className="paragraph_font lh-25px">
									<div>{email}</div>
								</div>
							</div>
						)}
					</div>
					<div>
						<div className="jc-b">
							<h2>2. Shipping</h2>
							{shipping_completed &&
							!show_shipping && (
								<button className="btn secondary mv-10px" onClick={() => show_hide_steps('shipping')}>
									Edit
								</button>
							)}
						</div>
						{shipping_completed && (
							<div>
								{show_shipping ? (
									<form onSubmit={submitHandler}>
										<ul className="shipping-container mv-0px pv-0px ph-2rem">
											{userInfo &&
											userInfo.shipping &&
											userInfo.shipping.hasOwnProperty('first_name') && (
												<li>
													<button
														onClick={(e) =>
															use_saved_shipping(e, userInfo.shipping, userInfo)}
														className="btn primary"
													>
														Use Saved Shipping
													</button>
												</li>
											)}
											{userInfo &&
											userInfo.isAdmin && (
												<li className="w-100per">
													<div className="ai-c h-25px mv-10px mb-30px jc-c w-100per">
														<div className="custom-select w-100per">
															<select
																className="qty_select_dropdown w-100per"
																style={{ width: '100%' }}
																onChange={(e) => update_shipping(e.target.value)}
															>
																<option key={1} defaultValue="">
																	---Choose Shipping for Order---
																</option>
																{all_shipping &&
																	all_shipping.map((shipping, index) => (
																		<option
																			key={index}
																			value={JSON.stringify(shipping)}
																		>
																			{shipping.first_name} {shipping.last_name}
																		</option>
																	))}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</li>
											)}
											{/* {userInfo &&
									!userInfo.first_name && (
										<li>
											<label htmlFor="email">Email</label>
											<input
												type="text"
												value={email}
												name="email"
												id="email"
												onChange={(e) => set_email(e.target.value)}
											/>
										</li>
									)}
									<label className="validation_text" style={{ justifyContent: 'center' }}>
										{email_validations}
									</label> */}
											<li>
												<div className="jc-b">
													<div className="column mr-1rem w-50per">
														<label htmlFor="first_name">First Name</label>
														<input
															type="text"
															value={first_name}
															name="first_name"
															id="first_name"
															onChange={(e) => set_first_name(e.target.value)}
														/>

														<label
															className="validation_text"
															style={{ justifyContent: 'center' }}
														>
															{first_name_validations}
														</label>
													</div>
													<div className="column  w-50per">
														<label htmlFor="last_name">Last Name</label>
														<input
															type="text"
															value={last_name}
															name="last_name"
															id="last_name"
															onChange={(e) => set_last_name(e.target.value)}
														/>
														<label
															className="validation_text"
															style={{ justifyContent: 'center' }}
														>
															{last_name_validations}
														</label>
													</div>
												</div>
											</li>

											<li>
												<label htmlFor="address_autocomplete">Address</label>
												<Autocomplete
													apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
													className="fs-16px"
													// placeholder="Start typing Address"
													value={address_1}
													onChange={(e) => set_address_1(e.target.value)}
													options={{
														types: [ 'address' ]
													}}
													onPlaceSelected={(place) => {
														update_google_shipping(place);
													}}
												/>
											</li>
											{/* <li>
							<label htmlFor="address_1">Address</label>
							<input
								type="text"
								value={address_1}
								name="address_1"
								id="address_1"
								onChange={(e) => set_address_1(e.target.value)}
							/>
						</li> */}
											<label className="validation_text" style={{ justifyContent: 'center' }}>
												{address_validations}
											</label>
											<li>
												<label htmlFor="address_2">Apt/Suite</label>
												<input
													type="text"
													value={address_2}
													name="address_2"
													id="address_2"
													onChange={(e) => set_address_2(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="city">City</label>
												<input
													type="text"
													value={city}
													name="city"
													id="city"
													onChange={(e) => setCity(e.target.value)}
												/>
											</li>
											<label className="validation_text" style={{ justifyContent: 'center' }}>
												{city_validations}
											</label>
											{!international && (
												<li>
													<label className="mb-1rem" htmlFor="state">
														State
													</label>
													<div className="ai-c h-25px mb-15px jc-c">
														<div className="custom-select w-100per">
															<select
																className="qty_select_dropdown w-100per"
																onChange={(e) => setState(e.target.value)}
																value={state && state}
															>
																{state_names.map((state, index) => (
																	<option key={index} value={state.short_name}>
																		{state.long_name}
																	</option>
																))}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</li>
											)}
											{international && (
												<li>
													<label htmlFor="state">State</label>
													<input
														type="text"
														value={state}
														name="state"
														id="state"
														onChange={(e) => setState(e.target.value)}
													/>
												</li>
											)}
											<label className="validation_text" style={{ justifyContent: 'center' }}>
												{state_validations}
											</label>
											<li>
												<label htmlFor="postalCode">Postal Code</label>
												<input
													type="text"
													value={postalCode}
													name="postalCode"
													id="postalCode"
													onChange={(e) => setPostalCode(e.target.value)}
												/>
											</li>
											<label className="validation_text" style={{ justifyContent: 'center' }}>
												{postal_code_validations}
											</label>
											{loading ? (
												<div>Loading...</div>
											) : (
												<div>
													<li>
														<div>
															<input
																type="checkbox"
																name="international"
																// defaultChecked={international ? 'checked' : 'unchecked'}
																defaultValue={international}
																defaultChecked={international}
																value={international}
																id="international"
																style={{
																	transform: 'scale(1.5)'
																}}
																className="mr-1rem"
																onChange={(e) => {
																	setInternational(e.target.checked);
																}}
															/>
															<label htmlFor="international">International</label>
														</div>
													</li>
													{international && (
														<li>
															<label htmlFor="country">Country</label>
															<input
																type="text"
																value={country}
																name="country"
																id="country"
																onChange={(e) => setCountry(e.target.value)}
															/>
														</li>
													)}
												</div>
											)}
											<label className="validation_text" style={{ justifyContent: 'center' }}>
												{country_validations}
											</label>
											<li>
												<button
													type="submit"
													className="btn primary bob"
													// onClick={() => next_step('payment')}
												>
													Continue
												</button>
											</li>

											{userInfo &&
											userInfo.first_name && (
												<div>
													{loading ? (
														<div>Loading...</div>
													) : (
														<div className="mv-2rem">
															<input
																type="checkbox"
																name="save_shipping"
																defaultChecked={save_shipping}
																style={{
																	transform: 'scale(1.5)'
																}}
																className="mr-1rem"
																id="save_shipping"
																onChange={(e) => {
																	set_save_shipping(e.target.checked);
																}}
															/>
															<label htmlFor="save_shipping mb-20px">Save Shipping</label>
														</div>
													)}
												</div>
											)}
										</ul>
									</form>
								) : (
									<div className="wrap jc-b w-100per pos-rel">
										{shipping &&
										shipping.hasOwnProperty('first_name') && (
											<div className="paragraph_font lh-25px mb-10px">
												<div>
													{shipping.first_name} {shipping.last_name}
												</div>
												<div>
													{shipping.address_1} {shipping.address_2}
												</div>
												<div>
													{shipping.city}, {shipping.state} {shipping.postalCode},{' '}
													{shipping.country}
												</div>
												<div>{shipping.international && 'International'}</div>
											</div>
										)}

										{/* <div className="pos-abs "> */}
										<Loading loading={loading_shipping} />
										{/* </div> */}

										<ShippingChoice
											rates={shipping_rates.rates}
											choose_shipping_rate={choose_shipping_rate}
											hide_pay_button={hide_pay_button}
											shipping={shipping}
											current_shipping_speed={current_shipping_speed}
											re_choose_shipping_rate={re_choose_shipping_rate}
										/>
										{show_shipping_complete && (
											<button
												type="submit"
												className="btn primary w-100per bob mt-1rem"
												onClick={() => next_step('payment')}
											>
												Continue
											</button>
										)}
									</div>
								)}
							</div>
						)}
					</div>

					<div>
						<ul className="mv-0px">
							<div className="jc-b">
								<h2>3. Payment & Review</h2>
								{payment_completed &&
								!show_payment && (
									<button
										className="btn secondary mv-10px"
										onClick={() => show_hide_steps('payment')}
									>
										Edit
									</button>
								)}
							</div>
							{show_payment && (
								<div>
									<div className="w-100per ">
										<div htmlFor="order_note">Add a note</div>
										<input
											type="text"
											name="order_note"
											id="order_note"
											className="w-100per"
											onChange={(e) => set_order_note(e.target.value)}
										/>
									</div>
									{show_promo_code && (
										<div>
											{show_promo_code_input_box && (
												<div className="mv-10px">
													<label htmlFor="promo_code">Promo Code</label>
													<form onSubmit={(e) => check_code(e)} className="row">
														<input
															type="text"
															name="promo_code"
															id="promo_code"
															className="w-100per"
															style={{ textTransform: 'uppercase' }}
															onChange={(e) => {
																set_promo_code(e.target.value.toUpperCase());
															}}
														/>
														<button className="btn primary" style={{ curser: 'pointer' }}>
															Apply
														</button>
													</form>
												</div>
											)}
											<label className="validation_text" style={{ textAlign: 'center' }}>
												{promo_code_validations}
											</label>
											{show_message && (
												<div className="promo_code mv-1rem">
													<button
														className="btn icon"
														onClick={() => remove_promo()}
														aria-label="Detete"
													>
														<i className="fas fa-times mr-5px" />
													</button>
													{show_message}
												</div>
											)}
										</div>
									)}
									<li>
										<div className="w-100per mb-1rem">
											<div htmlFor="tip" className="fs-16px">
												Leave a Tip 💙
											</div>
											<input
												type="number"
												min="0.01"
												step="1"
												name="tip"
												id="tip"
												placeholder="$0.00"
												defaultValue={`$${tip && parseFloat(tip).toFixed(2)}`}
												className="w-100per"
												onChange={(e) => set_tip(parseFloat(e.target.value))}
											/>
										</div>
									</li>
									<li>
										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<div className="mv-2rem">
												<input
													type="checkbox"
													name="create_account"
													defaultChecked={create_account}
													style={{
														transform: 'scale(1.5)'
													}}
													className="mr-1rem"
													id="create_account"
													onChange={(e) => {
														set_create_account(e.target.checked);
													}}
												/>
												<label htmlFor="create_account mb-20px">
													Create an account for faster checkout
												</label>
											</div>
										)}
									</li>
									{userInfo &&
									!userInfo.first_name &&
									create_account && (
										<li className="column mb-2rem">
											<label htmlFor="password">Password</label>
											<input
												// className="form_input"
												type="password"
												id="password"
												name="password"
												onChange={(e) => set_new_password(e.target.value)}
											/>
											<label className="validation_text fs-16px jc-c ">
												{password_validations}
											</label>
										</li>
									)}
									<li>
										{!loading &&
										!hide_pay_button && (
											<Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />
										)}
										{/* {!hide_pay_button &&
										shipping &&
										shipping.hasOwnProperty('first_name') &&
										create_account &&
										passwords_check && (
											<Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />
										)} */}
									</li>
									{userInfo &&
									userInfo.isAdmin && (
										<div>
											{userInfo &&
											userInfo.isAdmin &&
											users &&
											!no_user && (
												<div>
													{loading_checkboxes ? (
														<div>Loading...</div>
													) : (
														<li>
															<label htmlFor="paid mb-20px ">Already Paid?</label>
															<input
																type="checkbox"
																name="paid"
																id="paid"
																onChange={(e) => {
																	set_paid(e.target.checked);
																}}
															/>
														</li>
													)}
													{paid && (
														<div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
															<div className="custom-select w-100per">
																<select
																	className="qty_select_dropdown w-100per"
																	onChange={(e) => set_paymentMethod(e.target.value)}
																>
																	<option key={1} defaultValue="">
																		Payment Method
																	</option>
																	{[
																		'stripe',
																		'venmo',
																		'cashapp',
																		'paypal',
																		'cash',
																		'zelle',
																		'facebook',
																		'no payment'
																	].map((method, index) => (
																		<option key={index} value={method}>
																			{method}
																		</option>
																	))}
																</select>
																<span className="custom-arrow" />
															</div>
														</div>
													)}
													<div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
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
													<button
														onClick={create_order_without_paying}
														className="btn secondary w-100per mb-12px"
													>
														Create Order For User
													</button>
												</div>
											)}
											{userInfo &&
											userInfo.isAdmin &&
											users &&
											no_user && (
												<button
													onClick={create_order_without_user}
													className="btn secondary w-100per mb-12px"
												>
													Create Order Without User
												</button>
											)}
										</div>
									)}
									{/* <li>
										<button className="btn primary w-100per" onClick={() => next_step('review')}>
											Continue
										</button>
									</li> */}
								</div>
							)}
						</ul>
					</div>
				</div>

				<div className="placeorder-action">
					<ul>
						<li>
							<h2 style={{ marginTop: '0px' }}>Order Summary</h2>
						</li>
						<li>
							<ul className="cart-list-container w-100per">
								<li>
									{/* <h2>Shopping Cart</h2> */}
									<div className="">
										{/* <Link to="/collections/all/products">
											<li style={{ marginBottom: '0', borderBottom: 0 }}>
												<button className="btn secondary w-100per" style={{ marginBottom: 0 }}>
													Continue Shopping
												</button>
											</li>
										</Link> */}
										<label style={{ textAlign: 'right' }}>Price</label>
									</div>
								</li>
								{cartItems.length === 0 ? (
									<div>Cart is empty</div>
								) : (
									cartItems.map((item, index) => (
										<CartItem item={item} index={index} show_qty={true} />
									))
								)}
							</ul>
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
					</ul>
				</div>
			</div>
			{/* <SuggestedProducts /> */}
			<Carousel
				product_pathname={props.match.params.pathname}
				category={'accessories'}
				title="Accessories You May Need"
				add_to_cart={true}
			/>
			<Carousel title="Suggested Products" random={true} add_to_cart={true} />
		</div>
	);
};

export default PlaceOrderPage;
