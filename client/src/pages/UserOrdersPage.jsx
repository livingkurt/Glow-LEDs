import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update, token } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';

const UserOrderPage = (props) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ user_orders_page: userInfo });

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

	useEffect(
		() => {
			dispatch(listMyOrders());
		},
		[ userInfo ]
	);

	return (
		<FlexContainer class="profile_container" wrap column styles={{ padding: '20px' }}>
			<Link to="/profile">
				<button className="button primary">Back to Profile</button>
			</Link>
			<div className="profile-orders profile_orders_container" style={{ overflowX: 'auto', width: '100%' }}>
				{/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}

				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Your Orders</h1>
				{loadingOrders ? (
					<FlexContainer h_center column>
						<img src="loading.gif" className="loading_gif" alt="loading" />
						<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
					</FlexContainer>
				) : errorOrders ? (
					<h3 style={{ textAlign: 'center' }}>{errorOrders} </h3>
				) : (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{format_date_display(order.createdAt)}</td>
										<td>${order.totalPrice.toFixed(2)}</td>
										<td>
											{order.isPaid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											<Link to={'/order/' + order._id}>
												<button className="button icon">
													<i className="fas fa-info-circle" />
												</button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</FlexContainer>
	);
};

export default UserOrderPage;
