import React, { useEffect } from 'react';
import { Title, ButtonWord } from '../components/UtilityComponents/index';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents/index';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
	useEffect(() => {
		const video = document.getElementById('caps_vid');
		video.muted = true;
		video.autoplay = true;
		video.playsinline = true;
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

	return (
		<BlockContainer class="main_container">
			<FlexContainer h_center>
				<Title class="h1_title" styles={{ fontSize: 50, marginBottom: '3vh' }}>
					Welcome to Glow LEDs
				</Title>
			</FlexContainer>
			<FlexContainer h_center>
				<Title class="h2_title" styles={{ fontSize: 30 }}>
					Introducing Diffuser Caps
				</Title>
			</FlexContainer>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Custom 3D Printed Caps that go over the Diffuser and Glove to bring your light shows to another
				dimmension
			</p>

			<Title class="h2_title" styles={{ fontSize: 20, justifyContent: 'center', textAlign: 'center' }}>
				Watch the Video Below to See Them in Action
			</Title>
			<FlexContainer h_center styles={video_wrapper}>
				<video id="caps_vid" style={homepage_video} controls>
					<source
						src="videos/optimized_videos/Custom_Infinity_Mirror/Tri-Force-Product-Video.mp4"
						type="video/mp4"
					/>
				</video>
			</FlexContainer>
			<FlexContainer h_center>
				<Link to="/category/Caps">
					<ButtonWord styles={{ fontSize: '2rem', margin: 20 }}>
						<Title class="h2_title" styles={{ fontSize: 30 }}>
							Shop Diffuser Caps Today!
						</Title>
					</ButtonWord>
				</Link>
			</FlexContainer>
			<FlexContainer h_between wrap class="home_links">
				<Link to="/category/Caps" style={{ marginBottom: '16px' }}>
					<FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
						<Title class="h3_title" styles={heading_styles}>
							Diffusers
						</Title>
						<img
							className="home_page_img"
							src="images/optimized_images/product_images/Diffuser_Caps/Seed_of_Life/img_9866_optimized.jpg"
							alt="diffuser_caps"
						/>
					</FlexContainer>
				</Link>
				<Link to="/category/StringLights" style={{ marginBottom: '16px' }}>
					<FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
						<Title class="h3_title" styles={heading_styles}>
							String Lights
						</Title>
						<img
							className="home_page_img"
							src="/images/optimized_images/product_images/String_Lights/String_Lights_50/img_0155_optimized.jpg"
							alt="string_lights"
						/>
					</FlexContainer>
				</Link>
				<Link to="/category/Accessories" style={{ marginBottom: '16px' }}>
					<FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
						<Title class="h3_title" styles={heading_styles}>
							Infinity Mirrors
						</Title>
						<img
							className="home_page_img"
							src="/images/optimized_images/product_images/Custom_Infinity_Mirrors/3---img_9366_optimized.jpg"
							alt="accessories"
						/>
					</FlexContainer>
				</Link>
			</FlexContainer>
		</BlockContainer>
	);
};
export default HomePage;
