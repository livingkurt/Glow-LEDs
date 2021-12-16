import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { Filter, Search, Sort, Pagination } from '../../components/SpecialtyComponents/index';
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
import { API_Chips, API_Products } from '../../utils';
import { listChips } from '../../actions/chipActions';
import { ProductItemM } from '../../components/MobileComponents';
import { ProductItemD } from '../../components/DesktopComponents';
import { userWindowDimensions } from '../../components/Hooks';

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
	const [ page, set_page ] = useState(1);
	const [ hidden, set_hidden ] = useState(false);
	const [ option, set_option ] = useState(false);
	const [ limit, set_limit ] = useState(20);
	const [ message, set_message ] = useState('');
	// const [ currentPage, setCurrentPage ] = useState(1);

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
	const { products: main_products, totalPages, currentPage, loading, error } = productList;

	const chipList = useSelector((state) => state.chipList);
	const { chips: chips_list } = chipList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (promo_code) {
					sessionStorage.setItem('promo_code', promo_code);
					set_message(`${promo_code} Added to Checkout`);
				}
			}
			return () => (clean = false);
		},
		[ promo_code ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (main_products) {
					if (category !== 'essentials' || category !== 'best_sellers') {
						set_products(main_products);
						if (currentPage) {
							set_page(currentPage);
						}
						set_loading_products(false);
					}
				}
			}
			return () => (clean = false);
		},
		[ main_products ]
	);

	const { width, height } = userWindowDimensions();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listChips({}));
				determine_products();
				get_occurrences(props.match.params.category);
			}
			return () => (clean = false);
		},
		[ props.match.params.category, props.match.params.subcategory, getUrlParameter(props.location).search ]
	);

	const determine_products = async () => {
		console.log({});
		const query = getUrlParameter(props.location);
		let category = props.match.params.category ? props.match.params.category : '';
		let sale = '';
		let subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';
		if (category === 'discounted') {
			category = '';
			// subcategory = 'sale';
			sale = true;
		}
		let search = '';
		let sort = '';
		let filter = '';
		let hidden = false;
		let limit = '';
		let page = '';
		let option = false;
		let collection = props.match.params.collection ? props.match.params.collection : '';
		// prnt({ query });
		if (category !== 'essentials' || category !== 'best_sellers') {
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
					// console.log({ filter: query.filter, chips_list });
					const { data } = await API_Chips.get_chip_by_name(query.filter);
					filter = data._id;
					// filter = waitForElement(query.filter, chips_list);
				}
				if (query.page) {
					set_page(query.page);
					page = query.page;
				}
				if (query.limit) {
					set_limit(query.limit);
				}
			}
			if (category) {
				if (category === 'best_sellers') {
					get_occurrences(category);
				} else if (category === 'essentials') {
					get_occurrences(category);
				}
			}
			console.log({ category, subcategory, search, sort, filter, collection });
			// dispatch(listProducts(category, subcategory, filter, search, sort, collection, page, limit, hidden));
			dispatch(
				listProducts({
					category,
					subcategory,
					filter,
					search,
					sort,
					collection,
					page,
					limit,
					hidden,
					option,
					sale
				})
			);
		}
	};

	const get_occurrences = async (category) => {
		set_loading_products(true);
		const { data: occurrences } = await API_Products.get_occurrences();
		// console.log({ occurrences });
		set_product_occurrences(occurrences);
		if (occurrences && category === 'best_sellers') {
			const { data } = await API_Products.get_best_sellers(occurrences);
			// console.log({ data });
			set_products(data);
		} else if (occurrences && category === 'essentials') {
			const { data } = await API_Products.get_essentials();
			// console.log({ data });
			set_products(data);
		} else {
			// else if (category === 'discounted') {
			// 	const { data } = await API_Products.findAll_products_a({ subcategory: 'imperfect' });
			// 	// console.log({ data });
			// 	set_products(data);
			// }
			set_best_sellers(false);
		}
		set_loading_products(false);
	};

	const sortHandler = (e) => {
		set_sort(e.target.value);
		update_products_url(history, search, e.target.value, filter);
		dispatch(
			listProducts({
				category,
				subcategory,
				search,
				sort: e.target.value,
				collection,
				page,
				limit,
				hidden,
				option
			})
		);
	};

	const filterHandler = (e) => {
		const chip_selected = JSON.parse(e.target.value);
		set_chip(chip_selected._id);
		set_search('');
		set_filter(chip_selected._id);
		// console.log({ chip_selected });
		update_products_url(history, '', sort, chip_selected.name);
		dispatch(
			listProducts({
				category,
				subcategory,
				chip: chip_selected._id,
				sort,
				collection,
				page,
				limit,
				hidden,
				option
			})
		);
	};

	const update_page = (e, new_page) => {
		// console.log({ e, new_page });
		e.preventDefault();
		const page = parseInt(new_page);
		update_products_url(history, search, sort, filter, page);

		// console.log(new_page);
		dispatch(
			listProducts({
				category,
				subcategory,
				filter,
				search,
				sort,
				page: new_page,
				limit,
				hidden,
				option
			})
		);
	};

	return (
		<div>
			<Helmet>
				<title>{category ? humanize(category) : 'Products'} | Glow LEDs</title>
				<meta property="og:title" content={category ? humanize(category) : 'Products'} />
				<meta name="twitter:title" content={category ? humanize(category) : 'Products'} />
				<link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
				<meta name="description" content={description_determination(category)} />
				<meta property="og:description" content={description_determination(category)} />
				<meta name="twitter:description" content={description_determination(category)} />
			</Helmet>
			<Notification message={message} />
			<div className="jc-c">
				<div className="row">
					<h1 className="fs-25px mb-5px ta-c">
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
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
				{/* {category === 'glowskins' && <Filter filterHandler={filterHandler} filter_options={chips_list} />} */}
				<Filter filterHandler={filterHandler} filter_options={chips_list} />
			</div>
			<Loading loading={loading_products} />
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
			<Loading loading={loading} error={error}>
				<div>
					<ul className="products" style={{ marginTop: 0 }}>
						{console.log({ products })}
						{products &&
							products
								.filter((product) => !product.option)
								.map(
									(product, index) =>
										width >= 704 ? (
											<ProductItemD
												size="300px"
												key={index}
												product={product}
												product_occurrences={product_occurrences}
											/>
										) : (
											<ProductItemM
												size="300px"
												key={index}
												product={product}
												product_occurrences={product_occurrences}
											/>
										)
								)}
					</ul>
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
				{products.length === 0 &&
				!best_sellers && <h2 style={{ textAlign: 'center' }}>Sorry we can't find anything with that name</h2>}
			</Loading>
		</div>
	);
};
export default AllProductsPage;
