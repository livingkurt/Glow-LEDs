import React, { useEffect } from 'react';
import { Title, ButtonWord } from '../components/UtilityComponents/index';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents/index';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
	useEffect(() => {
		const diffuser_caps_video = document.getElementById('diffuser_caps_video');
		diffuser_caps_video.muted = true;
		diffuser_caps_video.autoplay = true;
		diffuser_caps_video.playsinline = true;

		const infinity_mirror_video = document.getElementById('infinity_mirror_video');
		infinity_mirror_video.muted = true;
		infinity_mirror_video.autoplay = true;
		infinity_mirror_video.playsinline = true;

		const string_lights_video = document.getElementById('string_lights_video');
		string_lights_video.muted = true;
		string_lights_video.autoplay = true;
		string_lights_video.playsinline = true;
	}, []);

	const heading_styles = {
		fontSize: 30,
		justifyContent: 'center',
		margin: '20px auto'
	};

	const flex_styles = {
		height: '100%',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		borderRadius: '20px',
		padding: '10px',
		marginBottom: '10px'
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

	const div_styles = {
		// backgroundColor: '#2f2f2f',
		// border: '3px #2f2f2f solid',
		// background:'linear-gradient(135deg, rgba(0,154,120,1) 15%, rgba(0,35,142,1) 46%, rgba(76,0,139,1) 62%, rgba(129,0,118,1) 95%)',
		// background: "linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,173,0,1) 14%, rgba(247,255,0,1) 28%, rgba(16,255,0,1) 40%, rgba(0,255,199,1) 52%, rgba(0,63,255,1) 66%, rgba(139,0,255,1) 83%, rgba(255,0,234,1) 95%)",
		// background: "linear-gradient(135deg, rgba(125,0,0,1) 0%, rgba(152,103,0,1) 14%, rgba(156,161,0,1) 28%, rgba(9,145,0,1) 40%, rgba(0,154,120,1) 52%, rgba(0,35,142,1) 66%, rgba(76,0,139,1) 83%, rgba(129,0,118,1) 95%)",
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		borderRadius: '20px',
		padding: '25px',
		marginBottom: '25px'
	};

	return (
		<BlockContainer class="main_container">
			<FlexContainer h_center>
				<Title class="h1_title" styles={{ fontSize: 50, marginBottom: '3vh' }}>
					Welcome to Glow LEDs
				</Title>
			</FlexContainer>
			<div style={div_styles}>
				<FlexContainer h_center>
					<Title class="h2_title" styles={{ fontSize: '30px' }}>
						Diffuser Caps
					</Title>
				</FlexContainer>
				<FlexContainer h_center styles={video_wrapper}>
					<video id="diffuser_caps_video" style={homepage_video} controls>
						<source
							src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
							type="video/mp4"
						/>
					</video>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					It's been too long since a truly new element has been introduced to gloving. This new technology
					puts the designs on the outside of your glove for ultimate definition. 100% facemelt guarantee.
				</p>
				<FlexContainer h_center>
					<Link to="/category/Caps">
						<ButtonWord styles={{ fontSize: '2rem' }}>
							<Title class="h2_title" styles={{ fontSize: 20 }}>
								Shop Diffuser Caps
							</Title>
						</ButtonWord>
					</Link>
				</FlexContainer>
			</div>
			<div style={div_styles}>
				<FlexContainer h_center>
					<Title class="h2_title" styles={{ fontSize: '30px' }}>
						Infinity Mirrors
					</Title>
				</FlexContainer>
				<FlexContainer h_center styles={video_wrapper}>
					<video id="infinity_mirror_video" style={homepage_video} controls>
						<source
							src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
							type="video/mp4"
						/>
					</video>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity mirrors
					are the perfect addition to any chill space. Look into another dimension as vibrant LEDs go on for
					miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that will only be
					found in your space.
				</p>
				<FlexContainer h_center>
					<Link to="/category/Caps">
						<ButtonWord styles={{ fontSize: '2rem' }}>
							<Title class="h2_title" styles={{ fontSize: 20 }}>
								Shop Infinity Mirrors
							</Title>
						</ButtonWord>
					</Link>
				</FlexContainer>
			</div>
			<div style={div_styles}>
				<FlexContainer h_center>
					<Title class="h2_title" styles={{ fontSize: '30px' }}>
						String Lights
					</Title>
				</FlexContainer>
				<FlexContainer h_center styles={video_wrapper}>
					<video id="string_lights_video" style={homepage_video} controls>
						<source
							src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
							type="video/mp4"
						/>
					</video>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your
					space into a festival. Strobes, fades, flashes, they have it all. fill your space with a swimming
					pool of light in every color of the rainbow.
				</p>

				<FlexContainer h_center>
					<Link to="/category/Caps">
						<ButtonWord styles={{ fontSize: '2rem' }}>
							<Title class="h2_title" styles={{ fontSize: 20 }}>
								Shop String Lights
							</Title>
						</ButtonWord>
					</Link>
				</FlexContainer>
			</div>
		</BlockContainer>
	);
};
export default HomePage;
