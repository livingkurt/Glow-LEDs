import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { FlexContainer } from '../components/ContainerComponents';
// import "./form.css";

const TermsPage = () => {
	return (
		<div class="main_container">
			<div class="inner_content">
				<FlexContainer h_center>
					<h1 style={{ fontSize: 40, textAlign: 'center', marginRight: '20px' }}>Glow-LEDs.com </h1>
					<h1 style={{ fontSize: 40, textAlign: 'center', letterSpacing: '20px', marginRight: '5px' }}>F</h1>
					<h1 style={{ fontSize: 40, textAlign: 'center', letterSpacing: '10px' }}>AQ</h1>
				</FlexContainer>
				<div>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Frequently Asked Question</h2>
					<h3 style={{ fontSize: 20, textAlign: 'center' }}>How do properly use diffuser caps?</h3>
					<p>
						With you microlights outside of your gloves. Place the Diffuser Adapters onto your microlight
						bulbs. Then place them inside of the glove. So now you have flat top domes in your gloves. Next,
						grip the diffuser adapter from in the glove, do not only hold by microlight or you risk causing
						extra stress to the bulb. Then take you cap, and place it over top of your glove and adapter and
						screw in the cap like you would a jar. The threads should catch and only needs a single turn to
						become snug. Do not over tighten or push the cap on. Let the threads do the work.
					</p>
					<h3 style={{ fontSize: 20, textAlign: 'center' }}>How to order a custom product?</h3>
					<p>
						At Glow-LEDS.com we offer many premade and predesigned products, as well as the ability to get a
						customized version of the products, or even if you just want to make a dream happen. We are here
						to help. Before ordering anything send us a message to explain your vision and we will create a
						detailed invoice and design. The price may vary depending on the size and hardware used.
					</p>

					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Processing/Shipping</h2>
					<p>
						Glow-LEDs.com is headquartered in Austin, Texas and orders are processed as they are recieved.
						Products are not stocked waiting to be shipped at this time. Each order will be filled as it is
						recieved. Some orders may take longer to be shipped as supplies may take time to be sourced. All
						orders ship USPS First Class or Priority Mail, and send out when assembly is completed.
					</p>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Returns/Cancellations</h2>
					<p>
						Your satisfaction is our priority! We accept returns on unused factory sealed product within 30
						days of purchase. Unfortunately we can not accept returns on used items. All returns are subject
						to a 30% restocking fee (you will be refunded 70% of the original purchase price). To initiate a
						return please contact support. You will be supplied with an address to send your product. Please
						put your full name and order number in the return shipment and you will be refunded.
					</p>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Glow-LEDs.com Lifetime Warranty</h2>
					<p>
						Glow-LEDs.com provides a lifetime warranty covering manufacturing defects. Warranty does not
						cover loss, water damage, or physical abuse. If you receive a product that is defective, we will
						ship you out a replacement product- all we need from you is to cover shipping. If you have
						questions about your product qualifying for warranty replacement, please use our contact form.
					</p>
				</div>
			</div>
		</div>
	);
};

export default TermsPage;
