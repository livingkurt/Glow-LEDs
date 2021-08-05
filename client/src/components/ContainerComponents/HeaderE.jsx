import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { listProducts } from '../../actions/productActions';
import Banner from './Banner';
import { HashLink } from 'react-router-hash-link';

const Header = (props) => {
	const history = useHistory();
	const [ first_name, set_first_name ] = useState('');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log({ userInfo });

	useEffect(
		() => {
			if (userInfo) {
				set_first_name(userInfo.first_name);
			}
		},
		[ userInfo ]
	);

	const cart = useSelector((state) => state.cart);

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(() => {
		// dispatch(listProducts(''));
		// console.log({ search: search.substring(8) });
		dispatch(listProducts());
	}, []);

	const { cartItems } = cart;

	const open_sidebar = () => {
		const sidebar = document.querySelector('.sidebar');
		console.log(sidebar.classList.value);
		if (sidebar.classList.value === 'sidebar open') {
			document.querySelector('.sidebar').classList.remove('open');
		} else if (sidebar.classList.value === 'sidebar') {
			document.querySelector('.sidebar').classList.add('open');
		}
	};
	const open_cart = () => {
		const cart = document.querySelector('.cart_sidebar');
		console.log(cart.classList.value);
		if (cart.classList.value === 'cart_sidebar open') {
			document.querySelector('.cart_sidebar').classList.remove('open');
		} else if (cart.classList.value === 'cart_sidebar') {
			document.querySelector('.cart_sidebar').classList.add('open');
		}
	};
	const dispatch = useDispatch();

	const handleLogout = () => {
		// dispatch(logout());
		dispatch(logout());
		history.push('/account/login');
	};

	const navbarStyles = {
		position: 'fixed',
		width: '100%',
		transition: 'top 0.2s'
	};

	const show_hide = (id) => {
		// set_current_id(id);
		const current_menu = document.getElementById(id);
		console.log(current_menu.classList);
		current_menu.classList.toggle('hide-menu');
		// set_last_id(id);
	};

	return (
		<div className="">
			<Banner visible={props.visible} />
			<header id="overlay" style={{ ...navbarStyles, top: props.visible ? '0' : '-180px' }}>
				<div className="header desktop-header mm-fixed-top ">
					<div className="top-bar">
						<p className="header-shipping-note m-0px min-h-25px">Lightning-Fast Shipping</p>
						<div className="top-right-header">
							<a href="https://www.emazinglights.com/pages/track-your-order" id="track_order">
								Track My Order
							</a>
							<a href="/account/login" id="login">
								Login
							</a>
						</div>
					</div>
					<div className="container">
						<div className="four columns logo center">
							{' '}
							<a href="https://www.emazinglights.com" title="EmazingLights">
								<picture>
									<source
										media="(min-width: 1024px)"
										srcset=" //cdn.shopify.com/s/files/1/0982/0710/t/211/assets/logo.png?v=12545829877916996192 "
									/>{' '}
									<img
										src=" //cdn.shopify.com/s/files/1/0982/0710/t/211/assets/logo_mobile.png?v=7236916590500192549 "
										alt="EmazingLights"
										data-src-home="  //cdn.shopify.com/s/files/1/0982/0710/t/211/assets/logo.png?v=12545829877916996192   "
									/>
								</picture>
							</a>
						</div>

						<div className="eight columns">
							<div className="nav mobile_hidden">
								<div className="">
									<div className="sixteen columns">
										<ul className="menu links-5">
											<li>
												{' '}
												<a href="/collections/best-sellers" className="top-link ">
													Best Sellers
												</a>
											</li>
											<li className="shop">
												{' '}
												<a href="#" className="sub-menu  ">
													{' '}
													Shop <span className="arrow">▾</span>
												</a>
												<div className="dropdown dropdown-wide">
													<ul className="sublink_2">
														<li>
															{' '}
															<a href="#">Gloving</a>
														</li>
														<li className="tier3 first led-gloves">
															{' '}
															<a className="sub-link" href="/collections/led-gloves">
																{' '}
																LED Gloves
															</a>
														</li>
														<li className="tier3 gloving-parts-batteries">
															{' '}
															<a
																className="sub-link"
																href="/collections/gloving-accessories"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Gloving Parts &amp; Batteries
															</a>
														</li>
													</ul>
													<ul className="sublink_1">
														<li>
															{' '}
															<a href="#">Orbiting</a>
														</li>
														<li className="tier3 first orbits">
															{' '}
															<a
																className="sub-link"
																href="/collections/orbits"
																data-image="//cdn.shopify.com/s/files/1/0982/0710/collections/Orbits_large.jpg?v=1510851742"
															>
																Orbits
															</a>
														</li>
														<li className="tier3 orbiting-parts-batteries">
															{' '}
															<a
																className="sub-link"
																href="/collections/orbit-accessories"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Orbiting Parts &amp; Batteries
															</a>
														</li>
													</ul>
													<ul className="sublink_2">
														<li>
															{' '}
															<a href="/collections/flow-arts">Other Flow Arts</a>
														</li>
														<li className="tier3 first poi-balls">
															{' '}
															<a
																className="sub-link"
																href="/collections/poi"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Poi Balls
															</a>
														</li>
														<li className="tier3 led-levitation-wands">
															{' '}
															<a
																className="sub-link"
																href="/collections/led-levitation-wands"
															>
																{' '}
																LED Levitation Wands
															</a>
														</li>
														<li className="tier3 fiber-optic-whips">
															{' '}
															<a
																className="sub-link"
																href="/collections/fiber-optic-whips"
																data-image="//cdn.shopify.com/s/files/1/0982/0710/collections/dropdown_fiberopticwhips_grande_83f538d1-b0be-4140-a5f6-fb11d06b55e9_large.jpg?v=1563394088"
															>
																Fiber Optic Whips
															</a>
														</li>
													</ul>
													<ul className="sublink_3">
														<li>
															{' '}
															<a href="#">Apparel &amp; Accessories</a>
														</li>
														<li className="tier3 first masks-bandanas">
															{' '}
															<a
																className="sub-link"
																href="/collections/face-masks"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Masks &amp; Bandanas
															</a>
														</li>
														<li className="tier3 t-shirts-tanks">
															{' '}
															<a
																className="sub-link"
																href="/collections/tanks-tees-men"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																T-Shirts &amp; Tanks
															</a>
														</li>
														<li className="tier3 hoodies">
															{' '}
															<a
																className="sub-link"
																href="/collections/sweatshirts-men"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Hoodies
															</a>
														</li>
														<li className="tier3 shorts-joggers">
															{' '}
															<a
																className="sub-link"
																href="/collections/bottoms-men"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Shorts &amp; Joggers
															</a>
														</li>
														<li className="tier3 boxers">
															{' '}
															<a
																className="sub-link"
																href="/collections/mens-stash-boxers"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Boxers
															</a>
														</li>
														<li className="tier3 hats">
															{' '}
															<a
																className="sub-link"
																href="/collections/hats-snapbacks"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_large.gif"
															>
																Hats
															</a>
														</li>
														<li className="tier3 glasses">
															{' '}
															<a className="sub-link" href="/collections/glasses">
																{' '}
																Glasses
															</a>
														</li>
													</ul>
													<ul className="sublink_4" />
												</div>
											</li>
											<li className="sales">
												{' '}
												<a href="#" className="sub-menu  ">
													{' '}
													Sales <span className="arrow">▾</span>
												</a>
												<div className="dropdown dropdown-wide">
													<ul className="sublink_3">
														<li>
															{' '}
															<a
																href="/collections/sales-and-promotions"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif"
															>
																Current Deals
															</a>
														</li>
														<li>
															{' '}
															<a
																href="/collections/5-and-under-deals"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif"
															>
																Under $5 Deals
															</a>
														</li>
														<li>
															{' '}
															<a
																href="/collections/10-and-under-deals"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif"
															>
																Under $10 Deals
															</a>
														</li>
														<li>
															{' '}
															<a href="/collections/clearance">Clearance</a>
														</li>
													</ul>
												</div>
											</li>
											<li>
												{' '}
												<a href="/pages/get-started" className="top-link ">
													Get Started
												</a>
											</li>
											<li className="get-involved">
												{' '}
												<a href="#" className="sub-menu  ">
													{' '}
													Get Involved <span className="arrow">▾</span>
												</a>
												<div className="dropdown dropdown-wide">
													<ul className="sublink_5">
														<li>
															{' '}
															<a href="/pages/facemelt-crew">FaceMelt Crew</a>
														</li>
														<li>
															{' '}
															<a
																href="/pages/sponsors"
																data-image="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif"
															>
																Our Sponsors
															</a>
														</li>
														<li>
															{' '}
															<a href="/pages/promoters">Promoters Program</a>
														</li>
														<li>
															{' '}
															<a href="/blogs/post">Blog</a>
														</li>
													</ul>
												</div>
											</li>
											<li className="search-cart-right pos-rel">
												<form action="/pages/search-results-page">
													<input type="hidden" name="type" value="product" />
													<div className="search-over">
														{' '}
														<button
															type="button"
															className="search-bar--submit icon-fallback-text"
														>
															{' '}
															<span
																className="icon icon-search search_toggle"
																aria-hidden="true"
															>
																Search
															</span>
														</button>
														<div className="search-wrap">
															{' '}
															<label for="searchProductDesktop" className="label_hidden">
																Find Product
															</label>{' '}
															<input
																type="text"
																id="searchProductDesktop"
																name="q"
																className="seach_entry snize-input-style"
																value=""
																autocapitalize="off"
																autocomplete="off"
																autocorrect="off"
															/>
														</div>
													</div>
												</form>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{/* <div className="search-bar align-right">
          <ul>
            <li className="wishlist-link-li wk-empty">
              <a href="/account/login?wk-redirect=%7B%22path%22%3A%22%2Fpages%2Fwishlist%22%7D" className="wk-link wk-empty"
                title="View Wishlist">
                <div className="wk-icon"> <svg version="1.1" xmlns="https://www.w3.org/2000/svg" width="64px"
                    height="60.833px" viewBox="0 0 64 60.833">
                    <path stroke="#000" stroke-width="5" stroke-miterlimit="10" fill-opacity="0"
                      d="M45.684,2.654c-6.057,0-11.27,4.927-13.684,10.073 c-2.417-5.145-7.63-10.073-13.687-10.073c-8.349,0-15.125,6.776-15.125,15.127c0,16.983,17.134,21.438,28.812,38.231 c11.038-16.688,28.811-21.787,28.811-38.231C60.811,9.431,54.033,2.654,45.684,2.654z">
                    </path>
                  </svg>
                </div><span className="wk-label">Wishlist</span> <span className="wk-count">(0)</span>
              </a>
            <li>
              <div className="cartwrap">
                <div className="cart-wrap"><a href="javascript:void(0)" className="icon-cart cart-slide-right">
                    <div className="cart_count">0</div>
                    <div className="cart_count-iteam"></div>
                  </a></div>
              </div>
            </li>
          </ul>
          <div className="minicartcontainer"> <span className="promo-message" id="promoMessage1"></span><span
              className="itemadd">Added to Cart</span>
            <div className="totalcontainer"><span className="subtotal">Order Subtotal</span><span className="totalmoney">$0.00
                USD</span><span className="excludestax">Excludes tax and shipping</span></div> <span
              className="shippingmessage">Lightning-Fast Shipping</span> <a href="/cart" className="viewcartbutton">View Cart /
              Checkout</a>
          </div>
        </div> */}
						</div>
					</div>
				</div>
				<div className="menu_button w-233px">
					<Link to="/">
						<div className="row">
							<div className="logo h-125px w-125px">
								<img
									className="zoom logo_s"
									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs Logo"
									title="Big Logo"
								/>
							</div>
						</div>
					</Link>
					<button
						className="btn mobile nav none fs-30px h-50px w-50px p-10px"
						onClick={open_sidebar}
						aria-label="sidebar"
					>
						<i className="fas fa-bars" />
					</button>
				</div>

				<div className="column jc-c mh-auto">
					<div className="logo_text jc-c mh-auto ai-c">
						<Link to="/">
							<div className="logo_2 h-80px w-80px none">
								<img
									className="zoom logo_s"
									src="/images/optimized_images/logo_images/glow_logo_optimized.png"
									alt="Glow LEDs Logo"
									title="Small Logo"
								/>
							</div>
						</Link>
						<Link to="/">
							{/* <div className="pos-rel"> */}
							<div className="row pos-rel">
								<label className="glow_leds_text">Glow LEDs</label>

								<label className="tm" style={{ color: '#9a9898' }}>
									™
								</label>
								<label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">
									Make it Glow
								</label>
							</div>
						</Link>
					</div>
					<nav className="jc-b nav_bar">
						<Link to="/">
							<button className="btn nav">Home</button>
						</Link>
						<div className="dropdown-nav">
							<Link to="/collections/all/products">
								<button className="btn nav" onClick={() => dispatch(listProducts(''))}>
									Products
								</button>
							</Link>
							<div className="dropdown-nav-content hover_fade_in w-250px">
								<Link to="/collections/all/products/category/best_sellers">
									<button className="btn nav w-100per ta-l">Best Sellers</button>
								</Link>
								<Link to="/collections/all/products/category/essentials">
									<button className="btn nav w-100per ta-l">Glow LEDs Essentials</button>
								</Link>
								<Link to="/collections/all/products/category/discounted">
									<button className="btn nav w-100per ta-l">On Sale!</button>
								</Link>
								<div className="dropdown-nav-subcategory">
									<Link to="/pages/menu/gloving">
										<button className="btn nav w-100per ta-l">Gloving</button>
										<i className="pos-abs right-10px top-8px trans-neg-180 fas fa-sort-up" />
									</Link>
									<div className="dropdown-nav-subcategory-content hover_fade_in left-118px top-39px w-243px">
										{/* <Link to="/collections/all/products/category/novaskins">
											<div className="row">
												<button className="btn nav w-100per ta-l">Novaskins (New)</button>
											</div>
										</Link> */}

										<Link to="/collections/all/products/category/exo_diffusers">
											<div className="row">
												<button className="btn nav w-100per ta-l">Exo Diffusers (New)</button>
											</div>
										</Link>
										<div className="dropdown-nav-nested">
											<Link to="/collections/all/products/category/glow_casings">
												<button className="btn nav w-100per ta-l">Glow Casings</button>
												<i className="pos-abs right-10px top-8px trans-neg-180 fas fa-sort-up" />
											</Link>
											<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px w-225px">
												<Link to="/collections/all/products/category/glow_casings/subcategory/imperfect">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Imperfect</button>
													</div>
												</Link>
											</div>
										</div>
										{/* <Link to="/collections/all/products/category/glow_casings">
											<div className="row">
												<button className="btn nav w-100per ta-l">Glow Casings</button>
											</div>
										</Link> */}
										{/* <Link to="/collections/all/products/category/glowskins">
											<div className="row">
												<button className="btn nav w-100per ta-l">Glowskins</button>
											</div>
										</Link> */}
										<div className="dropdown-nav-nested">
											<Link to="/collections/all/products/category/glowskins">
												<button className="btn nav w-100per ta-l">Glowskins</button>
												<i className="pos-abs right-10px top-8px trans-neg-180 fas fa-sort-up" />
											</Link>
											<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px w-225px">
												<Link to="/collections/all/products/category/glowskins/subcategory/classics">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Classics</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/glowskins/subcategory/novaskins">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Novaskins</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/glowskins/subcategory/alt_novaskins">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Alt Novaskins</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/glowskins/subcategory/imperfect">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Imperfect</button>
													</div>
												</Link>
											</div>
										</div>
										<div className="dropdown-nav-nested">
											<Link to="/collections/all/products/category/frosted_diffusers">
												<button className="btn nav w-100per ta-l">Frosted Diffusers</button>
												<i className="pos-abs right-10px top-8px trans-neg-180 fas fa-sort-up" />
											</Link>
											<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px w-250px">
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/abstract">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">
															Abstract (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/polygons">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">
															Polygons (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/cylinders">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">
															Cylinders (New)
														</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/domes">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Domes (New)</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/open_hole">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Open Hole</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/frosted_diffusers/subcategory/closed_hole">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Closed Hole</button>
													</div>
												</Link>
											</div>
										</div>
										<div className="dropdown-nav-nested">
											<Link to="/collections/all/products/category/diffuser_caps">
												<button className="btn nav w-100per ta-l">Diffuser Caps</button>
												<i className="pos-abs right-10px top-8px trans-neg-180 fas fa-sort-up" />
											</Link>
											<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px">
												{/* <Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Collections</button>
													</div>
												</Link> */}
												<div className="dropdown-nav-nested-2 ">
													<button className="btn nav w-100per ta-l">Collections</button>
													<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
													<div className="dropdown-nav-nested-2-content hover_fade_in left-66px top-29px w-250px">
														<Link to="/collections/all/products/category/diffuser_caps/collection/space_cadet">
															<div className="row">
																<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
																<button className="btn nav w-100per ta-l">Space Cadet</button>
															</div>
														</Link>
														<Link to="/collections/all/products/category/diffuser_caps/collection/festy_besty">
															<div className="row">
																<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
																<button className="btn nav w-100per ta-l">Festy Besty</button>
															</div>
														</Link>
														<Link to="/collections/all/products/category/diffuser_caps/collection/platonic_solids">
															<div className="row">
																<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
																<button className="btn nav w-100per ta-l">
																	Platonic Solids
																</button>
															</div>
														</Link>
													</div>
												</div>
												<Link to="/collections/all/products/category/diffuser_caps/subcategory/geometric">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Geomotric</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/subcategory/shapes">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Shapes</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/subcategory/abstract">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Abstract</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/subcategory/patterns">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Patterns</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/diffuser_caps/subcategory/imperfect">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Imperfect</button>
													</div>
												</Link>
											</div>
										</div>
										{/* <div className="dropdown-nav-nested">
											<Link to="/collections/all/products/category/mega_diffuser_caps">
												<button className="btn nav w-100per ta-l">Mega Diffuser Caps</button>
												<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
											</Link>
											<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px">
												<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/geometric">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Geomotric</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/shapes">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Shapes</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/abstract">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Abstract</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/patterns">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Patterns</button>
													</div>
												</Link>
												<Link to="/collections/all/products/category/mega_diffuser_caps/subcategory/emoji">
													<div className="row">
														<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
														<button className="btn nav w-100per ta-l">Emojis</button>
													</div>
												</Link>
											</div>
										</div> */}
										<Link to="/collections/all/products/category/accessories">
											<button className="btn nav w-100per ta-l">Accessories</button>
										</Link>
									</div>
								</div>

								<Link to="/collections/all/products/category/glow_strings">
									<button className="btn nav w-100per ta-l">Glow Strings</button>
								</Link>
							</div>
						</div>
						<div className="dropdown-nav">
							{/* <Link to="/pages/menu/featured"> */}
							<button className="btn nav">Featured</button>
							{/* </Link> */}
							<div className="dropdown-nav-content hover_fade_in w-250px">
								<div className="dropdown-nav-nested ">
									<button className="btn nav w-100per ta-l">Sponsored Artists</button>
									<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
									<div className="dropdown-nav-nested-content hover_fade_in left-118px top-39px w-250px">
										<Link to="/collections/all/sponsors">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Sponsored Glovers</button>
											</div>
										</Link>
										<Link to="/collections/all/teams">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Sponsored Teams</button>
											</div>
										</Link>
									</div>
								</div>

								<Link to="/collections/all/features/category/artists">
									<button className="btn nav w-100per ta-l">Artists</button>
								</Link>
								<Link to="/collections/all/features/category/glovers">
									<button className="btn nav w-100per ta-l">Glovers</button>
								</Link>
								<Link to="/collections/all/features/category/producers">
									<button className="btn nav w-100per ta-l">Producers</button>
								</Link>
								<Link to="/collections/all/features/category/vfx">
									<button className="btn nav w-100per ta-l">VFX</button>
								</Link>
								<Link to="/account/submit_feature">
									<button className="btn nav w-100per ta-l">Submit Feature</button>
								</Link>
								{/* <Link to="/pages/become_affiliate">
									<button className="btn nav w-100per ta-l">Become an Affiliate</button>
								</Link> */}
							</div>
						</div>
						{/* <div className="dropdown-nav">
							<Link to="/pages/glowcontrol">
								<button className="btn nav">Glow Control</button>
							</Link>
						</div> */}
						<div className="dropdown-nav">
							<Link to="/pages/menu/support">
								<button className="btn nav">Support</button>
							</Link>
							<div className="dropdown-nav-content hover_fade_in w-230px">
								<Link to="/pages/track_your_order">
									<button className="btn nav w-100per ta-l">Track Your Order</button>
								</Link>
								<Link to="/pages/about">
									<button className="btn nav w-100per ta-l">About</button>
								</Link>
								<Link to="/pages/announcements">
									<button className="btn nav w-100per ta-l">Announcements</button>
								</Link>
								<div className="dropdown-nav-subcategory">
									<Link to="/pages/faq">
										<button className="btn nav w-100per ta-l w-100per ta-l">FAQ</button>
										<i className="trans-neg-180 pos-abs right-10px top-8px fas fa-sort-up" />
									</Link>
									<div className="dropdown-nav-subcategory-content hover_fade_in w-325px left-n325px top-n5px">
										<HashLink to="/pages/faq#glowskins">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Glowskins</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#using_diffuser_caps_and_adapters">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Diffuser Caps Guide</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#diffuser_too_tight_too_loose">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">
													Diffusers Too Tight/Loose?
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#ordering_custom_products">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">
													Ordering Custom Products
												</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#featured_content">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Featured Content</button>
											</div>
										</HashLink>

										<HashLink to="/pages/faq#processing_shipping">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Processing/Shipping</button>
											</div>
										</HashLink>
										<HashLink to="/pages/faq#returns_cancellations">
											<div className="row">
												<i className="trans-90 mr-30px fas fa-sort-up" />{' '}
												<button className="btn nav w-100per ta-l">Returns/Cancellations</button>
											</div>
										</HashLink>
									</div>
								</div>
								<Link to="/pages/contact">
									<button className="btn nav w-100per ta-l">Contact</button>
								</Link>
								<Link to="/pages/terms">
									<button className="btn nav w-100per ta-l">Term and Conditions</button>
								</Link>
							</div>
						</div>
					</nav>
				</div>
				{/* <Link to="/checkout/cart"> */}
				<button className="btn mobile nav cart_icon none" onClick={open_cart}>
					<i className="fas fa-shopping-cart" />{' '}
					{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
				</button>
				{/* </Link> */}
				<div className="nav_bar w-233px jc-fe">
					{/* <Link to="/checkout/cart"> */}
					<button className="btn nav cart_text w-105px" onClick={open_cart}>
						Cart <i className="fas fa-shopping-cart" />{' '}
						{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
					</button>
					{/* </Link> */}
					{/* <Link to="/checkout/cart"> */}
					<button className="btn mobile nav cart_icon none" onClick={open_cart}>
						<i className="fas fa-shopping-cart" />{' '}
						{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{' '}
					</button>
					{/* </Link> */}
					{userInfo && userInfo.hasOwnProperty('first_name') ? (
						<div className="dropdown">
							<button className="btn nav">{first_name}</button>
							<ul className="dropdown-content hover_fade_in w-110px">
								<Link to="/secure/account/profile">
									<button className="btn nav">Profile</button>
								</Link>
								<Link to="/secure/account/orders">
									<button className="btn nav">Orders</button>
								</Link>
								<button className="btn nav mr-auto" onClick={handleLogout}>
									{' '}
									Logout
								</button>
							</ul>
						</div>
					) : (
						<div>
							<Link to="/account/login">
								<button className="btn nav">Login</button>
							</Link>
						</div>
					)}
					{userInfo &&
					userInfo.isAdmin && (
						<div className="dropdown ">
							<button className="btn nav">Admin</button>
							<ul className="dropdown-content hover_fade_in">
								<Link to="/secure/glow/controlpanel">
									<button className="btn nav w-152px">Control Panel</button>
								</Link>
								<Link to="/secure/glow/orders">
									<button className="btn nav">Orders</button>
								</Link>
								<Link to="/secure/glow/products">
									<button className="btn nav"> Products</button>
								</Link>
								<Link to="/secure/glow/users">
									<button className="btn nav"> Users</button>
								</Link>
								<Link to="/secure/glow/expenses">
									<button className="btn nav"> Expenses</button>
								</Link>
								<Link to="/secure/glow/features">
									<button className="btn nav"> Features</button>
								</Link>
								<Link to="/secure/glow/paychecks">
									<button className="btn nav"> Paychecks</button>
								</Link>
								<Link to="/secure/glow/affiliates">
									<button className="btn nav"> Affiliates</button>
								</Link>
								<Link to="/secure/glow/teams">
									<button className="btn nav"> Teams</button>
								</Link>
								<Link to="/secure/glow/promos">
									<button className="btn nav">Promos</button>
								</Link>
								<Link to="/secure/glow/carts">
									<button className="btn nav">Carts</button>
								</Link>
								<Link to="/secure/glow/contents">
									<button className="btn nav">Contents</button>
								</Link>
								<Link to="/secure/glow/emails">
									<button className="btn nav">Emails</button>
								</Link>
								<Link to="/secure/glow/logs">
									<button className="btn nav">Logs</button>
								</Link>
								<Link to="/secure/glow/chips">
									<button className="btn nav">Chips</button>
								</Link>
								<Link to="/secure/glow/surveys">
									<button className="btn nav">Surveys</button>
								</Link>
								<Link to="/secure/glow/parcels">
									<button className="btn nav">Parcels</button>
								</Link>
								<Link to="/secure/glow/categorys">
									<button className="btn nav">Categorys</button>
								</Link>
								<Link to="/secure/glow/settings">
									<button className="btn nav">Settings</button>
								</Link>
								<Link to="/secure/glow/edit_all_data">
									<button className="btn nav">Edit All Data</button>
								</Link>
							</ul>
						</div>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
