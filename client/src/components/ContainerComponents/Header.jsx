import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import Banner from './Banner';

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

	const { cartItems } = cart;

	const openMenu = () => {
		const sidebar = document.querySelector('.sidebar');
		console.log(sidebar.classList.value);
		if (sidebar.classList.value === 'sidebar open') {
			document.querySelector('.sidebar').classList.remove('open');
		} else if (sidebar.classList.value === 'sidebar') {
			document.querySelector('.sidebar').classList.add('open');
		}
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		history.push('/account/login');
	};

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
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Banner />
			<header id="overlay">
				<div className="menu_button" style={{ width: '233px' }}>
					<Link to="/">
						<FlexContainer>
							<div className="logo" style={{ height: '125px', width: '125px' }}>
								<img
									className="zoom logo_s"
									// style={{ marginRight: '176px' }}

									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs"
								/>
							</div>
							{/* <h4>™</h4> */}

							{/* <h1 className="glow_leds_text">Glow LEDs</h1> */}
							{/* <label style={{ color: '#9a9898' }}>™</label> */}
						</FlexContainer>
					</Link>
					<button
						className="button mobile nav"
						onClick={openMenu}
						aria-label="sidebar"
						style={{ display: 'none', fontSize: '30px', height: '50px', width: '50px', padding: '10px' }}
					>
						<i className="fas fa-bars" />
					</button>
				</div>
				<FlexContainer column h_center>
					<FlexContainer h_center v_i_center class="logo_text">
						<Link to="/">
							<div className="logo_2" style={{ height: '80px', width: '80px', display: 'none' }}>
								<img
									className=" zoom logo_s"
									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs"
								/>
							</div>
						</Link>
						<Link to="/">
							<FlexContainer>
								<h1 className="glow_leds_text">Glow LEDs</h1>
								<label className="tm" style={{ color: '#9a9898' }}>
									™
								</label>
							</FlexContainer>
						</Link>
					</FlexContainer>
					<FlexContainer row h_between class="nav_bar">
						<Link to="/collections/all/products">
							<button className="button nav">Products</button>
						</Link>
						<div className="dropdown-nav">
							{/* <Link to="/collections/all/products/category/Diffusers"> */}
							<button className="button nav">Gloving</button>
							{/* </Link> */}
							<ul style={{ width: 210 }} className="dropdown-nav-content hover_fade_in">
								<Link to="/collections/all/products/category/frosted_diffusers">
									<button className="button nav">Frosted Diffusers</button>
								</Link>
								<Link to="/collections/all/products/category/caps">
									<button className="button nav">Diffuser Caps</button>
								</Link>
								<Link to="/collections/all/products/category/diffuser_adapters">
									<button className="button nav"> Diffuser Adapters</button>
								</Link>
								<Link to="/collections/all/products/category/accessories">
									<button className="button nav">Accessories</button>
								</Link>
							</ul>
						</div>
						<div className="dropdown-nav">
							{/* <Link to="/collections/all/products/category/Diffusers"> */}
							<button className="button nav">Decor</button>
							{/* </Link> */}
							<ul style={{ width: 200 }} className="dropdown-nav-content hover_fade_in">
								<Link to="/collections/all/products/category/string_lights">
									<button className="button nav">String Lights</button>
								</Link>
								<Link to="/collections/all/products/category/infinity_mirrors">
									<button className="button nav"> Infinity Mirrors</button>
								</Link>
							</ul>
						</div>
						<div className="dropdown-nav">
							{/* <Link to="/collections/all/products/category/Diffusers"> */}
							<button className="button nav">Community</button>
							{/* </Link> */}
							<ul style={{ width: 200 }} className="dropdown-nav-content hover_fade_in">
								<Link to="/pages/featured">
									<button className="button nav">Featured</button>
								</Link>
							</ul>
						</div>
						<div className="dropdown-nav">
							{/* <Link to="/collections/all/products/category/Diffusers"> */}
							<button className="button nav">Support</button>
							{/* </Link> */}
							<ul style={{ width: 230 }} className="dropdown-nav-content hover_fade_in">
								<Link to="/pages/about">
									<button className="button nav">About</button>
								</Link>
								<Link to="/pages/faq">
									<button className="button nav">FAQ</button>
								</Link>
								<Link to="/pages/contact">
									<button className="button nav">Contact</button>
								</Link>
								<Link to="/pages/terms">
									<button className="button nav">Term and Conditions</button>
								</Link>
							</ul>
						</div>
					</FlexContainer>
				</FlexContainer>
				<FlexContainer class="nav_bar" styles={{ width: '233px', justifyContent: 'flex-end' }}>
					<Link to="/checkout/cart">
						<button className=" button nav cart_text">
							Cart <i className="fas fa-shopping-cart" />{' '}
							{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
						</button>
					</Link>
					<Link to="/checkout/cart">
						<button style={{ display: 'none' }} className=" button mobile nav cart_icon">
							<i className="fas fa-shopping-cart" />{' '}
							{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
						</button>
					</Link>
					{props.userInfo ? (
						<div className="dropdown">
							<button className="button nav">{first_name}</button>
							<ul className="dropdown-content hover_fade_in" style={{ width: '150px' }}>
								<Link to="/secure/account/profile">
									<button className="button nav">Profile</button>
								</Link>
								<Link to="/secure/account/orders">
									<button className="button nav">Orders</button>
								</Link>
								<button className="button nav" onClick={handleLogout} style={{ marginRight: 'auto' }}>
									{' '}
									Logout
								</button>
							</ul>
						</div>
					) : (
						<div>
							<Link to="/account/login">
								<button className="button nav">Login</button>
							</Link>
						</div>
					)}
					{props.userInfo &&
					props.userInfo.isAdmin && (
						<div className="dropdown ">
							<button className="button nav">Admin</button>
							<ul className="dropdown-content hover_fade_in">
								<Link to="/secure/glow/controlpanel">
									<button className="button nav" style={{ width: '152px' }}>
										Control Panel
									</button>
								</Link>
								<Link to="/secure/glow/orders">
									<button className="button nav">Orders</button>
								</Link>
								<Link to="/secure/glow/products">
									<button className="button nav"> Products</button>
								</Link>
								<Link to="/secure/glow/users">
									<button className="button nav"> Users</button>
								</Link>
								<Link to="/secure/glow/expenses">
									<button className="button nav"> Expenses</button>
								</Link>
							</ul>
						</div>
					)}
				</FlexContainer>
			</header>
		</div>
	);
};

export default Header;
