import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, listProducts } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Rating, Reviews, Slideshow, RelatedProducts, RelatedCarousel } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import Cookie from 'js-cookie';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';
import { addToCart } from '../../actions/cartActions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const [ original_diffuser_caps, set_original_diffuser_caps ] = useState([]);
	const [ mini_diffuser_caps, set_mini_diffuser_caps ] = useState([]);
	const [ diffuser_caps, set_diffuser_caps ] = useState([]);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ diffuser_cap_name, set_diffuser_cap_name ] = useState('');
	const [ image, set_image ] = useState('');
	const [ diffuser_cap_color, set_diffuser_cap_color ] = useState('');
	const productDetails = useSelector((state) => state.productDetails);
	// console.log({ diffuser_cap });

	const { product, loading, error } = productDetails;

	const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');

	// const productList = useSelector((state) => state.productList);
	// const { products, loading: loading_products, error: error_products } = productList;
	// console.log({ products });

	const dispatch = useDispatch();

	// const filament_colors = [ 'Black', 'White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];

	const diffuser_colors = [ 'Black', 'White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];
	const diffuser_cap_colors = [ 'Translucent White', 'Red', 'Green', 'Blue', 'Violet', 'Purple' ];
	const determine_colors = () => {
		if (product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters') {
			return diffuser_cap_colors;
		} else if (product.category === 'diffuser_caps' || product.category === 'mini_diffuser_caps') {
			return diffuser_colors;
		}
	};

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.pathname));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
		// dispatch(listProducts(''));
		get_original_diffuser_caps();
		get_mini_diffuser_caps();

		// if (diffuser_cap_cookie) {
		// 	set_diffuser_cap(diffuser_cap_cookie);
		// 	console.log({ diffuser_cap_cookie });
		// }
	}, []);

	const get_original_diffuser_caps = async () => {
		const { data } = await API_Products.get_original_diffuser_caps();
		// console.log(data);
		set_original_diffuser_caps(data);
		// set_diffuser_caps(data);
	};
	const get_mini_diffuser_caps = async () => {
		const { data } = await API_Products.get_mini_diffuser_caps();
		// console.log(data);
		set_mini_diffuser_caps(data);
		// set_diffuser_caps(data);
	};

	useEffect(
		() => {
			if (product) {
				set_image(product.images && product.images[0]);
				set_diffuser_cap_color(
					product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters'
						? 'Translucent White'
						: product.category === 'diffuser_caps' || product.category === 'mini_diffuser_caps'
							? 'Black'
							: ''
				);
			}
		},
		[ product ]
	);

	useEffect(
		() => {
			if (error) {
				props.history.push('/collections/all/products');
			}
		},
		[ error ]
	);

	const handleAddToCart = () => {
		dispatch(addToCart(props.match.params.pathname, qty, diffuser_cap_color, diffuser_cap));
		props.history.push('/checkout/cart');
	};

	// const filament_colors = [ 'Black' ];

	const handle_diffuser_cap_change = (e) => {
		set_diffuser_cap(JSON.parse(e.target.value));
		console.log(JSON.parse(e.target.value).pathname);
		set_diffuser_cap_name(JSON.parse(e.target.value).pathname);
	};

	return (
		<FlexContainer column>
			<div className="back-to-result">
				<FlexContainer h_between>
					<FlexContainer styles={{ marginBottom: 10 }}>
						{/* <Link to="/collections/all/products"> */}
						<button class="button secondary" onClick={() => props.history.goBack()}>
							Back to Products
						</button>
						{/* </Link> */}
					</FlexContainer>
					{/* {console.log(props.match.params.pathname)} */}
					{userInfo &&
					userInfo.isAdmin && (
						<Link to={'/secure/glow/editproduct/' + props.match.params.pathname}>
							<button className="button secondary" style={{ width: '156px' }}>
								Edit Product
							</button>
						</Link>
					)}
				</FlexContainer>
			</div>
			<Loading loading={loading} error={error}>
				{product && (
					<FlexContainer column>
						<Helmet>
							<title>{product.meta_title}</title>
							<meta property="og:title" content={product.meta_title} />
							<meta name="twitter:title" content={product.meta_title} />
							<link
								rel="canonical"
								href={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							<meta
								property="og:url"
								content={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							<meta
								property="og:image"
								content={'https://www.glow-leds.com' + (product.images && product.images[0])}
							/>

							<meta
								property="og:image:secure_url"
								content={'https://www.glow-leds.com' + (product.images && product.images[0])}
							/>
							<meta
								name="twitter:image"
								content={'https://www.glow-leds.com' + (product.images && product.images[0])}
							/>
							<meta
								name="description"
								content={
									loading ? (
										'Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world.'
									) : (
										product.meta_description
									)
								}
							/>

							<meta
								property="og:description"
								content={
									loading ? (
										'Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world.'
									) : (
										product.meta_description
									)
								}
							/>

							<meta
								name="twitter:description"
								content={
									loading ? (
										'Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world.'
									) : (
										product.meta_description
									)
								}
							/>
						</Helmet>
						<div className="details">
							<FlexContainer column>
								<h1 class="product_title_top" style={{ display: 'none' }}>
									{product.name}
								</h1>
								<div className="details-image">
									<Zoom>
										<img
											id="expandedImg"
											alt=""
											className="details-image-img"
											src={image}
											style={{
												maxWidth: '400px',
												maxHeight: '400px',
												height: '100%',
												width: '100%'
											}}
										/>
									</Zoom>
								</div>
							</FlexContainer>
							<Slideshow product={product} show_hide="alt_pictures_shown_shown" />
							<div className="details-info">
								<h1 class="product_title_side" styles={{ display: 'flex' }}>
									{product.name}
								</h1>
								<div style={{ marginBottom: '15px', marginTop: '-9px' }}>
									<a href="#reviews">
										<Rating value={product.rating} text={product.numReviews + ' reviews'} />
									</a>
								</div>

								{product.name === 'Custom Infinity Mirror' ? (
									<h3 style={{ margin: 0, marginRight: 5 }}>
										Price: $549.99 - $<i class="fas fa-arrow-up" />
									</h3>
								) : (
									<FlexContainer>
										<h3 style={{ margin: 0, marginRight: 5 }}>Price: </h3>
										{product.sale_price !== 0 ? (
											<label>
												<del style={{ color: 'red' }}>
													<label style={{ color: 'white' }}>
														${product.price ? product.price.toFixed(2) : product.price}
													</label>
												</del>{' '}
												<i class="fas fa-arrow-right" /> ${product.sale_price ? product.sale_price.toFixed(2) : product.sale_price}{' '}
												On Sale!
											</label>
										) : (
											<label>${product.price ? product.price.toFixed(2) : product.price}</label>
										)}
									</FlexContainer>
								)}

								<FlexContainer column>
									<FlexContainer column styles={{ height: '100%' }}>
										<div>
											<ul style={{ marginLeft: '10px' }}>
												{product.facts ? (
													product.facts.split('\n').map((line, index) => {
														return (
															<li key={index} style={{ listStyleType: 'disc' }}>
																{line}
															</li>
														);
													})
												) : (
													product.facts
												)}
											</ul>
										</div>
									</FlexContainer>
								</FlexContainer>
								<Slideshow product={product} show_hide="alt_pictures_hidden" set_image={set_image} />
							</div>
							<div className="details-action">
								<ul>
									{product.name === 'Custom Infinity Mirror' ? (
										<label style={{ margin: 0, marginRight: 5 }}>
											Price: $549.99 - $<i class="fas fa-arrow-up" />
										</label>
									) : (
										<FlexContainer>
											<label style={{ margin: 0, marginRight: 5 }}>Price: </label>
											{product.sale_price !== 0 ? (
												<label>
													<del style={{ color: 'red' }}>
														<label style={{ color: 'white' }}>
															${product.price ? product.price.toFixed(2) : product.price}
														</label>
													</del>{' '}
													<i class="fas fa-arrow-right" /> ${product.sale_price ? product.sale_price.toFixed(2) : product.sale_price}{' '}
													On Sale!
												</label>
											) : (
												<label>
													${product.price ? product.price.toFixed(2) : product.price}
												</label>
											)}
										</FlexContainer>
									)}
									<li>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
									<li>
										<FlexContainer v_i_center styles={{ height: '25px' }}>
											<label
												aria-label="sortOrder"
												htmlFor="sortOrder"
												className="select-label mr-1rem"
											>
												Qty:
											</label>
											<div className="custom-select">
												<select
													defaultValue={qty}
													className="qty_select_dropdown"
													onChange={(e) => {
														setQty(e.target.value);
													}}
												>
													{[ ...Array(product.countInStock).keys() ].map((x) => (
														<option key={x + 1} defaultValue={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</FlexContainer>

										<h4 style={{ marginBottom: 0, marginTop: 11 }}>
											Shipping Calculated at Checkout
										</h4>
									</li>
									{(product.name === 'Diffuser Caps + Adapters Starter Kit' && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Caps:
												</label>
												<div className="custom-select">
													<select
														defaultValue={diffuser_cap_name}
														// value={diffuser_cap_name}
														className="qty_select_dropdown"
														onChange={(e) => set_diffuser_cap(JSON.parse(e.target.value))}
													>
														<option key={1} defaultValue="">
															---Choose Cap---
														</option>
														{original_diffuser_caps.map(
															(cap, index) =>
																cap.name === 'Custom Diffuser Caps Deposit' ||
																cap.name === 'Diffuser Caps + Adapters Starter Kit' ? (
																	''
																) : (
																	<option key={index} value={JSON.stringify(cap)}>
																		{cap.name.slice(0, -14)}
																	</option>
																)
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)) ||
										(product.name === 'Mini Diffuser Caps + Adapters Starter Kit' && (
											<li>
												<div className="ai-c h-25px mb-15px">
													<label
														aria-label="sortOrder"
														htmlFor="sortOrder"
														className="select-label mr-1rem"
													>
														Caps:
													</label>
													{console.log({ diffuser_cap })}
													<div className="custom-select">
														<select
															defaultValue={diffuser_cap_name}
															// value={diffuser_cap_name}
															className="qty_select_dropdown"
															onChange={(e) =>
																set_diffuser_cap(JSON.parse(e.target.value))}
														>
															<option key={1} defaultValue="">
																---Choose Cap---
															</option>
															{mini_diffuser_caps.map(
																(cap, index) =>
																	cap.name === 'Custom Mini Diffuser Caps Deposit' ||
																	cap.name ===
																		'Mini Diffuser Caps + Adapters Starter Kit' ? (
																		''
																	) : (
																		<option key={index} value={JSON.stringify(cap)}>
																			{cap.name.slice(0, -14)}
																		</option>
																	)
															)}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>
										))}
									{(product.category === 'diffuser_caps' ||
										product.category === 'mini_diffuser_caps' ||
										product.category === 'frosted_diffusers') && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Color:
												</label>
												<div className="custom-select">
													<select
														defaultValue={diffuser_cap_color}
														value={diffuser_cap_color}
														className="qty_select_dropdown"
														onChange={(e) => {
															set_diffuser_cap_color(e.target.value);
														}}
													>
														{determine_colors().map((color, index) => (
															<option key={index} value={color}>
																{color}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}
									{(product.name === 'Diffuser Caps + Adapters Starter Kit' ||
										product.name === 'Mini Diffuser Caps + Adapters Starter Kit') &&
									!diffuser_cap ? (
										<div />
									) : product.name === 'Custom Infinity Mirror' ? (
										<Link to="/pages/contact/custom_orders">
											<button className="button primary full-width">Contact</button>
										</Link>
									) : (
										<li>
											{product.countInStock > 0 && !product.hidden ? (
												<button onClick={handleAddToCart} className="button primary">
													Add to Cart
												</button>
											) : (
												<button className="button inactive">Out of Stock</button>
											)}
										</li>
									)}
								</ul>
							</div>
						</div>
						<Slideshow product={product} show_hide="alt_pictures_shown" set_image={set_image} />

						{(product.category === 'diffuser_caps' || product.category === 'mini_diffuser_caps') && (
							<div>
								<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
								<div className="colored_caps">
									<div className="column colored_caps_item">
										<h3 className="colored_caps_images">Colored Caps</h3>
										<img
											// className="m-10px w-100per"
											className="colored_caps_images"
											// style={{ borderRadius: '20px', minWidth: '450px', flexBasis:  }}
											src="/images/optimized_images/product_page_images/img_2298_cropped_optimized.jpg"
											alt="promo"
										/>
									</div>
									<div className="column colored_caps_item">
										<h3 className="colored_caps_images">Colored Caps Under Blacklight</h3>
										<img
											// className="m-10px w-100per"
											className="colored_caps_images"
											// style={{ borderRadius: '20px', minWidth: '450px' }}
											src="/images/optimized_images/product_page_images/img_2331_cropped_optimized.jpg"
											alt="promo"
										/>
									</div>
								</div>
							</div>
						)}

						<FlexContainer column styles={{ padding: '1rem' }}>
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							<p style={{ lineHeight: '30px' }}>{product.description}</p>
							{product.category === 'glowskins' && (
								<a href="/pages/faq#glowskins_chip_brand_compatibility">
									<FlexContainer h_center>
										<button className="button primary" style={{ margin: 'auto' }}>
											Glowskins Microlight Compatibility
										</button>
									</FlexContainer>
								</a>
							)}
							<FlexContainer column>
								<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
								<FlexContainer column styles={{ height: '100%' }}>
									<ul style={{ marginLeft: '10px' }}>
										{product.included_items ? (
											product.included_items.split('\n').map((line, index) => {
												return (
													<li key={index} style={{ listStyleType: 'disc' }}>
														{line}
													</li>
												);
											})
										) : (
											product.included_items
										)}
									</ul>
								</FlexContainer>
							</FlexContainer>

							{!product.video ? (
								<h1
									style={{
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center'
									}}
								>
									Video Coming Soon!
								</h1>
							) : (
								<FlexContainer h_center column styles={{ margin: 0 }}>
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										Watch the Video Below to Learn More
									</h2>
									{/* <video
										className="product_video"
										style={{ height: 'auto', maxWidth: '100%', borderRadius: '20px' }}
										controls
										poster={product.display_image}
									>
										<source src={product.video} type="video/mp4" />
									</video> */}
									<div className="iframe-container">
										<iframe
											width="996"
											height="560"
											style={{ borderRadius: '20px' }}
											src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
								</FlexContainer>
							)}
						</FlexContainer>
						<div className="content-margined">
							<h1
								style={{
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Reviews
							</h1>
							{!product.reviews.length && (
								<div style={{ marginBottom: '10px' }}>Be the First to Review this Product</div>
							)}
							<Reviews product={product} pathname={props.match.params.pathname} />
						</div>
					</FlexContainer>
				)}
			</Loading>
			<RelatedProducts product={product} product_pathname={props.match.params.pathname} />
			{/* <RelatedCarousel
				product={product}
				product_category={product && product.category}
				product_pathname={props.match.params.pathname}
			/> */}
		</FlexContainer>
	);
};
export default ProductPage;
