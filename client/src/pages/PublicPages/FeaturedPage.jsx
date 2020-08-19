import React from 'react';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

const FeaturedPage = (props) => {
	return (
		<div class="main_container">
			<MetaTags>
				<title>Featured | Glow LEDs</title>
				<meta property="og:title" content="Featured | Glow LEDs" />
				<meta name="twitter:title" content="Featured | Glow LEDs" />
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
				<h1> Featured</h1>
			</FlexContainer>

			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				To show our appreciation we will be keeping an archive of the lightshows and product reviews that you
				have so graciously given to us.
			</p>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				For Information on how to become featured on our pages. Check our Frequently Asked Questions page.
			</p>
			<Link to="/pages/faq">
				<FlexContainer h_center>
					<button className="button primary " style={{ margin: 'auto', marginBottom: '10px' }}>
						Frequently Asked Questions
					</button>
				</FlexContainer>
			</Link>
			{/* <FlexContainer h_center>
				<h4> No Content Yet</h4>
			</FlexContainer> */}
			<div className="home_page_divs">
				<FlexContainer h_center column>
					<h1 style={{ textAlign: 'center' }}>StarStream TuT Light Show</h1>
					<p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out StarStream TuT with the Gyrosphere Diffuser Caps!
					</p>
					{/* <p className="p_descriptions" style={{ textAlign: 'center', margin: 0 }}>
						"If it doesn't work the first time, try to turn it off and then leave it off" -Keif
					</p> */}
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow him @ Mckinnley Riojas on Facebook and @starstreamtut on Instagram
					</p>
					<Link to="/collections/all/products/gyrosphere_diffuser_caps">
						<FlexContainer h_center column>
							<div className="p_descriptions" style={{ textAlign: 'center' }}>
								<button className="button primary " style={{ margin: 'auto', marginBottom: '10px' }}>
									Gyrosphere Diffuser Caps
								</button>
							</div>
						</FlexContainer>
					</Link>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/ba39K2M4b7E?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
			</div>
			<div className="home_page_divs">
				<FlexContainer h_center column>
					<h1 style={{ textAlign: 'center' }}>Keif Light Show</h1>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Check out Keif with the dodecahedron point diffuser caps!
					</p>
					<p className="p_descriptions" style={{ textAlign: 'center', margin: 0 }}>
						"If it doesn't work the first time, try to turn it off and then leave it off" -Keif
					</p>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow him @ Keith Booher on Facebook and @flippity_flap_jacks on Instagram
					</p>
					<Link to="/collections/all/products/dodecahedron_point_diffuser_caps">
						<FlexContainer h_center column>
							<div className="p_descriptions" style={{ textAlign: 'center' }}>
								<button className="button primary " style={{ margin: 'auto', marginBottom: '10px' }}>
									Dodecahedron Point Diffuser Caps
								</button>
							</div>
						</FlexContainer>
					</Link>
				</FlexContainer>
				<FlexContainer h_center styles={{ position: 'relative' }}>
					<div className="iframe-container">
						<iframe
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/u6uZel47G8Y?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</FlexContainer>
			</div>
			{/* <div className="home_page_divs">
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
			</div> */}
		</div>
	);
};
export default FeaturedPage;
