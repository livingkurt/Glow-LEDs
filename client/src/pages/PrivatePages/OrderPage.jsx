import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, shipOrder, deliverOrder } from '../../actions/orderActions';
import { format_date_display } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { PaypalButton, CheckoutSteps } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import API from '../../utils/API';
// import { email_delivery, email_shipping } from '../../actions/emailActions';
const OrderPage = (props) => {
	console.log(props.userInfo);
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;
	console.log({ OrderPage: order });

	const orderShipping = useSelector((state) => state.orderShipping);
	const { loading: load_shipping, order: shipping, error: error_shipping } = orderShipping;
	console.log({ shipping });

	const orderDelivery = useSelector((state) => state.orderDelivery);
	const { loading: load_deliverey, order: delivery, error: error_deliverey } = orderDelivery;
	console.log({ delivery });

	const [ shipping_state, set_shipping_state ] = useState({});
	const [ delivery_state, set_delivery_state ] = useState({});
	const [ payment_loading, set_payment_loading ] = useState(true);

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			if (order) {
				set_order_state(order);
				console.log({ order });
				set_shipping_state(order.isShipped);
				set_delivery_state(order.isDelivered);
			}
		},
		[ order ]
	);

	useEffect(
		() => {
			if (shipping) {
				set_shipping_state(shipping.isShipped);
				// set_order_state({
				//   ...order_state,
				//   isShipped: shipping.isShipped,
				//   shippedAt: shipping.isShipped ? Date.now() : ""

				// })
				set_order_state(shipping);
				console.log({ shipping: shipping.isShipped });
			}
		},
		[ shipping ]
	);

	useEffect(
		() => {
			if (delivery) {
				set_delivery_state(delivery.isDelivered);
				set_order_state(delivery);
				// set_order_state({
				//   ...order_state,
				//   isDelivered: delivery.isDelivered,
				//   deliveredAt: delivery.isDelivered ? Date.now() : ""
				// })
				console.log({ delivery: delivery.isShipped });
			}
		},
		[ delivery ]
	);

	const send_not_paid_email = async () => {
		const request = await API.not_paid_email(order, user_data);
		console.log(request);
	};

	const update_shipping_state = () => {
		if (order_state.isShipped) {
			set_shipping_state(false);
			dispatch(shipOrder(order, false));
		} else {
			set_shipping_state(true);
			dispatch(shipOrder(order, true));
		}
	};

	const update_delivered_state = () => {
		if (order_state.isDelivered) {
			set_delivery_state(false);
			dispatch(deliverOrder(order, false));
		} else {
			set_delivery_state(true);
			dispatch(deliverOrder(order, true));
		}
	};

	const [ paypal_state, set_paypal_state ] = useState('block');

	useEffect(
		() => {
			if (successPay) {
				set_paypal_state('none');
				console.log('successPay');
				// props.history.push('/secure/checkout/paymentcomplete/' + props.match.params.id);
				// props.history.push("/secure/account/profile");
				dispatch(detailsOrder(props.match.params.id));
			} else {
				dispatch(detailsOrder(props.match.params.id));
			}
		},
		[ successPay ]
	);

	useEffect(
		() => {
			set_order_state(order);
		},
		[ order ]
	);

	useEffect(() => {
		empty_cart();
	}, []);

	const handleSuccessPayment = (paymentResult) => {
		console.log('handleSuccessPayment');
		dispatch(payOrder(order, paymentResult, user_data));
		set_payment_loading(false);
		// if (successPay) {
		props.history.push('/secure/checkout/paymentcomplete/' + props.match.params.id);
		// }
	};

	const empty_cart = () => {
		console.log(cartItems);
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

			<div className="placeorder">
				<div className="placeorder-info">
					<div>
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
									<div>{order.shipping.email}</div>
									<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
										<p style={{ marginBottom: '0px' }}>
											{/* {shipping_state ? (
												'Shipped at ' + format_date_display(order_state.shippedAt)
											) : (
												'Not Shipped'
											)} */}
											{shipping_state ? 'Shipped' : 'Not Shipped'}
										</p>
									</div>
								</div>
							</FlexContainer>
							<FlexContainer wrap h_between styles={{ width: '100%' }} className="ship_deliver">
								<FlexContainer row v_i_center h_between>
									{console.log({ shipping_state })}
									{/* <label style={{ marginTop: '5px' }}>
										{shipping_state ? (
											'Shipped at ' + format_date_display(order_state.shippedAt)
										) : (
											'Not Shipped'
										)}
									</label> */}
									{props.userInfo &&
									props.userInfo.isAdmin && (
										<div>
											<button className="button primary" onClick={update_shipping_state}>
												{shipping_state ? 'Mark As Not Shipped' : 'Mark As Shipped'}
											</button>
										</div>
									)}
								</FlexContainer>
								<FlexContainer row v_i_center h_between>
									{console.log({ delivery_state })}
									{/* <label style={{ marginTop: '5px' }}>
										{delivery_state ? (
											'Delivered at ' + format_date_display(order_state.deliveredAt)
										) : (
											'Not Delivered'
										)}
									</label> */}
									{props.userInfo &&
									props.userInfo.isAdmin && (
										<FlexContainer h_right>
											<button className="button primary" onClick={update_delivered_state}>
												{delivery_state ? 'Mark As Not Delivered' : 'Mark As Delivered'}
											</button>
										</FlexContainer>
									)}
								</FlexContainer>
								<FlexContainer row v_i_center h_between>
									{console.log({ delivery_state })}
									{/* <label style={{ marginTop: '5px' }}>
										{delivery_state ? (
											'Delivered at ' + format_date_display(order_state.deliveredAt)
										) : (
											'Not Delivered'
										)}
									</label> */}
									{props.userInfo &&
									props.userInfo.isAdmin && (
										<FlexContainer h_right>
											<button className="button primary" onClick={send_not_paid_email}>
												Still Not Paid
											</button>
										</FlexContainer>
									)}
								</FlexContainer>
							</FlexContainer>
						</FlexContainer>
					</div>
					<div>
						<h1>Payment</h1>
						{/* <div>Payment Method: {order.payment.paymentMethod}</div> */}
						<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
							<p style={{ marginBottom: '0px' }}>
								{order.isPaid ? 'Paid at ' + format_date_display(order.paidAt) : 'Not Paid'}
							</p>
						</div>
						{/* <div>{order.isPaid ? 'Paid at ' + format_date_display(order.paidAt) : 'Not Paid'}</div> */}
					</div>
					<div>
						<ul style={{ marginTop: 0 }} className="cart-list-container">
							<li>
								<h1>Shopping Cart</h1>
								<div>Price</div>
							</li>
							{order.orderItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								order.orderItems.map((item) => (
									<li key={item._id}>
										<div className="cart-image">
											<img src={item.display_image} alt="product" />
										</div>
										<div className="cart-name">
											<div>
												<Link to={'/collections/all/products/' + item.pathname}>
													{item.name}
												</Link>
											</div>
											<div>Qty: {item.qty}</div>
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
							<div>${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}</div>
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
						<li>
							<div>Order Total</div>
							<div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
						</li>
						<li
							className="placeorder-actions-payment"
							style={{ display: 'flex', justifyContent: 'center' }}
						>
							<Loading loading={loadingPay} error={errorPay}>
								{/* {loadingPay ? (
								<FlexContainer h_center>
									<h2>Finishing Payment..</h2>
									<img src="loading.gif" className="loading_gif" alt="loading" />
									<img src="loading_overlay.png" className="loading_png" alt="loading" />
								</FlexContainer>
							)} */}
								{/* <div style={{ display: paypal_state }}> */}
								{!order.isPaid && (
									<PaypalButton amount={order.totalPrice} onSuccess={handleSuccessPayment} />
								)}
								{/* </div> */}
							</Loading>
						</li>
						{!order.isPaid && (
							<label htmlFor="order_note">If paypal button doesn't show, refresh page.</label>
						)}

						{order.order_note && (
							<FlexContainer column>
								<div htmlFor="order_note">Order Note</div>
								<p name="order_note" id="order_note" style={{ width: '100%', height: '100px' }}>
									{order.order_note}
								</p>
							</FlexContainer>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
