// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { format_date } from '../../utils/helper_functions';
import useClipboard from 'react-hook-clipboard';
import { createOrder, deleteOrder, listOrders, refundOrder } from '../../actions/orderActions';
import { API_Orders } from '../../utils';
import { LazyImage, Loading } from '../UtilityComponents';
import { cart_item_name, cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const CartItem = (props) => {
	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const dispatch = useDispatch();
	return (
		<li key={props.index} className="">
			{/* {console.log({ item })} */}
			<div className="cart-image m-auto ai-c">
				<Link to={'/collections/all/products/' + props.item.pathname}>
					<img src={props.item.display_image} alt={props.item.name} title="Product Image" />
				</Link>
			</div>
			<div className="cart-name">
				<div className="jc-b ai-c">
					<Link to={'/collections/all/products/' + props.item.pathname} className="m-0px">
						<label className="paragraph_font lh-0px mv-0px fs-18px">{props.item.name}</label>
					</Link>
					<div className="ai-c">
						<div className="cart-price fs-16px">{cart_sale_price_switch(props.item)}</div>
						<button className="btn icon" onClick={() => removeFromCartHandler(props.item)}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
				</div>
				{cart_item_name(props.item)}
				<div className="ai-c h-25px max-w-250px w-100per jc-b">
					<label aria-label="sortOrder" htmlFor="sortOrder" className="select-label mr-1rem">
						Qty:
					</label>
					<div className="custom-select">
						<select
							defaultValue={props.item.qty}
							className="qty_select_dropdown"
							onChange={(e) => {
								dispatch(
									addToCart({
										pathname: props.item.pathname,
										qty: e.target.value
									})
								);
							}}
						>
							{[ ...Array(props.item.countInStock).keys() ].map((x, index) => (
								<option key={index} defaultValue={parseInt(x + 1)}>
									{parseInt(x + 1)}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
