import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { Title } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { contact } from '../actions/userActions';
import { validate_contact } from '../utils/helper_functions';
// import "./form.css";

const TermsPage = () => {
	return (
		<BlockContainer class="main_container">
			<BlockContainer>
				<FlexContainer h_center>
					<Title styles={{ fontSize: 40, justifyContent: 'center', marginRight: '20px' }}>
						Glow-LEDs.com{' '}
					</Title>
					<Title
						styles={{ fontSize: 40, justifyContent: 'center', letterSpacing: '20px', marginRight: '5px' }}
					>
						F
					</Title>
					<Title styles={{ fontSize: 40, justifyContent: 'center', letterSpacing: '10px' }}>AQ</Title>
				</FlexContainer>
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
			</BlockContainer>
		</BlockContainer>
	);
};

export default TermsPage;
