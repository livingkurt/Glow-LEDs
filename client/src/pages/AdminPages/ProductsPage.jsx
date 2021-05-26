import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { listProducts } from '../../actions/productActions';
import { ProductListItem } from '../../components/SpecialtyComponents';
import { API_Products } from '../../utils';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { sale_price_product_option_switch, sale_price_switch } from '../../utils/react_helper_functions';
import { facebook_catalog_upload, google_catalog_upload } from '../../utils/google_sheets_upload';

function ProductPage(props) {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ loading_upload, set_loading_upload ] = useState(false);
	const [ show_hidden, set_show_hidden ] = useState(false);
	// const [ hide_hidden, set_hide_hidden] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();
	const [ products, updateProducts ] = useState([]);

	const productList = useSelector((state) => state.productList);
	const { loading, products: items, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
		return () => {
			//
		};
	}, []);
	useEffect(
		() => {
			if (items) {
				updateProducts(items);
			}

			return () => {
				//
			};
		},
		[ items ]
	);
	useEffect(
		() => {
			dispatch(listProducts(category.subcategory, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listProducts(category, subcategory, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(category, subcategory, searchKeyword, e.target.value));
	};
	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest', 'Hidden' ];

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const product_items = Array.from(products);
		const [ reorderedItem ] = product_items.splice(result.source.index, 1);
		product_items.splice(result.destination.index, 0, reorderedItem);

		updateProducts(product_items);
	}

	const update_order = () => {
		console.log({ products });
		products.forEach(async (item, index) => {
			const update_product_order = await API_Products.update_product_order(item, index + 1);
			console.log({ update_product_order });
		});
		dispatch(listProducts());
	};
	// const handleOnDragEnd = (result) => {
	// 	if (!result.destination) return;

	// 	const product_items = Array.from(product_items);
	// 	const [ reorderedItem ] = product_items.splice(result.source.index, 1);
	// 	product_items.splice(result.destination.index, 0, reorderedItem);
	// 	console.log({ product_items });
	// 	updateProducts(product_items);
	// 	// product_items.forEach(async (item) => {
	// 	// 	const update_product_order = await API_Products.update_product_order(item);
	// 	// });
	// };

	const colors = [
		{ name: 'Not Category', color: '#333333' },
		{ name: 'Glow Casings', color: '#557b68' },
		{ name: 'Glow Strings', color: '#4b7188' },
		{ name: 'Glowskins', color: '#736084' },
		{ name: 'Mega Diffuser Caps', color: '#4b8882' },
		{ name: 'Frosted Diffusers', color: '#ca9160' },
		{ name: 'Diffuser Caps', color: '#6c7ea9' },
		{ name: 'Accessories', color: '#925757' },
		{ name: 'Exo Diffusers', color: '#4162ad' }
	];

	const determine_color = (product) => {
		let result = '';

		if (product.category === 'glow_casings') {
			result = colors[1].color;
		}
		if (product.category === 'glow_strings') {
			result = colors[2].color;
		}
		if (product.category === 'glowskins') {
			result = colors[3].color;
		}
		if (product.category === 'mega_diffuser_caps') {
			result = colors[4].color;
		}
		if (product.category === 'frosted_diffusers') {
			result = colors[5].color;
		}
		if (product.category === 'diffuser_caps') {
			result = colors[6].color;
		}
		if (product.category === 'accessories') {
			result = colors[7].color;
		}
		if (product.category === 'exo_diffusers') {
			result = colors[8].color;
		}
		if (product.hidden) {
			result = colors[0].color;
		}
		return result;
	};
	const update_product_catelog = async () => {
		set_loading_upload(true);
		await facebook_catalog_upload(products);
		await google_catalog_upload(products);
		set_loading_upload(false);
	};
	const show_hidden_products = () => {
		if (show_hidden) {
			set_show_hidden(false);
		} else if (!show_hidden) {
			set_show_hidden(true);
		}
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Products | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				{colors.map((color) => {
					return (
						<div className="jc-b p-1rem">
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</div>
					);
				})}
				<Link to="/secure/glow/product_display">
					<button className="btn primary">Display Products</button>
				</Link>
				<button className="btn primary" onClick={update_product_catelog}>
					Update Product Catalog
				</button>
				<Link to="/secure/glow/editproduct">
					<button className="btn primary">Create Product</button>
				</Link>
				<button className="btn primary" onClick={show_hidden_products}>
					{!show_hidden ? 'Show' : 'Hide'} Hidden Products
				</button>
				<button className="btn primary" onClick={update_order}>
					Update Order
				</button>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Products</h1>
			</div>
			<Loading loading={loading_upload} error={error} />
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<div className="ai-c mt-10px">
				<div className="w-500px">Product Name</div>
				<div className="w-100px">Hidden</div>
				<div className="w-200px">Category</div>
				<div className="w-120px">Order</div>
				<div className="w-500px">Price</div>
				<div className="w-100px">Actions</div>
			</div>
			{show_hidden && (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="products">
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef}>
								{products.map((product, index) => {
									return (
										<Draggable key={product._id} draggableId={product._id} index={index}>
											{(provided) => (
												<li
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{/* <div className="products-thumb">
														<img src={images[0]} height="100px" alt={`${name} Thumb`} />
													</div>
													<p>{name}</p> */}
													<ProductListItem
														size="50px"
														product={product}
														admin={true}
														determine_color={determine_color}
													/>
												</li>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			)}
			{!show_hidden && (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="products">
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef}>
								{products.filter((product) => !product.hidden).map((product, index) => {
									return (
										<Draggable key={product._id} draggableId={product._id} index={index}>
											{(provided) => (
												<li
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{/* <div className="products-thumb">
														<img src={images[0]} height="100px" alt={`${name} Thumb`} />
													</div>
													<p>{name}</p> */}
													<ProductListItem
														size="50px"
														product={product}
														admin={true}
														determine_color={determine_color}
													/>
												</li>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			)}
		</div>
	);
}

export default ProductPage;
