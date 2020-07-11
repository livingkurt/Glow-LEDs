import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index';
import { FlexContainer } from '../components/ContainerComponents/index';

const AllProductsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.id ? props.match.params.id : '';
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listProducts(''));
	}, []);

	useEffect(
		() => {
			dispatch(listProducts(category));
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
			<FlexContainer h_center>
				<h1>{category || 'All Products'}</h1>
			</FlexContainer>

			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} />
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			{loading ? (
				<FlexContainer h_center>
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>{error}</h3>
				</FlexContainer>
			) : (
				<ul className="products" style={{ marginTop: 0 }}>
					{products.map(
						(product, index) =>
							!product.hidden ? <Product key={index} product={product} /> : <div key={index} />
					)}
				</ul>
			)}
		</div>
	);
};
export default AllProductsPage;
