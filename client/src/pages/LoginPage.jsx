import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';
import { validate_login } from '../utils/helper_functions';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

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
			<MetaTags>
				<title>Login | Glow LEDs</title>
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
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li style={{ display: 'flex', flexDirection: 'column' }}>
						<h1>Login </h1>
					</li>
					<li>
						<FlexContainer h_center>
							{/* <Loading loading={loading} error={error}> */}
							{error && (
								<label style={{ textAlign: 'center' }}>
									{error ? 'User Not Found or Not Verified' : 'Logging In'}
								</label>
							)}
							{/* </Loading> */}
						</FlexContainer>
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
					</li>
					<label className="validation_text" style={{ textAlign: 'center' }}>
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
					<label className="validation_text" style={{ textAlign: 'center' }}>
						{password_validations}
					</label>

					<li>
						<button type="submit" className="button primary">
							Login
						</button>
					</li>
					<li>
						<Link to="/account/passwordreset" style={{ fontFamily: 'heading_font' }}>
							<button className="button secondary full-width">Forgot Password?</button>
						</Link>
					</li>
					<li>New to Glow LEDs?</li>
					<li>
						<Link
							to={redirect === '/' ? 'account/register' : 'account/register?redirect=' + redirect}
							className="button secondary text-center"
						>
							Create Account
						</Link>
					</li>
					{/* <li style={{ marginBottom: '-20px' }}>
							<Link
								to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
								className="button secondary text-center"
							>
								New User
							</Link>
						</li> */}
				</ul>
			</form>
		</div>
	);
};
export default LoginPage;
