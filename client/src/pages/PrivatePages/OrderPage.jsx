import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	detailsOrder,
	// shipOrder,
	// deliverOrder,
	refundOrder,
	// manufactureOrder,
	// packageOrder,
	update_order
} from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import MetaTags from 'react-meta-tags';
import API from '../../utils/API';

require('dotenv').config();

const OrderPage = (props) => {
	// console.log(props.userInfo);
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
	// console.log({ refund });

	// const orderShipping = useSelector((state) => state.orderShipping);
	// const { order: shipping } = orderShipping;

	// const orderManufactured = useSelector((state) => state.orderManufactured);
	// const { order: manufactured } = orderManufactured;

	// const orderPackaged = useSelector((state) => state.orderPackaged);
	// const { order: packaged } = orderPackaged;

	// const orderDelivery = useSelector((state) => state.orderDelivery);
	// const { order: delivery } = orderDelivery;
	// console.log({ delivery });

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
	const [ payment_loading, set_payment_loading ] = useState(true);

	const [ order_state, set_order_state ] = useState({});
	console.log({ product });

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
	// useEffect(
	// 	() => {
	// 		if (shipping) {
	// 			set_shipping_state(shipping.isShipped);
	// 			set_order_state(shipping);
	// 		}
	// 	},
	// 	[ shipping ]
	// );
	// useEffect(
	// 	() => {
	// 		if (packaged) {
	// 			set_packaged_state(packaged.isPackaged);
	// 			set_order_state(packaged);
	// 		}
	// 	},
	// 	[ packaged ]
	// );
	// useEffect(
	// 	() => {
	// 		if (manufactured) {
	// 			set_manufactured_state(manufactured.isManufactured);
	// 			set_order_state(manufactured);
	// 		}
	// 	},
	// 	[ manufactured ]
	// );

	// useEffect(
	// 	() => {
	// 		if (delivery) {
	// 			set_delivery_state(delivery.isDelivered);
	// 			set_order_state(delivery);
	// 		}
	// 	},
	// 	[ delivery ]
	// );

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

	// const update_order_state = (state, is_action, action_at) => {
	// 	if (state) {
	// 		set_order_state({ ...order_state, [is_action]: false });
	// 		dispatch(update_order(order, false, is_action, action_at));
	// 	} else {
	// 		set_order_state({ ...order_state, [is_action]: true });
	// 		dispatch(update_order(order, true, is_action, action_at));
	// 	}
	// };

	// const update_shipping_state = () => {
	// 	if (order_state.isShipped) {
	// 		set_shipping_state(false);
	// 		dispatch(update_order(order, false, 'isShipped', 'shippedAt'));
	// 	} else {
	// 		set_shipping_state(true);
	// 		dispatch(update_order(order, true, 'isShipped', 'shippedAt'));
	// 	}
	// };
	// const update_manufactured_state = () => {
	// 	if (order_state.isManufactured) {
	// 		set_manufactured_state(false);
	// 		dispatch(update_order(order, false, 'isManufactured', 'manufacturedAt'));
	// 	} else {
	// 		set_manufactured_state(true);
	// 		dispatch(update_order(order, true, 'isManufactured', 'manufacturedAt'));
	// 	}
	// };
	// const update_packaged_state = () => {
	// 	if (order_state.isPackaged) {
	// 		set_packaged_state(false);
	// 		dispatch(update_order(order, false, 'isPackaged', 'packagedAt'));
	// 	} else {
	// 		set_packaged_state(true);
	// 		dispatch(update_order(order, true, 'isPackaged', 'packagedAt'));
	// 	}
	// };

	// const update_delivered_state = () => {
	// 	if (order_state.isDelivered) {
	// 		set_delivery_state(false);
	// 		dispatch(update_order(order, false, 'isDelivered', 'deliveredAt'));
	// 	} else {
	// 		set_delivery_state(true);
	// 		dispatch(update_order(order, true, 'isDelivered', 'deliveredAt'));
	// 	}
	// };

	// const [ paypal_state, set_paypal_state ] = useState('block');

	useEffect(
		() => {
			if (successPay) {
				// set_paypal_state('none');
				// console.log('successPay');
				dispatch(detailsOrder(props.match.params.id));
			} else {
				dispatch(detailsOrder(props.match.params.id));
			}
		},
		[ successPay ]
	);

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

	return loading ? (
		<FlexContainer h_center column>
			<h2 style={{ textAlign: 'center' }}>Loading...</h2>
			<h3 style={{ textAlign: 'center' }}>If payment element doesn't show in 5 seconds, refresh the page.</h3>
		</FlexContainer>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<MetaTags>
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
			</MetaTags>
			{order.isPaid ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />}

			{props.userInfo &&
			props.userInfo.isAdmin && (
				<FlexContainer styles={{ marginBottom: 10, marginLeft: '20px' }}>
					<Link to="/secure/glow/orders">
						<button className="button primary">Back to Orders</button>
					</Link>
				</FlexContainer>
			)}
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
											{/* {shipping_state ? (
												'Shipped at ' + format_date(order_state.shippedAt)
											) : (
												'Not Shipped'
											)} */}
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
					<FlexContainer row v_i_center h_between>
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
					</FlexContainer>
					<div className="ship_deliver ai-s wrap w-100per column g-17px">
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

						{/* <FlexContainer row v_i_center h_between>
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<div>
									<button
										className="button primary"
										onClick={() =>
											update_order_state(
												order_state.isManufactured,
												'isManufactured',
												'manufacturedAt'
											)}
									>
										{order_state.isManufactured ? (
											'Mark As Not Manufactured'
										) : (
											'Mark As Manufactured'
										)}
									</button>
								</div>
							)}
						</FlexContainer>
						<FlexContainer row v_i_center h_between>
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<div>
									<button
										className="button primary"
										onClick={() =>
											update_order_state(order_state.isPackaged, 'isPackaged', 'packagedAt')}
									>
										{order_state.isPackaged ? 'Mark As Not Packaged' : 'Mark As Packaged'}
									</button>
								</div>
							)}
						</FlexContainer>
						<FlexContainer row v_i_center h_between>
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<div>
									<button
										className="button primary"
										onClick={() =>
											update_order_state(order_state.isShipped, 'isShipped', 'shippedAt')}
									>
										{order_state.isShipped ? 'Mark As Not Shipped' : 'Mark As Shipped'}
									</button>
								</div>
							)}
						</FlexContainer>
						<FlexContainer row v_i_center h_between>
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<FlexContainer h_right>
									<button
										className="button primary"
										onClick={() =>
											update_order_state(order_state.isDelivered, 'isDelivered', 'deliveredAt')}
									>
										{order_state.isDelivered ? 'Mark As Not Delivered' : 'Mark As Delivered'}
									</button>
								</FlexContainer>
							)}
						</FlexContainer> */}

						<FlexContainer row v_i_center h_between>
							{/* {console.log({ delivery_state })} */}
							{props.userInfo &&
							props.userInfo.isAdmin && (
								<FlexContainer h_right>
									<button className="button primary" onClick={send_not_paid_email}>
										Still Not Paid
									</button>
								</FlexContainer>
							)}
						</FlexContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
