import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';
import { validate_registration } from '../utils/helper_functions';

const RegisterPage = (props) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const [ name_validations, setNameValidations ] = useState('');
	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
	// useEffect(() => {
	//   console.log(userInfo)
	//   if (userInfo) {
	//     props.history.push(redirect);
	//   }
	// }, [userInfo]);

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(register(name, email, password));
	// 	// dispatch(email_registration(name, email, password));
	// 	props.history.push(redirect);
	// };

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { name, email, password, rePassword };
		const request = validate_registration(data);

		setNameValidations(request.errors.name);
		setEmailValidations(request.errors.email);
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);
		console.log(request);
		if (request.isValid) {
			dispatch(register(name, email, password));
			props.history.push('/checkemail');
		}
	};

	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						{/* <h2>Create Account</h2> */}
						<FlexContainer>
							<h1 style={{ width: '100%', marginRight: '-40px' }}>Create</h1>{' '}
							<h1 style={{ width: '100%' }}>Account</h1>
						</FlexContainer>
					</li>
					<li>
						<FlexContainer h_center>
							{loading && (
								<FlexContainer h_center column>
									<img src="loading.gif" className="loading_gif" alt="loading" />
									<h3 style={{ textAlign: 'center' }}>
										If pages doesn't show in 5 seconds, refresh the page.
									</h3>
								</FlexContainer>
							)}
							{error && <h3 style={{ textAlign: 'center' }}>{error}</h3>}
						</FlexContainer>
					</li>
					<li>
						<label htmlFor="name">Name</label>
						<input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
					</li>
					<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
						{name_validations}
					</label>
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
						<label htmlFor="rePassword">Re-Enter Password</label>
						<input
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
							Register
						</button>
					</li>
					<li>
						Already have an account?
						<Link
							to={redirect === '/' ? 'login' : 'login?redirect=' + redirect}
							className="button secondary text-center"
						>
							Sign In Here
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default RegisterPage;
