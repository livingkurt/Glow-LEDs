import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, imagesProduct } from '../actions/productActions';
import { Title, Slideshow, ButtonSymbol, Label, ButtonWord } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';
import API from '../utils/API';

function ProductPage(props) {
	const userLogin = useSelector((state) => state.userLogin);

	// const [ images_state, set_images_state ] = useState([]);

	// const get_images = async () => {
	// 	try {
	// 		const res = await API.get_images('/images/optimized_images/product_images/Custom_Infinity_Mirrors');
	// 		// set_images_state(res.data);
	// 		// console.log(res.data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	let { userInfo } = userLogin;
	// console.log(userInfo);
	const [ qty, setQty ] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id));
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;

		// if (!loading) {
		// 	console.log(product.display_image);
		// 	console.log(product);
		// 	// dispatch(imagesProduct(product.display_image));
		// }

		// get_images();
	}, []);

	useEffect(
		() => {
			if (product) {
				// console.log(product.display_image);
				// console.log(product);
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

	function change_image(e) {
		console.log(e.target.src);
		var expandImg = document.getElementById('expandedImg');
		expandImg.src = e.target.src;
		// expandImg.setAttribute("src", [imgs.src])
		expandImg.parentElement.style.display = 'block';
	}

	return (
		<div>
			<div className="back-to-result">
				<FlexContainer h_between>
					<Link to="/allproducts">
						<Title class="back_button" styles={{ fontSize: '2rem' }}>
							Back to Results
						</Title>
					</Link>
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
				<div>
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
									src={loadingImages ? 'Loading...' : errorImages ? { errorImages } : images[0]}
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
								<div className="details-image">
									{loadingImages ? (
										''
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
							</FlexContainer>
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
					<div>
						<FlexContainer column styles={{ padding: '1rem' }}>
							<Title styles={{ fontSize: 20, margin: 0, marginRight: 5 }}> Description: </Title>
							<p>{product.description}</p>

							{!product.video ? (
								<Title
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
									>
										<source src={product.video} type="video/mp4" />
									</video>
								</FlexContainer>
							)}
							{/* <Title styles={{ fontSize: 30, textAlign: "center", width: "100%" }} >{product.name}</Title> */}
						</FlexContainer>
					</div>
				</div>
			)}
		</div>
	);
}
export default ProductPage;
