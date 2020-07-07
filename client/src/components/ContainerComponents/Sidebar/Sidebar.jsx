import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Title, ButtonWord } from '../../UtilityComponents/index';
import { FlexContainer } from '../index';
import { useDispatch, useSelector } from 'react-redux';
// import './sidebar.css';
import { logout } from '../../../actions/userActions';

const Sidebar = (props) => {
	const history = useHistory();

	const header_styles = {
		gridArea: 'header',
		backgroundColor: '#333333',
		color: '#ffffff',
		display: 'flex',
		alignItems: 'center',
		padding: '15px',
		listStyleType: 'none',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		position: 'fixed',
		right: '0',
		left: '0',
		zIndex: '999'
	};

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

	const [ name, setName ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				setName(userInfo.name);
			}

			// }
		},
		[ userInfo ]
	);

	const userUpdate = useSelector((state) => state.userUpdate);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setName(userUpdate.userInfo.name);
			}
			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<aside className="sidebar">
			<Title class="h2_title">Shopping Categories</Title>
			<button className="sidebar_close_button" onClick={closeMenu}>
				<i class="fas fa-times" />
			</button>
			<FlexContainer column>
				{props.userInfo ? (
					<div className="sidebar_dropdown">
						<button class="sidebar_button primary">{name}</button>
						<ul className="sidebar_dropdown_container">
							<Link to="/profile">
								<button class=" sidebar_button secondary" on_click_function={closeMenu}>
									Profile
								</button>
							</Link>
							<Link to="/userorders">
								<button class=" sidebar_button secondary" on_click_function={closeMenu}>
									Orders
								</button>
							</Link>
							<button on_click_function={handleLogout} class=" sidebar_button secondary">
								{' '}
								Logout
							</button>
						</ul>
						<i style={icon_styles} class="fas fa-sort-up" />
					</div>
				) : (
					<Link to="/login">
						<ButtonWord class="sidebar_button primary" on_click_function={closeMenu}>
							Login
						</ButtonWord>
					</Link>
				)}
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<div className="sidebar_dropdown">
						<ButtonWord class="sidebar_button primary">Admin</ButtonWord>
						<ul className="sidebar_dropdown_container">
							<Link to="/orders">
								<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
									Orders
								</ButtonWord>
							</Link>
							<Link to="/products">
								<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
									Products
								</ButtonWord>
							</Link>
						</ul>
						<i style={icon_styles} class="fas fa-sort-up" />
					</div>
				)}
				<Link to="/allproducts">
					<ButtonWord class="sidebar_button primary" on_click_function={closeMenu}>
						All Products
					</ButtonWord>
				</Link>
				<div className="sidebar_dropdown">
					<ButtonWord class="sidebar_button primary">Gloving</ButtonWord>
					<ul className="sidebar_dropdown_container">
						<Link to="/category/Domes">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								Domes
							</ButtonWord>
						</Link>
						<Link to="/category/Caps">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								Caps
							</ButtonWord>
						</Link>
						<Link to="/category/Adapters">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								{' '}
								Adapters
							</ButtonWord>
						</Link>
						<Link to="/category/Accessories">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								{' '}
								Accessories
							</ButtonWord>
						</Link>
					</ul>
					<i style={icon_styles} class="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<ButtonWord class="sidebar_button primary">Decor</ButtonWord>
					<ul className="sidebar_dropdown_container">
						<Link to="/category/StringLights">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								String Lights
							</ButtonWord>
						</Link>
						<Link to="/category/Infinity">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								Infinity Mirrors
							</ButtonWord>
						</Link>
					</ul>
					<i style={icon_styles} class="fas fa-sort-up" />
				</div>
				<div className="sidebar_dropdown">
					<ButtonWord class="sidebar_button primary">Support</ButtonWord>
					<ul className="sidebar_dropdown_container">
						<Link to="/contact">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								Contact
							</ButtonWord>
						</Link>
						<Link to="/faq">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								FAQ
							</ButtonWord>
						</Link>
						<Link to="/terms">
							<ButtonWord class="sidebar_button secondary" on_click_function={closeMenu}>
								Terms and Conditions
							</ButtonWord>
						</Link>
					</ul>
					<i style={icon_styles} class="fas fa-sort-up" />
				</div>
				{/* {
          props.userInfo
            ?
            <Link to="/profile"><ButtonWord >{props.userInfo.name}</ButtonWord></Link>

            :
            <Link to="/login"><ButtonWord >Login</ButtonWord></Link>
        } */}
			</FlexContainer>
		</aside>
	);
};

export default Sidebar;
