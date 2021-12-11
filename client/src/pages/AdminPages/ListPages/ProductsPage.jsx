import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { listProducts } from '../../../actions/productActions';
import { Pagination, ProductListItem } from '../../../components/SpecialtyComponents';
import { API_Products } from '../../../utils';
import { Link, useHistory } from 'react-router-dom';
import { Loading, Notification } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../../components/SpecialtyComponents';
import { facebook_catalog_upload, google_catalog_upload } from '../../../utils/google_sheets_upload';
import {
	mutliDragAwareReorder,
	multiSelectTo as multiSelect,
	update_products_url,
	getUrlParameter
} from '../../../utils/helper_functions';
import memoizeOne from 'memoize-one';

function ProductPage(props) {
	const history = useHistory();
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
	const [ loading_upload, set_loading_upload ] = useState(false);
	const [ show_hidden, set_show_hidden ] = useState(false);
	const [ page, set_page ] = useState(1);
	const [ limit, set_limit ] = useState(20);

	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';

	const dispatch = useDispatch();
	const [ products_list, updateProducts ] = useState([]);

	const productList = useSelector((state) => state.productList);
	const { loading, products: items, totalPages, message, currentPage, error } = productList;

	useEffect(() => {
		let clean = true;
		if (clean) {
			determine_products();
		}
		return () => (clean = false);
	}, []);

	const determine_products = () => {
		const query = getUrlParameter(props.location);
		let category = props.match.params.category ? props.match.params.category : '';
		let subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
		let search = '';
		let sort = '';
		let filter = '';
		let collection = props.match.params.collection ? props.match.params.collection : '';
		let limit = 30;
		let page = '';
		let hidden = true;
		let option = false;

		// prnt({ query });
		if (category !== 'essentials' || category !== 'discounted' || category !== 'best_sellers') {
			if (Object.keys(query).length > 0) {
				if (query.search) {
					set_search(query.search.split('%20').join(' '));
					search = query.search.split('%20').join(' ');
				}
				// if (query.sort) {
				// 	set_sort(query.sort);
				// 	sort = query.sort;
				// }
				// if (query.filter) {
				// 	// console.log({ filter: query.filter, chips_list });
				// 	filter = waitForElement(query.filter, chips_list);
				// }
				if (query.page) {
					set_page(query.page);
					page = query.page;
				}
				if (query.limit) {
					set_limit(query.limit);
				}
			}
			console.log({ category, subcategory, search, sort, filter, collection });
			dispatch(
				listProducts({
					category,
					subcategory,
					filter,
					search,
					sort,
					collection,
					page,
					limit: 30,
					hidden,
					option
				})
			);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listProducts({ category, subcategory, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts({ category, subcategory, search, sort: e.target.value }));
	};
	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest', 'Hidden' ];

	// const update_order = () => {
	// 	set_loading_upload(true);
	// 	console.log({ products: state.entities.products });
	// 	state.entities.products.forEach(async (item, index) => {
	// 		const update_product_order = await API_Products.update_product_order(item, index + 1);
	// 		console.log({ update_product_order });
	// 	});
	// 	dispatch(listProducts());
	// 	set_loading_upload(false);
	// };
	const update_order = async () => {
		set_loading_upload(true);

		const { data } = await API_Products.update_product_order(state);
		// state.entities.columnOrder.map((columnId) => {
		// 	const column = state.entities.columns[columnId];
		// 	console.log({ column });
		// 	// const products = column.product_ids.map((product_id, index) => state.entities.products[index]);
		// 	let products = [];
		// 	state.entities.products.forEach(function(a) {
		// 		products[column.product_ids.indexOf(a._id)] = a;
		// 	});

		// 	console.log({ products });
		// 	products.forEach(async (item, index) => {
		// 		const update_product_order = await API_Products.update_product_order(item, index + 1);
		// 		console.log({ update_product_order });
		// 	});
		// });
		// dispatch(listProducts({}));
		set_loading_upload(false);
	};

	const colors = [
		{ name: 'Not Category', color: '#333333' },
		{ name: 'Glow Casings', color: '#557b68' },
		{ name: 'Glow Strings', color: '#4b7188' },
		{ name: 'Glowskins', color: '#736084' },
		{ name: 'Decals', color: '#6f5aa3' },
		{ name: 'Frosted Diffusers', color: '#ca9160' },
		{ name: 'Diffuser Caps', color: '#6c7ea9' },
		{ name: 'Accessories', color: '#925757' },
		{ name: 'EXO Diffusers', color: '#4162ad' }
	];

	const determine_color = (product, isSelected, isDragging) => {
		let result = '#797979';

		if (product.category === 'glow_casings') {
			result = colors[1].color;
			// if (isSelected) {
			// 	result = '#6a7fad';
			// } else if (isDragging) {
			// 	result = colors[1].color;
			// } else {
			// 	result = '#557b68';
			// }
		}
		if (product.category === 'glow_strings') {
			result = colors[2].color;
		}
		if (product.category === 'glowskins') {
			result = colors[3].color;
		}
		if (product.category === 'decals') {
			result = colors[4].color;
		}
		if (product.category === 'diffusers') {
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
		const { data } = await API_Products.get_all_products();
		console.log({ data });
		await facebook_catalog_upload(data);
		await google_catalog_upload(items);
		set_loading_upload(false);
	};

	const show_hidden_products = () => {
		if (show_hidden) {
			set_show_hidden(false);
		} else if (!show_hidden) {
			set_show_hidden(true);
		}
	};

	const [ state, setState ] = useState({
		entities: {
			products: [],
			columns: {
				'column-1': {
					id: 'column-1',
					title: 'Products',
					product_ids: []
				}
			},
			columnOrder: [ 'column-1' ]
		},
		selectedProductIds: [],
		draggingProductId: null
	});

	useEffect(() => {
		window.addEventListener('click', onWindowClick);
		window.addEventListener('keydown', onWindowKeyDown);
		window.addEventListener('touchend', onWindowTouchEnd);
		// createData();
		return () => {
			window.removeEventListener('click', onWindowClick);
			window.removeEventListener('keydown', onWindowKeyDown);
			window.removeEventListener('touchend', onWindowTouchEnd);
		};
	}, []);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (items) {
					set_state();
				}
			}
			return () => (clean = false);
		},
		[ items ]
	);

	const set_state = () => {
		if (items) {
			console.log({ set_state: items });
			if (items.columns) {
				setState({
					entities: items,
					selectedProductIds: [],
					draggingProductId: null
				});
				if (currentPage) {
					set_page(currentPage);
				}
			} else {
				setState({
					entities: {
						products: items,
						columns: {
							'column-1': {
								id: 'column-1',
								title: 'Products',
								product_ids: items.map((product) => product._id)
							}
						},
						columnOrder: [ 'column-1' ]
					},
					selectedProductIds: [],
					draggingProductId: null
				});
			}
		}
		updateProducts(items);
	};
	const update_page = (e, new_page) => {
		let category = props.match.params.category ? props.match.params.category : '';
		let subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
		let search = '';
		let sort = '';
		let filter = '';
		let collection = props.match.params.collection ? props.match.params.collection : '';
		let limit = 30;
		let hidden = true;
		let option = false;
		console.log({ e, new_page });
		e.preventDefault();
		const page = parseInt(new_page);
		set_page(page);
		update_products_url(history, search, '', '', page);

		console.log(new_page);
		dispatch(
			listProducts({
				category,
				subcategory,
				collection,
				filter,
				search,
				page: new_page,
				limit,
				hidden,
				option,
				sort
			})
		);
	};

	const onDragStart = (start) => {
		// console.log("OnDragStart event started");
		const id = start.draggableId;
		const selected = state.selectedProductIds.find((productId) => productId === id);

		// if dragging an item that is not selected - unselect all items
		if (!selected) {
			unselectAll();
		}
		// console.log("Updating State from onDragStart");
		// set_draggingProductId(start.draggableId);
		// setState(state => {return ...state,draggingProductId: start.draggableId});
		setState((state) => {
			return { ...state, draggingProductId: start.draggableId };
		});
	};

	const onDragEnd = (result) => {
		// console.log("OnDragEnd event started");
		const { destination, source, draggableId } = result;

		if (!destination) {
			// set_draggingProductId(null);
			// setState({
			// 	draggingProductId: null
			// });
			setState((state) => {
				return { ...state, draggingProductId: null };
			});
			return;
		}

		const processed = mutliDragAwareReorder({
			entities: state.entities,
			selectedProductIds: state.selectedProductIds,
			source,
			destination
		});

		console.log('Updating State from onDragEnd');
		// ...processed,
		console.log({ processed });
		// set_entities(processed.entities);
		// set_selectedProductIds(processed.selectedProductIds);
		// set_draggingProductId(null);
		// setState({
		// 	...processed,
		// 	draggingProductId: null
		// });
		setState((state) => {
			return { ...processed, draggingProductId: null };
		});
		updateProducts(processed.entities.products);
		// updateProducts(state.entities);
	};

	// function handleOnDragEnd(result) {
	// 	if (!result.destination) return;

	// 	const product_items = Array.from(products);
	// 	const [ reorderedItem ] = product_items.splice(result.source.index, 1);
	// 	product_items.splice(result.destination.index, 0, reorderedItem);

	// 	updateProducts(product_items);
	// }

	const onWindowKeyDown = (event) => {
		if (event.defaultPrevented) {
			return;
		}

		if (event.key === 'Escape') {
			unselectAll();
		}
	};

	const onWindowClick = (event) => {
		console.log({ event });
		if (event.defaultPrevented) {
			return;
		}
		unselectAll();
	};

	const onWindowTouchEnd = (event) => {
		if (event.defaultPrevented) {
			return;
		}
		unselectAll();
	};

	const toggleSelection = (productId) => {
		const selectedProductIds = state.selectedProductIds;
		// console.log({ selectedProductIds });
		const wasSelected = selectedProductIds.includes(productId);

		const newProductIds = (() => {
			// Product was not previously selected
			// now will be the only selected item
			if (!wasSelected) {
				return [ productId ];
			}

			// Product was part of a selected group
			// will now become the only selected item
			if (selectedProductIds.length > 1) {
				return [ productId ];
			}

			// product was previously selected but not in a group
			// we will now clear the selection
			return [];
		})();
		// console.log("Updating state from toggleSelection");
		// set_selectedProductIds(newProductIds);
		// setState({
		// 	selectedProductIds: newProductIds
		// });
		setState((state) => {
			return { ...state, selectedProductIds: newProductIds };
		});
	};

	const toggleSelectionInGroup = (productId) => {
		const selectedProductIds = state.selectedProductIds;
		const index = selectedProductIds.indexOf(productId);

		// if not selected - add it to the selected items
		if (index === -1) {
			// console.log(
			//   "Updating State from toggleSelectioninGroup for index === -1"
			// );
			// set_selectedProductIds([ ...selectedProductIds, productId ]);
			// setState({
			// 	selectedProductIds: [ ...selectedProductIds, productId ]
			// });
			setState((state) => {
				return { ...state, selectedProductIds: [ ...selectedProductIds, productId ] };
			});
			return;
		}

		// it was previously selected and now needs to be removed from the group
		const shallow = [ ...selectedProductIds ];
		shallow.splice(index, 1);
		// console.log("Updating State from toggleSelectioninGroup shallow");
		// set_selectedProductIds(shallow);
		// setState({
		// 	selectedProductIds: shallow
		// });

		setState((state) => {
			return { ...state, selectedProductIds: shallow };
		});
	};

	// This behaviour matches the MacOSX finder selection
	const multiSelectTo = (newProductId) => {
		const updated = multiSelect(state.entities, state.selectedProductIds, newProductId);

		console.log({ updated });

		if (updated == null) {
			return;
		}

		// console.log("Updating State from multiSelectTo");
		// set_selectedProductIds(updated);
		// setState({
		// 	selectedProductIds: updated
		// });

		setState((state) => {
			return { ...state, selectedProductIds: updated };
		});
	};

	const unselect = () => {
		unselectAll();
	};

	const unselectAll = () => {
		// console.log("Updating State from unselectAll");
		// set_selectedProductIds([]);
		// setState({
		// 	selectedProductIds: []
		// });
		setState((state) => {
			return { ...state, selectedProductIds: [] };
		});
	};
	// console.log({ selectionCount: state.selectedProductIds.length });

	const getSelectedMap = memoizeOne((selectedProductIds) =>
		selectedProductIds.reduce((previous, current) => {
			previous[current] = true;
			// console.log({ previous });
			// console.log({ selectedProductIds });
			return previous;
		}, {})
	);

	const add_item_group_id = (e) => {
		set_loading_upload(true);
		e.preventDefault();
		items.forEach((item_group) => {
			const options = [
				...item_group.color_products,
				...item_group.secondary_color_products,
				...item_group.option_products
			];
			// console.log({ options });
			options.forEach(async (option) => {
				console.log({ [option.name]: option._id, item_group_id: item_group._id });
				const { data } = await API_Products.save_item_group_id(option._id, item_group._id);
				// console.log({ data });
			});
		});
		set_loading_upload(false);
	};

	// const update_prices_for_colors = (e) => {
	// 	set_loading_upload(true);
	// 	e.preventDefault();
	// 	items.forEach((item_group) => {
	// 		const options = [
	// 			// ...item_group.color_products,
	// 			// ...item_group.secondary_color_products,
	// 			...item_group.option_products
	// 		];
	// 		// console.log({ options });
	// 		options.forEach(async (option) => {
	// 			console.log({ [option.name]: option._id, item_group_id: item_group._id });
	// 			const { data } = await API_Products.save_item_group_id(option._id, item_group._id);
	// 			// console.log({ data });
	// 		});
	// 	});
	// 	set_loading_upload(false);
	// };

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Products | Glow LEDs</title>
			</Helmet>
			<Notification message={message} />
			<div className="jc-b">
				{/* <div className="w-20per">
					{colors.map((color, index) => {
						return (
							<div className="jc-b p-1rem" key={index}>
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
				</div> */}
				<div className="jc-b w-80per">
					<Link to="/secure/glow/product_display">
						<button className="btn primary h-35px ">Display Products</button>
					</Link>
					<button className="btn primary h-35px" onClick={() => update_product_catelog()}>
						Update Product Catalog
					</button>

					<button className="btn primary h-35px" onClick={update_order}>
						Update Order
					</button>
					<Link to="/secure/glow/editproduct">
						<button className="btn primary h-35px">Create Product</button>
					</Link>

					{/* <button className="btn primary" onClick={add_item_group_id}>
						Add Item Group ID
					</button> */}
					{/* <button className="btn primary" onClick={generate_sitemap}>
					Add Item Group ID
				</button> */}
				</div>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Products</h1>
			</div>
			<Loading loading={loading_upload} error={error} />
			<Loading loading={loading} error={error} />
			<div className="search_and_sort jc-c ai-c">
				<button className="btn primary" style={{ whiteSpace: 'nowrap' }} onClick={show_hidden_products}>
					{!show_hidden ? 'Show' : 'Hide'} Hidden Products
				</button>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<div className="jc-c">
				{totalPages && (
					<Pagination
						className="pagination-bar"
						currentPage={page}
						totalCount={totalPages}
						pageSize={limit}
						onPageChange={(e, page) => update_page(e, page)}
					/>
				)}
			</div>
			<div className="ai-c mt-10px">
				<div className="w-500px">Product Name</div>
				<div className="w-100px">Hidden</div>
				<div className="w-200px">Category</div>
				<div className="w-120px">Order</div>
				<div className="w-500px">Price</div>
				<div className="w-300px">Use as Template</div>
				<div className="w-100px">Actions</div>
			</div>
			{!show_hidden && (
				<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
					{state.entities.columnOrder.map((columnId, index) => {
						const column = state.entities.columns[columnId];
						console.log({ column });
						// const products = column.product_ids.map((product_id, index) => state.entities.products[index]);
						let products = [];
						state.entities.products.filter((product) => !product.option).forEach(function(a) {
							products[column.product_ids.indexOf(a._id)] = a;
						});
						const products_2 = column.product_ids.map(
							(product_id, index) => state.entities.products[index + 1]
						);
						console.log({ products_2 });

						return (
							<Droppable droppableId={'column-1'} key={index}>
								{(provided) => (
									<ul {...provided.droppableProps} ref={provided.innerRef}>
										{/* {console.log({ state.entities })} */}
										{products.filter((product) => !product.hidden).map((product, index) => {
											return (
												<Draggable key={product._id} draggableId={product._id} index={index}>
													{(provided, snapshot) => {
														const isSelected = Boolean(
															getSelectedMap(state.selectedProductIds)[product._id]
														);
														let disAppearProduct = false;
														if (
															snapshot.isDraggingOver &&
															isSelected &&
															state.draggingProductId &&
															product._id !== state.draggingProductId
														) {
															// console.log("Dragging Over - Product not to render - " + product._id);
															// console.log("draggingProductId - " + draggingProductId);
															disAppearProduct = true;
														}
														return (
															<li
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<ProductListItem
																	size="50px"
																	product={product}
																	admin={true}
																	determine_color={determine_color}
																	isSelected={isSelected}
																	selectionCount={state.selectedProductIds.length}
																	toggleSelection={toggleSelection}
																	toggleSelectionInGroup={toggleSelectionInGroup}
																	multiSelectTo={multiSelectTo}
																	disAppearProduct={disAppearProduct}
																	snapshot={snapshot}
																/>
															</li>
														);
													}}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						);
					})}
				</DragDropContext>
			)}
			{show_hidden && (
				<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
					{state.entities.columnOrder.map((columnId) => {
						const column = state.entities.columns[columnId];
						console.log({ column });
						// const products = column.product_ids.map((product_id, index) => state.entities.products[index]);
						let products = [];
						state.entities.products.filter((product) => !product.option).forEach(function(a) {
							products[column.product_ids.indexOf(a._id)] = a;
						});
						console.log({ product_ids: column.product_ids });
						const products_2 = column.product_ids.map(
							(product_id, index) => state.entities.products[index + 1]
						);
						console.log({ products_2 });

						return (
							<Droppable droppableId={'column-1'} index>
								{(provided) => (
									<ul {...provided.droppableProps} ref={provided.innerRef}>
										{/* {console.log({ state.entities })} */}
										{products.map((product, index) => {
											return (
												<Draggable key={product._id} draggableId={product._id} index={index}>
													{(provided, snapshot) => {
														const isSelected = Boolean(
															getSelectedMap(state.selectedProductIds)[product._id]
														);
														let disAppearProduct = false;
														if (
															snapshot.isDraggingOver &&
															isSelected &&
															state.draggingProductId &&
															product._id !== state.draggingProductId
														) {
															// console.log("Dragging Over - Product not to render - " + product._id);
															// console.log("draggingProductId - " + draggingProductId);
															disAppearProduct = true;
														}
														return (
															<li
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<ProductListItem
																	size="50px"
																	product={product}
																	admin={true}
																	determine_color={determine_color}
																	isSelected={isSelected}
																	selectionCount={state.selectedProductIds.length}
																	toggleSelection={toggleSelection}
																	toggleSelectionInGroup={toggleSelectionInGroup}
																	multiSelectTo={multiSelectTo}
																	disAppearProduct={disAppearProduct}
																	snapshot={snapshot}
																/>
															</li>
														);
													}}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						);
					})}
				</DragDropContext>
			)}
			<div className="jc-c">
				{totalPages && (
					<Pagination
						className="pagination-bar"
						currentPage={page}
						totalCount={totalPages}
						pageSize={limit}
						onPageChange={(e, page) => update_page(e, page)}
					/>
				)}
			</div>
		</div>
	);
}

export default ProductPage;
