import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import FlexContainer from './FlexContainer';

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

	const { cartItems } = cart;

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
			<FlexContainer column>
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
							<button onClick={handleLogout} className=" sidebar_button secondary">
								{' '}
								Logout
							</button>
						</ul>
						<i style={icon_styles} className="fas fa-sort-up" />
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
						</ul>
						<i style={icon_styles} className="fas fa-sort-up" />
					</div>
				)}
				<Link to="/collections/all/products">
					<button className="sidebar_button primary" onClick={closeMenu}>
						Products
					</button>
				</Link>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Gloving</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/frosted_diffusers">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Frosted Diffusers
							</button>
						</Link>
						<Link to="/collections/all/products/category/caps">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Diffuser Caps
							</button>
						</Link>
						<Link to="/collections/all/products/category/diffuser_adapters">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								{' '}
								Diffuser Adapters
							</button>
						</Link>
						<Link to="/collections/all/products/category/accessories">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								{' '}
								Accessories
							</button>
						</Link>
					</ul>
					<i style={icon_styles} className="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Decor</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/collections/all/products/category/string_lights">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								String Lights
							</button>
						</Link>
						<Link to="/collections/all/products/category/infinity_mirrors">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Infinity Mirrors
							</button>
						</Link>
					</ul>
					<i style={icon_styles} className="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Community</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/pages/featured">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Featured
							</button>
						</Link>
					</ul>
					<i style={icon_styles} className="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Support</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/pages/about">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								About
							</button>
						</Link>
						<Link to="/pages/faq">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								FAQ
							</button>
						</Link>
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
					<i style={icon_styles} className="fas fa-sort-up" />
				</div>
			</FlexContainer>
		</aside>
	);
};

export default Sidebar;
