// React
import React, { useEffect } from 'react';
import { FlexContainer } from '../ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, detailsProduct } from '../../actions/productActions';
import Product from './Product';
import { Loading } from '../UtilityComponents';
import EmblaCarousel from './EmblaCarousel';
// import Slider from './Slider';

const SuggestedProducts = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	console.log({ products });

	useEffect(() => {
		// if (props.product) {
		dispatch(listProducts(''));
		// }
	}, []);

	// buttonRight.onclick = function () {
	//   document.getElementById('container').scrollLeft += 20;
	// };
	// buttonLeft.onclick = function () {
	//   document.getElementById('container').scrollLeft -= 20;
	// };

	return (
		<FlexContainer column styles={{ margin: '0 10px' }}>
			<h1
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				Suggested Products
			</h1>
			{/* <Slider /> */}

			<Loading loading={loading} error={error}>
				<FlexContainer row styles={{ overflowX: 'scroll', padding: '10px' }}>
					{/* <EmblaCarousel> */}
					{products &&
						products.map(
							(item, index) =>
								!item.hidden && (
									// <div className="embla__slide" key={index}>
									// 	<div className="embla__slide__inner">
									// 		<div className="embla__slide__img">

									<Product
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
					{/* </EmblaCarousel> */}
				</FlexContainer>
			</Loading>
		</FlexContainer>
	);
};

export default SuggestedProducts;
