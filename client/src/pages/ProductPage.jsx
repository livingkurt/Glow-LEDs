import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, imagesProduct, saveProductReview } from '../actions/productActions';
import { Title, Slideshow, ButtonSymbol, Label, ButtonWord } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';
import API from '../utils/API';
import { Rating } from '../components/SpecialtyComponents';
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

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
	}, []);

	useEffect(
		() => {
			if (productSaveSuccess) {
				setRating(0);
				setComment('');
				dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
			}
		},
		[ productSaveSuccess ]
	);

	useEffect(
		() => {
			if (product) {
				dispatch(imagesProduct(product.display_image));
			}
			return () => {};
		},
		[ product ]
	);

	const productImages = useSelector((state) => state.productImages);
	const { images, loading: loadingImages, error: errorImages } = productImages;
	console.log({ images });

	const handleAddToCart = () => {
		props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
	};

	const change_image = (e) => {
		console.log(e.target.src);
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
	console.log({ rating });

	return (
		<FlexContainer column>
			<div className="back-to-result">
				<FlexContainer h_between>
					<FlexContainer>
						<Link to="/allproducts">
							<Title class="back_button" styles={{ fontSize: '2rem', margin: '5px' }}>
								Back to Results
							</Title>
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
					<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
					<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
						If pages doesn't show in 5 seconds, refresh the page.
					</Title>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<Title styles={{ fontSize: 20 }}>{error} </Title>
				</FlexContainer>
			) : (
				<FlexContainer column>
					<div className="details">
						<FlexContainer column>
							<Title
								class="product_title_top"
								styles={{ display: 'none', fontSize: '4rem', marginBottom: 20 }}
							>
								{product.name}
							</Title>
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
							<Title
								class="product_title_side"
								styles={{ display: 'flex', fontSize: '3rem', marginBottom: 20 }}
							>
								{product.name}
							</Title>
							<a href="#reviews">
								<Rating value={product.rating} text={product.numReviews + ' reviews'} />
							</a>
							<FlexContainer>
								<Title styles={{ fontSize: '2rem', margin: 0, marginRight: 5 }}>Price: </Title>
								<Label styles={{ fontSize: '2rem' }}>
									${product.price ? product.price.toFixed(2) : product.price}
								</Label>
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
										<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
									</FlexContainer>
								) : errorImages ? (
									<FlexContainer h_center>
										<Title styles={{ fontSize: 20 }}>{errorImages} </Title>
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
								<li>Price: ${product.price ? product.price.toFixed(2) : product.price}</li>
								<li>Status: {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}</li>
								<li>
									Qty:{' '}
									<select
										defaultValue={qty}
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
								<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
							</FlexContainer>
						) : errorImages ? (
							<FlexContainer h_center>
								<Title styles={{ fontSize: 20 }}>{errorImages} </Title>
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
						<Title styles={{ fontSize: 20, margin: 0, marginRight: 5 }}> Description: </Title>
						<p>{product.description}</p>
						<FlexContainer column>
							<Title styles={{ fontSize: 20, margin: 0, marginRight: 5 }}> Included Items: </Title>
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
							<Title
								class="h2_title"
								styles={{
									fontSize: 30,
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Video Coming Soon!
							</Title>
						) : (
							<FlexContainer h_center column>
								<Title
									class="h2_title"
									styles={{
										fontSize: 20,
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center'
									}}
								>
									Watch the Video Below to Learn More
								</Title>
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
						{/* <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >{product.name}</Title> */}
					</FlexContainer>
					<div className="content-margined">
						<Title
							class="h3_title"
							styles={{
								fontSize: 30,
								textAlign: 'center',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							Reviews
						</Title>
						{!product.reviews.length && <div>Be the First to Review this Product</div>}
						<div className="review" id="reviews">
							{product.reviews.map((review) => (
								<li
									key={review._id}
									style={{
										listStyleType: 'none',
										background: 'gray',
										padding: '5px',
										borderRadius: '15px'
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
							<Title
								class="h2_title"
								styles={{
									fontSize: 30,
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Write a customer review
							</Title>

							<li style={{ listStyleType: 'none' }}>
								{userInfo ? (
									<form onSubmit={submitHandler}>
										<div className="form-container">
											<li>
												<Title
													styles={{
														fontSize: 30,
														textAlign: 'center',
														width: '100%',
														justifyContent: 'center'
													}}
												>
													{productSaveSuccess ? 'Review Saved Successfully' : ''}
												</Title>
												<label htmlFor="rating">Rating</label>
												<select
													name="rating"
													id="rating"
													defaultValue={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="5">5 - Excellent </option>
													<option value="4">4 - Very Good</option>
													<option value="3">3 - Good</option>
													<option value="2">2 - Fair</option>
													<option value="1">1 - Poor</option>
												</select>
											</li>
											<li>
												<label htmlFor="comment" id="comment" />
												<textarea
													htmlFor="comment"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												/>
											</li>
											<li>
												<button type="submit" className="button primary">
													Submit
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
		</FlexContainer>
	);
};
export default ProductPage;
