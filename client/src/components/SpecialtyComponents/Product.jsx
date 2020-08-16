// React
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Product = (props) => {
	const history = useHistory();

	const handleAddToCart = () => {
		history.push('/checkout/cart/' + props.product.pathname + '?qty=1');
	};

	const sale_price_switch = () => {
		if (props.product.sale_price !== 0) {
			return (
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
			);
		} else if (!props.product.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginRight: '7px' }}>
							${props.product.price ? props.product.price.toFixed(2) : props.product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label style={{ marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${props.product.price ? props.product.price.toFixed(2) : props.product.price}</label>;
		}
	};

	return (
		<li key={props.product.pathname} style={props.styles}>
			<div class="tooltip">
				<div class="tooltipoverlay">
					<span class="tooltiptext">
						{props.product.name === 'Custom Infinity Mirror' ? (
							<Link to="/pages/contact/custon_orders">
								<button className="button primary">Contact</button>
							</Link>
						) : (
							<li>
								{props.product.countInStock > 0 ? (
									<button onClick={handleAddToCart} className="button primary">
										Quick Add to Cart
									</button>
								) : (
									<button className="button inactive">Out of Stock</button>
								)}
							</li>
						)}
					</span>
					<div className="product">
						<Link to={'/collections/all/products/' + props.product.pathname}>
							<LazyLoadImage
								className="product-image"
								alt={props.product.name}
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={props.product.display_image} // use normal <img> attributes as props
							/>
						</Link>

						<label style={{ fontSize: '1.3rem' }}>{props.product.brand}</label>
						<Link to={'/collections/all/products/' + props.product.pathname}>
							<label style={{ fontSize: '1.6rem' }}>{props.product.name}</label>
						</Link>
						{props.product.name === 'Custom Infinity Mirror' ? (
							<label className="product-price">
								$549.99 - $<i class="fas fa-arrow-up" />
							</label>
						) : (
							<label className="product-price">{sale_price_switch()}</label>
						)}
						{props.product.rating ? (
							<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
						) : (
							<span className="rating" style={{ textAlign: 'center', visibility: 'hidden' }}>
								No Reviews
							</span>
						)}
					</div>
				</div>
			</div>
		</li>
	);
};

export default Product;
