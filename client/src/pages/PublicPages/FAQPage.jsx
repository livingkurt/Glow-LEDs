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
								microlight bulbs 💡.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Then place them inside of the glove 🧤, pushing it as far you can so the glove is tight
								over the diffuser adapter
							</li>
							<li style={{ lineHeight: '25px' }}>
								Now it should look like you have flat top domes inside your gloves.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Grip <label style={{ marginRight: '9px' }}>🤏</label>️the diffuser adapter from outside
								the glove, do not only hold by microlight or the diffuser adapter might spin on the bulb
								and wont screw in properly or you risk causing extra stress to the bulb.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Take your cap <label style={{ marginRight: '9px' }}>👑</label>️, and place it over top
								of your glove and adapter and screw <label style={{ marginRight: '9px' }}>🔩</label>️ in
								the cap like you would a jar 🍯.
							</li>
							<li style={{ lineHeight: '25px' }}>
								The threads should catch and only needs a single turn{' '}
								<label style={{ marginRight: '5px' }}>🌀</label>️to become snug. Do not over tighten or
								push the cap on. Let the threads do the work{' '}
								<label style={{ marginRight: '2px' }}>💫</label>️ .
							</li>
						</ul>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Ordering Custom Products</h1>
						<h2 style={{ textAlign: 'center', marginBottom: 0 }}>Custom Diffuser Caps</h2>
						<ul style={{ padding: '0 18px' }}>
							<li style={{ lineHeight: '25px' }}>
								A single 100% refundable deposit of $9.99{' '}
								<label style={{ marginRight: '5px' }}>💸</label>️ is required to hold your place in line
								and to be seen for a consultation <label style={{ marginRight: '5px' }}>👨‍⚕️</label>️.
								The deposit will be deducted from the total price.
							</li>
							<li style={{ lineHeight: '25px' }}>
								The total price <label style={{ marginRight: '5px' }}>💸</label>️ for a single design
								starts at $40. The price may vary based on the intricacy of the design and materials
								used <label style={{ marginRight: '5px' }}>🧐</label>️. If multiple designs are desired,
								you will have to pay a similar price per design{' '}
								<label style={{ marginRight: '5px' }}>✨</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								This includes 10 custom diffuser caps <label style={{ marginRight: '5px' }}>🧢</label>️
								and 10 diffuser adapters.
							</li>
							<li style={{ lineHeight: '25px' }}>
								As soon as you pay your deposit <label style={{ marginRight: '5px' }}>💸</label>️,
								please use the contact button <label style={{ marginRight: '5px' }}>📞</label>️ and send{' '}
								us your ideas and inspirational pictures{' '}
								<label style={{ marginRight: '11px' }}>🌈</label>️. Also include your preferred method
								of contact (an e-mail address <label style={{ marginRight: '5px' }}>📧 </label>️, phone
								number <label style={{ marginRight: '5px' }}>📞</label>️ or social media username{' '}
								<i class="fab fa-facebook" /> <i class="fab fa-instagram" />.
							</li>
							<li style={{ lineHeight: '25px' }}>
								A design will be drafted by us 📝, price will be determined, prototypes will be made{' '}
								<label style={{ marginRight: '5px' }}>🏗️</label>️ and we will show you our results{' '}
								<label style={{ marginRight: '5px' }}>🔥</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If we determine we are unable to produce what you are desiring, or you are unsatisfied
								with the results, we will refund your $10 deposit{' '}
								<label style={{ marginRight: '5px' }}>💸</label>️. If you wish to proceed, the final
								payment will be required and we will ship them out to you{' '}
								<label style={{ marginRight: '5px' }}>🚚</label>️.
							</li>

							<li style={{ lineHeight: '25px' }}>
								Processing <label style={{ marginRight: '5px' }}>📦</label>️ and shipping times{' '}
								<label style={{ marginRight: '5px' }}>🚚</label>️ depend on how many orders are ahead of
								you <label style={{ marginRight: '5px' }}>⏩</label>️. If you would like an estimate 📝
								please reach out to us <label style={{ marginRight: '5px' }}>📞</label>.
							</li>
							<li style={{ lineHeight: '25px' }}>
								We respect others intellectual property{' '}
								<label style={{ marginRight: '5px' }}>🏘️</label>. Any designs that are trademarked or
								Copyrighted <label style={{ marginRight: '5px' }}></label>
								will not be redistributed without permission{' '}
								<label style={{ marginRight: '5px' }}>🚫</label>.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Sometimes your custom requests are already in our make list 📝. When this happens, you
								may see your design idea come up for sale on the website later on{' '}
								<label style={{ marginRight: '5px' }}>🛍</label>️. While we can't guarantee you'll be
								the only glover to receive this set, we're excited to make you the first{' '}
								<label style={{ marginRight: '5px' }}>😄</label>️! If you have an idea for a common
								shape or pattern feel free to send it <label style={{ marginRight: '5px' }}>📦</label>️
								as a suggestion and we may have it on the website in the near future{' '}
								<label style={{ marginRight: '5px' }}>🔮</label>️!
							</li>
						</ul>
						<h2 style={{ textAlign: 'center', margin: '0 auto' }}>Custom Infinity Mirrors</h2>
						<ul style={{ padding: '0 18px' }}>
							<li style={{ lineHeight: '25px' }}>
								Before ordering a custom infinity mirror a consultation must be had 📝.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Use the contact button <label style={{ marginRight: '5px' }}>📞</label>️ to send us a
								message with inspirational pictures <label style={{ marginRight: '5px' }}>⛰️</label>️,
								appoximate dimmensions <label style={{ marginRight: '5px' }}>📐</label>️ and any other
								details to explain your vision <label style={{ marginRight: '11px' }}>🌈</label>️and we
								will create a detailed invoice and design 📝. Also include your preferred method of
								contact <label style={{ marginRight: '5px' }}>📞</label>️å (an e-mail address, phone
								number or social media username).
							</li>
							<li style={{ lineHeight: '25px' }}>
								Pricing begins at $549. The price may vary depending on the size and hardware used ⚙️ .
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
							Please tag us on Facebook <i class="fab fa-facebook" /> and Instagram{' '}
							<i class="fab fa-instagram" /> when you recieve your products! We love{' '}
							<label style={{ marginRight: '3px' }}>❤</label>️ to see how you put our products to use. To
							be featured <label style={{ marginRight: '0px' }}>📸</label>️ on our social media or website
							send <label style={{ marginRight: '9px' }}>✉️</label>️us your videos{' '}
							<label style={{ marginRight: '5px' }}>📹 </label>️direcly using the Contact button{' '}
							<label style={{ marginRight: '5px' }}>📞</label>️ here on the website. You will be given a
							wetransfer link where you can send us your content to be featured{' '}
							<label style={{ marginRight: '5px' }}>🌟</label>️.
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

						<ul style={{ padding: '18px', marginBottom: 0 }}>
							<li style={{ lineHeight: '25px' }}>
								Glow-LEDs.com is headquartered in Austin, Texas{' '}
								<label style={{ marginRight: '3px' }}>🇨🇱</label>️ and orders are processed as they are
								received <label style={{ marginRight: '5px' }}>📨</label>️. Products are not stocked
								waiting to be shipped at this time. Each order will be filled as it is received. Some
								orders may take longer than others to be shipped.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Small packages will be sent via USPS <i class="fab fa-usps" /> First Class and large
								packages <label style={{ marginRight: '5px' }}>📦</label>️will be sent via Priority
								Mail.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Shipping time is 1-3 business days <label style={{ marginRight: '5px' }}>🚚</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								All shipments come with tracking numbers{' '}
								<label style={{ marginRight: '5px' }}>🔢</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Not responsible for delays due to post office{' '}
								<label style={{ marginRight: '5px' }}>🏤</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								For glove accessories (caps, adapters, diffusers, battery storage) we will get your
								order in the mail <label style={{ marginRight: '5px' }}>✉️ </label>️ within
								approximately 1-3 days <label style={{ marginRight: '5px' }}>🗓 </label>️after the order
								is placed.
							</li>
							<li style={{ lineHeight: '25px' }}>
								For string lights <label style={{ marginRight: '5px' }}>💡</label>️we will get your
								order in the mail <label style={{ marginRight: '5px' }}>✉️ </label>️within approximately
								1 week after the order is placed.
							</li>
							<li style={{ lineHeight: '25px' }}>
								For infinity mirrors, expect a longer processing time. Assembly of infinity mirrors is
								much more intensive than other products.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If a custom order is placed, processing times will be discussed during consultation.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If the address on your order is incorrect, please contact us<label style={{ marginRight: '5px' }}>📞</label>️
								immediately at info.glowleds@gmail.com
							</li>
						</ul>
						<Link to="/pages/contact/order_issues">
							<FlexContainer h_center>
								<button className="button primary " style={{ margin: 'auto', marginBottom: '10px' }}>
									Contact
								</button>
							</FlexContainer>
						</Link>
						<h2 style={{ textAlign: 'center' }}>International Shipping</h2>
						<ul style={{ padding: '18px', margin: 0 }}>
							<li style={{ lineHeight: '25px' }}>
								We ship internationally! <label style={{ marginRight: '5px' }}>🌎</label>️
							</li>
							<li style={{ lineHeight: '25px' }}>
								IMPORTANT: If you live outside of the United States{' '}
								<label style={{ marginRight: '5px' }}>🇺🇸</label>️ please check the international
								checkbox when filling out shipping <label style={{ marginRight: '5px' }}>🚚</label>️
								information. A country field will show for you to input your country.
							</li>
							{/* <li style={{ lineHeight: '25px' }}>
								Shipping will not be calculated correctly if you do not input your country correctly.
							</li> */}
							<li style={{ lineHeight: '25px' }}>
								Shipping times will vary, and will depend on the country.
							</li>
							{/* <li style={{ lineHeight: '25px' }}>
								Shipping times will vary, and will depend on the country.
							</li> */}
							<li style={{ lineHeight: '25px' }}>
								All shipments come with tracking numbers{' '}
								<label style={{ marginRight: '5px' }}>🔢</label>️.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Please contact us <label style={{ marginRight: '5px' }}>📞</label>️ if you have
								questions <label style={{ marginRight: '5px' }}>❓</label>️
							</li>
						</ul>
						<Link to="/pages/contact/order_issues">
							<FlexContainer h_center>
								<button className="button primary " style={{ margin: 'auto', marginBottom: '10px' }}>
									Contact
								</button>
							</FlexContainer>
						</Link>
					</div>
					<div className="home_page_divs" style={{ margin: '10px 0' }}>
						<h1 style={{ textAlign: 'center' }}>Returns/Cancellations</h1>
						<ul style={{ padding: '18px' }}>
							<li style={{ lineHeight: '25px' }}>
								100% satisfaction guarantee <label style={{ marginRight: '5px' }}>💯</label>️. We accept
								returns within 14 days of delivery .
							</li>
							<li style={{ lineHeight: '25px' }}>
								To initiate a return please contact <label style={{ marginRight: '5px' }}>📞</label>️
								info.glowleds@gmail.com and You will be supplied with a prepaid shipping label{' '}
								<label style={{ marginRight: '5px' }}>🏷️</label>️to send back your product.
							</li>
							<li style={{ lineHeight: '25px' }}>
								Please include your full name and order number{' '}
								<label style={{ marginRight: '9px' }}>🔢</label>️in the return shipment and you will be
								refunded the full amount minus original shipping costs.
							</li>
							{/* <li style={{ lineHeight: '25px' }}>
							You will be refunded your full amount and you'll only be resonsible for return shipping.
						</li> */}
							<li style={{ lineHeight: '25px' }}>Custom items are non-refundable .</li>
							<li style={{ lineHeight: '25px' }}>
								Refunds are returned to the original form of payment{' '}
								<label style={{ marginRight: '5px' }}>💳</label>️
							</li>
							<li style={{ lineHeight: '25px' }}>
								We do not refund damaged <label style={{ marginRight: '5px' }}>🤕</label>️items unless
								they arrived damaged at our own fault.
							</li>
							<li style={{ lineHeight: '25px' }}>
								If item arrives damamged in any way please contact us{' '}
								<label style={{ marginRight: '5px' }}>📞</label>️ immediately at info.glowleds@gmail.com
							</li>
							<li style={{ lineHeight: '25px' }}>
								Our online orders process immediately <label style={{ marginRight: '10px' }}>💨</label>️to
								ensure our clients receive their products as soon as possible. If you would like to
								cancel <label style={{ marginRight: '10px' }}>🚫</label>️your order you must contact{' '}
								<label style={{ marginRight: '5px' }}>📞</label>️ us within one hour of payment{' '}
								<label style={{ marginRight: '5px' }}>💳</label>️.
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
