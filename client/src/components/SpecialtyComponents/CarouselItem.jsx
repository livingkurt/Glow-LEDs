// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { LazyImage } from '../UtilityComponents';
import { detailsProduct } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';

const CarouselItem = (props) => {
	const [ product, set_product ] = useState(props.product);
	const [ loading, set_loading ] = useState(true);
	const [ qty, set_qty ] = useState(1);
	const [ size, set_size ] = useState();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(
		() => {
			set_loading(false);
			return () => {};
		},
		[ props.product ]
	);

	const handleAddToCart = (e) => {
		e.preventDefault();
		// const value = JSON.parse(e.target.value);
		// console.log({ handleAddToCart: value });

		const color = product.color_products && product.color_products.find((color) => color.default_option === true);
		const secondary_color =
			product.secondary_color_products &&
			product.secondary_color_products.find((secondary_color) => secondary_color.default_option === true);
		const option =
			product.option_products && product.option_products.find((option) => option.default_option === true);
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
				size: size ? size : option ? option.size || option.name : null,
				color: color && color.color,
				secondary_color: secondary_color && secondary_color.secondary_color,
				display_image: product.images[0],
				price: product.price,
				sale_price: product.sale_price,
				sale_start_date: product.sale_start_date,
				sale_end_date: product.sale_end_date,
				quantity: product.quantity,
				weight_pounds: product.weight_pounds,
				weight_ounces: product.weight_ounces,
				package_length: product.package_length,
				package_width: product.package_width,
				package_height: product.package_height,
				package_volume: product.package_volume,
				pathname: product.pathname,
				category: product.category,
				subcategory: product.subcategory,
				qty,
				finite_stock: product.category
				// // determine_default_color(color),
				// diffuser_cap: diffuser_cap,
			})
		);
		// open_cart();
		// set_product_option({});
	};

	const [ show_options, set_show_options ] = useState(false);

	const update_option = (e) => {
		const option = JSON.parse(e.target.value);
		let button = document.getElementById(e.target.id);
		let buttons = document.querySelectorAll('.packs');
		buttons.forEach((node) => {
			node.classList.remove('active');
			node.classList.remove('secondary');
			node.classList.add('primary');
		});
		button.classList.add('secondary');
		button.classList.add('active');

		set_size(option.size);
	};

	return (
		<div>
			{product &&
			!loading && (
				<li key={props.product && product.pathname} style={props.styles}>
					<div className="tooltip">
						<span className="tooltiptext">
							<li>
								{product.quantity > 0 && props.add_to_cart ? (
									<div>
										{product.subcategory !== 'batteries' ? (
											<button onClick={handleAddToCart} className="btn primary">
												Quick Add to Cart
											</button>
										) : (
											<li>
												{!show_options && (
													<button
														onClick={() => set_show_options(true)}
														className="btn primary"
													>
														Quick Add to Cart
													</button>
												)}
												{show_options && (
													<div
														className="w-250px br-20px m-auto br-20px p-10px"
														style={{ backgroundColor: '#27272780', color: 'white' }}
													>
														<label
															aria-label="sortOrder"
															htmlFor="sortOrder"
															className="select-label mr-1rem mt-1rem"
														>
															{product.option_group_name ? (
																product.option_group_name
															) : (
																'Size'
															)}:
														</label>
														<div className="ai-c wrap jc-c">
															{product.option_products &&
																product.option_products.map((option, index) => (
																	<button
																		key={index}
																		id={option.name}
																		value={JSON.stringify(option)}
																		onClick={(e) => update_option(e)}
																		className={`packs fs-13px flex-s-0 min-w-40px mr-2px mb-1rem btn ${option.default_option
																			? 'secondary'
																			: 'primary'}`}
																	>
																		{option.size || option.name}
																	</button>
																))}
														</div>

														<div className="ai-c h-25px max-w-500px w-100per jc-b mb-10px">
															<label
																aria-label="sortOrder"
																htmlFor="sortOrder"
																className="select-label mr-1rem"
															>
																Qty:
															</label>
															<div className="custom-select">
																<select
																	defaultValue={qty}
																	className="qty_select_dropdown"
																	onChange={(e) => {
																		set_qty(e.target.value);
																	}}
																>
																	{[ ...Array(10).keys() ].map((x, index) => (
																		<option
																			key={index}
																			defaultValue={parseInt(x + 1)}
																		>
																			{parseInt(x + 1)}
																		</option>
																	))}
																</select>
																<span className="custom-arrow" />
															</div>
														</div>
														<button
															onClick={handleAddToCart}
															className="btn primary w-100per"
														>
															Add to Cart
														</button>
													</div>
												)}
											</li>
										)}
									</div>
								) : (
									<button className="button inactive">Out of Stock</button>
								)}
							</li>
						</span>
						<Link
							to={{
								pathname: product && '/collections/all/products/' + product.pathname,
								previous_path: history.location.pathname
							}}
							onClick={() => dispatch(detailsProduct(product.pathname))}
						>
							<div className="product">
								<LazyImage
									className="product-image"
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

								{/* <label style={{ fontSize: '1.3rem' }} className="title_font mt-5px ">
									{product.brand}
								</label> */}
								<label style={{ fontSize: '1.6rem' }} className="mv-5px">
									{product.name}
								</label>
								{product.name === 'Custom Infinity Mirror' ? (
									<label className="product-price">
										$549.99 - $<i className="fas fa-arrow-up" />
									</label>
								) : (
									<label className="product-price">{sale_price_switch(props.product)}</label>
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
