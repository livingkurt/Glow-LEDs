import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../../actions/userActions';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const GuestCheckoutPage = (props) => {
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
		props.history.push('/account/login');
	};
	return (
		<div className="form">
			<MetaTags>
				<title>Guest Decision | Glow LEDs</title>
				<meta property="og:title" content="Guest Decision | Glow LEDs" />
				<meta name="twitter:title" content="Guest Decision | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/account/decision" />
				<meta property="og:url" content="https://www.glow-leds.com/account/decision" />
			</MetaTags>
			<form onSubmit={submitHandler}>
				<ul className="form-container">
					{/* <li>
						<h1 styles={{ width: '100%' }}>Guest Decision</h1>{' '}
					</li> */}
					<li>
						<h2>Continue as User</h2>
						<Link to="/account/login?redirect=/secure/checkout/placeorder">
							<button className="button primary full-width">Login</button>
						</Link>
					</li>
					{/* <li>
						<h2>Continue as User</h2>
						<Link to="/account/register?redirect=/account/login?redirect=/secure/checkout/placeorder">
							<button className="button primary full-width">Register</button>
						</Link>
					</li> */}
					<li>
						<h2>Continue as Guest</h2>
						<Link to="/checkout/placeorder">
							<button className="button primary full-width">Guest Checkout</button>
						</Link>
					</li>
				</ul>
			</form>
		</div>
	);
};
export default GuestCheckoutPage;
