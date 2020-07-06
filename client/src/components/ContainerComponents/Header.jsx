import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FlexContainer } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

const Header = (props) => {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(
		() => {
			if (userInfo) {
				setName(userInfo.name);
			}
		},
		[ userInfo ]
	);

	const cart = useSelector((state) => state.cart);
	console.log({ Header: userInfo });

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
		history.push('/login');
	};

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
		<header id="overlay">
			<div className="brand">
				<Link to="/">
					<img
						className="zoom logo"
						style={{ marginRight: '130px' }}
						height="125px"
						src="/images/optimized_images/logo_images/glow_logo_optimized.png"
						alt="Glow LEDs"
					/>
				</Link>
				<button
					className="button mobile nav"
					onClick={openMenu}
					style={{ display: 'none', fontSize: '30px', height: '50px', width: '50px' }}
				>
					<i className="fas fa-bars" />
				</button>
			</div>
			<FlexContainer column h_center>
				<FlexContainer h_center v_i_center class="logo_text">
					<Link to="/">
						<img
							className="logo_2"
							style={{ display: 'none', height: '80px' }}
							src="/images/optimized_images/logo_images/glow_logo_optimized.png"
							alt="Glow LEDs"
						/>
					</Link>
					<Link to="/">
						<h1 className="glow_leds_text">Glow LEDs</h1>
					</Link>
				</FlexContainer>
				<FlexContainer row h_between class="nav_bar">
					<Link to="/allproducts">
						<button className="button nav">All Products</button>
					</Link>
					<div className="dropdown-nav">
						{/* <Link to="/category/Diffusers"> */}
						<button className="button nav">Gloving</button>
						{/* </Link> */}
						<ul style={{ width: 200 }} className="dropdown-nav-content">
							<Link to="/category/Domes">
								<button className="button nav">Domes</button>
							</Link>
							<Link to="/category/Caps">
								<button className="button nav">Caps</button>
							</Link>
							<Link to="/category/Adapters">
								<button className="button nav"> Adapters</button>
							</Link>
							<Link to="/category/Accessories">
								<button className="button nav">Accessories</button>
							</Link>
						</ul>
					</div>
					<div className="dropdown-nav">
						{/* <Link to="/category/Diffusers"> */}
						<button className="button nav">Decor</button>
						{/* </Link> */}
						<ul style={{ width: 200 }} className="dropdown-nav-content">
							<Link to="/category/StringLights">
								<button className="button nav">String Lights</button>
							</Link>
							<Link to="/category/Infinity">
								<button className="button nav"> Infinity Mirrors</button>
							</Link>
						</ul>
					</div>
					<div className="dropdown-nav">
						{/* <Link to="/category/Diffusers"> */}
						<button className="button nav">Support</button>
						{/* </Link> */}
						<ul style={{ width: 230 }} className="dropdown-nav-content">
							<Link to="/contact">
								<button className="button nav">Contact</button>
							</Link>
							<Link to="/faq">
								<button className="button nav">FAQ</button>
							</Link>
							<Link to="/terms">
								<button className="button nav">Term and Conditions</button>
							</Link>
						</ul>
					</div>
				</FlexContainer>
			</FlexContainer>
			<FlexContainer class="nav_bar" styles={{ width: '270px', justifyContent: 'flex-end' }}>
				<Link to="/cart">
					<button className=" button nav cart_text">
						Cart <i className="fas fa-shopping-cart" /> {cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
					</button>
				</Link>
				<Link to="/cart">
					<button style={{ display: 'none' }} className=" button mobile nav cart_icon">
						<i className="fas fa-shopping-cart" /> {cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
					</button>
				</Link>
				{props.userInfo ? (
					<div className="dropdown">
						<button className="button nav">{name}</button>
						<ul className="dropdown-content" style={{ width: '150px' }}>
							<Link to="/profile">
								<button className="button nav">Profile</button>
							</Link>
							<Link to="/userorders">
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
						<Link to="/login">
							<button className="button nav">Login</button>
						</Link>
					</div>
				)}
				{props.userInfo &&
				props.userInfo.isAdmin && (
					<div className="dropdown">
						<button className="button nav">Admin</button>
						<ul className="dropdown-content">
							<Link to="/orders">
								<button className="button nav">Orders</button>
							</Link>
							<Link to="/products">
								<button className="button nav"> Products</button>
							</Link>
						</ul>
					</div>
				)}
			</FlexContainer>
		</header>
	);
};

export default Header;
