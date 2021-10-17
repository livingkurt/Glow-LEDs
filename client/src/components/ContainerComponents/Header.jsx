import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Headroom from 'react-headroom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { listProducts } from '../../actions/productActions';
import Banner from './Banner';
import { HashLink } from 'react-router-hash-link';
import { browser_check } from '../../utils/react_helper_functions';

const Header = (props) => {
	const history = useHistory();
	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

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
	const show_hide_nested = (id) => {
		set_current_id(id);
		var elems = document.querySelectorAll('.nav-dropdown-nested-content');
		[].forEach.call(elems, (el) => {
			el.classList.remove('show-dropdown-nested');
		});
		const current_menu = document.getElementById(id);
		console.log(current_menu.classList);
		if (last_id === id) {
			current_menu.classList.remove('show-dropdown-nested');
		} else {
			current_menu.classList.add('show-dropdown-nested');
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
		<div>
			{/* <header id="overlay" style={{ ...navbarStyles, top: props.visible ? '0' : '-180px', zIndex: 1 }}> */}
			<Headroom>
				<div>
					{/* <Banner visible={props.visible} style={{ zIndex: 1 }} /> */}
					<Banner />
					<header id="overlay">
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
								style={{ fontSize: '30px !important' }}
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
									<button className="btn nav title_font">Home</button>
								</Link>
								{/* <Link to="/collections/products/best_sellers">
							<button className="btn nav w-100per ta-l">Best Sellers</button>
						</Link> */}
								<div className="dropdown-nav">
									<Link to="/collections/products">
										<button
											className="btn nav title_font"
											onClick={() => dispatch(listProducts(''))}
										>
											Products
										</button>
									</Link>
									<div className="hover_fade_in nav-dropdown">
										<div className="jc-c">
											<div className="nav-column">
												<Link to="/collections/products">
													<button
														className="btn nav  ta-l fs-18px title_font"
														onClick={() => dispatch(listProducts(''))}
													>
														Products
													</button>
												</Link>
												<hr className="w-95per m-0px" />

												<Link to="/collections/products/best_sellers">
													<button className="btn nav w-100per ta-l">Best Sellers</button>
												</Link>
												<Link to="/collections/products/essentials">
													<button className="btn nav w-100per ta-l jc-b">
														Glow LEDs Essentials
													</button>
												</Link>
												<Link to="/collections/products/discounted">
													<button className="btn nav w-100per ta-l">On Sale!</button>
												</Link>

												<Link to="/collections/products/accessories/stickers">
													<button className="btn nav w-100per ta-l">Stickers</button>
												</Link>
											</div>
											<div className="nav-column">
												<Link to="/pages/menu/gloving">
													<button className="btn nav w-100per ta-l fs-18px title_font">
														Gloving
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/products/collection/nova_glow_casings">
													<button className="btn nav w-100per ta-l">
														Nova Glow Casings (New!)
													</button>
												</Link>
												<Link to="/collections/products/decals">
													<button className="btn nav w-100per ta-l">Decals (New!)</button>
												</Link>
												<Link to="/collections/products/exo_diffusers">
													<button className="btn nav w-100per ta-l">EXO Diffusers</button>
												</Link>
												<Link to="/collections/products/glow_casings">
													<button className="btn nav w-100per ta-l jc-b">
														Glow Casings
														{/* <i className=" trans-neg-270 fas fa-sort-up" /> */}
													</button>
												</Link>
												<div className="nav-btn-container">
													<Link to="/collections/products/glowskins" className="w-100per">
														<button className="nav-btn-link">Glowskins</button>
													</Link>
													<button
														className="nav-btn-dropdown"
														onClick={() => show_hide('glowskins_dropdown')}
													>
														<i className="fas fa-sort-up" />
													</button>
												</div>
												<div className="nav-btn-container">
													<Link to="/collections/products/diffusers" className="w-100per">
														<button className="nav-btn-link">Diffusers</button>
													</Link>
													<button
														className="nav-btn-dropdown"
														onClick={() => show_hide('diffusers_dropdown')}
													>
														<i className="fas fa-sort-up" />
													</button>
												</div>
												<div className="nav-btn-container">
													<Link to="/collections/products/diffuser_caps" className="w-100per">
														<button className="nav-btn-link">Diffuser Caps</button>
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
												to="/collections/products/accessories"
												className="w-100per"
											>
												<button className="nav-btn-link">Accessories</button>
											</Link>
											<button
												className="nav-btn-dropdown"
												onClick={() => show_hide('accessories_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
										</div> */}
												<Link to="/collections/products/accessories">
													<button className="btn nav w-100per ta-l jc-b">
														Accessories
														{/* <i className=" trans-neg-270 fas fa-sort-up" /> */}
													</button>
												</Link>
												{/* <Link to="/collections/products/accessories">
											<button className="btn nav w-100per ta-l">Accessories</button>
										</Link> */}
											</div>

											{/* Glowskins */}
											<div
												className="nav-dropdown-subcategory-content hover_fade_in "
												id="glowskins_dropdown"
											>
												<Link to="/collections/products/glowskins">
													<button className="btn nav w-100per ta-l fs-18px title_font">
														Glowskins
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/products/glowskins/classics">
													<div className="row">
														{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
														<button className="btn nav w-100per ta-l">Classics</button>
													</div>
												</Link>
												<Link to="/collections/products/glowskins/novaskins">
													<div className="row">
														{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
														<button className="btn nav w-100per ta-l">Novaskins</button>
													</div>
												</Link>
												<Link to="/collections/products/glowskins/alt_novaskins">
													<div className="row">
														{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
														<button className="btn nav w-100per ta-l">Alt Novaskins</button>
													</div>
												</Link>
												<Link to="/collections/products/glowskins/imperfect">
													<div className="row">
														{/* <i className="trans-90 mr-30px fas fa-sort-up" />{' '} */}
														<button className="btn nav w-100per ta-l">Imperfect</button>
													</div>
												</Link>
											</div>
											{/* Frosted Diffusers */}
											<div
												className="nav-dropdown-subcategory-content hover_fade_in "
												id="diffusers_dropdown"
											>
												<Link to="/collections/products/diffusers">
													<button className="btn nav w-100per ta-l fs-20px title_font">
														Diffusers
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/products/diffusers/abstract">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Abstract (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/products/diffusers/polygons">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Polygons (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/products/diffusers/cylinders">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Cylinders (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/products/diffusers/domes">
													<div className="row">
														<button className="btn nav w-100per ta-l">Domes (New)</button>
													</div>
												</Link>
												<Link to="/collections/products/diffusers/open_hole">
													<div className="row">
														<button className="btn nav w-100per ta-l">Open Hole</button>
													</div>
												</Link>
												<Link to="/collections/products/diffusers/closed_hole">
													<div className="row">
														<button className="btn nav w-100per ta-l">Closed Hole</button>
													</div>
												</Link>
											</div>
											{/* Diffuser Caps */}
											<div
												className="nav-dropdown-subcategory-content hover_fade_in "
												id="diffuser_caps_dropdown"
											>
												<Link to="/collections/products/diffuser_caps">
													<button className="btn nav w-100per ta-l fs-20px title_font">
														Diffuser Caps
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/products/diffuser_caps_adapters_starter_kit">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Diffuser Caps Starter Kit
														</button>
													</div>
												</Link>
												<div className="nav-btn-container">
													<Link to="/pages/menu/collections" className="w-100per">
														<button className="nav-btn-link w-100per ">Collections</button>
													</Link>
													<button
														className="nav-btn-dropdown"
														onClick={() => show_hide_nested('collections_dropdown')}
													>
														<i className="fas fa-sort-up" />
													</button>
												</div>
												<Link to="/collections/products/diffuser_caps/geometric">
													<div className="row">
														<button className="btn nav w-100per ta-l">Geomotric</button>
													</div>
												</Link>
												<Link to="/collections/products/diffuser_caps/shapes">
													<div className="row">
														<button className="btn nav w-100per ta-l">Shapes</button>
													</div>
												</Link>
												<Link to="/collections/products/diffuser_caps/abstract">
													<div className="row">
														<button className="btn nav w-100per ta-l">Abstract</button>
													</div>
												</Link>
												<Link to="/collections/products/diffuser_caps/patterns">
													<div className="row">
														<button className="btn nav w-100per ta-l">Patterns</button>
													</div>
												</Link>
												<Link to="/collections/products/diffuser_caps/imperfect">
													<div className="row">
														<button className="btn nav w-100per ta-l">Imperfect</button>
													</div>
												</Link>
											</div>
											{/* Collections */}
											<div
												className="nav-dropdown-nested-content hover_fade_in"
												id="collections_dropdown"
											>
												<Link to="/pages/menu/collections">
													<button className="btn nav w-100per ta-l fs-20px title_font">
														Collections
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/products/diffuser_caps/collection/space_cadet">
													<button className="btn nav w-100per ta-l">Space Cadet</button>
												</Link>
												<Link to="/collections/products/diffuser_caps/collection/festy_besty">
													<button className="btn nav w-100per ta-l">Festy Besty</button>
												</Link>
												<Link to="/collections/products/diffuser_caps/collection/platonic_solids">
													<button className="btn nav w-100per ta-l">Platonic Solids</button>
												</Link>
											</div>
											<div className="nav-column">
												<Link to="/collections/products/accessories">
													<button className="btn nav w-100per ta-l fs-18px title_font max-w-244px">
														Flow Art Essensials
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												{browser_check() !== 'safari' ? (
													<Link to="/collections/products/glow_strings_v2_50_led_3_5m">
														<button
															className={`btn nav ta-l w-100per special_font gradient-btn`}
														>
															<span>GLOW STRINGS V2</span>
														</button>
													</Link>
												) : (
													<Link to="/collections/products/glow_strings_v2_50_led_3_5m">
														<button className={`btn nav ta-l w-100per`}>
															<span>Glow Strings V2</span>
														</button>
													</Link>
												)}

												<Link to="/collections/products/1620_batteries">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															1620 Batteries
														</button>
													</div>
												</Link>
												<Link to="/collections/products/1616_batteries">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															1616 Batteries
														</button>
													</div>
												</Link>
												<Link to="/collections/products/1225_batteries">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															1225 Batteries
														</button>
													</div>
												</Link>
												<Link to="/collections/products/accessories/battery_storage">
													<div className="row">
														<button className="btn nav w-100per ta-l">
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
										<button className="btn nav title_font">Features</button>
									</Link>
									<div className="hover_fade_in nav-dropdown">
										<div className="jc-c">
											<div className="w-100per max-w-300px">
												<Link to="/pages/menu/featured">
													<button className="btn nav w-100per ta-l fs-18px title_font">
														Featured
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<div className="nav-btn-container">
													<Link to="/pages/menu/sponsored_artists" className="w-100per">
														<button className="nav-btn-link w-100per ">
															Sponsored Artists
														</button>
													</Link>
													<button
														className="nav-btn-dropdown"
														onClick={() => show_hide('sponsored_artists_dropdown')}
													>
														<i className="fas fa-sort-up" />
													</button>
												</div>
												<Link to="/collections/features/artists">
													<button className="btn nav w-100per ta-l">Artists</button>
												</Link>
												<Link to="/collections/features/glovers">
													<button className="btn nav w-100per ta-l jc-b">Glovers</button>
												</Link>
												<Link to="/collections/features/producers">
													<button className="btn nav w-100per ta-l">Producers</button>
												</Link>
												<Link to="/collections/features/vfx">
													<button className="btn nav w-100per ta-l">VFX</button>
												</Link>
											</div>

											<div
												className="nav-dropdown-subcategory-content hover_fade_in"
												id="sponsored_artists_dropdown"
											>
												<Link to="/pages/menu/sponsored_artists">
													<button className="btn nav w-100per ta-l fs-20px title_font">
														Sponsored Artists
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/collections/sponsors">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Sponsored Glovers
														</button>
													</div>
												</Link>
												<Link to="/collections/teams">
													<div className="row">
														<button className="btn nav w-100per ta-l">
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
										<button className="btn nav title_font">Support</button>
									</Link>

									<div className="hover_fade_in nav-dropdown">
										<div className="jc-c">
											<div className="w-100per max-w-300px">
												<Link to="/pages/menu/support">
													<button className="btn nav w-100per ta-l fs-18px title_font">
														Support
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<Link to="/pages/track_your_order">
													<button className="btn nav w-100per ta-l">Track Your Order</button>
												</Link>
												{/* <Link to="/pages/color_palettes">
													<button className="btn nav w-100per ta-l jc-b">
														Color Palettes
													</button>
												</Link> */}
												<Link to="/pages/about">
													<button className="btn nav w-100per ta-l jc-b">About</button>
												</Link>
												<Link to="/pages/events">
													<button className="btn nav w-100per ta-l jc-b">Events</button>
												</Link>
												<Link to="/pages/menu/manuals">
													<button className="btn nav w-100per ta-l jc-b">Manuals</button>
												</Link>
												<Link to="/pages/announcements">
													<button className="btn nav w-100per ta-l">Announcements</button>
												</Link>
												<div className="nav-btn-container">
													<Link to="/pages/faq" className="w-80per">
														<button className="nav-btn-link w-100per ta-l">FAQ</button>
													</Link>
													<button
														className="nav-btn-dropdown"
														onClick={() => show_hide('faq_dropdown')}
													>
														<i className="fas fa-sort-up" />
													</button>
												</div>
												<Link to="/pages/contact">
													<button className="btn nav w-100per ta-l">Contact</button>
												</Link>
												<Link to="/pages/terms">
													<button className="btn nav w-100per ta-l">
														Term and Conditions
													</button>
												</Link>
											</div>

											<div
												className="nav-dropdown-subcategory-content hover_fade_in"
												id="faq_dropdown"
											>
												<Link to="/pages/faq">
													<button className="btn nav w-100per ta-l fs-20px title_font">
														FAQ
													</button>
												</Link>
												<hr className="w-95per m-0px" />
												<HashLink to="/pages/faq#glowskins">
													<div className="row">
														<button className="btn nav w-100per ta-l">Glowskins</button>
													</div>
												</HashLink>
												<HashLink to="/pages/faq#using_diffuser_caps_and_adapters">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Diffuser Caps Guide
														</button>
													</div>
												</HashLink>
												<HashLink to="/pages/faq#diffuser_too_tight_too_loose">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Diffusers Too Tight/Loose?
														</button>
													</div>
												</HashLink>
												<HashLink to="/pages/faq#ordering_custom_products">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Ordering Custom Products
														</button>
													</div>
												</HashLink>
												<HashLink to="/pages/faq#featured_content">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Featured Content
														</button>
													</div>
												</HashLink>

												<HashLink to="/pages/faq#processing_shipping">
													<div className="row">
														<button className="btn nav w-100per ta-l">
															Processing/Shipping
														</button>
													</div>
												</HashLink>
												<HashLink to="/pages/faq#returns_cancellations">
													<div className="row">
														<button className="btn nav w-100per ta-l">
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
						<div className="nav_bar w-233px jc-fe ai-c">
							{/* <Link to="/checkout/cart"> */}
							<button
								className={`btn nav cart_text w-110px title_font ai-c ${cartItems.length > 0
									? 'bob box-s-d bg-primary'
									: ''}`}
								onClick={open_cart}
							>
								Cart <i className="fas fa-shopping-cart ml-5px mb-5px" />
								<div className="ml-5px">
									{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
								</div>
							</button>
							{/* </Link> */}
							{/* <Link to="/checkout/cart"> */}
							<button
								className={`btn mobile nav cart_icon title_font none ${cartItems.length > 0
									? 'bob box-s-d bg-primary'
									: ''}`}
								onClick={open_cart}
							>
								<i className="fas fa-shopping-cart" />{' '}
								{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
							</button>
							{/* </Link> */}
							{userInfo && userInfo.hasOwnProperty('first_name') ? (
								<div className="dropdown">
									<button className="btn nav title_font">{first_name}</button>
									<ul className="dropdown-content hover_fade_in w-110px">
										<Link to="/secure/account/profile">
											<button className="btn nav ">Profile</button>
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
										<button className="btn nav title_font">Login</button>
									</Link>
								</div>
							)}
							{userInfo &&
							userInfo.isAdmin && (
								<div className="dropdown ">
									<button className="btn nav title_font">Admin</button>
									<ul className="dropdown-content hover_fade_in w-152px">
										<Link to="/secure/glow/controlpanel">
											<button className="btn nav">Control Panel</button>
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
										<Link to="/secure/glow/palettes">
											<button className="btn nav">Palettes</button>
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
			</Headroom>
		</div>
	);
};

export default Header;
