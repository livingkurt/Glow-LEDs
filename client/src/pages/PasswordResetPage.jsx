import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { password_reset } from '../actions/userActions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

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
			<MetaTags>
				<title>Glow LEDs Password Reset</title>
				<meta property="og:title" content="Glow LEDs Password Reset" />
				<meta name="description" content="Glow LEDs Password Reset" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
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
							Verify Email
						</button>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default PasswordResetPage;
