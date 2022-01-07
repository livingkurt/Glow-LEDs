// React
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { determnine_link } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';
import { cart_item_name, sale_price_switch } from '../../utils/react_helper_functions';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const CartItem = (props) => {
	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const [ show_hidden, set_show_hidden ] = useState(false);

	const show_hidden_products = (item) => {
		console.log({ item });
		// if (show_hidden) {
		// 	set_show_hidden(false);
		// } else if (!show_hidden) {
		// 	set_show_hidden(true);
		// }
	};

	return (
		<li key={props.index} className="">
			<div className="cart-image m-auto ai-c">
				{userInfo &&
				userInfo.isAdmin &&
				props.item.isPaid && (
					<button className="btn primary mr-10px" onClick={() => show_hidden_products(props.item)}>
						{props.item.isManufactured ? <i class="fas fa-check-square" /> : <i class="far fa-square" />}
					</button>
				)}
				<Link to={determnine_link(props.item)}>
					<div className="">
						{!props.item.secondary_image && (
							<LazyImage
								className="order-image br-10px mr-15px w-100px h-100px"
								alt={props.item.name}
								title="Product Image"
								effect="blur"
								src={props.item.display_image && props.item.display_image}
							/>
						)}
						{props.item.secondary_image && (
							<div
								className={` double-image-cart${props.item.name &&
								props.item.name.split('-')[1] === '2 Tone'
									? '-vertical'
									: ' row'}`}
							>
								<LazyImage
									id="expandedImg"
									alt={props.item.name}
									title={props.item.name}
									className={`details-image-cart-page-${props.item.name &&
									props.item.name.split('-')[1] === '2 Tone'
										? 'top'
										: 'left'} m-0px`}
									src={props.item.display_image}
								/>
								<LazyImage
									id="expandedSecondaryImg"
									alt={props.item.name}
									title={props.item.name}
									className={`details-image-cart-page-${props.item.name &&
									props.item.name.split('-')[1] === '2 Tone'
										? 'bottom'
										: 'right'} `}
									src={props.item.secondary_image}
								/>
							</div>
						)}
					</div>
				</Link>
			</div>
			<div className="cart-name">
				<div className="jc-b ai-c mb-20px">
					<Link to={'/collections/all/products/' + props.item.pathname} className="m-0px">
						<label className="paragraph_font lh-0px mv-0px fs-18px">{props.item.name}</label>
					</Link>
					{userInfo &&
					userInfo.isAdmin && (
						<div className="ai-c">
							<button className="btn icon" onClick={() => removeFromCartHandler(props.item)}>
								<i className="fas fa-trash-alt" />
							</button>
						</div>
					)}
				</div>
				{cart_item_name(props.item)}

				<div className="ai-c h-25px  w-100per jc-b mb-10px">
					<label aria-label="sort" htmlFor="sort" className="select-label mr-1rem">
						Qty:
					</label>
					{console.log({ qty: props.item.quantity })}
					{props.show_qty ? (
						<div className="custom-select">
							<select
								defaultValue={parseInt(props.item.qty)}
								value={parseInt(props.item.qty)}
								className="qty_select_dropdown"
								onChange={(e) => {
									dispatch(
										addToCart({
											...props.item,
											pathname: props.item.pathname,
											qty: parseInt(e.target.value)
										})
									);
								}}
							>
								{[ ...Array(props.item.quantity).keys() ].map((x, index) => (
									<option key={index} defaultValue={parseInt(x + 1)}>
										{parseInt(x + 1)}
									</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
					) : (
						<label>{props.item.qty}</label>
					)}
					<div className="cart-price fs-16px">{sale_price_switch(props.item)}</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
