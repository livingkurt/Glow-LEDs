// React
import React from 'react';
import { Link } from 'react-router-dom';
import { determine_product_name_display, sale_price_switch } from '../../utils/react_helper_functions';
import { Rating } from '../SpecialtyComponents';
import { LazyImage } from '../UtilityComponents';

const ProductOptionItemM = (props) => {
	// return (
	// 	<li key={props.product.pathname} className=" w-100per" style={props.styles}>
	// 		{props.product_occurrences && (
	// 			<Link to={'/collections/all/products/' + props.product.pathname}>
	// 				<div className="small_screen_product row">
	// 					<div className="row mt-15px">
	// 						<div className="column ai-c pos-rel">
	// 							<LazyImage
	// 								className="product-image w-200px h-200px "
	// 								alt={props.product.name}
	// 								title="Product Image"
	// 								size={{ height: props.size, width: props.size }}
	// 								effect="blur"
	// 								src={props.product.images && props.product.images[0]}
	// 							/>
	// 						</div>
	// 					</div>
	// 					<div className="p-10px">
	// 						<div className="product_text" style={{ fontSize: '1.6rem' }}>
	// 							{determine_product_name_display(props.product, false)}
	// 						</div>
	// 						<div className="product_text mt-10px">
	// 							{props.product.name === 'Custom Infinity Mirror' ? (
	// 								<div className="">
	// 									$549.99 - $<i className="fas fa-arrow-up" />
	// 								</div>
	// 							) : (
	// 								<div className="">
	// 									{sale_price_switch(props.product, props.product.product_options)}
	// 								</div>
	// 							)}
	// 						</div>
	// 						{props.product.rating ? (
	// 							<Rating
	// 								rating={props.product.rating}
	// 								numReviews={props.product.numReviews}
	// 							/>
	// 						) : (
	// 							<span className="rating vis-hid ta-c">No Reviews</span>
	// 						)}
	// 					</div>
	// 				</div>
	// 			</Link>
	// 		)}
	// 	</li>
	// );
};

export default ProductOptionItemM;
