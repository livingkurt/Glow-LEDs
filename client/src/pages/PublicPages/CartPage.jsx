import React, { useState } from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, CartItem } from '../../components/SpecialtyComponents';
import { Helmet } from 'react-helmet';
import { cart_item_name, cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';

const CartPage = (props) => {
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();
	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			if (userInfo.hasOwnProperty('first_name')) {
				props.history.push('/account/login?redirect=/secure/checkout/placeorder');
			} else {
				props.history.push('/checkout/decision');
			}
		}
	};

	const decide_warning = () => {
		if (new Date() > new Date('2020-12-17') && new Date() < new Date('2021-01-02')) {
			const confirm = window.confirm(
				'Glow LEDs will be out of office from 12/18/20 - 1/2/21. Orders will not be shipped until after January 2nd 2021'
			);
			if (confirm) {
				checkoutHandler();
			}
		} else {
			checkoutHandler();
		}
	};
	const no_adapters_warning = () => {
		const categories = cartItems.map((cartItem) => {
			return cartItem.category;
		});
		// const names = cartItems.map((cartItem) => {
		// 	return cartItem.name;
		// });
		if (
			!categories.includes('Custom Diffuser Caps Final Payment') ||
			!categories.includes('Custom Diffuser Caps Deposit')
		) {
			if (categories.includes('diffuser_caps')) {
				// console.log('Caps');
				if (!categories.includes('diffuser_adapters')) {
					return "Don't Forget: You'll need a set of Diffuser Adapters to use Diffuser Caps!";
				}
			}
		}
	};

	return (
		<div className="">
			<Helmet>
				<title>Cart | Glow LEDs </title>
				<meta property="og:title" content="Cart" />
				<meta name="twitter:title" content="Cart" />
				<link rel="canonical" href="https://www.glow-leds.com/checkout/cart " />
				<meta property="og:url" content="https://www.glow-leds.com/checkout/cart" />
			</Helmet>
			<div className="cart">
				<div className="cart-list">
					<ul className="cart-list-container" style={{ marginRight: '10px' }}>
						<li className="ai-fe">
							<h2>Shopping Cart</h2>
							<div>Price</div>
						</li>
						{cartItems.length === 0 ? (
							<div className="column ai-b">
								<div>Cart is empty</div>
							</div>
						) : (
							<div>
								{/* <h4>{no_adapters_warning()}</h4> */}
								{cartItems.map((item, index) => <CartItem item={item} index={index} show_qty={true} />)}
							</div>
						)}
					</ul>
				</div>

				<div className="cart-action-container jc-c">
					<div className="cart-action">
						<h3 className="subtotal_h3">
							Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
							{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
								cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
							) : (
								cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
							)}
						</h3>
						<button onClick={decide_warning} className="btn primary w-100per bob">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
			<h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>
			<Carousel
				product_pathname={props.match.params.pathname}
				category={'accessories'}
				title="Accessories You May Need"
			/>
			<Carousel title="Suggested Products" />
		</div>
	);
};

export default CartPage;
