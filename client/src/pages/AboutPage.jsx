import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { FlexContainer } from '../components/ContainerComponents';
// import "./form.css";

const TermsPage = () => {
	return (
		<div class="main_container">
			<div class="inner_content">
				<h1 style={{ fontSize: 40, textAlign: 'center' }}>About Glow-LEDs</h1>

				<div>
					<div
						style={{
							float: 'left',
							margin: '0 25px 25px 0'
						}}
					>
						<h2 style={{ fontFamily: 'heading_font', marginTop: 0, marginBottom: '25px' }}>
							Hi, My Name is Kurt!
						</h2>
						<img
							style={{
								// float: 'left',
								height: '200px',
								borderRadius: '15px'
							}}
							src="/images/optimized_images/personal_images/IMG_8989_optimized.jpeg"
						/>
					</div>
					<p style={{ lineHeight: '25px' }}>
						Our hope is that diffuser caps will change the way we think of what a diffuser can be and how
						gloving is viewed forever. Along with the Diffuser Caps we decided to create Custom and Premade
						Infinity Mirrors that using WS2812B Individually Addressable LEDs. The majority of infinity
						mirrors you will find will not have the ability to perform light shows like Glow LEDs Infinity
						Mirrors.
					</p>

					<div
						style={{
							float: 'right',
							margin: '0px 0px 25px 25px'
						}}
					>
						<h2
							style={{
								fontFamily: 'heading_font',
								display: 'flex',
								marginTop: 0,
								justifyContent: 'flex-end',
								marginBottom: '25px'
							}}
						>
							Hi, My Name is Destanye!
						</h2>
						<img
							style={{ height: '200px', borderRadius: '15px' }}
							src="/images/optimized_images/personal_images/img_0345_optimized.jpg"
						/>
					</div>
					<p style={{ lineHeight: '25px' }}>
						Along with the Diffuser Caps we decided to create Custom and Premade Infinity Mirrors that using
						WS2812B Individually Addressable LEDs. The majority of infinity mirrors you will find will not
						have the ability to perform light shows like Glow LEDs Infinity Mirrors.
					</p>
					<p style={{ lineHeight: '25px' }}>
						Along with the Diffuser Caps we decided to create Custom and Premade Infinity Mirrors that using
						WS2812B Individually Addressable LEDs. The majority of infinity mirrors you will find will not
						have the ability to perform light shows like Glow LEDs Infinity Mirrors.
					</p>
				</div>
				<div>
					<h2 style={{ clear: 'both', fontSize: 30, textAlign: 'center' }}>Frequently Asked Question</h2>
					<h3 style={{ clear: 'both', fontSize: 20, textAlign: 'center' }}>
						How do properly use diffuser caps?
					</h3>
					<p style={{ lineHeight: '25px' }}>
						With you microlights outside of your gloves. Place the Diffuser Adapters onto your microlight
						bulbs. Then place them inside of the glove. So now you have flat top domes in your gloves. Next,
						grip the diffuser adapter from in the glove, do not only hold by microlight or you risk causing
						extra stress to the bulb. Then take you cap, and place it over top of your glove and adapter and
						screw in the cap like you would a jar. The threads should catch and only needs a single turn to
						become snug. Do not over tighten or push the cap on. Let the threads do the work.
					</p>
					<h3 style={{ fontSize: 20, textAlign: 'center' }}>How to order a custom product?</h3>
					<p style={{ lineHeight: '25px' }}>
						At Glow-LEDS.com we offer many premade and predesigned products, as well as the ability to get a
						customized version of the products, or even if you just want to make a dream happen. We are here
						to help. Before ordering anything send us a message to explain your vision and we will create a
						detailed invoice and design. The price may vary depending on the size and hardware used.
					</p>

					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Processing/Shipping</h2>
					<p style={{ lineHeight: '25px' }}>
						Glow-LEDs.com is headquartered in Austin, Texas and orders are processed as they are recieved.
						Products are not stocked waiting to be shipped at this time. Each order will be filled as it is
						recieved. Some orders may take longer to be shipped as supplies may take time to be sourced. All
						orders ship USPS First Class or Priority Mail, and send out when assembly is completed.
					</p>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Returns/Cancellations</h2>
					<p style={{ lineHeight: '25px' }}>
						Your satisfaction is our priority! We accept returns on unused factory sealed product within 30
						days of purchase. Unfortunately we can not accept returns on used items. All returns are subject
						to a 30% restocking fee (you will be refunded 70% of the original purchase price). To initiate a
						return please contact support. You will be supplied with an address to send your product. Please
						put your full name and order number in the return shipment and you will be refunded.
					</p>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Glow-LEDs.com Lifetime Warranty</h2>
					<p style={{ lineHeight: '25px' }}>
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
