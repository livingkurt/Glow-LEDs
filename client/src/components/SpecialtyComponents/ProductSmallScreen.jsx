// React
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart } from '../../actions/cartActions';

const ProductSmallScreen = (props) => {
	const dispatch = useDispatch();

	// console.log(props.product && props.product.pathname);

	const handleAddToCart = () => {
		dispatch(addToCart(props.product.pathname, 1));
	};

	const sale_price_switch = () => {
		if (props.product.sale_price !== 0) {
			return (
				<label className="">
					<del style={{ color: 'red' }}>
						<label className="" style={{ color: 'white' }}>
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

	return (
		<li key={props.product.pathname} className=" w-100per" style={props.styles}>
			<Link to={'/collections/all/products/' + props.product.pathname}>
				<div className="small_screen_product row">
					<div className="">
						<LazyLoadImage
							className="product-image w-200px h-200px "
							alt={props.product.name}
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
								<div className="">{sale_price_switch()}</div>
							)}
						</div>
						{/* <div className="h-100per">
							<div>
								<ul style={{ marginLeft: '10px' }}>
									{props.product.included_items ? (
										props.product.included_items.split('\n').map((line, index) => {
											return (
												<li key={index} style={{ listStyleType: 'disc' }}>
													{line}
												</li>
											);
										})
									) : (
										props.product.included_items
									)}
								</ul>
							</div>
						</div> */}

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
