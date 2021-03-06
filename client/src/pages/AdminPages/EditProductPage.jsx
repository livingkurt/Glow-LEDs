import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, detailsProduct, listProducts } from '../../actions/productActions';
import { useHistory, Link } from 'react-router-dom';
import { DropdownDisplay, ImageDisplay, Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date, snake_case, unformat_date } from '../../utils/helper_functions';
import { listChips } from '../../actions/chipActions';
import { API_Products } from '../../utils';
import { listCategorys } from '../../actions/categoryActions';
import { list_display, option_list } from '../../utils/react_helper_functions';

const EditProductPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);
	const [ id, setId ] = useState('');
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	// const [ display_image, setDisplayImage ] = useState('');
	const [ images, set_images ] = useState([]);
	// const [ product_options_images, set_product_options_images ] = useState([]);
	const [ image, set_image ] = useState('');
	const [ video, setVideo ] = useState('');
	const [ brand, setBrand ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ product_collection, set_product_collection ] = useState('');
	const [ countInStock, setCountInStock ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ facts, setFacts ] = useState('');
	const [ included_items, setIncludedItems ] = useState();
	const [ hidden, setHidden ] = useState(false);
	const [ sale_price, setSalePrice ] = useState(0);
	const [ sale_start_date, set_sale_start_date ] = useState('');
	const [ sale_end_date, set_sale_end_date ] = useState('');

	const [ package_volume, set_package_volume ] = useState(0);
	// const [ subcategories, set_subcategories ] = useState('');
	const [ subcategory, set_subcategory ] = useState('');
	const [ meta_title, set_meta_title ] = useState();
	const [ meta_description, set_meta_description ] = useState();
	const [ meta_keywords, set_meta_keywords ] = useState();
	const [ package_length, set_package_length ] = useState(0);
	const [ package_width, set_package_width ] = useState(0);
	const [ package_height, set_package_height ] = useState(0);
	const [ product_length, set_product_length ] = useState(0);
	const [ product_width, set_product_width ] = useState(0);
	const [ product_height, set_product_height ] = useState(0);
	const [ weight_pounds, set_weight_pounds ] = useState(0);
	const [ material_cost, set_material_cost ] = useState(0);
	const [ filament_used, set_filament_used ] = useState(0);
	const [ printing_time, set_printing_time ] = useState(0);
	const [ assembly_time, set_assembly_time ] = useState(0);
	const [ weight_ounces, set_weight_ounces ] = useState(0);
	const [ default_option, set_default_option ] = useState(false);
	const [ option, set_option ] = useState();
	const [ macro_product, set_macro_product ] = useState();
	const [ group_name, set_group_name ] = useState('');
	const [ color_product_group, set_color_product_group ] = useState(false);
	const [ color_group_name, set_color_group_name ] = useState('');
	const [ color_products, set_color_products ] = useState(false);
	const [ secondary_color_product_group, set_secondary_color_product_group ] = useState(false);
	const [ secondary_color_group_name, set_secondary_color_group_name ] = useState('');
	const [ secondary_color_products, set_secondary_color_products ] = useState(false);
	const [ secondary_product_group, set_secondary_product_group ] = useState([]);
	const [ secondary_group_name, set_secondary_group_name ] = useState('');
	const [ secondary_products, set_secondary_products ] = useState([]);
	const [ option_product_group, set_option_product_group ] = useState(false);
	const [ option_group_name, set_option_group_name ] = useState('');
	const [ option_products, set_option_products ] = useState([]);
	const [ color, set_color ] = useState('');
	const [ color_code, set_color_code ] = useState('');
	const [ pathname, setPathname ] = useState();
	const [ group_product, set_group_product ] = useState([]);
	const [ chips, set_chips ] = useState([]);
	// const [ chip, set_chip ] = useState('');
	const [ categorys, set_categorys ] = useState([]);
	// const [ category, set_categorys ] = useState('');
	const [ subcategorys, set_subcategorys ] = useState([]);
	// const [ subcategory, set_subcategory ] = useState('');
	const [ finite_stock, set_finite_stock ] = useState(false);
	// const [ product, set_product ] = useState('');
	const [ products, set_products ] = useState([]);
	const [ size, set_size ] = useState(0);
	const [ order, setOrder ] = useState();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	// const [ shouldBlockNavigation, set_shouldBlockNavigation ] = useState(false);
	const [ product_options, set_product_options ] = useState([ {} ]);
	const [ product_options_images, set_product_options_images ] = useState([ [] ]);
	const [ products_list, set_products_list ] = useState([]);
	const [ secondary_products_list, set_secondary_products_list ] = useState([]);
	const [ new_index, set_new_index ] = useState();
	const [ save, set_save ] = useState(true);
	const [ filtered_products, set_filtered_products ] = useState([]);
	const [ extra_cost, set_extra_cost ] = useState();

	const history = useHistory();

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productList = useSelector((state) => state.productList);
	const { products: all_products } = productList;

	const chipList = useSelector((state) => state.chipList);
	const { chips: chips_list } = chipList;

	const categoryList = useSelector((state) => state.categoryList);
	const { categorys: categorys_list } = categoryList;

	const productReviewDelete = useSelector((state) => state.productReviewDelete);
	const { success: productDeleteSuccess } = productReviewDelete;

	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.pathname) {
				console.log('Is ID');
				stableDispatch(detailsProduct(props.match.params.pathname));
				stableDispatch(detailsProduct(props.match.params.pathname));
			} else {
				stableDispatch(detailsProduct(''));
			}

			// stableDispatch(listCategorys());
			get_all_options();
			get_all_secondary_products();
			// set_loading_data(false);
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.pathname ]
	);

	useEffect(() => {
		dispatch(listCategorys(''));
		stableDispatch(listProducts(''));
		stableDispatch(listChips());
		return () => {};
	}, []);

	const get_all_options = async () => {
		const { data } = await API_Products.get_all_options();
		console.log({ data });
		set_products_list(data);
	};
	const get_all_secondary_products = async () => {
		const { data } = await API_Products.get_all_diffuser_caps();
		console.log({ data });
		set_secondary_products_list(data);
	};

	// useEffect(() => {

	// 	return () => {};
	// }, [props.match.params.pathname]);

	const use_template = (e) => {
		dispatch(detailsProduct(e.target.value));
		// history.push('/secure/glow/products');
	};
	const use_product_options_template = async (e) => {
		const { data } = await API_Products.get_product(e.target.value);
		console.log({ data });
		set_group_name(data.group_name);
		set_color_product_group(data.color_product_group);
		set_color_group_name(data.color_group_name);
		set_color_products(data.color_products);
		set_secondary_color_product_group(data.secondary_color_product_group);
		set_secondary_color_group_name(data.secondary_color_group_name);
		set_secondary_color_products(data.secondary_color_products);

		set_secondary_product_group(data.secondary_product_group);
		set_secondary_group_name(data.secondary_group_name);
		set_secondary_products(data.secondary_products);
		set_option_product_group(data.option_product_group);
		set_option_group_name(data.option_group_name);
		set_option_products(data.option_products);
		set_color(data.color);
		set_size(data.size);
		set_default_option(data.default_option);
		set_option(data.option);
		set_macro_product(data.macro_product);
		set_extra_cost(data.extra_cost);

		// set_product_options(data.product_options);
		// dispatch(detailsProduct(e.target.value));
		// history.push('/secure/glow/products');
	};
	useEffect(
		() => {
			if (successSave && filtered_products.length > 0) {
				if (filtered_products.map((item) => item.pathname).indexOf(product.pathname) !== -1) {
					history.push('/secure/glow/editproduct/' + filtered_products[new_index].pathname);
				}
			}

			return () => {};
		},
		[ successSave ]
	);
	useEffect(
		() => {
			if (all_products) {
				set_filtered_products(all_products.filter((item) => !item.option).filter((item) => !item.hidden));
			}

			return () => {};
		},
		[ all_products ]
	);

	useEffect(
		() => {
			if (product) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
				set_product_options([ {} ]);
			}

			return () => {};
		},
		[ product, productDeleteSuccess ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		// console.log({ product_length: product.length });
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setFacts(product.facts);
		setIncludedItems(product.included_items);
		setHidden(product.hidden);
		setSalePrice(product.sale_price);
		if (product.sale_start_date) {
			set_sale_start_date(format_date(product.sale_start_date));
		}
		if (product.sale_end_date) {
			set_sale_end_date(format_date(product.sale_end_date));
		}
		set_package_volume(product.package_volume);
		set_meta_title(product.meta_title);
		set_meta_description(product.meta_description);
		set_meta_keywords(product.meta_keywords);
		set_package_length(product.package_length);
		set_package_width(product.package_width);
		set_package_height(product.package_height);
		set_product_length(product.product_length);
		set_product_width(product.product_width);
		set_product_height(product.product_height);
		set_weight_pounds(product.weight_pounds);
		set_weight_ounces(product.weight_ounces);
		// setDisplayImage(product.display_image);
		set_images(product.images);
		// set_images(product.images);
		set_chips(product.chips);
		set_categorys(product.categorys);
		set_subcategorys(product.subcategorys);
		// set_image(product.image);
		setVideo(product.video);
		setBrand(product.brand);
		setCategory(product.category);
		set_product_collection(product.product_collection);
		set_subcategory(product.subcategory);
		setCountInStock(product.countInStock);
		set_finite_stock(product.finite_stock);
		props.match.params.pathname && setPathname(product.pathname);
		setOrder(product.order);
		set_product_options(product.product_options);
		set_product_options_images(product.product_options && product.product_options.map((option) => option.images));
		set_group_product(product.group_product);
		set_products(product.products);
		set_material_cost(product.material_cost);
		set_filament_used(product.filament_used);
		set_printing_time(product.printing_time);
		set_assembly_time(product.assembly_time);
		set_group_name(product.group_name);
		set_color_product_group(product.color_product_group);
		set_color_group_name(product.color_group_name);
		set_color_products(product.color_products);
		set_secondary_color_product_group(product.secondary_color_product_group);
		set_secondary_color_group_name(product.secondary_color_group_name);
		set_secondary_color_products(product.secondary_color_products);
		set_secondary_product_group(product.secondary_product_group);
		set_secondary_group_name(product.secondary_group_name);
		set_secondary_products(product.secondary_products);
		set_option_product_group(product.option_product_group);
		set_option_group_name(product.option_group_name);
		set_option_products(product.option_products);
		set_color(product.color);
		set_color_code(product.color_code);
		set_size(product.size);
		set_default_option(product.default_option);
		set_option(product.option);
		set_macro_product(product.macro_product);
		set_extra_cost(product.extra_cost);
	};
	const unset_state = () => {
		setId('');
		setName('');
		setPrice(0);
		setDescription('');
		setFacts('');
		setIncludedItems('');
		// setDisplayImage([]);
		set_images([]);
		set_image('');
		setVideo('');
		setBrand('');
		setCategory('');
		// set_subcategories('');
		set_subcategory('');
		set_product_collection('');
		setCountInStock(0);
		setHidden(false);
		set_chips([]);
		set_categorys([]);
		set_subcategorys([]);
		setSalePrice('');
		set_sale_start_date(format_date('2021-01-01'));
		set_sale_end_date(format_date('2021-01-01'));
		set_package_volume(1);
		set_meta_title('');
		set_meta_description('');
		set_meta_keywords('');
		set_finite_stock(false);
		// set_package_length(1);
		// set_package_width(1);
		// set_package_height(1);
		// set_product_length(1);
		// set_product_width(1);
		// set_product_height(1);
		set_weight_pounds(0);
		set_weight_ounces(0);
		setPathname('');
		setOrder();
		set_product_options([ {} ]);
		set_product_options_images([ [] ]);
		set_group_product([]);
		set_material_cost(0);
		set_filament_used(0);
		set_printing_time(0);
		set_assembly_time(0);
		set_group_name('');
		set_color_product_group();
		set_color_group_name();
		set_color_products();
		set_secondary_color_product_group();
		set_secondary_color_group_name();
		set_secondary_color_products();
		set_secondary_product_group('');
		set_secondary_group_name('');
		set_secondary_products('');
		set_option_product_group('');
		set_option_group_name('');
		set_option_products('');
		set_color('');
		set_color_code('');
		set_size('');
		set_default_option(false);
		set_option();
		set_macro_product();
		set_extra_cost();
	};
	// window.onbeforeunload = function() {
	// 	return 'Are you sure you want to leave?';
	// };

	const save_product = () => {
		dispatch(
			saveProduct({
				_id: props.match.params.pathname && id,
				name,
				price,
				// display_image,
				images,
				chips: chips.map((chip) => chip._id),
				categorys: categorys.map((category) => category._id),
				subcategorys: subcategorys.map((subcategory) => subcategory._id),
				video,
				brand,
				category,
				product_collection,
				countInStock,
				facts,
				included_items: included_items.length === 0 ? '' : included_items,
				description,
				hidden,
				sale_price,
				sale_start_date: unformat_date(sale_start_date),
				sale_end_date: unformat_date(sale_end_date),
				package_volume: package_length * package_width * package_height,
				subcategory,
				meta_title: `${name} | Glow LEDs`,
				meta_description,
				meta_keywords,
				package_length,
				package_width,
				package_height,
				product_length,
				product_width,
				product_height,
				weight_pounds,
				weight_ounces,
				pathname: pathname ? pathname : snake_case(name),
				order,
				product_options,
				finite_stock,
				products: products.map((chip) => chip._id),
				group_product,
				material_cost,
				filament_used,
				printing_time,
				assembly_time,
				group_name,
				color_product_group,
				color_group_name,
				color_products,
				secondary_color_product_group,
				secondary_color_group_name,
				secondary_color_products,
				secondary_product_group,
				secondary_group_name,
				secondary_products,
				option_product_group,
				option_group_name,
				option_products,
				color,
				color_code,
				size,
				default_option,
				option,
				macro_product,
				extra_cost
			})
		);
	};

	const submitHandler = (e) => {
		console.log({ product_options });
		e.preventDefault();
		save_product();
		e.target.reset();
		unset_state();
		history.push('/secure/glow/products');
	};

	const add_image = (e) => {
		e.preventDefault();
		console.log(image);
		if (image.indexOf(' ') >= 0) {
			console.log('indexOf');
			image.split(' ').map((image) => {
				set_images((images) => [ ...images, image ]);
			});
		} else if (images) {
			console.log('images.length > 0');
			set_images((images) => [ ...images, image ]);
		} else {
			console.log('images.length === 0');
			set_images([ image ]);
		}

		set_image('');
	};
	// const add_chip = (e) => {
	// 	e.preventDefault();
	// 	const chip_object = JSON.parse(e.target.value);
	// 	if (chips) {
	// 		console.log('chips.length > 0');
	// 		set_chips((chips) => [ ...chips, chip_object ]);
	// 	} else {
	// 		console.log('chips.length === 0');
	// 		set_chips([ chip_object ]);
	// 	}

	// 	// set_chip('');
	// };
	const add_category = (e) => {
		e.preventDefault();
		const category_object = JSON.parse(e.target.value);
		if (categorys) {
			console.log('categorys.length > 0');
			set_categorys((categorys) => [ ...categorys, category_object ]);
		} else {
			console.log('categorys.length === 0');
			set_categorys([ category_object ]);
		}

		// set_category('');
	};
	const add_subcategory = (e) => {
		e.preventDefault();
		const subcategory_object = JSON.parse(e.target.value);
		if (subcategorys) {
			console.log('subcategorys.length > 0');
			set_subcategorys((subcategorys) => [ ...subcategorys, subcategory_object ]);
		} else {
			console.log('subcategorys.length === 0');
			set_subcategorys([ subcategory_object ]);
		}

		// set_chip('');
	};

	const update_pathname = () => {
		if (id && pathname) {
			const response = API_Products.update_pathname(id, pathname, product);
			console.log(response);
			if (response) {
				history.push('/secure/glow/products');
			}
		}
	};

	const remove_image = (image_index, e) => {
		e.preventDefault();
		set_images((images) =>
			images.filter((image, index) => {
				return image_index !== index;
			})
		);
	};
	// const remove_chip = (chip_index, e) => {
	// 	e.preventDefault();
	// 	set_chips((chips) =>
	// 		chips.filter((chip, index) => {
	// 			return chip_index !== index;
	// 		})
	// 	);
	// };
	const remove_category = (category_index, e) => {
		e.preventDefault();
		set_categorys((categorys) =>
			categorys.filter((category, index) => {
				return category_index !== index;
			})
		);
	};
	const remove_subcategory = (subcategory_index, e) => {
		e.preventDefault();
		set_subcategorys((subcategorys) =>
			subcategorys.filter((subcategory, index) => {
				return subcategory_index !== index;
			})
		);
	};
	const remove_product_option = (option_index, e) => {
		e.preventDefault();
		set_product_options((option) =>
			option.filter((option, index) => {
				return option_index !== index;
			})
		);
	};

	const move_image_up = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index - 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};
	const move_image_down = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index + 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};

	function move(arr, old_index, new_index) {
		console.log({ arr, old_index, new_index });
		while (old_index < 0) {
			old_index += arr.length;
		}
		while (new_index < 0) {
			new_index += arr.length;
		}
		if (new_index >= arr.length) {
			const k = new_index - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		console.log({ arr });
		return arr;
	}

	// const chip_display = (chips) => {
	// 	return (
	// 		<div>
	// 			<div className="jc-b">
	// 				<div>
	// 					{chips &&
	// 						chips.map((chip, index) => {
	// 							return (
	// 								<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
	// 									<div>
	// 										<button className="btn icon" onClick={(e) => remove_chip(index, e)}>
	// 											<i className="fas fa-times mr-5px" />
	// 										</button>
	// 										{chip.name}
	// 									</div>
	// 								</div>
	// 							);
	// 						})}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };
	const category_display = (categorys) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{categorys &&
							categorys.map((category, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
										<div>
											<button className="btn icon" onClick={(e) => remove_category(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{category.name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};
	const subcategory_display = (subcategorys) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{subcategorys &&
							subcategorys.map((subcategory, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
										<div>
											<button className="btn icon" onClick={(e) => remove_subcategory(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{subcategory.name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};
	const image_display = (images) => {
		return (
			<div>
				<div className="wrap jc-b">
					{images &&
						images.map((picture, index) => {
							return (
								<div className="promo_code mv-1rem jc-b max-w-46rem w-100per" key={index}>
									<div className="pos-rel">
										<img
											alt="product"
											style={{
												width: '100%',
												package_height: 'auto',
												maxWidth: '100px',
												maxHeight: '100px',
												borderRadius: '15px'
											}}
											className="mv-10px ml-10px"
											src={picture}
										/>
										<div className="ml-10px">{picture}</div>

										<button
											className="btn icon pos-abs right-10px top-15px"
											onClick={(e) => remove_image(index, e)}
										>
											<i className="fas fa-times" />
										</button>
										<div className="pos-abs right-40px top-15px column">
											{index > 0 && (
												<button className="btn icon" onClick={(e) => move_image_up(index, e)}>
													<i className=" fas fa-sort-up" />
												</button>
											)}

											{index < images.length - 1 && (
												<button className="btn icon" onClick={(e) => move_image_down(index, e)}>
													<i
														style={{ WebkitTransform: 'rotate(-180deg)' }}
														className=" fas fa-sort-up"
													/>
												</button>
											)}
										</div>
									</div>
								</div>
							);
						})}
				</div>
				<div className="promo_code mv-1rem jc-b max-w-46rem w-100per fs-14px">
					<p>
						{images &&
							images.map((picture, index) => {
								return `${picture}\n`;
							})}
					</p>
				</div>
			</div>
		);
	};
	const product_option_image_display = (images, option_index) => {
		// console.log({ images });
		return (
			<div>
				<div className="row wrap">
					{images &&
						images.map((picture, index) => {
							return (
								<div className="promo_code mv-1rem jc-b max-w-46rem w-100per" key={index}>
									<div className="pos-rel">
										<img
											alt="product"
											style={{
												width: '100%',
												package_height: 'auto',
												maxWidth: '100px',
												maxHeight: '100px',
												borderRadius: '15px'
											}}
											className="mv-10px ml-10px"
											src={picture}
										/>
										<div className="ml-10px">{picture}</div>

										<button
											className="btn icon pos-abs right-10px top-15px"
											onClick={(e) => remove_product_option_image(index, e, option_index)}
										>
											<i className="fas fa-times" />
										</button>
										<div className="pos-abs right-40px top-15px column">
											{index > 0 && (
												<button className="btn icon" onClick={(e) => move_image_up(index, e)}>
													<i className=" fas fa-sort-up" />
												</button>
											)}

											{index < images.length - 1 && (
												<button className="btn icon" onClick={(e) => move_image_down(index, e)}>
													<i
														style={{ WebkitTransform: 'rotate(-180deg)' }}
														className=" fas fa-sort-up"
													/>
												</button>
											)}
										</div>
									</div>
								</div>
							);
						})}
				</div>
				<div className="promo_code mv-1rem jc-b max-w-46rem w-100per fs-14px">
					<p>
						{images &&
							images.map((picture, index) => {
								return `${picture}\n`;
							})}
					</p>
				</div>
			</div>
		);
	};

	// const add_option_image = (image, e, index) => {
	// 	e.preventDefault();
	// 	console.log(image);
	// 	if (image.indexOf(' ') >= 0) {
	// 		console.log('indexOf');
	// 		image.split(' ').map((image) => {
	// 			set_product_options_images((images) => [ ...images, image ]);
	// 		});
	// 	} else if (images) {
	// 		console.log('images.length > 0');
	// 		set_product_options_images((images) => [ ...images, image ]);
	// 		// update_product_option_property(image, e.target.name, index);
	// 		// update_product_option_property(
	// 		//   e.target.value,
	// 		//   e.target.name,
	// 		//   index
	// 		// )
	// 	} else {
	// 		console.log('images.length === 0');
	// 		set_product_options_images([ image ]);
	// 	}

	// 	set_image('');
	// };

	const add_option_image = (e, index) => {
		e.preventDefault();
		// console.log({ image });
		if (image.indexOf(' ') >= 0) {
			console.log('indexOf');
			image.split(' ').map((image) => {
				product_options_images[index].push(image);
				update_product_option_property(product_options_images[index], 'images', index);
			});
		} else if (images) {
			console.log('images.length > 0');
			product_options_images[index].push(image);
			update_product_option_property(product_options_images[index], 'images', index);
		} else {
			console.log('images.length === 0');
			set_product_options_images([ image ]);
			update_product_option_property([ image ], 'images', index);
		}

		set_image('');
	};

	const update_product_option_property = (value, field_name, index) => {
		console.log({ value, field_name, index });
		let new_product_options = [ ...product_options ];
		new_product_options[index] = {
			...new_product_options[index],
			[field_name]: value
		};
		set_product_options(new_product_options);
		// console.log({ product_options });
	};

	const remove_product_option_image = (image_index, e, option_index) => {
		e.preventDefault();
		// set_product_options_images((images) =>
		// 	images.filter((image, index) => {
		// 		return image_index !== index;
		// 	})
		// );
		// const images = product_options.find((option, index) => index === option_index);
		const images = product_options
			.map((option, index) => option.images)
			.find((images, index) => index === option_index)
			.filter((image, index) => image_index !== index);
		console.log({ images });

		// .filter((image, index) => {
		// 	return image_index !== index;
		// });
		update_product_option_property(images, 'images', option_index);
	};
	// const update_product_option_image = (e, image_index) => {
	// 	e.preventDefault();
	// 	set_product_options_images((images) =>
	// 		images.filter((image, index) => {
	// 			return image_index !== index;
	// 		})
	// 	);
	// };

	const move_left = (e) => {
		e.preventDefault();
		// const current_product = all_products.find(item => item._id ===  product._id)
		// const filtered_products = all_products.filter((item) => !item.option).filter((item) => !item.hidden);
		console.log(product._id);
		const current_product_index = filtered_products.map((item) => item.pathname).indexOf(product.pathname);
		console.log({ current_product_index });

		let left_product_index = current_product_index - 1;
		if (left_product_index === -1) {
			left_product_index = filtered_products.length - 1;
		}
		console.log({
			current_product_index,
			left_product_index,
			new_product: filtered_products[left_product_index]
		});
		set_new_index(left_product_index);
		if (save) {
			save_product();
		} else {
			history.push('/secure/glow/editproduct/' + filtered_products[left_product_index].pathname);
		}
	};
	const move_right = (e) => {
		e.preventDefault();
		// const filtered_products = all_products.filter((item) => !item.option).filter((item) => !item.hidden);
		console.log(product.pathname);
		const current_product_index = filtered_products.map((item) => item.pathname).indexOf(product.pathname);
		console.log({ current_product_index });
		let right_product_index = current_product_index + 1;
		if (right_product_index >= filtered_products.length) {
			right_product_index = 0;
		}
		console.log({
			current_product_index,
			right_product_index,
			new_product: filtered_products[right_product_index]
		});
		set_new_index(right_product_index);
		if (save) {
			save_product();
		} else {
			history.push('/secure/glow/editproduct/' + filtered_products[right_product_index].pathname);
		}

		// if (save_success) {
		// history.push('/secure/glow/editproduct/' + filtered_products[right_product_index].pathname);
		// }
	};

	const add_product_option = (e) => {
		e.preventDefault();
		set_product_options((options) => [ ...options, {} ]);
	};

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const add_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		console.log({ product_object });
		if (products) {
			console.log('products.length > 0');
			set_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_products([ product_object ]);
		}

		// set_product('');
	};
	const add_color_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		console.log({ product_object });
		if (products) {
			console.log('products.length > 0');
			set_color_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_color_products([ product_object ]);
		}

		// set_product('');
	};
	const add_secondary_color_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		console.log({ product_object });
		if (products) {
			console.log('products.length > 0');
			set_secondary_color_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_secondary_color_products([ product_object ]);
		}

		// set_product('');
	};
	const add_secondary_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		console.log({ product_object });
		if (products) {
			console.log('products.length > 0');
			set_secondary_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_secondary_products([ product_object ]);
		}

		// set_product('');
	};
	const add_option_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		console.log({ product_object });
		if (products) {
			console.log('products.length > 0');
			set_option_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_option_products([ product_object ]);
		}

		// set_product('');
	};

	const remove_product = (product_index, e, list) => {
		e.preventDefault();
		if (list === 'group') {
			set_products((products) =>
				products.filter((product, index) => {
					return product_index !== index;
				})
			);
		} else if (list === 'color') {
			set_color_products((color_products) =>
				color_products.filter((color_product, index) => {
					return product_index !== index;
				})
			);
		} else if (list === 'secondary_color') {
			set_secondary_color_products((color_products) =>
				secondary_color_products.filter((color_product, index) => {
					return product_index !== index;
				})
			);
		} else if (list === 'option') {
			set_option_products((option_products) =>
				option_products.filter((option_product, index) => {
					return product_index !== index;
				})
			);
		} else if (list === 'secondary') {
			set_secondary_products((secondary_products) =>
				secondary_products.filter((secondary_product, index) => {
					return product_index !== index;
				})
			);
		}
	};

	const product_display = (products, list) => {
		console.log({ products });

		return (
			<div>
				<div className="jc-b">
					<div>
						{products &&
							products.map((product, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
										<div>
											<button
												className="btn icon"
												onClick={(e) => remove_product(index, e, list)}
											>
												<i className="fas fa-times mr-5px" />
											</button>
											<Link to={'/secure/glow/editproduct/' + product.pathname}>
												{product.name}
											</Link>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.pathname ? 'Edit Product' : 'Create Product'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} className="w-100per">
					<Loading loading={loadingSave} error={errorSave} />
					<Loading loading={loading} error={error}>
						{product && (
							<div>
								{console.log({ product })}
								<Helmet>
									<title>Edit Product | Glow LEDs</title>
								</Helmet>
								{/* <Prompt
									when={shouldBlockNavigation}
									message="You have unsaved changes, are you sure you want to leave?"
								/> */}
								<ul
									className="edit-form-container"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									{loading_checkboxes ? (
										<div>Loading...</div>
									) : (
										<li className="w-100per row">
											<label htmlFor="save">Save Product</label>
											<input
												type="checkbox"
												name="save"
												defaultChecked={save}
												id="save"
												onChange={(e) => {
													set_save(e.target.checked);
												}}
											/>
										</li>
									)}
									<div className="row">
										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={(e) => move_left(e)}
											>
												<i className="fas fa-arrow-circle-left fs-40px" />
											</button>
										</div>
										<h2
											style={{
												textAlign: 'center',
												width: '100%',
												marginRight: 'auto',
												justifyContent: 'center'
											}}
											className="ta-c "
										>
											<Link to={'/collections/all/products/' + product.pathname}>
												{loading ? 'Product' : product.name}
											</Link>
										</h2>

										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={(e) => move_right(e)}
											>
												<i className="fas fa-arrow-circle-right fs-40px" />
											</button>
										</div>
									</div>
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_template(e)}
												>
													<option key={1} defaultValue="">
														---Choose Product as a Template---
													</option>
													{all_products.map((product, index) => (
														<option key={index} value={product.pathname}>
															{product.name}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<li>
												<label htmlFor="id">ID</label>
												<input
													type="text"
													name="id"
													value={product._id}
													id="id"
													// onChange={(e) => setName(e.target.value)}
												/>
											</li>
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
												<label htmlFor="color">Color</label>
												<input
													type="text"
													name="color"
													value={color}
													id="color"
													onChange={(e) => set_color(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="color_code">Color Code</label>
												<input
													type="text"
													name="color_code"
													value={color_code}
													id="color_code"
													onChange={(e) => set_color_code(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="size">Size</label>
												<input
													type="text"
													name="size"
													value={size}
													id="size"
													onChange={(e) => set_size(e.target.value)}
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
												<label htmlFor="extra_cost">Extra Cost</label>
												<input
													type="text"
													name="extra_cost"
													value={extra_cost}
													id="extra_cost"
													onChange={(e) => set_extra_cost(e.target.value)}
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
												<div className="jc-b">
													<div>
														<label htmlFor="sale_start_date">Start Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_start_date"
															value={sale_start_date}
															id="sale_start_date"
															onChange={(e) => set_sale_start_date(e.target.value)}
														/>
													</div>
													<div className="m-7px pt-22px">
														<i className="fas fa-minus" />
													</div>
													<div>
														<label htmlFor="sale_end_date">End Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_end_date"
															value={sale_end_date}
															id="sale_end_date"
															onChange={(e) => set_sale_end_date(e.target.value)}
														/>
													</div>
												</div>
											</li>
											<li>
												<label htmlFor="category">Category</label>
												<input
													type="text"
													name="category"
													value={category}
													id="category"
													onChange={(e) => setCategory(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="subcategory">Subcategories</label>
												<input
													type="text"
													name="subcategory"
													value={subcategory}
													id="subcategory"
													onChange={(e) => set_subcategory(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="product_collection">Collection</label>
												<input
													type="text"
													name="product_collection"
													value={product_collection}
													id="product_collection"
													onChange={(e) => set_product_collection(e.target.value)}
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
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="hidden">Hide Product</label>
													<input
														type="checkbox"
														name="hidden"
														defaultChecked={hidden}
														id="hidden"
														onChange={(e) => {
															setHidden(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>

										<div className="w-228px m-10px">
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
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="finite_stock">Finite Stock</label>
													<input
														type="checkbox"
														name="finite_stock"
														defaultChecked={finite_stock}
														id="finite_stock"
														onChange={(e) => {
															set_finite_stock(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="facts">Facts</label>
												<textarea
													className="edit_product_textarea"
													name="facts"
													defaultValue={facts}
													value={facts}
													id="facts"
													onChange={(e) => setFacts(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="included_items">Included Items</label>
												<textarea
													className="edit_product_textarea"
													name="included_items"
													value={included_items}
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
										</div>
										<div className="" styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="pathname">Pathname</label>
												<input
													type="text"
													name="pathname"
													defaultValue={pathname ? pathname : name && snake_case(name)}
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
													value={name && `${name} | Glow LEDs`}
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
											<li>
												<label htmlFor="material_cost">Material Cost</label>
												<input
													type="text"
													name="material_cost"
													defaultValue={material_cost}
													id="material_cost"
													onChange={(e) => set_material_cost(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="filament_used">Filament Used</label>
												<input
													type="text"
													name="filament_used"
													value={filament_used}
													id="filament_used"
													onChange={(e) => set_filament_used(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="printing_time">Printing Time</label>
												<input
													type="text"
													name="printing_time"
													value={printing_time}
													id="printing_time"
													onChange={(e) => set_printing_time(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="assembly_time">Assembly Time</label>
												<input
													type="text"
													name="assembly_time"
													defaultValue={assembly_time}
													id="assembly_time"
													onChange={(e) => set_assembly_time(e.target.value)}
												/>
											</li>
										</div>
										<div className="w-228px m-10px">
											<h3>Product Dimmensions</h3>
											<li>
												<label htmlFor="product_length">Product Length</label>
												<input
													type="text"
													name="product_length"
													defaultValue={product_length}
													id="product_length"
													onChange={(e) => set_product_length(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="product_width">Product Width</label>
												<input
													type="text"
													name="product_width"
													value={product_width}
													id="product_width"
													onChange={(e) => set_product_width(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="product_height">Product Height</label>
												<input
													type="text"
													name="product_height"
													value={product_height}
													id="product_height"
													onChange={(e) => set_product_height(e.target.value)}
												/>
											</li>
											<h3>Package Dimmensions</h3>
											<li>
												<label htmlFor="package_length">Package Length</label>
												<input
													type="text"
													name="package_length"
													defaultValue={package_length}
													id="package_length"
													onChange={(e) => set_package_length(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_width">Package Width</label>
												<input
													type="text"
													name="package_width"
													value={package_width}
													id="package_width"
													onChange={(e) => set_package_width(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_height">Package Height</label>
												<input
													type="text"
													name="package_height"
													value={package_height}
													id="package_height"
													onChange={(e) => set_package_height(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="package_volume">Package Volume</label>
												<input
													type="text"
													name="package_volume"
													value={
														package_length &&
														package_width &&
														package_height &&
														package_length * package_width * package_height
													}
													id="package_volume"
													onChange={(e) => set_package_volume(e.target.value)}
												/>
											</li>
											{/* <li>
												<label htmlFor="package_height">
													Calculated Volume {length && length * package_width * package_height}
												</label>
											</li> */}
											<li>
												<label htmlFor="weight_pounds">Package lbs</label>
												<input
													type="text"
													name="weight_pounds"
													value={weight_pounds}
													id="weight_pounds"
													onChange={(e) => set_weight_pounds(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="weight_ounces">Package oz</label>
												<input
													type="text"
													name="weight_ounces"
													value={weight_ounces}
													id="weight_ounces"
													onChange={(e) => set_weight_ounces(e.target.value)}
												/>
											</li>
										</div>
									</div>
									<ImageDisplay
										images={images}
										set_images={set_images}
										image={image}
										set_image={set_image}
									/>
									{/* <li>
										<label htmlFor="image">Image</label>
										<input
											type="text"
											name="image"
											value={image}
											id="image"
											onChange={(e) => set_image(e.target.value)}
										/>
										<button className="btn primary" onClick={(e) => add_image(e)}>
											Add Image
										</button>
									</li>

									{image_display(images)} */}
									<DropdownDisplay
										item_list={categorys_list}
										list_items={categorys}
										set_items={set_categorys}
										list_name={'Categorys'}
									/>
									<DropdownDisplay
										item_list={categorys_list}
										list_items={subcategorys}
										set_items={set_subcategorys}
										list_name={'Subcategorys'}
									/>
									{/* {option_list(categorys_list, categorys, set_categorys, 'Categorys')}
									{option_list(categorys_list, subcategorys, set_subcategorys, 'Subcategorys')} */}

									{loading_checkboxes ? (
										<div>Loading...</div>
									) : (
										<li>
											<label htmlFor="macro_product">Macro Product</label>
											<input
												type="checkbox"
												name="macro_product"
												defaultChecked={macro_product}
												id="macro_product"
												onChange={(e) => {
													set_macro_product(e.target.checked);
												}}
											/>
										</li>
									)}
									{loading_checkboxes ? (
										<div>Loading...</div>
									) : (
										<li>
											<label htmlFor="option">Option</label>
											<input
												type="checkbox"
												name="option"
												defaultChecked={option}
												id="option"
												onChange={(e) => {
													set_option(e.target.checked);
												}}
											/>
										</li>
									)}
									{option && (
										<div>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="default_option">Default Option</label>
													<input
														type="checkbox"
														name="default_option"
														defaultChecked={default_option}
														id="default_option"
														onChange={(e) => {
															set_default_option(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									)}
									{macro_product && (
										<div>
											<Link to={'/secure/glow/editproduct'}>
												<button className="btn primary w-100per">
													Create New Product Option
												</button>
											</Link>
											<li />
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="group_product">Group Product</label>
													<input
														type="checkbox"
														name="group_product"
														defaultChecked={group_product}
														id="group_product"
														onChange={(e) => {
															set_group_product(e.target.checked);
														}}
													/>
												</li>
											)}
											<div>
												{group_product && (
													<ul>
														<li>
															<label htmlFor="group_name">Group Name</label>
															<input
																type="text"
																name="group_name"
																value={group_name}
																id="group_name"
																onChange={(e) => set_group_name(e.target.value)}
															/>
														</li>
														{/* {option_list(
															products_list,
															products,
															set_products,
															'Group Products'
														)} */}
														<DropdownDisplay
															item_list={products_list}
															list_items={products}
															set_items={set_products}
															list_name={'Group Products'}
														/>
													</ul>
												)}
											</div>
											{color_product_group && (
												<li>
													<h2 className="ta-c">Color Product Group</h2>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="color_product_group">Color Product Group</label>
													<input
														type="checkbox"
														name="color_product_group"
														defaultChecked={color_product_group}
														id="color_product_group"
														onChange={(e) => {
															set_color_product_group(e.target.checked);
														}}
													/>
												</li>
											)}
											<div>
												{color_product_group && (
													<ul>
														<li>
															<label htmlFor="color_group_name">
																Color Product Group Name
															</label>
															<input
																type="text"
																name="color_group_name"
																value={color_group_name}
																id="color_group_name"
																onChange={(e) => set_color_group_name(e.target.value)}
															/>
														</li>
														{option_list(
															products_list,
															color_products,
															set_color_products,
															'Color Products'
														)}
														<DropdownDisplay
															item_list={products_list}
															list_items={color_products}
															set_items={set_color_products}
															list_name={'Color Products'}
														/>
													</ul>
												)}
											</div>
											{secondary_color_product_group && (
												<li>
													<h2 className="ta-c">Secondary Color Product Group</h2>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="secondary_color_product_group">
														Secondary Color Product Group
													</label>
													<input
														type="checkbox"
														name="secondary_color_product_group"
														defaultChecked={secondary_color_product_group}
														id="secondary_color_product_group"
														onChange={(e) => {
															set_secondary_color_product_group(e.target.checked);
														}}
													/>
												</li>
											)}
											<div>
												{secondary_color_product_group && (
													<ul>
														<li>
															<label htmlFor="secondary_color_group_name">
																Secondary Color Product Group Name
															</label>
															<input
																type="text"
																name="secondary_color_group_name"
																value={secondary_color_group_name}
																id="secondary_color_group_name"
																onChange={(e) =>
																	set_secondary_color_group_name(e.target.value)}
															/>
														</li>
														{/* {option_list(
															products_list,
															secondary_color_products,
															set_secondary_color_products,
															'Secondary Color Products'
														)} */}
														<DropdownDisplay
															item_list={products_list}
															list_items={secondary_color_products}
															set_items={set_secondary_color_products}
															list_name={'Secondary Color Products'}
														/>
													</ul>
												)}
											</div>
											{option_product_group && (
												<li>
													<h2 className="ta-c">Option Color Product Group</h2>
												</li>
											)}

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="option_product_group">Option Product Group</label>
													<input
														type="checkbox"
														name="option_product_group"
														defaultChecked={option_product_group}
														id="option_product_group"
														onChange={(e) => {
															set_option_product_group(e.target.checked);
														}}
													/>
												</li>
											)}

											<div>
												{option_product_group && (
													<ul>
														<li>
															<label htmlFor="option_group_name">
																Option Product Group Name
															</label>
															<input
																type="text"
																name="option_group_name"
																value={option_group_name}
																id="option_group_name"
																onChange={(e) => set_option_group_name(e.target.value)}
															/>
														</li>
														{/* {option_list(
															products_list,
															option_products,
															set_option_products,
															'Option Products'
														)} */}
														<DropdownDisplay
															item_list={products_list}
															list_items={option_products}
															set_items={set_option_products}
															list_name={'Option Products'}
														/>
													</ul>
												)}
											</div>
											{secondary_product_group && (
												<li>
													<h2 className="ta-c">Secondary Product Group</h2>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="secondary_product_group">
														Secondary Product Group
													</label>
													<input
														type="checkbox"
														name="secondary_product_group"
														defaultChecked={secondary_product_group}
														id="secondary_product_group"
														onChange={(e) => {
															set_secondary_product_group(e.target.checked);
														}}
													/>
												</li>
											)}
											<div>
												{secondary_product_group && (
													<ul>
														<li>
															<label htmlFor="secondary_group_name">
																Secondary Product Group Name
															</label>
															<input
																type="text"
																name="secondary_group_name"
																value={secondary_group_name}
																id="secondary_group_name"
																onChange={(e) =>
																	set_secondary_group_name(e.target.value)}
															/>
														</li>
														{/* {option_list(
															products_list,
															secondary_products,
															set_secondary_products,
															'Option Products'
														)} */}
														<DropdownDisplay
															item_list={products_list}
															list_items={secondary_products}
															set_items={set_secondary_products}
															list_name={'Secondary Products'}
														/>
													</ul>
												)}
											</div>
										</div>
									)}
									{option_list(chips_list, chips, set_chips, 'Chips')}
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_product_options_template(e)}
												>
													<option key={1} defaultValue="">
														---Choose Product Option Template---
													</option>
													{all_products.map((product, index) => (
														<option key={index} value={product.pathname}>
															{product.name}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<div className="row">
										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={(e) => move_left(e)}
											>
												<i className="fas fa-arrow-circle-left fs-40px" />
											</button>
										</div>
										<div
											style={{
												textAlign: 'center',
												width: '100%',
												marginRight: 'auto',
												justifyContent: 'center'
											}}
											className="ta-c "
										/>

										<div className="ai-c">
											<button
												style={{ borderRadius: '50%' }}
												className="btn icon h-59px"
												onClick={(e) => move_right(e)}
											>
												<i className="fas fa-arrow-circle-right fs-40px" />
											</button>
										</div>
									</div>

									{/* <li>
										<button className="btn primary" onClick={(e) => add_product_option(e)}>
											Create Product Option
										</button>
									</li> */}
									<div className="row wrap jc-b">
										{product_options &&
											product_options.map((option, index) => {
												return (
													<div key={index} className="w-410px m-10px">
														<div className="jc-b">
															<h2>Product Option {index + 1}</h2>
															<button
																className="btn primary w-4rem h-4rem p-14px mr-1rem mb-1rem"
																onClick={(e) => remove_product_option(index, e)}
															>
																<i className="fas fa-times mr-5px" />
															</button>
														</div>
														<li>
															<label htmlFor="name">Name</label>
															<input
																type="text"
																name="name"
																defaultValue={option.name}
																value={option.name}
																id="name"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="size">Size</label>
															<input
																type="text"
																name="size"
																defaultValue={option.size}
																value={option.size}
																id="size"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="price">Price</label>
															<input
																type="text"
																name="price"
																defaultValue={option.price}
																value={option.price}
																id="price"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="sale_price">Sale Price</label>
															<input
																type="text"
																name="sale_price"
																defaultValue={option.sale_price}
																value={option.sale_price}
																id="sale_price"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														{/* <li>
															<label htmlFor="color">Color</label>
															<input
																type="text"
																name="color"
																defaultValue={option.color}
																value={option.color}
																id="color"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li> */}
														{/* <h3>Package Dimmensions</h3>
														<li>
															<label htmlFor="package_length">Package Length</label>
															<input
																type="text"
																name="package_length"
																defaultValue={option.package_length}
																id="package_length"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_width">Package Width</label>
															<input
																type="text"
																name="package_width"
																value={option.package_width}
																id="package_width"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_height">Package Height</label>
															<input
																type="text"
																name="package_height"
																value={option.package_height}
																id="package_height"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_volume">Package Volume</label>
															<input
																type="text"
																name="package_volume"
																value={
																	option.package_length &&
																	option.package_width &&
																	option.package_height &&
																	option.package_length *
																		option.package_width *
																		option.package_height
																}
																id="package_volume"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_pounds">Package lbs</label>
															<input
																type="text"
																name="package_pounds"
																value={option.package_pounds}
																id="package_pounds"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="package_ounces">Package oz</label>
															<input
																type="text"
																name="package_ounces"
																value={option.package_ounces}
																id="package_ounces"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="material_cost">Material Cost</label>
															<input
																type="text"
																name="material_cost"
																defaultValue={option.material_cost}
																id="material_cost"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="filament_used">Filament Used</label>
															<input
																type="text"
																name="filament_used"
																value={option.filament_used}
																id="filament_used"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="printing_time">Printing Time</label>
															<input
																type="text"
																name="printing_time"
																value={option.printing_time}
																id="printing_time"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li>
														<li>
															<label htmlFor="assembly_time">Assembly Time</label>
															<input
																type="text"
																name="assembly_time"
																defaultValue={option.assembly_time}
																id="assembly_time"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li> */}
														{/* {loading_checkboxes ? (
															<div>Loading...</div>
														) : (
															<li>
																<label htmlFor="finite_stock">Finite Stock</label>
																<input
																	type="checkbox"
																	name="finite_stock"
																	defaultChecked={option.finite_stock}
																	id="finite_stock"
																	onChange={(e) =>
																		update_product_option_property(
																			e.target.checked,
																			e.target.name,
																			index
																		)}
																/>
															</li>
														)} */}
														{/* <li>
															<label htmlFor="count_in_stock">Count In Stock</label>
															<input
																type="text"
																name="count_in_stock"
																defaultValue={option.count_in_stock}
																value={option.count_in_stock}
																id="count_in_stock"
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
														</li> */}

														{/* {loading_checkboxes ? (
															<li>Loading...</li>
														) : (
															<li>
																<label htmlFor="dropdown">Dropdown</label>
																<input
																	type="checkbox"
																	name="dropdown"
																	defaultChecked={option.dropdown}
																	id="dropdown"
																	onChange={(e) =>
																		update_product_option_property(
																			e.target.checked,
																			e.target.name,
																			index
																		)}
																/>
															</li>
														)} */}
														{/* {loading_checkboxes ? (
															<li>Loading...</li>
														) : (
															<li>
																<label htmlFor="no_dropdown">No Dropdown</label>
																<input
																	type="checkbox"
																	name="no_dropdown"
																	defaultChecked={option.no_dropdown}
																	id="no_dropdown"
																	onChange={(e) =>
																		update_product_option_property(
																			e.target.checked,
																			e.target.name,
																			index
																		)}
																/>
															</li>
														)} */}
														{loading_checkboxes ? (
															<li>Loading...</li>
														) : (
															<li>
																<label htmlFor="default">Default Option</label>
																<input
																	type="checkbox"
																	name="default"
																	defaultChecked={option.default}
																	id="default"
																	onChange={(e) =>
																		update_product_option_property(
																			e.target.checked,
																			e.target.name,
																			index
																		)}
																/>
															</li>
														)}
														{/* <li>
															<label htmlFor="image">Option Image</label>
															<input
																type="text"
																name={option.name}
																// value={option.image}
																id="image"
																// onChange={(e) => set_image(e.target.value)}
																// onChange={(e) => add_chip(e)}
																onChange={(e) =>
																	update_product_option_property(
																		e.target.value,
																		e.target.name,
																		index
																	)}
															/>
															<button
																className="btn primary"
																name={option.name}
																// onClick={(e) => add_product_option_image(e)}
																onClick={(e) =>
																	add_product_option_image(
																		image,
																		e.target.name,
																		index
																	)}
															>
																Add Image
															</button>
														</li> */}
														{/* <li>
															<label htmlFor="image">Option Image</label>
															<input
																type="text"
																name="image"
																value={image}
																id="image"
																// onChange={(e) =>
																// 	update_product_option_image(e, index)}
																onChange={(e) => set_image(e.target.value)}
															/>
															<button
																className="btn primary"
																onClick={(e) => add_option_image(e, index)}
															>
																Add Image
															</button>
														</li>
														{product_option_image_display(option.images, index)} */}
													</div>
												);
											})}
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button type="button" onClick={update_pathname} className="btn primary">
											Update Pathname
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Products
										</button>
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
