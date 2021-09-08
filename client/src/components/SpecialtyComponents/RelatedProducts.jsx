// React
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, detailsProduct } from '../../actions/productActions';
import { Loading } from '../UtilityComponents';
import { ProductItemD } from '../DesktopComponents';
import { API_Products } from '../../utils';

const RelatedProducts = (props) => {
	const dispatch = useDispatch();

	const [ products, set_products ] = useState([]);
	const [ loading, set_loading ] = useState(false);
	// const productList = useSelector((state) => state.productList);
	// const { products, loading, error } = productList;
	// console.log({ products });

	useEffect(
		() => {
			if (props.category) {
				// dispatch(listProducts(props.category));
				get_products(props.category);
			}
		},
		[ props.category ]
	);

	const get_products = async (category) => {
		set_loading(true);
		const { data } = await API_Products.get_products_by_category(category);
		console.log({ get_products: data });
		set_products(data.filter((product) => product.pathname !== props.product_pathname));
		set_loading(false);
	};

	// useEffect(
	// 	() => {
	// 		dispatch(detailsProduct(props.product_pathname));
	// 		return () => {};
	// 	},
	// 	[ props.product_pathname ]
	// );

	return (
		<div className="mh-10px">
			<h2 className="ta-c w-100per jc-c">Related Products</h2>
			<Loading loading={loading}>
				<div className="row p-10px overflow-s">
					{products &&
						products.map((item, index) => (
							<ProductItemD
								key={index}
								size="300px"
								product={item}
								styles={{ marginRight: 20, listStyleType: 'none' }}
							/>
						))}
				</div>
			</Loading>
		</div>
	);
};

export default RelatedProducts;
