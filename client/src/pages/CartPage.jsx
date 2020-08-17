import React, { useState, useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FlexContainer } from '../components/ContainerComponents';
import { SuggestedProducts } from '../components/SpecialtyComponents';
import MetaTags from 'react-meta-tags';
const CartPage = (props) => {
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	console.log(cartItems);
	const pathname = props.match.params.pathname;
	const qty = parseInt(props.location.search ? Number(props.location.search.split('=')[1]) : 1);
	const dispatch = useDispatch();
	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (pathname) => {
		dispatch(removeFromCart(pathname));
	};

	useEffect(() => {
		if (pathname) {
			// console.log(cartItems.find((item) => item.pathname === pathname));
			// const same_product = cartItems.find((item) => item.pathname === pathname);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			dispatch(addToCart(pathname, qty));
			// }
		}
	}, []);

	useEffect(
		() => {
			// if (pathname) {
			// console.log(cartItems.find((item) => item.pathname === pathname));
			// const same_product = cartItems.find((item) => item.pathname === pathname);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			dispatch(addToCart(pathname, qty));
			// }
			// }
		},
		[ props.match.params.pathname ]
	);

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			props.history.push('/account/login?redirect=/secure/checkout/placeorder');
		}
	};
	const no_adapters_warning = () => {
		const categories = cartItems.map((cartItem) => {
			return cartItem.category;
		});
		if (categories.includes('caps')) {
			console.log('Caps');
			if (!categories.includes('diffuser_adapters')) {
				return "Don't Forget: You'll need a set of Diffuser Adapters to use Diffuser Caps!";
			}
		}
	};

	return (
		<FlexContainer column>
			<MetaTags>
				<title>Cart | Glow LEDs </title>
				<link rel="canonical" href="https://www.glow-leds.com/checkout/cart " />
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<div className="cart">
				<div className="cart-list">
					<ul className="cart-list-container" style={{ marginRight: '10px' }}>
						<li>
							<h2>Shopping Cart</h2>
							<div>Price</div>
						</li>
						{cartItems.length === 0 ? (
							<FlexContainer column v_between>
								<div>Cart is empty</div>
							</FlexContainer>
						) : (
							<div>
								<h4>{no_adapters_warning()}</h4>
								{cartItems.map((item, index) => (
									<li key={index}>
										{console.log({ item })}
										<div className="cart-image">
											<img src={item.display_image} alt="product" />
										</div>
										<div className="cart-name">
											<div>
												<Link to={'/collections/all/products/' + item.pathname}>
													{item.name}
												</Link>
											</div>
											<div>
												<FlexContainer v_i_center styles={{ height: '25px' }}>
													Qty:{' '}
													<div className="qty_select_dropdown_container">
														<select
															// defaultValue={item.qty}
															value={item.qty}
															className="qty_select_dropdown"
															onChange={(e) =>
																dispatch(addToCart(item.pathname, e.target.value))}
														>
															{[ ...Array(item.countInStock).keys() ].map((x) => (
																<option key={x + 1} defaultValue={parseInt(x + 1)}>
																	{parseInt(x + 1)}
																</option>
															))}
														</select>
														{/* <i className="fas fa-sort-up icon_styles" /> */}
													</div>
												</FlexContainer>
											</div>
										</div>

										<FlexContainer column>
											<div className="cart-price">
												{item.sale_price !== 0 ? (
													<label>
														<del style={{ color: 'red' }}>
															<label style={{ color: 'white' }}>
																${item.price ? item.price.toFixed(2) : item.price}
															</label>
														</del>{' '}
														<i class="fas fa-arrow-right" /> ${item.sale_price ? item.sale_price.toFixed(2) : item.sale_price}{' '}
														On Sale!
													</label>
												) : (
													<label>${item.price ? item.price.toFixed(2) : item.price}</label>
												)}
											</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="button icon"
													onClick={() => removeFromCartHandler(item.pathname)}
												>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</FlexContainer>
									</li>
								))}
							</div>
						)}
					</ul>
				</div>

				<FlexContainer h_center class="cart-action-container">
					<div className="cart-action">
						<h3 className="subtotal_h3">
							Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
							{/* {console.log(
							cartItems
								.reduce((a, c) => (a + c.sale_price !== 0 ? c.sale_price : c.price * c.qty), 0)
								.toFixed(2)
						)} */}
							{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
								cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
							) : (
								cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
							)}
							{/* {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)} */}
						</h3>
						<button
							onClick={checkoutHandler}
							className="button primary full-width"
							// disabled={cartItems.length === 0}
						>
							Proceed to Checkout
						</button>
					</div>
				</FlexContainer>
			</div>
			<h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>
			{/* {cartItems.length === 0 && <SuggestedProducts />} */}
			<SuggestedProducts />
		</FlexContainer>
	);
};

export default CartPage;
