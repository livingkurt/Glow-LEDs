import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { humanize, snake_case } from '../../utils/helper_functions';
import { useSelector, useDispatch } from 'react-redux';
import { API_Features, API_Products } from '../../utils';
import { Loading } from '../../components/UtilityComponents';
import { MenuItemD } from '../../components/DesktopComponents';
import { MenuItemM } from '../../components/MobileComponents';
import { listContents } from '../../actions/contentActions';

const MenuPage = (props) => {
	const pathname = props.match.params.pathname;

	const [ items, set_items ] = useState([]);
	const [ loading_pictures, set_loading_pictures ] = useState(false);

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (pathname === 'featured') {
					get_features();
				}
				if (pathname === 'gloving' || pathname === 'manuals' || pathname === 'support') {
					get_display_content();
				}
			}
			return () => (clean = false);
		},
		[ pathname ]
	);

	const get_display_content = async () => {
		set_loading_pictures(true);
		const { data } = await API_Products.get_display_content();
		console.log({ data });
		if (data) {
			const menu_items = determine_menu_items(data[0]);
			set_items(menu_items);
			console.log({ determine_menu_items: menu_items });
			set_loading_pictures(false);
		}
		set_loading_pictures(false);
	};

	const get_features = async () => {
		const { data: glovers } = await API_Features.get_features_by_category('glovers');
		const { data: artists } = await API_Features.get_features_by_category('artists');
		const { data: producers } = await API_Features.get_features_by_category('producers');
		const { data: vfx } = await API_Features.get_features_by_category('vfx');
		// console.log({ glovers: glovers[0] });
		// console.log({ artists: artists[0] });
		// console.log({ producers: producers[0] });
		// console.log({ vfx: vfx[0] });
		if (glovers && artists && producers && vfx) {
			const menu_items = await featured_menu_items(glovers, artists, producers, vfx);
			set_items(menu_items);
		}
	};

	const date = new Date();

	const today = date.toISOString();

	const featured_menu_items = (glovers, artists, producers, vfx) => {
		console.log({ featured: producers });
		if (glovers && artists && producers && vfx) {
			console.log({ glovers, artists, producers, vfx });
			return [
				{
					label: 'Artists',
					image: artists[0] && artists[0].logo,
					link: '/collections/all/features/category/artists'
				},
				{
					label: 'Glovers',
					image: `http://img.youtube.com/vi/${glovers.filter(
						(glover) => glover.release_date <= today && glover.category === 'glovers'
					) &&
						glovers.filter((glover) => glover.release_date <= today && glover.category === 'glovers')[0]
							.video}/hqdefault.jpg`,
					link: '/collections/all/features/category/glovers'
				},

				{
					label: 'Producers',
					image: producers[0] && producers[0].logo,
					link: '/collections/all/features/category/producers'
				},
				{
					label: 'VFX',
					image: (vfx[0] && vfx[0].logo) || `http://img.youtube.com/vi/${vfx && vfx.video}/hqdefault.jpg`,
					link: '/collections/all/features/category/vfx'
				}
			];
		}
	};

	const determine_menu_items = (content) => {
		console.log({ determine_menu_items: content });
		if (pathname === 'gloving') {
			if (content) {
				return content && content.home_page && content.home_page.slideshow;
			}
		} else if (pathname === 'manuals') {
			return (
				content &&
				content.home_page &&
				content.home_page.slideshow
					.filter(
						(item) =>
							item.label === 'Glow Strings V2' ||
							item.label === 'Diffuser Caps' ||
							item.label === 'Glowskins'
					)
					.map((item) => {
						return { ...item, link: `/pages/manual/${snake_case(item.label)}` };
					})
			);
		} else if (pathname === 'support') {
			return [
				{
					label: 'Track Your Order',
					link: '/pages/track_your_order',
					image: 'https://images2.imgbox.com/6d/ca/gy6td2iV_o.png'
				},
				{ label: 'About', link: '/pages/about', image: 'https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg' },
				{ label: 'FAQ', link: '/pages/faq', image: 'https://images2.imgbox.com/a2/eb/D3aEUSW4_o.png' },
				{ label: 'Manuals', link: '/pages/manuals', image: 'https://images2.imgbox.com/7b/3a/5XKKkHiJ_o.png' },
				{
					label: 'Announcements',
					link: '/pages/announcements',
					image: 'https://images2.imgbox.com/8b/52/SfnnCLNz_o.png'
				},
				{ label: 'Contact', link: '/pages/contact', image: 'https://images2.imgbox.com/30/76/xP16FSiH_o.png' },
				{ label: 'Terms', link: '/pages/terms', image: 'https://images2.imgbox.com/0b/55/LAI7uhOb_o.png' }
			];
		} else if (pathname === 'sponsored_artists') {
			return [
				{
					label: 'Sponsors',
					image: 'https://thumbs2.imgbox.com/f7/ca/Su3FEQr9_t.jpg',
					link: '/collections/all/sponsors'
				},
				{
					label: 'Teams',
					image: 'https://thumbs2.imgbox.com/8c/7e/kjzjFzne_t.jpg',
					link: '/collections/all/teams'
				}
			];
		} else if (pathname === 'collections') {
			return [
				{
					label: 'Texture',
					link: '/collections/all/products/category/diffuser_caps/collection/texture',
					image: 'https://thumbs2.imgbox.com/bb/94/ZlPGCXf2_t.jpeg'
				},
				{
					label: 'Space Cadet',
					link: '/collections/all/products/category/diffuser_caps/collection/space_cadet',
					image: 'https://thumbs2.imgbox.com/80/b2/fENNMhl9_t.jpeg'
				},
				{
					label: 'Festy Besty',
					link: '/collections/all/products/category/diffuser_caps/collection/festy_besty',
					image: 'https://thumbs2.imgbox.com/90/25/ZwpZrRGy_t.jpeg'
				},
				{
					label: 'Platonic Solids',
					link: '/collections/all/products/category/diffuser_caps/collection/platonic_solids',
					image: 'https://thumbs2.imgbox.com/73/37/ie8226mS_t.jpg'
				}
			];
		}
	};

	const decide_url = (item) => {
		if (item) {
			if (pathname === 'gloving' || pathname === 'decor') {
				if (item.subcategory) {
					return `/collections/all/products/${item.pathname}`;
				} else {
					return `/collections/all/products/category/${item.category}`;
				}
			} else if (pathname === 'featured') {
				return `/collections/all/features/${item.category}`;
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
							items &&
							items.map((item, index) => {
								return <MenuItemD item={item} index={index} decide_url={decide_url} />;
							})}
					</div>
				</div>
			</div>
			<div className="product_small_screen none">
				<div className="jc-c">
					<ul className="jc-c wrap">
						{!loading_pictures &&
							items &&
							items.map((item, index) => {
								return <MenuItemM item={item} index={index} decide_url={decide_url} />;
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default MenuPage;
