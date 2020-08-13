import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import { CheckoutSteps } from '../components/SpecialtyComponents';
import { validate_shipping } from '../utils/helper_functions';

const ShippingPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);
	const { cartItems, shipping, payment } = cart;

	const [ first_name, set_first_name ] = useState(!shipping.first_name ? '' : shipping.first_name);
	const [ last_name, set_last_name ] = useState(!shipping.last_name ? '' : shipping.last_name);
	const [ address, setAddress ] = useState(!shipping.address ? '' : shipping.address);
	const [ city, setCity ] = useState(!shipping.city ? '' : shipping.city);
	const [ state, setState ] = useState(!shipping.state ? '' : shipping.state);
	const [ postalCode, setPostalCode ] = useState(!shipping.postalCode ? '' : shipping.postalCode);
	const [ country, setCountry ] = useState(!shipping.country ? '' : shipping.country);

	const [ first_name_validations, set_first_name_validations ] = useState('');
	const [ last_name_validations, set_last_name_validations ] = useState('');
	const [ address_validations, set_address_validations ] = useState('');
	const [ city_validations, set_city_validations ] = useState('');
	const [ state_validations, set_state_validations ] = useState('');
	const [ postal_code_validations, set_postal_code_validations ] = useState('');
	const [ country_validations, set_country_validations ] = useState('');
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const data = { first_name, last_name, address, city, state, postalCode, country };
		const request = validate_shipping(data);
		set_first_name_validations(request.errors.first_name);
		set_last_name_validations(request.errors.last_name);
		set_address_validations(request.errors.address);
		set_city_validations(request.errors.city);
		set_state_validations(request.errors.state);
		set_postal_code_validations(request.errors.postalCode);
		set_country_validations(request.errors.country);

		console.log(request);
		console.log(request.errors.email);
		if (request.isValid) {
			dispatch(
				saveShipping({
					first_name,
					last_name,
					email: userInfo.email,
					address,
					city,
					state,
					postalCode,
					country
				})
			);
			props.history.push('payment');
		}
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
								value={first_name}
								name="first_name"
								id="first_name"
								onChange={(e) => set_first_name(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{first_name_validations}
						</label>
						<li>
							<label htmlFor="last_name">Last Name</label>
							<input
								type="text"
								value={last_name}
								name="last_name"
								id="last_name"
								onChange={(e) => set_last_name(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{last_name_validations}
						</label>
						<li>
							<label htmlFor="address">Address</label>
							<input
								type="text"
								value={address}
								name="address"
								id="address"
								onChange={(e) => setAddress(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{address_validations}
						</label>
						<li>
							<label htmlFor="city">City</label>
							<input
								type="text"
								value={city}
								name="city"
								id="city"
								onChange={(e) => setCity(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{city_validations}
						</label>
						<li>
							<label htmlFor="state">State</label>
							<input
								type="text"
								value={state}
								name="state"
								id="state"
								onChange={(e) => setState(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{state_validations}
						</label>
						<li>
							<label htmlFor="postalCode">Postal Code</label>
							<input
								type="text"
								value={postalCode}
								name="postalCode"
								id="postalCode"
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{postal_code_validations}
						</label>
						<li>
							<label htmlFor="country">Country</label>
							<input
								type="text"
								value={country}
								name="country"
								id="country"
								onChange={(e) => setCountry(e.target.value)}
							/>
						</li>
						<label className="validation_text" style={{ justifyContent: 'center' }}>
							{country_validations}
						</label>

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
