import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { Filter, Search, Sort } from '../../components/SpecialtyComponents/index';
import { Loading, Notification } from '../../components/UtilityComponents';
import {
	description_determination,
	getUrlParameter,
	humanize,
	prnt,
	sort_options,
	update_products_url
} from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';
import { listChips } from '../../actions/chipActions';
import { ProductItemM } from '../../components/MobileComponents';
import { ProductItemD } from '../../components/DesktopComponents';

const AllProductsPage = (props) => {
	const history = useHistory();
	const [ product_occurrences, set_product_occurrences ] = useState([]);
	const [ query, set_query ] = useState({});
	const [ best_sellers, set_best_sellers ] = useState([]);
	const [ essentials, set_essentials ] = useState([]);
	const [ imperfect, set_imperfect ] = useState([]);
	const [ loading_products, set_loading_products ] = useState(false);
	const [ alternative_products, set_alternative_products ] = useState([]);
	const [ products, set_products ] = useState([]);
	const [ chip, set_chip ] = useState('');

	// const category = props.match.params.category ? props.match.params.category : '';
	// const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
	// const collection = props.match.params.collection ? props.match.params.collection : '';
	// const promo_code = props.match.params.promo_code ? props.match.params.promo_code : '';

	const [ category, set_category ] = useState(props.match.params.category ? props.match.params.category : '');
	const [ subcategory, set_subcategory ] = useState(
		props.match.params.subcategory ? props.match.params.subcategory : ''
	);
	const [ collection, set_collection ] = useState(props.match.params.collection ? props.match.params.collection : '');
	const [ promo_code, set_promo_code ] = useState(props.match.params.promo_code ? props.match.params.promo_code : '');
	const [ search, set_search ] = useState('');
	const [ sort, set_sort ] = useState('');
	const [ filter, set_filter ] = useState('');

	const productList = useSelector((state) => state.productList);
	const { products: main_products, loading, error } = productList;

	const chipList = useSelector((state) => state.chipList);
	const { chips: chips_list } = chipList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (promo_code) {
				sessionStorage.setItem('promo_code', promo_code);
				props.set_message(`${promo_code} Added to Checkout`);
			}
		},
		[ promo_code ]
	);
	useEffect(
		() => {
			if (main_products) {
				if (category !== 'essentials' || category !== 'discounted' || category !== 'best_sellers') {
					set_products(main_products);
					set_loading_products(false);
				}
			}
		},
		[ main_products ]
	);
	useEffect(
		() => {
			get_occurrences(props.match.params.category);
		},
		[ props.match.params.category ]
	);

	// useEffect(() => {
	// 	const query = getUrlParameter(props.location);
	// 	console.log({ query });
	// 	if (Object.keys(query).length > 0) {
	// 		if (query.search) {
	// 			set_search(query.search.split('%20').join(' '));
	// 		}
	// 		if (query.sort) {
	// 			set_sort(query.sort);
	// 		}
	// 		if (query.filter) {
	// 			set_filter(chips_list.filter((chip) => chip.name === query.filter.split('%20').join(' '))._id);
	// 		}
	// 		if (category === 'discounted') {
	// 			get_occurrences(category);
	// 		} else if (category === 'best_sellers') {
	// 			get_occurrences(category);
	// 		} else if (category === 'essentials') {
	// 			get_occurrences(category);
	// 		}
	// 		if ((query.search || query.sort || query.filter) && !category && !subcategory) {
	// 			dispatch(
	// 				listProducts(
	// 					category,
	// 					subcategory,
	// 					query.search ? query.search.split('%20').join(' ') : '',
	// 					query.sort,
	// 					query.filter
	// 						? chips_list.filter((chip) => chip.name === query.filter.split('%20').join(' '))._id
	// 						: '',
	// 					'',
	// 					collection
	// 				)
	// 			);
	// 		}
	// 		if (category !== 'essentials' || category !== 'discounted' || category !== 'best_sellers') {
	// 			// console.log('All Products');
	// 			if (!collection && category) {
	// 				console.log('No Category or Collection');
	// 				dispatch(
	// 					listProducts(
	// 						category,
	// 						subcategory,
	// 						query.search ? query.search.split('%20').join(' ') : '',
	// 						query.sort,
	// 						query.filter
	// 							? chips_list.filter((chip) => chip.name === query.filter.split('%20').join(' '))._id
	// 							: '',
	// 						'',
	// 						collection
	// 					)
	// 				);
	// 			}
	// 			// else if (collection && category) {
	// 			// 	dispatch(listProducts(category, '', '', '', '', '', collection));
	// 			// }
	// 		}
	// 	} else if (
	// 		Object.keys(query).length === 0 &&
	// 		(category !== 'essentials' || category !== 'discounted' || category !== 'best_sellers')
	// 	) {
	// 		dispatch(listProducts(category, subcategory, '', '', '', '', collection));
	// 	}
	// 	// dispatch(listProducts(category, subcategory, '', '', '', '', collection));
	// 	dispatch(listChips());
	// }, []);

	useEffect(() => {
		determine_products();
		return () => {};
	}, []);

	useEffect(
		() => {
			determine_products();
			return () => {};
		},
		[ props.match.params.category, props.match.params.subcategory ]
	);
	// useEffect(
	// 	() => {
	// 		// determine_products();
	// 		if (chips_list.length > 0) {
	// 			const query = getUrlParameter(props.location);
	// 			prnt({ chip: query.filter.split('%20').join(' ') });
	// 			set_filter(chips_list.find((chip) => chip.name === query.filter.split('%20').join(' '))._id);
	// 			let filter = chips_list.find((chip) => chip.name === query.filter.split('%20').join(' ')._id);
	// 			prnt({ filter, chips_list });
	// 		}
	// 		return () => {};
	// 	},
	// 	[ chips_list ]
	// );

	const determine_products = () => {
		dispatch(listChips(''));
		const query = getUrlParameter(props.location);
		let category = props.match.params.category ? props.match.params.category : '';
		let subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
		let search = '';
		let sort = '';
		let filter = '';
		let show_hidden = '';
		let collection = props.match.params.collection ? props.match.params.collection : '';
		prnt({ query });
		if (category !== 'essentials' || category !== 'discounted' || category !== 'best_sellers') {
			if (Object.keys(query).length > 0) {
				if (query.search) {
					set_search(query.search.split('%20').join(' '));
					search = query.search.split('%20').join(' ');
				}
				if (query.sort) {
					set_sort(query.sort);
					sort = query.sort;
				}
				if (query.filter) {
					filter = waitForElement(query.filter, chips_list);
				}
			}
			if (category) {
				if (category === 'discounted') {
					get_occurrences(category);
				} else if (category === 'best_sellers') {
					get_occurrences(category);
				} else if (category === 'essentials') {
					get_occurrences(category);
				}
			}
			// console.log({ category, subcategory, search, sort, filter, show_hidden, collection });

			dispatch(listProducts(category, subcategory, search, sort, filter, show_hidden, collection));
		}
	};

	const waitForElement = (filter, chips_list) => {
		prnt({ filter, chips_list });
		if (typeof chips_list && chips_list.length > 0) {
			prnt({ chip: filter.split('%20').join(' ') });
			set_filter(chips_list.find((chip) => chip.name === filter.split('%20').join(' '))._id);
			return chips_list.find((chip) => chip.name === filter.split('%20').join(' '))._id;
		} else {
			setTimeout(waitForElement, 250);
		}
	};

	const get_occurrences = async (category) => {
		set_loading_products(true);
		const { data: occurrences } = await API_Products.get_occurrences();
		console.log({ occurrences });
		set_product_occurrences(occurrences);
		if (occurrences && category === 'best_sellers') {
			const { data } = await API_Products.get_best_sellers(occurrences);
			console.log({ data });
			set_products(data);
		} else if (occurrences && category === 'essentials') {
			const { data } = await API_Products.get_essentials();
			console.log({ data });
			set_products(data);
		} else if (category === 'discounted') {
			const { data } = await API_Products.get_imperfect();
			console.log({ data });
			set_products(data);
		} else {
			set_best_sellers(false);
		}
		set_loading_products(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		update_products_url(history, search, sort, filter);
		dispatch(listProducts('', '', search, '', '', ''));
	};

	const sortHandler = (e) => {
		set_sort(e.target.value);
		update_products_url(history, search, e.target.value, filter);
		dispatch(listProducts(category, subcategory, search, e.target.value, '', '', collection));
	};

	const filterHandler = (e) => {
		const chip_selected = JSON.parse(e.target.value);
		set_chip(chip_selected._id);
		set_search('');
		set_filter(chip_selected._id);
		console.log({ chip_selected });
		update_products_url(history, '', sort, chip_selected.name);
		dispatch(listProducts(category, subcategory, '', sort, chip_selected._id, '', collection));
	};

	return (
		<div>
			<Helmet>
				<title>{category ? humanize(category) : 'Products'} | Glow LEDs</title>
				<meta property="og:title" content={category ? humanize(category) : 'Products'} />
				<meta name="twitter:title" content={category ? humanize(category) : 'Products'} />
				<link rel="canonical" href="https://www.glow-leds.com/collections/products" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/products" />
				<meta name="description" content={description_determination(category)} />
				<meta property="og:description" content={description_determination(category)} />
				<meta name="twitter:description" content={description_determination(category)} />
			</Helmet>

			<div className="jc-c">
				<div className="row">
					<h1>
						{`${humanize(category) === 'Exo Diffusers'
							? 'EXO Diffusers'
							: humanize(category)} ${subcategory && humanize(subcategory)} ${collection &&
							humanize(collection)}` || 'Products'}
					</h1>
					<label style={{ color: '#d2cfcf', marginTop: '10px' }}>
						{category === 'diffuser_caps' ||
						category === 'diffuser_adapters' ||
						category === 'exo_diffusers' ||
						category === 'glowskins' ||
						category === 'glow_strings' ? (
							'™'
						) : (
							''
						)}{' '}
					</label>
				</div>
			</div>

			<div className="jc-c ai-c wrap m-auto pb-1rem" style={{ overflowX: 'scroll' }}>
				<Search set_search={set_search} search={search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
				{/* {category === 'glowskins' && <Filter filterHandler={filterHandler} filter_options={chips_list} />} */}
				<Filter filterHandler={filterHandler} filter_options={chips_list} />
			</div>
			<Loading loading={loading_products} />
			<Loading loading={loading} error={error}>
				{products && (
					<div>
						<div className="product_big_screen">
							{products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{products
										.filter((product) => !product.option)
										.map(
											(product, index) =>
												!product.hidden && (
													<ProductItemD
														size="300px"
														key={index}
														product={product}
														product_occurrences={product_occurrences}
													/>
												)
										)}
								</ul>
							)}
						</div>

						<div className="product_small_screen none">
							{products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{products
										.filter((product) => !product.option)
										.map(
											(product, index) =>
												!product.hidden && (
													<ProductItemM
														size="300px"
														key={index}
														product={product}
														product_occurrences={product_occurrences}
													/>
												)
										)}
								</ul>
							)}
						</div>
					</div>
				)}
				{products.length === 0 &&
				!best_sellers && <h2 style={{ textAlign: 'center' }}>Sorry we can't find anything with that name</h2>}
			</Loading>
		</div>
	);
};
export default AllProductsPage;
