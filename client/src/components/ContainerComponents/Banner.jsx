import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

const Banner = (props) => {
	return (
		<span className="banner">
			<div
				style={{
					maxWidth: '1125px',
					width: '1125px',
					margin: 'auto',
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<div>
					<label>Submit content to be featured on our pages </label>
					<i style={{ margin: '0 10px ' }} class="fas fa-arrow-right" />
					<Link to="/pages/contact">
						<button className="banner-button">Send us a message!</button>
					</Link>
				</div>
				<FlexContainer styles={{ marginTop: '3px' }}>
					<div style={{ marginLeft: '10px' }}>
						<a href="https://www.facebook.com/Glow-LEDscom-100365571740684" target="_blank">
							<i class="fab fa-facebook zoom" />
						</a>
					</div>
					<div style={{ marginLeft: '10px' }}>
						<a href="https://www.instagram.com/glow_leds/" target="_blank">
							<i class="fab fa-instagram zoom" />
						</a>
					</div>
					<div style={{ marginLeft: '10px', marginRight: '10px' }}>
						<a href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw" target="_blank">
							<i class="fab fa-youtube zoom" />
						</a>
					</div>
				</FlexContainer>
			</div>
		</span>
	);
};

export default Banner;
