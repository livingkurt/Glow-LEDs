import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import { Rating, Reviews, Slideshow, RelatedProducts, ReadMore } from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import Cookie from 'js-cookie';
import { Helmet } from 'react-helmet';
import { API_Products } from '../../utils';
import { addToCart } from '../../actions/cartActions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {
	determine_product_name,
	determine_product_name_title,
	sale_price_product_option_switch,
	sale_price_product_option_switch_product
} from '../../utils/react_helper_functions';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;
	const [ name, set_name ] = useState('');
	const [ description, set_description ] = useState('');
	const [ facts, set_facts ] = useState('');
	const [ included_items, set_included_items ] = useState('');
	const [ qty, setQty ] = useState(1);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ price, set_price ] = useState();
	const [ sale_price, set_sale_price ] = useState(0);
	const [ size, set_size ] = useState(0);
	const [ count_in_stock, set_count_in_stock ] = useState(30);
	const [ length, set_length ] = useState(0);
	const [ width, set_width ] = useState(0);
	const [ height, set_height ] = useState(0);
	const [ volume, set_volume ] = useState(0);
	const [ product_option, set_product_option ] = useState({});
	const [ image, set_image ] = useState('');
	const [ no_dropdown, set_no_dropdown ] = useState(false);
	const [ color, set_color ] = useState('');
	// const [ pathname, set_pathname ] = useState('');
	const [ option_color, set_option_color ] = useState('');
	const [ added_to_cart_message, set_added_to_cart_message ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ color_product, set_color_product ] = useState(null);
	const [ option_product, set_option_product ] = useState(null);
	const [ secondary_product, set_secondary_product ] = useState(null);
	const [ dimensions, set_dimensions ] = useState({});
	const [ secondary_product_name, set_secondary_product_name ] = useState('');
	const [ option_product_name, set_option_product_name ] = useState('');

	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;

	const dispatch = useDispatch();

	const open_cart = () => {
		const cart = document.querySelector('.cart_sidebar');
		console.log(cart.classList.value);
		if (cart.classList.value === 'cart_sidebar open') {
			document.querySelector('.cart_sidebar').classList.remove('open');
		} else if (cart.classList.value === 'cart_sidebar') {
			document.querySelector('.cart_sidebar').classList.add('open');
		}
	};

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.pathname));
		set_pathname(props.match.params.pathname);
		const video = document.getElementsByClassName('product_video');
		video.muted = true;
		video.autoplay = true;
	}, []);

	useEffect(
		() => {
			if (product) {
				set_image(product.images && product.images[0]);
				set_images(product.images);
				console.log({ images: product.images });

				if (product.price > 0) {
					set_price(product.price);
				}
				if (product.sale_price > 0) {
					set_sale_price(product.sale_price);
				}
				set_count_in_stock(product.countInStock);
				set_name(product.name);
				set_description(product.description);
				set_facts(product.facts);
				set_color(product.color);
				set_included_items(product.included_items);
				set_dimensions({
					weight_pounds: product.weight_pounds,
					weight_ounces: product.weight_ounces,
					package_length: product.package_length,
					package_width: product.package_width,
					package_height: product.package_height,
					package_volume: product.package_volume
				});
				set_product_option({});
				if (product.option_products) {
					const option = product.option_products.find((option) => option.default_option === true);
					console.log({ option });
					if (option) {
						if (option.size) {
							set_size(option.size);
						} else {
							set_size(option.name);
						}
						if (option.color) {
							set_color(option.color);
						}
						if (product.price > 0) {
							set_price(product.price);
						}
						if (product.sale_price > 0) {
							set_sale_price(product.sale_price);
						}
						if (option.countInStock) {
							set_count_in_stock(option.countInStock);
						}

						set_product_option(option);
						console.log({ images: option.images });
						if (option.images > 0) {
							set_images(option.images);
							set_image(option.images && option.images[0]);
						}
						set_dimensions({
							weight_pounds: option.weight_pounds,
							weight_ounces: option.weight_ounces,
							package_length: option.package_length,
							package_width: option.package_width,
							package_height: option.package_height,
							package_volume: option.package_volume
						});
						set_option_product(option._id);
						set_option_product_name(option.name);
					}
				}
				if (product.color_products) {
					const color = product.color_products.find((color) => color.default_option === true);
					console.log({ color });
					if (color) {
						set_color_product(color._id);
						set_color(color.color);
					}
				}
			}
		},
		[ product ]
	);

	useEffect(
		() => {
			if (error) {
				props.history.push('/collections/all/products');
			}
		},
		[ error ]
	);

	const handleAddToCart = () => {
		// console.log({ product_option });
		console.log({ handleAddToCart: images[0] });
		dispatch(
			addToCart({
				product: product._id,
				color_product,
				option_product,
				option_product_name,
				secondary_product,
				secondary_product_name,
				name,
				size,
				color,
				display_image: images[0],
				price,
				sale_price,
				countInStock: count_in_stock,
				weight_pounds: dimensions.weight_pounds,
				weight_ounces: dimensions.weight_ounces,
				package_length: dimensions.package_length,
				package_width: dimensions.package_width,
				package_height: dimensions.package_height,
				package_volume: dimensions.package_volume,
				pathname: props.match.params.pathname,
				category: product.category,
				product_option,
				qty,
				finite_stock: product.category
				// // determine_default_color(color),
				// diffuser_cap: diffuser_cap,
			})
		);
		open_cart();
		set_product_option({});
	};

	const update_color = (e) => {
		const option = JSON.parse(e.target.value);
		// set_name(option.name);

		if (option.description) {
			set_description(option.description);
		}
		if (option.facts) {
			set_facts(option.facts);
		}
		if (option.price !== 0 || option.price === null || option.price === undefined) {
			set_price(option.price);
		}
		if (option.sale_price !== 0 || option.sale_price === null || option.sale_price === undefined) {
			set_sale_price(option.sale_price);
		}
		set_color(option.color);
		if (option.images && option.images[0]) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		set_color_product(option._id);
	};

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

		if (option.size) {
			set_size(option.size);
		} else {
			set_size(option.name);
		}

		if (option.price > 0) {
			set_price(option.price);
		}
		if (option.sale_price > 0) {
			set_sale_price(option.sale_price);
		}
		if (option.description) {
			set_description(option.description);
		}
		if (option.facts) {
			set_facts(option.facts);
		}
		if (option.included_items) {
			set_included_items(option.included_items);
		}
		if (option.images && option.images[0]) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		set_dimensions({
			weight_pounds: option.weight_pounds,
			weight_ounces: option.weight_ounces,
			package_length: option.package_length,
			package_width: option.package_width,
			package_height: option.package_height,
			package_volume: option.package_volume
		});
		set_option_product(option._id);
		set_option_product_name(option.name);
	};

	const update_secondary = (e) => {
		const option = JSON.parse(e.target.value);
		if (option.images && option.images[0]) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		set_secondary_product(option._id);
		set_secondary_product_name(option.name);
	};

	return (
		<div className="">
			<div className="p-1rem">
				<div className="jc-b">
					<div className="mb-10px">
						<button className="btn secondary" onClick={() => props.history.goBack()}>
							Back to Products
						</button>
					</div>
					{userInfo &&
					userInfo.isAdmin && (
						<Link to={'/secure/glow/editproduct/' + props.match.params.pathname}>
							<button className="btn secondary" style={{ width: '156px' }}>
								Edit Product
							</button>
						</Link>
					)}
				</div>
			</div>
			<Loading loading={loading} error={error}>
				{product && (
					<div className="">
						<Helmet>
							<title>{product.meta_title + ' | Glow LEDs'}</title>
							<meta property="og:title" content={product.meta_title} />
							<meta name="twitter:title" content={product.meta_title} />
							<link
								rel="canonical"
								href={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							<meta
								property="og:url"
								content={'https://www.glow-leds.com/collections/all/products/' + product.pathname}
							/>
							{product.images && (
								<div>
									<meta
										property="og:image"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>

									<meta
										property="og:image:secure_url"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>
									<meta
										name="twitter:image"
										content={'https://www.glow-leds.com/' + product.images[0]}
									/>
								</div>
							)}
							<meta
								name="description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>

							<meta
								property="og:description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>

							<meta
								name="twitter:description"
								content={
									product.meta_description ? (
										product.meta_description
									) : (
										'Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings.'
									)
								}
							/>
						</Helmet>
						<div>
							{added_to_cart_message && (
								<div className="jc-c column">
									<div className="added_to_cart_message">
										<h2 className="ta-c">{added_to_cart_message}</h2>
										<p className="ta-c">Added to Cart!</p>
									</div>
								</div>
							)}
						</div>
						<div className="details">
							<div className="">
								<label className="product_title_top none fs-30px ff-h mb-2rem ta-c lh-50px">
									{name}
									{/* {determine_product_name(
											{
												...product,
												secondary_product_name:
													secondary_product_name && secondary_product_name,
												option_product_name: option_product_name && option_product_name,
												color: color && color,
												size: size && size
											},
											false
										)} */}
								</label>
								<div className="details-image">
									{/* <Zoom> */}
									<img
										id="expandedImg"
										alt={name}
										title={name}
										className="details-image-img"
										src={image}
										style={{
											maxWidth: '400px',
											maxHeight: '400px',
											height: '100%',
											width: '100%'
										}}
									/>
									{/* </Zoom> */}
									{/* <Zoom
										image={{
											src: { image },
											alt: 'Golden Gate Bridge',
											className: 'img',
											style: {
												maxWidth: '400px',
												maxHeight: '400px',
												height: '100%',
												width: '100%'
											}
										}}
										zoomImage={{
											src: { image },
											alt: 'Golden Gate Bridge'
										}}
									/> */}
								</div>
							</div>
							<Slideshow product={product} images={images} show_hide="alt_pictures_shown_shown" />
							<div className="details-info">
								<h1 className="product_title_side lh-50px fs-30px">
									{name}
									{/* {determine_product_name(
										{
											...product,
											secondary_product_name: secondary_product_name && secondary_product_name,
											option_product_name: option_product_name && option_product_name,
											color: color && color,
											size: size && size
										},
										false
									)} */}
								</h1>
								{/* <h1 className="product_title_side lh-50px fs-30px">
									{determine_product_name(
										{
											...product,
											secondary_product_name: secondary_product_name && secondary_product_name,
											option_product_name: option_product_name && option_product_name,
											color: color && color,
											size: size && size
										},
										false
									)}
								</h1> */}
								{color && (
									<div className="row">
										<h3 className="m-0px mr-5px">Color: </h3>
										{color}
									</div>
								)}
								{size && (
									<div className="row ai-c">
										<h3 className="mr-5px">{product.option_group_name || 'Size'}: </h3>
										{size}
									</div>
								)}
								{secondary_product && (
									<div className="row ai-c">
										<h3 className="mr-5px">Design: </h3>
										{secondary_product}
									</div>
								)}
								<div style={{ marginBottom: '15px', marginTop: '-9px' }}>
									<a href="#reviews">
										<Rating rating={product.rating} numReviews={product.numReviews + ' reviews'} />
									</a>
								</div>

								<div className="row">
									<h3 style={{ margin: 0, marginRight: 5 }}>Price: </h3>
									{/* {sale_price_product_option_switch_product(
										product,
										product.product_options,
										price,
										sale_price
									)} */}
									{console.log({ price })}
									{console.log({ sale_price })}
									{sale_price_product_option_switch_product(price, sale_price)}
								</div>

								<div className="">
									<div className="h-100per paragraph_font">
										<ul style={{ marginLeft: '10px' }}>
											{facts ? (
												facts.split('\n').map((line, index) => {
													return (
														<li
															key={index}
															style={{ listStyleType: 'disc' }}
															className="lh-2rem"
														>
															{line}
														</li>
													);
												})
											) : (
												facts
											)}
										</ul>
									</div>
								</div>
								<Slideshow
									product={product}
									images={images}
									show_hide="alt_pictures_hidden"
									set_image={set_image}
								/>
							</div>
							<div className="details-action">
								<ul>
									<div className="row">
										<label style={{ margin: 0, marginRight: 5 }}>Price: </label>
										{console.log({ price })}
										{/* {sale_price_product_option_switch_product(
											product,
											product.product_options,
											price
										)} */}

										{sale_price_product_option_switch_product(price, sale_price)}
									</div>

									<li>Status: {count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
									{product.secondary_product_group &&
									product.secondary_products &&
									product.secondary_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.secondary_group_name && product.secondary_group_name}s:
												</label>
												<div className="custom-select">
													<select
														className="qty_select_dropdown"
														onChange={(e) => update_secondary(e)}
													>
														<option key={1} defaultValue="">
															---Choose{' '}
															{product.secondary_group_name &&
																product.secondary_group_name}---
														</option>
														{product.secondary_products.map((secondary, index) => (
															<option key={index} value={JSON.stringify(secondary)}>
																{secondary.name.slice(0, -14)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}
									{product.color_product_group &&
									product.color_products &&
									product.color_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Colors:
												</label>
												<div className="custom-select">
													<select
														className="qty_select_dropdown"
														onChange={(e) => update_color(e)}
													>
														{/* <option key={1} defaultValue="">
															---Choose Color---
														</option> */}
														{product.color_products.map((color, index) => (
															<option key={index} value={JSON.stringify(color)}>
																{color.name.split(' ')[0]}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}
									{product.option_product_group &&
									product.option_products &&
									product.option_products.length > 0 && (
										<li>
											<div className="row">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem mt-1rem"
												>
													Options:
												</label>
												<div className="ai-c wrap">
													{product.option_products
														// .filter((option) => !option.dropdown)
														// .filter((option) => option.count_in_stock)
														.map((option, index) => (
															<button
																key={index}
																selected={option.default_option}
																id={option.name}
																value={JSON.stringify(option)}
																onClick={(e) => update_option(e)}
																className={`packs  flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option.default_option
																	? 'secondary'
																	: 'primary'}`}
															>
																{option.size || option.name}
															</button>
														))}
												</div>
											</div>
										</li>
									)}
									{/* {product.product_options &&
									product.product_options.length > 0 &&
									product.product_options.filter((option) => !option.dropdown).length > 0 && (
										<li>
											<div className="row">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem mt-1rem"
												>
													Options:
												</label>
												<div className="ai-c wrap">
													{product.product_options
														.filter((option) => !option.dropdown)
														.filter((option) => option.count_in_stock)
														.map((option, index) => (
															<button
																key={index}
																selected={option.default}
																id={option.name}
																value={JSON.stringify(option)}
																onClick={(e) =>
																	update_product(e, JSON.parse(e.target.value))}
																className={`packs  flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option.default
																	? 'secondary'
																	: 'primary'}`}
															>
																{option.name}
															</button>
														))}
												</div>
											</div>
										</li>
									)} */}

									{/* {product.option_product_group &&
									product.option_products &&
									product.option_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.option_group_name && product.option_group_name}s:
												</label>
												<div className="custom-select">
													<select
														className="qty_select_dropdown"
														onChange={(e) => update_product_images(e)}
													>
														<option key={1} defaultValue="">
															---Choose{' '}
															{product.option_group_name && product.option_group_name}---
														</option>
														{product.option_products.map((option, index) => (
															<option key={index} value={JSON.stringify(option)}>
																{option.name.split(' ')[0]}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)} */}

									{/* {product.products &&
									product.products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.group_name && product.group_name}s:
												</label>
												<div className="custom-select">
													<select
														// defaultValue={diffuser_cap_name}
														// value={diffuser_cap_name}
														className="qty_select_dropdown"
														onChange={(e) => update_product_images(e)}
													>
														<option key={1} defaultValue="">
															---Choose {product.group_name && product.group_name}---
														</option>
														{product.products.map(
															(cap, index) =>
																cap.name === 'Custom Diffuser Caps Deposit' ||
																cap.name === 'Diffuser Caps + Adapters Starter Kit' ? (
																	''
																) : (
																	<option key={index} value={JSON.stringify(cap)}>
																		{cap.name.split(' ')[0]}
																	</option>
																)
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)} */}

									{/* {product.product_options &&
									product.product_options.length > 0 &&
									product.product_options.filter((option) => option.dropdown).length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Color:
												</label>
												<div className="custom-select">
													<select
														defaultValue={color}
														// value={color}
														className="qty_select_dropdown"
														onChange={(e) => {
															// set_color(e.target.value);
															update_color(e, JSON.parse(e.target.value));
														}}
													>
														{!no_dropdown ? (
															product.product_options
																.filter((option) => option.dropdown)
																.map((option, index) => (
																	<option key={index} value={JSON.stringify(option)}>
																		{option.color}
																	</option>
																))
														) : (
															<option value={JSON.stringify(product_option)}>
																{product_option.color}
															</option>
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)} */}
									<li>
										<div className="ai-c h-25px">
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
														setQty(e.target.value);
													}}
												>
													{[ ...Array(count_in_stock).keys() ].map((x, index) => (
														<option key={index} defaultValue={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>

										<h4 className="mb-0px mt-11px">Shipping Calculated at Checkout</h4>
										<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
											{(product.category === 'glow_strings' ||
												product.name === 'coin_battery_holder') &&
												'	This item ships in 6 - 10 business day.'}
										</h4>

										<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
											{(product.category === 'exo_diffusers' ||
												product.category === 'frosted_diffusers' ||
												product.category === 'diffuser_caps' ||
												product.category === 'exo_diffusers') &&
												'	This item ships in 2 - 5 business day.'}
										</h4>
										<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
											{(product.category === 'glowskins' ||
												product.category === 'glow_casings') &&
												'	This item ships in 3 - 7 business day.'}
										</h4>
									</li>
									{product.name === 'Diffuser Caps + Adapters Starter Kit' && !secondary_product ? (
										<div />
									) : (
										<li>
											{count_in_stock > 0 ? (
												<button className="btn primary" onClick={handleAddToCart}>
													Add to Cart
												</button>
											) : (
												<button className="btn inactive">Out of Stock</button>
											)}
										</li>
									)}
								</ul>
							</div>
						</div>
						<Slideshow
							product={product}
							images={images}
							show_hide="alt_pictures_shown"
							set_image={set_image}
						/>
						<div className="p-1rem">
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							{/* <p className="paragraph_font">{product.description}</p> */}
							<ReadMore width={1000} className="paragraph_font" length={100}>
								{description}
							</ReadMore>
							{/* <ReadMore width={1000} className="paragraph_font">{product.description}</ReadMore> */}
							{/* <p className="paragraph_font">
								<ReadMore width={1000}React
									text={
										'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
									}
									min={80}
									ideal={100}
									max={200}
								/>
							</p> */}
							{product.category === 'glow_strings' && (
								<Link to="/pages/manual/glow_strings_v2_manual">
									<button className="btn primary w-100per fs-20px mb-2rem">
										View Glow Strings V2 Manual
									</button>
								</Link>
							)}
							{/* {product.category === 'glow_strings' && (
								<button className="btn primary w-100per fs-20px mb-2rem" onClick={open_pdf}>
									Download Glow Strings V2 Manual
								</button>
                
							)} */}
							{/* {product.category === 'glow_strings' && (
								<button className="btn primary w-100per fs-20px mb-2rem" onClick={() => open_pdf()}>
									<a href="/Glow_Strings_V2_Manual.png" target="_blank">
									Download Glow Strings V2 Manual
									</a>
								</button>
							)} */}
							{/* {product.category === 'glow_strings' && (
								<p>
									<span style="font-size: 130%;">
										<a
											href="https://ledgloves.com/wp-content/uploads/2017/10/UberNanoInfographic.pdf"
											target="_blank"
										>
											Download Test Here
										</a>
									</span>
								</p>
							)} */}
							{/* {product.category === 'glow_strings' && (
								// <button className="btn primary w-100per fs-20px mb-2rem">
								<object
									data="/Glow_Strings_V2_Manual.pdf"
									type="application/pdf"
									// width="100%"
									// height="100%"
								>
									<p>
										Your web browser doesn't have a PDF plugin. Instead you can{' '}
										<a href="/Glow_Strings_V2_Manual.pdf">click here to download the PDF file.</a>
									</p>
								</object>
								// </button>
							)} */}
							{/* {!product.product_length && (
								<div className="">
									<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
									<div className="h-100per paragraph_font">
										<ul style={{ marginLeft: '10px' }}>
											{product.included_items ? (
												product.included_items.split('\n').map((line, index) => {
													return (
														<li
															key={index}
															className="paragraph_font"
															style={{ listStyleType: 'disc' }}
														>
															{line}
														</li>
													);
												})
											) : (
												product.included_items
											)}
										</ul>
									</div>
								</div>
							)} */}
							{/* {product.product_length && ( */}
							<div className="jc-b wrap m-2rem">
								<div className="mt-2rem">
									<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
									<div className="h-100per paragraph_font">
										<ul style={{}}>
											{included_items ? (
												included_items.split('\n').map((line, index) => {
													return (
														<li
															key={index}
															className="paragraph_font"
															style={{ listStyleType: 'disc' }}
														>
															{line}
														</li>
													);
												})
											) : (
												included_items
											)}
										</ul>
									</div>
								</div>
								{product.product_length && (
									<div className="mt-2rem">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Product Dimensions: </h2>
										<div className="h-100per paragraph_font">
											{product.name === 'Coin Battery Storage' ? (
												`${product.product_length} cm x ${product.product_width} cm x
											${product.product_height} cm`
											) : product.name === 'Glow Strings V2 50 LED / 3.5m' ? (
												`${product.product_length} m x ${product.product_width} m x
											${product.product_height} m`
											) : (
												`${product.product_length} mm x ${product.product_width} mm x
											${product.product_height} mm`
											)}
										</div>
									</div>
								)}
								{product.chips &&
								product.chips.length > 0 && (
									<div className="mt-2rem">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Compatible Chips: </h2>
										<div className="h-100per paragraph_font ">
											<ul style={{}}>
												{product.chips ? (
													product.chips.map((chip, index) => {
														return (
															<li
																key={index}
																className="paragraph_font"
																style={{ listStyleType: 'disc' }}
															>
																{chip.name}
															</li>
														);
													})
												) : (
													product.chips
												)}
											</ul>
										</div>
									</div>
								)}
							</div>
							{/* )} */}
						</div>
						{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
							<div className=" m-2rem  h-auto m-auto jc-c">
								{/* <Zoom className="m-auto"> */}
								<img
									className="max-w-800px w-100per h-auto "
									src="https://images2.imgbox.com/af/ba/QWR9I16I_o.png"
									alt="Graphic Timeline"
									title="Diffuser Cap and Mega Diffuser Cap Name Change Timeline"
								/>
								{/* </Zoom> */}
							</div>
						)}

						<div className="p-1rem">
							{/* {product.category === 'glowskins' && (
								<a href="/pages/faq#glowskins_chip_brand_compatibility" className="mb-3rem">
									<div className="jc-c">
										<button className="btn primary" style={{ margin: 'auto' }}>
											Glowskins Microlight Compatibility
										</button>
									</div>
								</a>
							)} */}
							{product.category === 'glowskins' && (
								// <Zoom>
								<img
									className="colored_caps_images"
									src="https://images2.imgbox.com/d2/67/qjRp33SP_o.png"
									alt="Glowskins Chip Compatibility"
									title="Glowskins Chip Compatibility"
								/>
								// </Zoom>
							)}

							{(product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') && (
								<div>
									<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
									<div className="colored_caps">
										<div className="colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Caps</h3>
											{/* <Zoom> */}
											<img
												className="colored_caps_images"
												src="/images/optimized_images/product_page_images/img_2298_cropped_optimized.jpg"
												alt="Colored Caps"
												title="Colored Caps"
											/>
											{/* </Zoom> */}
										</div>
										<div className="colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Caps Under Blacklight</h3>
											{/* <Zoom> */}
											<img
												className="colored_caps_images"
												src="/images/optimized_images/product_page_images/img_2331_cropped_optimized.jpg"
												alt="Colored Caps Under Blacklight"
												title="Colored Caps Under Blacklight"
											/>
											{/* </Zoom> */}
										</div>
									</div>
								</div>
							)}
							{product.category === 'frosted_diffusers' && (
								<div>
									<h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
									<div className="colored_caps">
										<div className="colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Diffusers</h3>
											{/* <Zoom> */}
											<img
												className="colored_caps_images"
												src="https://thumbs2.imgbox.com/78/e1/DfIDjh1r_t.jpeg"
												alt="Colored Caps"
												title="Colored Caps"
											/>
											{/* </Zoom> */}
										</div>
										<div className="colored_caps_item m-1rem">
											<h3 className="colored_caps_images">Colored Diffusers No Light</h3>
											{/* <Zoom> */}
											<img
												className="colored_caps_images"
												src="https://thumbs2.imgbox.com/b9/5c/9jcxAh23_t.jpeg"
												alt="Colored Caps Under Blacklight"
												title="Colored Caps Under Blacklight"
											/>
											{/* </Zoom> */}
										</div>
									</div>
								</div>
							)}
							{!product.video ? (
								<h2
									style={{
										textAlign: 'center',
										width: '100%',
										justifyContent: 'center'
									}}
								>
									Video Coming Soon!
								</h2>
							) : (
								<div className="jc-c column m-0px">
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										Watch the Video Below to Learn More
									</h2>
									{/* <video
										className="product_video"
										style={{ height: 'auto', maxWidth: '100%', borderRadius: '20px' }}
										controls
										poster={product.display_image}
									>
										<source src={product.video} type="video/mp4" />
									</video> */}
									<div className="iframe-container">
										<iframe
											width="996"
											height="560"
											style={{ borderRadius: '20px' }}
											src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
											frameborder="0"
											allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen="1"
										/>
									</div>
								</div>
							)}
						</div>
						<div className="content-margined">
							<h2
								style={{
									textAlign: 'center',
									width: '100%',
									justifyContent: 'center'
								}}
							>
								Reviews
							</h2>
							{!product.reviews.length && (
								<div style={{ marginBottom: '10px' }}>Be the First to Review this Product</div>
							)}
							<Reviews product={product} pathname={props.match.params.pathname} />
						</div>
					</div>
				)}
			</Loading>
			<RelatedProducts product={product} product_pathname={props.match.params.pathname} />
			{/* <RelatedCarousel
				product={product}
				product_category={product && product.category}
				product_pathname={props.match.params.pathname}
			/> */}
		</div>
	);
};
export default ProductPage;
