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
				<h1 className="h1_title">{category || 'All Products'}</h1>
			</FlexContainer>

			<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} />
			<FlexContainer h_center>
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			<FlexContainer h_center styles={{ marginBottom: -12 }}>
				<h4 style={{ margin: 0 }}>Free Shipping on all Orders!</h4>
			</FlexContainer>
			{loading ? (
				<FlexContainer h_center column>
					<h2 style={{ fontSize: 25, textAlign: 'center' }}>Loading...</h2>
					<h2 style={{ fontSize: 20, textAlign: 'center' }}>
						If pages doesn't show in 5 seconds, refresh the page.
					</h2>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<h2 style={{ fontSize: 20 }}>{error}</h2>
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
