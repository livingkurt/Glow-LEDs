import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { CheckoutSteps, Stripe } from '../../components/SpecialtyComponents';

import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet';
import { Loading, LoadingPayments } from '../../components/UtilityComponents';
import { deleteOrder, listOrders, update_order, update_payment, refundOrder } from '../../actions/orderActions';
import { API_Orders, API_Products, API_Shipping } from '../../utils';
import useClipboard from 'react-hook-clipboard';
import { cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';
import useWindowDimensions from '../../components/SpecialtyComponents/ScreenSize';

require('dotenv').config();

const OrderPage = (props) => {
	const { height, width } = useWindowDimensions();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	const [ loading_label, set_loading_label ] = useState(false);
	const [ product, set_product ] = useState('');
	const [ secondary_product, set_secondary_product ] = useState('');
	const [ product_object, set_product_object ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);
	const [ payment_method, set_payment_method ] = useState('');

	const [ order_state, set_order_state ] = useState({});
	const [ clipboard, copyToClipboard ] = useClipboard();

	const [ refund_state, set_refund_state ] = useState({});
	const [ refund_amount, set_refund_amount ] = useState();
	const [ refund_reason, set_refund_reason ] = useState('');
	const [ all_orders, set_all_orders ] = useState('');

	const orderRefund = useSelector((state) => state.orderRefund);
	const { order: refund } = orderRefund;

	const orderList = useSelector((state) => state.orderList);
	const { orders } = orderList;

	const update_refund_state = (amount) => {
		dispatch(refundOrder(order, true, amount, refund_reason));
		set_refund_state(true);
	};

	useEffect(
		() => {
			if (refund) {
				set_refund_state(refund.isRefunded);
				dispatch(detailsOrder(props.match.params.id));
			}
		},
		[ refund ]
	);

	useEffect(
		() => {
			dispatch(detailsOrder(props.match.params.id));
		},
		[ props.match.params.id ]
	);

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
			}
		},
		[ order ]
	);

	useEffect(
		() => {
			if (product_object) {
				set_product(product_object._id);
			}
			return () => {};
		},
		[ product_object ]
	);
	useEffect(() => {
		get_total_orders();
		return () => {};
	}, []);

	// const save_secondary_product = async () => {
	// 	const request = await API_Products.save_secondary_product(order, userInfo, secondary_product);
	// 	console.log(request);
	// 	dispatch(detailsOrder(props.match.params.id));
	// };

	useEffect(
		() => {
			if (successPay) {
				dispatch(detailsOrder(props.match.params.id));
			} else {
				dispatch(detailsOrder(props.match.params.id));
			}
			set_payment_loading(false);
			get_total_orders();
		},
		[ successPay ]
	);

	const get_total_orders = async () => {
		set_loading_label(true);
		const { data } = await API_Orders.total_orders();
		set_all_orders(data);
		set_loading_label(false);
	};

	// useEffect(() => {
	// 	empty_cart();
	// }, []);

	const empty_cart = () => {
		for (let item of cartItems) {
			dispatch(removeFromCart(item));
		}
	};

	const pay_order = (paymentMethod) => {
		set_payment_loading(true);
		dispatch(payOrder(order, paymentMethod));
	};

	useEffect(
		() => {
			if (successPay && order) {
				// history.push('/secure/checkout/paymentcomplete/' + order._id);
				history.push('/secure/checkout/order/receipt/' + order._id + '/order/true');
				set_payment_loading(false);
				empty_cart();
			} else if (errorPay) {
				console.log({ errorPay });
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

	// const handleChangeFor = (type) => ({ error }) => {
	// 	/* handle error */
	// 	console.log({ type });
	// 	console.log({ error });
	// };

	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' },
		{ name: 'Refunded', color: '#a9a9a9' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isPaid) {
			result = colors[0].color;
		}
		if (order.isPaid) {
			result = colors[1].color;
		}
		if (order.isManufactured) {
			result = colors[2].color;
		}
		if (order.isPackaged) {
			result = colors[3].color;
		}
		if (order.isShipped) {
			result = colors[4].color;
		}
		if (order.isDelivered) {
			result = colors[5].color;
		}
		if (order.isRefunded) {
			result = colors[6].color;
		}
		return result;
	};

	const history = useHistory();

	const [ show_color, set_show_color ] = useState(false);

	const update_order_state = (order, state, is_action, action_at) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_order(order, false, is_action, action_at));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_order(order, true, is_action, action_at));
			history.push(`/secure/glow/emails/order_status/${order._id}/${is_action.substring(2)}/true`);
		}
		dispatch(detailsOrder(props.match.params.id));
	};
	const update_order_payment_state = (order, state, is_action) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_payment(order, false, payment_method));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_payment(order, true, payment_method));
			history.push(`/secure/glow/emails/order/${order._id}/order/false`);
		}
		dispatch(detailsOrder(props.match.params.id));
	};

	const create_label = async () => {
		set_loading_label(true);
		const { data } = await API_Shipping.create_label(order, order.shipping.shipping_rate);
		show_label(data.postage_label.label_url);
		console.log({ data });
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Shipping.add_tracking_number(order, data.tracking_code, data);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
		history.push('/secure/glow/emails/invoice/' + order._id);
	};

	const create_return_label = async () => {
		set_loading_label(true);
		const { data } = await API_Shipping.create_return_label(order, order.shipping.shipping_rate);
		show_label(data.postage_label.label_url);
		console.log({ data });
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Shipping.add_return_tracking_number(order, data.tracking_code, data);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
		history.push('/secure/glow/emails/invoice/' + order._id);
	};

	const buy_label = async () => {
		set_loading_label(true);
		const { data } = await API_Shipping.buy_label(order, order.shipping.shipping_rate);
		show_label(data.postage_label.label_url);
		if (data) {
			set_loading_label(false);
		}
		console.log({ tracking_code: data.tracking_code });
		const request = await API_Shipping.add_tracking_number(order, data.tracking_code, data);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
		history.push('/secure/glow/emails/invoice/' + order._id);
	};

	const view_label = async () => {
		show_label(order.shipping.shipping_label.postage_label.label_url);
	};

	const view_return_label = async () => {
		window.open(order.shipping.return_shipping_label.postage_label.label_url, '_blank', 'width=600,height=400');
	};

	const show_label = (label) => {
		const WinPrint = window.open('', 'PRINT', 'height=600,width=800');
		WinPrint.document.write(
			`<div style="width: 100%;
      display: flex;
      height: 100%;
      align-items: center;;">
          <img style="margin: auto; text-align: center;" src="${label}" alt="label" />
      </div>`
		);
		WinPrint.document.close();
		WinPrint.focus();
		WinPrint.print();

		setTimeout(() => {
			WinPrint.print();
		}, 500);
	};

	const create_duplicate_order = () => {
		console.log({ order: order });
		dispatch(
			createOrder({
				orderItems: order.orderItems,
				shipping: order.shipping,
				itemsPrice: order.itemsPrice,
				shippingPrice: 0,
				taxPrice: 0,
				totalPrice: 0,
				user: order.user._id,
				order_note: `Replacement Order for ${order.shipping.first_name} ${order.shipping
					.last_name} - Original Order Number is ${order._id}`
			})
		);
		dispatch(listOrders());
	};

	const move_left = (e) => {
		e.preventDefault();
		// const current_product = all_orders.find(item => item._id ===  product._id)
		console.log(order._id);
		if (all_orders) {
			let current_order_index = all_orders.map((item) => item._id).indexOf(order._id);
			let left_order_index = current_order_index + 1;
			if (left_order_index >= all_orders.length) {
				left_order_index = 0;
			}
			console.log({ current_order_index, left_order_index, new_order: all_orders[left_order_index] });
			// stableDispatch(detailsProduct(all_orders[current_order_index - 1]._id));
			history.push('/secure/account/order/' + all_orders[left_order_index]._id);
		}
	};
	const move_right = (e) => {
		e.preventDefault();
		console.log({ all_orders });
		if (all_orders) {
			let current_order_index = all_orders.map((item) => item._id).indexOf(order._id);
			let right_order_index = current_order_index - 1;
			if (right_order_index === -1) {
				right_order_index = all_orders.length - 1;
			}
			console.log({ current_order_index, right_order_index, new_order: all_orders[right_order_index] });
			// stableDispatch(detailsProduct(all_orders[current_order_index + 1]._id));
			history.push('/secure/account/order/' + all_orders[right_order_index]._id);
		}
	};

	return (
		<Loading loading={loading} error={error}>
			{order && (
				<div>
					<Helmet>
						<title>Your Order | Glow LEDs</title>
						<meta property="og:title" content="Your Order" />
						<meta name="twitter:title" content="Your Order" />
						<link
							rel="canonical"
							href={'https://www.glow-leds.com/secure/account/order/' + props.match.params.id}
						/>
						<meta
							property="og:url"
							content={'https://www.glow-leds.com/secure/account/order/' + props.match.params.id}
						/>
					</Helmet>
					{order.isPaid ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />}
					<div className="mb-10px ml-20px">
						{userInfo &&
						userInfo.isAdmin && (
							<Link to="/secure/glow/orders">
								<button className="btn secondary">Back to Admin Orders</button>
							</Link>
						)}

						<Link to="/secure/account/orders">
							<button className="btn secondary">Back to Orders</button>
						</Link>
					</div>
					<div className="row">
						<div className="ai-c">
							<button
								style={{ borderRadius: '50%' }}
								className="btn icon h-59px"
								onClick={(e) => move_left(e)}
							>
								<i className="fas fa-arrow-circle-left fs-40px" />
							</button>
						</div>
						<h2
							style={{
								textAlign: 'center',
								width: '100%',
								marginRight: 'auto',
								justifyContent: 'center'
							}}
							className="ta-c "
						>
							<Link to={'/collections/all/products/' + product.pathname}>
								{loading ? 'Product' : product.name}
							</Link>
						</h2>
						<div className="ai-c">
							<button
								style={{ borderRadius: '50%' }}
								className="btn icon h-59px"
								onClick={(e) => move_right(e)}
							>
								<i className="fas fa-arrow-circle-right fs-40px" />
							</button>
						</div>
					</div>
					<Loading loading={loading_label} />
					<LoadingPayments loading={payment_loading} error={errorPay} />
					<div className="placeorder br-20px" style={{}}>
						<div className="placeorder-info">
							<div style={{ backgroundColor: width > 407 && determine_color(order) }}>
								{order.isRefunded && (
									<h1>
										Refunded: {
											order.payment.refund_reason[order.payment.refund_reason.length - 1]
										}{' '}
										on {format_date(order.refundedAt)}
									</h1>
								)}
								<div className="w-100per">
									<label>Order #: {order._id}</label>
									{order.tracking_number && (
										<label>
											USPS Tracking #:{' '}
											<a
												href={
													'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
													order.tracking_number
												}
												target="_blank"
												rel="noopener noreferrer"
												className="mv-2rem"
												style={{
													textDecoration: 'underline',
													color: 'white'
												}}
											>
												{order.tracking_number}
											</a>
										</label>
									)}
									{userInfo &&
									userInfo.isAdmin &&
									order.return_tracking_number && (
										<label>
											USPS Return Tracking #:{' '}
											<a
												href={
													'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=' +
													order.return_tracking_number
												}
												target="_blank"
												rel="noopener noreferrer"
												className="mv-2rem"
												style={{
													textDecoration: 'underline',
													color: 'white'
												}}
											>
												{order.return_tracking_number}
											</a>
										</label>
									)}
								</div>
								<div className="wrap jc-b">
									<div className="w-100per ">
										<h2>Shipping</h2>
										<div className="paragraph_font lh-25px">
											<div>
												{order.shipping.first_name} {order.shipping.last_name}
											</div>
											<div>
												{order.shipping.address_1} {order.shipping.address_2}
											</div>
											<div>
												{order.shipping.city}, {order.shipping.state}{' '}
												{order.shipping.postalCode}
											</div>
											<div>{order.shipping.country}</div>
											<div>{order.shipping.international && 'International'}</div>
											<div>{order.shipping.email}</div>
										</div>
									</div>
									{userInfo &&
									userInfo.isAdmin && (
										<button
											className="btn secondary w-200px mv-10px"
											onClick={() =>
												copyToClipboard(`
${order.shipping.first_name} ${order.shipping.last_name}
${order.shipping.address_1} ${order.shipping.address_2}
${order.shipping.city}, ${order.shipping.state}
${order.shipping.postalCode} ${order.shipping.country}
${order.shipping.email}`)}
										>
											Copy to clipboard
										</button>
									)}
								</div>
							</div>

							<div style={{ backgroundColor: width > 407 && determine_color(order) }}>
								<h2>Payment</h2>
								<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
									<p style={{ marginBottom: '0px' }}>
										{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}
									</p>
								</div>
								{userInfo &&
								userInfo.isAdmin && (
									<div className="">
										<div className="pt-1rem" htmlFor="order_note">
											Payment Method: {order.payment.paymentMethod}
										</div>
									</div>
								)}
							</div>
							<div style={{ backgroundColor: width > 407 && determine_color(order) }}>
								<ul className="cart-list-container mt-0px">
									<li>
										<h2>Shopping Cart</h2>
										<div>Price</div>
									</li>
									{console.log({ orderItems: order.orderItems })}
									{order.orderItems.length === 0 ? (
										<div>Cart is empty</div>
									) : (
										order.orderItems.map((item, index) => (
											<li key={index}>
												{console.log({ item })}
												<div className="cart-image">
													<Link to={'/collections/all/products/' + item.pathname}>
														<img
															src={item.display_image}
															alt={item.name}
															title="Product Image"
														/>
													</Link>
												</div>
												<div className="cart-name">
													<div>
														{console.log({ color: item.color })}
														<Link to={'/collections/all/products/' + item.pathname}>
															{determine_product_name(item, false)}
														</Link>
													</div>
													<div>Qty: {item.qty}</div>
												</div>
												<div className="cart-price">{cart_sale_price_switch(item)}</div>
											</li>
										))
									)}
								</ul>
							</div>
						</div>
						<div
							className="placeorder-action"
							style={{ backgroundColor: width > 407 && determine_color(order) }}
						>
							<ul>
								<li>
									<h2 style={{ marginTop: 0 }}>Order Summary</h2>
								</li>
								{!order.promo_code && (
									<li>
										<div>Subtotal</div>
										<div>${order.itemsPrice && order.itemsPrice.toFixed(2)}</div>
									</li>
								)}

								{order.promo_code && (
									<li>
										<del style={{ color: 'red' }}>
											<div style={{ color: 'white' }}>Subtotal</div>
										</del>
										<div>
											<del style={{ color: 'red' }}>
												<label style={{ color: 'white' }}>
													${order.orderItems &&
														order.orderItems
															.reduce((a, c) => a + c.price * c.qty, 0)
															.toFixed(2)}
												</label>
											</del>
										</div>
									</li>
								)}
								{order.promo_code && (
									<li>
										<div>Discount</div>
										<div>
											-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) -
												order.itemsPrice).toFixed(2)}
										</div>
									</li>
								)}
								{order.promo_code && (
									<li>
										<div>New Subtotal</div>
										<div>${order.itemsPrice.toFixed(2)}</div>
									</li>
								)}
								<li>
									<div>Tax</div>
									<div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
								</li>
								<li>
									<div>Shipping</div>
									<div>
										${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}
									</div>
								</li>

								{!order.isRefunded && (
									<li>
										<div>Order Total</div>
										<div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
									</li>
								)}
								{order.isRefunded && (
									<li>
										<div>Order Total</div>
										<del style={{ color: 'red' }}>
											<label style={{ color: 'white' }}>
												<div>
													${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}
												</div>
											</label>
										</del>
									</li>
								)}
								{order.isRefunded && (
									<li>
										<div>Refund Amount</div>
										<div>
											${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
										</div>
									</li>
								)}
								{order.isRefunded && (
									<li>
										<div>New Order Total</div>
										<div>
											${(order.totalPrice -
												order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(
												2
											)}
										</div>
									</li>
								)}

								<li
									className="placeorder-actions-payment"
									style={{ display: 'flex', justifyContent: 'center' }}
								/>
								{/* {!order.isPaid && (
									<div>
										<StripeCheckout
											name="Glow LEDs"
											description={`Complete Order`}
											amount={
												(order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice) *
												100
											}
											token={(token) => pay_order(token)}
											stripeKey={process.env.REACT_APP_STRIPE_KEY}
											onChange={handleChangeFor('cardNumber')}
										>
											<button
												className="btn primary w-100per"
												style={{ marginBottom: '12px' }}
											>
												Complete Order
											</button>
										</StripeCheckout>
									</div>
								)} */}

								{!order.isPaid && <Stripe pay_order={pay_order} />}

								{order.promo_code && (
									<div className="">
										<div
											style={{ borderTop: '.1rem white solid' }}
											className="pt-1rem"
											htmlFor="promo_code"
										>
											Promo Code: {order.promo_code}
										</div>
									</div>
								)}
								{order.order_note && (
									<div className="">
										<div
											style={{ borderTop: '.1rem white solid' }}
											className="pt-1rem"
											htmlFor="order_note"
										>
											Order Note: {order.order_note}
										</div>
									</div>
								)}
							</ul>
							<div className="column jc-b h-22rem w-25remm mb-1rem">
								<h2>Order Status</h2>
								<div>
									<div className="row ai-c">
										<div className="mv-5px">
											{order.isPaid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</div>
										<div className="mh-10px">Paid</div>

										<div>{!order.paidAt ? '' : format_date(order.paidAt)}</div>
									</div>
								</div>
								<div>
									<div className="row ai-c">
										<div className="mv-5px">
											{order.isManufactured ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</div>
										<div className="mh-10px">Manufactured</div>

										<div>{!order.manufacturedAt ? '' : format_date(order.manufacturedAt)}</div>
									</div>
								</div>
								<div>
									<div className="row ai-c">
										<div className="mv-5px">
											{order.isPackaged ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</div>
										<div className="mh-10px">Packaged</div>

										<div>{!order.packagedAt ? '' : format_date(order.packagedAt)}</div>
									</div>
								</div>
								<div>
									<div className="row ai-c">
										<div className="mv-5px">
											{order.isShipped ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</div>
										<div className="mh-10px">Shipped</div>

										<div>{!order.shippedAt ? '' : format_date(order.shippedAt)}</div>
									</div>
								</div>
								<div>
									<div className="row ai-c">
										<div className="mv-5px row">
											{order.isDelivered ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</div>
										<div className="mh-10px">Delivered</div>

										<div>{!order.deliveredAt ? '' : format_date(order.deliveredAt)}</div>
									</div>
								</div>
							</div>

							<button className="btn secondary w-100per mv-5px ">
								<Link to={'/secure/glow/emails/invoice/' + order._id}>View Invoice</Link>
							</button>
							{userInfo &&
							userInfo.isAdmin && (
								<div>
									<div className="jc-b">
										<div className="column jc-b w-100per">
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_payment_state(
															order,
															order.isPaid,
															'isPaid',
															'paidAt'
														)}
												>
													{order.isPaid ? 'Unset to Paid' : 'Set to Paid'}
												</button>
												<Link to={`/secure/glow/emails/order/${order._id}/order/false`}>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isReassured,
															'isReassured',
															'reassuredAt'
														)}
												>
													{order.isReassured ? 'Unset to Reassured' : 'Set to Reassured'}
												</button>
												<Link
													to={`/secure/glow/emails/order_status/${order._id}/reassured/false`}
												>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isManufactured,
															'isManufactured',
															'manufacturedAt'
														)}
												>
													{order.isManufactured ? (
														'Unset to Manufactured'
													) : (
														'Set to Manufactured'
													)}
												</button>
												<Link
													to={`/secure/glow/emails/order_status/${order._id}/manufactured/false`}
												>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isPackaged,
															'isPackaged',
															'packagedAt'
														)}
												>
													{order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
												</button>
												<Link
													to={`/secure/glow/emails/order_status/${order._id}/packaged/false`}
												>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isShipped,
															'isShipped',
															'shippedAt'
														)}
												>
													{order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
												</button>
												<Link
													to={`/secure/glow/emails/order_status/${order._id}/shipped/false`}
												>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isDelivered,
															'isDelivered',
															'deliveredAt'
														)}
												>
													{order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
												</button>
												<Link
													to={`/secure/glow/emails/order_status/${order._id}/delivered/false`}
												>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>
											<div className="row ai-c">
												<button
													className="btn primary mv-5px w-100per"
													onClick={() =>
														update_order_state(
															order,
															order.isRefunded,
															'isRefunded',
															'refundedAt'
														)}
												>
													{order.isRefunded ? 'Unset to Refunded' : 'Set to Refunded'}
												</button>
												<Link to={`/secure/glow/emails/order/${order._id}/refunded/false`}>
													<button className="btn secondary">
														<i class="fas fa-paper-plane" />
													</button>
												</Link>
											</div>

											<button className="btn secondary mv-5px" onClick={() => create_label()}>
												{!order.shipping.shipping_label ? 'Create Label' : 'Create New Label'}
											</button>
											{/* {order.shipping.shipping_label && (
												<button className="btn secondary mv-5px" onClick={() => create_label()}>
													Create New Label
												</button>
											)} */}
											{!order.shipping.shipping_label && (
												<button className="btn secondary mv-5px" onClick={() => buy_label()}>
													Buy Label
												</button>
											)}
											{order.shipping.shipping_label && (
												<button className="btn secondary mv-5px" onClick={() => view_label()}>
													View Label
												</button>
											)}
											{!order.shipping.return_shipping_label && (
												<button
													className="btn secondary mv-5px"
													onClick={() => create_return_label()}
												>
													Create Return Label
												</button>
											)}
											{order.shipping.return_shipping_label && (
												<button
													className="btn secondary mv-5px"
													onClick={() => view_return_label()}
												>
													View Return Label
												</button>
											)}
											<button
												className="btn secondary mv-5px"
												onClick={() => create_duplicate_order(order._id)}
											>
												Create Duplicate Order
											</button>
											<button className="btn secondary mv-5px">
												<Link to={'/secure/glow/editorder/' + order._id}>Edit Order</Link>
											</button>
											<button
												className="btn secondary mv-5px"
												onClick={() => dispatch(deleteOrder(order._id))}
											>
												Delete Order
											</button>

											{/* <button
										className="btn primary mv-5px "
										onClick={() =>
											update_order_state(
												order,
												order.isManufactured,
												'isManufactured',
												'manufacturedAt'
											)}
									>
										{order.isManufactured ? 'Unset to Manufactured' : 'Set to Manufactured'}
									</button>
									<button
										className="btn primary mv-5px "
										onClick={() =>
											update_order_state(order, order.isPackaged, 'isPackaged', 'packagedAt')}
									>
										{order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
									</button>
									<button
										className="btn primary mv-5px "
										onClick={() =>
											update_order_state(order, order.isShipped, 'isShipped', 'shippedAt')}
									>
										{order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
									</button>
									<button
										className="btn primary mv-5px "
										onClick={() =>
											update_order_state(order, order.isDelivered, 'isDelivered', 'deliveredAt')}
									>
										{order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
									</button>
									<button className="btn primary">
										<Link to={'/secure/glow/editorder/' + order._id}>Edit Order</Link>
									</button> */}
										</div>
									</div>
									<div className="mv-10px">
										<label htmlFor="refund_amount">Refund Amount</label>
										<div className="row">
											<input
												type="text"
												value={refund_amount}
												name="refund_amount"
												id="refund_amount"
												className="w-100per"
												onChange={(e) => set_refund_amount(e.target.value)}
											/>
										</div>
										<div className="mv-10px">
											<label htmlFor="refund_reason">Refund Reason</label>
											<div className="row">
												<input
													type="text"
													value={refund_reason}
													name="refund_reason"
													id="refund_reason"
													className="w-100per"
													onChange={(e) => set_refund_reason(e.target.value)}
												/>
											</div>
										</div>
										<div className="">
											<button
												className="btn primary mv-5px w-100per"
												onClick={() => update_refund_state(refund_amount)}
											>
												Refund Partial Amount
											</button>
											<button
												className="btn primary mv-5px w-100per"
												onClick={() => update_refund_state(order.totalPrice)}
											>
												Refund Full Amount
											</button>

											<button className="btn secondary mv-5px w-100per">
												<Link to={'/secure/glow/emails/order/' + order._id + '/order/false'}>
													View Email
												</Link>
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</Loading>
	);
};

export default OrderPage;
