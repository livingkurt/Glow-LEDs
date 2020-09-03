import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, listProducts } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Rating, Reviews, Slideshow, RelatedProducts } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import Cookie from 'js-cookie';
import MetaTags from 'react-meta-tags';
import API from '../../utils/API';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const [ diffuser_caps, set_diffuser_caps ] = useState([]);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;

	const diffuser_cap_cookie = Cookie.getJSON('diffuser_cap');

	// const productList = useSelector((state) => state.productList);
	// const { products, loading: loading_products, error: error_products } = productList;
	// console.log({ products });

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.pathname));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
		// dispatch(listProducts(''));
		get_diffuser_caps();
		// if (diffuser_cap_cookie) {
		// 	set_diffuser_cap(diffuser_cap_cookie);
		// 	console.log({ diffuser_cap_cookie });
		// }
	}, []);

	const get_diffuser_caps = async () => {
		const { data } = await API.get_diffuser_caps();
		console.log(data);
		set_diffuser_caps(data);
	};

	useEffect(
		() => {
			if (error) {
				props.history.push('/collections/all/products');
			}
		},
		[ error ]
	);

	const handleAddToCart = () => {
		console.log({ diffuser_cap });
		if (diffuser_cap) {
			Cookie.set('diffuser_cap', diffuser_cap);
		}
		props.history.push('/checkout/cart/' + props.match.params.pathname + '?qty=' + qty);
	};

	return (
		<FlexContainer column>
			<div className="back-to-result">
				<FlexContainer h_between>
					<FlexContainer styles={{ marginBottom: 10 }}>
						<Link to="/collections/all/products">
							<button class="button secondary">Back to Products</button>
						</Link>
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
						<MetaTags>
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
							<meta property="og:image" content={'https://www.glow-leds.com' + product.display_image} />

							<meta
								property="og:image:secure_url"
								content={'https://www.glow-leds.com' + product.display_image}
							/>
							<meta name="twitter:image" content={'https://www.glow-leds.com' + product.display_image} />
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
						</MetaTags>
						<div className="details">
							<FlexContainer column>
								<h1 class="product_title_top" style={{ display: 'none' }}>
									{product.name}
								</h1>
								<div className="details-image">
									<img
										id="expandedImg"
										alt=""
										className="details-image-img"
										src={product.display_image}
										style={{ maxWidth: '400px', maxHeight: '400px', height: '100%', width: '100%' }}
									/>
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
								<Slideshow product={product} show_hide="alt_pictures_hidden" />
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
									{product.name === 'Diffuser Caps + Adapters Starter Kit' && (
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
														defaultValue={diffuser_cap}
														value={diffuser_cap}
														className="qty_select_dropdown"
														onChange={(e) => {
															set_diffuser_cap(e.target.value);
														}}
													>
														<option key={1} defaultValue="">
															---Choose Cap---
														</option>
														{diffuser_caps.map(
															(cap, index) =>
																cap.name === 'Custom Diffuser Caps Deposit' ? (
																	''
																) : (
																	<option
																		key={index}
																		value={JSON.stringify(cap)}
																		// data-value={{ ...cap }}
																	>
																		{cap.name.slice(0, -14)}
																	</option>
																)
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}
									{product.name === 'Diffuser Caps + Adapters Starter Kit' && !diffuser_cap ? (
										<div />
									) : product.name === 'Custom Infinity Mirror' ? (
										<Link to="/pages/contact/custom_orders">
											<button className="button primary full-width">Contact</button>
										</Link>
									) : (
										<li>
											{product.countInStock > 0 ? (
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
						<Slideshow product={product} show_hide="alt_pictures_shown" />

						<FlexContainer column styles={{ padding: '1rem' }}>
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							<p style={{ lineHeight: '30px' }}>{product.description}</p>
							{/* <FlexContainer h_center>
							<img
								src="/gifs/product_gifs/BTSM/BTSM.gif"
								style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
								alt="loading"
							/>
						</FlexContainer> */}
							{/* {product.category === 'caps' && (
								// <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>Patent Pending</h1>
								<img
									src="/images/optimized_images/logo_images/patent_pending.png"
									alt="patent pending"
								/>
							)} */}
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
											src={`${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
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
							<Reviews product={product} product_id={props.match.params.pathname} />
						</div>
					</FlexContainer>
				)}
			</Loading>
			<RelatedProducts product={product} product_pathname={props.match.params.pathname} />
		</FlexContainer>
	);
};
export default ProductPage;
