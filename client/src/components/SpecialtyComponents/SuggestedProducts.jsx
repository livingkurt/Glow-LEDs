// React
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../UtilityComponents';
import { ProductItemD } from '../DesktopComponents';
// import Slider from './Slider';

const SuggestedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	return (
		<div className="mh-10px">
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Suggested Products
			</h2>

			<Loading loading={loading} error={error}>
				<div className="row p-10px" style={{ overflowX: 'scroll' }}>
					{products &&
						products
							.filter((product) => !product.option)
							.map(
								(item, index) =>
									!item.hidden && (
										<ProductItemD
											key={index}
											size="175px"
											product={item}
											styles={{ marginRight: 20, listStyleType: 'none' }}
										/>
									)
							)}
				</div>
			</Loading>
		</div>
	);
};

export default SuggestedProducts;
