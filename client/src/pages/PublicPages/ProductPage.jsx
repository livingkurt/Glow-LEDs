import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Rating, Reviews, Slideshow, RelatedProducts } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
// import ReactFilestack from 'filestack-react';
import MetaTags from 'react-meta-tags';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.pathname));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
	}, []);

	const handleAddToCart = () => {
		props.history.push('/checkout/cart/' + props.match.params.pathname + '?qty=' + qty);
	};

	// const finishUploading = async (fsData) => {
	// 	const src = fsData.filesUploaded[0].url;
	// 	console.log(src);
	// };
	// console.log(process.env.REACT_APP_FILESTACK_API);

	return (
		<FlexContainer column>
			<div className="back-to-result">
				<FlexContainer h_between>
					<FlexContainer styles={{ marginBottom: 10 }}>
						<Link to="/collections/all/products">
							<button class="button primary">Back to Products</button>
						</Link>
					</FlexContainer>
					{/* {console.log(props.match.params.pathname)} */}
					{userInfo &&
					userInfo.isAdmin && (
						<Link to={'/secure/glow/editproduct/' + props.match.params.pathname}>
							<button className="button primary" style={{ width: '156px' }}>
								Edit Product
							</button>
						</Link>
					)}
				</FlexContainer>
			</div>
			{/* <img src="https://cdn.filestackcontent.com/47roj3J6SPKXPROCeTok" className="loading_gif" alt="loading" /> */}
			{/* <img src="https://cdn.filestackcontent.com/KMBcTNF6TQWFTHeaHY0S" className="loading_png" alt="loading" /> */}
			{/* <ReactFilestack apikey={'ALVdoogZTRidxhPQF0JBIz'} onSuccess={(res) => console.log(res)} /> */}
			{/* <ReactFilestack
				apikey={process.env.REACT_APP_FILESTACK_API}
				customRender={({ onPick }) => (
					<div>
						<button onClick={onPick}>Upload image</button>
					</div>
				)}
				onSuccess={finishUploading}
			/> */}
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
											Qty: {/* {cartItems.find((item) => item.pathname === product._id)} */}
											<div className="qty_select_dropdown_container">
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
												<i className="fas fa-sort-up icon_styles" />
											</div>
										</FlexContainer>
										<h4 style={{ marginBottom: 0, marginTop: 11 }}>
											Shipping Calculated at Checkout
										</h4>
									</li>
									{product.name === 'Custom Infinity Mirror' ? (
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
