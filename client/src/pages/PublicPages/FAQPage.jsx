import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { FlexContainer } from '../../components/ContainerComponents';
// import { listenerCount } from 'cluster';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
// import "./form.css";

const FAQPage = () => {
	return (
		<div class="main_container">
			<MetaTags>
				<title>Frequently Asked Questions | Glow LEDs</title>
				<meta property="og:title" content="Frequently Asked Questions | Glow LEDs" />
				<meta name="twitter:title" content="Frequently Asked Questions | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/faq" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/faq" />
				<meta
					name="description"
					content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
				/>
				<meta
					property="og:description"
					content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
				/>
				<meta
					name="twitter:description"
					content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
				/>
			</MetaTags>
			<div class="inner_content">
				<div>
					<h1 style={{ clear: 'both', textAlign: 'center' }}>Frequently Asked Questions</h1>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h2 style={{ clear: 'both', textAlign: 'center' }}>Using Diffuser Adapters and Caps</h2>
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

						<ul style={{ padding: '18px' }}>
							<li style={{ lineHeight: '25px' }}>
								With your microlights outside of your gloves, place the Diffuser Adapters onto your
								microlight bulbs.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Then place them inside of the glove, pushing it as far you can so the glove is tight
								over the diffuser adapter
							</li>
							<li style={{ lineHeight: '25px' }}>
								Now it should look like you have flat top domes inside your gloves.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Grip the diffuser adapter from outside the glove, do not only hold by microlight or you
								risk causing extra stress to the bulb.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Take your cap, and place it over top of your glove and adapter and screw in the cap like
								you would a jar.
							</li>
							<li style={{ lineHeight: '25px' }}>
								The threads should catch and only needs a single turn to become snug. Do not over
								tighten or push the cap on. Let the threads do the work.
							</li>
						</ul>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Ordering Custom Products</h1>
						{/* <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Custom Diffuser Caps</h2>
						<ul style={{ padding: '0 18px' }}>
							<li style={{ lineHeight: '25px' }}>
								A 100% refundable deposit of $20 is required to hold your place in line and to be seen
								for a consultation.
							</li>
							<li style={{ lineHeight: '25px' }}>
								The total price will be $40, deposit included, and will include 10 custom diffuser caps
								and 10 diffuser adapters.
							</li>
							<li style={{ lineHeight: '25px' }}>
								As soon as you pay your deposit, please use the contact button and send us your ideas
								and inspirational pictures. also include your preferred method of contact (an e-mail
								address, phone number or social media username).
							</li>
							<li style={{ lineHeight: '25px' }}>
								The $20 deposit is 100% refundable at this point if we determine we are unable to
								produce what you are desiring or we are unable to come to an agreement.
							</li>
							<li style={{ lineHeight: '25px' }}>
								After consultation, a design will be drafted by us and prototypes will be made.
							</li>
							<li style={{ lineHeight: '25px' }}>
								At this point we will show you our results and if you wish to proceed, one final $20
								payment will be required.
							</li>
						</ul> */}
						<h2 style={{ textAlign: 'center', margin: '0 auto' }}>Custom Infinity Mirrors</h2>
						<ul style={{ padding: '0 18px' }}>
							<li style={{ lineHeight: '25px' }}>
								Before ordering a custom infinity mirror a consultation must be had.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Use the contact button to send us a message with inspirational pictures, appoximate
								dimmensions and any other details to explain your vision and we will create a detailed
								invoice and design. also include your preferred method of contact (an e-mail address,
								phone number or social media username).
							</li>
							<li style={{ lineHeight: '25px' }}>
								Pricing begins at $549. The price may vary depending on the size and hardware used.
							</li>
						</ul>
						<Link to="/pages/contact/custom_orders">
							<FlexContainer h_center>
								<button className="button primary " style={{ margin: 'auto' }}>
									Contact
								</button>
							</FlexContainer>
						</Link>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center' }}>Featured Content</h1>
						<p style={{ lineHeight: '25px' }}>
							Please tag us on Facebook and Instagram when you recieve your products! We love to see how
							you put our products to use. To be featured on our social media or website send us your
							videos direcly using the Contact button here on the website. You will be given a google
							drive link where you can upload your content to be featured.
						</p>
						<Link to="/pages/contact/submit_content_to_be_featured">
							<FlexContainer h_center>
								<button className="button primary " style={{ margin: 'auto' }}>
									Contact
								</button>
							</FlexContainer>
						</Link>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center' }}>Processing/Shipping</h1>

						<ul style={{ padding: '18px' }}>
							<li style={{ lineHeight: '25px' }}>
								Glow-LEDs.com is headquartered in Austin, Texas and orders are processed as they are
								received. Products are not stocked waiting to be shipped at this time. Each order will
								be filled as it is received. Some orders may take longer than others to be shipped.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Small packages will be sent via USPS First Class and large packages will be sent via
								Priority Mail.
							</li>
							<li style={{ lineHeight: '25px' }}>Shipping time is 1-3 business days.</li>
							<li style={{ lineHeight: '25px' }}>All shipments come with tracking numbers.</li>
							<li style={{ lineHeight: '25px' }}>Not responsible for delays due to post office.</li>
							<li style={{ lineHeight: '25px' }}>
								For glove accessories (caps, adapters, diffusers, battery storage) we will get your
								order in the mail within approximately 1-3 days after the order is placed.
							</li>
							<li style={{ lineHeight: '25px' }}>
								For string lights we will get your order in the mail within approximately 3-4 days after
								the order is placed.
							</li>
							<li style={{ lineHeight: '25px' }}>
								For infinity mirrors, expect a longer processing time. Assembly of infinity mirrors is
								much more intensive than other products.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If a custom order is placed, processing times will be discussed during consultation.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If the address on your order is incorrect, please contact us immediately at
								info.glowleds@gmail.com
							</li>
						</ul>
						<Link to="/pages/contact/order_issues">
							<FlexContainer h_center>
								<button className="button primary " style={{ margin: 'auto' }}>
									Contact
								</button>
							</FlexContainer>
						</Link>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center' }}>Returns/Cancellations</h1>
						<ul style={{ padding: '18px' }}>
							<li style={{ lineHeight: '25px' }}>
								100% satisfaction guarantee. We accept returns within 14 days of delivery.
							</li>
							<li style={{ lineHeight: '25px' }}>
								To initiate a return please contact info.glowleds@gmail.com and You will be supplied
								with a prepaid shipping label to send back your product.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Please include your full name and order number in the return shipment and you will be
								refunded the full amount minus original shipping costs.
							</li>
							{/* <li style={{ lineHeight: '25px' }}>
							You will be refunded your full amount and you'll only be resonsible for return shipping.
						</li> */}
							<li style={{ lineHeight: '25px' }}>Custom items are non-refundable.</li>
							<li style={{ lineHeight: '25px' }}>
								Refunds are returned to the original form of payment.
							</li>
							<li style={{ lineHeight: '25px' }}>
								We do not refund damaged items unless they arrived damaged at our own fault.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If item arrives damamged in any way please contact us immediately at
								info.glowleds@gmail.com
							</li>
							<li style={{ lineHeight: '25px' }}>
								Our online orders process immediately to ensure our clients receive their products as
								soon as possible. If you would like to cancel your order you must contact us within one
								hour of payment.
							</li>
							<li style={{ lineHeight: '25px' }}>
								We are not able to modify orders. If you would like to add an item you will need to do
								so in another order.
							</li>
							<Link to="/pages/contact/returns">
								<FlexContainer h_center>
									<button className="button primary " style={{ margin: 'auto' }}>
										Contact
									</button>
								</FlexContainer>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FAQPage;
