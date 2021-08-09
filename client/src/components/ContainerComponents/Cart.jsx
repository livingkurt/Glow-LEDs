import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';
import { mobile_check } from '../../utils/react_helper_functions';

const Cart = (props) => {
	const history = useHistory();

	function useOutsideAlerter(ref) {
		useEffect(
			() => {
				/** Alert if clicked on outside of element */
				function handleClickOutside(event) {
					if (ref.current && !ref.current.contains(event.target)) {
						// alert('You clicked outside of me!');
						document.querySelector('.cart_sidebar').classList.remove('open');
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
		document.querySelector('.cart_sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	// const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	// console.log({ cartItems });

	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const checkoutHandler = () => {
		if (cartItems.length === 0) {
			set_no_items_in_cart('Cannot proceed to checkout without any items in cart');
		} else {
			if (userInfo.hasOwnProperty('first_name')) {
				history.push('/account/login?redirect=/secure/checkout/placeorder');
			} else {
				history.push('/checkout/decision');
			}
		}
		closeMenu();
	};

	const decide_warning = () => {
		if (new Date() > new Date('2020-12-17') && new Date() < new Date('2021-01-02')) {
			const confirm = window.confirm(
				'Glow LEDs will be out of office from 12/18/20 - 1/2/21. Orders will not be shipped until after January 2nd 2021'
			);
			if (confirm) {
				checkoutHandler();
			}
		} else {
			checkoutHandler();
		}
	};
	const no_adapters_warning = () => {
		const categories = cartItems.map((cartItem) => {
			return cartItem.category;
		});
		// const names = cartItems.map((cartItem) => {
		// 	return cartItem.name;
		// });
		if (
			!categories.includes('Custom Diffuser Caps Final Payment') ||
			!categories.includes('Custom Diffuser Caps Deposit')
		) {
			if (categories.includes('diffuser_caps')) {
				// console.log('Caps');
				if (!categories.includes('diffuser_adapters')) {
					return "Don't Forget: You'll need a set of Diffuser Adapters to use Diffuser Caps!";
				}
			}
		}
	};
	const navbarStyles = {
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

	useEffect(() => {
		console.log({ isMobile: mobile_check() });
		return () => {};
	}, []);

	return (
		<aside
			ref={wrapperRef}
			className="cart_sidebar"
			style={{
				top: '-10px',
				zIndex: 4,
				borderRadius: '0px 0px 20px 20px',
				height: mobile_check()
					? cartItems.length === 0 ? '300px' : '100%'
					: cartItems.length === 0 ? '300px' : 'unset'
			}}
		>
			<ul
				className={`cart_sidebar-list-container w-100per column jc-b ${mobile_check()
					? `h-100per`
					: `h-unset`}`}
				style={{ height: cartItems.length === 0 ? '300px' : 'unset' }}
				// className={`cart_sidebar-list-container column jc-b w-100per mr-1rem ${mobile_check()
				// 	? `h-90vh`
				// 	: `h-100per`}`}
			>
				<div>
					<li className="w-100per pb-5px">
						<div className="p-1rem w-100per">
							<button className="cart_sidebar_close_button" aria-label="close" onClick={closeMenu}>
								<i className="fas fa-times" />
							</button>
							<div className="jc-b">
								<div className="logo_text ai-c">
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
											<label className="ml-5px fs-30px mv-0px ff-h">Shopping Cart</label>
										</div>
									</Link>
								</div>

								<div className="column jc-fe">
									<div className="ta-r ">Price</div>
								</div>
							</div>
						</div>
					</li>
					{cartItems.length === 0 ? (
						<div className="p-1rem ta-c w-100per">
							<div className="ta-c w-100per">Cart is Empty</div>
						</div>
					) : (
						<div
							className={`${mobile_check() ? `h-90vh` : `h-unset`} mb-175px`}
							style={{
								overflowY: 'scroll'
							}}
						>
							{/* <div className={mobile_check() ? 'h-40vh max-h-65vh' : ''} > */}
							{/* <h4>{no_adapters_warning()}</h4> */}
							{cartItems.map((item, index) => (
								<li key={index} className="ph-1rem">
									{/* <div className="p-1rem"> */}
									<div className="cart_sidebar-image br-5px ai-c">
										<Link to={'/collections/all/products/' + item.pathname}>
											<img
												src={item.display_image}
												height="50px"
												width="50px"
												alt={item.name}
												title="Product Image"
											/>
										</Link>
									</div>
									<div className="cart_sidebar-name">
										<div className="mb-10px">
											<Link to={'/collections/all/products/' + item.pathname}>
												{determine_product_name(item, true)}
											</Link>
										</div>
										<div>
											<div className="ai-c h-25px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Qty: {item.qty}
												</label>
											</div>
										</div>
									</div>

									<div className="">
										<div className="cart_sidebar-price fs-16px">{cart_sale_price_switch(item)}</div>
										<div style={{ textAlign: 'right', width: '100%' }}>
											<button className="btn icon" onClick={() => removeFromCartHandler(item)}>
												<i className="fas fa-trash-alt" />
											</button>
										</div>
										{/* </div> */}
									</div>
								</li>
							))}
							{mobile_check() && <li className="h-175px" />}
						</div>
					)}

					{/* {no_items_in_cart && <h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>} */}
				</div>
			</ul>
			<div
				className="column w-100per pos-fix add_to_cart ph-1rem br-20px"
				style={{ bottom: cartItems.length === 0 ? '-10px' : '0px' }}
			>
				<h3 className="subtotal_h3">
					Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
					{cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
						cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
					) : (
						cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
					)}
				</h3>
				<Link to="/checkout/cart" className="w-100per">
					<button className="btn secondary w-100per mb-2rem" onClick={closeMenu}>
						View Cart
					</button>
				</Link>

				<button onClick={decide_warning} className="btn primary w-100per mb-1rem ">
					Proceed to Checkout
				</button>
			</div>
		</aside>
	);
};

export default Cart;
