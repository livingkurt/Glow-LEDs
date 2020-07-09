import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, detailsProduct } from '../actions/productActions';
import { FlexContainer } from '../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';

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

	const history = useHistory();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();
	const product_id = props.match.params.id ? props.match.params.id : '';

	// console.log({ ID: props.match.params.id })

	useEffect(() => {
		dispatch(detailsProduct(product_id));
		if (props.match.params.id) {
			// console.log({ product })
			setId(product._id);
			setName(product.name);
			setPrice(product.price);
			setDescription(product.description);
			setFacts(product.facts);
			setIncludedItems(product.included_items);
			setHidden(product.hidden);
			setDisplayImage(product.display_image);
			setVideo(product.video);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
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
		}
		return () => {};
	}, []);

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
				hidden
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
		if (id) {
			history.push('/product/' + id);
		} else {
			history.push('/products');
		}
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{product_id ? 'Edit Product' : 'Create Product'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{loading ? (
						<FlexContainer h_center column>
							<h2 style={{ textAlign: 'center' }}>Loading...</h2>
						</FlexContainer>
					) : error ? (
						<FlexContainer h_center>
							<h3>{error} </h3>
						</FlexContainer>
					) : (
						<ul className="form-container" style={{ maxWidth: '64rem', marginBottom: '20px' }}>
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
								</FlexContainer>
							</FlexContainer>
							<li>
								<button type="submit" className="button primary">
									{id ? 'Update' : 'Create'}
								</button>
							</li>
							<li>
								{id ? (
									<Link to={'/product/' + props.match.params.id}>
										<button style={{ width: '100%' }} type="button" className="button secondary">
											Back to Product
										</button>
									</Link>
								) : (
									<Link to="/products">
										<button style={{ width: '100%' }} type="button" className="button secondary">
											Back to Products
										</button>
									</Link>
								)}
							</li>
						</ul>
					)}
				</form>
			</div>
		</div>
	);
};
export default EditProductPage;
