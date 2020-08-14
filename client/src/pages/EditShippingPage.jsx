import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const ProfilePage = (props) => {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const handleLogout = () => {
		dispatch(logout());
		props.history.push('/account/login');
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(update({ userId: userInfo._id, email, name, password }));
		history.push('/account/profile');
	};
	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

	useEffect(
		() => {
			if (userInfo) {
				console.log(userInfo.name);
				setEmail(userInfo.email);
				setName(userInfo.name);
				console.log(name);
				setPassword(userInfo.password);
			}
			// else {
			//   setEmail(email);
			//   setName(name);
			//   setPassword(password);
			// }
			dispatch(listMyOrders());
			return () => {};
		},
		[ userInfo ]
	);

	return (
		<FlexContainer class="profile_container" wrap styles={{ padding: '20px' }}>
			<MetaTags>
				<title>Glow LEDs Edit Shipping</title>
				<meta property="og:title" content="Glow LEDs Edit Shipping" />
				<meta name="description" content="Glow LEDs Edit Shipping" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								<h1 style={{ textAlign: 'center' }}>User Profile</h1>
							</li>
							<li>
								<FlexContainer h_center>
									<Loading loading={loading} error={error}>
										{success && <h3 style={{ textAlign: 'center' }}>Profile Saved Successfully</h3>}
									</Loading>
								</FlexContainer>
							</li>
							<li>
								<label htmlFor="name">Name</label>
								<input
									defaultValue={name}
									type="name"
									name="name"
									id="name"
									onChange={(e) => setName(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="email">Email</label>
								<input
									defaultValue={email}
									type="email"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="password">Password</label>
								<input
									defaultValue={password}
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</li>

							<li>
								<button type="submit" className="button primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/account/profile">
									<button type="button" className="button secondary full-width">
										Cancel
									</button>
								</Link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</FlexContainer>
	);
};

export default ProfilePage;
