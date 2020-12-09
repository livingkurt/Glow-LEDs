import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';

const HomePage = (props) => {
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
				<h1 className="welcome_text mb-3rem" style={{ fontSize: '6rem' }}>
					Welcome to Glow-LEDs
				</h1>
			</div>
			{content &&
			content.home_page && (
				<div className="home_page_divs">
					<div className="jc-c">
						<h2 className="ta-c fs-30px">{content.home_page.h1}</h2>
					</div>
					{content.home_page.show_image && (
						<Link to={content.home_page.link}>
							<img
								style={{ borderRadius: '20px', width: '100%' }}
								src={content.home_page.image}
								className="max-w-800px jc-c m-auto"
								alt="Promo Image"
								title="Promo Image"
							/>
						</Link>
					)}
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
						<h2 style={{ marginBottom: 0, textAlign: 'center' }}>{content.home_page.h2}</h2>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						{content.home_page.p}
					</p>
					<div className="jc-c">
						<Link to={content.home_page.link}>
							<button className="button primary" style={{ background: 'transparent' }}>
								<h2>{content.home_page.button}</h2>
							</button>
						</Link>
					</div>
				</div>
			)}
			<div className="jc-c">
				<h2 style={{ textAlign: 'center' }}>From a Glover that just wants the world to stay lit</h2>
			</div>
			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</p>

			<div className="home_page_divs">
				<div className="jc-c">
					<h2 style={{ textAlign: 'center' }}>Glowskins</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Glowskins Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/3Yk0QOMBlAo?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					What makes Glowskins special? Glowskins are a Casing and Diffuser all in one! Place your entire chip
					inside and create a glow throughout the whole casing! This differs from our Frosted Diffusers which
					create a glow only around the bulb. There are 3 unique sizes, each designed for Coffin, Nano or Coin
					chip microlights. Glowskins are made with semi-flexible TPU plastic so your fingers will always feel
					comfortable! They do not inhibit access to your microlight button for mode switching. Our light and
					streamline design makes your fingers feel weightless. Smooth finish for easy removal from whites.
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/glowskins">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Glowskins</h2>
						</button>
					</Link>
				</div>
			</div>
			<div className="home_page_divs">
				<div className="jc-c">
					<h2 style={{ textAlign: 'center' }}>Diffuser Caps</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Diffuser Caps Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/0b1cn_3EczE?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					It's been too long since a truly new element has been introduced to gloving. We are here to change
					lightshows forever. This new technology puts designs on the outside of your glove for ultimate
					definition. Using a propriety design, you will be able to simply screw on the caps through the
					gloves to the adapter and start throwing heat right away. Mix and match the cap designs create truly
					ridiculous light shows. 100% facemelt guarantee.
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/diffuser_caps">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Diffuser Caps</h2>
						</button>
					</Link>
				</div>
			</div>
			<div className="home_page_divs">
				<div className="jc-c">
					<h2 style={{ textAlign: 'center' }}>Mega Diffuser Caps</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Mega Diffuser Caps Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/CaC-86DAql4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Get the same Diffuser Caps that you know and love in a smaller size. We Call them Mega Diffuser
					Caps!
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/mega_diffuser_caps">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Mega Diffuser Caps</h2>
						</button>
					</Link>
				</div>
			</div>

			<div className="home_page_divs">
				<div className="jc-c">
					<h2 style={{ textAlign: 'center' }}>Frosted Diffusers</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Frosted Diffusers Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/uY2xjrGrZd0?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your home
					into a festival. Strobes, fades, flashes, they have it all. fill your universe with a swimming pool
					of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100 LED), 34 ft (150
					LED), and 46 ft (200 LED) options so there’s a size for every need.
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/frosted_diffusers">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Frosted Diffusers</h2>
						</button>
					</Link>
				</div>
			</div>
			{/* <div className="home_page_divs">
				<div className="jc-c">
					<h2 style={{ textAlign: 'center' }}>Glowskins</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Glowskins Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/K8hSD_VaYG4?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Wanting to invoke a sense of wonder and amazement in your guests (and yourself)? Infinity mirrors
					are the perfect addition to any chill space. Look into another dimension as vibrant LEDs go on for
					miles of rainbow bliss. Order a custom infinity mirror to add that personal touch that will only be
					found in your space.
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/infinity_mirrors">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Glowskins</h2>
						</button>
					</Link>
				</div>
			</div> */}
			<div className="home_page_divs">
				<div className="jc-c">
					<h2>Glow Strings</h2>
				</div>
				<div className="jc-c pos-rel">
					<div className="iframe-container">
						<iframe
							title="Glow Strings Promo Video"
							width="996"
							height="560"
							style={{ borderRadius: '20px' }}
							src="https://www.youtube.com/embed/TCArM88Ll1s?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="1"
						/>
					</div>
				</div>
				<p className="p_descriptions" style={{ textAlign: 'center' }}>
					Make your space glow! Our string lights come with 14 preprogrammed patterns that will turn your home
					into a festival. Strobes, fades, flashes, they have it all. fill your universe with a swimming pool
					of light in every color of the rainbow. Available in 12 ft (50 LED), 23 ft (100 LED), 34 ft (150
					LED), and 46 ft (200 LED) options so there’s a size for every need.
				</p>
				<div className="jc-c">
					<Link to="/collections/all/products/category/glow_strings">
						<button className="button primary" style={{ background: 'transparent' }}>
							<h2>Shop Glow Strings</h2>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default HomePage;
