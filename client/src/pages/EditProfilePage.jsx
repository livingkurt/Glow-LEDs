import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display, validate_profile } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

const EditProfilePage = (props) => {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');

	const [ name_validations, setNameValidations ] = useState('');
	const [ email_validations, setEmailValidations ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(update({ userId: userInfo._id, email, name, password }));
	// 	history.push('/profile');
	// };

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { name, email };
		const request = validate_profile(data);

		setNameValidations(request.errors.name);
		setEmailValidations(request.errors.email);

		console.log(request);
		if (request.isValid) {
			dispatch(update({ userId: userInfo._id, email, name }));
			history.push('/profile');
		}
	};
	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	useEffect(
		() => {
			if (userInfo) {
				setEmail(userInfo.email);
				setName(userInfo.name);
				// setPassword(userInfo.password);
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
				// setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<FlexContainer class="profile_container" column styles={{ padding: '20px' }}>
			<FlexContainer>
				<Link to="/profile">
					<button className="button_main">Back to Profile</button>
				</Link>
			</FlexContainer>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								{/* <h2>User Profile</h2> */}
								<Title styles={{ fontSize: 30, textAlign: 'center', width: '100%' }}>
									User Profile
								</Title>
							</li>
							<li>
								<FlexContainer h_center>
									{loading && (
										<FlexContainer h_center column>
											<Title styles={{ fontSize: 20 }}>Loading...</Title>
											<Title styles={{ fontSize: 20 }}>
												If pages doesn't show in 5 seconds, refresh the page.
											</Title>
										</FlexContainer>
									)}
									{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
									{success && <Title styles={{ fontSize: 20 }}>Profile Saved Successfully</Title>}
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
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{name_validations}
							</label>
							<li>
								<label htmlFor="email">Email</label>
								<input
									defaultValue={email}
									type="text"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{email_validations}
							</label>
							{/* <li>
              <label htmlFor="password">Password</label>
              <input defaultValue={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li> */}

							<li>
								<button type="submit" className="button primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/profile">
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

export default EditProfilePage;
