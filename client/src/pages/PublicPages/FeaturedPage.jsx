import React from 'react';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

const FeaturedPage = (props) => {
	return (
		<div class="main_container">
			<MetaTags>
				<title>Featured | Glow LEDs</title>
				<link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
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
				/>
				<meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1> Featured</h1>
			</FlexContainer>

			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				A place where we will save all the lightshows and product reviews that you have so graciously given to
				us. To show our appreciation we will be keeping an archive of all of videos and pictures you've sent u.
			</p>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>Diffuser Caps</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/CaC-86DAql4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					It's been too long since a truly new element has been introduced to gloving. We are here to change
					lightshows forever. This new technology puts designs on the outside of your glove for ultimate
					definition. Using a propriety design, you will be able to simply screw on the caps through the
					gloves to the adapter and start throwing heat right away. Mix and match the cap designs create truly
					ridiculous light shows. 100% facemelt guarantee.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/caps">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Diffuser Caps</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>Infinity Mirrors</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/K8hSD_VaYG4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity mirrors
					are the perfect addition to any chill space. Look into another dimension as vibrant LEDs go on for
					miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that will only be
					found in your space.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/infinity_mirrors">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Infinity Mirrors</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1>String Lights</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/TCArM88Ll1s?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your home
					into a festival. Strobes, fades, flashes, they have it all. fill your universe with a swimming pool
					of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100 LED), 34 ft (150
					LED), and 46 ft (200 LED) options so there’s a size for every need.
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/category/string_lights">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop String Lights</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
		</div>
	);
};
export default FeaturedPage;
