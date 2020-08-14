import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';

const OrdersPage = (props) => {
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

	const deleteHandler = (order) => {
		dispatch(deleteOrder(order._id));
	};

	const colors = {
		not_paid: '#333333',
		shipped: '#8e8e8e',
		paid: '#626262'
	};

	return (
		<div class="main_container">
			<FlexContainer h_between wrap>
				<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
					<label style={{ marginRight: '1rem' }}>Not Paid</label>
					<div style={{ backgroundColor: '#333333', height: '20px', width: '60px', borderRadius: '5px' }} />
				</FlexContainer>
				<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
					<label style={{ marginRight: '1rem' }}>Paid</label>
					<div style={{ backgroundColor: '#626262', height: '20px', width: '60px', borderRadius: '5px' }} />
				</FlexContainer>
				<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
					<label style={{ marginRight: '1rem' }}>Shipped</label>
					<div style={{ backgroundColor: '#8e8e8e', height: '20px', width: '60px', borderRadius: '5px' }} />
				</FlexContainer>
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
			<Loading loading={loading} error={error}>
				{orders && (
					<div className="order-list responsive_table">
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
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order._id}
										// style={{
										// 	backgroundColor: !order.isPaid
										// 		? colors.note_paid
										// 		: !order.isShipped ? colors.paid : '#626262'
										// }}
										style={{
											backgroundColor: !order.isPaid
												? colors.not_paid
												: !order.isShipped ? colors.paid : colors.shipped
										}}
									>
										<td>{order._id}</td>
										<td>{format_date_display(order.createdAt)}</td>
										<td>${order.totalPrice.toFixed(2)}</td>
										<td>{!order.user ? 'N/A' : order.user.first_name}</td>
										<td>
											{order.isPaid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{!order.paidAt ? '' : format_date_display(order.paidAt)}</td>
										<td>
											{order.isShipped ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{!order.shippedAt ? '' : format_date_display(order.shippedAt)}</td>
										<td>
											{order.isDelivered ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/account/order/' + order._id}>
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
