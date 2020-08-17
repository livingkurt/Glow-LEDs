import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update, reset_password } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { validate_password_change } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const ChangePasswordPage = (props) => {
	const history = useHistory();
	const [ current_password, setCurrentPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const dispatch = useDispatch();

	const [ current_password_validations, setCurrentPasswordValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(update({ userId: userInfo._id, email, name, password }));
	// 	history.push('/secure/account/profile');
	// };

	const submitHandler = async (e) => {
		e.preventDefault();
		const validation_data = { id: userInfo._id, current_password, password, rePassword };
		// console.log({ data });
		const request = await validate_password_change(validation_data);
		console.log({ request });
		setCurrentPasswordValidations(request.errors.current_password);
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);

		if (request.isValid) {
			dispatch(reset_password(userInfo._id, password, rePassword));
			history.push('/secure/account/profile');
		}
	};

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	useEffect(
		() => {
			if (userInfo) {
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
				setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<FlexContainer class="profile_container" column styles={{ padding: '20px' }}>
			<MetaTags>
				<title>Change Password | Glow LEDs</title>
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
			<FlexContainer styles={{ marginBottom: 10 }}>
				<Link to="/secure/account/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
			</FlexContainer>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								<h1 style={{ textAlign: 'center' }}>Change Password</h1>
							</li>
							<li>
								<Loading loading={loading} error={error}>
									<FlexContainer h_center>
										{success && <h3>Profile Saved Successfully</h3>}
									</FlexContainer>
								</Loading>
							</li>
							<li>
								<label htmlFor="current_password">Current Password</label>
								<input
									className="form_input"
									defaultValue={current_password}
									type="password"
									id="current_password"
									name="current_password"
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{current_password_validations}
							</label>
							<li>
								<label htmlFor="password">Password</label>
								<input
									className="form_input"
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{password_validations}
							</label>
							<li>
								<label htmlFor="rePassword">Re-Enter Password</label>
								<input
									className="form_input"
									type="password"
									id="rePassword"
									name="rePassword"
									onChange={(e) => setRePassword(e.target.value)}
								/>
							</li>
							<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
								{re_password_validations}
							</label>
							<li>
								<button type="submit" className="button primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/secure/account/profile">
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

export default ChangePasswordPage;
