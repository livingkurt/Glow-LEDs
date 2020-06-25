import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
// import { email_registration } from '../actions/emailActions';
import { FlexContainer } from '../components/ContainerComponents';

function RegisterPage(props) {
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
						{/* <h2>Create Account</h2> */}
						<FlexContainer>
							<Title styles={{ width: '100%' }}>Reset Password</Title>{' '}
							{/* <Title styles={{ width: '100%' }}>Account</Title> */}
						</FlexContainer>
					</li>
					<li>
						{/* <FlexContainer h_center>
							{loading && (
								<FlexContainer h_center column>
									<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
									<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
										If pages doesn't show in 5 seconds, refresh the page.
									</Title>
								</FlexContainer>
							)}
							{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
						</FlexContainer> */}
					</li>
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
}
export default RegisterPage;
