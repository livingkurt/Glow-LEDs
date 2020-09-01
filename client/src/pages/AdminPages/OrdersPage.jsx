import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { Search, Sort } from '../../components/SpecialtyComponents';

const OrdersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');

	const category = props.match.params.category ? props.match.params.category : '';
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ orderspage: userInfo });

	// const userToken = useSelector(state => state.userToken);
	// // const { to } = userToken;
	// console.log({ userToken })

	const dispatch = useDispatch();

	// useEffect(() => {
	//   // dispatch(token(userInfo.refreshToken));
	// }, [error]);

	useEffect(
		() => {
			dispatch(listOrders());
		},
		[ successDelete ]
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
		if (order.isShipped) {
			result = colors[2].color;
		}
		if (order.isDelivered) {
			result = colors[3].color;
		}
		if (order.isRefunded) {
			result = colors[4].color;
		}
		// console.log(result);
		return result;
	};

	const sort_options = [ 'Date', 'Paid', 'Shipped', 'Delievered', 'Newest', 'Lowest', 'Highest' ];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Orders | Glow LEDs</title>
			</MetaTags>
			<FlexContainer h_between wrap>
				{colors.map((color) => {
					return (
						<FlexContainer h_between styles={{ margin: '1rem', width: '14rem' }}>
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
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</FlexContainer>
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
									// key={order._id}
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
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>USER</th>
									<th>PAID</th>
									<th>PAID AT</th>
									<th>SHIPPED</th>
									<th>SHIPPED On</th>
									<th>DELIVERED</th>
									<th>REFUNDED</th>
									<th>REFUNDED AT</th>
									<th>REFUND AMOUNT</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id} style={{ backgroundColor: determine_color(order) }}>
										<td>{order._id}</td>
										<td>{format_date(order.createdAt)}</td>
										<td>${!order.totalPrice ? '' : order.totalPrice.toFixed(2)}</td>
										<td>{!order.user ? 'N/A' : order.user.first_name}</td>
										<td>
											{order.isPaid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{!order.paidAt ? '' : format_date(order.paidAt)}</td>
										<td>
											{order.isShipped ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{!order.shippedAt ? '' : format_date(order.shippedAt)}</td>
										<td>
											{order.isDelivered ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											{order.isRefunded ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{!order.refundedAt ? '' : format_date(order.refundedAt)}</td>
										<td>
											{order.isRefunded && (
												<div>
													${(order.payment.refund.reduce((a, c) => a + c.amount, 0) /
														100).toFixed(2)}
												</div>
											)}
										</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/account/order/' + order._id}>
													<button className="button icon">
														<i className="fas fa-info-circle" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(order)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
										</td>
									</tr>
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
