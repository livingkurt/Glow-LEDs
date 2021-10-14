import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { HashLink } from 'react-router-hash-link';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { cart_sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';
import { mobile_check } from '../../utils/react_helper_functions';
import { API_Products } from '../../utils';
import { MenuItemD } from '../DesktopComponents';
import { MenuItemM } from '../MobileComponents';
import { LazyImage, Loading } from '../UtilityComponents';
import { humanize } from '../../utils/helper_functions';
import useWindowDimensions from '../Hooks/windowDimensions';

const Cart = (props) => {
	const history = useHistory();
	const [ loading_products, set_loading_products ] = useState(false);
	const [ loading_pictures, set_loading_pictures ] = useState(false);
	const [ category_items, set_category_items ] = useState(false);

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

	useEffect(() => {
		// console.log({ isMobile: mobile_check() });
		get_category_occurrences();
		return () => {};
	}, []);

	const get_category_occurrences = async () => {
		set_loading_products(true);
		const { data } = await API_Products.get_category_occurrences();
		// console.log({ data });
		set_loading_products(false);
		const top_4_categories = data.slice(0, 5);
		// console.log({ top_4_categories });
		set_loading_pictures(true);
		const top_4 = await Promise.all(
			top_4_categories
				.filter((category) => category.category !== 'frosted_diffusers')
				.map(async (category) => await API_Products.get_product_pictures(category.category))
		);
		set_loading_pictures(false);
		// console.log({ top_4 });
		const top_4_products = top_4.map((item) => item.data[item.data.length - 1]);

		// console.log({ top_4_products });
		set_category_items(top_4_products);
	};
	const decide_url = (item) => {
		if (item.category === 'gloving' || item.category === 'decor') {
			if (item.subcategory) {
				return `/collections/all/products/category/${item && item.category}/subcategory/${item &&
					item.subcategory}`;
			} else {
				return `/collections/all/products/category/${item.category}`;
			}
		} else if (item.category === 'featured') {
			return `/collections/all/features/category/${item.category}`;
		} else if (item.category === 'sponsored_artists') {
			return `/collections/all/${item.category}`;
		} else {
			return `/pages/${item.category}`;
		}
	};
	const { width, height } = useWindowDimensions();

	const determine_picture_size = () => {
		if (width > 550) {
			return '140px';
		} else if (width < 550 && width > 375) {
			return '130px';
		} else if (width < 375 && width > 350) {
			return '115px';
		} else if (width < 350 && width > 325) {
			return '100px';
		} else if (width < 325) {
			return '100px';
		}
	};

	const top_categories_grid = () => {
		return (
			<div className="p-1rem ta-c w-100per">
				<div>
					<h2 className="">Top Categories</h2>
				</div>
				<div className="jc-c">
					<div className="jc-c wrap">
						{category_items &&
							category_items.map((item, index) => {
								return (
									<div className="product m-5px jc-c" style={{ height: 'unset' }} key={index}>
										{item.category && (
											<Link
												to={`/collections/all/products/category/${item.category}`}
												onClick={closeMenu}
											>
												<h3 className="mt-0px"> {humanize(item.category)}</h3>
												<div
													className={`w-${determine_picture_size()} h-${determine_picture_size()}`}
												>
													{item &&
													item.images && (
														<LazyImage
															className=" h-auto br-20px"
															alt={item.category}
															title="Product Image"
															size={{
																height: `${determine_picture_size()}`,
																width: `${determine_picture_size()}`,
																objectFit: 'cover'
															}}
															effect="blur"
															src={item.images[0]}
														/>
													)}
												</div>
											</Link>
										)}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};
	const recently_viewed_products = JSON.parse(sessionStorage.getItem('recently_viewed'))
		? JSON.parse(sessionStorage.getItem('recently_viewed')).slice(0, 2)
		: [];

	const recently_viewed_grid = () => {
		if (
			recently_viewed_products &&
			Array.isArray(recently_viewed_products) &&
			recently_viewed_products.length !== 0
		) {
			return (
				<div className="p-1rem ta-c w-100per" style={{ border: '0px !important' }}>
					<div>
						<h2 className="">Recently Viewed Products</h2>
					</div>
					<div className="jc-c">
						<div className="jc-c wrap w-100per">
							{recently_viewed_products.map((item, index) => {
								return (
									<Link
										to={'/collections/all/products/' + item.pathname}
										className="w-100per mb-1rem"
										key={index}
									>
										<li className="ph-1rem w-100per">
											<div className=" br-5px ai-c">
												<img
													src={item.images && item.images[0]}
													height="50px"
													width="50px"
													alt={item.name}
													title="Product Image"
												/>
											</div>
											<div className=" ta-l w-100per">
												<div className="mb-10px">{item.name}</div>
											</div>

											{/* <div className="">
											<div className="cart_sidebar-price fs-16px">
												{cart_sale_price_switch(item)}
											</div>
										</div> */}
										</li>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<aside
			ref={wrapperRef}
			className="cart_sidebar"
			style={{
				top: '-10px',
				zIndex: 4,
				borderRadius: '0px 0px 20px 20px',
				height: mobile_check() ? '100%' : cartItems.length === 0 ? '1000px' : 'unset'
			}}
		>
			<Loading loading={loading_products} />
			<Loading loading={loading_pictures} />
			<ul
				className={`cart_sidebar-list-container w-100per column jc-b ${mobile_check()
					? `h-100per`
					: `h-unset`}`}
				style={{ height: cartItems.length === 0 ? '400px' : 'unset' }}
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
					{cartItems && cartItems.length === 0 ? (
						<div className="p-1rem ta-c w-100per">
							<div className="ta-c w-100per">Cart is Empty</div>
							{recently_viewed_grid()}
							{top_categories_grid()}
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
							{cartItems &&
								cartItems.map((item, index) => (
									<li key={index} className="ph-1rem">
										<div className="ai-c">
											<Link to={'/collections/all/products/' + item.pathname}>
												<div className="mb-10px">
													{!item.secondary_image && (
														<LazyImage
															src={item.display_image}
															alt={item.name}
															className="br-10px w-70px h-70px"
															title="Product Image"
														/>
													)}
													{item.secondary_image && (
														<div
															className={`double-image-cart-${item.name &&
															item.name.split('-')[1]
																? 'vertical'
																: ''} row`}
														>
															<LazyImage
																id="expandedImg"
																alt={item.name}
																title={item.name}
																className={`details-image-cart-${item.name &&
																item.name.split('-')[1]
																	? 'top'
																	: 'left'} m-0px`}
																src={item.display_image}
															/>
															<LazyImage
																id="expandedSecondaryImg"
																alt={item.name}
																title={item.name}
																className={`details-image-cart-${item.name &&
																item.name.split('-')[1]
																	? 'bottom'
																	: 'right'} `}
																src={item.secondary_image}
															/>
														</div>
													)}
												</div>
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
											<div className="cart_sidebar-price fs-16px">
												{cart_sale_price_switch(item)}
											</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="btn icon"
													onClick={() => removeFromCartHandler(item)}
												>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</div>
									</li>
								))}
							{recently_viewed_grid()}
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
					Subtotal ( {cartItems && cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
					{cartItems && cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0 ? (
						cartItems && cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
					) : (
						cartItems && cartItems.reduce((a, c) => a + c.sale_price * c.qty, 0).toFixed(2)
					)}
				</h3>
				<Link to="/checkout/cart" className="w-100per">
					<button className="btn secondary w-100per mb-2rem" onClick={closeMenu}>
						View Cart
					</button>
				</Link>

				<button onClick={decide_warning} className="btn primary w-100per mb-1rem bob">
					Proceed to Checkout
				</button>
			</div>
		</aside>
	);
};

export default Cart;
