import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { validate_login } from '../../utils/validations';
import MetaTags from 'react-meta-tags';
import { Loading } from '../../components/UtilityComponents';

const LoginPage = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;
	console.log({ userLogin });
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
				<meta property="og:title" content="Login | Glow LEDs" />
				<meta name="twitter:title" content="Login | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/account/login" />
				<meta property="og:url" content="https://www.glow-leds.com/account/login" />
				<meta
					name="description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
				<meta
					property="og:description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
				<meta
					name="twitter:description"
					content="Come in the LEDs are fine. Come into our Glowing realm of wonderfulness. Where you just might find what you have been missing."
				/>
			</MetaTags>

			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li style={{ display: 'flex', flexDirection: 'column' }}>
						<h1>Login </h1>
					</li>
					<Loading loading={loading} error={error} />
					{/* <div>
						{loading ? (
							<div className="jc-c column">
								<img
									src={process.env.PUBLIC_URL + '/loading.gif'}
									className="loading_gif"
									alt="loading"
								/>
								<img
									src={process.env.PUBLIC_URL + '/loading_overlay.png'}
									className="loading_png"
									alt="loading"
								/>
							</div>
						) : error ? (
							<div className="error_message jc-c column">
								<h2 className="ta-c mv-5px">Error: {error}</h2>
							</div>
						) : (
							''
						)}
					</div> */}
					{/* <li>
						<FlexContainer h_center>
							{error && (
								<label style={{ textAlign: 'center' }}>
									{error ? 'User Not Found or Not Verified' : 'Logging In'}
								</label>
							)}
						</FlexContainer>
					</li> */}
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
							to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
							className="button primary text-center"
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
