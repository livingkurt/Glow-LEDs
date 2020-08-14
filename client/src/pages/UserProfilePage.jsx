import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../components/ContainerComponents';
import { detailsUser } from '../actions/userActions';
import { Loading } from '../components/UtilityComponents';

const UserProfilePage = (props) => {
	// const history = useHistory();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;
	console.log({ user });
	console.log({ id: props.match.params.id });
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ verified, set_verified ] = useState();
	const [ admin, set_admin ] = useState();
	// const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateUser = useSelector((state) => state.userUpdateUser);
	const { loading: userLoading, userInfo: userUpdate, error: userError } = userUpdateUser;
	useEffect(() => {
		dispatch(detailsUser(props.match.params.id));
		return () => {};
	}, []);

	useEffect(
		() => {
			if (user) {
				setEmail(user.email);
				set_first_name(user.first_name);
				set_last_name(user.last_name);
				set_verified(user.isVerified);
				set_admin(user.isAdmin);
			}
			return () => {};
		},
		[ user ]
	);

	useEffect(
		() => {
			if (userUpdate) {
				setEmail(userUpdate.email);
				set_first_name(userUpdate.first_name);
				set_last_name(userUpdate.last_name);
				set_verified(userUpdate.isVerified);
				set_admin(userUpdate.isAdmin);
				// setPassword(userUpdate.password);
			}
			return () => {};
		},
		[ userUpdate ]
	);

	const container_styles = {
		marginBottom: '20px'
	};

	return (
		<FlexContainer column styles={{ padding: '20px' }} class="inner_content">
			<FlexContainer>
				<h1 style={{ textAlign: 'center', width: '100%' }}>{first_name}'s Profile</h1>
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{user && (
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
							<FlexContainer column styles={container_styles}>
								<h3>Verified</h3>
								<label>{verified === true ? 'Verified' : 'Not Verified'}</label>
							</FlexContainer>
							<FlexContainer column styles={container_styles}>
								<h3>Admin</h3>
								<label>{admin === true ? 'Admin' : 'Not Admin'}</label>
							</FlexContainer>
						</FlexContainer>
						<FlexContainer>
							<div style={{ height: 50 }}>
								<Link to={'/admin/edituserprofile'}>
									<button
										style={{ marginRight: '10px', maxWidth: '150px' }}
										className="button primary"
									>
										Edit Profile
									</button>
								</Link>
							</div>
							<div style={{ height: 50 }}>
								<Link to={'/account/changepassword'}>
									<button
										style={{ marginRight: '10px', maxWidth: '210px' }}
										className="button primary"
									>
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
				)}
			</Loading>
		</FlexContainer>
	);
};

export default UserProfilePage;
