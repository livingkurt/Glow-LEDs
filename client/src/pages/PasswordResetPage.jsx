import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { password_reset } from '../actions/userActions';
import { Title } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';

function PasswordResetPage(props) {
	const [ email, setEmail ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo, error } = userLogin;
	const dispatch = useDispatch();
	// useEffect(
	// 	() => {
	// 		if (userInfo) {
	// 			props.history.push(redirect);
	// 		}
	// 		return () => {
	// 			//
	// 		};
	// 	},
	// 	[ userInfo ]
	// );

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(password_reset(email));
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
}
export default PasswordResetPage;
