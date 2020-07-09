import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../components/ContainerComponents';

const ProfilePage = (props) => {
	const [ name, setName ] = useState('');
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
				setName(userInfo.name);
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
				setName(userUpdate.userInfo.name);
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
						<h3>Name</h3>
						<label>{name}</label>
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
						<Link to={'/editprofile'}>
							<button style={{ marginRight: '10px', maxWidth: '150px' }} className="button primary">
								Edit Profile
							</button>
						</Link>
					</div>
					<div style={{ height: 50 }}>
						<Link to={'/changepassword'}>
							<button style={{ marginRight: '10px', maxWidth: '210px' }} className="button primary">
								Change Password
							</button>
						</Link>
					</div>
					<div style={{ height: 50 }}>
						<Link to={'/userorders'}>
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
