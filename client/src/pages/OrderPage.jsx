import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, shipOrder, deliverOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
// import { email_delivery, email_shipping } from '../actions/emailActions';
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
				// props.history.push("/profile");
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
		dispatch(payOrder(order, paymentResult, user_data));
	};

	const empty_cart = () => {
		console.log(cartItems);
		for (let item of cartItems) {
			dispatch(removeFromCart(item.product));
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
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<FlexContainer h_between wrap>
							<FlexContainer column>
								<h1>Shipping</h1>
								<div>
									<div>{order.shipping.address}</div>
									<div>
										{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}{' '}
										{order.shipping.country}
									</div>
								</div>
							</FlexContainer>
							<FlexContainer column styles={{ marginTop: 'auto', width: '373px' }} class="ship_deliver">
								<FlexContainer row v_i_center h_between>
									{console.log({ shipping_state })}
									<label style={{ marginTop: '5px' }}>
										{shipping_state ? (
											'Shipped at ' + format_date_display(order_state.shippedAt)
										) : (
											'Not Shipped'
										)}
									</label>
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
									<label style={{ marginTop: '5px' }}>
										{delivery_state ? (
											'Delivered at ' + format_date_display(order_state.deliveredAt)
										) : (
											'Not Delivered'
										)}
									</label>
									{props.userInfo &&
									props.userInfo.isAdmin && (
										<div>
											<button className="button primary" onClick={update_delivered_state}>
												{delivery_state ? 'Mark As Not Delivered' : 'Mark As Delivered'}
											</button>
										</div>
									)}
								</FlexContainer>
							</FlexContainer>
						</FlexContainer>
					</div>
					<div>
						<h1>Payment</h1>
						<div>Payment Method: {order.payment.paymentMethod}</div>
						<div>{order.isPaid ? 'Paid at ' + format_date_display(order.paidAt) : 'Not Paid'}</div>
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
												<Link to={'/product/' + item.product}>{item.name}</Link>
											</div>
											<div>Qty: {item.qty}</div>
										</div>
										<div className="cart-price">${item.price}</div>
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
							<div>Free Shipping</div>
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
							{loadingPay && (
								<FlexContainer h_center>
									<h2>Finishing Payment..</h2>
								</FlexContainer>
							)}
							<div style={{ display: paypal_state }}>
								{!order.isPaid && (
									<PaypalButton amount={order.totalPrice} onSuccess={handleSuccessPayment} />
								)}
							</div>
						</li>
						<FlexContainer column>
							{/* <label htmlFor="order_note">Add a note about order</label> */}
							<div style={{ fontSize: '16px' }} htmlFor="order_note">
								Order Note
							</div>
							<textarea
								name="order_note"
								value={order.order_note}
								id="order_note"
								style={{ width: '100%', height: '100px' }}
							/>
						</FlexContainer>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
