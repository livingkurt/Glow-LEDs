// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';
import { detailsProduct } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';

const CarouselItem = (props) => {
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(
		() => {
			set_loading(false);
			return () => {};
		},
		[ props.product ]
	);

	const handleAddToCart = () => {
		console.log({ handleAddToCart: product });
		const color = product.color_products.find((color) => color.default_option === true);
		const secondary_color = product.secondary_color_products.find(
			(secondary_color) => secondary_color.default_option === true
		);
		const option = product.option_products.find((option) => option.default_option === true);
		console.log({
			color,
			secondary_color,
			option
		});
		dispatch(
			addToCart({
				product: product._id,
				color_product: color && color,
				color_code: color && color.color_code,
				secondary_color_code: secondary_color && secondary_color.color_code,
				secondary_color_product: secondary_color && secondary_color,
				color_group_name: product.color_group_name,
				secondary_color_group_name: product.secondary_color_group_name,
				option_group_name: product.option_group_name,
				secondary_group_name: product.secondary_group_name,
				option_product: option && option,
				// option_product_name:,
				// secondary_product,
				// secondary_product_name,
				name: product.name,
				size: option ? option.size || option.name : null,
				color: color && color.color,
				secondary_color: secondary_color && secondary_color.secondary_color,
				display_image: product.images[0],
				price: product.price,
				sale_price: product.sale_price,
				countInStock: product.count_in_stock,
				weight_pounds: product.weight_pounds,
				weight_ounces: product.weight_ounces,
				package_length: product.package_length,
				package_width: product.package_width,
				package_height: product.package_height,
				package_volume: product.package_volume,
				pathname: product.pathname,
				category: product.category,
				subcategory: product.subcategory,
				qty: 1,
				finite_stock: product.category
				// // determine_default_color(color),
				// diffuser_cap: diffuser_cap,
			})
		);
		// open_cart();
		// set_product_option({});
	};

	return (
		<div>
			{product &&
			!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<div class="tooltip">
						<span class="tooltiptext">
							<li>
								{props.product.countInStock > 0 && props.add_to_cart ? (
									<button onClick={handleAddToCart} className="btn primary">
										Quick Add to Cart
									</button>
								) : (
									<button className="button inactive">Out of Stock</button>
								)}
							</li>
						</span>
						<Link
							to={product && '/collections/all/products/' + product.pathname}
							onClick={() => dispatch(detailsProduct(product.pathname))}
						>
							<div className="product">
								<LazyImage
									look="product-image"
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

								<label style={{ fontSize: '1.3rem' }}>{product.brand}</label>
								<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
								{product.name === 'Custom Infinity Mirror' ? (
									<label className="product-price">
										$549.99 - $<i className="fas fa-arrow-up" />
									</label>
								) : (
									<label className="product-price">
										{sale_price_product_option_switch(props.product, props.product.product_options)}
									</label>
								)}

								{product.rating ? (
									<Rating rating={product.rating} numReviews={product.numReviews} />
								) : (
									<span className="rating vis-hid ta-c">No Reviews</span>
								)}
							</div>
						</Link>
					</div>
				</li>
			)}
		</div>
	);
};

export default CarouselItem;
