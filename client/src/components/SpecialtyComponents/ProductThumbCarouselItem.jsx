// React
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';

const ProductThumbCarouselItem = (props) => {
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);

	const history = useHistory();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				set_loading(false);
			}
			return () => (clean = false);
		},
		[ props.product ]
	);

	return (
		<div>
			{!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<Link
						to={{
							pathname: product && '/collections/all/products/' + product.pathname,
							previous_path: history.location.pathname
						}}
					>
						<div className="product">
							<LazyImage
								className="product-image"
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

							{/* <label className="title_font" style={{ fontSize: '1.3rem' }}>
								{product.brand}
							</label> */}
							<label style={{ fontSize: '1.6rem' }} className="mt-10px">
								{product.name}
							</label>
							{product.name === 'Custom Infinity Mirror' ? (
								<label className="product-price">
									$549.99 - $<i className="fas fa-arrow-up" />
								</label>
							) : (
								<label className="product-price">
									{sale_price_switch(props.product, props.product.product_options)}
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

export default ProductThumbCarouselItem;
