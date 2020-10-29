import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

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

	const cart = useSelector((state) => state.cart);

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		closeMenu();
		history.push('/account/login');
	};

	const icon_styles = {
		position: 'absolute',
		right: '10px',
		top: '8px',
		'-webkitTransform': 'rotate(-180deg)'
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

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				set_first_name(userUpdate.userInfo.first_name);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<aside ref={wrapperRef} className="sidebar">
			<h2>Shopping Categories</h2>
			<button className="sidebar_close_button" aria-label="close" onClick={closeMenu}>
				<i className="fas fa-times" />
			</button>
			<div className="column h-100per" style={{ overflowY: 'scroll' }}>
				{props.userInfo ? (
					<div className="sidebar_dropdown">
						<button className="sidebar_button primary">{first_name}</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/secure/account/profile">
								<button className=" sidebar_button secondary" onClick={closeMenu}>
									Profile
								</button>
							</Link>
							<Link to="/secure/account/orders">
								<button className=" sidebar_button secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							{/* <Link to="/secure/account/devices">
								<button className=" sidebar_button secondary" onClick={closeMenu}>
									Devices
								</button>
							</Link> */}
							<button onClick={handleLogout} className=" sidebar_button secondary">
								{' '}
								Logout
							</button>
						</ul>
						<i
							style={{ '-webkitTransform': 'rotate(-180deg)' }}
							className=" pos-abs right-10px top-8px fas fa-sort-up"
						/>
					</div>
				) : (
					<Link to="/account/login">
						<button className="sidebar_button primary" onClick={closeMenu}>
							Login
						</button>
					</Link>
				)}
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<div className="sidebar_dropdown">
						<button className="sidebar_button primary">Admin</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/secure/glow/controlpanel">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Control Panel
								</button>
							</Link>
							<Link to="/secure/glow/orders">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<Link to="/secure/glow/products">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Products
								</button>
							</Link>
							<Link to="/secure/glow/users">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Users
								</button>
							</Link>
							<Link to="/secure/glow/expenses">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Expenses
								</button>
							</Link>
							<Link to="/secure/glow/sponsors">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Sponsors
								</button>
							</Link>
							<Link to="/secure/glow/promos">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Promos
								</button>
							</Link>
							<Link to="/secure/glow/carts">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Carts
								</button>
							</Link>
							<Link to="/secure/glow/contents">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Contents
								</button>
							</Link>
							<Link to="/secure/glow/emails">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Emails
								</button>
							</Link>
						</ul>
						<i
							style={{ '-webkitTransform': 'rotate(-180deg)' }}
							className=" pos-abs right-10px top-8px fas fa-sort-up"
						/>
					</div>
				)}
				<Link to="/collections/all/products">
					<button className="sidebar_button primary" onClick={closeMenu}>
						Products
					</button>
				</Link>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">
						<Link to="/pages/menu/gloving">Gloving</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/glowskins">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Glowskins (New)
							</button>
						</Link>
						<Link to="/collections/all/products/category/frosted_diffusers">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Frosted Diffusers
							</button>
						</Link>

						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/collections/all/products/category/mini_diffuser_caps">
									Mini Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/patterns">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Patterns
									</button>
								</Link>
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/collections/all/products/category/diffuser_caps">
									Original Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/symbols">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Symbols
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Patterns
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/emoji">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Emojis
									</button>
								</Link>
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
						<Link to="/collections/all/products/category/accessories">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Accessories
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div>
				{/* <div className="sidebar_dropdown">
					<button className="sidebar_button primary">Diffuser Caps</button>
					<ul className="sidebar_dropdown_container">
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/collections/all/products/category/mini_diffuser_caps">
									Mini Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/mini_diffuser_caps/subcategory/patterns">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Patterns
									</button>
								</Link>
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/collections/all/products/category/diffuser_caps">
									Original Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/symbols">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Symbols
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Patterns
									</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_caps/subcategory/emoji">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Emojis
									</button>
								</Link>
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Diffusers</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/frosted_diffusers">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Frosted Diffusers
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div> */}
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">
						<Link to="/pages/menu/decor">Decor</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/glow_strings">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Glow Strings
							</button>
						</Link>
						<Link to="/collections/all/products/category/infinity_mirrors">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Infinity Mirrors
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">
						<Link to="/pages/menu/community">Community</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/pages/featured">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Featured
							</button>
						</Link>
						<Link to="/pages/music">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Music
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div>
				{/* <Link to="/pages/glowcontrol">
					<button className="sidebar_button primary" onClick={closeMenu}>
						Glow Control
					</button>
				</Link> */}
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">
						<Link to="/pages/menu/support">Support</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/pages/about">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								About
							</button>
						</Link>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/pages/faq">FAQ</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/pages/faq#using_diffuser_caps_and_adapters">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Diffuser Caps Guide
									</button>
								</Link>
								<Link to="/pages/faq#diffuser_too_tight_too_loose">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Diffusers Too Tight/Loose?
									</button>
								</Link>
								<Link to="/pages/faq#ordering_custom_products">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Ordering Custom Products
									</button>
								</Link>
								<Link to="/pages/faq#featured_content">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Featured Content
									</button>
								</Link>
								<Link to="/pages/faq#processing_shipping">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Processing/Shipping
									</button>
								</Link>
								<Link to="/pages/faq#returns_cancellations">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Returns/Cancellations
									</button>
								</Link>
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
						<Link to="/pages/contact">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Contact
							</button>
						</Link>
						<Link to="/pages/terms">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Terms and Conditions
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
