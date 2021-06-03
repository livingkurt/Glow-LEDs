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
	sale_price_product_option_switch,
	sale_price_product_option_switch_product
} from '../../utils/react_helper_functions';

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	let { userInfo } = userLogin;

	const [ qty, setQty ] = useState(1);
	const [ diffuser_cap, set_diffuser_cap ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ price, set_price ] = useState();
	const [ sale_price, set_sale_price ] = useState(0);
	const [ size, set_size ] = useState(0);
	const [ count_in_stock, set_count_in_stock ] = useState(30);
	const [ product_option, set_product_option ] = useState({});
	const [ image, set_image ] = useState('');
	const [ no_dropdown, set_no_dropdown ] = useState(false);
	const [ color, set_color ] = useState('');
	const [ option_color, set_option_color ] = useState('');
	const [ added_to_cart_message, set_added_to_cart_message ] = useState('');
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
				set_price(product.price);
				set_sale_price(product.sale_price);
				set_count_in_stock(product.countInStock);

				set_product_option({});
				if (product.product_options) {
					const option = product.product_options.find((option) => option.default === true);
					console.log({ option });
					if (option) {
						set_price(option.price);
						if (option.size) {
							set_size(option.size);
						}
						set_sale_price(option.sale_price);
						if (option.count_in_stock) {
							set_count_in_stock(option.count_in_stock);
						}

						set_product_option(option);
						if (option.images > 0) {
							set_images(option.images);
							set_image(option.images && option.images[0]);
						}
					}
				}

				// set_color(
				// 	product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters'
				// 		? 'Translucent White'
				// 		: product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps'
				// 			? 'Black'
				// 			: ''
				// );
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

	const determine_default_color = (color) => {
		console.log({ color });
		if (!color) {
			if (product.category === 'frosted_diffusers' || product.subcategory === 'diffuser_adapters') {
				return 'Translucent White';
			} else if (product.category === 'diffuser_caps' || product.category === 'mega_diffuser_caps') {
				return 'Black';
			} else if (product.category === 'glowskins' || product.category === 'glow_casings') {
				return 'Clear';
			}
		} else {
			return color;
		}
	};

	const handleAddToCart = () => {
		console.log({ color: determine_default_color(color) });
		dispatch(
			addToCart(
				props.match.params.pathname,
				qty,
				determine_default_color(color),
				diffuser_cap,
				product_option,
				images[0]
			)
		);
		open_cart();
		set_product_option({});
	};

	const update_product = (e, option) => {
		let button = document.getElementById(e.target.id);
		let buttons = document.querySelectorAll('.packs');
		buttons.forEach((node) => {
			node.classList.remove('active');
			node.classList.remove('secondary');
			node.classList.add('primary');
		});
		button.classList.add('secondary');
		button.classList.add('active');
		set_price(option.price);
		if (typeof option.images !== 'undefined' && option.images.length > 0) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		set_sale_price(option.sale_price);
		set_size(option.size);
		set_count_in_stock(option.count_in_stock);
		set_product_option(option);
		set_no_dropdown(option.no_dropdown);
		if (option_color && option_color.price) {
			set_price(option_color.price);
		}
		if (option.no_dropdown) {
			set_color(option.color);
		}
	};

	const update_product_images = (e, option) => {
		const product = JSON.parse(e.target.value);
		set_diffuser_cap(JSON.parse(e.target.value));
		set_images(product.images);
		set_image(product.images[0]);
	};

	const update_color = (e, option) => {
		if (option.price) {
			set_price(option.price);
		}
		set_sale_price(option.sale_price);
		set_color(JSON.parse(e.target.value).color);
		set_option_color(JSON.parse(e.target.value));
		console.log({ option_images: option.images });
		if (option.images && option.images[0]) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		if (product.category === 'frosted_diffusers') {
			set_product_option(option);
		}
	};

	return (
		<div className="column">
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
					<div className="column">
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
							<div className="column">
								<label className="product_title_top none fs-2em ff-h mb-2rem">{product.name}</label>
								<div className="details-image">
									{/* <Zoom> */}
									<img
										id="expandedImg"
										alt={product.name}
										title={product.name}
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
								<h1 className="product_title_side" styles={{ display: 'flex' }}>
									{product.name}
								</h1>
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

								<div className="column">
									<div className="column h-100per paragraph_font">
										<ul style={{ marginLeft: '10px' }}>
											{product.facts ? (
												product.facts.split('\n').map((line, index) => {
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
												product.facts
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
													{[ ...Array(count_in_stock).keys() ].map((x) => (
														<option key={x + 1} defaultValue={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>

										<h4 style={{ marginBottom: 0, marginTop: 11 }}>
											Shipping Calculated at Checkout
										</h4>
									</li>
									{/* <div className=""> */}
									{product.product_options &&
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
									)}
									{/* </div> */}
									{/* <li>Product Size: {size}</li> */}
									{product.products &&
									product.products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-15px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													Caps:
												</label>
												<div className="custom-select">
													<select
														// defaultValue={diffuser_cap_name}
														// value={diffuser_cap_name}
														className="qty_select_dropdown"
														onChange={(e) => update_product_images(e)}
													>
														<option key={1} defaultValue="">
															---Choose Cap---
														</option>
														{product.products.map(
															(cap, index) =>
																cap.name === 'Custom Diffuser Caps Deposit' ||
																cap.name === 'Diffuser Caps + Adapters Starter Kit' ? (
																	''
																) : (
																	<option key={index} value={JSON.stringify(cap)}>
																		{cap.name.slice(0, -14)}
																	</option>
																)
														)}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}

									{product.product_options &&
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
									)}
									{(product.name === 'Diffuser Caps + Adapters Starter Kit' ||
										product.name === 'Mega Diffuser Caps + Adapters Starter Kit') &&
									!diffuser_cap ? (
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
						<div className="column p-1rem">
							<h2 style={{ margin: '0px', marginRight: 5 }}> Description: </h2>
							{/* <p className="paragraph_font">{product.description}</p> */}
							<ReadMore width={1000} className="paragraph_font" length={100}>
								{product.description}
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
								<div className="column">
									<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
									<div className="column h-100per paragraph_font">
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
								<div className="column mt-2rem">
									<h2 style={{ margin: '0px', marginRight: 5 }}> Included Items: </h2>
									<div className="column h-100per paragraph_font">
										<ul style={{}}>
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
								{product.product_length && (
									<div className="column mt-2rem">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Product Dimensions: </h2>
										<div className="column h-100per paragraph_font">
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
									<div className="column mt-2rem">
										<h2 style={{ margin: '0px', marginRight: 5 }}> Compatible Chips: </h2>
										<div className="column h-100per paragraph_font ">
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

						<div className="column p-1rem">
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
										<div className="column colored_caps_item m-1rem">
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
										<div className="column colored_caps_item m-1rem">
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
