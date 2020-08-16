import React, { useState } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../actions/userActions';
import { validate_contact } from '../utils/helper_functions';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
// import "./form.css";

const ContactPage = () => {
	const dispatch = useDispatch();

	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ order_number, set_order_number ] = useState('');
	const [ reason_for_contact, set_reason_for_contact ] = useState('');
	const [ message, set_message ] = useState('');

	const [ first_name_validations, set_first_name_Validations ] = useState('');
	const [ last_name_validations, set_last_name_Validations ] = useState('');
	const [ email_validations, set_email_validations ] = useState('');
	const [ order_number_validations, set_order_number_validations ] = useState('');
	const [ reason_for_contact_validations, set_reason_for_contact_validations ] = useState('');
	const [ message_validations, set_message_validations ] = useState('');

	const userContact = useSelector((state) => state.userContact);
	const { loading, completed, error } = userContact;

	let request;
	const sendEmail = (e) => {
		e.preventDefault();

		if ([ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact)) {
			set_order_number_validations('55555555');
		}
		const data = {
			first_name,
			last_name,
			email,
			// order_number,
			reason_for_contact,
			message
		};
		request = validate_contact(data);

		set_first_name_Validations(request.errors.first_name);
		set_last_name_Validations(request.errors.last_name);
		set_email_validations(request.errors.email);
		// if ([ 'order_issues', 'returns', 'technical_support' ].includes(reason_for_contact)) {
		// set_order_number_validations(request.errors.order_number);
		// }
		// else {
		set_order_number_validations(request.errors.order_number);
		// }
		set_reason_for_contact_validations(request.errors.reason_for_contact);
		set_message_validations(request.errors.message);

		console.log(request);
		if (request.isValid) {
			dispatch(contact(first_name, last_name, email, order_number, reason_for_contact, message));
			set_last_name_Validations('');
			set_first_name_Validations('');
			set_email_validations('');
			set_order_number_validations('');
			set_reason_for_contact_validations('');
			set_message_validations('');
			// e.target.reset();
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
			<MetaTags>
				<title>Contact | Glow LEDs</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1>Contact</h1>
			</FlexContainer>
			<FlexContainer h_center>
				<Loading loading={loading} error={error}>
					{completed && (
						<h3 style={{ textAlign: 'center' }}>
							{completed ? completed : request.isValid ? 'Error Sending Email' : ''}
						</h3>
					)}
				</Loading>
			</FlexContainer>
			<form style={{ display: 'flex', flexDirection: 'column' }} className="contact-form">
				<label>First Name</label>
				<input
					onChange={(e) => set_first_name(e.target.value)}
					defaultValue={first_name}
					className="zoom_f form_input"
					type="text"
					name="first_name"
					placeholder="First Name"
				/>
				<label className="validation_text">{first_name_validations}</label>
				<label>Last Name</label>
				<input
					onChange={(e) => set_last_name(e.target.value)}
					defaultValue={last_name}
					className="zoom_f form_input"
					type="text"
					name="last_name"
					placeholder="Last Name"
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

				<label>Reason for Contact</label>
				{/* <input onChange={(e) => set_}defaultValue={} className="zoom_f form_input" type="text" name="order_number" placeholder="Order Number" /> */}
				<select
					onChange={(e) => set_reason_for_contact(e.target.value)}
					defaultValue={reason_for_contact}
					className="form_input contact_dropdown"
					name="reason_for_contact"
					placeholder="----Click Here to Choose Reason----"
				>
					<option className="grey_option" disabled="disabled" selected="selected" value="">
						----Click Here to Choose Reason----
					</option>

					<option className="options" value="Didn't Recieve Verification Email">
						Didn't Recieve Verification Email
					</option>
					<option className="options" value="Order Issues">
						Order Issues
					</option>
					<option className="options" value="Returns">
						Returns
					</option>
					<option className="options" value="Technical Support">
						Technical Support
					</option>
					<option className="options" value="Website Bugs">
						Website Bugs
					</option>
					<option className="options" value="Custom Orders">
						Custom Orders
					</option>
					<option className="options" value="Product Suggestions">
						Product Suggestions
					</option>
					<option className="options" value="Submit Content to be Featured">
						Submit Content to be Featured
					</option>
				</select>
				<label className="validation_text">{reason_for_contact_validations}</label>
				{console.log({ reason_for_contact })}
				{[ 'Order Issues', 'Returns', 'Technical Support' ].includes(reason_for_contact) && (
					<div className="full-width">
						<label>Order Number</label>
						<input
							onChange={(e) => set_order_number(e.target.value)}
							defaultValue={order_number}
							className="zoom_f form_input full-width"
							type="text"
							name="order_number"
							placeholder="Order Number"
						/>
						<label className="validation_text">{order_number_validations}</label>
					</div>
				)}

				<label>Message</label>
				<textarea
					onChange={(e) => set_message(e.target.value)}
					defaultValue={message}
					className="zoom_f form_input"
					name="message"
					style={{ fontFamily: 'Helvetica' }}
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
				{[ 'Order Issues', 'Returns', 'Technical Support' ].includes(reason_for_contact) && (
					<p style={{ lineHeight: '25px' }}>
						You can find your order number by logging in and going to the drop down with your name on it and
						clicking orders. The order Number will be in the far left column. Or by checking the email you
						recieved for making your order.
					</p>
				)}

				{[ 'Submit Content to be Featured' ].includes(reason_for_contact) && (
					<div>
						<p>
							Put your facebook or instagram handle in the message. Then upload content using the google
							drive button below
						</p>

						<button className="zoom_b button primary">
							<a
								target="_blank"
								href="https://drive.google.com/drive/folders/1s4bztbzhIeUO01x32sz6A1Hl1bwzvmw3?usp=sharing"
							>
								Google Drive{' '}
							</a>
						</button>

						<h2>Content includes: </h2>
						<ul style={{ lineHeight: '25px', paddingLeft: '20px' }}>
							<li>Pictures or Video of your Lightshow with Glow LEDs Diffusers or Diffuser Caps. </li>
							<li>Pictures or Video of your Glow LEDs Infintiy Mirror.</li>
							<li>Pictures or Video of your Glow LEDs String Lights.</li>
						</ul>
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactPage;
