import React, { useState } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../actions/userActions';
import { validate_contact } from '../utils/helper_functions';
import { Loading } from '../components/UtilityComponents';
// import "./form.css";

const ContactPage = () => {
	const dispatch = useDispatch();

	const [ username, set_username ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ order_number, set_order_number ] = useState('');
	const [ reason_for_contact, set_reason_for_contact ] = useState('');
	const [ message, set_message ] = useState('');

	const [ username_validations, set_username_Validations ] = useState('');
	const [ first_name_validations, set_first_name_Validations ] = useState('');
	const [ last_name_validations, set_last_name_Validations ] = useState('');
	const [ email_validations, set_email_validations ] = useState('');
	const [ order_number_validations, set_order_number_validations ] = useState('');
	const [ reason_for_contact_validations, set_reason_for_contact_validations ] = useState('');
	const [ message_validations, set_message_validations ] = useState('');

	const userContact = useSelector((state) => state.userContact);
	const { loading, completed, error } = userContact;

	const sendEmail = (e) => {
		e.preventDefault();
		const data = {
			username,
			first_name,
			last_name,
			email,
			order_number,
			reason_for_contact,
			message
		};
		const request = validate_contact(data);

		set_username_Validations(request.errors.username);
		set_first_name_Validations(request.errors.first_name);
		set_last_name_Validations(request.errors.last_name);
		set_email_validations(request.errors.email);
		set_order_number_validations(request.errors.order_number);
		set_reason_for_contact_validations(request.errors.reason_for_contact);
		set_message_validations(request.errors.message);

		console.log(request);
		if (request.isValid) {
			dispatch(contact(username, first_name, last_name, email, order_number, reason_for_contact, message));
			set_username_Validations('');
			set_last_name_Validations('');
			set_first_name_Validations('');
			set_email_validations('');
			set_order_number_validations('');
			set_reason_for_contact_validations('');
			set_message_validations('');
			// e.target.reset();
			document.getElementsByName('username').value = '';
			document.getElementsByName('first_name').value = '';
			document.getElementsByName('last_name').value = '';
			document.getElementsByName('email').value = '';
			document.getElementsByName('order_number').value = '';
			document.getElementsByName('reason_for_contact').value = '';
			document.getElementsByName('message').value = '';
		}
	};

	return (
		<div class="main_container">
			<FlexContainer h_center>
				<h1>Contact</h1>
			</FlexContainer>
			<FlexContainer h_center>
				<Loading loading={loading} error={error}>
					{completed && <h3 style={{ textAlign: 'center' }}>{completed}</h3>}
				</Loading>
			</FlexContainer>
			<form style={{ display: 'flex', flexDirection: 'column' }} className="contact-form" onSubmit={sendEmail}>
				{/* <input onChange={(e) => set_contact_number(e.target.value)} className="zoom_f input_i" type="text" username="contact_number" /> */}
				<label>Name</label>
				<input
					onChange={(e) => set_username(e.target.value)}
					defaultValue={username}
					className="zoom_f form_input"
					type="text"
					name="username"
					placeholder="Name"
				/>
				<label className="validation_text">{username_validations}</label>
				<input
					onChange={(e) => set_first_name(e.target.value)}
					defaultValue={first_name}
					className="zoom_f form_input"
					type="text"
					name="first_name"
					placeholder="Name"
				/>
				<label className="validation_text">{first_name_validations}</label>
				<input
					onChange={(e) => set_last_name(e.target.value)}
					defaultValue={last_name}
					className="zoom_f form_input"
					type="text"
					name="last_name"
					placeholder="Name"
				/>
				<label className="validation_text">{last_name_validations}</label>
				<label>Email</label>
				<input
					onChange={(e) => set_email(e.target.value)}
					defaultValue={email}
					className="zoom_f form_input"
					type="text"
					name="email"
					placeholder="Email"
				/>
				<label className="validation_text">{email_validations}</label>
				<label>Order Number</label>
				<input
					onChange={(e) => set_order_number(e.target.value)}
					defaultValue={order_number}
					className="zoom_f form_input"
					type="text"
					name="order_number"
					placeholder="Order Number"
				/>
				<label className="validation_text">{order_number_validations}</label>
				<label>Reason for Contact</label>
				{/* <input onChange={(e) => set_}defaultValue={} className="zoom_f form_input" type="text" name="order_number" placeholder="Order Number" /> */}
				<select
					onChange={(e) => set_reason_for_contact(e.target.value)}
					defaultValue={reason_for_contact}
					className="form_input"
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
					className="zoom_f form_input"
					name="message"
					placeholder="Enter Message Here"
				/>
				<label className="validation_text">{message_validations}</label>
				<button
					style={{ width: '100px' }}
					className="zoom_b button primary"
					id="button"
					onClick={(e) => sendEmail(e)}
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default ContactPage;
