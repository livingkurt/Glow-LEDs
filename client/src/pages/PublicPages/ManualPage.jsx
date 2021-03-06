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
	return (
		<div className="main_container">
			<Helmet>
				<title>About | Glow LEDs</title>
				<meta property="og:title" content="About" />
				<meta name="twitter:title" content="About" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/about" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/about" />
				<meta name="description" content="Learn how Glow LEDs got started and more in our About Page" />
				<meta property="og:description" content="Learn how Glow LEDs got started and more in our About Page" />
				<meta name="twitter:description" content="Learn how Glow LEDs got started and more in our About Page" />
			</Helmet>
			<div className="mb-10px">
				<button class="btn secondary" onClick={() => props.history.goBack()}>
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
