import React from 'react';
import { Link } from 'react-router-dom';
import { FlexContainer } from './index';

const Banner = () => {
	return (
		<span className="banner">
			<div className="max-w-1125px m-auto jc-b">
				<div className="small_screen ml-10px none ta-c w-100per">
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Submit content to be featured on our pages</button>
					</Link>
				</div>
				<div className="small_screen ml-10px none ta-c w-100per">
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Submit content to be featured</button>
					</Link>
				</div>
				<div className="big_screen  ml-10px">
					<label>Submit content to be featured on our pages </label>
					<i style={{ margin: '0 10px ' }} className="fas fa-arrow-right" />
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Send us a message!</button>
					</Link>
				</div>
				<FlexContainer class="big_screen mt-3px">
					<div className="ml-10px">
						<a
							rel="noreferrer"
							href="https://www.facebook.com/Glow-LEDscom-100365571740684"
							target="_blank"
						>
							<i class="fab fa-facebook zoom" />
						</a>
					</div>
					<div className="ml-10px">
						<a rel="noreferrer" href="https://www.instagram.com/glow_leds/" target="_blank">
							<i class="fab fa-instagram zoom" />
						</a>
					</div>
					<div className="mh-10px">
						<a
							rel="noreferrer"
							href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
							target="_blank"
						>
							<i class="fab fa-youtube zoom" />
						</a>
					</div>
				</FlexContainer>
			</div>
		</span>
	);
};

export default Banner;
