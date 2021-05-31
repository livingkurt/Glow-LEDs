import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { sale_price_product_option_switch, sale_price_switch } from '../../utils/react_helper_functions';
import { API_Products } from '../../utils';
import { facebook_catalog_upload, google_catalog_upload } from '../../utils/google_sheets_upload';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ProductsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ loading_upload, set_loading_upload ] = useState(false);
	const [ show_hidden, set_show_hidden ] = useState(false);
	// const [ hide_hidden, set_hide_hidden] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listProducts());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (product) => {
		console.log(product._id);
		dispatch(deleteProduct(product._id));
	};

	// const get_shown_products = () => {
	// 	const { data } = API_Products.get_shown_products();

	// };
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
		if (!product.category) {
			result = colors[0].color;
		}
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
		return result;
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
			</div>

			{/* <label htmlFor="show_hidden">Show Hidden</label>
			<input
				type="checkbox"
				name="show_hidden"
				defaultChecked={show_hidden}
				id="show_hidden"
				onChange={(e) => set_show_hidden(e.target.value)}
			/> */}

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Products</h1>
				{/* <Link to="/editproduct">
					<button className="btn primary" >
						Create Product
					</button>
				</Link> */}
			</div>
			{/* {products && ( */}

			{/* )} */}
			<Loading loading={loading_upload} error={error} />
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error} />
			<DragDropContext>
				<Droppable droppableId="products">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{products.map(({ id, name, images }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div className="products-thumb">
													<img src={images[0]} height="100px" alt={`${name} Thumb`} />
												</div>
												<p>{name}</p>
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
		</div>
	);
};
export default ProductsPage;