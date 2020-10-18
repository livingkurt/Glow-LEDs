import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, reset_password } from '../../actions/userActions';
import { FlexContainer } from '../../components/ContainerComponents';
import MetaTags from 'react-meta-tags';
import { humanize } from '../../utils/helper_functions';

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

	// useEffect(() => {
	//   determine_menu_items()
	//   return () => {
	//     cleanup
	//   }
	// }, [input])

	const determine_menu_items = () => {
		if (pathname === 'gloving') {
			return [ 'frosted_diffusers', 'mini_diffuser_caps', 'diffuser_caps', 'accessories' ];
		} else if (pathname === 'mini_diffuser_caps') {
			return [ 'geometric', 'shapes', 'abstract', 'patterns' ];
		} else if (pathname === 'diffuser_caps') {
			return [ 'geometric', 'shapes', 'abstract', 'patterns', 'emojis' ];
		} else if (pathname === 'decor') {
			return [ 'glow_strings', 'infinity_mirrors' ];
		} else if (pathname === 'community') {
			return [ 'featured', 'music' ];
		} else if (pathname === 'support') {
			return [ 'about', 'faq', 'contact', 'terms' ];
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
			<div className="jc-b">
				{determine_menu_items().map((item) => {
					return (
						<div className="home_page_divs ">
							<Link to={`/collections/all/products/category/${item}`}>
								<button className="button nav">{humanize(item)}</button>
								<img src="" alt="" />
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default MenuPage;
