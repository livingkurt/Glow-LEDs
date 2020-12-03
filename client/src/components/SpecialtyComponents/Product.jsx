// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { ImageLoad } from '../UtilityComponents';
// import Resizer from 'react-image-file-resizer';

const Product = (props) => {
	const sale_price_switch = () => {
		if (props.product.sale_price !== 0) {
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
		} else if (!props.product.countInStock) {
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
			return <label>${props.product.price ? props.product.price.toFixed(2) : props.product.price}</label>;
		}
	};

	// useEffect(
	// 	() => {
	// 		onChange();
	// 		return () => {};
	// 	},
	// 	[ props.product.images ]
	// );

	// const resizeFile = (file) =>
	// 	new Promise((resolve) => {
	// 		Resizer.imageFileResizer(
	// 			file,
	// 			300,
	// 			300,
	// 			'JPEG',
	// 			5,
	// 			0,
	// 			(uri) => {
	// 				resolve(uri);
	// 			},
	// 			'base64'
	// 		);
	// 	});

	// const onChange = async (image_) => {
	// 	const file = image_;
	// 	const image = await resizeFile(file);
	// 	console.log(image);
	// 	return image;
	// };

	return (
		<li key={props.product.pathname} style={props.styles}>
			<div className="tooltip">
				<div className="tooltipoverlay">
					{/* <span className="tooltiptext">
						{props.product.name === 'Diffuser Caps + Adapters Starter Kit' ||
						props.product.name === 'Mega Diffuser Caps + Adapters Starter Kit' ? (
							<div />
						) : props.product.name === 'Custom Infinity Mirror' ? (
							<Link to="/pages/contact/custom_orders">
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
					</span> */}
					<div className="product">
						<Link to={'/collections/all/products/' + props.product.pathname}>
							<LazyLoadImage
								className="product-image"
								alt={props.product.name}
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
							/>
							{/* <ImageLoad
								src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
								placeholder={onChange(props.product.images && props.product.images[0])}
								alt={props.product.name}
								style={{ height: props.size, width: props.size }}
								className="product-image"
							/> */}
						</Link>

						<label style={{ fontSize: '1.3rem' }}>{props.product.brand}</label>
						<Link to={'/collections/all/products/' + props.product.pathname}>
							<label style={{ fontSize: '1.6rem' }}>{props.product.name}</label>
						</Link>
						{props.product.name === 'Custom Infinity Mirror' ? (
							<label className="product-price">
								$549.99 - $<i className="fas fa-arrow-up" />
							</label>
						) : (
							<label className="product-price">{sale_price_switch()}</label>
						)}

						{props.product.rating ? (
							<Rating value={props.product.rating} text={props.product.numReviews + ' reviews'} />
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
