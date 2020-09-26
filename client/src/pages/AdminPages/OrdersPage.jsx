import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder, update_order } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { Search, Sort } from '../../components/SpecialtyComponents';
import API from '../../utils/API';
import { print_invoice } from '../../utils/helper_functions';

const OrdersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ expandable, set_expandable ] = useState('none');

	const category = props.match.params.category ? props.match.params.category : '';
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log({ orderspage: userInfo });

	const row_ref = useRef();

	// const userToken = useSelector(state => state.userToken);
	// // const { to } = userToken;
	// console.log({ userToken })

	const dispatch = useDispatch();

	// useEffect(() => {
	//   // dispatch(token(userInfo.refreshToken));
	// }, [error]);

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			dispatch(listOrders());
			dispatch(listOrders());
		},
		[ successDelete, order_state ]
	);
	useEffect(
		() => {
			dispatch(listOrders(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listOrders(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listOrders(category, searchKeyword, e.target.value));
	};

	const deleteHandler = (order) => {
		dispatch(deleteOrder(order._id));
	};

	// const colors = [
	// 	{ name: 'Not Paid', color: '#333333' },
	// 	{ name: 'Paid', color: '#626262' },
	// 	{ name: 'Shipped', color: '#8e8e8e' },
	// 	{ name: 'Delivered', color: '#ababab' }
	// ];
	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' },
		{ name: 'Refunded', color: '#a9a9a9' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isPaid) {
			result = colors[0].color;
		}
		if (order.isPaid) {
			result = colors[1].color;
		}
		if (order.isManufactured) {
			result = colors[2].color;
		}
		if (order.isPackaged) {
			result = colors[3].color;
		}
		if (order.isShipped) {
			result = colors[4].color;
		}
		if (order.isDelivered) {
			result = colors[5].color;
		}
		if (order.isRefunded) {
			result = colors[6].color;
		}
		// console.log(result);
		return result;
	};

	const sort_options = [
		'Date',
		'Paid',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delievered',
		'Newest',
		'Lowest',
		'Highest'
	];

	const show_hide = (id) => {
		const row = document.getElementById(id);
		console.log(row);
		row.classList.toggle('hide-row');
		// if (expandable === 'flex') {
		// 	set_expandable('none');
		// } else if (expandable === 'none') {
		// 	set_expandable('flex');
		// }
	};

	// const toggleRow = (element) => {
	// 	element.getElementsByClassName('expanded-row-content')[0].classList.toggle('hide-row');
	// 	// console.log(event);
	// };

	const update_order_state = (order, state, is_action, action_at) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_order(order, false, is_action, action_at));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_order(order, true, is_action, action_at));
		}
	};
	// const print_invoice = async (order) => {
	// 	const invoice = await API.print_invoice(order);
	// 	console.log({ invoice });
	// };

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Orders | Glow LEDs</title>
			</MetaTags>
			<FlexContainer h_between wrap>
				{colors.map((color) => {
					return (
						<FlexContainer h_between styles={{ margin: '1rem' }}>
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</FlexContainer>
					);
				})}
				<Link to="/secure/glow/editorder">
					<button className="button primary" style={{ width: '160px' }}>
						Create Order
					</button>
				</Link>
			</FlexContainer>
			<div className="order-header">
				<h1
					style={{
						textAlign: 'center',
						width: '100%',
						margin: '20px auto',
						justifyContent: 'center'
					}}
				>
					Orders
				</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{orders && (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Total</th>
									<th>Number of Orders</th>
									<th>Average Total Per Orders</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem'
									}}
								>
									<td>
										<label>
											${orders.reduce((a, order) => a + order.totalPrice, 0).toFixed(2)}
										</label>
									</td>
									<td>
										<label>{orders.length.toFixed(2)}</label>
									</td>
									<td>
										<label>
											${(orders.reduce((a, order) => a + order.totalPrice, 0) /
												orders.length).toFixed(2)}
										</label>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="table">
							<thead>
								<tr className="tr">
									{/* <th>
										<div className="jc-b">
											<div>ID</div> <div>DATE</div> <div>TOTAL</div> <div>USER</div>
											<div>ORDER ITEMS</div> <div>ACTIONS</div>
										</div>
									</th> */}
									<th className="w-300px">ID</th>
									<th className="w-171px">DATE</th>
									<th className="w-171px">TOTAL</th>
									<th className="w-172px">USER</th>
									<th className="w-400px">ORDER ITEMS</th>
									<th className="w-150px">ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order._id}
										style={{ backgroundColor: determine_color(order) }}
										className="tr"
									>
										<td className="w-300px">{order._id}</td>
										{/* <hr width="1" size="10" /> */}
										<td className="w-171px">{format_date(order.createdAt)}</td>
										<td className="w-171px">
											${!order.totalPrice ? '' : order.totalPrice.toFixed(2)}
										</td>
										<td className="w-172px">{!order.user ? 'N/A' : order.user.first_name}</td>
										<td className="w-400px">
											{order.orderItems.map((item) => {
												console.log({ item });
												return (
													<div>
														<div>
															{item.qty}x {item.diffuser_cap_color} {item.name}
														</div>
														{item.secondary_product &&
															'(' + item.secondary_product.name + ')'}
													</div>
												);
											})}
										</td>

										<td className="w-150px">
											<FlexContainer h_between>
												<button className="button icon" onClick={() => show_hide(order._id)}>
													<i
														style={{ '-webkitTransform': 'rotate(-180deg)' }}
														className="top-8px fas fa-sort-up"
													/>
												</button>
												<Link to={'/secure/glow/editorder/' + order._id}>
													<button className="button icon">
														<i className="fas fa-info-circle" />
													</button>
												</Link>
												<Link to={'/secure/account/order/' + order._id}>
													<button className="button icon">
														<i class="fas fa-mountain" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(order)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
										</td>
										<td id={order._id} className="expanded-row-content hide-row">
											<div className="row jc-b w-100per">
												<div className="w-100per">
													<div>Paid</div>
													<div className="mv-5px">
														{order.isPaid ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div>{!order.paidAt ? '' : format_date(order.paidAt)}</div>
												</div>
												<div className="w-100per">
													<div>Manufactured</div>
													<div className="mv-5px">
														{order.isManufactured ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div>
														{!order.manufacturedAt ? '' : format_date(order.manufacturedAt)}
													</div>

													<div>
														<button
															className="button primary"
															onClick={() =>
																update_order_state(
																	order,
																	order.isManufactured,
																	'isManufactured',
																	'manufacturedAt'
																)}
														>
															{order.isManufactured ? (
																'Unset to Manufactured'
															) : (
																'Set to Manufactured'
															)}
														</button>
													</div>
												</div>
												<div className="w-100per">
													<div>Packaged</div>
													<div className="mv-5px">
														{order.isPackaged ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div>{!order.packagedAt ? '' : format_date(order.packagedAt)}</div>

													<div>
														<button
															className="button primary"
															onClick={() =>
																update_order_state(
																	order,
																	order.isPackaged,
																	'isPackaged',
																	'packagedAt'
																)}
														>
															{order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
														</button>
													</div>
												</div>
												<div className="w-100per">
													<div>Shipped</div>
													<div className="mv-5px">
														{order.isShipped ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div>{!order.shippedAt ? '' : format_date(order.shippedAt)}</div>

													<div>
														<button
															className="button primary"
															onClick={() =>
																update_order_state(
																	order,
																	order.isShipped,
																	'isShipped',
																	'shippedAt'
																)}
														>
															{order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
														</button>
													</div>
												</div>
												<div className="w-100per">
													<div>Delivered</div>
													<div className="mv-5px">
														{order.isDelivered ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div>
														{!order.deliveredAt ? '' : format_date(order.deliveredAt)}
													</div>

													<button
														className="button primary"
														onClick={() =>
															update_order_state(
																order,
																order.isDelivered,
																'isDelivered',
																'deliveredAt'
															)}
													>
														{order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
													</button>
												</div>
												<div className="w-100per">
													<div>Refund</div>
													<div className="mv-5px">
														{order.isRefunded ? (
															<i className="fas fa-check-circle" />
														) : (
															<i className="fas fa-times-circle" />
														)}
													</div>
													<div style={{ minWidth: '125px' }}>
														{!order.refundedAt ? '' : format_date(order.refundedAt)}
													</div>
													<div style={{ minWidth: '150px' }}>
														{order.isRefunded && (
															<div>
																${(order.payment.refund.reduce(
																	(a, c) => a + c.amount,
																	0
																) / 100).toFixed(2)}
															</div>
														)}
													</div>
													<button
														className="button primary"
														onClick={() => print_invoice(order)}
													>
														Print Invoice
													</button>
												</div>
											</div>
											<div className="jc-b">
												<div className="column w-100per">
													<h1>Shipping</h1>
													<div>
														<div>
															{order.shipping.first_name} {order.shipping.last_name}
														</div>
														<div>{order.shipping.address}</div>
														<div>
															{order.shipping.city}, {order.shipping.state}{' '}
															{order.shipping.postalCode} {order.shipping.country}
														</div>
														<div>{order.shipping.international && 'International'}</div>
														<div>{order.shipping.email}</div>
													</div>
												</div>
												<div className="column w-100per">
													<h1>Totals</h1>
													<div className="row w-100per jc-b">
														<div>Items - </div>
														{/* <div>${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}</div> */}
														{order.promo_code ? (
															<div>
																<del style={{ color: 'red' }}>
																	<label style={{ color: 'white' }}>
																		${order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
																	</label>
																</del>{' '}
																<i class="fas fa-arrow-right" /> ${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}
															</div>
														) : (
															<div>
																${order.itemsPrice ? (
																	order.itemsPrice.toFixed(2)
																) : (
																	order.itemsPrice
																)}
															</div>
														)}
													</div>
													<div className="row w-100per jc-b">
														<div>Shipping - </div>
														{/* <div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div> */}
														<div>
															${order.shippingPrice ? (
																order.shippingPrice.toFixed(2)
															) : (
																order.shippingPrice
															)}
														</div>
													</div>
													<div className="row w-100per jc-b">
														<div>Tax - </div>
														<div>
															${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>

									// <tr>

									// </tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default OrdersPage;
