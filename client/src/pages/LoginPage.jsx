import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';
import { validate_login } from '../utils/helper_functions';

const LoginPage = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;
	const dispatch = useDispatch();
	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	useEffect(
		() => {
			if (userInfo) {
				props.history.push(redirect);
			}
			return () => {
				//
			};
		},
		[ userInfo ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { email, password };
		const request = validate_login(data);

		setEmailValidations(request.errors.email);
		setPasswordValidations(request.errors.password);

		if (request.isValid) {
			dispatch(login(email, password));
		}
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						{/* <h2>Login</h2> */}
						<h1>Login</h1>
					</li>
					<li>
						<FlexContainer h_center>
							{loading && (
								<div>
									<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
									<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
										If pages doesn't show in 5 seconds, refresh the page.
									</Title>
								</div>
							)}
							{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
						</FlexContainer>
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</li>
					<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
						{email_validations}
					</label>
					<li>
						<label htmlFor="password">Password</label>
						<input
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
						<Link to="/passwordreset" style={{ fontFamily: 'heading_font' }}>
							Forgot Password?
						</Link>
					</li>
					<li>
						<button type="submit" className="button primary">
							Login
						</button>
					</li>
					<li style={{ fontFamily: 'heading_font' }}>New to Glow LEDs?</li>
					<li>
						<Link
							to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
							className="button secondary text-center"
						>
							Create your Glow LED account
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default LoginPage;
