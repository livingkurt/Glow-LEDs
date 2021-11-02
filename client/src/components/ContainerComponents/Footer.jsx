import React from 'react';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../Hooks/windowDimensions';

const Footer = () => {
	const { height, width } = useWindowDimensions();

	return (
		<footer className="ta-c w-100per mt-5rem h-400px" style={{ backgroundColor: '#333333' }}>
			<div className="footer-image">
				<Link to="/">
					<div className="">
						<img
							className=""
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Big Logo"
						/>
					</div>
				</Link>
				<div className="mt-2rem wrap jc-c ">
					<div className="ml-10px fs-30px jc-b w-100per max-w-500px">
						<div className="ml-10px fs-40px">
							<a
								href="https://www.facebook.com/Glow-LEDscom-100365571740684"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-facebook zoom" />
							</a>
						</div>
						<div className="ml-10px fs-40px">
							<a href="https://www.instagram.com/glow_leds/" target="_blank" rel="noopener noreferrer">
								<i className="fab fa-instagram zoom" />
							</a>
						</div>
						<div className="ml-10px fs-40px">
							<a
								href="https://www.tiktok.com/@glow_leds?lang=en"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-tiktok zoom" />
							</a>
						</div>
						<div className="mh-10px fs-40px">
							<a
								href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1?sub_confirmation=1"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-youtube zoom" />
							</a>
						</div>
						<div className="mh-10px fs-40px">
							<a href="https://twitter.com/glow_leds" target="_blank" rel="noopener noreferrer">
								<i className="fab fa-twitter zoom" />
							</a>
						</div>
						<div className="mr-10px fs-40px">
							<a href="https://soundcloud.com/ntre/tracks" target="_blank" rel="noopener noreferrer">
								<i className="fab fa-soundcloud" />
							</a>
						</div>
					</div>
				</div>

				<div className="jc-b ai-c w-100per p-10px">
					<div className="jc-a w-100per">
						<div>
							<h2 className="ta-l">
								<Link to="/collections/all/products">Products</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/best_sellers">Best Sellers</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/essentials">Glow LEDs Essensials</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/discounted">On Sale!</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/accessories/stickers">Stickers</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="ta-l">
								<Link to="/collections/all/products">Gloving</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/decals">Decals</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/exo_diffusers">EXO Diffusers</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/glow_casings">Glow Casings</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/glowskins">Glowskins</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/diffusers">Diffusers</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/diffuser_caps">Diffuser Caps</Link>
								</li>

								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/accessories">Accessories</Link>
								</li>
							</ul>
						</div>
						<div style={{ display: width < 750 ? 'none' : 'block' }}>
							<h2 className="ta-l">
								<Link to="/collections/all/products">Flow Art Essensials</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m">
										Glow Strings V2
									</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/1620_batteries">1620 Batteries</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/1225_batteries">1225 Batteries</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/accessories/battery_storage">
										Battery Storage
									</Link>
								</li>
							</ul>
						</div>
						<div style={{ display: width < 950 ? 'none' : 'block' }}>
							<h2 className="ta-l">
								<Link to="/pages/featured">Featured</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/pages/menu/sponsored_artists">Sponsored Artists</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/features/artists">Artists</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/features/category/glovers">Glovers</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/features/producers">Producers</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/features/vfx">VFX</Link>
								</li>
							</ul>
						</div>
						<div style={{ display: width < 550 ? 'none' : 'block' }}>
							<h2 className="ta-l">
								<Link to="/collections/all/products">Support</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/secure/account/profile">My Account</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/track_your_order">Track Your Order</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/about">About</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/faq">FAQ</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/contact">Contact</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/terms">Terms</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/sitemap">Sitemap</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* <div className="jc-b ai-c w-100per p-10px  none">
					<div className="jc-a w-100per">
						<div>
							<h2 className="ta-l">
								<Link to="/collections/all/products">Products</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/glowskins">Glowskins</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/diffusers">
										Frosted Diffusers
									</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/diffuser_caps">Diffuser Caps</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/mega_diffuser_caps">
										Mega Diffusers Caps
									</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/collections/all/products/accessories">Accessories</Link>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="ta-l">
								<Link to="/pages/menu/community">Community</Link>
							</h2>
							<ul className="lst-none">
								<li className="ta-l mv-2rem">
									<Link to="/pages/announcments">Announcments</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/menu/featured">Featured</Link>
								</li>
								<li className="ta-l mv-2rem">
									<Link to="/pages/music">Music</Link>
								</li>
							</ul>
						</div>
					</div>
				</div> */}
			</div>
		</footer>
	);
};

export default Footer;
