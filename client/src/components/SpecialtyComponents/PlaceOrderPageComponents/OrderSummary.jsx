import React from 'react';
import CartItem from '../CartItem';
export function OrderSummary({
	show_message,
	loading,
	shipping,
	shippingPrice,
	free_shipping_message,
	tip,
	cartItems,
	itemsPrice,
	items_price,
	taxPrice,
	totalPrice
}) {
	return (
		<div className="placeorder-action">
			<ul>
				<li>
					<h2
						style={{
							marginTop: '0px'
						}}
					>
						Order Summary
					</h2>
				</li>
				<li>
					<ul className="cart-list-container w-100per">
						<li>
							{/* <h2>Shopping Cart</h2> */}
							<div className="">
								{/* <Link to="/collections/all/products">
                <li style={{ marginBottom: '0', borderBottom: 0 }}>
                	<button className="btn secondary w-100per" style={{ marginBottom: 0 }}>
                		Continue Shopping
                	</button>
                </li>
                </Link> */}
								<label
									style={{
										textAlign: 'right'
									}}
								>
									Price
								</label>
							</div>
						</li>
						{cartItems.length === 0 ? (
							<div>Cart is empty</div>
						) : (
							cartItems.map((item, index) => <CartItem item={item} index={index} show_qty={true} />)
						)}
					</ul>
				</li>

				{(!show_message || free_shipping_message) &&  (
					<li>
						<div>Subtotal</div>
						<div>${itemsPrice.toFixed(2)}</div>
					</li>
				)}

				{show_message && !free_shipping_message && (
					<li>
						<del
							style={{
								color: 'red'
							}}
						>
							<div
								style={{
									color: 'white'
								}}
							>
								Subtotal
							</div>
						</del>
						<div>
							<del
								style={{
									color: 'red'
								}}
							>
								<label
									style={{
										color: 'white'
									}}
								>
									${items_price.toFixed(2)}
								</label>
							</del>
						</div>
					</li>
				)}
				{show_message && !free_shipping_message && (
					<li>
						<div>Discount</div>
						<div>-${(items_price - itemsPrice).toFixed(2)}</div>
					</li>
				)}
				{show_message && !free_shipping_message &&(
					<li>
						<div>New Subtotal</div>
						<div>${itemsPrice.toFixed(2)}</div>
					</li>
				)}

				<li>
					<div>Tax</div>
					<div>
						{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
							`$${taxPrice.toFixed(2)}`
						) : (
							'------'
						) : (
							'------'
						)}
					</div>
				</li>
				<li className="pos-rel">
					<div>Shipping</div>
					<div>
						{shipping && shipping.hasOwnProperty('first_name') && shippingPrice > 0 ? (
							'$' + shippingPrice.toFixed(2)
						) : (
							free_shipping_message
						)}
					</div>
				</li>
				{tip > 0 && (
					<li className="pos-rel">
						<div>Tip</div>
						<div>${tip.toFixed(2)}</div>
					</li>
				)}
				<li>
					<div>Order Total</div>
					<div>
						{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
							'$' + totalPrice.toFixed(2)
						) : (
							'------'
						) : (
							'------'
						)}
					</div>
				</li>
			</ul>
		</div>
	);
}
