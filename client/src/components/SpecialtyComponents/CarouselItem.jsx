// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart } from '../../actions/cartActions';

const CarouselItem = (props) => {
	// console.log(product && product.pathname);
	// const pathname = product && product.pathname
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);

	const dispatch = useDispatch();

	// console.log(props.product && props.product.pathname);

	const handleAddToCart = () => {
		dispatch(addToCart(props.product.pathname, 1));
	};

	useEffect(
		() => {
			set_loading(false);
			return () => {};
		},
		[ props.product ]
	);

	const sale_price_switch = () => {
		if (props.product && props.product.sale_price !== 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>
							${props.product.price ? props.product.price.toFixed(2) : props.product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" /> ${props.product.sale_price ? (
						props.product.sale_price.toFixed(2)
					) : (
						props.product.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (props.product && !props.product.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }} className="ml-7px">
							${props.product.price ? props.product.price.toFixed(2) : props.product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" />
					<label className="ml-7px">Sold Out</label>
				</label>
			);
		} else {
			return (
				<label>
					${props.product && props.product.price ? (
						props.product.price.toFixed(2)
					) : (
						props.product && props.product.price
					)}
				</label>
			);
		}
	};

	return (
		<div>
			{!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<Link to={product && '/collections/all/products/' + product.pathname}>
						<div className="product">
							<LazyLoadImage
								className="product-image"
								alt={product.name}
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={product.images && product.images[0]} // use normal <img> attributes as props
							/>

							<label style={{ fontSize: '1.3rem' }}>{product.brand}</label>
							<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
							{product.name === 'Custom Infinity Mirror' ? (
								<label className="product-price">
									$549.99 - $<i className="fas fa-arrow-up" />
								</label>
							) : (
								<label className="product-price">{sale_price_switch()}</label>
							)}

							{product.rating ? (
								<Rating value={product.rating} text={product.numReviews + ' reviews'} />
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
