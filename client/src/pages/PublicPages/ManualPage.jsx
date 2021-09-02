import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { humanize, toCapitalize } from '../../utils/helper_functions';

const ManualPage = (props) => {
	const pathname = props.match.params.pathname;

	const manuals = {
		glow_strings_v2: {
			name: 'Glow Strings V2 Manual',
			manual: '/Glow_Strings_V2_Manual.png',
			videos: [
				{
					title: 'One Button Functionality',
					video: 'oHNFMaUepLs'
				},
				{
					title: 'One Button Functionality',
					video: 'dCjgyMdiKhY'
				},
				{
					title: 'One Button Functionality',
					video: 'LxtZ1noaxlk'
				},
				{
					title: 'One Button Functionality',
					video: '6RCxB4waLAI'
				}
			]
		},
		diffuser_caps: {
			name: 'Diffuser Caps Manual',
			manual: '',
			videos: [
				{
					title: 'Diffuser Caps 101',
					video: 'FJbKd0ClkFM'
				},
				{
					title: 'Orienting Diffuser Caps 101',
					video: 'vG4qgtrotkw'
				}
			]
		},
		glowskins: {
			name: 'Diffuser Caps Manual',
			manual: '/Diffuser_Caps_Manual.png',
			videos: [
				{
					title: 'One Button Functionality',
					video: 'oHNFMaUepLs'
				},
				{
					title: 'One Button Functionality',
					video: 'dCjgyMdiKhY'
				},
				{
					title: 'One Button Functionality',
					video: 'LxtZ1noaxlk'
				},
				{
					title: 'One Button Functionality',
					video: '6RCxB4waLAI'
				}
			]
		},
		glow_casings: {
			name: 'Diffuser Caps Manual',
			manual: '/Diffuser_Caps_Manual.png',
			videos: [
				{
					title: 'One Button Functionality',
					video: 'oHNFMaUepLs'
				},
				{
					title: 'One Button Functionality',
					video: 'dCjgyMdiKhY'
				},
				{
					title: 'One Button Functionality',
					video: 'LxtZ1noaxlk'
				},
				{
					title: 'One Button Functionality',
					video: '6RCxB4waLAI'
				}
			]
		},
		diffusers: {
			name: 'Diffuser Caps Manual',
			manual: '/Diffuser_Caps_Manual.png',
			videos: [
				{
					title: 'One Button Functionality',
					video: 'oHNFMaUepLs'
				},
				{
					title: 'One Button Functionality',
					video: 'dCjgyMdiKhY'
				},
				{
					title: 'One Button Functionality',
					video: 'LxtZ1noaxlk'
				},
				{
					title: 'One Button Functionality',
					video: '6RCxB4waLAI'
				}
			]
		},
		exo_diffusers: {
			name: 'Diffuser Caps Manual',
			manual: '/Diffuser_Caps_Manual.png',
			videos: [
				{
					title: 'One Button Functionality',
					video: 'oHNFMaUepLs'
				},
				{
					title: 'One Button Functionality',
					video: 'dCjgyMdiKhY'
				},
				{
					title: 'One Button Functionality',
					video: 'LxtZ1noaxlk'
				},
				{
					title: 'One Button Functionality',
					video: '6RCxB4waLAI'
				}
			]
		}
	};

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
			<div className="jc-b">
				<div className="mb-10px">
					<Link
						to={`/collections/all/products/category/${pathname === 'glow_strings_v2'
							? 'glow_strings'
							: pathname}`}
					>
						<button class="btn secondary">View Available {toCapitalize(humanize(pathname))}</button>
					</Link>
				</div>
				<div className="mb-10px">
					<Link to={`/pages/menu/manuals`}>
						<button class="btn secondary">Back to Manuals</button>
					</Link>
				</div>
			</div>
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				{manuals[pathname].name}
			</h2>
			{manuals[pathname].manual && <img src={manuals[pathname].manual} alt="manual" className="w-100per" />}
			{manuals[pathname].manual && (
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Watch the Videos below to Learn More
				</h2>
			)}
			<div className="jc-c column m-0px">
				{manuals[pathname].videos.map((video) => (
					<div>
						<h2
							style={{
								textAlign: 'center',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							{video.title}
						</h2>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								title={video.title}
								style={{ borderRadius: '20px' }}
								src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManualPage;
