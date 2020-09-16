import React from 'react';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const Four04Page = (props) => {
	return (
		<FlexContainer h_center column t_center>
			<MetaTags>
				<title>404 Not Found | Glow LEDs</title>
				{/* <meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/> */}
				<meta property="og:title" content="Products | Glow LEDs" />
				{/* <meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
				<meta property="og:url" content="https://www.glow-leds.com" />

				<meta name="twitter:title" content="Products | Glow LEDs" />
				{/* <meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
			</MetaTags>
			<h1 styles={{ margin: '20px auto' }}>404 Page Not Found</h1>
			<label>Sorry About that</label>
			<a href="https://imgbox.com/RUGmaL2p" target="_blank">
				<img src="https://thumbs2.imgbox.com/ac/85/RUGmaL2p_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/0A0SSu3s" target="_blank">
				<img src="https://thumbs2.imgbox.com/04/d9/0A0SSu3s_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/JMF2TrCn" target="_blank">
				<img src="https://thumbs2.imgbox.com/1b/23/JMF2TrCn_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/E7MNIl0O" target="_blank">
				<img src="https://thumbs2.imgbox.com/d4/d4/E7MNIl0O_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/9ewtEmAE" target="_blank">
				<img src="https://thumbs2.imgbox.com/b4/e6/9ewtEmAE_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/lYGhPqIB" target="_blank">
				<img src="https://thumbs2.imgbox.com/ad/f0/lYGhPqIB_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/WcvvhMHM" target="_blank">
				<img src="https://thumbs2.imgbox.com/7c/f8/WcvvhMHM_t.jpg" alt="image host" />
			</a>
		</FlexContainer>
	);
};
export default Four04Page;
