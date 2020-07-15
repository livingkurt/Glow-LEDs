import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, imagesProduct, saveProductReview, listProducts } from '../actions/productActions';
import { FlexContainer } from '../components/ContainerComponents';
import API from '../utils/API';
import { Rating, Product } from '../components/SpecialtyComponents';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { format_date_display } from '../utils/helper_functions';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);

	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();

	const productReviewSave = useSelector((state) => state.productReviewSave);
	const { success: productSaveSuccess } = productReviewSave;

	const productList = useSelector((state) => state.productList);
	const { products, loading: loadingProducts, error: errorProducts } = productList;

	useEffect(
		() => {
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
			dispatch(detailsProduct(props.match.params.id));
			setReviewModal('none');
		},
		[ productSaveSuccess ]
	);

	useEffect(() => {
		dispatch(listProducts(''));
		dispatch(detailsProduct(props.match.params.id));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
		// if (product) {
		// dispatch(imagesProduct(product.display_image));
		// }
	}, []);

	useEffect(
		() => {
			if (product) {
				dispatch(imagesProduct(product.display_image));
			}
			return () => {};
		},
		[ product ]
	);

	useEffect(
		() => {
			dispatch(detailsProduct(props.match.params.id));
			return () => {};
		},
		[ props.match.params.id ]
	);

	const productImages = useSelector((state) => state.productImages);
	const { images, loading: loadingImages, error: errorImages } = productImages;

	const handleAddToCart = () => {
		props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
	};

	const change_image = (e) => {
		var expandImg = document.getElementById('expandedImg');
		expandImg.src = e.target.src;
		expandImg.parentElement.style.display = 'block';
	};

	const [ rating, setRating ] = useState(5);
	const [ comment, setComment ] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveProductReview(props.match.params.id, {
				name: userInfo.name,
				rating: rating,
				comment: comment
			})
		);
	};

	const [ review_modal, setReviewModal ] = useState('none');

	const show_write_review = () => {
		setReviewModal('block');
	};
	const hide_write_review = (e) => {
		e.preventDefault();
		setReviewModal('none');
	};

	const render_related_products = () => {
		console.log({ products });
		console.log({ products: products[0] });
		console.log({ products: products[1] });
		// return products.map((item, index) => {
		// 	console.log({ item });
		// 	if (!item.hidden && item.category && item.category === product.category && item._id !== product._id) {
		// 		return <Product key={index} product={item} styles={{ marginRight: 20, listStyleType: 'none' }} />;
		// 	}
		// 	// item.category === product.category && item._id !== product._id &&
		// });
		// item.category === undefined ? (
		//   <div>Loading...</div>
		// ) : item.category === product.category && item._id !== product._id && !item.hidden ? (
		//   <Product
		//     key={index}
		//     product={item}
		//     styles={{ marginRight: 20, listStyleType: 'none' }}
		//   />
		// ) : (
		//   <div />
		// )

		// {products.map(
		//   (item, index) =>
		//     !item.hidden ? !product.category ? (
		//       <div />
		//     ) : item.category === product.category && item._id !== product._id ? (
		//       <Product
		//         key={index}
		//         product={item}
		//         styles={{ marginRight: 20, listStyleType: 'none' }}
		//       />
		//     ) : (
		//       <div />
		//     ) : (
		//       <div />
		//     )
		// )}
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
			{loading ? (
				<FlexContainer h_center column>
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>{error} </h3>
				</FlexContainer>
			) : (
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
							<div className="details-image alt_pictures_hidden">
								{loadingImages ? (
									<FlexContainer h_center column>
										<img src="loading.gif" className="loading_gif" alt="loading" />
										<img src="loading_overlay.png" className="loading_png" alt="loading" />
									</FlexContainer>
								) : errorImages ? (
									<FlexContainer h_center>
										<h3 style={{ textAlign: 'center' }}>{errorImages} </h3>
									</FlexContainer>
								) : (
									images.map((image, index) => {
										return (
											<div className="column" key={index}>
												<img
													src={image}
													alt=""
													style={{ width: '100%' }}
													onClick={(e) => change_image(e)}
												/>
											</div>
										);
									})
								)}
							</div>
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
									<label>Price: ${product.price ? product.price.toFixed(2) : product.price}</label>
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
									<h4 style={{ marginBottom: 0, marginTop: 11 }}>Shipping Calculated at Checkout</h4>
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
					<div className="details-image alt_pictures_shown">
						{loadingImages ? (
							<FlexContainer h_center column>
								<img src="loading.gif" className="loading_gif" alt="loading" />
								<img src="loading_overlay.png" className="loading_png" alt="loading" />
							</FlexContainer>
						) : errorImages ? (
							<FlexContainer h_center>
								<h3 style={{ textAlign: 'center' }}>{errorImages} </h3>
							</FlexContainer>
						) : (
							images.map((image, index) => {
								return (
									<div className="column" key={index}>
										<img
											src={image}
											alt=""
											style={{ width: '100%' }}
											onClick={(e) => change_image(e)}
										/>
									</div>
								);
							})
						)}
					</div>

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
						<div className="review" id="reviews">
							{product.reviews.map((review) => (
								<li
									key={review._id}
									style={{
										listStyleType: 'none',
										background: '#616161',
										padding: '5px',
										borderRadius: '15px',
										boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
									}}
								>
									<div>{review.name}</div>
									<div>
										<Rating value={review.rating} />
									</div>
									<div>{format_date_display(review.createdAt.substring(0, 10))}</div>
									<div>{review.comment}</div>
								</li>
							))}

							<button className="button primary" onClick={show_write_review}>
								Write a customer review
							</button>

							<li style={{ listStyleType: 'none', display: review_modal }}>
								<h2
									style={{
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center'
									}}
								>
									Write a customer review
								</h2>
								{userInfo ? (
									<form>
										<div className="form-container">
											<li style={{ marginBottom: 0 }}>
												<h3
													style={{
														textAlign: 'center',
														width: '100%',
														justifyContent: 'center',
														marginTop: '-35px'
													}}
												>
													{productSaveSuccess ? 'Review Saved Successfully' : ''}
												</h3>
												<FlexContainer v_i_center>
													<h3 htmlFor="rating">Rating</h3>
													<div className="review_select_dropdown_container">
														<select
															name="rating"
															id="rating"
															className="review_select_dropdown"
															defaultValue={rating}
															onChange={(e) => setRating(e.target.value)}
														>
															<option value="5">5 - Excellent </option>
															<option value="4">4 - Very Good</option>
															<option value="3">3 - Good</option>
															<option value="2">2 - Fair</option>
															<option value="1">1 - Poor</option>
														</select>
														<i className="fas fa-sort-up review_icon_styles" />
													</div>
												</FlexContainer>
											</li>
											<li>
												<label htmlFor="comment" id="comment" />
												<textarea
													htmlFor="comment"
													className="rating_textarea"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												/>
											</li>
											<li>
												<button
													style={{ marginBottom: '10px' }}
													onClick={submitHandler}
													className="button primary"
												>
													Submit
												</button>

												<button onClick={hide_write_review} className="button secondary">
													Cancel
												</button>
											</li>
										</div>
									</form>
								) : (
									<div>
										Please <Link to="/login">Login</Link> to Write a Review
									</div>
								)}
							</li>
						</div>
					</div>
				</FlexContainer>
			)}
			<FlexContainer column styles={{ margin: '0 10px' }}>
				<h1
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Related Products
				</h1>
				{loadingProducts ? (
					<FlexContainer h_center column>
						<img src="loading_overlay.png" className="loading_png" alt="loading" />
						<img src="loading.gif" className="loading_gif" alt="loading" />
						<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
					</FlexContainer>
				) : errorProducts ? (
					<FlexContainer h_center>
						<h3 styles={{ textAlign: 'center' }}>{errorProducts}</h3>
					</FlexContainer>
				) : (
					<FlexContainer row styles={{ overflowX: 'scroll', padding: '10px' }}>
						{products.length > 0 && render_related_products()}
						{/* {products.map(
							(item, index) =>
								!item.hidden ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								)
						)} */}
						{/* {products.map(
							(item, index) =>
								!item.hidden ? !product.category ? (
									<div />
								) : item.category === product.category && item._id !== product._id ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								) : (
									<div />
								)
						)} */}
						{/* {products.map(
							(item, index) => (!item.category ? console.log('Loading') : console.log(item.category))
							item.category === undefined ? (
								<div>Loading...</div>
							) : item.category === product.category && item._id !== product._id && !item.hidden ? (
								<Product
									key={index}
									product={item}
									styles={{ marginRight: 20, listStyleType: 'none' }}
								/>
							) : (
								<div />
							)
						)} */}
						{/* {products.map(
							(item, index) =>
								!item.hidden ? item._id !== product._id ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								) : (
									<div />
								)
						)} */}
					</FlexContainer>
				)}
			</FlexContainer>
		</FlexContainer>
	);
};
export default ProductPage;
