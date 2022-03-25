import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';
import { browser_check } from '../../utils/react_helper_functions';

const Sidebar = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						if (
							document.querySelector('.sidebar') &&
							document.querySelector('.side-btn') &&
							document.querySelector('.head-btn')
						) {
							document.querySelector('.sidebar').classList.remove('open');
							document.querySelector('.side-btn').classList.remove('active');
							document.querySelector('.side-btn').classList.add('not-active');
							document.querySelector('.head-btn').classList.remove('active');
							document.querySelector('.head-btn').classList.add('not-active');
						}
					}
				}
				// Bind the event listener
				document.addEventListener('mousedown', handleClickOutside);
				return () => {
					// Unbind the event listener on clean up
					document.removeEventListener('mousedown', handleClickOutside);
				};
			},
			[ ref ]
		);
	}
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
		document.querySelector('.side-btn').classList.remove('active');
		document.querySelector('.side-btn').classList.add('not-active');
		document.querySelector('.head-btn').classList.remove('active');
		document.querySelector('.head-btn').classList.add('not-active');
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout(userInfo.refresh_token));
		closeMenu();
		history.push('/account/login');
	};

	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (userInfo) {
					set_first_name(userInfo.first_name);
				}
			}
			return () => (clean = false);
		},
		[ userInfo ]
	);

	const show_hide = (id) => {
		const current_menu = document.getElementById(id);
		console.log(current_menu.classList);
		current_menu.classList.toggle('hide-menu');
	};

	// var btn = $('.side-btn');
	// var btn = document.querySelector('.side-btn');

	// btn.on('click', function() {
	//   $(this).toggleClass('active');
	//   $(this).toggleClass('not-active');
	// });
	// btn.addEventListener('click', function(e) {
	// 	// check the target has an attribute of `a[href^="http"]`
	// 	btn.classList.toggle('active');
	// 	btn.classList.toggle('not-active');
	// });

	return (
		<aside ref={wrapperRef} className="sidebar" style={{ top: '0px', overflowY: 'scroll', zIndex: 4 }}>
			{/* <div className="logo_text mh-auto ai-c p-1rem pb-0px">
				<Link to="/" aria-label="Home Page">
					<div className="h-40px w-40px">
						<img
							className="zoom logo_s"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Small Logo"
						/>
					</div>
				</Link>
				<Link to="/" aria-label="Home Page">
					<div className="row">
						<label className="ml-5px fs-25px mv-0px ff-h">Glow LEDs</label>
					</div>
				</Link>
			</div> */}
			<div />
			<div className="h-40px bg-primary ta-c title_font ai-c w-100per">
				<p className="w-100per fs-20px mt-24px">Find Your Glow</p>
			</div>
			<div className="ai-c">
				<div className="ai-c">
					<Link to="/" aria-label="Home Page">
						<div className="h-30px w-30px">
							<img
								className="zoom logo_s"
								src="/images/optimized_images/logo_images/glow_logo_optimized.png"
								alt="Glow LEDs Logo"
								title="Small Logo"
							/>
						</div>
					</Link>

					<button className="sidebar_close_button" aria-label="Close" onClick={closeMenu}>
						<div className="box ">
							<div className="side-btn active">
								<span className="span" />
								<span className="span" />
								<span className="span" />
							</div>
						</div>
					</button>
				</div>
				<Link to="/" aria-label="Home Page">
					<label className="fs-20px mv-0px ff-h mr-20px ta-c">GL</label>
				</Link>
			</div>

			<nav className="h-63vh">
				<Link to="/">
					<button className="sidebar-btn primary" onClick={closeMenu}>
						Home
					</button>
				</Link>
				{userInfo && userInfo.hasOwnProperty('first_name') ? (
					<div className="sidebar_dropdown">
						<div className="sidebar-btn-container">
							<button className="sidebar-btn primary">{first_name}</button>
							<button
								className="sidebar-btn-dropdown"
								onClick={() => show_hide('user_dropdown')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button>
						</div>
						<ul className="sidebar_dropdown_container" id="user_dropdown">
							<Link to="/secure/account/profile">
								<button className=" sidebar-btn secondary" onClick={closeMenu}>
									Profile
								</button>
							</Link>
							<Link to="/secure/account/orders">
								<button className=" sidebar-btn secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<button onClick={handleLogout} className=" sidebar-btn secondary">
								{' '}
								Logout
							</button>
						</ul>
					</div>
				) : (
					<Link to="/account/login">
						<button className="sidebar-btn primary" onClick={closeMenu}>
							Login
						</button>
					</Link>
				)}
				<div className="sidebar_dropdown">
					{/* <button className="sidebar-btn primary" onClick={closeMenu}>
						<Link to="/collections/all/products">Products</Link>
					</button> */}
					<div className="sidebar-btn-container">
						<button className="sidebar-btn primary">
							<Link to="/collections/all/products?page=1?limit=21" onClick={closeMenu}>
								Products{' '}
							</Link>
						</button>
						<button
							className="sidebar-btn-dropdown"
							onClick={() => show_hide('products_dropdown')}
							aria-label="Show"
						>
							<i className="fas fa-sort-up" />
						</button>
					</div>

					<ul className="sidebar_dropdown_container" id="products_dropdown">
						<div className="sidebar_dropdown_nested">
							{/* <Link to="/collections/all/products/category/glowskins">
								<button className="sidebar-btn secondary">Glowskins</button>
							</Link> */}
							<div className="sidebar-btn-container">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									<Link to="/pages/menu/gloving">Gloving </Link>
								</button>
								<button
									className="sidebar-btn-dropdown"
									onClick={() => show_hide('gloving_dropdown')}
									aria-label="Show"
								>
									<i className="fas fa-sort-up" />
								</button>
							</div>
							<ul className="sidebar_dropdown_secondary_container" id="gloving_dropdown">
								<Link to="/collections/all/products/category/whites">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Whites (New!)
									</button>
								</Link>
								<Link to="/collections/all/products/collection/nova_glow_casings">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Nova Glow Casings
									</button>
								</Link>
								<Link to="/collections/all/products/category/decals">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Decals
									</button>
								</Link>
								<Link to="/collections/all/products/category/exo_diffusers">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										EXO Diffusers
									</button>
								</Link>
								<div className="sidebar_dropdown_nested">
									<Link to="/collections/all/products/category/glow_casings">
										<button className="sidebar-btn nested">Glow Casings</button>
									</Link>
									<ul className="sidebar_dropdown_secondary_container" id="glow_casings_dropdown">
										<Link to="/collections/all/products/category/glow_casings/subcategory/imperfect">
											<button className="sidebar-btn nested" onClick={closeMenu}>
												Imperfect
											</button>
										</Link>
									</ul>
									{/* <button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('glow_casings_dropdown')}
							>
								<i className="fas fa-sort-up" />
							</button> */}
								</div>
								<div className="sidebar_dropdown_nested">
									{/* <Link to="/collections/all/products/category/glowskins">
								<button className="sidebar-btn secondary">Glowskins</button>
							</Link> */}
									<div className="sidebar-btn-container">
										<button className="sidebar-btn nested" onClick={closeMenu}>
											<Link to="/collections/all/products/category/glowskins">Glowskins </Link>
										</button>
										<button
											className="sidebar-btn-dropdown"
											onClick={() => show_hide('glow_casings_dropdown_2')}
											aria-label="Show"
										>
											<i className="fas fa-sort-up" />
										</button>
									</div>
									<ul className="sidebar_dropdown_nested_container" id="glow_casings_dropdown_2">
										<Link to="/collections/all/products/category/glowskins/subcategory/classics">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Classics
											</button>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/novaskins">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Novaskins
											</button>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/alt_novaskins">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Alt Novaskins
											</button>
										</Link>
										<Link to="/collections/all/products/category/glowskins/subcategory/imperfect">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Imperfect
											</button>
										</Link>
									</ul>
								</div>
								<div className="sidebar_dropdown_nested">
									{/* <Link to="/collections/all/products/category/diffusers">
								<button className="sidebar-btn secondary">Diffusers</button>
							</Link> */}
									<div className="sidebar-btn-container">
										<button className="sidebar-btn nested" onClick={closeMenu}>
											<Link to="/collections/all/products/category/diffusers">Diffusers </Link>
										</button>
										<button
											className="sidebar-btn-dropdown"
											onClick={() => show_hide('glow_casings_dropdown_3')}
											aria-label="Show"
										>
											<i className="fas fa-sort-up" />
										</button>
									</div>
									<ul className="sidebar_dropdown_nested_container" id="glow_casings_dropdown_3">
										<Link to="/collections/all/products/category/diffusers/subcategory/abstract">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Abstract (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffusers/subcategory/polygons">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Polygons (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffusers/subcategory/cylinders">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Cylinders (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffusers/subcategory/domes">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Domes (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffusers/subcategory/open_hole">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Open Hole
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffusers/subcategory/closed_hole">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Closed Hole
											</button>
										</Link>
									</ul>
									{/* <button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('glow_casings_dropdown_3')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button> */}
								</div>
								<div className="sidebar_dropdown_nested">
									{/* <Link to="/collections/all/products/category/diffuser_caps">
								<button className="sidebar-btn secondary">Diffuser Caps</button>
							</Link> */}
									<div className="sidebar-btn-container">
										<button className="sidebar-btn nested" onClick={closeMenu}>
											<Link to="/collections/all/products/category/diffuser_caps">
												Diffuser Caps
											</Link>
										</button>
										<button
											className="sidebar-btn-dropdown"
											onClick={() => show_hide('glow_casings_dropdown_4')}
											aria-label="Show"
										>
											<i className="fas fa-sort-up" />
										</button>
									</div>
									<ul className="sidebar_dropdown_nested_container" id="glow_casings_dropdown_4">
										<div className="sidebar_dropdown_nested">
											{/* <button className="sidebar-btn secondary">Collections</button> */}
											<div className="sidebar-btn-container">
												<Link to="/pages/menu/collections" className="w-100per">
													<button className="sidebar-btn nested-2" onClick={closeMenu}>
														Collections
													</button>
												</Link>
												<button
													className="sidebar-btn-dropdown"
													onClick={() => show_hide('glow_casings_dropdown_5')}
													aria-label="Show"
												>
													<i className="fas fa-sort-up" />
												</button>
											</div>
											<ul
												className="sidebar_dropdown_nested_2_container"
												id="glow_casings_dropdown_5"
											>
												<Link to="/collections/all/products/category/diffuser_caps/collection/texture">
													<button className="sidebar-btn nested-3" onClick={closeMenu}>
														Texture
													</button>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/collection/fractal">
													<button className="sidebar-btn nested-3" onClick={closeMenu}>
														Fractal
													</button>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/collection/space_cadet">
													<button className="sidebar-btn nested-3" onClick={closeMenu}>
														Space Cadet
													</button>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/collection/festy_besty">
													<button className="sidebar-btn nested-3" onClick={closeMenu}>
														Festy Besty
													</button>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/collection/platonic_solids">
													<button className="sidebar-btn nested-3" onClick={closeMenu}>
														Platonic Solids
													</button>
												</Link>
											</ul>
											{/* <button
										className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
										onClick={() => show_hide('glow_casings_dropdown_5')}
										aria-label="Show"
									>
										<i className="fas fa-sort-up" />
									</button> */}
										</div>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Geomotric
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Shapes
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Abstract
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Patterns
											</button>
										</Link>
										<Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Imperfect
											</button>
										</Link>
									</ul>
									{/* <button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('glow_casings_dropdown_4')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button> */}
								</div>
								<Link to="/collections/all/products/category/accessories/subcategory/batteries">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Batteries
									</button>
								</Link>
								<Link to="/collections/all/products/category/accessories">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Accessories
									</button>
								</Link>
							</ul>
						</div>
						<div className="sidebar-btn-container">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Flow Art Essentials
							</button>
							<button
								className="sidebar-btn-dropdown"
								onClick={() => show_hide('glow_casings_dropdown_6')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button>
						</div>
						<ul className="sidebar_dropdown_secondary_container" id="glow_casings_dropdown_6">
							<Link to="/collections/all/products/refresh_pack">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									Refresh Pack
								</button>
							</Link>
							<Link to="/collections/all/products/supremes">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									Supremes
								</button>
							</Link>
							{browser_check() !== 'safari' ? (
								<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m">
									<button
										className={`sidebar-btn nested  special_font gradient-btn`}
										onClick={closeMenu}
									>
										<span>GLOW STRINGS V2</span>
									</button>
								</Link>
							) : (
								<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m" onClick={closeMenu}>
									<button className={`sidebar-btn nested `}>
										<span>Glow Strings V2</span>
									</button>
								</Link>
							)}
							<Link to="/collections/all/products/1620_batteries">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									1620 Batteries
								</button>
							</Link>
							<Link to="/collections/all/products/1616_batteries">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									1616 Batteries
								</button>
							</Link>
							<Link to="/collections/all/products/1225_batteries">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									1225 Batteries
								</button>
							</Link>
							<Link to="/collections/all/products/category/accessories/subcategory/battery_storage">
								<button className="sidebar-btn nested" onClick={closeMenu}>
									Battery Storage
								</button>
							</Link>
						</ul>
						<Link to="/collections/all/products/category/new_releases">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								New Releases
							</button>
						</Link>
						<Link to="/collections/all/products/category/best_sellers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Best Sellers
							</button>
						</Link>
						<Link to="/collections/all/products/category/essentials">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glow LEDs Essentials
							</button>
						</Link>
						<Link to="/collections/all/products/category/discounted">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								On Sale
							</button>
						</Link>
						<Link to="/collections/all/products/custom_product_deposit">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Customize Any Product!
							</button>
						</Link>
						{/* <Link to="/collections/all/products/glow_strings_v2_50_led_3_5m">
							<button className="sidebar-btn secondary special_font gradient-btn" onClick={closeMenu}>
								Glow Strings V2
							</button>
						</Link> */}
						{/* {browser_check() !== 'safari' ? (
							<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m">
								<button
									className={`sidebar-btn secondary  special_font gradient-btn`}
									onClick={closeMenu}
								>
									<span>GLOW STRINGS V2</span>
								</button>
							</Link>
						) : (
							<Link to="/collections/all/products/glow_strings_v2_50_led_3_5m" onClick={closeMenu}>
								<button className={`sidebar-btn secondary `}>
									<span>Glow Strings V2</span>
								</button>
							</Link>
						)} */}
					</ul>
					{/* <button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('products_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</button> */}
				</div>

				<div className="sidebar_dropdown">
					{/* <button className="sidebar-btn primary" onClick={closeMenu}>
						<Link to="/pages/menu/featured">Featured</Link>
					</button> */}
					<div className="sidebar-btn-container">
						<button className="sidebar-btn primary" onClick={closeMenu}>
							<Link to="/pages/menu/featured">Featured</Link>
						</button>
						<button
							className="sidebar-btn-dropdown"
							onClick={() => show_hide('featured_dropdown')}
							aria-label="Show"
						>
							<i className="fas fa-sort-up" />
						</button>
					</div>
					<ul className="sidebar_dropdown_container" id="featured_dropdown">
						<div className="sidebar_dropdown_nested">
							{/* <button className="sidebar-btn secondary">Sponsored Artists</button> */}
							<Link to="/collections/all/teams/category/rave_mob">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Rave Mob
								</button>
							</Link>
							<div className="sidebar-btn-container">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Sponsored Artists
								</button>
								<button
									className="sidebar-btn-dropdown"
									onClick={() => show_hide('nested_sponsor_dropdown')}
									aria-label="Show"
								>
									<i className="fas fa-sort-up" />
								</button>
							</div>
							<ul className="sidebar_dropdown_secondary_container" id="nested_sponsor_dropdown">
								<Link to="/collections/all/sponsors">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Sponsored Glovers
									</button>
								</Link>
								<Link to="/collections/all/teams">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Sponsored Teams
									</button>
								</Link>
							</ul>
							{/* <button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('nested_sponsor_dropdown')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button> */}
						</div>
						<Link to="/collections/all/features/category/artists">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Artists
							</button>
						</Link>
						<Link to="/collections/all/features/category/glovers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glovers
							</button>
						</Link>

						<Link to="/collections/all/features/category/producers">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Producers
							</button>
						</Link>
						<Link to="/collections/all/features/category/vfx">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								VFX
							</button>
						</Link>
						<Link to="/account/login?redirect=/account/submit_feature">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Submit Feature
							</button>
						</Link>
					</ul>
					{/* <button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('featured_dropdown')}
						aria-label="Show"
					>
						<i className="fas fa-sort-up" />
					</button> */}
				</div>
				<div className="sidebar_dropdown">
					{/* <button className="sidebar-btn primary" onClick={closeMenu}>
						<Link to="/pages/menu/support">Support</Link>
					</button> */}
					<div className="sidebar-btn-container">
						<button className="sidebar-btn primary" onClick={closeMenu}>
							<Link to="/pages/menu/support">Support</Link>
						</button>
						<button
							className="sidebar-btn-dropdown"
							onClick={() => show_hide('support_dropdown')}
							aria-label="Show"
						>
							<i className="fas fa-sort-up" />
						</button>
					</div>
					<ul className="sidebar_dropdown_container" id="support_dropdown">
						<Link to="/pages/track_your_order">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Track Your Order
							</button>
						</Link>
						<Link to="/pages/about">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								About
							</button>
						</Link>
						<Link to="/pages/events">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Events
							</button>
						</Link>
						<Link to="/pages/menu/manuals">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Manuals
							</button>
						</Link>
						<div className="sidebar_dropdown_secondary">
							{/* <button className="sidebar-btn secondary">
								<Link to="/pages/faq">FAQ</Link>
							</button> */}
							<div className="sidebar-btn-container">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									<Link to="/pages/faq">FAQ</Link>
								</button>
								<button
									className="sidebar-btn-dropdown"
									onClick={() => show_hide('nested_faq_dropdown')}
									aria-label="Show"
								>
									<i className="fas fa-sort-up" />
								</button>
							</div>
							<ul className="sidebar_dropdown_secondary_container" id="nested_faq_dropdown">
								<HashLink href="/pages/faq#glowskins">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Glowskins
									</button>
								</HashLink>
								<HashLink href="/pages/faq#using_diffuser_caps_and_adapters">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Diffuser Caps Guide
									</button>
								</HashLink>
								<HashLink href="/pages/faq#diffuser_too_tight_too_loose">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Diffusers Too Tight/Loose?
									</button>
								</HashLink>
								<HashLink href="/pages/faq#ordering_custom_products">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Ordering Custom Products
									</button>
								</HashLink>
								<HashLink href="/pages/faq#featured_content">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Featured Content
									</button>
								</HashLink>
								<HashLink href="/pages/faq#processing_shipping">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Processing/Shipping
									</button>
								</HashLink>
								<HashLink href="/pages/faq#returns_cancellations">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Returns/Cancellations
									</button>
								</HashLink>
							</ul>
							{/* <i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" /> */}
							{/* <button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('nested_faq_dropdown')}
							>
								<i className="fas fa-sort-up" />
							</button> */}
						</div>
						<Link to="/pages/contact">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Contact
							</button>
						</Link>
						<Link to="/pages/terms">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Terms and Conditions
							</button>
						</Link>
					</ul>
					{/* <button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('support_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</button> */}
				</div>
				{userInfo &&
				userInfo.isAdmin && (
					<div className="sidebar_dropdown">
						{/* <button className="sidebar-btn primary">Admin</button> */}
						<div className="sidebar-btn-container">
							<button className="sidebar-btn primary" onClick={closeMenu}>
								Admin
							</button>
							<button
								className="sidebar-btn-dropdown"
								onClick={() => show_hide('admin_dropdown')}
								aria-label="Show"
							>
								<i className="fas fa-sort-up" />
							</button>
						</div>
						<ul className="sidebar_dropdown_container" id="admin_dropdown">
							<Link to="/secure/glow/controlpanel">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Control Panel
								</button>
							</Link>
							<Link to="/secure/glow/orders?page=1?limit=10">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<Link to="/secure/glow/products">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Products
								</button>
							</Link>
							<Link to="/secure/glow/users">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Users
								</button>
							</Link>
							<Link to="/secure/glow/expenses">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Expenses
								</button>
							</Link>
							<Link to="/secure/glow/features">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Features
								</button>
							</Link>
							<Link to="/secure/glow/paychecks">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Paychecks
								</button>
							</Link>
							<Link to="/secure/glow/affiliates">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Affiliates
								</button>
							</Link>
							<Link to="/secure/glow/teams">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Teams
								</button>
							</Link>
							<Link to="/secure/glow/promos">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Promos
								</button>
							</Link>
							<Link to="/secure/glow/carts">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Carts
								</button>
							</Link>
							<Link to="/secure/glow/contents">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Contents
								</button>
							</Link>
							<Link to="/secure/glow/emails">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Emails
								</button>
							</Link>
							<Link to="/secure/glow/logs">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Logs
								</button>
							</Link>
							<Link to="/secure/glow/chips">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Chips
								</button>
							</Link>
							<Link to="/secure/glow/surveys">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Surveys
								</button>
							</Link>
							<Link to="/secure/glow/parcels">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Parcels
								</button>
							</Link>
							<Link to="/secure/glow/categorys">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Categorys
								</button>
							</Link>
							<Link to="/secure/glow/settings">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Settings
								</button>
							</Link>
							<Link to="/secure/glow/palettes">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Palettes
								</button>
							</Link>
							<Link to="/secure/glow/edit_all_data">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Edit All Data
								</button>
							</Link>
							<Link to="/secure/glow/gcode_continous">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Gcode
								</button>
							</Link>
						</ul>
						{/* <button
							className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
							onClick={() => show_hide('admin_dropdown')}
						>
							<i className="fas fa-sort-up" />
						</button> */}
					</div>
				)}
			</nav>
		</aside>
	);
};

export default Sidebar;
