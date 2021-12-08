import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import { Rating } from '.';
import { API_Products } from '../../utils';
import { humanize, prnt, shuffle } from '../../utils/helper_functions';
import { determine_product_name_display, sale_price_switch } from '../../utils/react_helper_functions';
import useWindowDimensions from '../Hooks/windowDimensions';
import { LazyImage } from '../UtilityComponents';

const RelatedProductsSlideshow = ({
	product,
	secondary_images,
	className,
	interval,
	transitionTime,
	random,
	title,
	product_pathname
}) => {
	const { height, width } = useWindowDimensions();

	const [ products, set_products ] = useState([]);
	const [ loading, set_loading ] = useState(false);

	const history = useHistory();

	useEffect(
		() => {
			if (product.category) {
				get_products(product.category);
			} else {
				get_products('all');
			}
		},
		[ product.category ]
	);

	const get_products = async (category) => {
		set_loading(true);
		const { data } = await API_Products.get_products_by_category(category);
		console.log({ data });
		set_products(typeof data === 'object' && data.filter((product) => product.pathname !== product_pathname));
		if (random) {
			set_products(
				typeof data === 'object' && shuffle(data.filter((product) => product.pathname !== product_pathname))
			);
		}
		set_loading(false);
	};

	const [ image_number, set_image_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);
	// const [ image, set_image ] = useState(product.name);
	// const [ images, set_images ] = useState(product.images);

	// const move_left = (e) => {
	// 	e.preventDefault();
	// 	if (image_number !== 0) {
	// 		set_image_number((image_number) => {
	// 			return image_number - 1;
	// 		});
	// 	} else {
	// 		set_image_number(images.length - 1);
	// 	}
	// };
	// const move_right = (e) => {
	// 	e.preventDefault();
	// 	if (image_number !== product.images.length - 1) {
	// 		set_image_number((image_number) => {
	// 			return image_number + 1;
	// 		});
	// 	} else {
	// 		set_image_number(0);
	// 	}
	// };
	return (
		<Carousel
			infiniteLoop={true}
			// useKeyboardArrows={false}
			autoPlay={false}
			showArrows={true}
			// showIndicators={true}
			showStatus={false}
			// showThumbs={true}
			// interval={interval}
			centerMode={true}
			centerSlidePercentage={33.33}
			swipeable={true}
			// transitionTime={transitionTime}
			// selectedItem={start}
			emulateTouch={true}
			// animationHandler="fade"
			// selectedItem={Math.floor(Math.random() * products.length)}
			// className="w-100per h-auto"
		>
			{products &&
				products.map((product, index) => (
					<li key={product.pathname} className="product-thumb">
						<div className="tooltip">
							<div className="tooltipoverlay">
								<div className="product">
									<Link
										to={{
											pathname: '/collections/all/products/' + product.pathname,
											previous_path: history.location.pathname
										}}
										className="m-auto"
									>
										<div className="row mt-15px">
											<div className="column ai-c pos-rel">
												{/* <Link to={'/collections/all/products/' + item.pathname}> */}
												{product.images.length === 1 && (
													<LazyImage
														className="product-image"
														alt={product.name}
														title="Product Image"
														size={{ height: 400, width: 400 }}
														effect="blur"
														src={product.images && product.images[0]}
													/>
												)}
												{product.images.length > 1 && (
													// <div className="image-btn-container">
													<div>
														<div className="jc-b w-100per pos-rel ">
															{/* {product.images.length > 1 && (
																<div className="ai-c pos-abs left-0px top-125px image-btn">
																	<button
																		style={{ backgroundColor: 'transparent' }}
																		className="btn icon "
																		onClick={(e) => move_left(e)}
																	>
																		<i className="fas fa-chevron-left fs-40px" />
																	</button>
																</div>
															)} */}
															{[ ...Array(1).keys() ].map((x) => (
																<LazyImage
																	key={image_number + x}
																	className="product-image"
																	alt={'Product'}
																	title="Product Image"
																	size={{ height: 400, width: 400 }}
																	effect="blur"
																	// src={images[image_number + x]}
																	src={product.images[0]}
																/>
															))}
															{/* {product.images.length > 1 && (
																<div className="ai-c pos-abs right-0px top-125px image-btn">
																	<button
																		style={{ backgroundColor: 'transparent' }}
																		className="btn icon "
																		onClick={(e) => move_right(e)}
																	>
																		<i className="fas fa-chevron-right fs-40px" />
																	</button>
																</div>
															)} */}
															{/* </div> */}
														</div>
													</div>
												)}
												{/* {[ ...Array(12).keys() ].map(
										(x, index) =>
											product_occurrences &&
											product_occurrences[index] &&
											product_occurrences[index].name === product.name && (
												<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
													<img
														className=" mt-3px ml-2px h-100px w-100px"
														alt={product.name}
														title="Product Image"
														src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
													/>
												</div>
											)
									)} */}
											</div>
										</div>
									</Link>

									{/* <label className="mt-5px title_font" style={{ fontSize: '14px' }}>
							{product.brand}
						</label> */}
									<Link
										to={{
											pathname: '/collections/all/products/' + product.pathname,
											previous_path: history.location.pathname
										}}
										className="mt-13px"
									>
										<label style={{ fontSize: '1.6rem' }}>
											{determine_product_name_display(product, false)}
										</label>
									</Link>

									<label className="product-price mv-3px">{sale_price_switch(product, false)}</label>

									{product.rating ? (
										<Rating rating={product.rating} numReviews={product.numReviews} />
									) : (
										<span className="rating vis-hid ta-c">No Reviews</span>
									)}
								</div>
							</div>
						</div>
					</li>
				))}
		</Carousel>
	);
};

export default RelatedProductsSlideshow;
