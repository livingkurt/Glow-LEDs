import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { Product, Search, Sort } from '../components/SpecialtyComponents/index';
import { FlexContainer } from '../components/ContainerComponents/index';
import { Loading } from '../components/UtilityComponents';

const AllProductsPage = (props) => {
	const history = useHistory();
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.id ? props.match.params.id : '';
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(listProducts(''));
		dispatch(listProducts(category));
	}, []);

	useEffect(
		() => {
			if ([ 'Caps', 'Infinity', 'Accessories', 'Domes', 'Adapters', 'StringLights' ].includes(category)) {
				dispatch(listProducts(category));
			} else {
				history.push('/allproducts');
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
			<FlexContainer h_center>
				<h1>{category || 'All Products'}</h1>
			</FlexContainer>
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} />
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{products && (
					<ul className="products" style={{ marginTop: 0 }}>
						{products.map((product, index) => !product.hidden && <Product key={index} product={product} />)}
					</ul>
				)}
			</Loading>
		</div>
	);
};
export default AllProductsPage;
