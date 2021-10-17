// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { determine_product_name_display, sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';

const Product = (props) => {
	return (
		<li key={props.product.pathname} style={props.styles}>
			<div className="tooltip">
				<div className="tooltipoverlay">
					<div className="product">
						<Link to={'/collections/products/' + props.product.pathname} className="m-auto">
							<div className="row mt-15px">
								<div className="column ai-c pos-rel">
									{/* <Link to={'/collections/products/' + item.pathname}> */}
									<LazyImage
										className="product-image"
										alt={props.product.name}
										title="Product Image"
										size={{ height: props.size, width: props.size }}
										effect="blur"
										src={props.product.images && props.product.images[0]}
									/>
								</div>
							</div>
						</Link>

						<label style={{ fontSize: '1.3rem' }} className="title_font">
							{props.product.brand}
						</label>
						<Link to={'/collections/products/' + props.product.pathname}>
							<label style={{ fontSize: '1.6rem' }}>
								{determine_product_name_display(props.product, false)}
							</label>
						</Link>
						{props.product.name === 'Custom Infinity Mirror' ? (
							<label className="product-price">
								$549.99 - $<i className="fas fa-arrow-up" />
							</label>
						) : (
							<label className="product-price">
								{sale_price_product_option_switch(props.product, props.product.product_options)}
							</label>
						)}

						{props.product.rating ? (
							<Rating rating={props.product.rating} numReviews={props.product.numReviews} />
						) : (
							<span className="rating vis-hid ta-c">No Reviews</span>
						)}
					</div>
				</div>
			</div>
		</li>
	);
};

export default Product;
