import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const AboutPage = (props) => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_content = contents.find((content) => content.active === true);
			if (active_content) {
				dispatch(detailsContent(active_content._id));
			}
			return () => {};
		},
		[ contents ]
	);
	const manuals = {
		glow_strings_manual: {
			name: 'Glow Strings V2 Manual',
			image: '/Glow_Strings_V2_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		},
		diffuser_caps_manual: {
			name: 'Diffuser Caps Manual',
			image: '/Diffuser_Caps_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		},
		glowskins_manual: {
			name: 'Diffuser Caps Manual',
			image: '/Diffuser_Caps_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		},
		glow_casings_manual: {
			name: 'Diffuser Caps Manual',
			image: '/Diffuser_Caps_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		},
		diffusers_manual: {
			name: 'Diffuser Caps Manual',
			image: '/Diffuser_Caps_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		},
		exo_diffusers_manual: {
			name: 'Diffuser Caps Manual',
			image: '/Diffuser_Caps_Manual.png',
			video: [
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				},
				{
					title: 'One Button Functionality',
					video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
				}
			]
		}
	};

	// const data = [
	// 	{
	//     name: 'Glow Strings V2 Manual',
	// 		image: '/Glow_Strings_V2_Manual.png',
	// 		[
	//       {title: 'One Button Functionality', video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'},
	// 		{title: 'One Button Functionality', video: 'https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'},
	// 		{title: 'One Button Functionality', video: 'https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'},
	// 		{title: 'One Button Functionality', video: 'https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'}
	//   ]

	// 	},
	// 	{
	// 		image: '/Glow_Strings_V2_Manual.png',
	// 		video: `https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`,
	// 		video: `https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`,
	// 		video: `https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`,
	// 		video: `https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`
	// 	}
	// ];

	// const data =[
	//   {
	//     title: 'One Button Functionality',
	//     video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1',
	//   {
	//     title: 'One Button Functionality',
	//     video: 'https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1'
	//   },
	//   },

	// ];
	return (
		<div className="main_container">
			<Helmet>
				<title>Manual | Glow LEDs</title>
				<meta property="og:title" content="Manual" />
				<meta name="twitter:title" content="Manual" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/about" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/about" />
				<meta name="description" content="Learn how Glow LEDs got started and more in our Manual Page" />
				<meta property="og:description" content="Learn how Glow LEDs got started and more in our Manual Page" />
				<meta
					name="twitter:description"
					content="Learn how Glow LEDs got started and more in our Manual Page"
				/>
			</Helmet>
			<div className="mb-10px">
				<button className="btn secondary" onClick={() => props.history.goBack()}>
					Back to Product
				</button>
			</div>
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Glow Strings V2 Manual
			</h2>
			<img src="/Glow_Strings_V2_Manual.png" alt="manual" className="w-100per" />
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Watch the Videos below to Learn More
			</h2>
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				One Button Functionality
			</h2>
			<div className="jc-c column m-0px">
				<div className="iframe-container">
					<iframe
						width="996"
						height="560"
						style={{ borderRadius: '20px' }}
						src={`https://www.youtube.com/embed/oHNFMaUepLs?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
						frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen="1"
					/>
				</div>
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Everyday Modes
				</h2>
				<div className="iframe-container">
					<iframe
						width="996"
						height="560"
						style={{ borderRadius: '20px' }}
						src={`https://www.youtube.com/embed/dCjgyMdiKhY?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
						frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen="1"
					/>
				</div>
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Festival Modes
				</h2>
				<div className="iframe-container">
					<iframe
						width="996"
						height="560"
						style={{ borderRadius: '20px' }}
						src={`https://www.youtube.com/embed/LxtZ1noaxlk?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
						frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen="1"
					/>
				</div>
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Color Modes
				</h2>
				<div className="iframe-container">
					<iframe
						width="996"
						height="560"
						style={{ borderRadius: '20px' }}
						src={`https://www.youtube.com/embed/6RCxB4waLAI?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
						frameborder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen="1"
					/>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
