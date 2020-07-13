import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { FlexContainer } from '../components/ContainerComponents';
import { CheckoutSteps } from '../components/SpecialtyComponents';
// import { email_order } from '../actions/emailActions';
const PlaceOrderPage = (props) => {
	const user_data = props.userInfo;
	const cart = useSelector((state) => state.cart);
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	const { cartItems, shipping, payment } = cart;

	if (!shipping.address) {
		props.history.push('/shipping');
	} else if (!payment.paymentMethod) {
		props.history.push('/payment');
	}
	const itemsPrice = cartItems.reduce((a, c) => (a + c.sale_price !== 0 ? c.sale_price : c.price * c.qty), 0);
	const [ shippingPrice, setShippingPrice ] = useState(0);
	useEffect(() => {
		calculate_shipping();
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
		} else if (volume > 10 && volume < 245) {
			setShippingPrice(9);
		} else if (volume > 245 && volume < 405) {
			setShippingPrice(16);
		} else if (volume > 405 && volume < 500) {
			setShippingPrice(20);
		} else if (volume > 500) {
			setShippingPrice(30);
		}
	};

	const placeOrderHandler = () => {
		// create an order
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
				props.history.push('/order/' + order._id);
			}
		},
		[ success ]
	);

	const checkoutHandler = () => {
		props.history.push('/login?redirect=shipping');
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h1>Shipping</h1>
						<div className="label">
							<div>{shipping.address}</div>
							<div>
								{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
							</div>
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
												<Link to={'/product/' + item.product}>{item.name}</Link>
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
								Place Order
							</button>
						</li>
						<FlexContainer column>
							{/* <label htmlFor="order_note">Add a note about order</label> */}
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
};

export default PlaceOrderPage;
