import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, detailsProduct, deleteProductReview } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date_display } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditProductPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const [ id, setId ] = useState('');
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ display_image, setDisplayImage ] = useState('');
	const [ video, setVideo ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ countInStock, setCountInStock ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ facts, setFacts ] = useState('');
	const [ included_items, setIncludedItems ] = useState('');
	const [ hidden, setHidden ] = useState();
	const [ sale_price, setSalePrice ] = useState();
	const [ volume, setVolume ] = useState();
	const [ pathname, setPathname ] = useState();

	const history = useHistory();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

	const productReviewDelete = useSelector((state) => state.productReviewDelete);
	const { success: productDeleteSuccess } = productReviewDelete;

	const dispatch = useDispatch();
	const product_pathname = props.match.params.pathname ? props.match.params.pathname : '';

	console.log({ product });

	// console.log({ ID: props.match.params.id })

	useEffect(
		() => {
			dispatch(detailsProduct(product_pathname));
			if (props.match.params.pathname) {
				// console.log({ product })
				setId(product._id);
				setName(product.name);
				setPrice(product.price);
				setDescription(product.description);
				setFacts(product.facts);
				setIncludedItems(product.included_items);
				setHidden(product.hidden);
				setSalePrice(product.sale_price);
				setVolume(product.volume);
				setDisplayImage(product.display_image);
				setVideo(product.video);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setPathname(product.pathname);
			} else {
				setId('');
				setName('');
				setPrice('');
				setDescription('');
				setFacts('');
				setIncludedItems('');
				setDisplayImage('');
				setVideo('');
				setBrand('');
				setCategory('');
				setCountInStock('');
				setHidden();
				setSalePrice('');
				setVolume('');
				setPathname('');
			}
			return () => {};
		},
		[ productDeleteSuccess ]
	);

	// useEffect(
	// 	() => {
	// 		setId(product._id);
	// 		setName(product.name);
	// 		setPrice(product.price);
	// 		setDescription(product.description);
	// 		setFacts(product.facts);
	// 		setIncludedItems(product.included_items);
	// 		setDisplayImage(product.display_image);
	// 		setVideo(product.video);
	// 		setBrand(product.brand);
	// 		setCategory(product.category);
	// 		setCountInStock(product.countInStock);
	// 		return () => {
	// 			//
	// 		};
	// 	},
	// 	[ successSave, successDelete ]
	// );

	const submitHandler = (e) => {
		console.log({ hidden });
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: id,
				name,
				price,
				display_image,
				video,
				brand,
				category,
				countInStock,
				facts,
				included_items,
				description,
				hidden,
				sale_price,
				volume,
				pathname
			})
		);
		e.target.reset();
		setId('');
		setName('');
		setPrice('');
		setDescription('');
		setFacts('');
		setIncludedItems('');
		setDisplayImage('');
		setVideo('');
		setBrand('');
		setCategory('');
		setCountInStock('');
		setHidden();
		setSalePrice('');
		setVolume('');
		setPathname('');
		if (pathname) {
			history.push('/collections/all/products/' + pathname);
		} else {
			history.push('/secure/glow/products');
		}
	};

	const delete_review = (review_id) => {
		console.log({ review_id, id });
		dispatch(deleteProductReview(id, review_id));
	};

	return (
		<div class="main_container">
			<MetaTags>
				<title>Edit {product.name} | Glow LEDs</title>
				{/* <link rel="canonical" href="https://www.glow-leds.com/pages/contact" /> */}
				{/* <meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/> */}
				{/* <meta property="og:title" content="Products | Glow LEDs" /> */}
				{/* <meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
				{/* <meta property="og:url" content="https://www.glow-leds.com" /> */}

				{/* <meta name="twitter:title" content="Products | Glow LEDs" /> */}
				{/* <meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/> */}
			</MetaTags>
			<h1 style={{ textAlign: 'center' }}>{product_pathname ? 'Edit Product' : 'Create Product'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{product && (
							<ul className="edit-form-container" style={{ maxWidth: '64rem', marginBottom: '20px' }}>
								<h1
									style={{
										textAlign: 'center',
										width: '100%',
										marginRight: 'auto',
										justifyContent: 'center'
									}}
								>
									{loading ? 'Product' : product.name}
								</h1>

								<FlexContainer row>
									<FlexContainer column styles={{ width: '50%', marginRight: '10px' }}>
										<li>
											<label htmlFor="name">Name</label>
											<input
												type="text"
												name="name"
												value={name}
												id="name"
												onChange={(e) => setName(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="price">Price</label>
											<input
												type="text"
												name="price"
												value={price}
												id="price"
												onChange={(e) => setPrice(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="sale_price">Sale Price</label>
											<input
												type="text"
												name="sale_price"
												value={sale_price}
												id="sale_price"
												onChange={(e) => setSalePrice(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="volume">Product Volume</label>
											<input
												type="text"
												name="volume"
												value={volume}
												id="volume"
												onChange={(e) => setVolume(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="name">Category</label>
											<input
												type="text"
												name="category"
												value={category}
												id="category"
												onChange={(e) => setCategory(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="brand">Brand</label>
											<input
												type="text"
												name="brand"
												value={brand}
												id="brand"
												onChange={(e) => setBrand(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="display_image">Display Image</label>
											<input
												type="text"
												name="display_image"
												value={display_image}
												id="display_image"
												onChange={(e) => setDisplayImage(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="video">Video</label>
											<input
												type="text"
												name="video"
												defaultValue={video}
												id="video"
												onChange={(e) => setVideo(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="countInStock">Count In Stock</label>
											<input
												type="text"
												name="countInStock"
												value={countInStock}
												id="countInStock"
												onChange={(e) => setCountInStock(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="hidden">Hide Product</label>
											<input
												type="checkbox"
												name="hidden"
												// defaultChecked={hidden ? 'checked' : 'unchecked'}
												// defaultValue={hidden}
												defaultChecked={hidden}
												// value={hidden ? '1' : '0'}
												id="hidden"
												onChange={(e) => {
													setHidden(e.target.checked);
												}}
											/>
										</li>
									</FlexContainer>
									<FlexContainer column styles={{ width: '50%', marginLeft: '10px' }}>
										<li>
											<label htmlFor="facts">Facts</label>
											<textarea
												className="edit_product_textarea"
												name="facts"
												defaultValue={facts}
												id="facts"
												onChange={(e) => setFacts(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="included_items">Included Items</label>
											<textarea
												className="edit_product_textarea"
												name="included_items"
												defaultValue={included_items}
												id="included_items"
												onChange={(e) => setIncludedItems(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="description">Description</label>
											<textarea
												className="edit_product_textarea"
												name="description"
												value={description}
												id="description"
												onChange={(e) => setDescription(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="pathname">Pathname</label>
											<input
												type="text"
												name="pathname"
												defaultValue={pathname}
												id="pathname"
												onChange={(e) => setPathname(e.target.value)}
											/>
										</li>
									</FlexContainer>
								</FlexContainer>
								<li>
									<button type="submit" className="button primary">
										{id ? 'Update' : 'Create'}
									</button>
								</li>
								<li>
									{id ? (
										<Link to={'/collections/all/products/' + props.match.params.pathname}>
											<button
												style={{ width: '100%' }}
												type="button"
												className="button secondary"
											>
												Back to Product
											</button>
										</Link>
									) : (
										<Link to="/secure/glow/products">
											<button
												style={{ width: '100%' }}
												type="button"
												className="button secondary"
											>
												Back to Products
											</button>
										</Link>
									)}
								</li>
								{/* <li> */}
								{/* {product.reviews.map((review) => {
									return (
										<li
											key={review._id}
											style={{
												listStyleType: 'none',
												background: '#616161',
												padding: '5px',
												borderRadius: '15px',
												boxShadow:
													'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
											}}
										>
											<div>
												<div>{review.name}</div>
												<div>
													<Rating value={review.rating} />
												</div>
												<div>{format_date_display(review.createdAt.substring(0, 10))}</div>
												<div>{review.comment}</div>
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
													onClick={() => delete_review(review._id)}
												>
													X
												</button>
											</div>
										</li>
									);
								})} */}
								{/* </li> */}
							</ul>
						)}
					</Loading>
				</form>
			</div>
		</div>
	);
};
export default EditProductPage;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { saveProduct, detailsProduct, deleteProductReview } from '../actions/productActions';
// import { FlexContainer } from '../components/ContainerComponents';
// import { Link, useHistory } from 'react-router-dom';
// import { Loading } from '../components/UtilityComponents';
// import { Rating } from '../components/SpecialtyComponents';
// import { format_date_display } from '../utils/helper_functions';

// const EditProductPage = (props) => {
// 	// const [modalVisible, setModalVisible] = useState(false);
// 	const [ id, setId ] = useState('');
// 	const [ name, setName ] = useState('');
// 	const [ price, setPrice ] = useState('');
// 	const [ display_image, setDisplayImage ] = useState('');
// 	const [ video, setVideo ] = useState('');
// 	const [ brand, setBrand ] = useState('');
// 	const [ category, setCategory ] = useState('');
// 	const [ countInStock, setCountInStock ] = useState('');
// 	const [ description, setDescription ] = useState('');
// 	const [ facts, setFacts ] = useState('');
// 	const [ included_items, setIncludedItems ] = useState('');
// 	const [ hidden, setHidden ] = useState();
// 	const [ sale_price, setSalePrice ] = useState();
// 	const [ volume, setVolume ] = useState();
// 	const [ pathname, setPathname ] = useState();

// 	const history = useHistory();

// 	const productDetails = useSelector((state) => state.productDetails);
// 	const { product, loading, error } = productDetails;

// 	const productSave = useSelector((state) => state.productSave);
// 	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

// 	const productDelete = useSelector((state) => state.productDelete);
// 	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

// 	const productReviewDelete = useSelector((state) => state.productReviewDelete);
// 	const { success: productDeleteSuccess } = productReviewDelete;

// 	const dispatch = useDispatch();
// 	const product_id = props.match.params.id ? props.match.params.id : '';

// 	console.log({ product });

// 	// console.log({ ID: props.match.params.id })

// 	useEffect(
// 		() => {
// 			dispatch(detailsProduct(product_id));
// 			if (props.match.params.id) {
// 				// console.log({ product })
// 				setId(product._id);
// 				setName(product.name);
// 				setPrice(product.price);
// 				setDescription(product.description);
// 				setFacts(product.facts);
// 				setIncludedItems(product.included_items);
// 				setHidden(product.hidden);
// 				setSalePrice(product.sale_price);
// 				setVolume(product.volume);
// 				setDisplayImage(product.display_image);
// 				setVideo(product.video);
// 				setBrand(product.brand);
// 				setCategory(product.category);
// 				setCountInStock(product.countInStock);
// 				setPathname(product.pathname);
// 			} else {
// 				setId('');
// 				setName('');
// 				setPrice('');
// 				setDescription('');
// 				setFacts('');
// 				setIncludedItems('');
// 				setDisplayImage('');
// 				setVideo('');
// 				setBrand('');
// 				setCategory('');
// 				setCountInStock('');
// 				setHidden();
// 				setSalePrice('');
// 				setVolume('');
// 				setPathname('');
// 			}
// 			return () => {};
// 		},
// 		[ productDeleteSuccess ]
// 	);

// 	// useEffect(
// 	// 	() => {
// 	// 		setId(product._id);
// 	// 		setName(product.name);
// 	// 		setPrice(product.price);
// 	// 		setDescription(product.description);
// 	// 		setFacts(product.facts);
// 	// 		setIncludedItems(product.included_items);
// 	// 		setDisplayImage(product.display_image);
// 	// 		setVideo(product.video);
// 	// 		setBrand(product.brand);
// 	// 		setCategory(product.category);
// 	// 		setCountInStock(product.countInStock);
// 	// 		return () => {
// 	// 			//
// 	// 		};
// 	// 	},
// 	// 	[ successSave, successDelete ]
// 	// );

// 	const submitHandler = (e) => {
// 		console.log({ hidden });
// 		e.preventDefault();
// 		dispatch(
// 			saveProduct({
// 				_id: id,
// 				name,
// 				price,
// 				display_image,
// 				video,
// 				brand,
// 				category,
// 				countInStock,
// 				facts,
// 				included_items,
// 				description,
// 				hidden,
// 				sale_price,
// 				volume,
// 				pathname
// 			})
// 		);
// 		e.target.reset();
// 		setId('');
// 		setName('');
// 		setPrice('');
// 		setDescription('');
// 		setFacts('');
// 		setIncludedItems('');
// 		setDisplayImage('');
// 		setVideo('');
// 		setBrand('');
// 		setCategory('');
// 		setCountInStock('');
// 		setHidden();
// 		setSalePrice('');
// 		setVolume('');
// 		setPathname('');
// 		if (id) {
// 			history.push('/product/' + id);
// 		} else {
// 			history.push('/products');
// 		}
// 	};

// 	const delete_review = (review_id) => {
// 		console.log({ review_id, id });
// 		dispatch(deleteProductReview(id, review_id));
// 	};

// 	return (
// 		<div class="main_container">
// 			<h1 style={{ textAlign: 'center' }}>{product_id ? 'Edit Product' : 'Create Product'}</h1>

// 			<div className="form">
// 				<form onSubmit={submitHandler} style={{ width: '100%' }}>
// 					<Loading loading={loading} error={error}>
// 						{product && (
// 							<ul className="edit-form-container" style={{ maxWidth: '64rem', marginBottom: '20px' }}>
// 								<h1
// 									style={{
// 										textAlign: 'center',
// 										width: '100%',
// 										marginRight: 'auto',
// 										justifyContent: 'center'
// 									}}
// 								>
// 									{loading ? 'Product' : product.name}
// 								</h1>

// 								<FlexContainer row>
// 									<FlexContainer column styles={{ width: '50%', marginRight: '10px' }}>
// 										<li>
// 											<label htmlFor="name">Name</label>
// 											<input
// 												type="text"
// 												name="name"
// 												value={name}
// 												id="name"
// 												onChange={(e) => setName(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="price">Price</label>
// 											<input
// 												type="text"
// 												name="price"
// 												value={price}
// 												id="price"
// 												onChange={(e) => setPrice(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="sale_price">Sale Price</label>
// 											<input
// 												type="text"
// 												name="sale_price"
// 												value={sale_price}
// 												id="sale_price"
// 												onChange={(e) => setSalePrice(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="volume">Product Volume</label>
// 											<input
// 												type="text"
// 												name="volume"
// 												value={volume}
// 												id="volume"
// 												onChange={(e) => setVolume(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="name">Category</label>
// 											<input
// 												type="text"
// 												name="category"
// 												value={category}
// 												id="category"
// 												onChange={(e) => setCategory(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="brand">Brand</label>
// 											<input
// 												type="text"
// 												name="brand"
// 												value={brand}
// 												id="brand"
// 												onChange={(e) => setBrand(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="display_image">Display Image</label>
// 											<input
// 												type="text"
// 												name="display_image"
// 												value={display_image}
// 												id="display_image"
// 												onChange={(e) => setDisplayImage(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="video">Video</label>
// 											<input
// 												type="text"
// 												name="video"
// 												defaultValue={video}
// 												id="video"
// 												onChange={(e) => setVideo(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="countInStock">Count In Stock</label>
// 											<input
// 												type="text"
// 												name="countInStock"
// 												value={countInStock}
// 												id="countInStock"
// 												onChange={(e) => setCountInStock(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="hidden">Hide Product</label>
// 											<input
// 												type="checkbox"
// 												name="hidden"
// 												// defaultChecked={hidden ? 'checked' : 'unchecked'}
// 												// defaultValue={hidden}
// 												defaultChecked={hidden}
// 												// value={hidden ? '1' : '0'}
// 												id="hidden"
// 												onChange={(e) => {
// 													setHidden(e.target.checked);
// 												}}
// 											/>
// 										</li>
// 									</FlexContainer>
// 									<FlexContainer column styles={{ width: '50%', marginLeft: '10px' }}>
// 										<li>
// 											<label htmlFor="facts">Facts</label>
// 											<textarea
// 												className="edit_product_textarea"
// 												name="facts"
// 												defaultValue={facts}
// 												id="facts"
// 												onChange={(e) => setFacts(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="included_items">Included Items</label>
// 											<textarea
// 												className="edit_product_textarea"
// 												name="included_items"
// 												defaultValue={included_items}
// 												id="included_items"
// 												onChange={(e) => setIncludedItems(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="description">Description</label>
// 											<textarea
// 												className="edit_product_textarea"
// 												name="description"
// 												value={description}
// 												id="description"
// 												onChange={(e) => setDescription(e.target.value)}
// 											/>
// 										</li>
// 										<li>
// 											<label htmlFor="pathname">Pathname</label>
// 											<input
// 												type="text"
// 												name="pathname"
// 												defaultValue={pathname}
// 												id="pathname"
// 												onChange={(e) => setPathname(e.target.value)}
// 											/>
// 										</li>
// 									</FlexContainer>
// 								</FlexContainer>
// 								<li>
// 									<button type="submit" className="button primary">
// 										{id ? 'Update' : 'Create'}
// 									</button>
// 								</li>
// 								<li>
// 									{id ? (
// 										<Link to={'/product/' + props.match.params.id}>
// 											<button
// 												style={{ width: '100%' }}
// 												type="button"
// 												className="button secondary"
// 											>
// 												Back to Product
// 											</button>
// 										</Link>
// 									) : (
// 										<Link to="/products">
// 											<button
// 												style={{ width: '100%' }}
// 												type="button"
// 												className="button secondary"
// 											>
// 												Back to Products
// 											</button>
// 										</Link>
// 									)}
// 								</li>
// 								{/* <li> */}
// 								{/* {product.reviews.map((review) => {
// 									return (
// 										<li
// 											key={review._id}
// 											style={{
// 												listStyleType: 'none',
// 												background: '#616161',
// 												padding: '5px',
// 												borderRadius: '15px',
// 												boxShadow:
// 													'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
// 											}}
// 										>
// 											<div>
// 												<div>{review.name}</div>
// 												<div>
// 													<Rating value={review.rating} />
// 												</div>
// 												<div>{format_date_display(review.createdAt.substring(0, 10))}</div>
// 												<div>{review.comment}</div>
// 												<button
// 													style={{ width: '100%' }}
// 													type="button"
// 													className="button secondary"
// 													onClick={() => delete_review(review._id)}
// 												>
// 													X
// 												</button>
// 											</div>
// 										</li>
// 									);
// 								})} */}
// 								{/* </li> */}
// 							</ul>
// 						)}
// 					</Loading>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default EditProductPage;
