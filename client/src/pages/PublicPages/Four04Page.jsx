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
			<a href="https://imgbox.com/VFhZo1GK" target="_blank">
				<img src="https://thumbs2.imgbox.com/c7/b2/VFhZo1GK_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/x1CUK8E7" target="_blank">
				<img src="https://thumbs2.imgbox.com/7a/6e/x1CUK8E7_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/zj1QkTQ8" target="_blank">
				<img src="https://thumbs2.imgbox.com/a3/96/zj1QkTQ8_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/XxHQutVf" target="_blank">
				<img src="https://thumbs2.imgbox.com/5d/64/XxHQutVf_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/hJivf8jc" target="_blank">
				<img src="https://thumbs2.imgbox.com/e5/c9/hJivf8jc_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/nWARUCDn" target="_blank">
				<img src="https://thumbs2.imgbox.com/dd/7a/nWARUCDn_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/aXTp5Y68" target="_blank">
				<img src="https://thumbs2.imgbox.com/84/1f/aXTp5Y68_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/dcUQxok0" target="_blank">
				<img src="https://thumbs2.imgbox.com/05/fe/dcUQxok0_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/uwewk4AX" target="_blank">
				<img src="https://thumbs2.imgbox.com/fd/f5/uwewk4AX_t.jpg" alt="image host" />
			</a>{' '}
			<a href="https://imgbox.com/JpJyUVn2" target="_blank">
				<img src="https://thumbs2.imgbox.com/b4/c1/JpJyUVn2_t.jpg" alt="image host" />
			</a>
		</FlexContainer>
	);
};
export default Four04Page;
