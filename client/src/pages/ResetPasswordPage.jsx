import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';

const RegisterPage = (props) => {
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');
	// const userRegister = useSelector((state) => state.userRegister);
	// const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	// const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(reset_password(props.match.params.id, password, rePassword));
		// dispatch(email_registration(name, email, password));
		props.history.push('/login');
	};
	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						<FlexContainer>
							<h1 styles={{ width: '100%' }}>Reset Password</h1>{' '}
						</FlexContainer>
					</li>
					<li />
					<li>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="rePassword">Re-Enter Password</label>
						<input
							type="password"
							id="rePassword"
							name="rePassword"
							onChange={(e) => setRePassword(e.target.value)}
						/>
					</li>
					<li>
						<button type="submit" className="button primary">
							Reset Password
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default RegisterPage;
