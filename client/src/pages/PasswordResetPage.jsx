import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { password_reset } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

const PasswordResetPage = (props) => {
	const [ email, setEmail ] = useState('');
	const userPasswordReset = useSelector((state) => state.userPasswordReset);
	const { loading, userInfo, error } = userPasswordReset;
	const dispatch = useDispatch();

	const [ words, setWords ] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(password_reset(email));
		setWords('Check your Email to Change your Password');
		// props.history.push(redirect);
	};
	return (
		<div className="form">
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					<li>
						{/* <h2>Login</h2> */}
						<Title class="h1_title">Password Reset</Title>
					</li>
					<li>
						{loading ? (
							<FlexContainer h_center column>
								<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
								<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
									If pages doesn't show in 5 seconds, refresh the page.
								</Title>
							</FlexContainer>
						) : error ? (
							<FlexContainer h_center>
								<Title styles={{ fontSize: 20 }}>{error} </Title>
							</FlexContainer>
						) : (
							<Title styles={{ fontSize: 20, justifyContent: 'center' }}>{words}</Title>
						)}
					</li>
					<li>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
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
export default PasswordResetPage;
