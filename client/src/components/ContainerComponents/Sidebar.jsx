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
						{/* <label className="tm" style={{ color: '#9a9898' }}>
							™
						</label> */}
					</div>
				</Link>
			</div>
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
							<Link to="/secure/glow/affiliates">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Affiliates
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
								<Link to="/collections/all/products/category/diffuser_caps">Diffuser Caps</Link>
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
							</ul>
							<i
								style={{ '-webkitTransform': 'rotate(-180deg)' }}
								className=" pos-abs right-10px top-8px fas fa-sort-up"
							/>
						</div>
						<div className="sidebar_dropdown_secondary">
							<button className="sidebar_button secondary">
								<Link to="/collections/all/products/category/mega_diffuser_caps">
									Mega Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/symbols">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Symbols
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/patterns">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Patterns
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/emoji">
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
								<Link to="/collections/all/products/category/mega_diffuser_caps">
									Mega Diffuser Caps
								</Link>
							</button>
							<ul className="sidebar_dropdown_secondary_container">
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/geometric">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Geomotric
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/shapes">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Shapes
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/abstract">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Abstract
									</button>
								</Link>
								<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/patterns">
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
									Diffuser Caps
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
				{/* <div className="sidebar_dropdown"> */}
				{/* <button className="sidebar_button primary">
						<Link to="/pages/menu/decor">Decor</Link>
					</button> */}
				<Link to="/collections/all/products/category/glow_strings">
					<button className="sidebar_button primary" onClick={closeMenu}>
						Glow Strings
					</button>
				</Link>

				{/* <ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/glow_strings">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Glow Strings
							</button>
						</Link>
					</ul>
					<i
						style={{ '-webkitTransform': 'rotate(-180deg)' }}
						className=" pos-abs right-10px top-8px fas fa-sort-up"
					/> */}
				{/* </div> */}
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">
						<Link to="/pages/menu/community">Community</Link>
					</button>

					<ul className="sidebar_dropdown_container">
						<Link to="/pages/announcements">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Announcements
							</button>
						</Link>
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
						<Link to="/pages/track_your_order">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Track Your Order
							</button>
						</Link>
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
								<HashLink href="/pages/faq#glowskins">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Glowskins
									</button>
								</HashLink>
								<HashLink href="/pages/faq#using_diffuser_caps_and_adapters">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Diffuser Caps Guide
									</button>
								</HashLink>
								<HashLink href="/pages/faq#diffuser_too_tight_too_loose">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Diffusers Too Tight/Loose?
									</button>
								</HashLink>
								<HashLink href="/pages/faq#ordering_custom_products">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Ordering Custom Products
									</button>
								</HashLink>
								<HashLink href="/pages/faq#featured_content">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Featured Content
									</button>
								</HashLink>
								<HashLink href="/pages/faq#processing_shipping">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Processing/Shipping
									</button>
								</HashLink>
								<HashLink href="/pages/faq#returns_cancellations">
									<button className="sidebar_button nested" onClick={closeMenu}>
										Returns/Cancellations
									</button>
								</HashLink>
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
