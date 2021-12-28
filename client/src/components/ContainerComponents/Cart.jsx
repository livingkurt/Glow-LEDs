import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { sale_price_switch, determine_product_name } from '../../utils/react_helper_functions';
import { mobile_check } from '../../utils/react_helper_functions';
import { API_Content } from '../../utils';
import { LazyImage, Loading } from '../UtilityComponents';
import { determine_total, humanize, decide_warning, shuffle } from '../../utils/helper_functions';
import useWindowDimensions from '../Hooks/windowDimensions';

const Cart = (props) => {
	const history = useHistory();
	const [ loading_products, set_loading_products ] = useState(false);
	const [ loading_pictures, set_loading_pictures ] = useState(false);
	const [ category_items, set_category_items ] = useState([]);

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

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		let clean = true;
		if (clean) {
			get_display_content();
		}
		return () => (clean = false);
	}, []);

	const get_display_content = async () => {
		const { data } = await API_Content.get_display_content();
		console.log({ data });
		if (data && data[0]) {
			if (data[0].home_page && data[0].home_page.slideshow) {
				console.log({ slideshow: data[0].home_page.slideshow });
				set_category_items(data[0].home_page.slideshow);
			}
		}
	};

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	// console.log({ cartItems });

	const [ no_items_in_cart, set_no_items_in_cart ] = useState('');

	const removeFromCartHandler = (product) => {
		dispatch(removeFromCart(product));
	};

	const checkoutHandler = () => {
		if (decide_warning(props.date_1, props.date_2)) {
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
		}
	};

	const { width, height } = useWindowDimensions();

	const determine_picture_size = () => {
		if (width > 550) {
			return '140px';
		} else if (width < 550 && width > 375) {
			return '130px';
		} else if (width < 375 && width > 360) {
			return '115px';
		} else if (width < 360 && width > 325) {
			return '115px';
		} else if (width < 325) {
			return '100px';
		}
	};

	const determine_picture_padding = () => {
		if (width > 360) {
			return '1rem';
		} else if (width < 360 && width > 325) {
			return '5px';
		} else if (width < 325) {
			return '2px';
		}
	};

	const top_categories_grid = () => {
		return (
			<div className="p-1rem ta-c w-100per">
				<div>
					<label className="fs-20px title_font">Top Categories</label>
				</div>
				<div className="jc-c">
					<div className="jc-c wrap">
						{category_items &&
							shuffle(category_items).slice(0, 4).map((item, index) => {
								return (
									<div
										className={`product p-${determine_picture_padding()} m-5px jc-c`}
										style={{ height: 'unset' }}
										key={index}
									>
										{item.label && (
											<Link to={item.label} onClick={closeMenu} className="column jc-c ta-c">
												<label className="mt-0px fs-14px title_font mb-10px">
													{' '}
													{humanize(item.label)}
												</label>
												<div
													className={`w-${determine_picture_size()} h-${determine_picture_size()}`}
												>
													{item &&
													item.image && (
														<LazyImage
															className=" h-auto br-20px"
															alt={item.label}
															title="Product Image"
															size={{
																height: `${determine_picture_size()}`,
																width: `${determine_picture_size()}`,
																objectFit: 'cover'
															}}
															effect="blur"
															src={item.image}
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
					<div className="mv-2rem">
						<label className="title_font fs-20px lh-20px">Recently Viewed Products</label>
					</div>
					<div className="jc-c">
						<div className="jc-c wrap w-100per">
							{recently_viewed_products.map((item, index) => {
								return (
									<Link
										to={`/collections/all/products/${item.pathname}`}
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
											<label className="ml-5px fs-25px mv-0px ff-h title_font">
												Shopping Cart
											</label>
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
							{/* {top_categories_grid()} */}
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
															className={` double-image-cart${item.name &&
															item.name.split('-')[1] === '2 Tone'
																? '-vertical'
																: ' row'}`}
														>
															<LazyImage
																id="expandedImg"
																alt={item.name}
																title={item.name}
																className={`details-image-cart-${item.name &&
																item.name.split('-')[1] === '2 Tone'
																	? 'top'
																	: 'left'} m-0px`}
																src={item.display_image}
															/>
															<LazyImage
																id="expandedSecondaryImg"
																alt={item.name}
																title={item.name}
																className={`details-image-cart-${item.name &&
																item.name.split('-')[1] === '2 Tone'
																	? 'bottom'
																	: 'right'} `}
																src={item.secondary_image}
															/>
														</div>
													)}
												</div>
											</Link>
										</div>
										<div className="w-100per">
											<div className="cart_sidebar-name jc-b ai-c">
												<div className="mb-10px w-100per">
													<Link to={`/collections/all/products/${item.pathname}`}>
														{determine_product_name(item, true)}
													</Link>
												</div>
												<div className="mb-10px">
													<button
														className="btn icon"
														onClick={() => removeFromCartHandler(item)}
													>
														<i className="fas fa-trash-alt" />
													</button>
												</div>
											</div>

											<div className="jc-b mb-10px">
												<div className="custom-select">
													<select
														defaultValue={parseInt(item.qty)}
														value={parseInt(item.qty)}
														className="qty_select_dropdown"
														onChange={(e) => {
															dispatch(
																addToCart({
																	...item,
																	pathname: item.pathname,
																	qty: parseInt(e.target.value)
																})
															);
														}}
													>
														{[ ...Array(item.quantity).keys() ].map((x, index) => (
															<option key={index} defaultValue={parseInt(x + 1)}>
																{parseInt(x + 1)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
												<div className="cart_sidebar-price fs-16px">
													{sale_price_switch(item, true, 'light')}
												</div>
											</div>
										</div>
										{/* <div className="cart_sidebar-name">
											<div className="mb-10px">
												<Link
													to={`/collections/all/products/${item.pathname}`}
												>
													{determine_product_name(item, true)}
												</Link>
											</div>
											<div>
												<div className="ai-c h-25px">
													<label
														aria-label="sort"
														htmlFor="sort"
														className="select-label mr-1rem"
													>
														Qty: {item.qty}
													</label>
												</div>
											</div>
										</div>

										<div className="">
											<div className="cart_sidebar-price fs-16px">
												{sale_price_switch(item, true)}
											</div>
											<div style={{ textAlign: 'right', width: '100%' }}>
												<button
													className="btn icon"
													onClick={() => removeFromCartHandler(item)}
												>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</div> */}
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
				<label className="fs-17px title_font mv-1rem">
					Subtotal ( {cartItems && cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${' '}
					{determine_total(cartItems).toFixed(2)}
				</label>
				<Link to="/checkout/cart" className="w-100per">
					<button className="btn secondary w-100per mb-2rem" onClick={closeMenu}>
						View Cart
					</button>
				</Link>

				<button onClick={() => checkoutHandler()} className="btn primary w-100per mb-1rem bob">
					Proceed to Checkout
				</button>
			</div>
		</aside>
	);
};

export default Cart;
