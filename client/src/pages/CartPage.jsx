import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FlexContainer } from '../components/ContainerComponents';
import { SuggestedProducts } from '../components/SpecialtyComponents';
const CartPage = (props) => {
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	console.log(cartItems);
	const productId = props.match.params.id;
	const qty = parseInt(props.location.search ? Number(props.location.search.split('=')[1]) : 1);
	const dispatch = useDispatch();

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	useEffect(() => {
		if (productId) {
			// console.log(cartItems.find((item) => item.product === productId));
			// const same_product = cartItems.find((item) => item.product === productId);
			// if (same_product) {
			// 	dispatch(addToCart(same_product.product, qty + same_product.qty));
			// } else {
			dispatch(addToCart(productId, qty));
			// }
		}
	}, []);

	const checkoutHandler = () => {
		props.history.push('/login?redirect=shipping');
	};

	return (
		<FlexContainer column>
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
											<Link to={'/product/' + item.product}>{item.name}</Link>
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
													<i className="fas fa-sort-up icon_styles" />
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
							disabled={cartItems.length === 0}
						>
							Proceed to Checkout
						</button>
					</div>
				</FlexContainer>
			</div>

			{/* {cartItems.length === 0 && <SuggestedProducts />} */}
			<SuggestedProducts />
		</FlexContainer>
	);
};

export default CartPage;
