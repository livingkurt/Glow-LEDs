import React from 'react';
import FlexContainer from './FlexContainer';
import { Link } from 'react-router-dom';

const Footer = (props) => {
	const footer_styles = {
		gridArea: 'footer',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		// height: '66px',
		// position: "fixed",
		left: '0',
		bottom: '0',
		width: '100%',
		textAlign: 'center',
		marginTop: '90px'
	};

	return (
		<footer style={{ ...footer_styles, ...props.styles }}>
			<FlexContainer h_between v_i_center styles={{ width: '100%' }}>
				{/* <div style={{ marginLeft: '96px' }} /> */}
				{/* <label styles={{ margin: 'auto' }}>© 2020 Glow LEDs. All Rights Reserved</label> */}
				<FlexContainer styles={{ marginLeft: '10px' }} wrap>
					<Link to="/pages/contact">
						<button style={{ margin: 'auto', marginRight: '10px' }} className="button mobile_nav">
							Contact
						</button>
					</Link>
					<Link to="/pages/terms">
						<button style={{ margin: 'auto', marginRight: '10px' }} className="button mobile_nav">
							Terms
						</button>
					</Link>
					<Link to="/pages/sitemap">
						<button style={{ margin: 'auto' }} className="button mobile_nav">
							Sitemap
						</button>
					</Link>
				</FlexContainer>
				<FlexContainer styles={{ marginTop: '8px' }} wrap>
					<div style={{ marginLeft: '10px', fontSize: '30px' }}>
						<a
							rel="noreferrer"
							href="https://www.facebook.com/Glow-LEDscom-100365571740684"
							target="_blank"
						>
							<i class="fab fa-facebook zoom" />
						</a>
					</div>
					<div style={{ marginLeft: '10px', fontSize: '30px' }}>
						<a rel="noreferrer" href="https://www.instagram.com/glow_leds/" target="_blank">
							<i class="fab fa-instagram zoom" />
						</a>
					</div>
					<div style={{ marginLeft: '10px', fontSize: '30px', marginRight: '10px' }}>
						<a
							rel="noreferrer"
							href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
							target="_blank"
						>
							<i class="fab fa-youtube zoom" />
						</a>
					</div>
				</FlexContainer>
			</FlexContainer>
		</footer>
	);
};

export default Footer;
