import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { humanize } from '../../utils/helper_functions';
import { listFeatures } from '../../actions/featureActions';
import { useSelector, useDispatch } from 'react-redux';
import { API_Features, API_Products } from '../../utils';
import { LazyImage, Loading } from '../../components/UtilityComponents';
import { MenuItemD } from '../../components/DesktopComponents';
import { MenuItemM } from '../../components/MobileComponents';

const MenuPage = (props) => {
	const pathname = props.match.params.pathname;

	const [ glovers, set_glovers ] = useState([]);
	const [ artists, set_artists ] = useState([]);
	const [ producers, set_producers ] = useState([]);
	const [ vfx, set_vfx ] = useState([]);

	const [ glowskins, set_glowskins ] = useState([]);
	const [ diffusers, set_diffusers ] = useState([]);
	const [ diffuser_caps, set_diffuser_caps ] = useState([]);
	const [ batteries, set_batteries ] = useState([]);
	const [ accessories, set_accessories ] = useState([]);
	const [ glow_strings, set_glow_strings ] = useState([]);
	const [ glow_casings, set_glow_casings ] = useState([]);
	const [ novaskins, set_novaskins ] = useState([]);
	const [ alt_novaskins, set_alt_novaskins ] = useState([]);
	const [ battery_storage, set_battery_storage ] = useState([]);
	const [ exo_diffusers, set_exo_diffusers ] = useState([]);
	const [ decals, set_decals ] = useState([]);

	const [ geometric, set_geometric ] = useState([]);
	const [ shapes, set_shapes ] = useState([]);
	const [ abstract, set_abstract ] = useState([]);
	const [ patterns, set_patterns ] = useState([]);
	const [ emojis, set_emojis ] = useState([]);
	const [ loading_pictures, set_loading_pictures ] = useState(false);

	const featureList = useSelector((state) => state.featureList);
	const { features, loading, error } = featureList;
	const dispatch = useDispatch();
	useEffect(() => {
		if (pathname === 'featured') {
			dispatch(listFeatures());
			get_features();
		}
		if (pathname === 'gloving' || pathname === 'manuals' || pathname === 'support') {
			get_products_by_category();
		}
		// if (pathname === 'diffuser_caps') {
		// 	get_caps_by_subcategory('diffuser_caps');
		// }
		// if (pathname === 'batteries') {
		// 	get_caps_by_subcategory('batteries');
		// }

		return () => {};
	}, []);

	const get_features = async () => {
		const { data: glovers } = await API_Features.get_features_by_category('glovers');
		const { data: artists } = await API_Features.get_features_by_category('artists');
		const { data: producers } = await API_Features.get_features_by_category('producers');
		const { data: vfx } = await API_Features.get_features_by_category('vfx');
		console.log({ glovers });
		console.log({ artists });
		console.log({ producers });
		console.log({ vfx });
		set_glovers(glovers.data);
		set_artists(artists.data);
		set_producers(producers.data);
		set_vfx(vfx.data);
	};

	const get_products_by_category = async () => {
		set_loading_pictures(true);
		const { data: glowskins } = await API_Products.get_product_pictures('glowskins');
		const { data: diffusers } = await API_Products.get_product_pictures('diffusers');
		const { data: diffuser_caps } = await API_Products.get_product_pictures('diffuser_caps');
		const { data: batteries } = await API_Products.get_product_pictures('accessories', 'batteries');
		const { data: accessories } = await API_Products.get_product_pictures('accessories');
		const { data: glow_strings } = await API_Products.get_product_pictures('glow_strings');
		const { data: glow_casings } = await API_Products.get_product_pictures('glow_casings');
		const { data: exo_diffusers } = await API_Products.get_product_pictures('exo_diffusers');
		const { data: decals } = await API_Products.get_product_pictures('decals');
		const { data: novaskins } = await API_Products.get_product_pictures('glowskins', 'novaskins');
		const { data: alt_novaskins } = await API_Products.get_product_pictures('glowskins', 'alt_novaskins');
		const { data: battery_storage } = await API_Products.get_product_pictures('accessories', 'battery_storage');
		console.log({ glowskins });
		console.log({ diffusers });
		console.log({ diffuser_caps });
		console.log({ batteries });
		console.log({ accessories });
		set_glowskins(glowskins);
		set_diffusers(diffusers);
		set_diffuser_caps(diffuser_caps);
		set_batteries(batteries);
		set_accessories(accessories);
		set_glow_strings(glow_strings);
		set_glow_casings(glow_casings);
		set_novaskins(novaskins);
		set_alt_novaskins(alt_novaskins);
		set_battery_storage(battery_storage);
		set_exo_diffusers(exo_diffusers);
		set_decals(decals);
		set_loading_pictures(false);
	};

	// const get_caps_by_subcategory = async (category) => {
	// 	const { data: geometric } = await API_Products.get_product_pictures(category, 'geometric');
	// 	const { data: shapes } = await API_Products.get_product_pictures(category, 'shapes');
	// 	const { data: abstract } = await API_Products.get_product_pictures(category, 'abstract');
	// 	const { data: patterns } = await API_Products.get_product_pictures(category, 'patterns');
	// 	const { data: emojis } = await API_Products.get_product_pictures(category, 'emojis');
	// 	console.log({ geometric });
	// 	console.log({ shapes });
	// 	console.log({ abstract });
	// 	console.log({ patterns });
	// 	console.log({ emojis });
	// 	if (category === 'batteries') {
	// 		set_geometric(geometric);
	// 		set_shapes(shapes);
	// 		set_abstract(abstract);
	// 		set_patterns(patterns);
	// 		set_emojis(emojis);
	// 	}
	// 	if (category === 'diffuser_caps') {
	// 		set_geometric(geometric);
	// 		set_shapes(shapes);
	// 		set_abstract(abstract);
	// 		set_patterns(patterns);
	// 	}
	// };
	const date = new Date();

	const today = date.toISOString();

	const determine_menu_items = () => {
		if (pathname === 'gloving') {
			return [
				// {
				// 	category: 'glow_strings',
				// 	image: glow_strings[glow_strings.length - 1] && glow_strings[glow_strings.length - 1].images[0]
				// },
				{
					category: 'glowskins',
					image: glowskins[glowskins.length - 1] && glowskins[0].images[0]
				},
				{
					category: 'glow_casings',
					image: glow_casings[glow_casings.length - 1] && glow_casings[glow_casings.length - 1].images[0]
				},
				{
					category: 'glowskins',
					subcategory: 'novaskins',
					image: novaskins[novaskins.length - 1] && novaskins[0].images[0]
				},
				{
					category: 'glowskins',
					subcategory: 'alt_novaskins',
					image: alt_novaskins[alt_novaskins.length - 1] && alt_novaskins[novaskins.length - 1].images[0]
				},
				{
					category: 'diffusers',
					image: diffusers[diffusers.length - 1] && diffusers[diffusers.length - 1].images[0]
				},
				{
					category: 'diffuser_caps',
					image: diffuser_caps[diffuser_caps.length - 1] && diffuser_caps[diffuser_caps.length - 1].images[0]
				},
				{
					category: 'exo_diffusers',
					image: exo_diffusers[exo_diffusers.length - 1] && exo_diffusers[exo_diffusers.length - 1].images[0]
				},
				{
					category: 'decals',
					image: decals[decals.length - 1] && decals[decals.length - 1].images[0]
				},
				{
					category: 'accessories',
					subcategory: 'batteries',
					image: batteries[batteries.length - 1] && batteries[batteries.length - 1].images[0]
				},
				{
					category: 'accessories',
					subcategory: 'battery_storage',
					image:
						battery_storage[battery_storage.length - 1] &&
						battery_storage[battery_storage.length - 1].images[0]
				},

				{
					category: 'accessories',
					image: accessories[accessories.length - 1] && accessories[accessories.length - 1].images[0]
				}
			];
		} else if (pathname === 'batteries') {
			return [
				{ category: 'geometric', image: '' },
				{ category: 'shapes', image: '' },
				{ category: 'abstract', image: '' },
				{ category: 'patterns', image: '' },
				{ category: 'emojis', image: '' }
			];
		} else if (pathname === 'diffuser_caps') {
			return [
				{ category: 'geometric', image: '' },
				{ category: 'shapes', image: '' },
				{ category: 'abstract', image: '' },
				{ category: 'patterns', image: '' }
			];
		} else if (pathname === 'manuals') {
			return [
				{
					category: 'glow_strings_v2',
					image: glow_strings[glow_strings.length - 1] && glow_strings[glow_strings.length - 1].images[0]
				},
				{
					category: 'diffuser_caps',
					image: diffuser_caps[diffuser_caps.length - 1] && diffuser_caps[diffuser_caps.length - 1].images[0]
				},
				{
					category: 'glowskins',
					image: glowskins[glowskins.length - 1] && glowskins[glowskins.length - 1].images[0]
				}
				// { category: 'glowskins', image: glowskins[glowskins.length - 1] && glowskins[0].images[0] },
				// {
				// 	category: 'glow_casings',
				// 	image: glow_casings[glow_casings.length - 1] && glow_casings[glow_casings.length - 1].images[0]
				// },
				// {
				// 	category: 'diffusers',
				// 	image: diffusers[diffusers.length - 1] && diffusers[diffusers.length - 1].images[0]
				// },
				// {
				// 	category: 'exo_diffusers',
				// 	image: exo_diffusers[exo_diffusers.length - 1] && exo_diffusers[exo_diffusers.length - 1].images[0]
				// }
			];
		} else if (pathname === 'decor') {
			return [
				{ category: 'glow_strings', image: 'https://thumbs2.imgbox.com/68/f6/GBGPpTs0_t.jpg' }
				// { category: 'infinity_mirrors', image: 'https://thumbs2.imgbox.com/77/94/3IXh3RtO_t.jpg' }
			];
		} else if (pathname === 'support') {
			return [
				{ category: 'track_your_order', image: 'https://images2.imgbox.com/6d/ca/gy6td2iV_o.png' },
				{ category: 'about', image: 'https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg' },
				{ category: 'faq', image: 'https://images2.imgbox.com/a2/eb/D3aEUSW4_o.png' },
				{ category: 'manuals', image: 'https://images2.imgbox.com/7b/3a/5XKKkHiJ_o.png' },
				{ category: 'announcements', image: 'https://images2.imgbox.com/8b/52/SfnnCLNz_o.png' },
				{ category: 'contact', image: 'https://images2.imgbox.com/30/76/xP16FSiH_o.png' },
				{ category: 'terms', image: 'https://images2.imgbox.com/0b/55/LAI7uhOb_o.png' }
			];
		} else if (pathname === 'sponsored_artists') {
			return [
				{ category: 'sponsors', image: 'https://thumbs2.imgbox.com/f7/ca/Su3FEQr9_t.jpg' },
				{ category: 'teams', image: 'https://thumbs2.imgbox.com/8c/7e/kjzjFzne_t.jpg' }
			];
		} else if (pathname === 'collections') {
			return [
				{ category: 'space_cadet', image: 'https://thumbs2.imgbox.com/80/b2/fENNMhl9_t.jpeg' },
				{ category: 'festy_besty', image: 'https://thumbs2.imgbox.com/90/25/ZwpZrRGy_t.jpeg' },
				{ category: 'platonic_solids', image: 'https://thumbs2.imgbox.com/73/37/ie8226mS_t.jpg' }
			];
		} else if (pathname === 'support') {
			return [
				{ category: 'about', image: 'https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg' },
				{ category: 'faq', image: 'https://images2.imgbox.com/a2/eb/D3aEUSW4_o.png' },
				{ category: 'contact', image: 'https://images2.imgbox.com/30/76/xP16FSiH_o.png' },
				{ category: 'terms', image: 'https://images2.imgbox.com/0b/55/LAI7uhOb_o.png' }
			];
		} else if (pathname === 'featured') {
			console.log({ producers });
			return [
				{
					category: 'artists',
					image: artists[0] && artists[0].logo
					// artist_name: artists[0] && artists[0].artist_name,
					// link: artists[0] && artists[0].link
				},
				{
					category: 'glovers',
					image: `http://img.youtube.com/vi/${glovers.filter(
						(glover) => glover.release_date <= today && glover.category === 'glovers'
					)[0] &&
						glovers.filter((glover) => glover.release_date <= today && glover.category === 'glovers')[0]
							.video}/hqdefault.jpg`
					// artist_name: glovers[0] && glovers[0].artist_name,
					// product: glovers[0] && glovers[0].product
				},

				{
					category: 'producers',
					image: producers[0] && producers[0].logo
					// artist_name: producers[0] && producers[0].artist_name
					// link: producers[0] && producers[0].link
				},
				{
					category: 'vfx',
					image:
						(vfx[0] && vfx[0].logo) || `http://img.youtube.com/vi/${vfx[0] && vfx[0].video}/hqdefault.jpg`
					// artist_name: vfx[0] && vfx[0].artist_name
					// link: vfx[0] && vfx[0].link
				}
			];
		}
	};

	const decide_url = (item) => {
		if (pathname === 'gloving' || pathname === 'decor') {
			if (item.subcategory) {
				return `/collections/all/products/category/${item && item.category}/subcategory/${item &&
					item.subcategory}`;
			} else {
				return `/collections/all/products/category/${item.category}`;
			}
		} else if (pathname === 'featured') {
			return `/collections/all/features/category/${item.category}`;
		} else if (pathname === 'sponsored_artists') {
			return `/collections/all/${item.category}`;
		} else if (pathname === 'manuals') {
			return `/pages/manual/${item.category}`;
		} else if (pathname === 'support') {
			if (item.category === 'manuals') {
				return `/pages/menu/${item.category}`;
			} else {
				return `/pages/${item.category}`;
			}
		} else {
			return `/pages/${item.category}`;
		}
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
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
			</Helmet>
			<Loading loading={loading_pictures} />
			{pathname === 'featured' && (
				<div className="jc-fe">
					<Link to="/account/login?redirect=/account/submit_feature">
						<button className="btn secondary ">Submit Feature</button>
					</Link>
				</div>
			)}
			<div className="jc-c">
				<h1> {humanize(pathname)}</h1>
			</div>
			<div className="product_big_screen">
				<div className="jc-c">
					<div className="jc-c wrap">
						{!loading_pictures &&
							features &&
							glovers &&
							artists &&
							producers &&
							vfx &&
							determine_menu_items().map((item, index) => {
								return <MenuItemD item={item} index={index} decide_url={decide_url} />;
							})}
					</div>
				</div>
			</div>
			<div className="product_small_screen none">
				<div className="jc-c">
					<ul className="jc-c wrap">
						{!loading_pictures &&
							features &&
							glovers &&
							artists &&
							producers &&
							vfx &&
							determine_menu_items().map((item, index) => {
								return <MenuItemM item={item} index={index} decide_url={decide_url} />;
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default MenuPage;
