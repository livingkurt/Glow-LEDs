import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../../actions/userActions';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';
import { humanize } from '../../utils/helper_functions';
import API from '../../utils/API';

const MenuPage = (props) => {
	const [ password, setPassword ] = useState('');
	const [ rePassword, setRePassword ] = useState('');

	const pathname = props.match.params.pathname;

	// const gloving = [ 'frosted_diffusers', 'mini_diffuser_caps', 'diffuser_caps', 'accessories' ];
	// const mini_diffuser_caps = [ 'geometric', 'shapes', 'abstract', 'patterns' ];
	// const diffuser_caps = [ 'geometric', 'shapes', 'abstract', 'patterns', 'emojis' ];
	// const decor = [ 'glow_strings', 'infinity_mirrors' ];
	// const community = [ 'featured', 'music' ];
	// const support = [ 'about', 'faq', 'contact', 'terms' ];

	useEffect(() => {
		// get_category_images('frosted_diffusers');
		return () => {};
	}, []);

	const get_category_images = async (category) => {
		const { data } = await API.get_category_images(category);
		// console.log({ data });
		// console.log({ image: data.images[0] });
		// console.log('Success');
		return data.PromiseResult;
	};
	const determine_menu_items = () => {
		if (pathname === 'gloving') {
			return [
				{ category: 'frosted_diffusers', image: 'https://thumbs2.imgbox.com/1f/c9/qXeP6Rtb_t.jpg' },
				{ category: 'mini_diffuser_caps', image: 'https://thumbs2.imgbox.com/34/a1/fH5sSzCD_t.jpg' },
				{ category: 'diffuser_caps', image: 'https://thumbs2.imgbox.com/77/69/NeANPFC2_t.jpg' },
				{ category: 'accessories', image: 'https://thumbs2.imgbox.com/68/f6/GBGPpTs0_t.jpg' }
			];
		} else if (pathname === 'mini_diffuser_caps') {
			return [
				{ category: 'geometric', image: '' },
				{ category: 'shapes', image: '' },
				{ category: 'abstract', image: '' },
				{ category: 'patterns', image: '' }
			];
		} else if (pathname === 'diffuser_caps') {
			return [
				{ category: 'geometric', image: '' },
				{ category: 'shapes', image: '' },
				{ category: 'abstract', image: '' },
				{ category: 'patterns', image: '' },
				{ category: 'emojis', image: '' }
			];
		} else if (pathname === 'decor') {
			return [
				{ category: 'glow_strings', image: 'https://thumbs2.imgbox.com/68/f6/GBGPpTs0_t.jpg' },
				{ category: 'infinity_mirrors', image: 'https://thumbs2.imgbox.com/77/94/3IXh3RtO_t.jpg' }
			];
		} else if (pathname === 'community') {
			return [
				{ category: 'featured', image: 'https://thumbs2.imgbox.com/a0/9b/65wgCsF2_t.png' },
				{ category: 'music', image: 'https://thumbs2.imgbox.com/ea/82/nqDcxRmr_t.jpg' }
			];
		} else if (pathname === 'support') {
			return [
				{ category: 'about', image: 'https://thumbs2.imgbox.com/c2/39/oRHFB0qz_t.jpeg' },
				{ category: 'faq', image: 'https://thumbs2.imgbox.com/9c/ed/jGyCTlQB_t.png' },
				{ category: 'contact', image: 'https://thumbs2.imgbox.com/6b/a4/JLxNKDWE_t.png' },
				{ category: 'terms', image: 'https://thumbs2.imgbox.com/a0/11/BlKmYy5J_t.png' }
			];
		}
	};

	return (
		<div class="main_container">
			<MetaTags>
				<title>{humanize(pathname)} | Glow LEDs</title>
				<meta property="og:title" content={`${humanize(pathname)}| Glow LEDs`} />
				<meta name="twitter:title" content={`${humanize(pathname)}| Glow LEDs`} />
				<link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
				<meta
					name="description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					property="og:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					name="twitter:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1> {humanize(pathname)}</h1>
			</FlexContainer>
			<div className="jc-c">
				<div className="jc-c wrap">
					{determine_menu_items().map((item) => {
						return (
							<div className="home_page_divs m-10px w-300px">
								<Link to={`/collections/all/products/category/${item.category}`}>
									<h2 className="">{humanize(item.category)}</h2>
									{/* {console.log({ img: get_category_images(item.category) })} */}
									<img
										className="w-100per h-auto br-20px"
										width="200px"
										src={item.image}
										alt={item.category}
									/>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default MenuPage;
