import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update, token } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const UserOrderPage = (props) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ user_orders_page: userInfo });

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading, orders, error } = myOrderList;

	useEffect(
		() => {
			dispatch(listMyOrders());
		},
		[ userInfo ]
	);

	const colors = {
		not_paid: '#333333',
		shipped: '#8e8e8e',
		paid: '#626262'
	};
	return (
		<FlexContainer class="profile_container" wrap column styles={{ padding: '20px' }}>
			<MetaTags>
				<title>Glow LEDs User Orders</title>
				<meta property="og:title" content="Glow LEDs User Orders" />
				<meta name="description" content="Glow LEDs User Orders" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
			<FlexContainer wrap h_between>
				<Link to="/account/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
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
			<div className="profile-orders profile_orders_container" style={{ overflowX: 'auto', width: '100%' }}>
				{/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}

				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Your Orders</h1>
				<Loading loading={loading} error={error}>
					{orders && (
						<div className="order-list responsive_table">
							<table className="table">
								<thead>
									<tr>
										<th>ID</th>
										<th>DATE</th>
										<th>TOTAL</th>
										<th>PAID</th>
										<th>SHIPPED</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr
											key={order._id}
											style={{
												backgroundColor: !order.isPaid
													? colors.not_paid
													: !order.isShipped ? colors.paid : colors.shipped
											}}
										>
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
												{order.isShipped ? (
													<i className="fas fa-check-circle" />
												) : (
													<i className="fas fa-times-circle" />
												)}
											</td>
											<td>
												<Link to={'/account/order/' + order._id}>
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
				</Loading>
			</div>
		</FlexContainer>
	);
};

export default UserOrderPage;
