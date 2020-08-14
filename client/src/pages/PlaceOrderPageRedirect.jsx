import React, { useState, useEffect, Redirect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { FlexContainer } from '../components/ContainerComponents';
import { CheckoutSteps } from '../components/SpecialtyComponents';
// import { email_order } from '../actions/emailActions';
import MetaTags from 'react-meta-tags';
const PlaceOrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	useEffect(
		() => {
			if (!shipping) {
				props.history.push('/collections/all/products');
				set_redirect(true);
			}
		},
		[ !shipping ]
	);

	if (!shipping) {
		props.history.push('/collections/all/products');
	} else if (!shipping.address) {
		props.history.push('/checkout/shipping');
	} else if (!payment.paymentMethod) {
		props.history.push('/checkout/payment');
	}

	// const itemsPrice = cartItems.reduce((a, c) => (a + c.sale_price !== 0 ? c.sale_price : c.price * c.qty), 0);
	const itemsPrice =
		cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
			? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
			: cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0);

	const [ shippingPrice, setShippingPrice ] = useState(5);
	const [ redirect, set_redirect ] = useState(false);

	useEffect(() => {
		calculate_shipping();
		console.log({ shippingPrice });
		return () => {};
	}, []);

	// const shippingPrice = itemsPrice > 100 ? 0 : 5;

	const taxPrice = 0.15 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;
	// const totalPrice = itemsPrice + taxPrice;

	const [ order_note, set_order_note ] = useState('');

	const dispatch = useDispatch();

	const calculate_shipping = () => {
		const volume = cartItems.reduce((a, c) => a + c.volume * c.qty, 0);
		if (volume <= 10) {
			setShippingPrice(5);
		} else if (volume > 10 && volume < 250) {
			setShippingPrice(9);
		} else if (volume > 250 && volume < 405) {
			setShippingPrice(10);
		} else if (volume > 405 && volume < 500) {
			setShippingPrice(12);
		} else if (volume > 500) {
			setShippingPrice(15);
		}
		console.log({ shippingPrice });
	};

	const placeOrderHandler = () => {
		// create an order
		console.log({ shippingPrice });
		dispatch(
			createOrder({
				orderItems: cartItems,
				shipping,
				payment,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				user_data,
				order_note
			})
		);
	};

	useEffect(
		() => {
			if (success) {
				props.history.push('/account/order/' + order._id);
			}
		},
		[ success ]
	);

	const checkoutHandler = () => {
		props.history.push('/account/login?redirect=shipping');
	};

	if (cartItems.length === 0) {
		return <Redirect to="/collections/all/products" />;
	} else {
		return (
			<div>
				<MetaTags>
					<title>Glow LEDs Place Order Redirect</title>
					<meta property="og:title" content="Glow LEDs Place Order Redirect" />
					<meta name="description" content="Glow LEDs Place Order Redirect" />
					<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{/* <meta property="og:image" content="path/to/image.jpg" /> */}
				</MetaTags>
				<CheckoutSteps step1 step2 step3 step4 />
				<div className="placeorder">
					<div className="placeorder-info">
						<div>
							<h1>Shipping</h1>
							<div className="label">
								<div>
									{shipping.first_name} {shipping.last_name}
								</div>
								<div>{shipping.address}</div>
								<div>
									{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
								</div>
								<div>{shipping.email}</div>
							</div>
						</div>
						<div>
							<h1>Payment</h1>
							<div className="label">Payment Method: {cart.payment.paymentMethod}</div>
						</div>
						<div>
							<ul className="cart-list-container">
								<li>
									<h1>Shopping Cart</h1>
									<div>Price</div>
								</li>
								{cartItems.length === 0 ? (
									<div>Cart is empty</div>
								) : (
									cartItems.map((item, index) => (
										<li key={index}>
											<div className="cart-image">
												<img src={item.display_image} alt="product" />
											</div>
											<div className=" label cart-name">
												<div>
													<Link to={'/collections/all/products/' + item.product}>
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
																${item.price ? item.price.toFixed(2) : item.price}
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
								<h1 style={{ marginTop: '0px' }}>Order Summary</h1>
							</li>
							<li>
								<div>Items</div>
								<div>${itemsPrice.toFixed(2)}</div>
							</li>
							<li>
								<div>Shipping</div>
								<div>${shippingPrice.toFixed(2)}</div>
								{/* <div>Free Shipping</div> */}
							</li>
							<li>
								<div>Tax</div>
								<div>${taxPrice.toFixed(2)}</div>
							</li>
							<li>
								<div>Order Total</div>
								<div>${totalPrice.toFixed(2)}</div>
							</li>
							<li>
								<button className="button primary full-width" onClick={placeOrderHandler}>
									Start Payment Process
								</button>
							</li>
							<FlexContainer column>
								<div htmlFor="order_note">Add a note</div>
								<textarea
									name="order_note"
									value={order_note}
									id="order_note"
									style={{ width: '100%', height: '100px' }}
									onChange={(e) => set_order_note(e.target.value)}
								/>
							</FlexContainer>
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

export default PlaceOrderPage;
