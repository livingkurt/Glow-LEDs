import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { FlexContainer } from '../components/ContainerComponents';
// import { listenerCount } from 'cluster';
import { Link } from 'react-router-dom';
// import "./form.css";

const FAQPage = () => {
	return (
		<div class="main_container">
			<div class="inner_content">
				<div>
					<h1 style={{ clear: 'both', textAlign: 'center' }}>Frequently Asked Questions</h1>
					<h2 style={{ clear: 'both', textAlign: 'center' }}>Using Diffuser Adapters and Caps</h2>
					{/* <img
						style={{
							float: 'left',
							height: '200px',
							borderRadius: '15px',
							margin: '0px 25px 25px 0'
						}}
						src="/images/optimized_images/about_me_images/2_img_9862_optimized.jpg"
					/> */}

					<FlexContainer h_center styles={{ position: 'relative' }}>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/FJbKd0ClkFM?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</FlexContainer>
					<ul>
						<li style={{ lineHeight: '25px' }}>
							With your microlights outside of your gloves, place the Diffuser Adapters onto your
							microlight bulbs.
						</li>
						<li style={{ lineHeight: '25px' }}>
							Then place them inside of the glove, pushing it as far you can so the glove is tight over
							the diffuser adapter
						</li>
						<li style={{ lineHeight: '25px' }}>
							Now it should look like you have flat top domes inside your gloves.
						</li>
						<li style={{ lineHeight: '25px' }}>
							Grip the diffuser adapter from outside the glove, do not only hold by microlight or you risk
							causing extra stress to the bulb.
						</li>
						<li style={{ lineHeight: '25px' }}>
							Take your cap, and place it over top of your glove and adapter and screw in the cap like you
							would a jar.
						</li>
						<li style={{ lineHeight: '25px' }}>
							The threads should catch and only needs a single turn to become snug. Do not over tighten or
							push the cap on. Let the threads do the work.
						</li>
					</ul>
					<h2 style={{ textAlign: 'center' }}>Ordering Custom Products</h2>
					<p style={{ lineHeight: '25px' }}>
						At Glow-LEDS.com we offer many premade and predesigned products, as well as the ability to get a
						customized version of the products. Before ordering anything custom a consultation must be had.
						Send us a message with inspirational pictures, appoximate dimmensions and any other details to
						explain your vision and we will create a detailed invoice and design. The price may vary
						depending on the size and hardware used.
					</p>
					<Link to="/contact">
						<FlexContainer h_center>
							<button className="button primary " style={{ margin: 'auto' }}>
								Contact
							</button>
						</FlexContainer>
					</Link>

					<h2 style={{ textAlign: 'center' }}>Processing/Shipping</h2>

					<ul>
						<li style={{ lineHeight: '25px' }}>
							Glow-LEDs.com is headquartered in Austin, Texas and orders are processed as they are
							received. Products are not stocked waiting to be shipped at this time. Each order will be
							filled as it is received. Some orders may take longer to be shipped as supplies may take
							time to be sourced.
						</li>
						<li style={{ lineHeight: '25px' }}>
							Small packages will be sent via USPS First Class and large packages will be sent via
							Priority Mail.
						</li>
						<li style={{ lineHeight: '25px' }}>Shipping time is 1-3 business days.</li>
						<li style={{ lineHeight: '25px' }}>
							Not responsible for delays due to post office. For glove accessories (caps, adapters,
							diffusers, battery storage) we will get your order in the mail within approximately 3-4 days
							after the order is placed.
						</li>
						<li style={{ lineHeight: '25px' }}>
							For string lights we will get your order in the mail within approximately 3-4 days after the
							order is placed.
						</li>
						<li style={{ lineHeight: '25px' }}>
							For infinity mirrors, expect a longer processing time. Assembly of infinity mirrors is much
							more intensive than other products. If a custom order is placed, processing times will be
							discussed during consultation.
						</li>
					</ul>
					<h2 style={{ fontSize: 30, textAlign: 'center' }}>Returns/Cancellations</h2>
					<p style={{ lineHeight: '25px' }}>
						Your satisfaction is our priority! We accept returns within 30 days of purchase. All returns are
						subject to a 30% restocking fee (you will be refunded 70% of the original purchase price). To
						initiate a return please contact info.glowleds@gmail.com. You will be supplied with an address
						to send your product. Please put your full name and order number in the return shipment and you
						will be refunded. We do not refund shipping costs. Custom items are non-refundable. Refunds are
						returned to the original form of payment. We do not refund damaged items unless they arrived
						damaged at our own fault. If item arrives damamged in any way please contact us immediately at
						info.glowleds@gmail.com. Reviewing your order in the Shopping Bag carefully prior to checkout is
						highly recommended. Our online orders process immediately to ensure our clients receive their
						products as soon as possible. As a result, we are unable to cancel or modify your order once
						submitted. If the address on your order is incorrect, please contact us at
						info.glowleds@gmail.com immediately.
					</p>
				</div>
			</div>
		</div>
	);
};

export default FAQPage;