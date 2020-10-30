import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update, token } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

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

	// const colors = [
	// 	{ name: 'Not Paid', color: '#333333' },
	// 	{ name: 'Paid', color: '#626262' },
	// 	{ name: 'Shipped', color: '#8e8e8e' },
	// 	{ name: 'Delivered', color: '#ababab' }
	// ];

	// const determine_color = (order) => {
	// 	let result = '';
	// 	if (!order.isPaid) {
	// 		result = colors[0].color;
	// 	}
	// 	if (order.isPaid) {
	// 		result = colors[1].color;
	// 	}
	// 	if (order.isShipped) {
	// 		result = colors[2].color;
	// 	}
	// 	if (order.isDelivered) {
	// 		result = colors[3].color;
	// 	}
	// 	console.log(result);
	// 	return result;
	// };

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

	return (
		<FlexContainer class="profile_container" wrap column styles={{ padding: '20px' }}>
			<Helmet>
				<title>My Orders | Glow LEDs</title>
				<meta property="og:title" content="My Orders | Glow LEDs" />
				<meta name="twitter:title" content="My Orders | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/orders" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/orders" />
			</Helmet>
			<FlexContainer wrap h_between>
				<Link to="/secure/account/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
				{colors.map((color) => {
					return (
						<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
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
				{/* <FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
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
				</FlexContainer> */}
			</FlexContainer>
			<div className="profile-orders profile_orders_container" style={{ width: '100%' }}>
				{/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}

				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>My Orders</h1>
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
											<td style={{ minWidth: '50px', width: '50px' }}>
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
												<Link to={'/secure/account/order/' + order._id}>
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
