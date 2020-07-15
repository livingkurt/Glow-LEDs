// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FlexContainer } from '../ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from './Product';
// Components

const RelatedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading: loadingProducts, error: errorProducts } = productList;

	useEffect(() => {
		dispatch(listProducts(''));
	}, []);

	const render_related_products = () => {
		console.log({ products });
		console.log({ products: products[0] });
		console.log({ products: products[1] });
		// return products.map((item, index) => {
		// 	console.log({ item });
		// 	if (!item.hidden && item.category && item.category === product.category && item._id !== product._id) {
		// 		return <Product key={index} product={item} styles={{ marginRight: 20, listStyleType: 'none' }} />;
		// 	}
		// 	// item.category === product.category && item._id !== product._id &&
		// });
		// item.category === undefined ? (
		//   <div>Loading...</div>
		// ) : item.category === product.category && item._id !== product._id && !item.hidden ? (
		//   <Product
		//     key={index}
		//     product={item}
		//     styles={{ marginRight: 20, listStyleType: 'none' }}
		//   />
		// ) : (
		//   <div />
		// )

		// {products.map(
		//   (item, index) =>
		//     !item.hidden ? !product.category ? (
		//       <div />
		//     ) : item.category === product.category && item._id !== product._id ? (
		//       <Product
		//         key={index}
		//         product={item}
		//         styles={{ marginRight: 20, listStyleType: 'none' }}
		//       />
		//     ) : (
		//       <div />
		//     ) : (
		//       <div />
		//     )
		// )}
	};

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
			<Loading loading={loadingProducts} error={errorProducts}>
				{products && (
					<FlexContainer row styles={{ overflowX: 'scroll', padding: '10px' }}>
						{/* {products.length > 0 && render_related_products()} */}
						{products.map(
							(item, index) =>
								!item.hidden ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								)
						)}
						{/* {products.map(
							(item, index) =>
								!item.hidden ? !product.category ? (
									<div />
								) : item.category === product.category && item._id !== product._id ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								) : (
									<div />
								)
						)} */}
						{/* {products.map(
							(item, index) => (!item.category ? console.log('Loading') : console.log(item.category))
							item.category === undefined ? (
								<div>Loading...</div>
							) : item.category === product.category && item._id !== product._id && !item.hidden ? (
								<Product
									key={index}
									product={item}
									styles={{ marginRight: 20, listStyleType: 'none' }}
								/>
							) : (
								<div />
							)
						)} */}
						{/* {products.map(
							(item, index) =>
								!item.hidden ? item._id !== product._id ? (
									<Product
										key={index}
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								) : (
									<div />
								) : (
									<div />
								)
						)} */}
					</FlexContainer>
				)}
			</Loading>
		</FlexContainer>
	);
};

export default RelatedProducts;
