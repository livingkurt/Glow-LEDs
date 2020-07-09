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
				<label className="product-price">${props.product.price.toFixed(2)}</label>
				<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
			</div>
		</li>
	);
};

export default Product;
