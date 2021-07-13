import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';

const Sidebar = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						document.querySelector('.sidebar').classList.remove('open');
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
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		closeMenu();
		history.push('/account/login');
	};

	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				set_first_name(userInfo.first_name);
			}

			// }
		},
		[ userInfo ]
	);

	// const userUpdate = useSelector((state) => state.userUpdate);

	// useEffect(
	// 	() => {
	// 		if (userUpdate.userInfo) {
	// 			set_first_name(userUpdate.userInfo.first_name);
	// 		}
	// 		return () => {};
	// 	},
	// 	[ userUpdate.userInfo ]
	// );
	const navbarStyles = {
		position: 'fixed',
		// height: '160px',
		// width: '100%',
		// backgroundColor: 'grey',
		// textAlign: 'center',
		transition: 'top 0.2s'
	};
	const determine_top = () => {
		if (props.width >= 1177) {
			return '179px';
		} else if (props.width < 1140 && props.width > 704) {
			return '130px';
		} else if (props.width < 704 && props.width > 528) {
			return '116px';
		} else if (props.width < 528) {
			return '110px';
		} else {
			return '110px';
		}
	};

	const [ last_id, set_last_id ] = useState('');
	const [ current_id, set_current_id ] = useState('');

	const show_hide = (id) => {
		set_current_id(id);
		const current_menu = document.getElementById(id);
		console.log(current_menu.classList);
		current_menu.classList.toggle('hide-menu');
		// console.log({ substring: id.substring(0, 5) });
		// let last_menu = '';
		// if (last_id && id.substring(0, 6) !== 'nested' && last_id !== id) {
		// 	last_menu = document.getElementById(last_id);
		// 	console.log(last_menu.classList);
		// 	last_menu.classList.remove('hide-menu');
		// }
		// if (id.substring(0, 6) === 'nested' && last_id.substring(0, 6) === 'nested') {
		// 	last_menu = document.getElementById(last_id);
		// 	console.log(last_menu.classList);
		// 	last_menu.classList.remove('hide-menu');
		// }
		set_last_id(id);
	};

	return (
		<aside
			ref={wrapperRef}
			className="sidebar"
			style={{ ...navbarStyles, top: props.visible ? determine_top() : '0px', overflowY: 'scroll' }}
		>
			<div className="logo_text mh-auto ai-c">
				<Link to="/">
					<div className="h-50px w-50px">
						<img
							className="zoom logo_s"
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs Logo"
							title="Small Logo"
						/>
					</div>
				</Link>
				<Link to="/">
					<div className="row">
						<label className="ml-5px fs-30px mv-0px ff-h">Glow LEDs</label>
					</div>
				</Link>
			</div>
			<button className="sidebar_close_button" aria-label="close" onClick={closeMenu}>
				<i className="fas fa-times" />
			</button>
			<nav className="h-63vh" style={{ overflowY: 'scroll' }}>
				<Link to="/">
					<button className="sidebar-btn primary" onClick={closeMenu}>
						Home
					</button>
				</Link>
				{userInfo && userInfo.hasOwnProperty('first_name') ? (
					<div className="sidebar_dropdown">
						<button className="sidebar-btn primary">{first_name}</button>
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
						<button
							className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
							onClick={() => show_hide('user_dropdown')}
						>
							<i className="fas fa-sort-up" />
						</button>
					</div>
				) : (
					<Link to="/account/login">
						<button className="sidebar-btn primary" onClick={closeMenu}>
							Login
						</button>
					</Link>
				)}
				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/collections/all/products">Products</Link>
					</button>

					<ul className="sidebar_dropdown_container" id="products_dropdown">
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
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar-btn secondary">
								<Link to="/pages/menu/gloving">Gloving</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container" id="nested_gloving_dropdown">
								<Link to="/collections/all/products/category/exo_diffusers">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Exo Diffusers
									</button>
								</Link>

								<div className="sidebar_dropdown_nested w-">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/glow_casings">Glow Casings</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container" id="glow_casings_dropdown">
										<Link to="/collections/all/products/category/glow_casings/subcategory/imperfect">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Imperfect
											</button>
										</Link>
									</ul>
									<button
										className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
										onClick={() => show_hide('glow_casings_dropdown')}
									>
										<i className="fas fa-sort-up" />
									</button>
								</div>

								<div className="sidebar_dropdown_nested w-">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/glowskins">Glowskins</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container" id="glowskins_dropdown">
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
									<button
										className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
										onClick={() => show_hide('glowskins_dropdown')}
									>
										<i className="fas fa-sort-up" />
									</button>
								</div>
								<div className="sidebar_dropdown_nested w-">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/frosted_diffusers">
											Frosted Diffusers
										</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container" id="frosted_diffusers_dropdown">
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/abstract">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Abstract (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/polygons">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Polygons (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/cylinders">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Cylinders (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/domes">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Domes (New)
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/open_hole">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Open Hole
											</button>
										</Link>
										<Link to="/collections/all/products/category/frosted_diffusers/subcategory/closed_hole">
											<button className="sidebar-btn nested-2" onClick={closeMenu}>
												Closed Hole
											</button>
										</Link>
									</ul>
									<button
										className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
										onClick={() => show_hide('frosted_diffusers_dropdown')}
									>
										<i className="fas fa-sort-up" />
									</button>
								</div>
								<div className="sidebar_dropdown_nested">
									<button className="sidebar-btn nested">
										<Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
									</button>
									<ul className="sidebar_dropdown_nested_container" id="diffuser_caps_dropdown">
										<div className="sidebar_dropdown_nested_2">
											<button className="sidebar-btn nested-2">
												<Link to="/collections/all/products/category/diffuser_caps">
													Collections
												</Link>
											</button>
											<ul
												className="sidebar_dropdown_nested_2_container"
												id="collections_caps_dropdown"
											>
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
											<button
												className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
												onClick={() => show_hide('collections_caps_dropdown')}
											>
												<i className="fas fa-sort-up" />
											</button>
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
									<button
										className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
										onClick={() => show_hide('diffuser_caps_dropdown')}
									>
										<i className="fas fa-sort-up" />
									</button>
								</div>
								<Link to="/collections/all/products/category/accessories">
									<button className="sidebar-btn nested" onClick={closeMenu}>
										Accessories
									</button>
								</Link>
							</ul>
							<button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('nested_gloving_dropdown')}
							>
								<i className="fas fa-sort-up" />
							</button>
						</div>
						<Link to="/collections/all/products/category/glow_strings">
							<button className="sidebar-btn secondary" onClick={closeMenu}>
								Glow Strings
							</button>
						</Link>
					</ul>
					<button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('products_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</button>
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/pages/menu/featured">Featured</Link>
					</button>

					<ul className="sidebar_dropdown_container" id="featured_dropdown">
						<div className="sidebar_dropdown_nested">
							<button className="sidebar-btn secondary">Sponsored Artists</button>
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
							<button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('nested_sponsor_dropdown')}
							>
								<i className="fas fa-sort-up" />
							</button>
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
					<button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('featured_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</button>
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar-btn primary">
						<Link to="/pages/menu/support">Support</Link>
					</button>

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
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar-btn secondary">
								<Link to="/pages/faq">FAQ</Link>
							</button>
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
							<button
								className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
								onClick={() => show_hide('nested_faq_dropdown')}
							>
								<i className="fas fa-sort-up" />
							</button>
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
					<button
						className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
						onClick={() => show_hide('support_dropdown')}
					>
						<i className="fas fa-sort-up" />
					</button>
				</div>
				{userInfo &&
				userInfo.isAdmin && (
					<div className="sidebar_dropdown">
						<button className="sidebar-btn primary">Admin</button>
						<ul className="sidebar_dropdown_container" id="admin_dropdown">
							<Link to="/secure/glow/controlpanel">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Control Panel
								</button>
							</Link>
							<Link to="/secure/glow/orders">
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
							<Link to="/secure/glow/edit_all_data">
								<button className="sidebar-btn secondary" onClick={closeMenu}>
									Edit All Data
								</button>
							</Link>
						</ul>
						<button
							className="sidebar-btn icon trans-neg-180 pos-abs right-10px top-4px "
							onClick={() => show_hide('admin_dropdown')}
						>
							<i className="fas fa-sort-up" />
						</button>
					</div>
				)}
			</nav>
		</aside>
	);
};

export default Sidebar;
