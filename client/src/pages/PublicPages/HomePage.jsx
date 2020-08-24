import React from 'react';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

const HomePage = (props) => {
	return (
		<div class="main_container">
			<MetaTags>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and String Lights."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and String Lights."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Infinity Mirrors, and String Lights."
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
			</MetaTags>
			<FlexContainer h_center>
				<h1 className="welcome_text" style={{ fontSize: '6rem', marginBottom: '3vh' }}>
					Welcome to Glow-LEDs
				</h1>
			</FlexContainer>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1 style={{ textAlign: 'center' }}>Custom Diffuser Caps Now Officially Available!!</h1>
				</FlexContainer>

				<Link to="/collections/all/products/custom_diffuser_caps_deposit">
					<img
						style={{ borderRadius: '10px', width: '100%' }}
						src="/images/optimized_images/promo_images/img_9932_home_page_optimized.jpg"
						alt="promo"
					/>
				</Link>
				<FlexContainer h_center>
					<h2 style={{ marginBottom: 0, textAlign: 'center' }}>
						Give your shows a new Glow with Custom Diffuser Caps
					</h2>
				</FlexContainer>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Our most highly requested item is here! 🎊 You can now order CUSTOM DIFFUSER CAPS! 🔥 Imagine
					throwing a light show with your own logo, teams logo, or favorite symbol or pattern as the trails
					😱💀 The sky is the limit here and we cannot wait to see what you come up with! We will take orders
					as first come, first served so be sure to secure your spot in line ASAP to receive the shortest wait
					time 🕑 The process is a little different so be sure to check out the FAQ page under the Support tab
					for full details 😊
				</p>
				<FlexContainer h_center>
					<Link to="/collections/all/products/custom_diffuser_caps_deposit">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Custom Diffuser Caps</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>From a Glover that just wants the world to stay lit</h1>
			</FlexContainer>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</p>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1 style={{ textAlign: 'center' }}>Diffuser Caps</h1>
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
					<h1 style={{ textAlign: 'center' }}>Frosted Diffusers</h1>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/uY2xjrGrZd0?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
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
					<Link to="/collections/all/products/category/frosted_diffusers">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Frosted Diffusers</h2>
						</button>
					</Link>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center>
					<h1 style={{ textAlign: 'center' }}>Infinity Mirrors</h1>
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
export default HomePage;
