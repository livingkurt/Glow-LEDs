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
			<img src="/Glow_Strings_V2_Manual.png" alt="manual" className="w-100per" />
		</div>
	);
};

export default AboutPage;
