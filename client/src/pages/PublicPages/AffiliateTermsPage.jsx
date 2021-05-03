import React from 'react';
import { Helmet } from 'react-helmet';

const AffiliateTermsPage = () => {
	return (
		<div className="main_container p-20px ">
			<Helmet>
				<title>Terms and Conditions | Glow LEDs</title>
				<meta property="og:title" content="Terms and Conditions" />
				<meta name="twitter:title" content="Terms and Conditions" />
				<link rel="canonical" href="https://www.glow-leds.com/account/terms" />
				<meta property="og:url" content="https://www.glow-leds.com/account/terms" />
				<meta
					name="description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
				<meta
					property="og:description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
				<meta
					name="twitter:description"
					content="Glow LEDs wants everyone to use our platform for what it was meant to be used for."
				/>
			</Helmet>

			<h1 className="ta-c">Affiliate Terms & Conditions</h1>
			<div className="paragraph_font">
				<p>Promoter Benefits</p>
				<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
					<li>Personal 20% off Promo Code that can be used on any purchase with your affiliate account</li>
					<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
						<li>Promo Code can increase based based on number of uses</li>
					</ul>
					<li>Promo Code Usage Tiers</li>
					<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
						<li>Tier 1: 0 - 10 Uses = 20% Discount</li>
						<li>Tier 2: 10 - 20 Uses = 25% Discount</li>
						<li>Tier 3: 20 - 30 Uses = 30% Discount</li>
						<li>Tier 4: 30 - 40 Uses = 35% Discount</li>
						<li>Tier 5: 40 - 50 Uses = 40% Discount</li>
						<li>Tier 5: 50 - + Uses = 50% Discount</li>
					</ul>
					<li>Added to the Official Glow LEDs Affiliate Facebook Chat</li>
					<li>Early Access to new products before they are released</li>
					<li>Increased Chance for a Spot on Festival Glover Team</li>
					<li>Make 10% Commision on orders that your code is used</li>
					<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
						<li>Cash out when total is greater than $25</li>
					</ul>

					{/* <li>Top Earner get an added 5% added to your promo code</li> */}
					{/* <li>Top Earner get an added 5% added to your promo code</li> */}
				</ul>
				<p>Promoter Requirements</p>
				<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
					<li>Like and Comment on the majority of Glow LEDs posts (Even if its just a quick bump)</li>
					<ul style={{ padding: '0 18px', listStyle: 'disc' }}>
						<li>On any of the following platforms: Facebook, Instagram, and Tiktok</li>
					</ul>
					<li>Share at least one Glow LEDs post a week (Choose whatever one you feel strongly about)</li>
					<li>Post a Lightshow with your product and promo code at least twice a month</li>
				</ul>
			</div>
		</div>
	);
};

export default AffiliateTermsPage;
