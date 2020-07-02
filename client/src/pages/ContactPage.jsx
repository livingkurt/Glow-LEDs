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
				<Title styles={{ fontSize: 40 }}>Contact</Title>
			</FlexContainer>
			<FlexContainer h_center>
				{loading && (
					<FlexContainer h_center column>
						<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
						<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
							If pages doesn't show in 5 seconds, refresh the page.
						</Title>
					</FlexContainer>
				)}
				{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
				{completed && <Title styles={{ fontSize: 20 }}>{completed}</Title>}
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
			<BlockContainer>
				<Title styles={{ fontSize: 40, justifyContent: 'center' }}>Glow-LEDs.com Support</Title>
				<Title styles={{ fontSize: 30, justifyContent: 'center' }}>Processing/Shipping</Title>
				<p>
					Glow-LEDs.com is headquartered in Austin, Texas and orders are processed as they are recieved.
					Products are not stocked waiting to be shipped at this time. Each order will be filled as it is
					recieved. Some orders may take longer to be shipped as supplies may take time to be sourced. All
					orders ship USPS First Class or Priority Mail, and send out when assembly is completed.
				</p>
				<Title styles={{ fontSize: 30, justifyContent: 'center' }}>Returns/Cancellations</Title>
				<p>
					Your satisfaction is our priority! We accept returns on unused factory sealed product within 30 days
					of purchase. Unfortunately we can not accept returns on used items. All returns are subject to a 30%
					restocking fee (you will be refunded 70% of the original purchase price). To initiate a return
					please contact support. You will be supplied with an address to send your product. Please put your
					full name and order number in the return shipment and you will be refunded.
				</p>
				<Title styles={{ fontSize: 30, justifyContent: 'center' }}>Glow-LEDs.com Lifetime Warranty</Title>
				<p>
					Glow-LEDs.com provides a lifetime warranty covering manufacturing defects. Warranty does not cover
					loss, water damage, or physical abuse. If you receive a product that is defective, we will ship you
					out a replacement product- all we need from you is to cover shipping. If you have questions about
					your product qualifying for warranty replacement, please use our contact form.
				</p>
				<Title styles={{ fontSize: 30, justifyContent: 'center' }}>Terms & Conditions</Title>
				<p>
					Prior to using this website- I fully agree to the terms set forth here: Under no circumstances will
					the seller (Glow-LEDs.com LLC hereby referred to as “Glow-LEDs.com” & all affiliates) be liable for
					any damages or expenses by reason of use or sale of Glow-LEDs.com products. I understand that
					products sold on Glow-LEDs.com contain small parts and are a choking hazard for small children.
					Glow-LEDs.com is not responsible for any injuries or damages that can result from any of the
					products sold on Glow-LEDs.com, any of its affiliates, or produced by Glow-LEDs.com LLC. I hereby
					release from any legal liability Glow-LEDs.com including its owners, agents, and employees from any
					and all liability for damage, injury or death to myself, or any other person or property resulting
					the selection, assembly, maintenance or use of such equipment and any claim based upon negligence,
					breach of warranty, contract or legal theory accepting myself the full responsibility for any and
					all such damage, injury or death which may result. This also applies to any individuals whom I
					supply with these products. I further agree that any and all liability of Glow-LEDs.com including
					its owners, agents and employees resulting from the selection, assembly, maintenance or use of this
					equipment shall be limited to the purchase price of any such equipment. Glow-LEDs.com products are
					not intended for use in breaking the law. The buyer acknowledges and agrees that the disclaimer of
					any liability for personal injury is a material term for this agreement and the buyer agrees to
					indemnify the Seller and to hold the Seller harmless from any claim related to the item of the
					equipment purchased. Any suit or other legal proceedings concerning the injury or death from the
					selection, assembly, maintenance or use of this equipment may be brought only in the courts of
					Travis County, Texas. I consent to jurisdiction and venue of any such court in any such proceeding.
					I acknowledge that my email address will be added to the Glow-LEDs.com email list. In which,
					occasional promotions and customer information details may be sent. I may unsubscribe at any time by
					using the unsubscribe link in any email sent, or by contacting Glow-LEDs.com. Under no circumstances
					will my email address be shared with any third party. I have carefully read this Agreement and
					Release of Liability and fully understand its content. I understand that it provides a comprehensive
					release of liability as to me, and all others to whom I may supply the equipment. This Agreement and
					Release of Liability may not be added or altered except by the written agreement assigned by
					Glow-LEDs.com. It is not intended to assert any claim or defense which applicable law prohibits.
					Rights of parties may vary from state to state. By accessing the Glow-LEDs.com website you agree to
					the terms and conditions outlined above. If you do not agree to these terms and conditions, please
					exit this site immediately. We reserve the right to change, modify, add or remove portions of these
					terms at any time. If you continue to use the site after we have posted changes to the terms, you
					have then inherently accepted those terms. If you need to contact us, please use our contact form.
				</p>
			</BlockContainer>
		</BlockContainer>
	);
};

export default ContactPage;
