import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, refundOrder, update_order } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import StripeCheckout from 'react-stripe-checkout';
import { Helmet } from 'react-helmet';
import API from '../../utils/API';
import { Loading, LoadingPayments } from '../../components/UtilityComponents';

require('dotenv').config();

const OrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;
	console.log({ order: order });

	const orderRefund = useSelector((state) => state.orderRefund);
	const { order: refund } = orderRefund;

	const [ refund_state, set_refund_state ] = useState({});
	const [ refund_amount, set_refund_amount ] = useState(0);
	const [ refund_reason, set_refund_reason ] = useState('');
	const [ product, set_product ] = useState('');
	const [ secondary_product, set_secondary_product ] = useState('');
	const [ product_object, set_product_object ] = useState('');
	const [ shipping_state, set_shipping_state ] = useState({});
	const [ packaged_state, set_packaged_state ] = useState({});
	const [ manufactured_state, set_manufactured_state ] = useState({});
	const [ delivery_state, set_delivery_state ] = useState({});
	const [ payment_loading, set_payment_loading ] = useState(false);

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
				console.log({ order });
				set_shipping_state(order.isRefunded);
				set_shipping_state(order.isShipped);
				set_manufactured_state(order.isManufactured);
				set_packaged_state(order.isPackaged);
				set_delivery_state(order.isDelivered);
				set_product_object(order.product);
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
	// useEffect(
	// 	() => {
	// 		dispatch(detailsOrder(props.match.params.id));
	// 		return () => {};
	// 	},
	// 	[ product ]
	// );

	useEffect(
		() => {
			if (refund) {
				set_refund_state(refund.isRefunded);
				dispatch(detailsOrder(props.match.params.id));
				set_order_state(refund);
			}
		},
		[ refund ]
	);

	const send_not_paid_email = async () => {
		const request = await API.not_paid_email(order, user_data);
		console.log(request);
	};
	const save_product = async () => {
		const request = await API.save_product(order, user_data, product);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
	};
	const save_secondary_product = async () => {
		const request = await API.save_secondary_product(order, user_data, secondary_product);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
	};

	const update_refund_state = () => {
		// if (order_state.isRefunded) {
		// 	set_refund_state(false);
		// 	dispatch(refundOrder(order, false));
		// } else {
		set_refund_state(true);
		dispatch(refundOrder(order, true, refund_amount, refund_reason));
		// }
	};

	useEffect(
		() => {
			if (successPay) {
				// set_paypal_state('none');
				// console.log('successPay');
				dispatch(detailsOrder(props.match.params.id));
			} else {
				dispatch(detailsOrder(props.match.params.id));
			}
			set_payment_loading(false);
		},
		[ successPay ]
	);

	// useEffect(
	// 	() => {
	// 		if (successPay && order) {
	// 			props.history.push('/secure/checkout/paymentcomplete/' + order._id);
	// 			set_payment_loading(false);
	// 		} else if (errorPay) {
	// 		}
	// 	},
	// 	[ successPay ]
	// );
	// useEffect(
	// 	() => {
	// 		if (successPay && order) {
	// 			props.history.push('/secure/checkout/paymentcomplete/' + order._id);
	// 			set_payment_loading(false);
	// 		}
	// 	},
	// 	[ errorPay ]
	// );

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
			}
		},
		[ order ]
	);

	useEffect(() => {
		empty_cart();
	}, []);

	const empty_cart = () => {
		// console.log(cartItems);
		for (let item of cartItems) {
			dispatch(removeFromCart(item.pathname));
		}
	};

	const pay_order = (token) => {
		// create an order
		console.log({ cartItems });
		dispatch(payOrder(order, token));
		// empty_cart();
		set_payment_loading(true);
	};

	useEffect(
		() => {
			if (successPay && order) {
				props.history.push('/secure/checkout/paymentcomplete/' + order._id);
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

	const handleChangeFor = (type) => ({ error }) => {
		/* handle error */
		console.log({ type });
		console.log({ error });
	};

	return loading ? (
		<FlexContainer h_center column>
			<h2 style={{ textAlign: 'center' }}>Loading...</h2>
			<h3 style={{ textAlign: 'center' }}>If payment element doesn't show in 5 seconds, refresh the page.</h3>
		</FlexContainer>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Helmet>
				<title>Your Order | Glow LEDs</title>
				<meta property="og:title" content="Your Order | Glow LEDs" />
				<meta name="twitter:title" content="Your Order | Glow LEDs" />
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

			{props.userInfo &&
			props.userInfo.isAdmin && (
				<FlexContainer styles={{ marginBottom: 10, marginLeft: '20px' }}>
					<button class="button secondary" onClick={() => props.history.goBack()}>
						Back to Orders
					</button>
				</FlexContainer>
			)}
			<LoadingPayments loading={payment_loading} error={errorPay} />
			{/* <div>
				{payment_loading ? (
					<div className="jc-c column">
						<img src={process.env.PUBLIC_URL + '/loading.gif'} className="loading_gif" alt="loading" />
						<img
							src={process.env.PUBLIC_URL + '/loading_overlay.png'}
							className="loading_png"
							alt="loading"
						/>
						<div className="payment_message">
							<h2 className="ta-c">Wait a moment while we process your Payment</h2>
							<p className="ta-c">Please Do not Refresh Page</p>
						</div>
					</div>
				) : errorPay ? (
					<div className="error_message jc-c column">
						<h2 className="ta-c mv-5px">Error: {errorPay}</h2>
						<p className="ta-c mv-5px fs">
							Please Try a Different Card if Error Persists and Contact Glow LEDs for Support
						</p>
					</div>
				) : (
					''
				)}
			</div> */}
			{/* {payment_loading && (
				<div className="payment_message">
					<p>Wait a moment while we process your Payment</p>
					<p>Please Do not Refresh Page</p>
				</div>
			)} */}
			{/* {errorPay && (
				<div className="payment_error_message">
					<p>Your Payment has Failed</p>
					<p>Please Check your card number or Contact Support for assistance</p>
				</div>
			)} */}
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						{order.isRefunded && (
							<h1>
								Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{' '}
								{format_date(order.refundedAt)}
							</h1>
						)}
						<FlexContainer h_between wrap>
							<FlexContainer column styles={{ width: '100%' }}>
								<h1>Shipping</h1>
								<div>
									<div>
										{order.shipping.first_name} {order.shipping.last_name}
									</div>
									<div>{order.shipping.address}</div>
									<div>
										{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}{' '}
										{order.shipping.country}
									</div>
									<div>{order.shipping.international && 'International'}</div>
									<div>{order.shipping.email}</div>
									<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
										<p style={{ marginBottom: '0px' }}>
											{shipping_state ? 'Shipped' : 'Not Shipped'}
										</p>
									</div>
								</div>
							</FlexContainer>
						</FlexContainer>
					</div>

					<div>
						<h1>Payment</h1>
						{/* <div>Payment Method: {order.payment.paymentMethod}</div> */}
						<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
							<p style={{ marginBottom: '0px' }}>
								{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}
							</p>
						</div>
						{/* <div>{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}</div> */}
					</div>
					<div>
						<ul style={{ marginTop: 0 }} className="cart-list-container">
							<li>
								<h1>Shopping Cart</h1>
								<div>Price</div>
							</li>
							{console.log({ orderItems: order.orderItems })}
							{order.orderItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								order.orderItems.map((item) => (
									<li key={item._id}>
										{console.log({ item })}
										<div className="cart-image">
											<Link to={'/collections/all/products/' + item.pathname}>
												<img src={item.product.images[0]} alt="product" />
											</Link>
										</div>
										<div className="cart-name">
											<div>
												{console.log({ diffuser_cap_color: item.diffuser_cap_color })}
												<Link to={'/collections/all/products/' + item.pathname}>
													{(item.category === 'diffuser_caps' ||
														item.category === 'mini_diffuser_caps') &&
														item.diffuser_cap_color}{' '}
													{item.name}{' '}
													{item.secondary_product && `w (${item.secondary_product.name})`}
												</Link>
											</div>
											<div>Qty: {item.qty}</div>
											{props.userInfo &&
											props.userInfo.isAdmin &&
											item.secondary_product && (
												<div className="row">
													<div className="mv-10px ">
														<label htmlFor="secondary_product">Secondary Product</label>
														<div className="row">
															<input
																type="text"
																value={item.secondary_product._id}
																name="secondary_product"
																id="secondary_product"
																className="w-100per"
																onChange={(e) => set_secondary_product(e.target.value)}
															/>
															<button
																className="button primary"
																onClick={save_secondary_product}
															>
																Add
															</button>
														</div>
													</div>
												</div>
											)}
										</div>
										<div className="cart-price">
											{item.sale_price !== 0 ? (
												<div style={{ width: '230px' }}>
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															${item.price ? item.price : item.price}
														</label>
													</del>{' '}
													<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
													On Sale!
												</div>
											) : (
												<label>${item.price ? item.price.toFixed(2) : item.price}</label>
											)}
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
							<h1 style={{ marginTop: 0 }}>Order Summary</h1>
						</li>
						<li>
							<div>Items</div>
							{/* <div>${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}</div> */}
							{order.promo_code ? (
								<div>
									<del style={{ color: 'red' }}>
										<label style={{ color: 'white' }}>
											${order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
										</label>
									</del>{' '}
									<i class="fas fa-arrow-right" /> ${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}
								</div>
							) : (
								<div>${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}</div>
							)}
						</li>
						<li>
							<div>Shipping</div>
							{/* <div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div> */}
							<div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
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
										<div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
									</label>
								</del>
							</li>
						)}
						{order.isRefunded && (
							<li>
								<div>Refund Amount</div>
								<div>${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
							</li>
						)}
						{order.isRefunded && (
							<li>
								<div>New Order Total</div>
								<div>
									${(order.totalPrice -
										order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
								</div>
							</li>
						)}

						<li
							className="placeorder-actions-payment"
							style={{ display: 'flex', justifyContent: 'center' }}
						/>
						{!order.isPaid && (
							<div>
								<StripeCheckout
									name="Glow LEDs"
									description={`Pay for Order`}
									amount={(order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice) * 100}
									token={(token) => pay_order(token)}
									stripeKey={process.env.REACT_APP_STRIPE_KEY}
									onChange={handleChangeFor('cardNumber')}
								>
									<button className="button primary full-width" style={{ marginBottom: '12px' }}>
										Pay for Order
									</button>
								</StripeCheckout>
							</div>
						)}

						{order.promo_code && (
							<FlexContainer column>
								<div
									style={{ borderTop: '.1rem white solid' }}
									className="pt-1rem"
									htmlFor="promo_code"
								>
									Promo Code: {order.promo_code}
								</div>
							</FlexContainer>
						)}
						{order.order_note && (
							<FlexContainer column>
								<div
									style={{ borderTop: '.1rem white solid' }}
									className="pt-1rem"
									htmlFor="order_note"
								>
									Order Note: {order.order_note}
								</div>
							</FlexContainer>
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
					{/* <FlexContainer row v_i_center h_between>
						{console.log({ order_product: order.product })}
						{props.userInfo &&
						props.userInfo.isAdmin && (
							<div className="row">
								<div className="mv-10px ">
									<label htmlFor="product">Product</label>
									<div className="row">
										<input
											type="text"
											value={product}
											name="product"
											id="product"
											className="w-100per"
											onChange={(e) => set_product(e.target.value)}
										/>
										<button className="button primary" onClick={save_product}>
											Add
										</button>
									</div>
								</div>
							</div>
						)}
					</FlexContainer> */}
					<div className="ship_deliver  wrap w-100per column ">
						<FlexContainer row v_i_center h_between>
							{/* {console.log({ shipping_state })} */}
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<div>
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
										<button className="button primary" onClick={update_refund_state}>
											Refund Customer
										</button>
									</div>
								</div>
							)}
						</FlexContainer>
						<FlexContainer row v_i_center h_between>
							{/* {console.log({ delivery_state })} */}
							{/* {props.userInfo &&
							props.userInfo.isAdmin && (
								<FlexContainer h_right>
									<button className="button primary" onClick={send_not_paid_email}>
										Still Not Paid
									</button>
								</FlexContainer>
							)} */}
						</FlexContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
