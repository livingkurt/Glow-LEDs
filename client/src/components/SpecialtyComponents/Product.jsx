// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
// Components

const Product = (props) => {
	// console.log(props.product);
	return (
		<li key={props.product._id} style={props.styles}>
			<div className="product">
				<Link to={'/product/' + props.product._id}>
					<img className="product-image" src={props.product.display_image} alt="product" />
				</Link>
				<label styles={{ fontSize: '1.3rem' }}>{props.product.brand}</label>
				<Link to={'/product/' + props.product._id}>
					<label styles={{ fontSize: '1.6rem' }}>{props.product.name}</label>
				</Link>
				<label className="product-price">
					{props.product.sale_price !== 0 ? (
						<label>
							<del style={{ color: 'red' }}>
								<label style={{ color: 'white' }}>
									${props.product.price ? props.product.price.toFixed(2) : props.product.price}
								</label>
							</del>{' '}
							<i class="fas fa-arrow-right" /> ${props.product.sale_price ? (
								props.product.sale_price.toFixed(2)
							) : (
								props.product.sale_price
							)}{' '}
							On Sale!
						</label>
					) : (
						<label>${props.product.price ? props.product.price.toFixed(2) : props.product.price}</label>
					)}
				</label>
				<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
			</div>
		</li>
	);
};

export default Product;
