// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';

const CarouselItem = (props) => {
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);

	useEffect(
		() => {
			set_loading(false);
			return () => {};
		},
		[ props.product ]
	);

	return (
		<div>
			{product &&
			!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<Link to={product && '/collections/all/products/' + product.pathname}>
						<div className="product">
							<LazyImage
								look="product-image"
								alt={product.name}
								title="Product Image"
								size={{ height: props.size, width: props.size }}
								effect="blur"
								src={product.images && product.images[0]}
							/>
							{/* <LazyLoadImage
								className="product-image"
								alt={product.name}
								title="Product Image"
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={product.images && product.images[0]} 
							/> */}

							<label style={{ fontSize: '1.3rem' }}>{product.brand}</label>
							<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
							{product.name === 'Custom Infinity Mirror' ? (
								<label className="product-price">
									$549.99 - $<i className="fas fa-arrow-up" />
								</label>
							) : (
								<label className="product-price">
									{sale_price_product_option_switch(props.product, props.product.product_options)}
								</label>
							)}

							{product.rating ? (
								<Rating rating={product.rating} numReviews={product.numReviews} />
							) : (
								<span className="rating vis-hid ta-c">No Reviews</span>
							)}
						</div>
					</Link>
				</li>
			)}
		</div>
	);
};

export default CarouselItem;
