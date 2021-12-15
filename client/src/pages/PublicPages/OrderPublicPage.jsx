import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrderPublic, payOrder, payOrderGuest } from '../../actions/orderActions';
import { determine_tracking_number, format_date } from '../../utils/helper_functions';
import { CartItem, Stripe } from '../../components/SpecialtyComponents';

import { Helmet } from 'react-helmet';
import { LoadingPayments } from '../../components/UtilityComponents';
import useWindowDimensions from '../../components/Hooks/windowDimensions';

require('dotenv').config();

const OrderPublicPage = (props) => {
	const { height, width } = useWindowDimensions();
	const [ order_number, set_order_number ] = useState('');
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetailsPublic = useSelector((state) => state.orderDetailsPublic);
	const { loading, order, error } = orderDetailsPublic;

	const [ product, set_product ] = useState('');
	const [ secondary_product, set_secondary_product ] = useState('');
	const [ product_object, set_product_object ] = useState('');
	const [ payment_loading, set_payment_loading ] = useState(false);

	const [ order_state, set_order_state ] = useState({});

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

	useEffect(
		() => {
			if (successPay) {
				dispatch(detailsOrderPublic(props.match.params.id));
			} else {
				dispatch(detailsOrderPublic(props.match.params.id));
			}
			set_payment_loading(false);
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
		for (let item of cartItems) {
			dispatch(removeFromCart(item));
		}
	};

	const pay_order = (paymentMethod) => {
		set_payment_loading(true);
		dispatch(payOrderGuest(order, paymentMethod));
	};

	useEffect(
		() => {
			if (successPay && order) {
				// props.history.push('/secure/checkout/paymentcomplete/' + order._id);
				props.history.push('/checkout/order/receipt/' + order._id + '/order/true');
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

	return loading ? (
		<div className="column jc-c">
			<h2 style={{ textAlign: 'center' }}>Loading...</h2>
			<h3 style={{ textAlign: 'center' }}>If payment element doesn't show in 5 seconds, refresh the page.</h3>
		</div>
	) : error ? (
		<div>{error}</div>
	) : (
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
			{/* {order.isPaid ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />} */}
			<div className="mb-10px ml-20px">
				<Link to="/secure/account/orders">
					<button className="btn secondary">Back to Orders</button>
				</Link>
			</div>
			<div className="jc-c mb-1rem">
				<div className="ai-c m-auto">
					<h3 className="mv-0px mr-10px">Track Order</h3>
					<input
						type="order_number"
						id="order_number"
						name="order_number"
						defaultValue={props.match.params.id}
						onChange={(e) => set_order_number(e.target.value)}
					/>
					<Link to={'/checkout/order/' + order_number}>
						<button className="btn primary ">Track</button>
					</Link>
				</div>
			</div>
			<LoadingPayments loading={payment_loading} error={errorPay} />
			<div className="placeorder br-20px">
				<div className="placeorder-info">
					<div style={{ backgroundColor: width > 407 && determine_color(order) }}>
						{order.isRefunded && (
							<h1>
								Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{' '}
								{format_date(order.refundedAt)}
							</h1>
						)}
						<div className="w-100per">
							<label>Order #: {order._id}</label>
							{order.tracking_number && (
								<label>
									Tracking #:{' '}
									<a
										href={determine_tracking_number(order.tracking_number)}
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
							{order.return_tracking_number && (
								<label>
									Return Tracking #:{' '}
									<a
										href={determine_tracking_number(order.return_tracking_number)}
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
										{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}{' '}
									</div>
									<div>{order.shipping.country}</div>
									<div>{order.shipping.international && 'International'}</div>
									<div>{order.shipping.email}</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ backgroundColor: width > 407 && determine_color(order) }}>
						<h2>Payment</h2>
						<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
							<p style={{ marginBottom: '0px' }}>
								{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}
							</p>
						</div>
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
									<CartItem item={item} index={index} show_qty={false} />
								))
							)}
						</ul>
					</div>
				</div>
				<div className="placeorder-action" style={{ backgroundColor: width > 407 && determine_color(order) }}>
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
												order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
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
							<div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
						</li>
						<li>
							<div>Tip</div>
							<div>${order.tip ? order.tip.toFixed(2) : order.tip}</div>
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
						{!order.isPaid && <Stripe pay_order={pay_order} guest={true} />}

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
				</div>
			</div>
		</div>
	);
};

export default OrderPublicPage;
