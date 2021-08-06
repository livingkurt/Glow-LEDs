// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { determine_product_name_display, sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { Rating } from '../SpecialtyComponents';
import { LazyImage } from '../UtilityComponents';

// import Resizer from 'react-image-file-resizer';

const ProductItemD = (props) => {
	const [ image_number, set_image_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);
	const [ image, set_image ] = useState(props.product.name);
	const [ images, set_images ] = useState(props.product.images);

	const move_left = (e) => {
		e.preventDefault();
		if (image_number !== 0) {
			set_image_number((image_number) => {
				return image_number - 1;
			});
		} else {
			set_image_number(images.length - 1);
		}
	};
	const move_right = (e) => {
		e.preventDefault();
		if (image_number !== props.product.images.length - 1) {
			set_image_number((image_number) => {
				return image_number + 1;
			});
		} else {
			set_image_number(0);
		}
	};
	return (
		<li key={props.product.pathname} className="product-thumb" style={props.styles}>
			{props.product_occurrences && (
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="product">
							<Link to={'/collections/all/products/' + props.product.pathname} className="m-auto">
								<div className="row mt-15px">
									<div className="column ai-c pos-rel">
										{/* <Link to={'/collections/all/products/' + item.pathname}> */}
										{images.length === 1 && (
											<LazyImage
												look="product-image"
												alt={props.product.name}
												title="Product Image"
												size={{ height: props.size, width: props.size }}
												effect="blur"
												src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
											/>
										)}
										{images.length > 1 && (
											// <div className="image-btn-container">
											<div style={{ overflowX: 'scroll' }}>
												<div className="jc-b w-100per pos-rel ">
													{images.length > 1 && (
														<div className="ai-c pos-abs left-0px top-125px image-btn">
															<button
																style={{ backgroundColor: 'transparent' }}
																className="btn icon "
																onClick={(e) => move_left(e)}
															>
																<i className="fas fa-chevron-left fs-40px" />
															</button>
														</div>
													)}
													{[ ...Array(1).keys() ].map((x) => (
														<LazyImage
															key={image_number + x}
															look="product-image"
															alt={image}
															title="Product Image"
															size={{ height: props.size, width: props.size }}
															effect="blur"
															src={images[image_number + x]} // use normal <img> attributes as props
														/>
													))}
													{images.length > 1 && (
														<div className="ai-c pos-abs right-0px top-125px image-btn">
															<button
																style={{ backgroundColor: 'transparent' }}
																className="btn icon "
																onClick={(e) => move_right(e)}
															>
																<i className="fas fa-chevron-right fs-40px" />
															</button>
														</div>
													)}
													{/* </div> */}
												</div>
											</div>
										)}
										{/* <LazyImage
											src={props.product.images && props.product.images[0]}
											alt={props.product.name}
										/> */}
										{props.product_occurrences &&
										props.product_occurrences[0] &&
										props.product_occurrences[0].name === props.product.name && (
											<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
												<img
													className=" mt-3px ml-2px h-100px w-100px"
													alt={props.product.name}
													title="Product Image"
													src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
												/>
											</div>
										)}
										{props.product_occurrences &&
										props.product_occurrences[1] &&
										props.product_occurrences[1].name === props.product.name && (
											<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
												<img
													className=" mt-3px ml-2px h-100px w-100px"
													alt={props.product.name}
													title="Product Image"
													src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
												/>
											</div>
										)}
										{props.product_occurrences &&
										props.product_occurrences[2] &&
										props.product_occurrences[2].name === props.product.name && (
											<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
												<img
													className=" mt-3px ml-2px h-100px w-100px"
													alt={props.product.name}
													title="Product Image"
													src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
												/>
											</div>
										)}
										{props.product_occurrences &&
										props.product_occurrences[3] &&
										props.product_occurrences[3].name === props.product.name && (
											<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
												<img
													className=" mt-3px ml-2px h-100px w-100px"
													alt={props.product.name}
													title="Product Image"
													src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
												/>
											</div>
										)}
										{props.product_occurrences &&
										props.product_occurrences[4] &&
										props.product_occurrences[4].name === props.product.name && (
											<div className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c top-0px left-5px">
												<img
													className=" mt-3px ml-2px h-100px w-100px"
													alt={props.product.name}
													title="Product Image"
													src="https://images2.imgbox.com/37/cb/FOp4J3VP_o.png"
												/>
											</div>
										)}
									</div>
								</div>
							</Link>

							<label style={{ fontSize: '1.3rem' }}>{props.product.brand}</label>
							<Link to={'/collections/all/products/' + props.product.pathname}>
								<label style={{ fontSize: '1.6rem' }}>
									{determine_product_name_display(props.product, false)}
								</label>
							</Link>

							<label className="product-price">
								{sale_price_product_option_switch(props.product, props.product.product_options)}
							</label>

							{props.product.rating ? (
								<Rating rating={props.product.rating} numReviews={props.product.numReviews} />
							) : (
								<span className="rating vis-hid ta-c">No Reviews</span>
							)}
						</div>
					</div>
				</div>
			)}
		</li>
	);
};

export default ProductItemD;
