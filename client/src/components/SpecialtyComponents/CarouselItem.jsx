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
						<label style={{ color: 'white' }} className="ml-7px">
							${props.product.price ? props.product.price.toFixed(2) : props.product.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label className="ml-7px">Sold Out</label>
				</label>
			);
		} else {
			return <label>${props.product.price ? props.product.price.toFixed(2) : props.product.price}</label>;
		}
	};

	return (
		<div>
			{!loading && (
				<li key={product.pathname} style={props.styles}>
					<div class="tooltip">
						<div class="tooltipoverlay">
							{/* <span class="tooltiptext">
        {product.name === 'Diffuser Caps + Adapters Starter Kit' ||
        product.name === 'Mini Diffuser Caps + Adapters Starter Kit' ? (
          <div />
        ) : product.name === 'Custom Infinity Mirror' ? (
          <Link to="/pages/contact/custom_orders">
            <button className="button primary">Contact</button>
          </Link>
        ) : (
          <li>
            {product.countInStock > 0 ? (
              <button onClick={handleAddToCart} className="button primary">
                Quick Add to Cart
              </button>
            ) : (
              <button className="button inactive">Out of Stock</button>
            )}
          </li>
        )}
      </span> */}
							<div className="product">
								<Link to={'/collections/all/products/' + product.pathname}>
									<LazyLoadImage
										className="product-image"
										alt={product.name}
										style={{ height: props.size, width: props.size }}
										effect="blur"
										src={product.images && product.images[0]} // use normal <img> attributes as props
									/>
								</Link>

								<label style={{ fontSize: '1.3rem' }}>{product.brand}</label>
								<Link to={'/collections/all/products/' + product.pathname}>
									<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
								</Link>
								{product.name === 'Custom Infinity Mirror' ? (
									<label className="product-price">
										$549.99 - $<i class="fas fa-arrow-up" />
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
						</div>
					</div>
				</li>
			)}
		</div>
	);
};

export default CarouselItem;
