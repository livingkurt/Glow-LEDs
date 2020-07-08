import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { Title } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../actions/userActions';
import { validate_contact } from '../utils/helper_functions';
// import "./form.css";

const ContactPage = () => {
	const dispatch = useDispatch();

	const [ name, set_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ order_number, set_order_number ] = useState('');
	const [ reason_for_contact, set_reason_for_contact ] = useState('');
	const [ message, set_message ] = useState('');

	const [ name_validations, set_name_Validations ] = useState('');
	const [ email_validations, set_email_validations ] = useState('');
	const [ order_number_validations, set_order_number_validations ] = useState('');
	const [ reason_for_contact_validations, set_reason_for_contact_validations ] = useState('');
	const [ message_validations, set_message_validations ] = useState('');

	const userContact = useSelector((state) => state.userContact);
	const { loading, completed, error } = userContact;

	const sendEmail = (e) => {
		e.preventDefault();
		const data = {
			name,
			email,
			order_number,
			reason_for_contact,
			message
		};
		const request = validate_contact(data);

		set_name_Validations(request.errors.name);
		set_email_validations(request.errors.email);
		set_order_number_validations(request.errors.order_number);
		set_reason_for_contact_validations(request.errors.reason_for_contact);
		set_message_validations(request.errors.message);

		console.log(request);
		if (request.isValid) {
			dispatch(
				contact({
					name,
					email,
					order_number,
					reason_for_contact,
					message
				})
			);
			e.target.reset();
		}
	};

	return (
		<BlockContainer class="main_container">
			<FlexContainer h_center>
				<h1>Contact</h1>
			</FlexContainer>
			<FlexContainer h_center>
				{loading && (
					<FlexContainer h_center column>
						<h2 style={{ textAlign: 'center' }}>Loading...</h2>
						<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
					</FlexContainer>
				)}
				{error && <h3>{error}</h3>}
				{completed && <h3>{completed}</h3>}
			</FlexContainer>
			<form style={{ display: 'flex', flexDirection: 'column' }} className="contact-form" onSubmit={sendEmail}>
				{/* <input onChange={(e) => set_contact_number(e.target.value)} className="zoom_f input_i" type="text" name="contact_number" /> */}
				<label>Name</label>
				<input
					onChange={(e) => set_name(e.target.value)}
					defaultValue={name}
					className="zoom_f input_i"
					type="text"
					name="name"
					placeholder="Name"
				/>
				<label className="validation_text">{name_validations}</label>
				<label>Email</label>
				<input
					onChange={(e) => set_email(e.target.value)}
					defaultValue={email}
					className="zoom_f input_i"
					type="text"
					name="email"
					placeholder="Email"
				/>
				<label className="validation_text">{email_validations}</label>
				<label>Order Number</label>
				<input
					onChange={(e) => set_order_number(e.target.value)}
					defaultValue={order_number}
					className="zoom_f input_i"
					type="text"
					name="order_number"
					placeholder="Order Number"
				/>
				<label className="validation_text">{order_number_validations}</label>
				<label>Reason for Contact</label>
				{/* <input onChange={(e) => set_}defaultValue={} className="zoom_f input_i" type="text" name="order_number" placeholder="Order Number" /> */}
				<select
					onChange={(e) => set_reason_for_contact(e.target.value)}
					defaultValue={reason_for_contact}
					className="input_i"
					name="reason_for_contact"
				>
					<option defaultValue="">-</option>
					<option defaultValue="order_issues">Order Issues</option>
					<option defaultValue="returns">Returns</option>
					<option defaultValue="technical_support">Technical Support</option>
				</select>
				<label className="validation_text">{reason_for_contact_validations}</label>
				<label>Message</label>
				<textarea
					onChange={(e) => set_message(e.target.value)}
					defaultValue={message}
					className="zoom_f input_i"
					name="message"
					placeholder="Enter Message Here"
				/>
				<label className="validation_text">{message_validations}</label>
				<input
					style={{ fontSize: '16px', width: '100px' }}
					className="zoom_b"
					id="button"
					type="submit"
					value="Send"
				/>
			</form>
		</BlockContainer>
	);
};

export default ContactPage;
