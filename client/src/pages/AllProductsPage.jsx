import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index';
import { FlexContainer } from '../components/ContainerComponents/index';
import { Title } from '../components/UtilityComponents/index';

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
				<Title styles={{ fontSize: 40 }} class="h1_title">
					{category || 'All Products'}
				</Title>
			</FlexContainer>

			<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} />
			<FlexContainer h_center>
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			<FlexContainer h_center styles={{ marginBottom: 0 }}>
				<h4 style={{ margin: 0 }}>Free Shipping on all Orders!</h4>
			</FlexContainer>
			{loading ? (
				<FlexContainer h_center column>
					<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
					<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
						If pages doesn't show in 5 seconds, refresh the page.
					</Title>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<Title styles={{ fontSize: 20 }}>{error}</Title>
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
