import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useHistory } from 'react-router-dom';
import { Rating } from '.';
import { API_Products } from '../../utils';
import { humanize, prnt, shuffle } from '../../utils/helper_functions';
import { determine_product_name_display, mobile_check, sale_price_switch } from '../../utils/react_helper_functions';
import useWindowDimensions from '../Hooks/windowDimensions';
import { LazyImage } from '../UtilityComponents';

const RelatedProductsSlideshow = ({ product, category, random, title, product_pathname }) => {
	const { height, width } = useWindowDimensions();

	const [ products, set_products ] = useState([]);
	const [ loading, set_loading ] = useState(false);

	const history = useHistory();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (product.category) {
					get_products(product.category);
				} else {
					get_products();
				}
			}
			return () => (clean = false);
		},
		[ product.category ]
	);

	const get_products = async () => {
		set_loading(true);
		let query = {};
		if (category === 'accessories') {
			query = { category: 'accessories', hidden: false, option: false };
		} else if (category === 'all') {
			query = { hidden: false, option: false };
		} else if (category === 'related') {
			query = { category: product.category, hidden: false, option: false };
		}

		const { data } = await API_Products.findAll_products_a(query);
		console.log({ data });
		set_products(
			typeof data === 'object' && data.products.filter((product) => product.pathname !== product_pathname)
		);
		if (random) {
			set_products(
				typeof data === 'object' &&
					shuffle(data.products.filter((product) => product.pathname !== product_pathname))
			);
		}
		set_loading(false);
	};

	const [ image_number, set_image_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);
	// const [ image, set_image ] = useState(product.name);
	// const [ images, set_images ] = useState(product.images);
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 8000, min: 1400 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 1400, min: 1100 },
			items: 4,
			slidesToSlide: 4 // optional, default to 1.
		},
		desktop_2: {
			breakpoint: { max: 1100, min: 900 },
			items: 3,
			slidesToSlide: 3 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 900, min: 464 },
			items: 2,
			slidesToSlide: 2 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};
	return (
		<div>
			<h2 className="jc-c w-100per ta-c">{title}</h2>

			<Carousel
				swipeable={mobile_check() ? true : false}
				draggable={true}
				// showDots={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				// autoPlay={mobile_check() ? false : true}
				autoPlaySpeed={1000}
				keyBoardControl={true}
				customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				removeArrowOnDeviceType={[ 'tablet', 'mobile' ]}
				deviceType={mobile_check() ? 'mobile' : 'desktop'}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
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
															size={{ height: 200, width: 200 }}
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
																		size={{ height: 200, width: 200 }}
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

										<label className="product-price mv-3px">
											{sale_price_switch(product, false)}
										</label>

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
		</div>
	);
};

export default RelatedProductsSlideshow;
