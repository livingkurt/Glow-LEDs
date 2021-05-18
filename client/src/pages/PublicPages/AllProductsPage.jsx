import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import { Filter, Product, ProductSmallScreen, Search, Sort } from '../../components/SpecialtyComponents/index';
import { Loading } from '../../components/UtilityComponents';
import { humanize } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';
import { listChips } from '../../actions/chipActions';

const AllProductsPage = (props) => {
	const history = useHistory();
	const search = props.location.search.substring(8) ? props.location.search.substring(8) : '';
	const [ product_occurrences, set_product_occurrences ] = useState([]);
	const [ best_sellers, set_best_sellers ] = useState([]);
	const [ essentials, set_essentials ] = useState([]);
	const [ alternative_products, set_alternative_products ] = useState([]);
	// console.log({ search_outside: search });
	const [ searchKeyword, setSearchKeyword ] = useState(
		props.location.search.substring(8) ? props.location.search.substring(8) : ''
	);
	const [ sortOrder, setSortOrder ] = useState('');
	const [ filter, set_filter ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';

	// console.log({ subcategory });
	// console.log(props.match.params);
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	const chipList = useSelector((state) => state.chipList);
	const { chips: chips_list } = chipList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			// dispatch(listProducts(''));
			// console.log({ search: search.substring(8) });
			dispatch(listProducts(category, subcategory, searchKeyword));
			dispatch(listChips());
		},
		[ searchKeyword ]
	);
	// useEffect(
	// 	() => {
	// 		get_occurrences();
	// 	},
	// 	[ searchKeyword ]
	// );
	useEffect(
		() => {
			if (category === 'best_sellers') {
				get_occurrences();
			}
			if (category === 'essentials') {
				get_occurrences();
			} else {
				dispatch(listProducts(category, subcategory, searchKeyword));
			}
			dispatch(listChips());
		},
		[ category ]
	);

	const get_occurrences = async () => {
		const { data: occurrences } = await API_Products.get_occurrences();
		set_product_occurrences(occurrences);
		console.log({ occurrences });
		if (occurrences && category === 'best_sellers') {
			const { data } = await API_Products.get_best_sellers(occurrences);
			console.log({ data });
			set_best_sellers(data);
			set_alternative_products(data);
		} else if (occurrences && category === 'essentials') {
			const { data } = await API_Products.get_essentials();
			console.log({ data });
			set_essentials(data);
			set_alternative_products(data);
		} else {
			dispatch(listProducts(category, subcategory, searchKeyword));
			set_best_sellers(false);
		}
	};
	// console.log({ best_sellers });
	// console.log({ products });

	useEffect(
		() => {
			// dispatch(listProducts(''));
			console.log(props.location);
			// let params = new URLSearchParams(props.location);
			// params.delete('search');

			// let params = new URLSearchParams(props.location.pathmame + props.location.search);

			// params.delete('searcj'); //Query string is now: 'bar=2'
			setSearchKeyword('');
			dispatch(listProducts(category, subcategory));
			dispatch(listChips());
		},
		[ props.location.pathname ]
	);

	useEffect(
		() => {
			// console.log({ category });
			// console.log({ subcategory });
			// console.log({ searchKeyword });
			// console.log({ search });
			// if (
			// 	[
			// 		'diffuser_caps',
			// 		'infinity_mirrors',
			// 		'accessories',
			// 		'frosted_diffusers',
			// 		'diffuser_adapters',
			// 		'glow_strings',
			// 		'mega_diffuser_caps',
			// 		'mini_diffuser_adapters'
			// 	].includes(category)
			// ) {
			if (searchKeyword) {
				history.push({
					search: '?search=' + searchKeyword
				});
			}
			// else if (search) {
			// 	history.push({
			// 		search: '?search=' + search
			// 	});
			// }

			dispatch(listProducts(category, subcategory, searchKeyword));
			dispatch(listChips());
			// } else {

			// 	dispatch(listProducts(''));
			// }
		},
		[ category, subcategory, searchKeyword ]
	);

	useEffect(
		() => {
			dispatch(listProducts(category, subcategory, searchKeyword, sortOrder));
			dispatch(listChips());
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		console.log({ searchKeyword });
		e.preventDefault();
		// history.push(
		// 	'/collections/all/products/category' + category + '/subcategory/' + subcategory + '?search=' + searchKeyword
		// );
		history.push({
			search: '?search=' + searchKeyword
		});
		dispatch(listProducts(category, subcategory, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(category, subcategory, searchKeyword, e.target.value));
	};
	const filterHandler = (e) => {
		set_filter(e.target.value);
		dispatch(listProducts(category, subcategory, searchKeyword, sortOrder, e.target.value));
	};

	const descriptions = {
		all_products:
			'Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Glowskins, and Glow Strings. Click to Shop.',
		frosted_diffusers:
			'Take your gloving light shows to the next level with our Frosted Dome Diffusers at Glow LEDs. Shop Dome Diffusers, Large Dome Diffusers, and Frosted Diffusers. Click to Shop.',
		diffuser_caps:
			'Take your gloving light shows to the next level with our Diffuser Caps at Glow LEDs. Shop Screw on LED Caps, Cap over Diffusers, and Diffuser filters. Click to Shop.',
		diffuser_adapters:
			'Take your gloving light shows to the next level with our Diffuser Adapters at Glow LEDs. Shop Screw On Diffusers, LED Adapters, and Diffuser Cap Adapters. Click to Shop.',
		glow_strings:
			'Decorate your home and festival with these stunning glow strings at Glow LEDs. Shop String Lights, LED Strips, and Addressable LEDs. Click to Shop.',
		glowskins:
			'Take your gloving light shows to the next level with our Glowskins at Glow LEDs. Shop Diffuser Skins, LED Skins, and Diffuser Casing Combo. Click to Shop.'
		// infinity_mirrors:
		// 	'Decorate your home and festival with these stunning Glowskins at Glow LEDs. Shop Addressable LED Mirrors, LED Mirrors, and Custom Glowskins. Click to Shop.'
	};

	const description_determination = () => {
		if (category === 'frosted_diffusers') {
			return descriptions.frosted_diffusers;
		}
		if (category === 'diffuser_adapters') {
			return descriptions.diffuser_adapters;
		}
		if (category.toLowerCase() === 'diffuser_caps') {
			return descriptions.diffuser_caps;
		}
		// if (category === 'infinity_mirrors') {
		// 	return descriptions.infinity_mirrors;
		// }
		if (category === 'glowskins') {
			return descriptions.glowskins;
		}
		if (category === 'glow_strings') {
			return descriptions.glow_strings;
		} else {
			return descriptions.all_products;
		}
	};
	// console.log({ category });

	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest' ];
	// const filter_options = [
	// 	'spectra EVOs',
	// 	'chroma EVOs',
	// 	'Uber Nanos',
	// 	'Aurora Nanos',
	// 	'QtLite 6 Mode',
	// 	'Atoms',
	// 	'Ions',
	// 	'Apollos',
	// 	'Aethers',
	// 	'OSM 2s',
	// 	'Micromax'
	// ];

	return (
		<div>
			<Helmet>
				<title>{category ? humanize(category) : 'Products'} | Glow LEDs</title>
				<meta property="og:title" content={category ? humanize(category) : 'Products'} />
				<meta name="twitter:title" content={category ? humanize(category) : 'Products'} />
				<link rel="canonical" href="https://www.glow-leds.com/collections/all/products" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/all/products" />
				<meta name="description" content={description_determination()} />
				<meta property="og:description" content={description_determination()} />
				<meta name="twitter:description" content={description_determination()} />
			</Helmet>
			<div className="jc-c">
				<div className="row">
					<h1>
						{category === 'diffuser_caps' ? (
							humanize('diffuser_caps')
						) : (
							`${humanize(category)} ${subcategory && humanize(subcategory)}` || 'Products'
						)}
					</h1>
					<label style={{ color: '#d2cfcf', marginTop: '10px' }}>
						{category === 'diffuser_caps' ||
						category === 'diffuser_adapters' ||
						category === 'mega_diffuser_caps' ||
						category === 'mini_diffuser_adapters' ||
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
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
				{/* {category === 'glowskins' && <Filter filterHandler={filterHandler} filter_options={chips_list} />} */}
				<Filter filterHandler={filterHandler} filter_options={chips_list} />
			</div>
			<Loading loading={loading} error={error}>
				{best_sellers && (
					<div>
						<div className="product_big_screen">
							{alternative_products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{products.length === 0 &&
										alternative_products.map(
											(product, index) =>
												!product.hidden && (
													<Product
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
							{products.length === 0 &&
							alternative_products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{alternative_products.map(
										(product, index) =>
											!product.hidden && (
												<ProductSmallScreen
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
				{/* {essentials && !best_sellers(
					<div>
						<div className="product_big_screen">
							{essentials && (
								<ul className="products" style={{ marginTop: 0 }}>
									{products.length === 0 &&
										essentials.map(
											(product, index) =>
												!product.hidden && (
													<Product
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
							{products.length === 0 &&
							essentials && (
								<ul className="products" style={{ marginTop: 0 }}>
									{essentials.map(
										(product, index) =>
											!product.hidden && (
												<ProductSmallScreen
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
				)} */}
				{products && (
					<div>
						<div className="product_big_screen">
							{products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{products.map(
										(product, index) =>
											!product.hidden && (
												<Product
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
									{products.map(
										(product, index) =>
											!product.hidden && (
												<ProductSmallScreen
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
