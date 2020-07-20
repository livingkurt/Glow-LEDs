import React from 'react';
import { FlexContainer } from '../components/ContainerComponents';

const MaintenancePage = (props) => {
	const header_styles = {
		gridArea: 'header',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		listStyleType: 'none',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		// position: 'fixed',
		// right: '0',
		// left: '0',
		// zIndex: '999',
		// top: '0'
	};

	const homepage_video = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		left: '0',
		top: '0',
		right: '0',
		bottom: '0',
		borderRadius: '20px',
		outline: 'none'
	};
	const video_wrapper = {
		position: 'relative',
		padding: '56.25% 0 0'
	};

	const content_styles = {
		// width: '75%',
		// gridArea: 'main',
		backgroundColor: '#737373',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		background: 'linear-gradient(180deg, rgba(138, 138, 138, 1) 0%, rgba(39, 39, 39, 1) 100%)',
		// borderRadius: '20px',
		// margin: '20px auto 20px',
		padding: '2rem',
		// padding: '2rem 10rem',
		minHeight: '81vh'
	};

	return (
		<div style={{ padding: 0 }}>
			<div style={header_styles}>
				<FlexContainer h_center column t_center>
					<div className="brand">
						<img
							className="zoom logo"
							height="125px"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs"
						/>
					</div>
					<FlexContainer h_center v_i_center class="logo_text">
						<img
							className="logo_2"
							style={{ display: 'none', height: '80px' }}
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs"
						/>
					</FlexContainer>
					<h1
						class="glow_leds_text"
						styles={{
							fontSize: '67px',
							margin: 0,
							textAlign: 'center',
							justifyContent: 'center',
							width: '100%',
							marginBottom: '10px',
							marginTop: '17px'
						}}
					>
						Glow LEDs
					</h1>
				</FlexContainer>
			</div>
			<div style={content_styles}>
				<FlexContainer h_center column t_center>
					<h2 styles={{ margin: '20px auto' }}>Glow LEDs Coming Soon!</h2>
					<label>Check out the video below for a sneak peak of what we have to offer</label>
				</FlexContainer>
				<FlexContainer h_center styles={video_wrapper}>
					<video id="caps_vid" style={homepage_video} controls>
						<source
							src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
							type="video/mp4"
						/>
					</video>
				</FlexContainer>
			</div>
		</div>
	);
};
export default MaintenancePage;
