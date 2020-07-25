import React, { useEffect } from 'react';
import { FlexContainer } from '../components/ContainerComponents/index';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
	useEffect(() => {
		// const diffuser_caps_video = document.getElementById('diffuser_caps_video');
		// diffuser_caps_video.muted = true;
		// diffuser_caps_video.autoplay = true;
		// diffuser_caps_video.playsinline = true;
		// const infinity_mirror_video = document.getElementById('infinity_mirror_video');
		// infinity_mirror_video.muted = true;
		// infinity_mirror_video.autoplay = true;
		// infinity_mirror_video.playsinline = true;
		// const string_lights_video = document.getElementById('string_lights_video');
		// string_lights_video.muted = true;
		// string_lights_video.autoplay = true;
		// string_lights_video.playsinline = true;
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

	// const homepage_video = {
	// 	width: '100%',
	// 	height: '100%',
	// 	position: 'absolute',
	// 	left: '0',
	// 	top: '0',
	// 	right: '0',
	// 	bottom: '0',
	// 	borderRadius: '20px',
	// 	outline: 'none'
	// };
	// const video_wrapper = {
	// 	position: 'relative'
	// 	// padding: '56.25% 0 0'
	// };

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

	// $(document).ready(function() {
	// 	var inner = $('.inner');
	// 	var elementPosTop = inner.position().top;
	// 	var viewportHeight = $(window).height();
	// 	$(window).on('scroll', function() {
	// 		var scrollPos = $(window).scrollTop();
	// 		var elementFromTop = elementPosTop - scrollPos;

	// 		if (elementFromTop > 0 && elementFromTop < elementPosTop + viewportHeight) {
	// 			inner.addClass('active');
	// 		} else {
	// 			inner.removeClass('active');
	// 		}
	// 	});
	// });

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
		position: 'relative'
		// padding: '56.25% 0 0'
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
				<FlexContainer h_center>
					<h1 className="welcome_text" style={{ fontSize: '6rem', marginBottom: '3vh' }}>
						Glow LEDs Coming Soon!
					</h1>
				</FlexContainer>
				<FlexContainer h_center>
					<h1>From a Glover that just wants the world to stay lit</h1>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items
					are handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up
					with the intention of turning your home into a glowing rainbow dreamland with infinite hours of
					entertainment. You don’t need a party to enjoy our products (although parties are defiantly
					encouraged). The beautiful colors have the ability to turn your home into the next best festival or
					into a relaxing retreat, you decide.
				</p>
				{/* <div className="home_page_divs">
					<FlexContainer h_center>
						<h1>Diffuser Caps</h1>
					</FlexContainer>
					<FlexContainer h_center styles={video_wrapper}>

						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/CaC-86DAql4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</FlexContainer>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						It's been too long since a truly new element has been introduced to gloving. We are here to
						change lightshows forever. This new technology puts designs on the outside of your glove for
						ultimate definition. Using a propriety design, you will be able to simply screw on the caps
						through the gloves to the adapter and start throwing heat right away. Mix and match the cap
						designs create truly ridiculous light shows. 100% facemelt guarantee.
					</p>
				</div> */}
				<div className="home_page_divs">
					<FlexContainer h_center>
						<h1>Infinity Mirrors</h1>
					</FlexContainer>
					<FlexContainer h_center styles={video_wrapper}>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/RLiFZahHbjU?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</FlexContainer>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity
						mirrors are the perfect addition to any chill space. Look into another dimension as vibrant LEDs
						go on for miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that
						will only be found in your space.
					</p>
				</div>
				<div className="home_page_divs">
					<FlexContainer h_center>
						<h1>String Lights</h1>
					</FlexContainer>
					<FlexContainer h_center styles={video_wrapper}>
						{/* <video id="string_lights_video" style={homepage_video} controls>
						<source src="https://youtu.be/kDZVkghXxRs" type="video/mp4" />
					</video> */}
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								style={{ borderRadius: '20px' }}
								src="https://www.youtube.com/embed/TCArM88Ll1s?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</FlexContainer>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your
						home into a festival. Strobes, fades, flashes, they have it all. fill your universe with a
						swimming pool of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100
						LED), 34 ft (150 LED), and 46 ft (200 LED) options so there’s a size for every need.
					</p>
				</div>
			</div>
		</div>
	);
};
export default HomePage;
