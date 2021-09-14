import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import { ReadMore } from '../../components/SpecialtyComponents';

const HomePage = (props) => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;
	const [ inactive, set_inactive ] = useState(false);

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
			} else {
				set_inactive(true);
			}
			return () => {};
		},
		[ contents ]
	);

	// "These string lights are sure to make your space glow. With many preloaded modes there will never be a dull moment. There are flashing modes, fading modes, strobing modes, and every color of the rainbow. Perfect for the campsite at your next festival or your chill spot in the house. These lights are bright and can easily illuminate a large room turning it into an at home festival.""

	const homepage_videos = [
		{
			name: 'EXO Diffusers',
			category: 'exo_diffusers',
			video: 'hPxFDj7R5Lg',
			color: '#8e4a4a',
			description:
				'The next breakthrough in diffuser technology is here!! Wiffle Ball Diffusers! Wiffle Ball Diffusers or filter use a 2 material technology that allows for a perfect blend of the colors as well as incorporating a opaque layer to give a light filtering effect that will leave the viewer speechless! '
		},
		{
			name: 'Glow Strings V2',
			category: 'glow_strings',
			video: 'mNBwaZKWi8c',
			color: '#b1832f',
			description:
				'Make your space glow! Our Glow Strings come with many preprogrammed patterns that will turn your home into a festival. Strobes, fades, flashes, they have it all. Fill your universe with a swimming pool of light in every color of the rainbow. '
		},
		{
			name: 'Glow Casings',
			category: 'glow_casings',
			video: '_aJDfd6vlYU',
			color: '#b1a72f',
			description:
				'What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel comfortable! They do not inhibit access to your microlight button for mode switching. Our light and streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.'
		},
		{
			name: 'Glowskins',
			category: 'glowskins',
			video: '3Yk0QOMBlAo',
			color: '#427942',
			description:
				'What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel comfortable! They do not inhibit access to your microlight button for mode switching. Our light and streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.'
		},

		{
			name: 'Diffuser Caps',
			category: 'diffuser_caps',
			video: '0b1cn_3EczE',
			color: '#416d63',
			description:
				'Take your light shows to a new dimension with Diffuser Caps! This new gloving tech puts patterns and designs on the outside of your glove to add a mesmerizing and unique effect to your lightshows. These Diffuser Adapters are the secret to the technology. Simply place the Diffuser Adapters (sold separately) on your microlight inside of the glove and then twist on the cap to the Diffuser Adapter from the outside of the glove! Diffuser caps are about the size of a classic dome diffuser. 15mm in Diameter. People will be speechless at your tracers and effects! 100% facemelt guarantee. Lights not included. Patent pending. The Diffuser Caps are compatible with the Mini Diffuser Caps purchased before 12/3/20. View the graphic below for visual representation of what we'
		},
		{
			name: 'Frosted Diffusers',
			category: 'diffusers',
			video: 'uY2xjrGrZd0',
			color: '#6d416d',
			description:
				'Tired of diffusers that dont actually diffuse? these frosted diffusers will give your lightshow an added smoothness and flow. these diffusers will distribute the light into an even glow without a bright center point.'
		}
	];

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>

				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</Helmet>

			<div className="jc-c">
				<h1 className="welcome_text mb-1rem ta-c" style={{ fontSize: '4rem' }}>
					Welcome to Glow-LEDs
				</h1>
			</div>
			{content &&
			inactive &&
			content.home_page && (
				<div className="home_page_divs">
					<h4 className="fs-25px mt-8px ta-c title_font">{content.home_page.h1}</h4>
					{content.home_page.show_image &&
					content.home_page.images && (
						<div className="m-auto jc-c max-w-600px">
							<Link to={content.home_page.link}>
								<img
									style={{ borderRadius: '20px', width: '100%' }}
									src={content.home_page.images[0]}
									className="max-w-800px jc-c m-auto"
									alt="Promo"
									title="Promo Image"
								/>
							</Link>
						</div>
					)}

					<div className="m-auto jc-c max-w-800px">
						{!content.home_page.show_image &&
						content.home_page.images && (
							<Link to={content.home_page.link} className="home_page_pictures">
								{content.home_page.images.map((image, index) => (
									<img
										src={image}
										className={'w-100per br-20px m-auto image_' + (index + 1)}
										alt="Promo"
										title="Promo Image"
									/>
								))}
							</Link>
						)}
					</div>
					{content.home_page.show_video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									title="Content Video"
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${content.home_page
										.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					<div className="jc-c">
						<h4 className="fs-18px mb-0px ta-c title_font">{content.home_page.h2}</h4>
					</div>
					<div className="max-w-800px jc-c w-100per m-auto">
						<ReadMore width={1000} className="p_descriptions paragraph_font" length={100} pre={true}>
							{content.home_page.p}
						</ReadMore>
					</div>
					<div className="jc-c">
						<Link to={content.home_page.link}>
							<button className="btn primary bob">{content.home_page.button}</button>
						</Link>
					</div>
				</div>
			)}
			<div className="jc-c">
				{/* <h2 className="ta-c phrase_font">From a Glover that just wants the world to stay lit 🔥 </h2> */}
				{/* <h2 className="ta-c phrase_font">Lighting up your world one LED at a time </h2> */}
			</div>
			{/* <p className="p_descriptions paragraph_font ta-c home_page_description">
			
			</p> */}
			<ReadMore width={1000} className="p_descriptions paragraph_font ta-c" length={100}>
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</ReadMore>
			<div className="big_home_page_cards">
				{homepage_videos.map((card, index) => {
					return (
						<div className="home_page_divs max-h-66rem" style={{ backgroundColor: card.color }} key={index}>
							<div className="jc-c">
								<h4 className="ta-c fs-25px title_font mt-0px">{card.name}</h4>
							</div>
							<div className="row">
								<div className="iframe-container-big">
									<iframe
										title={`${card.name} Promo Video`}
										width="996"
										height="560"
										className="br-20px"
										src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen="1"
									/>
								</div>
								<div className="ml-2rem">
									<p className="p_descriptions paragraph_font w-50rem">{card.description}</p>
									<div className="jc-c">
										<Link
											className="w-100per"
											to={`/collections/all/products/category/${card.category}`}
										>
											<button className="btn primary w-100per">Shop {card.name}</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="small_home_page_cards none">
				{homepage_videos.map((card, index) => {
					return (
						<div className="home_page_divs" style={{ backgroundColor: card.color }} key={index}>
							<div className="jc-c">
								<h2 className="ta-c">{card.name}</h2>
							</div>
							<div className="jc-c pos-rel mb-2rem">
								<div className="iframe-container">
									<iframe
										title={`${card.name} Promo Video`}
										style={{ borderRadius: '20px' }}
										src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen="1"
									/>
								</div>
							</div>
							{/* <p className="p_descriptions paragraph_font home_page_description">
									{card.description}
								</p> */}
							<ReadMore width={1000} className="p_descriptions paragraph_font" length={100}>
								{card.description}
							</ReadMore>
							<div className="jc-c">
								<Link className="w-100per" to={`/collections/all/products/category/${card.category}`}>
									<button className="btn primary w-100per">Shop {card.name}</button>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default HomePage;
