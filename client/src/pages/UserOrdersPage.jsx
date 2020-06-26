import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update, token } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

const ProfilePage = (props) => {
	// const [name, setName] = useState('');
	// const [password, setPassword] = useState('');
	// const [email, setEmail] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ user_orders_page: userInfo });
	// const handleLogout = () => {
	//   dispatch(logout());
	//   props.history.push("/login");
	// }
	// const submitHandler = (e) => {
	//   e.preventDefault();
	//   dispatch(update({ userId: userInfo._id, email, name, password }))
	// }
	// const userUpdate = useSelector(state => state.userUpdate);
	// const { loading, success, error } = userUpdate;

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

	// const userToken = useSelector(state => state.userToken);
	// const { to } = userToken;
	// console.log({ userToken })

	// useEffect(() => {
	//   dispatch(token());
	// }, [errorOrders]);

	useEffect(
		() => {
			// if (userInfo) {
			//   console.log(userInfo.name)
			//   setEmail(userInfo.email);
			//   setName(userInfo.name);
			//   setPassword(userInfo.password);
			// }
			dispatch(listMyOrders());
		},
		[ userInfo ]
	);

	return (
		<FlexContainer class="profile_container" wrap column styles={{ padding: '20px' }}>
			{/* <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <ul className="form-container">
            <li>
              <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >User Profile</Title>
            </li>
            <li>
              {loading && <Title styles={{ fontSize: 20 }} ></Title>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input defaultValue={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input defaultValue={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input defaultValue={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Update</button>
            </li>
            <li>

              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div> */}
			<div className="profile-orders profile_orders_container" style={{ overflowX: 'auto' }}>
				{/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}
				<FlexContainer>
					<Link to="/profile">
						<Title
							class="back_button"
							styles={{ fontSize: '2rem', alignItem: 'flex-start', margin: '5px' }}
						>
							Back to Profile
						</Title>
					</Link>
				</FlexContainer>
				<Title styles={{ fontSize: 30, textAlign: 'center', width: '100%', justifyContent: 'center' }}>
					Orders
				</Title>
				{loadingOrders ? (
					<FlexContainer h_center column>
						<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
						<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
							If pages doesn't show in 5 seconds, refresh the page.
						</Title>
					</FlexContainer>
				) : errorOrders ? (
					<div>{errorOrders} </div>
				) : (
					<BlockContainer class="table_container" styles={{ padding: '0' }}>
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
												<ButtonSymbol>
													<i className="fas fa-info-circle" />
												</ButtonSymbol>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</BlockContainer>
				)}
			</div>
		</FlexContainer>
	);
};

export default ProfilePage;
