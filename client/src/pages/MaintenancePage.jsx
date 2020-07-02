import React from 'react';
import { Title, Label, ButtonSymbol, ButtonWord } from '../components/UtilityComponents';
import { FlexContainer, BlockContainer, Content } from '../components/ContainerComponents';
import { Link } from 'react-router-dom';

const Four04Page = (props) => {
	const header_styles = {
		gridArea: 'header',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		listStyleType: 'none',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		position: 'fixed',
		right: '0',
		left: '0',
		zIndex: '999',
		top: '0'
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

	return (
		<BlockContainer>
			<header style={header_styles} id="overlay">
				<FlexContainer h_center column t_center>
					<div className="brand">
						<img
							className="zoom logo"
							height="125px"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs"
						/>
					</div>
					<Title
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
					</Title>
				</FlexContainer>
			</header>
			<Content styles={{ margin: '250px auto 20px' }}>
				<FlexContainer h_center column t_center>
					<Title styles={{ margin: '20px auto' }}>Glow LEDs Coming Soon!</Title>
					<Label>Check out the video below for a sneak peak of what we have to offer</Label>
				</FlexContainer>
				<FlexContainer h_center styles={video_wrapper}>
					<video id="caps_vid" style={homepage_video} controls>
						<source
							src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
							type="video/mp4"
						/>
					</video>
				</FlexContainer>
			</Content>
		</BlockContainer>
	);
};
export default Four04Page;
