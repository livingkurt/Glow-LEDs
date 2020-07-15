import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { password_reset } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';

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
						<h1>Password Reset</h1>
					</li>
					<li>
						<Loading loading={loading} error={error}>
							{words && <h3 styles={{ textAlign: 'center' }}>{words}</h3>}
						</Loading>
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
