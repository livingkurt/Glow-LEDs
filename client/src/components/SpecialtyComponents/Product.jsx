// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';
// import Resizer from 'react-image-file-resizer';

const Product = (props) => {
	return (
		<li key={props.product.pathname} style={props.styles}>
			{props.product_occurrences && (
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="product">
							<Link to={'/collections/all/products/' + props.product.pathname} className="m-auto">
								<div className="row mt-15px">
									<div className="column ai-c pos-rel">
										{/* <Link to={'/collections/all/products/' + item.pathname}> */}
										<LazyImage
											look="product-image"
											alt={props.product.name}
											title="Product Image"
											size={{ height: props.size, width: props.size }}
											effect="blur"
											src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
										/>
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
								<label style={{ fontSize: '1.6rem' }}>{props.product.name}</label>
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

export default Product;
