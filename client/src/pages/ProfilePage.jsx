import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../components/ContainerComponents';

const ProfilePage = (props) => {
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (userInfo) {
				setEmail(userInfo.email);
				set_first_name(userInfo.first_name);
				set_last_name(userInfo.last_name);
				setPassword(userInfo.password);
			}
			dispatch(listMyOrders());
			return () => {};
		},
		[ userInfo ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setEmail(userUpdate.userInfo.email);
				set_first_name(userUpdate.userInfo.first_name);
				set_last_name(userUpdate.userInfo.last_name);
				setPassword(userUpdate.userInfo.password);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	const container_styles = {
		marginBottom: '20px'
	};

	return (
		<FlexContainer column styles={{ padding: '20px' }} class="inner_content">
			<FlexContainer>
				<h1 style={{ textAlign: 'center', width: '100%' }}>User Profile</h1>
			</FlexContainer>
			<FlexContainer class="profile_container" row h_between wrap>
				<FlexContainer column>
					<FlexContainer column styles={container_styles}>
						<h3>First Name</h3>
						<label>{first_name}</label>
					</FlexContainer>
					<FlexContainer column styles={container_styles}>
						<h3>Last Name</h3>
						<label>{last_name}</label>
					</FlexContainer>
					<FlexContainer column styles={container_styles}>
						<h3>Email</h3>
						<label>{email}</label>
					</FlexContainer>
					<FlexContainer column styles={container_styles}>
						<h3>Password</h3>
						<label>**********</label>
					</FlexContainer>
				</FlexContainer>
				<FlexContainer>
					<div style={{ height: 50 }}>
						<Link to={'/account/editprofile'}>
							<button style={{ marginRight: '10px', maxWidth: '150px' }} className="button primary">
								Edit Profile
							</button>
						</Link>
					</div>
					<div style={{ height: 50 }}>
						<Link to={'/account/changepassword'}>
							<button style={{ marginRight: '10px', maxWidth: '210px' }} className="button primary">
								Change Password
							</button>
						</Link>
					</div>
					<div style={{ height: 50 }}>
						<Link to={'/account/orders'}>
							<button style={{ maxWidth: '150px' }} className="button primary">
								View Orders
							</button>
						</Link>
					</div>
				</FlexContainer>
			</FlexContainer>
		</FlexContainer>
	);
};

export default ProfilePage;
