// React
import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import './product.css';
// Components
import { Label } from '../../UtilityComponents/index';

function Product(props) {
	return (
		<li key={props.product._id}>
			<div className="product">
				<Link to={'/product/' + props.product._id}>
					<img className="product-image" src={props.product.display_image} alt="product" />
				</Link>
				<Label styles={{ fontSize: '13' }}>{props.product.brand}</Label>
				<Link to={'/product/' + props.product._id}>
					<Label styles={{ fontSize: '16px' }}>{props.product.name}</Label>
				</Link>
				<Label className="product-price">${props.product.price.toFixed(2)}</Label>
			</div>
		</li>
	);
}

export default Product;
