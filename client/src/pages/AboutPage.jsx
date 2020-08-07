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
						Glow LEDs has been a long time coming. I (Kurt) have had these ideas in my brain for quite a
						while now. All I needed was the free time that quarantine has gifted me (against my will). Glow
						LEDs is completely home-grown and every product received will be handcrafted, with love, from my
						very own two hands. I design all the schematics, invent designs, program the lights, solder all
						the wires, I even made this whole website. I (Destanye) help with orders, designs, marketing,
						customer service and anything that doesn’t involve coding or engineering. This business is truly
						a labor of love and we hope that something here brings happiness into your life.
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
					{/* <p style={{ lineHeight: '25px' }}>
						I (Destanye) help with orders, designs, marketing, customer service and anything that doesn’t
						involve coding or engineering. This business is truly a labor of love and we hope that something
						here brings happiness into your life.
					</p> */}
					<p style={{ lineHeight: '25px' }}>
						With the diffuser caps, our hope is that we can change the way we think of what a diffuser can
						be and how gloving is viewed forever. With the Infinity Mirrors, we decided to use Individually
						Addressable LEDs which allows each LED to have its own unique color. By using these specific
						LEDs we are able to create more vibrant colors and intricate patterns. Other infinity mirrors
						you will find will not have the ability to perform light shows like Glow LEDs Infinity Mirrors.
						Our string lights also use Individually Addressable LEDs which gives us the ability to create
						custom color schemes and patterns you will not find anywhere else.
					</p>
				</div>
			</div>
		</div>
	);
};

export default TermsPage;
