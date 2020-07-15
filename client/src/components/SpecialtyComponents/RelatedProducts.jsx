// React
import React, { useEffect } from 'react';
import { FlexContainer } from '../ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, detailsProduct } from '../../actions/productActions';
import Product from './Product';
import { Loading } from '../UtilityComponents';

const RelatedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	useEffect(
		() => {
			if (props.product) {
				dispatch(listProducts(props.product.category));
			}
		},
		[ props.product ]
	);

	useEffect(
		() => {
			dispatch(detailsProduct(props.product_id));
			return () => {};
		},
		[ props.product_id ]
	);

	return (
		<FlexContainer column styles={{ margin: '0 10px' }}>
			<h1
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Related Products
			</h1>
			<Loading loading={loading} error={error}>
				<FlexContainer row styles={{ overflowX: 'scroll', padding: '10px' }}>
					{products &&
						products.map(
							(item, index) =>
								!item.hidden &&
								props.product_id &&
								item._id !== props.product_id && (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								)
						)}
				</FlexContainer>
			</Loading>
		</FlexContainer>
	);
};

export default RelatedProducts;
