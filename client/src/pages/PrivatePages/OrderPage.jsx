import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { CheckoutSteps } from '../../components/SpecialtyComponents';
import StripeCheckout from 'react-stripe-checkout';
import { Helmet } from 'react-helmet';
import { LoadingPayments } from '../../components/UtilityComponents';
import { API_Products } from '../../utils';

require('dotenv').config();

const OrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

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

	const save_secondary_product = async () => {
		const request = await API_Products.save_secondary_product(order, user_data, secondary_product);
		console.log(request);
		dispatch(detailsOrder(props.match.params.id));
	};

	useEffect(
		() => {
			if (successPay) {
				dispatch(detailsOrder(props.match.params.id));
			} else {
				dispatch(detailsOrder(props.match.params.id));
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
			dispatch(removeFromCart(item.pathname));
		}
	};

	const pay_order = (token) => {
		dispatch(payOrder(order, token));
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
			<div className="mb-10px ml-20px">
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<Link to="/secure/glow/orders">
						<button className="button secondary">Back to Admin Orders</button>
					</Link>
				)}

				<Link to="/secure/account/orders">
					<button className="button secondary">Back to Orders</button>
				</Link>
			</div>

			<LoadingPayments loading={payment_loading} error={errorPay} />
			<div className="placeorder">
				<div className="placeorder-info">
					<div style={{ backgroundColor: determine_color(order) }}>
						{order.isRefunded && (
							<h1>
								Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{' '}
								{format_date(order.refundedAt)}
							</h1>
						)}
						<div className="wrap jc-b">
							<div className="column w-100per">
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
								</div>
							</div>
						</div>
					</div>

					<div style={{ backgroundColor: determine_color(order) }}>
						<h1>Payment</h1>
						<div style={{ borderTop: '.1rem white solid', width: '100%' }}>
							<p style={{ marginBottom: '0px' }}>
								{order.isPaid ? 'Paid at ' + format_date(order.paidAt) : 'Not Paid'}
							</p>
						</div>
					</div>
					<div style={{ backgroundColor: determine_color(order) }}>
						<ul className="cart-list-container mt-0px">
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
				<div className="placeorder-action" style={{ backgroundColor: determine_color(order) }}>
					<ul>
						<li>
							<h1 style={{ marginTop: 0 }}>Order Summary</h1>
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
											${order.itemsPrice && order.itemsPrice.toFixed(2)}
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
							<div>Shipping</div>
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
							<div className="column">
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
							<div className="column">
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

export default OrderPage;
