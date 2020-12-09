// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';

const ProductSmallScreen = (props) => {
	return (
		<li key={props.product.pathname} className=" w-100per" style={props.styles}>
			<Link to={'/collections/all/products/' + props.product.pathname}>
				<div className="small_screen_product row">
					<div className="">
						<LazyLoadImage
							className="product-image w-200px h-200px "
							alt={props.product.name}
							title="Product Image"
							effect="blur"
							src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
						/>
					</div>
					<div className="p-10px">
						<div className="product_text" style={{ fontSize: '1.6rem' }}>
							{props.product.name}
						</div>
						<div className="product_text mt-10px">
							{props.product.name === 'Custom Infinity Mirror' ? (
								<div className="">
									$549.99 - $<i className="fas fa-arrow-up" />
								</div>
							) : (
								<div className="">{sale_price_switch(props.product)}</div>
							)}
						</div>
						{props.product.rating ? (
							<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
						) : (
							<span className="rating vis-hid ta-c">No Reviews</span>
						)}
					</div>
				</div>
			</Link>
		</li>
	);
};

export default ProductSmallScreen;
