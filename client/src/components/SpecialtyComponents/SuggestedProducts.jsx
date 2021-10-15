// React
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Loading } from '../UtilityComponents';
import { ProductItemD } from '../DesktopComponents';
// import Slider from './Slider';

const SuggestedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	// console.log({ products });

	// useEffect(() => {
	// 	// if (props.product) {
	// 	dispatch(listProducts(''));
	// 	// }
	// }, []);

	// buttonRight.onclick = function () {
	//   document.getElementById('container').scrollLeft += 20;
	// };
	// buttonLeft.onclick = function () {
	//   document.getElementById('container').scrollLeft -= 20;
	// };

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
			{/* <Slider /> */}

			<Loading loading={loading} error={error}>
				<div className="row p-10px" style={{ overflowX: 'scroll' }}>
					{products &&
						products.filter((product) => !product.option).map(
							(item, index) =>
								!item.hidden && (
									// <div className="embla__slide" key={index}>
									// 	<div className="embla__slide__inner">
									// 		<div className="embla__slide__img">

									<ProductItemD
										key={index}
										size="175px"
										product={item}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>

									// 		</div>
									// 	</div>
									// </div>
								)
						)}
				</div>
			</Loading>
		</div>
	);
};

export default SuggestedProducts;
