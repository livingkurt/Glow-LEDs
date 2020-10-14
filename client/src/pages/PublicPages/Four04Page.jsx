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
			<a href="https://imgbox.com/dwckqgq9" target="_blank">
				<img src="https://thumbs2.imgbox.com/2e/7b/dwckqgq9_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/hadYellL" target="_blank">
				<img src="https://thumbs2.imgbox.com/9b/09/hadYellL_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/GBGPpTs0" target="_blank">
				<img src="https://thumbs2.imgbox.com/68/f6/GBGPpTs0_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/TfsBnDpZ" target="_blank">
				<img src="https://thumbs2.imgbox.com/74/a7/TfsBnDpZ_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/FCpWSq8U" target="_blank">
				<img src="https://thumbs2.imgbox.com/a2/a6/FCpWSq8U_t.jpg" alt="image host" />
			</a>
		</FlexContainer>
	);
};
export default Four04Page;
