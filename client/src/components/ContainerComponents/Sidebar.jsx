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
		history.push('/login');
	};

	const icon_styles = {
		position: 'absolute',
		right: '10px',
		top: '8px',
		'-webkitTransform': 'rotate(-180deg)'
	};

	const [ username, setUserName ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				setUserName(userInfo.username);
			}

			// }
		},
		[ userInfo ]
	);

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setUserName(userUpdate.userInfo.username);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<aside ref={wrapperRef} className="sidebar">
			<h2>Shopping Categories</h2>
			<button className="sidebar_close_button" onClick={closeMenu}>
				<i className="fas fa-times" />
			</button>
			<FlexContainer column>
				{props.userInfo ? (
					<div className="sidebar_dropdown">
						<button className="sidebar_button primary">{username}</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/profile">
								<button className=" sidebar_button secondary" onClick={closeMenu}>
									Profile
								</button>
							</Link>
							<Link to="/userorders">
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
					<Link to="/login">
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
							<Link to="/orders">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Orders
								</button>
							</Link>
							<Link to="/products">
								<button className="sidebar_button secondary" onClick={closeMenu}>
									Products
								</button>
							</Link>
						</ul>
						<i style={icon_styles} className="fas fa-sort-up" />
					</div>
				)}
				<Link to="/allproducts">
					<button className="sidebar_button primary" onClick={closeMenu}>
						All Products
					</button>
				</Link>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Gloving</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/category/Domes">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Domes
							</button>
						</Link>
						<Link to="/category/Caps">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Caps
							</button>
						</Link>
						<Link to="/category/Adapters">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								{' '}
								Adapters
							</button>
						</Link>
						<Link to="/category/Accessories">
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
						<Link to="/category/StringLights">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								String Lights
							</button>
						</Link>
						<Link to="/category/Infinity">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Infinity Mirrors
							</button>
						</Link>
					</ul>
					<i style={icon_styles} className="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<button className="sidebar_button primary">Support</button>
					<ul className="sidebar_dropdown_container">
						<Link to="/about">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								About
							</button>
						</Link>
						<Link to="/contact">
							<button className="sidebar_button secondary" onClick={closeMenu}>
								Contact
							</button>
						</Link>
						<Link to="/terms">
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
