import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';
import { validate_registration } from '../utils/helper_functions';
import { Loading } from '../components/UtilityComponents';

const RegisterPage = (props) => {
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const [ first_name_validations, setFirstNameValidations ] = useState('');
	const [ last_name_validations, setLastNameValidations ] = useState('');
	const [ email_validations, setEmailValidations ] = useState('');
	const [ password_validations, setPasswordValidations ] = useState('');
	const [ re_password_validations, setRePasswordValidations ] = useState('');

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { first_name, last_name, email, password, rePassword };
		const request = validate_registration(data);

		setFirstNameValidations(request.errors.first_name);
		setLastNameValidations(request.errors.first_name);
		setEmailValidations(request.errors.email);
		setPasswordValidations(request.errors.password);
		setRePasswordValidations(request.errors.rePassword);
		console.log(request);
		if (request.isValid) {
			dispatch(register(first_name, last_name, email, password));
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
							<Loading loading={loading} error={error} />
						</FlexContainer>
					</li>

					<li>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							required
							autocomplete="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</li>
					<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
						{email_validations}
					</label>
					<li>
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
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
							type="text"
							name="last_name"
							id="last_name"
							onChange={(e) => set_last_name(e.target.value)}
						/>
					</li>
					<label className="validation_text" styles={{ fontSize: 16, justifyContent: 'center' }}>
						{last_name_validations}
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
