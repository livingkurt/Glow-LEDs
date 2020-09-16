import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, detailsProduct, deleteProductReview } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const EditProductPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const [ id, setId ] = useState('');
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ display_image, setDisplayImage ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');
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
	const [ meta_title, set_meta_title ] = useState();
	const [ meta_description, set_meta_description ] = useState();
	const [ meta_keywords, set_meta_keywords ] = useState();
	const [ length, set_length ] = useState();
	const [ width, set_width ] = useState();
	const [ height, set_height ] = useState();
	const [ weight_pounds, set_weight_pounds ] = useState();
	const [ weight_ounces, set_weight_ounces ] = useState();
	const [ pathname, setPathname ] = useState();
	const [ order, setOrder ] = useState();
	const [ show_message, set_show_message ] = useState('');

	const history = useHistory();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	// const productSave = useSelector((state) => state.productSave);
	// const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	// const productDelete = useSelector((state) => state.productDelete);
	// const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

	const productReviewDelete = useSelector((state) => state.productReviewDelete);
	const { success: productDeleteSuccess } = productReviewDelete;

	const dispatch = useDispatch();
	const product_pathname = props.match.params.pathname ? props.match.params.pathname : '';

	console.log({ product });

	// console.log({ ID: props.match.params.id })

	useEffect(() => {
		if (props.match.params.pathname) {
			console.log('Is ID');
			dispatch(detailsProduct(props.match.params.pathname));
			dispatch(detailsProduct(props.match.params.pathname));
		} else {
			dispatch(detailsProduct(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (product) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ product, productDeleteSuccess ]
	);

	const set_state = () => {
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setFacts(product.facts);
		setIncludedItems(product.included_items);
		setHidden(product.hidden);
		setSalePrice(product.sale_price);
		setVolume(product.volume);
		set_meta_title(product.meta_title);
		set_meta_description(product.meta_description);
		set_meta_keywords(product.meta_keywords);
		set_length(product.length);
		set_width(product.width);
		set_height(product.height);
		set_weight_pounds(product.weight_pounds);
		set_weight_ounces(product.weight_ounces);
		setDisplayImage(product.display_image);
		set_images(product.images);
		// set_image(product.image);
		setVideo(product.video);
		setBrand(product.brand);
		setCategory(product.category);
		setCountInStock(product.countInStock);
		setPathname(product.pathname);
		setOrder(product.order);
	};
	const unset_state = () => {
		setId('');
		setName('');
		setPrice('');
		setDescription('');
		setFacts('');
		setIncludedItems('');
		setDisplayImage([]);
		set_images('');
		set_image('');
		setVideo('');
		setBrand('');
		setCategory('');
		setCountInStock('');
		setHidden();
		setSalePrice('');
		setVolume('');
		set_meta_title('');
		set_meta_description('');
		set_meta_keywords('');
		set_length('');
		set_width('');
		set_height('');
		set_weight_pounds('');
		set_weight_ounces('');
		setPathname('');
		setOrder('');
	};

	const submitHandler = (e) => {
		console.log({ hidden });
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: id,
				name,
				price,
				display_image,
				images,
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
				meta_title,
				meta_description,
				meta_keywords,
				length,
				width,
				height,
				weight_pounds,
				weight_ounces,
				pathname,
				order
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
		set_images([]);
		set_image('');
		setVideo('');
		setBrand('');
		setCategory('');
		setCountInStock('');
		setHidden();
		setSalePrice('');
		setVolume('');
		set_meta_title('');
		set_meta_description('');
		set_meta_keywords('');
		set_length('');
		set_width('');
		set_height('');
		set_weight_pounds('');
		set_weight_ounces('');
		setPathname('');
		setOrder('');
		// if (pathname) {
		// history.push('/collections/all/products/' + pathname);
		// } else {
		history.push('/secure/glow/products');
		// }
	};

	// const delete_review = (review_id) => {
	// 	console.log({ review_id, id });
	// 	dispatch(deleteProductReview(id, review_id));
	// };

	const add_image = (e) => {
		e.preventDefault();
		console.log(image);
		if (image.indexOf(' ')) {
			image.split(' ').map((image) => {
				set_images((images) => [ ...images, image ]);
			});
		} else {
			set_images((images) => [ ...images, image ]);
		}

		set_image('');
	};

	const remove_image = (image_index, e) => {
		e.preventDefault();
		set_images((images) =>
			images.filter((image, index) => {
				return image_index !== index;
			})
		);
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.pathname ? 'Edit Product' : 'Create Product'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{product && (
							<div>
								<MetaTags>
									<title>Edit {product.name} | Glow LEDs</title>
								</MetaTags>

								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
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

									<FlexContainer row wrap h_between>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
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
											{/* <li>
												<label htmlFor="display_image">Display Image</label>
												<input
													type="text"
													name="display_image"
													value={display_image}
													id="display_image"
													onChange={(e) => setDisplayImage(e.target.value)}
												/>
											</li> */}
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
											<li>
												<label htmlFor="image">image</label>
												<input
													type="text"
													name="image"
													value={image}
													id="image"
													onChange={(e) => set_image(e.target.value)}
												/>
												<button className="button primary" onClick={(e) => add_image(e)}>
													Add Image
												</button>
											</li>
										</FlexContainer>

										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
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
										</FlexContainer>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
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
											<li>
												<label htmlFor="order">Order</label>
												<input
													type="text"
													name="order"
													defaultValue={order}
													id="order"
													onChange={(e) => setOrder(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_title">Meta Title</label>
												<input
													type="text"
													name="meta_title"
													value={meta_title}
													id="meta_title"
													onChange={(e) => set_meta_title(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_description">Meta Description</label>
												<textarea
													className="edit_product_textarea"
													name="meta_description"
													value={meta_description}
													id="meta_description"
													onChange={(e) => set_meta_description(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_keywords">Meta Keywords</label>
												<textarea
													className="edit_product_textarea"
													name="meta_keywords"
													value={meta_keywords}
													id="meta_keywords"
													onChange={(e) => set_meta_keywords(e.target.value)}
												/>
											</li>
										</FlexContainer>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="length">Product Length</label>
												<input
													type="text"
													name="length"
													defaultValue={length}
													id="length"
													onChange={(e) => set_length(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="width">Product Width</label>
												<input
													type="text"
													name="width"
													value={width}
													id="width"
													onChange={(e) => set_width(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="height">Product Height</label>
												<input
													type="text"
													name="height"
													value={height}
													id="height"
													onChange={(e) => set_height(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="weight_pounds">Product lbs</label>
												<input
													type="text"
													name="weight_pounds"
													value={weight_pounds}
													id="weight_pounds"
													onChange={(e) => set_weight_pounds(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="weight_ounces">Product oz</label>
												<input
													type="text"
													name="weight_ounces"
													value={weight_ounces}
													id="weight_ounces"
													onChange={(e) => set_weight_ounces(e.target.value)}
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
										</FlexContainer>
									</FlexContainer>
									<div className="row wrap">
										{images &&
											images.map((picture) => {
												return (
													<img
														style={{
															width: '100%',
															height: 'auto',
															maxWidth: '150px',
															maxHeight: '150px',
															borderRadius: '15px',
															marginRight: '10px'
														}}
														className="mv-10px"
														src={picture}
													/>
												);
											})}
									</div>
									{images &&
										images.map((picture, index) => {
											return (
												<div className="promo_code mv-1rem w-100per">
													<button
														className="button icon"
														onClick={(e) => remove_image(index, e)}
													>
														<i className="fas fa-times mr-5px" />
													</button>
													{picture}
												</div>
											);
										})}
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<Link to={'/collections/all/products/' + props.match.params.pathname}>
											<button
												style={{ width: '100%' }}
												type="button"
												className="button secondary"
											>
												Back to Product
											</button>
										</Link>
									</li>
									<li>
										<Link to="/secure/glow/products">
											<button
												style={{ width: '100%' }}
												type="button"
												className="button secondary"
											>
												Back to Products
											</button>
										</Link>
									</li>
								</ul>
							</div>
						)}
					</Loading>
				</form>
			</div>
		</div>
	);
};
export default EditProductPage;
