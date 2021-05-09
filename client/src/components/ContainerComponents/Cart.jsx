import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { cart_sale_price_switch } from '../../utils/react_helper_functions';

const Cart = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						document.querySelector('.cart_sidebar').classList.remove('open');
					}
				}
				// Bind the event listener
				document.addEventListener('mousedown', handleClickOutside);
				return () => {
					// Unbind the event listener on clean up
					document.removeEventListener('mousedown', handleClickOutside);
				};
			},
			[ ref ]
		);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const closeMenu = () => {
		document.querySelector('.cart_sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				set_first_name(userInfo.first_name);
			}

			// }
		},
		[ userInfo ]
	);

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	// console.log({ cartItems });

	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			if (userInfo.hasOwnProperty('first_name')) {
				history.push('/account/login?redirect=/secure/checkout/placeorder');
			} else {
				history.push('/checkout/decision');
			}
		}
		closeMenu();
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
		<aside ref={wrapperRef} className="cart_sidebar" style={{ overflowY: 'scroll' }}>
			<div>
				{/* <div className="logo_text mh-auto ai-c">
					<Link to="/">
						<div className="h-50px w-50px">
							<img
								className="zoom logo_s"
								src="/images/optimized_images/logo_images/glow_logo_optimized.png"
								alt="Glow LEDs Logo"
								title="Small Logo"
							/>
						</div>
					</Link>
					<Link to="/">
						<div className="row">
							<label className="ml-5px fs-30px mv-0px ff-h">Shopping Cart</label>
						</div>
					</Link>
				</div> */}
				<button className="cart_sidebar_close_button" aria-label="close" onClick={closeMenu}>
					<i className="fas fa-times" />
				</button>
			</div>
			<ul className="cart_sidebar-list-container w-100per mr-1rem">
				<li>
					<h2>Shopping Cart</h2>
					<div>Price</div>
				</li>
				{cartItems.length === 0 ? (
					<div className="column ai-b">
						<div>Cart is empty</div>
					</div>
				) : (
					<div>
						<h4>{no_adapters_warning()}</h4>
						{cartItems.map((item, index) => (
							<li key={index}>
								<div className="cart_sidebar-image">
									<Link to={'/collections/all/products/' + item.pathname}>
										<img
											src={item.display_image}
											height="100px"
											width="100px"
											alt={item.name}
											title="Product Image"
										/>
									</Link>
								</div>
								<div className="cart_sidebar-name">
									<div className="mb-10px">
										<Link to={'/collections/all/products/' + item.pathname}>
											{/* {(item.category === 'diffuser_caps' ||
												item.category === 'mega_diffuser_caps' ||
												item.category === 'frosted_diffusers') &&
												item.diffuser_cap_color}{' '} */}
											{item.category === 'glowskins' && item.diffuser_cap_color} {item.name}{' '}
											{item.product_option &&
												item.product_option.name &&
												`- ${item.product_option.name}`}
											{item.diffuser_cap && ` w (${item.diffuser_cap.name})`}
										</Link>
									</div>
									<div>
										<div className="ai-c h-25px">
											<label
												aria-label="sortOrder"
												htmlFor="sortOrder"
												className="select-label mr-1rem"
											>
												Qty:
											</label>
											<div className="custom-select">
												<select
													defaultValue={item.qty}
													className="qty_select_dropdown"
													onChange={(e) => {
														dispatch(
															addToCart(
																item.pathname,
																e.target.value,
																item.diffuser_cap_color && item.diffuser_cap_color,
																item.diffuser_cap && item.diffuser_cap.name,
																item.product_option && item.product_option
															)
														);
													}}
												>
													{[ ...Array(item.countInStock).keys() ].map((x) => (
														<option key={x + 1} defaultValue={parseInt(x + 1)}>
															{parseInt(x + 1)}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</div>
								</div>

								<div className="column">
									<div className="cart_sidebar-price">
										{cart_sale_price_switch(item)}
										{/* {item.product_option.sale_price > 0 ? (
											<label>
												<del style={{ color: 'red' }}>
													<label style={{ color: 'white' }}>
														${item.product_option.price ? (
															item.product_option.price.toFixed(2)
														) : item.price ? (
															item.price.toFixed(2)
														) : (
															item.price
														)}
													</label>
												</del>{' '}
												<i class="fas fa-arrow-right" /> ${item.product_option.sale_price ? (
													item.product_option.sale_price.toFixed(2)
												) : item.sale_price ? (
													item.sale_price.toFixed(2)
												) : (
													item.sale_price
												)}{' '}
												On Sale!
											</label>
										) : (
											<label>
												${item.product_option.price ? (
													item.product_option.price.toFixed(2)
												) : item.price ? (
													item.price.toFixed(2)
												) : (
													item.price
												)}
											</label>
										)} */}
									</div>
									<div style={{ textAlign: 'right', width: '100%' }}>
										<button className="btn icon" onClick={() => removeFromCartHandler(item)}>
											<i className="fas fa-trash-alt" />
										</button>
									</div>
								</div>
							</li>
						))}
					</div>
				)}
			</ul>
			<h3 className="subtotal_h3">
				Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
				{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
					cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
				) : (
					cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
				)}
			</h3>

			<button className="btn secondary w-100per mb-1rem" onClick={closeMenu}>
				<Link to="/checkout/cart">View Cart</Link>
			</button>

			<button onClick={decide_warning} className="btn primary w-100per">
				Proceed to Checkout
			</button>
			<h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>
		</aside>
	);
};

export default Cart;
