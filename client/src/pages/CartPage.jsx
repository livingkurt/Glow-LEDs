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
			// console.log(cartItems.find((item) => item.product === pathname));
			// const same_product = cartItems.find((item) => item.product === pathname);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			dispatch(addToCart(pathname, qty));
			// }
		}
	}, []);

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			props.history.push('/account/login?redirect=/checkout/shipping');
		}
	};

	return (
		<FlexContainer column>
			<MetaTags>
				<title>Glow LEDs Cart</title>
				<meta property="og:title" content="Glow LEDs Cart" />
				<meta name="description" content="Glow LEDs Cart" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
			<div className="cart">
				<div className="cart-list">
					<ul className="cart-list-container">
						<li>
							<h2>Shopping Cart</h2>
							<div>Price</div>
						</li>
						{cartItems.length === 0 ? (
							<FlexContainer column v_between>
								<div>Cart is empty</div>
								{/* <div>Cart is empty</div> */}
							</FlexContainer>
						) : (
							cartItems.map((item, index) => (
								<li key={index}>
									{console.log({ item })}
									<div className="cart-image">
										<img src={item.display_image} alt="product" />
									</div>
									<div className="cart-name">
										<div>
											<Link to={'/collections/all/products/' + item.product}>{item.name}</Link>
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
															dispatch(addToCart(item.product, e.target.value))}
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
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className="fas fa-trash-alt" />
											</button>
										</div>
									</FlexContainer>
								</li>
							))
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
