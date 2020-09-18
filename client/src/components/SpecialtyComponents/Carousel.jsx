// React
import React, { useEffect, useState } from 'react';
import { FlexContainer } from '../ContainerComponents';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import CarouselItem from './CarouselItem';
import { Loading } from '../UtilityComponents';

const Carousel = (props) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	const [ productss, set_productss ] = useState(products.filter((product) => product.hidden === false));

	useEffect(() => {
		dispatch(listProducts(''));
		// }
	}, []);

	const [ product_number, set_product_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);
	// const [ width, setWidth ] = useState(window.innerWidth);

	const move_left = () => {
		set_product_number((product_number) => {
			return product_number - 1;
		});
	};
	const move_right = () => {
		set_product_number((product_number) => {
			return product_number + 1;
		});
	};
	const handleWindowResize = (width) => {
		// setWidth(window.innerWidth);
		let result = 0;
		if (width > 1200 && width < 1450) {
			set_number_of_items(5);
			console.log(5);
			result = 5;
		} else if (width > 1000 && width < 1199) {
			set_number_of_items(4);
			console.log(4);
			result = 4;
		} else if (width > 700 && width < 999) {
			set_number_of_items(3);
			console.log(3);
			result = 3;
		} else if (width > 400 && width < 699) {
			set_number_of_items(2);
			console.log(2);
			result = 2;
		} else if (width > 0 && width < 399) {
			set_number_of_items(1);
			console.log(1);
			result = 1;
		}
		return result;
	};

	const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	function useCurrentWidth() {
		// save current window width in the state object
		let [ width, setWidth ] = useState(getWidth());
		// in this case useEffect will execute only once because
		// it does not have any dependencies.
		useEffect(() => {
			// timeoutId for debounce mechanism
			let timeoutId = null;
			let numberId = null;
			const resizeListener = () => {
				// prevent execution of previous setTimeout
				clearTimeout(timeoutId);
				clearTimeout(numberId);
				// change width from the state object after 150 milliseconds
				timeoutId = setTimeout(() => setWidth(getWidth()), 150);
				numberId = setTimeout(() => handleWindowResize(width), 150);
			};
			handleWindowResize(width);

			// set resize listener
			window.addEventListener('resize', resizeListener);
			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			};
		}, []);
		return width;
	}

	let width = useCurrentWidth();
	console.log({ width });

	// useEffect(() => {
	// 	// const handleWindowResize = () => setWidth(window.innerWidth);
	// 	window.addEventListener('resize', handleWindowResize);

	// 	// Return a function from the effect that removes the event listener
	// 	return () => window.removeEventListener('resize', handleWindowResize);
	// }, []);

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

			<Loading loading={loading} error={error}>
				{products && (
					<FlexContainer row styles={{ overflowX: 'scroll', padding: '10px' }}>
						<div className="row">
							{product_number != 0 && (
								<div className="ai-c">
									<button
										style={{ borderRadius: '50%' }}
										className="button icon h-59px"
										onClick={() => move_left()}
									>
										<i className="fas fa-arrow-circle-left fs-40px" />
									</button>
								</div>
							)}
							{[ ...Array(number_of_items).keys() ].map((x) => (
								<div className="w-20per">
									<CarouselItem
										key={product_number + x}
										size="175px"
										product={
											products.filter((product) => product.hidden === false)[product_number + x]
										}
										styles={{ marginRight: 20, listStyleType: 'none' }}
									/>
								</div>
							))}
							{product_number < products.filter((product) => product.hidden === false).length - 5 && (
								<div className="ai-c">
									<button
										style={{ borderRadius: '50%' }}
										className="button icon h-59px"
										onClick={() => move_right()}
									>
										<i className="fas fa-arrow-circle-right fs-40px" />
									</button>
								</div>
							)}
						</div>

						{/* )
						)} */}
					</FlexContainer>
				)}
			</Loading>
		</FlexContainer>
	);
};

export default Carousel;
