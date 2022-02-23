import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Email = ({ email, set_email }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [ login, set_login ] = useState(userInfo.hasOwnProperty('first_name') ? true : false);
	return (
		<div>
			<h2>Email</h2>
			<div className="w-100per">
				<ul className="shipping-container">
					<li>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							value={email}
							name="email"
							id="email"
							onChange={(e) => set_email(e.target.value)}
						/>
					</li>
					{login && (
						<li>
							<label htmlFor="email">Password</label>
							<input
								type="text"
								value={email}
								name="email"
								id="email"
								onChange={(e) => set_email(e.target.value)}
							/>
						</li>
					)}
					<pre className="phrase_font">
						You'll receieve receipts and notifications at this email address.{'\n'}Already have an account?{' '}
						<button className="btn nav title_font">Login</button>
					</pre>
					<li>
						<button type="submit" className="btn primary">
							Continue
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Email;
