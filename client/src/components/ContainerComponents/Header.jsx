import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { listProducts } from '../../actions/productActions';
import Banner from './Banner';
import { HashLink } from 'react-router-hash-link';

const Header = (props) => {
	const history = useHistory();
	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log({ userInfo });

	useEffect(
		() => {
			if (userInfo) {
				set_first_name(userInfo.first_name);
			}
		},
		[ userInfo ]
	);

	const cart = useSelector((state) => state.cart);

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(() => {
		// dispatch(listProducts(''));
		// console.log({ search: search.substring(8) });
		dispatch(listProducts());
	}, []);

	const { cartItems } = cart;

	const open_sidebar = () => {
		const sidebar = document.querySelector('.sidebar');
		console.log(sidebar.classList.value);
		if (sidebar.classList.value === 'sidebar open') {
			document.querySelector('.sidebar').classList.remove('open');
		} else if (sidebar.classList.value === 'sidebar') {
			document.querySelector('.sidebar').classList.add('open');
		}
	};
	const open_cart = () => {
		const cart = document.querySelector('.cart_sidebar');
		console.log(cart.classList.value);
		if (cart.classList.value === 'cart_sidebar open') {
			document.querySelector('.cart_sidebar').classList.remove('open');
		} else if (cart.classList.value === 'cart_sidebar') {
			document.querySelector('.cart_sidebar').classList.add('open');
		}
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		// dispatch(logout());
		dispatch(logout());
		history.push('/account/login');
	};

	const navbarStyles = {
		position: 'fixed',
		width: '100%',
		transition: 'top 0.2s'
	};

	const [ last_id, set_last_id ] = useState('');
	const [ current_id, set_current_id ] = useState('');

	const show_hide = (id) => {
		set_current_id(id);
		var elems = document.querySelectorAll('.nav-dropdown-subcategory-content');
		[].forEach.call(elems, (el) => {
			el.classList.remove('show-dropdown');
		});
		const current_menu = document.getElementById(id);
		console.log(current_menu.classList);
		if (last_id === id) {
			current_menu.classList.remove('show-dropdown');
		} else {
			current_menu.classList.add('show-dropdown');
		}

		set_last_id(id);
	};

	const clicked_outside = () => {
		var elems = document.querySelectorAll('.nav-dropdown-subcategory-content');
		[].forEach.call(elems, (el) => {
			el.classList.remove('show-dropdown');
		});
	};

	return (
		<div className="">
			<Banner visible={props.visible} />
			<header id="overlay" style={{ ...navbarStyles, top: props.visible ? '0' : '-180px' }}>
				<div className="menu_button w-233px">
					<Link to="/">
						<div className="row">
							<div className="logo h-125px w-125px">
								<img
									className="zoom logo_s"
									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs Logo"
									title="Big Logo"
								/>
							</div>
						</div>
					</Link>
					<button
						className="btn mobile nav none fs-30px h-50px w-50px p-10px"
						onClick={open_sidebar}
						aria-label="sidebar"
					>
						<i className="fas fa-bars" />
					</button>
				</div>

				<div className="column jc-c mh-auto">
					<div className="logo_text jc-c mh-auto ai-c">
						<Link to="/">
							<div className="logo_2 h-80px w-80px none">
								<img
									className="zoom logo_s"
									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs Logo"
									title="Small Logo"
								/>
							</div>
						</Link>
						<Link to="/">
							{/* <div className="pos-rel"> */}
							<div className="row pos-rel">
								<label className="glow_leds_text">Glow LEDs</label>

								<label className="tm" style={{ color: '#9a9898' }}>
									™
								</label>
								<label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">
									Make it Glow
								</label>
							</div>
						</Link>
					</div>
					<nav className="jc-b nav_bar">
						<Link to="/">
							<button className="btn nav">Home</button>
						</Link>
						{/* <Link to="/collections/all/products/category/best_sellers">
							<button className="btn nav w-100per ta-l">Best Sellers</button>
						</Link> */}
						<div className="dropdown-nav">
							<Link to="/collections/all/products">
								<button className="btn nav" onClick={() => dispatch(listProducts(''))}>
									Products
								</button>
							</Link>
							<div className="hover_fade_in nav-dropdown">
								<div className="jc-c">
									<div className="nav-column">
										<Link to="/collections/all/products">
											<button
												className="btn nav  ta-l fs-20px"
												onClick={() => dispatch(listProducts(''))}
											>
												Products
											</button>
										</Link>
										{/* <hr className="w-100per" /> */}

										<Link to="/collections/all/products/category/best_sellers">
											<button className="btn nav w-100per ta-l title_font">Best Sellers</button>
										</Link>
										<Link to="/collections/all/products/category/essentials">
											<button className="btn nav w-100per ta-l title_font jc-b">
												Glow LEDs Essentials
											</button>
										</Link>
										<Link to="/collections/all/products/category/discounted">
											<button className="btn nav w-100per ta-l title_font">On Sale!</button>
										</Link>

										<Link to="/collections/all/products/category/accessories/subcategory/stickers">
											<button className="btn nav w-100per ta-l title_font">Stickers</button>
										</Link>
									</div>
									<div className="nav-column">
										<Link to="/pages/menu/gloving">
											<button className="btn nav w-100per ta-l fs-20px">Gloving</button>
										</Link>
										{/* <hr className="w-100per" /> */}
										<Link to="/collections/all/products/category/exo_diffusers">
											<button className="btn nav w-100per ta-l title_font">EXO Diffusers</button>
										</Link>
										<Link to="/collections/all/products/category/glow_casings">
											<button className="btn nav w-100per ta-l title_font jc-b">
												Glow Casings
												{/* <i className=" trans-neg-270 fas fa-sort-up" /> */}
											</button>
										</Link>
										<div className="nav-btn-container">
											<Link
												to="/collections/all/products/category/glowskins"
												className="w-100per"
											>
												<button className="nav-btn-link title_font">Glowskins</button>
											</Link>
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('glowskins_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div>
										<div className="nav-btn-container">
											<Link
												to="/collections/all/products/category/frosted_diffusers"
												className="w-100per"
											>
												<button className="nav-btn-link title_font">Frosted Diffusers</button>
											</Link>
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('frosted_diffusers_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div>
										<div className="nav-btn-container">
											<Link
												to="/collections/all/products/category/diffuser_caps"
												className="w-100per"
											>
												<button className="nav-btn-link title_font">Diffuser Caps</button>
											</Link>
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('diffuser_caps_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div>
										{/* <div className="nav-btn-container">
											<Link
												to="/collections/all/products/category/accessories"
												className="w-100per"
											>
												<button className="nav-btn-link title_font">Accessories</button>
											</Link>
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('accessories_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div> */}
										<Link to="/collections/all/products/category/accessories">
											<button className="btn nav w-100per ta-l title_font jc-b">
												Accessories
												{/* <i className=" trans-neg-270 fas fa-sort-up" /> */}
											</button>
										</Link>
										{/* <Link to="/collections/all/products/category/accessories">
											<button className="btn nav w-100per ta-l title_font">Accessories</button>
										</Link> */}
									</div>

									{/* Glowskins */}
									<div
										className="nav-dropdown-subcategory-content hover_fade_in nav-column"
										id="glowskins_dropdown"
									>
										<Link to="/collections/all/products/category/glowskins">
											<button className="btn nav w-100per ta-l fs-20px">Glowskins</button>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/classics">
											<div className="row">
												{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
												<button className="btn nav w-100per ta-l title_font">Classics</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/novaskins">
											<div className="row">
												{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
												<button className="btn nav w-100per ta-l title_font">Novaskins</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/alt_novaskins">
											<div className="row">
												{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
												<button className="btn nav w-100per ta-l title_font">
													Alt Novaskins
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/imperfect">
											<div className="row">
												{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
												<button className="btn nav w-100per ta-l title_font">Imperfect</button>
											</div>
										</Link>
									</div>
									{/* Frosted Diffusers */}
									<div
										className="nav-dropdown-subcategory-content hover_fade_in nav-column"
										id="frosted_diffusers_dropdown"
									>
										<Link to="/collections/all/products/category/frosted_diffusers">
											<button className="btn nav w-100per ta-l fs-20px">Frosted Diffusers</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/abstract">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Abstract (New)
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/polygons">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Polygons (New)
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/cylinders">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Cylinders (New)
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/domes">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Domes (New)
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/open_hole">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Open Hole</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/closed_hole">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Closed Hole
												</button>
											</div>
										</Link>
									</div>
									{/* Diffuser Caps */}
									<div
										className="nav-dropdown-subcategory-content hover_fade_in nav-column"
										id="diffuser_caps_dropdown"
									>
										<Link to="/collections/all/products/category/diffuser_caps">
											<button className="btn nav w-100per ta-l fs-20px">Diffuser Caps</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Geomotric</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Shapes</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Abstract</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Patterns</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Imperfect</button>
											</div>
										</Link>
									</div>
									<div className="nav-column">
										<Link to="/collections/all/products/category/accessories">
											<button className="btn nav w-100per ta-l fs-20px">
												Flow Art Essensials
											</button>
										</Link>
										<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m">
											<button className="btn nav ta-l w-100per special_font gradient-btn">
												GLOW STRINGS V2
											</button>
										</Link>
										<Link to="/collections/all/products/1620_batteries">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													1620 Batteries
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/1225_batteries">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													1225 Batteries
												</button>
											</div>
										</Link>
										<Link to="/collections/all/products/category/accessories/subcategory/battery_storage">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Battery Storage
												</button>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown-nav">
							<Link to="/pages/menu/featured">
								<button className="btn nav">Features</button>
							</Link>
							<div className="hover_fade_in nav-dropdown">
								<div className="jc-c">
									<div className="w-100per max-w-300px">
										<Link to="/pages/menu/featured">
											<button className="btn nav w-100per ta-l fs-20px">Featured</button>
										</Link>
										<div className="nav-btn-container">
											{/* <Link to="/collections/all/products/category/glowskins" className="w-80per"> */}
											<button className="nav-btn-link title_font ">Sponsored Artists</button>
											{/* </Link>/ */}
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('sponsored_artists_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div>
										<Link to="/collections/all/features/category/artists">
											<button className="btn nav w-100per ta-l title_font">Artists</button>
										</Link>
										<Link to="/collections/all/features/category/glovers">
											<button className="btn nav w-100per ta-l title_font jc-b">Glovers</button>
										</Link>
										<Link to="/collections/all/features/category/producers">
											<button className="btn nav w-100per ta-l title_font">Producers</button>
										</Link>
										<Link to="/collections/all/features/category/vfx">
											<button className="btn nav w-100per ta-l title_font">VFX</button>
										</Link>
									</div>

									<div
										className="nav-dropdown-subcategory-content hover_fade_in w-100per max-w-250px"
										id="sponsored_artists_dropdown"
									>
										{/* <Link to="/pages/menu/gloving"> */}
										<button className="btn nav w-100per ta-l fs-20px">Sponsored Artists</button>
										{/* </Link> */}
										<Link to="/collections/all/sponsors">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Sponsored Glovers
												</button>
											</div>
										</Link>
										<Link to="/collections/all/teams">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Sponsored Teams
												</button>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown-nav">
							<Link to="/pages/menu/support">
								<button className="btn nav">Support</button>
							</Link>
							<div className="hover_fade_in nav-dropdown">
								<div className="jc-c">
									<div className="w-100per max-w-300px">
										{/* <Link to="/collections/all/features"> */}
										<button className="btn nav w-100per ta-l fs-20px">Support</button>
										{/* </Link> */}

										<Link to="/pages/track_your_order">
											<button className="btn nav w-100per ta-l title_font">
												Track Your Order
											</button>
										</Link>
										<Link to="/pages/about">
											<button className="btn nav w-100per ta-l title_font jc-b">About</button>
										</Link>
										<Link to="/pages/announcements">
											<button className="btn nav w-100per ta-l title_font">Announcements</button>
										</Link>
										<div className="nav-btn-container">
											{/* <Link to="/collections/all/products/category/glowskins" className="w-80per"> */}
											<button className="nav-btn-link w-100per ta-l title_font w-80per">
												FAQ
											</button>
											{/* </Link>/ */}
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('faq_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div>
										<Link to="/pages/contact">
											<button className="btn nav w-100per ta-l title_font">Contact</button>
										</Link>
										<Link to="/pages/terms">
											<button className="btn nav w-100per ta-l title_font">
												Term and Conditions
											</button>
										</Link>
									</div>

									<div
										className="nav-dropdown-subcategory-content hover_fade_in w-100per max-w-250px"
										id="faq_dropdown"
									>
										<Link to="/pages/faq">
											<button className="btn nav w-100per ta-l fs-20px">FAQ</button>
										</Link>
										<HashLink to="/pages/faq#glowskins">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">Glowskins</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#using_diffuser_caps_and_adapters">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Diffuser Caps Guide
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#diffuser_too_tight_too_loose">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Diffusers Too Tight/Loose?
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#ordering_custom_products">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Ordering Custom Products
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#featured_content">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Featured Content
												</button>
											</div>
										</HashLink>

										<HashLink to="/pages/faq#processing_shipping">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Processing/Shipping
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#returns_cancellations">
											<div className="row">
												<button className="btn nav w-100per ta-l title_font">
													Returns/Cancellations
												</button>
											</div>
										</HashLink>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
				{/* <Link to="/checkout/cart"> */}
				<button className="btn mobile nav cart_icon none" onClick={open_cart}>
					<i className="fas fa-shopping-cart" />{' '}
					{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
				</button>
				{/* </Link> */}
				<div className="nav_bar w-233px jc-fe">
					{/* <Link to="/checkout/cart"> */}
					<button className="btn nav cart_text w-105px" onClick={open_cart}>
						Cart <i className="fas fa-shopping-cart" />{' '}
						{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
					</button>
					{/* </Link> */}
					{/* <Link to="/checkout/cart"> */}
					<button className="btn mobile nav cart_icon none" onClick={open_cart}>
						<i className="fas fa-shopping-cart" />{' '}
						{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
					</button>
					{/* </Link> */}
					{userInfo && userInfo.hasOwnProperty('first_name') ? (
						<div className="dropdown">
							<button className="btn nav">{first_name}</button>
							<ul className="dropdown-content hover_fade_in w-110px">
								<Link to="/secure/account/profile">
									<button className="btn nav">Profile</button>
								</Link>
								<Link to="/secure/account/orders">
									<button className="btn nav">Orders</button>
								</Link>
								<button className="btn nav mr-auto" onClick={handleLogout}>
									{' '}
									Logout
								</button>
							</ul>
						</div>
					) : (
						<div>
							<Link to="/account/login">
								<button className="btn nav">Login</button>
							</Link>
						</div>
					)}
					{userInfo &&
					userInfo.isAdmin && (
						<div className="dropdown ">
							<button className="btn nav">Admin</button>
							<ul className="dropdown-content hover_fade_in">
								<Link to="/secure/glow/controlpanel">
									<button className="btn nav w-152px">Control Panel</button>
								</Link>
								<Link to="/secure/glow/orders">
									<button className="btn nav">Orders</button>
								</Link>
								<Link to="/secure/glow/products">
									<button className="btn nav"> Products</button>
								</Link>
								<Link to="/secure/glow/users">
									<button className="btn nav"> Users</button>
								</Link>
								<Link to="/secure/glow/expenses">
									<button className="btn nav"> Expenses</button>
								</Link>
								<Link to="/secure/glow/features">
									<button className="btn nav"> Features</button>
								</Link>
								<Link to="/secure/glow/paychecks">
									<button className="btn nav"> Paychecks</button>
								</Link>
								<Link to="/secure/glow/affiliates">
									<button className="btn nav"> Affiliates</button>
								</Link>
								<Link to="/secure/glow/teams">
									<button className="btn nav"> Teams</button>
								</Link>
								<Link to="/secure/glow/promos">
									<button className="btn nav">Promos</button>
								</Link>
								<Link to="/secure/glow/carts">
									<button className="btn nav">Carts</button>
								</Link>
								<Link to="/secure/glow/contents">
									<button className="btn nav">Contents</button>
								</Link>
								<Link to="/secure/glow/emails">
									<button className="btn nav">Emails</button>
								</Link>
								<Link to="/secure/glow/logs">
									<button className="btn nav">Logs</button>
								</Link>
								<Link to="/secure/glow/chips">
									<button className="btn nav">Chips</button>
								</Link>
								<Link to="/secure/glow/surveys">
									<button className="btn nav">Surveys</button>
								</Link>
								<Link to="/secure/glow/parcels">
									<button className="btn nav">Parcels</button>
								</Link>
								<Link to="/secure/glow/categorys">
									<button className="btn nav">Categorys</button>
								</Link>
								<Link to="/secure/glow/settings">
									<button className="btn nav">Settings</button>
								</Link>
								<Link to="/secure/glow/edit_all_data">
									<button className="btn nav">Edit All Data</button>
								</Link>
							</ul>
						</div>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
