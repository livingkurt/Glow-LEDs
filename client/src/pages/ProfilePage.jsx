import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

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
			<MetaTags>
				<title>Profile | Glow LEDs</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
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
						<Link to={'/secure/account/editprofile'}>
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
						<Link to={'/secure/account/orders'}>
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
