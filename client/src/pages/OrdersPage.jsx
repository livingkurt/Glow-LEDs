import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';
import { token } from '../actions/userActions';

function OrdersPage(props) {
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
	return loading ? (
		<Title styles={{ fontSize: 20 }}>Loading... If pages doesn't show in 5 seconds, refresh the page.</Title>
	) : (
		<BlockContainer class="main_container">
			<div className="order-header">
				<Title
					styles={{
						fontSize: 30,
						textAlign: 'center',
						width: '100%',
						margin: '20px auto',
						justifyContent: 'center'
					}}
				>
					Orders
				</Title>
			</div>
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
							<th>DELIVERED</th>
							<th>DELIVERED AT</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{format_date_display(order.createdAt)}</td>
								<td>${order.totalPrice.toFixed(2)}</td>
								<td>{order.user.name}</td>
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
									<FlexContainer h_between>
										<Link to={'/order/' + order._id}>
											<ButtonSymbol>
												<i className="fas fa-info-circle" />
											</ButtonSymbol>
										</Link>
										<ButtonSymbol arg={order} on_click_function={deleteHandler}>
											<i className="fas fa-trash-alt" />
										</ButtonSymbol>
									</FlexContainer>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</BlockContainer>
	);
}
export default OrdersPage;
