// React
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart } from '../../actions/cartActions';
import { format_date, print_invoice } from '../../utils/helper_functions';

const Order = (props) => {
	const dispatch = useDispatch();

	// console.log(props.order && props.order.pathname);

	const handleAddToCart = () => {
		dispatch(addToCart(props.order.pathname, 1));
	};

	const sale_price_switch = () => {
		if (props.order.sale_price !== 0) {
			return (
				<label className="">
					<del style={{ color: 'red' }}>
						<label className="" style={{ color: 'white' }}>
							${props.order.price ? props.order.price.toFixed(2) : props.order.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" /> ${props.order.sale_price ? (
						props.order.sale_price.toFixed(2)
					) : (
						props.order.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (!props.order.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }} className="ml-7px">
							${props.order.price ? props.order.price.toFixed(2) : props.order.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label className="ml-7px">Sold Out</label>
				</label>
			);
		} else {
			return <label>${props.order.price ? props.order.price.toFixed(2) : props.order.price}</label>;
		}
	};

	return (
		<div className="home_page_divs" style={{ backgroundColor: props.determine_color(props.order) }}>
			<div className="pb-15px mb-10px row" style={{ borderBottom: '1px solid white' }}>
				<div className="w-50per jc-b ">
					<div className="column fs-16px">
						<h3>Order Placed</h3>
						<div>{props.order.createdAt && format_date(props.order.createdAt)}</div>
					</div>
					<div className="column fs-16px">
						<h3>Total</h3>
						<div>${props.order.totalPrice && props.order.totalPrice.toFixed(2)}</div>
					</div>
					<div className="column fs-16px">
						<h3>Ship To</h3>
						{props.order.shipping.first_name} {props.order.shipping.last_name}
					</div>
				</div>
				<div className="w-50per jc-fe">
					<div className="column">
						<div className="column fs-16px">
							<div className="row ai-c">
								<h3 className="mr-10px">Order Number: </h3>
								<div>{props.order._id}</div>
							</div>
						</div>
						<div className="row fs-16px jc-b ai-c">
							<Link to={'/secure/account/order/' + props.order._id}>
								<button className="button primary">Order Details</button>
							</Link>
							<div>|</div>
							<button className="button secondary" onClick={() => print_invoice(props.order)}>
								Print Invoice
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row jc-b">
				<div className="small_screen_order row jc-b w-89per">
					<div className="">
						{props.order.orderItems.map((item, index) => {
							return (
								<div className="row mt-15px">
									<LazyLoadImage
										className="order-image w-200px h-200px br-10px mr-15px"
										alt={item.name}
										effect="blur"
										src={item.display_image && item.display_image} // use normal <img> attributes as props
									/>
									<div className="column jc-c">
										<h2 className="">{item.name}</h2>
										<div className="mv-10px">${item.price}</div>
										<Link to={'/collections/all/products/category/' + item.category}>
											<button className="button primary">Buy Again</button>
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="column jc-b h-10rem w-25rem">
					<h2>Order Status</h2>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isPaid ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Paid</div>
							<div>{!props.order.paidAt ? '' : format_date(props.order.paidAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isManufactured ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Manufactured</div>

							<div>{!props.order.manufacturedAt ? '' : format_date(props.order.manufacturedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isPackaged ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Packaged</div>

							<div>{!props.order.packagedAt ? '' : format_date(props.order.packagedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px">
								{props.order.isShipped ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Shipped</div>

							<div>{!props.order.shippedAt ? '' : format_date(props.order.shippedAt)}</div>
						</div>
					</div>
					<div>
						<div className="row ai-c">
							<div className="mv-5px row">
								{props.order.isDelivered ? (
									<i className="fas fa-check-circle" />
								) : (
									<i className="fas fa-times-circle" />
								)}
							</div>
							<div className="mh-10px">Delivered</div>

							<div>{!props.order.deliveredAt ? '' : format_date(props.order.deliveredAt)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
