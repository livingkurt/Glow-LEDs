import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index';
import { FlexContainer } from '../components/ContainerComponents/index';
import { Loading } from '../components/UtilityComponents';
import { humanize } from '../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const AllProductsPage = (props) => {
	const history = useHistory();
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	// console.log({ category });
	// console.log(props.match.params);
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(listProducts(''));
		dispatch(listProducts(category));
	}, []);

	// for (let product of products) {
	// 	console.log(product);
	// }
	// useEffect(() => {
	// 	// dispatch(listProducts(''));
	// 	for (let product of products) {
	// 		console.log(product);
	// 	}
	// }, []);

	useEffect(
		() => {
			if (
				[ 'caps', 'infinity_mirrors', 'accessories', 'domes', 'diffuser_adapters', 'string_lights' ].includes(
					category
				)
			) {
				dispatch(listProducts(category));
			} else {
				history.push('/collections/all/products');
				dispatch(listProducts(''));
			}
		},
		[ category ]
	);

	useEffect(
		() => {
			dispatch(listProducts(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listProducts(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(category, searchKeyword, e.target.value));
	};

	return (
		<div>
			<MetaTags>
				<title>Products | Glow LEDs</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
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
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<FlexContainer h_center>
				<h1>{humanize(category) || 'All Products'}</h1>
			</FlexContainer>
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{products && (
					<ul className="products" style={{ marginTop: 0 }}>
						{products.map(
							(product, index) =>
								!product.hidden && <Product size="300px" key={index} product={product} />
						)}
					</ul>
				)}
				{products.length === 0 && (
					<h2 style={{ textAlign: 'center' }}>Sorry we can't find anything wiht that name</h2>
				)}
			</Loading>
		</div>
	);
};
export default AllProductsPage;
