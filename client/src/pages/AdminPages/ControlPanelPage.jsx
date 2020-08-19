import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const colors = {
	hidden: '#333333'
};

const ProductsPage = (props) => {
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listProducts());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (product) => {
		dispatch(deleteProduct(product.pathname));
	};

	const sale_price_switch = (product) => {
		if (product.sale_price !== 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" /> ${product.sale_price ? (
						product.sale_price.toFixed(2)
					) : (
						product.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (!product.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginRight: '7px' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label style={{ marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
		}
	};
	return (
		<div class="main_container">
			<MetaTags>
				<title>Control Panel | Glow LEDs</title>
			</MetaTags>
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</FlexContainer>
		</div>
	);
};
export default ProductsPage;
