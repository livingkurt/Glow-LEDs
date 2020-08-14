import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { validate_profile } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';

const EditProfilePage = (props) => {
	const history = useHistory();
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, setEmail ] = useState('');

	const [ first_name_validations, setFirstnameValidations ] = useState('');
	const [ last_name_validations, setLastNameValidations ] = useState('');
	const [ email_validations, setEmailValidations ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { first_name, last_name, email };
		const request = validate_profile(data);

		setFirstnameValidations(request.errors.first_name);
		setLastNameValidations(request.errors.last_name);
		setEmailValidations(request.errors.email);

		console.log(request);
		if (request.isValid) {
			dispatch(update({ userId: userInfo._id, email, first_name, last_name }));
			history.push('/account/profile');
		}
	};
	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	useEffect(
		() => {
			if (userInfo) {
				setEmail(userInfo.email);
				set_first_name(userInfo.first_name);
				set_last_name(userInfo.last_name);
				// setPassword(userInfo.password);
			}
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
				// setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<FlexContainer class="profile_container" column styles={{ padding: '20px' }}>
			<FlexContainer styles={{ marginBottom: 10 }}>
				<Link to="/account/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
			</FlexContainer>
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
								<label htmlFor="first_name">First Name</label>
								<input
									defaultValue={first_name}
									type="first_name"
									name="first_name"
									id="first_name"
									onChange={(e) => set_first_name(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{first_name_validations}
							</label>
							<li>
								<label htmlFor="last_name">Last Name</label>
								<input
									defaultValue={last_name}
									type="last_name"
									name="last_name"
									id="last_name"
									onChange={(e) => set_last_name(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{last_name_validations}
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

export default EditProfilePage;
