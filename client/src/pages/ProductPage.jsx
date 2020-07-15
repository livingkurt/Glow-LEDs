import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { FlexContainer } from '../components/ContainerComponents';
import { Rating, Reviews, Slideshow, RelatedProducts } from '../components/SpecialtyComponents';
import { Loading } from '../components/UtilityComponents';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
	}, []);

	const handleAddToCart = () => {
		props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
	};

	return (
		<FlexContainer column>
			<div className="back-to-result">
				<FlexContainer h_between>
					<FlexContainer styles={{ marginBottom: 10 }}>
						<Link to="/allproducts">
							<button class="button primary">Back to Results</button>
						</Link>
					</FlexContainer>
					{userInfo &&
					userInfo.isAdmin && (
						<Link to={'/editproduct/' + props.match.params.id}>
							<button className="button primary" style={{ width: '156px' }}>
								Edit Product
							</button>
						</Link>
					)}
				</FlexContainer>
			</div>
			<Loading loading={loading} error={error}>
				{product && (
					<FlexContainer column>
						<div className="details">
							<FlexContainer column>
								<h1 class="product_title_top" style={{ display: 'none' }}>
									{product.name}
								</h1>
								<div className="details-image">
									<img
										id="expandedImg"
										alt=""
										src={product.display_image}
										style={{ maxWidth: '400px', maxHeight: '400px', height: '100%', width: '100%' }}
									/>
								</div>
							</FlexContainer>
							<div className="details-info">
								<h1 class="product_title_side" styles={{ display: 'flex' }}>
									{product.name}
								</h1>
								<div style={{ marginBottom: '15px', marginTop: '-9px' }}>
									<a href="#reviews">
										<Rating value={product.rating} text={product.numReviews + ' reviews'} />
									</a>
								</div>
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
									{product.sale_price !== 0 ? (
										<label>
											Price: {' '}
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
											Price: ${product.price ? product.price.toFixed(2) : product.price}
										</label>
									)}
									<li>Status: {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}</li>
									<li>
										<FlexContainer v_i_center styles={{ height: '25px' }}>
											Qty:{' '}
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
									<li>
										{product.countInStock > 0 && (
											<button onClick={handleAddToCart} className="button primary">
												Add to Cart
											</button>
										)}
									</li>
								</ul>
							</div>
						</div>
						<Slideshow product={product} show_hide="alt_pictures_shown" />

						<FlexContainer column styles={{ padding: '1rem' }}>
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							<p>{product.description}</p>
							{/* <FlexContainer h_center>
							<img
								src="/gifs/product_gifs/BTSM/BTSM.gif"
								style={{ width: '100%', height: 'auto', borderRadius: '20px' }}
								alt="loading"
							/>
						</FlexContainer> */}
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
								<FlexContainer h_center column>
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										Watch the Video Below to Learn More
									</h2>
									<video
										className="product_video"
										style={{ height: 'auto', maxWidth: '100%', borderRadius: '20px' }}
										controls
										poster={product.display_image}
									>
										<source src={product.video} type="video/mp4" />
									</video>
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
							<Reviews product={product} product_id={props.match.params.id} />
						</div>
					</FlexContainer>
				)}
			</Loading>
			<RelatedProducts product={product} product_id={props.match.params.id} />
		</FlexContainer>
	);
};
export default ProductPage;
