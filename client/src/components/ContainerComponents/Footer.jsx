import React from 'react';
import { Label } from '../UtilityComponents';
import FlexContainer from './FlexContainer';

const Footer = (props) => {
	const footer_styles = {
		gridArea: 'footer',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: '66px',
		// position: "fixed",
		left: '0',
		bottom: '0',
		width: '100%',
		textAlign: 'center',
		marginTop: '90px'
	};

	return (
		<footer style={{ ...footer_styles, ...props.styles }}>
			<FlexContainer h_between styles={{ width: '100%' }}>
				<div style={{ marginLeft: '10px' }} />
				<Label styles={{ margin: 'auto' }}>© 2020 Glow LEDs. All Rights Reserved</Label>
				<FlexContainer styles={{ marginTop: '8px' }}>
					<div style={{ marginLeft: '10px', fontSize: '30px' }}>
						<a href="https://www.facebook.com/Glow-LEDscom-100365571740684" target="_blank">
							<i class="fab fa-facebook" />
						</a>
					</div>
					<div style={{ marginLeft: '10px', fontSize: '30px', marginRight: '10px' }}>
						<a href="https://www.instagram.com/glow_leds/" target="_blank">
							<i class="fab fa-instagram" />
						</a>
					</div>
				</FlexContainer>
			</FlexContainer>
		</footer>
	);
};

export default Footer;
