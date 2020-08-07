import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import { CheckoutSteps } from '../components/SpecialtyComponents';

const ShippingPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ city, setCity ] = useState('');
	const [ state, setState ] = useState('');
	const [ postalCode, setPostalCode ] = useState('');
	const [ country, setCountry ] = useState('');
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShipping({ first_name, last_name, email: userInfo.email, address, city, state, postalCode, country })
		);
		props.history.push('payment');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 />
			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<ul className="form-container">
						<li>
							<h1 style={{ textAlign: 'center', width: '100%' }}>Shipping</h1>
						</li>
						<li>
							<label htmlFor="first_name">First Name</label>
							<input
								type="text"
								name="first_name"
								id="first_name"
								onChange={(e) => set_first_name(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="last_name">Last Name</label>
							<input
								type="text"
								name="last_name"
								id="last_name"
								onChange={(e) => set_last_name(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								id="address"
								onChange={(e) => setAddress(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="city">City</label>
							<input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
						</li>
						<li>
							<label htmlFor="state">State</label>
							<input type="text" name="state" id="state" onChange={(e) => setState(e.target.value)} />
						</li>
						<li>
							<label htmlFor="postalCode">Postal Code</label>
							<input
								type="text"
								name="postalCode"
								id="postalCode"
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</li>
						<li>
							<label htmlFor="country">Country</label>
							<input
								type="text"
								name="country"
								id="country"
								onChange={(e) => setCountry(e.target.value)}
							/>
						</li>

						<li>
							<button type="submit" className="button primary">
								Continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};
export default ShippingPage;
