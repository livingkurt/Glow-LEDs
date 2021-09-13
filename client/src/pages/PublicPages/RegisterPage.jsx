import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../../actions/productActions';
import {
	Rating,
	Reviews,
	Slideshow,
	RelatedProducts,
	ReadMore,
	Swipe,
	StyledDropdown,
	Carousel
} from '../../components/SpecialtyComponents';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { addToCart } from '../../actions/cartActions';
import 'react-medium-image-zoom/dist/styles.css';
import { sale_price_product_option_switch_product } from '../../utils/react_helper_functions';
import useWindowDimensions from '../../components/Hooks/windowDimensions';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/zoom/zoom.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { humanize, manuals, toCapitalize } from '../../utils/helper_functions';
import Overflow from 'react-overflow-indicator';

// install Swiper modules
SwiperCore.use([ Pagination ]);

const ProductPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	let { userInfo } = userLogin;
	const [ name, set_name ] = useState('');
	const [ description, set_description ] = useState('');
	const [ facts, set_facts ] = useState('');
	const [ included_items, set_included_items ] = useState('');
	const [ qty, setQty ] = useState(1);
	const [ images, set_images ] = useState([]);
	const [ price, set_price ] = useState();
	const [ previous_price, set_previous_price ] = useState();
	const [ sale_price, set_sale_price ] = useState(0);
	const [ size, set_size ] = useState();
	const [ count_in_stock, set_count_in_stock ] = useState(30);
	const [ product_option, set_product_option ] = useState({});
	const [ image, set_image ] = useState('');
	const [ secondary_image, set_secondary_image ] = useState('');
	const [ secondary_images, set_secondary_images ] = useState([]);

	const [ added_to_cart_message, set_added_to_cart_message ] = useState('');

	const [ dimensions, set_dimensions ] = useState({});

	const [ color, set_color ] = useState('');
	const [ secondary_color, set_secondary_color ] = useState('');

	const [ color_code, set_color_code ] = useState('');
	const [ secondary_color_code, set_secondary_color_code ] = useState('');

	const [ color_product, set_color_product ] = useState(null);
	const [ color_product_object, set_color_product_object ] = useState({});
	const [ secondary_color_product_object, set_secondary_color_product_object ] = useState({});
	const [ option_product_object, set_option_product_object ] = useState({});
	const [ secondary_color_product, set_secondary_color_product ] = useState(null);
	const [ option_product, set_option_product ] = useState(null);
	const [ secondary_product, set_secondary_product ] = useState(null);

	const [ secondary_product_name, set_secondary_product_name ] = useState('');
	const [ option_product_name, set_option_product_name ] = useState('');

	// const [ color_group_name, set_color_group_name ] = useState('');
	// const [ secondary_color_group_name, set_secondary_color_group_name ] = useState('');
	// const [ option_group_name, set_option_group_name ] = useState('');
	// const [ secondary_group_name, set_secondary_group_name ] = useState('');

	const productDetails = useSelector((state) => state.productDetails);

	const { product, loading, error } = productDetails;

	const { width, height } = useWindowDimensions();

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
			dispatch(detailsProduct(props.match.params.pathname));
		},
		[ props.match.params.pathname ]
	);
	// let query = useQuery();

	const update_universal_state = (item) => {
		set_image(item.images && item.images[0]);
		set_images(item.images);
		console.log({ images: item.images });

		if (item.price > 0) {
			set_price(item.price);
		}
		if (item.previous_price > 0) {
			set_previous_price(item.previous_price);
		}
		if (item.sale_price > 0) {
			set_sale_price(item.sale_price);
		}
		set_count_in_stock(item.countInStock);
		set_name(item.name);
		set_description(item.description);
		set_facts(item.facts);
		set_color(item.color);
		set_secondary_color(item.secondary_color);
		set_included_items(item.included_items);
		set_dimensions({
			weight_pounds: item.weight_pounds,
			weight_ounces: item.weight_ounces,
			package_length: item.package_length,
			package_width: item.package_width,
			package_height: item.package_height,
			package_volume: item.package_volume
		});
	};

	const update_option_product_state = (option) => {
		// set_product_state(option);
		set_option_product(option._id);
		set_option_product_name(option.name);
		set_option_product_object(option);
	};

	const update_color_product_state = (color) => {
		set_color_product(color._id);
		set_color(color.color);
		set_color_code(color.color_code);
		set_color_product_object(color);
	};

	const update_secondary_color_product_state = (secondary_color) => {
		set_secondary_color_product(secondary_color._id);
		set_secondary_color(secondary_color.color);
		set_secondary_color_code(secondary_color.color_code);
		set_secondary_color_product_object(secondary_color);
	};
	const update_images_state = (images) => {
		if (images.length > 0) {
			set_image(images && images[0]);
			set_images(images);
		}
	};
	const update_secondary_product_state = () => {};

	useEffect(
		() => {
			if (product) {
				update_universal_state(product);
				set_product_option({});
				const query = getUrlParameter();
				set_size(product.size);
				if (!query) {
					let first_color = '';
					if (product.color_products) {
						const color = product.color_products.find((color) => color.default_option === true);
						if (color) {
							update_color_product_state(color);
							first_color = color.color;
							history.push({
								search: '?color=' + first_color
							});
						}
					}
					if (product.secondary_color_products) {
						const secondary_color = product.secondary_color_products.find(
							(secondary_color) => secondary_color.default_option === true
						);
						if (secondary_color) {
							update_secondary_color_product_state(secondary_color);
							history.push({
								search: '?color=' + first_color + '?secondary_color=' + secondary_color
							});
						}
					}
					if (product.option_products) {
						const option = product.option_products.find((option) => option.default_option === true);
						if (option) {
							update_universal_state(option);
							update_option_product_state(option);
							history.push({
								search:
									'?color=' +
									first_color +
									'?secondary_color=' +
									secondary_color +
									'?option=' +
									option.name
							});
						}
					}
				} else if (query) {
					if (product.option_products) {
						const option = product.option_products.find(
							(option) => option.size === parseInt(query.option) || option.name === query.option
						);
						if (option) {
							update_universal_state(option);
							update_option_product_state(option);
						}
					}
					if (product.color_products) {
						const color = product.color_products.find((color) => color.color === query.color);
						if (color) {
							update_images_state(color.images);
							update_color_product_state(color);
						}
					}
					if (product.secondary_color_products) {
						const secondary_color = product.secondary_color_products.find(
							(secondary_color) => secondary_color.color === query.secondary_color
						);
						if (secondary_color) {
							update_images_state(secondary_color.images);
							update_secondary_color_product_state(secondary_color);
						}
					}
				}
			}
		},
		[ product ]
	);

	const set_product_state = (product) => {
		if (product.size) {
			set_size(product.size);
		} else {
			set_size(product.name);
		}
		if (product.color) {
			set_color(product.color);
		}
		if (product.secondary_color) {
			set_secondary_color(product.secondary_color);
		}
		if (product.price > 0) {
			set_price(product.price);
		}
		if (product.sale_price > 0) {
			set_sale_price(product.sale_price);
		}
		if (product.countInStock) {
			set_count_in_stock(product.countInStock);
		}

		set_product_option(product);
		if (product.images > 0) {
			set_images(product.images);
			set_image(product.images && product.images[0]);
		}
		set_dimensions({
			weight_pounds: product.weight_pounds,
			weight_ounces: product.weight_ounces,
			package_length: product.package_length,
			package_width: product.package_width,
			package_height: product.package_height,
			package_volume: product.package_volume
		});
	};
	function getUrlParameter(name) {
		const search = props.location.search.split('?');
		console.log({ search });
		const search_object = {};
		search.filter((item) => item !== '').forEach((item) => {
			search_object[item.split('=')[0]] = item.split('=')[1];
		});
		return search_object;
	}

	useEffect(
		() => {
			if (error) {
				props.history.push('/collections/all/products');
			}
		},
		[ error ]
	);

	useEffect(() => {
		const recently_viewed = sessionStorage.getItem('recently_viewed');
		const products = JSON.parse(recently_viewed);
		console.log({ product });
		if (recently_viewed) {
			if (product && product.hasOwnProperty('name')) {
				sessionStorage.setItem('recently_viewed', JSON.stringify([ product, ...products ]));
			}
		} else {
			if (product && product.hasOwnProperty('name')) {
				sessionStorage.setItem('recently_viewed', JSON.stringify([ product ]));
			}
		}
	}, []);

	const handleAddToCart = () => {
		// console.log({ product_option });
		console.log({ handleAddToCart: product.subcategory });
		dispatch(
			addToCart({
				product: product._id,
				color_product,
				color_code,
				secondary_color_code,
				secondary_color_product,
				color_group_name: product.color_group_name,
				secondary_color_group_name: product.secondary_color_group_name,
				option_group_name: product.option_group_name,
				secondary_group_name: product.secondary_group_name,
				option_product,
				option_product_name,
				secondary_product,
				secondary_product_name,
				name,
				size,
				color: size !== '1 Skin' && color,
				secondary_color: size !== '1 Sled' && secondary_color,
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
				subcategory: product.subcategory,
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
	const history = useHistory();

	const update_color = (e) => {
		const option = JSON.parse(e.target.value);

		// set_name(option.name);

		// if (option.description) {
		// 	set_description(option.description);
		// }
		// if (option.facts) {
		// 	set_facts(option.facts);
		// }
		if (option.price !== 0 || option.price === null || option.price === undefined) {
			set_price(option.price);
		}
		if (option.sale_price !== 0 || option.sale_price === null || option.sale_price === undefined) {
			set_sale_price(option.sale_price);
		}
		set_color(option.color);
		console.log({ option_color: option.color });
		history.push({
			// pathname: product.pathname,
			search: '?color=' + option.color
		});
		set_color_code(option.color_code);
		if (option.images && option.images[0]) {
			set_images(option.images);
			set_image(option.images[0]);
		}
		set_color_product(option._id);
		set_color_product_object(option);
	};

	const update_secondary_color = (e) => {
		const option = JSON.parse(e.target.value);
		history.push({
			// pathname: product.pathname,
			search: '?color=' + color + '?secondary_color=' + option.color
		});
		// set_name(option.name);

		// if (option.description) {
		// 	set_description(option.description);
		// }
		// if (option.facts) {
		// 	set_facts(option.facts);
		// }
		if (option.price !== 0 || option.price === null || option.price === undefined) {
			set_price(option.price);
		}
		if (option.sale_price !== 0 || option.sale_price === null || option.sale_price === undefined) {
			set_sale_price(option.sale_price);
		}
		set_secondary_color(option.color);
		set_secondary_color_code(option.color_code);
		if (option.images && option.images[0]) {
			// set_images(option.images);
			// set_images((images) => [ ...images, option.images[0] ]);
			set_secondary_image(option.images[0]);
			set_secondary_images(option.images);
		}
		set_secondary_color_product(option._id);
		set_secondary_color_product_object(option);
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
		history.push({
			search: '?color=' + color + '?secondary_color=' + secondary_color + '?option=' + option.size || option.name
		});
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

	const determine_secondary_product_name = (secondary) => {
		return product.category === 'diffuser_caps' ? secondary.slice(0, -14) : secondary.split('-')[1].substring(1);
	};

	const [ canScroll, setCanScroll ] = useState(false);

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
								<label
									className="product_title_top  fs-30px ff-h mb-2rem ta-c lh-50px"
									style={{ display: width < 819 ? 'block' : 'none' }}
								>
									{name}
								</label>
								{/* <div className="w-400px"> */}

								<div className="details-image">
									{console.log({ name: name && name.split('-')[1] })}
									<div>
										{console.log(true)}
										{!secondary_image && (
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
										)}
										{secondary_image && (
											<div
												className={`double-image-${name && name.split('-')[1]
													? 'vertical'
													: ''}`}
											>
												<img
													id="expandedImg"
													alt={name}
													title={name}
													className={`details-image-img-${name && name.split('-')[1]
														? 'top'
														: 'left'}`}
													src={image}
												/>
												<img
													id="expandedSecondaryImg"
													alt={name}
													title={name}
													className={`details-image-img-${name && name.split('-')[1]
														? 'bottom'
														: 'right'}`}
													src={secondary_image}
												/>
											</div>
										)}
									</div>
									{/* {name && !name.split('-')[1] === '2 Tone' ? (
										<div>
											{console.log(true)}
											{!secondary_image && (
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
											)}
											{secondary_image && (
												<div className="double-image">
													<img
														id="expandedImg"
														alt={name}
														title={name}
														className="details-image-img-left"
														src={image}
													/>
													<img
														id="expandedSecondaryImg"
														alt={name}
														title={name}
														className="details-image-img-right"
														src={secondary_image}
													/>
												</div>
											)}
										</div>
									) : (
										<div>
											{!secondary_image && (
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
											)}
											{secondary_image && (
												<div className="double-image-vertical">
													<img
														id="expandedImg"
														alt={name}
														title={name}
														className="details-image-img-top"
														src={image}
													/>
													<img
														id="expandedSecondaryImg"
														alt={name}
														title={name}
														className="details-image-img-bottom"
														src={secondary_image}
													/>
												</div>
											)}
										</div>
									)} */}
									<div style={{ display: width < 819 ? 'none' : 'block' }}>
										<Slideshow
											product={product}
											images={images}
											secondary_images={secondary_images}
											className="w-100per jc-c max-w-400px m-auto"
											set_image={set_image}
										/>
									</div>
									{/* </div> */}
								</div>

								<div>
									{/* <Swiper
										style={{
											'--swiper-navigation-color': '#fff',
											'--swiper-pagination-color': '#fff'
										}}
										zoom={true}
										navigation={true}
										pagination={{
											clickable: true
										}}
										className="mySwiper"
									>
										{images &&
											images.map((image, index) => (
												<SwiperSlide key={index}>
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
												</SwiperSlide>
											))}
									</Swiper> */}
								</div>
								{/* <div className="w-100per max-h-400px">
									<Swipe images={images} />
								</div> */}
							</div>
							<div
								className="details-info desktop_product_view"
								style={{ display: width > 819 ? 'block' : 'none' }}
							>
								<h1 className="product_title_side lh-50px fs-30px mv-0px">{name}</h1>

								<div className="mb-15px mt-n9px">
									<a href="#reviews">
										<Rating rating={product.rating} numReviews={product.numReviews + ' reviews'} />
									</a>
								</div>
								<div className="max-w-492px mr-15px">
									{secondary_product && (
										<div className="ai-c mv-20px jc-b w-100per">
											<h3 className="mv-0px mr-5px">
												{product.secondary_group_name ? (
													product.secondary_group_name
												) : (
													'Cap Design'
												)}: {' '}
											</h3>
											<label>{determine_secondary_product_name(secondary_product_name)}</label>
											{/* {console.log({ secondary_product_name })} */}
										</div>
									)}
									{size !== '1 Sled' &&
									color && (
										<div className="ai-c mv-20px jc-b w-100per">
											<h3 className="mv-0px mr-5px">
												{product.color_group_name ? product.color_group_name : 'Color'}:{' '}
											</h3>
											<div className="ai-c">
												<label>{color}</label>
												{color_code && (
													<canvas
														className=" ml-5px w-60px h-20px br-7px"
														style={{ backgroundColor: color_code }}
													/>
												)}
											</div>
										</div>
									)}
									{size !== '1 Skin' &&
									secondary_color && (
										<div className="ai-c mv-20px jc-b w-100per">
											<h3 className="mv-0px mr-5px">
												{product.secondary_color_group_name ? (
													product.secondary_color_group_name
												) : (
													'Secondary Color'
												)}:{' '}
											</h3>
											<div className="ai-c">
												<label>{secondary_color}</label>
												{secondary_color_code && (
													<canvas
														className=" ml-5px w-60px h-20px br-7px"
														style={{ backgroundColor: secondary_color_code }}
													/>
												)}
											</div>
										</div>
									)}
									{size && (
										<div className="ai-c  mv-20px">
											<h3 className="mv-0px mr-5px">
												{product.option_group_name ? product.option_group_name : 'Size'}:{' '}
											</h3>
											{size}
										</div>
									)}
								</div>
								<div className="row ai-c mv-20px">
									<h3 className="mv-0px mr-5px">Price: </h3>
									{sale_price_product_option_switch_product(price, sale_price, previous_price)}
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
							</div>
							<div
								className="details-action desktop_product_view"
								style={{ display: width > 819 ? 'block' : 'none' }}
							>
								<ul>
									<div className="row">
										<label style={{ margin: 0, marginRight: 5 }}>Price: </label>
										{console.log({ price })}
										{/* {sale_price_product_option_switch_product(
											product,
											product.product_options,
											price
										)} */}

										{sale_price_product_option_switch_product(price, sale_price, previous_price)}
									</div>

									<li>Status: {count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</li>

									{product.secondary_product_group &&
									product.secondary_products &&
									product.secondary_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-25px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.secondary_group_name ? (
														product.secondary_group_name
													) : (
														'Cap Design'
													)}
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
																{determine_secondary_product_name(secondary.name)}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
									)}

									{size !== '1 Sled' &&
									product.color_product_group &&
									product.color_products &&
									product.color_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-25px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.color_group_name ? product.color_group_name : 'Color'}:
												</label>
												<div className="custom-select">
													<select
														value={JSON.stringify(color_product_object)}
														defaultValue={JSON.stringify(color_product_object)}
														className="qty_select_dropdown"
														onChange={(e) => update_color(e)}
													>
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
									{/* {size !== '1 Sled' &&
									product.color_product_group &&
									product.color_products &&
									product.color_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-25px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.color_group_name ? product.color_group_name : 'Color'}:
												</label>
												<StyledDropdown
													onChange={update_color}
													items={product.color_products}
													label={
														product.color_product_group_name ? (
															product.color_product_group_name
														) : (
															'Color'
														)
													}
												/>
											</div>
										</li>
									)} */}

									{size !== '1 Skin' &&
									product.secondary_color_product_group &&
									product.secondary_color_products &&
									product.secondary_color_products.length > 0 && (
										<li>
											<div className="ai-c h-25px mb-20px">
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.secondary_color_group_name ? (
														product.secondary_color_group_name
													) : (
														'Secondary Color'
													)}:
												</label>
												<div className="custom-select">
													<select
														value={JSON.stringify(secondary_color_product_object)}
														defaultValue={JSON.stringify(secondary_color_product_object)}
														className="qty_select_dropdown"
														onChange={(e) => update_secondary_color(e)}
													>
														{product.secondary_color_products.map(
															(secondary_color, index) => (
																<option
																	key={index}
																	value={JSON.stringify(secondary_color)}
																>
																	{secondary_color.name.split(' ')[0]}
																</option>
															)
														)}
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
													{product.option_group_name ? product.option_group_name : 'Size'}:
												</label>
												<div className="ai-c wrap">
													{product.option_products
														// .filter((option) => !option.dropdown)
														// .filter((option) => option.count_in_stock)
														.map((option, index) => (
															<button
																key={index}
																// selected={option.default_option}
																id={option.name}
																value={JSON.stringify(option)}
																onClick={(e) => update_option(e)}
																// selected={
																// 	JSON.stringify(option) ===
																// 		JSON.stringify(option_product_object) ||
																// 	option.default_option
																// }
																className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option_product_object.hasOwnProperty(
																	'size'
																)
																	? option_product_object.size === option.size
																		? 'secondary'
																		: 'primary'
																	: option.default_option ? 'secondary' : 'primary'}`}
															>
																{option.size || option.name}
															</button>
														))}
												</div>
											</div>
										</li>
									)}
									<li>
										<div className="ai-c h-25px mb-20px">
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
												product.category === 'diffusers' ||
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
												<button className="btn primary bob" onClick={handleAddToCart}>
													Add to Cart
												</button>
											) : (
												<button className="btn inactive">Out of Stock</button>
											)}
										</li>
									)}
								</ul>
							</div>
							<div className="mobile_product_view" style={{ display: width <= 819 ? 'block' : 'none' }}>
								<Slideshow
									product={product}
									images={images}
									secondary_images={secondary_images}
									className="jc-c w-100per"
								/>
							</div>
							<div className="w-100per">
								<div
									className="details-action mobile_product_view"
									style={{ display: width <= 819 ? 'block' : 'none' }}
								>
									<ul>
										{/* <li>Status: {count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</li> */}
										<div className="row ai-c mb-1rem">
											<h3 className="mv-0px mr-5px">Price: </h3>
											{sale_price_product_option_switch_product(
												price,
												sale_price,
												previous_price
											)}
										</div>
										{product.secondary_product_group &&
										product.secondary_products &&
										product.secondary_products.length > 0 && (
											<li>
												<div className="ai-c h-25px mb-25px">
													{/* <label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mr-1rem"
												>
													{product.secondary_group_name ? (
														product.secondary_group_name
													) : (
														'Cap Design'
													)}
												</label> */}
													<h3 className="mv-0px mr-5px">
														{product.secondary_group_name ? (
															product.secondary_group_name
														) : (
															'Design'
														)}: {' '}
													</h3>
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => update_secondary(e)}
														>
															<option key={1} defaultValue="">
																Choose{' '}
																{product.secondary_group_name && product.secondary_group_name}
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
										{size !== '1 Sled' &&
										product.color_product_group &&
										product.color_products &&
										product.color_products.length > 0 && (
											<li>
												<div className="ai-c h-25px mb-25px jc-b">
													<h3 className="mv-0px ">
														{product.color_group_name ? product.color_group_name : 'Color'}:{' '}
													</h3>
													<div className="ai-c">
														{color_code && (
															<canvas
																className=" mh-1rem w-60px h-20px br-7px"
																style={{ backgroundColor: color_code }}
															/>
														)}
														<div className="custom-select">
															<select
																value={JSON.stringify(color_product_object)}
																defaultValue={JSON.stringify(color_product_object)}
																className="qty_select_dropdown"
																onChange={(e) => update_color(e)}
															>
																{product.color_products.map((color, index) => (
																	<option key={index} value={JSON.stringify(color)}>
																		{color.name.split(' ')[0]}
																	</option>
																))}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</div>
											</li>
										)}
										{size !== '1 Skin' &&
										product.secondary_color_product_group &&
										product.secondary_color_products &&
										product.secondary_color_products.length > 0 && (
											<li>
												<div className="ai-c h-25px mb-20px jc-b">
													<h3 className="mv-0px ">
														{product.secondary_color_group_name ? (
															product.secondary_color_group_name
														) : (
															'Secondary Color'
														)}:{' '}
													</h3>
													<div className="ai-c">
														{secondary_color_code && (
															<canvas
																className=" mh-1rem w-60px h-20px br-7px"
																style={{ backgroundColor: secondary_color_code }}
															/>
														)}
														<div className="custom-select">
															<select
																value={JSON.stringify(secondary_color_product_object)}
																defaultValue={JSON.stringify(
																	secondary_color_product_object
																)}
																className="qty_select_dropdown"
																onChange={(e) => update_secondary_color(e)}
															>
																{product.secondary_color_products.map(
																	(secondary_color, index) => (
																		<option
																			key={index}
																			value={JSON.stringify(secondary_color)}
																		>
																			{secondary_color.name.split(' ')[0]}
																		</option>
																	)
																)}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</div>
											</li>
										)}
										{product.option_product_group &&
										product.option_products &&
										product.option_products.length > 0 && (
											<li>
												<div className="ai-c jc-b">
													<h3 className="mv-0px mr-5px w-7rem">
														{product.option_group_name ? (
															product.option_group_name
														) : (
															'Size'
														)}:{' '}
													</h3>
													<div className="ai-c wrap">
														{product.option_products
															.filter((option) => option.name !== '1 Sled')
															.filter((option) => option.name !== '1 Skin')
															.map((option, index) => (
																<button
																	key={index}
																	// selected={
																	// 	JSON.stringify(option) ===
																	// 		JSON.stringify(option_product_object) ||
																	// 	option.default_option
																	// }
																	id={option.name}
																	onClick={(e) => update_option(e)}
																	className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option_product_object.hasOwnProperty(
																		'size'
																	)
																		? option_product_object.size === option.size
																			? 'secondary'
																			: 'primary'
																		: option.default_option
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
										{(product.subcategory === 'novaskins' ||
											product.subcategory === 'alt_novaskins') &&
										product.option_product_group &&
										product.option_products &&
										product.option_products.length > 0 && (
											<li>
												<div className="ai-c">
													<h3 className="mv-0px mr-5px w-7rem">Parts: </h3>
													<div className="ai-c wrap">
														{console.log({ option_product_object })}
														{product.option_products
															.filter((option) => option.price === 2.99)
															.map((option, index) => (
																<button
																	key={index}
																	// selected={
																	// 	JSON.stringify(option) ===
																	// 		JSON.stringify(option_product_object) ||
																	// 	option.default_option
																	// }
																	id={option.name}
																	onClick={(e) => update_option(e)}
																	className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option_product_object.hasOwnProperty(
																		'size'
																	)
																		? option_product_object.size === option.size
																			? 'secondary'
																			: 'primary'
																		: option.default_option
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
										<li>
											<div className="ai-c h-25px mb-20px jc-b">
												<h3 className="mv-0px ">Qty:</h3>
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
													product.category === 'diffusers' ||
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
										{product.name === 'Diffuser Caps + Adapters Starter Kit' &&
										!secondary_product ? (
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
								<div
									className="details-info mobile_product_view"
									style={{ display: width <= 819 ? 'block' : 'none' }}
								>
									<div className="mb-15px mt-n9px">
										<a href="#reviews">
											<Rating
												rating={product.rating}
												numReviews={product.numReviews + ' reviews'}
											/>
										</a>
									</div>

									<div className="mt-1rem">
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
								</div>

								{/* <Swiper
									// spaceBetween={50}
									pagination={true}
									slidesPerView={1}
									onSlideChange={() => console.log('slide change')}
									onSwiper={(swiper) => console.log(swiper)}
								>
									{images &&
										images.map((image) => (
											<SwiperSlide>
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
											</SwiperSlide>
										))}
								</Swiper> */}

								{/* <Swiper pagination={true} className="mySwiper">
									<SwiperSlide>Slide 1</SwiperSlide>
									<SwiperSlide>Slide 2</SwiperSlide>
									<SwiperSlide>Slide 3</SwiperSlide>
									<SwiperSlide>Slide 4</SwiperSlide>
									<SwiperSlide>Slide 5</SwiperSlide>
									<SwiperSlide>Slide 6</SwiperSlide>
									<SwiperSlide>Slide 7</SwiperSlide>
									<SwiperSlide>Slide 8</SwiperSlide>
									<SwiperSlide>Slide 9</SwiperSlide>
								</Swiper> */}
								{/* <AwesomeSlider media={images && images.map((image) => ({ source: image }))} /> */}
								{/* <AwesomeSlider>
									{images &&
										images.map((image, index) => {
											return (
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
											);
										})}
								</AwesomeSlider> */}
							</div>
						</div>
						{/* <Slideshow
							product={product}
							images={images}
							secondary_images={secondary_images}
							show_hide="alt_pictures_shown"
							set_image={set_image}
						/> */}
						<Tabs>
							<Overflow onStateChange={(state) => setCanScroll(state.canScroll.right)}>
								<Overflow.Content>
									<TabList>
										<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
											Description
										</Tab>
										<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
											Included Items
										</Tab>
										<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
											Product Dimensions
										</Tab>
										{product.chips &&
										product.chips.length > 0 && (
											<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
												Compatible Chips
											</Tab>
										)}
										<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
											Reviews
										</Tab>
										{manuals[product.category] && (
											<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
												Manual
											</Tab>
										)}
										<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>Media</Tab>
									</TabList>
								</Overflow.Content>
								{canScroll && (
									<div className="tab_indicator bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
										{'>'}
									</div>
								)}
							</Overflow>
							<TabPanel style={{ borderRadius: '0px 10px 10px 10px' }}>
								<h2 className="m-0px mr-5px mt-1rem"> Description: </h2>
								<ReadMore width={1000} className="paragraph_font" pre={true} length={100}>
									{description}
								</ReadMore>
							</TabPanel>
							<TabPanel>
								<div className="mt-1rem">
									<h2 className="m-0px mr-5px"> Included Items: </h2>
									<div className="h-100per paragraph_font">
										<ul className="pl-2rem">
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
							</TabPanel>
							<TabPanel>
								{product.product_length &&
								product.product_length && (
									<div className="mt-1rem">
										<h2 className="m-0px mr-5px"> Product Dimensions: </h2>
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
							</TabPanel>
							{product.chips &&
							product.chips.length > 0 && (
								<TabPanel>
									{product.chips &&
									product.chips.length > 0 && (
										<div className="mt-1rem">
											<h2 className="m-0px mr-5px"> Compatible Chips: </h2>
											<div className="h-100per paragraph_font ">
												<ul className="pl-2rem">
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
								</TabPanel>
							)}
							<TabPanel>
								<div className="content-margined">
									{/* <h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										Reviews
									</h2> */}
									{!product.reviews.length && (
										<div style={{ marginBottom: '10px' }}>Be the First to Review this Product</div>
									)}
									<Reviews product={product} pathname={props.match.params.pathname} />
								</div>
							</TabPanel>
							{manuals[product.category] && (
								<TabPanel>
									<div className="jc-b">
										<div className="mb-10px">
											<Link to={`/pages/menu/manuals`}>
												<button class="btn secondary">View All Manuals</button>
											</Link>
										</div>
										<div className="mb-10px">
											<Link to={`/collections/all/products/category/${product.category}`}>
												<button class="btn secondary">
													View Available {toCapitalize(humanize(product.category))}
												</button>
											</Link>
										</div>
									</div>
									<h2
										style={{
											textAlign: 'center',
											width: '100%',
											justifyContent: 'center'
										}}
									>
										{manuals[product.category].name}
									</h2>
									{manuals[product.category].manual && (
										<img src={manuals[product.category].manual} alt="manual" className="w-100per" />
									)}
									{manuals[product.category].manual && (
										<h2
											style={{
												textAlign: 'center',
												width: '100%',
												justifyContent: 'center'
											}}
										>
											Watch the Videos below to Learn More
										</h2>
									)}
									<div className="jc-c column m-0px">
										{manuals[product.category].videos.map((video) => (
											<div>
												<h2
													style={{
														textAlign: 'center',
														width: '100%',
														justifyContent: 'center'
													}}
												>
													{video.title}
												</h2>
												<div className="iframe-container">
													<iframe
														width="996"
														height="560"
														title={video.title}
														style={{ borderRadius: '20px' }}
														src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
														frameborder="0"
														allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
														allowfullscreen="1"
													/>
												</div>
											</div>
										))}
									</div>
								</TabPanel>
							)}
							<TabPanel style={{ borderRadius: '10px 0px 10px 10px' }}>
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
										<div className="iframe-container">
											<iframe
												width="996"
												height="560"
												title={product.name}
												style={{ borderRadius: '20px' }}
												src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
												frameborder="0"
												allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
												allowfullscreen="1"
											/>
										</div>
									</div>
								)}
								<div className="p-1rem">
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

									{(product.category === 'diffuser_caps' ||
										product.category === 'mega_diffuser_caps') && (
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
													<h3 className="colored_caps_images">
														Colored Caps Under Blacklight
													</h3>
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
									{product.category === 'diffusers' && (
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
									{(product.category === 'diffuser_caps' ||
										product.category === 'mega_diffuser_caps') && (
										<div className=" m-2rem  h-auto m-auto jc-c">
											<img
												className="max-w-819px w-100per h-auto "
												src="https://images2.imgbox.com/af/ba/QWR9I16I_o.png"
												alt="Graphic Timeline"
												title="Diffuser Cap and Mega Diffuser Cap Name Change Timeline"
											/>
										</div>
									)}
								</div>
							</TabPanel>
						</Tabs>
					</div>
				)}
			</Loading>
			<Carousel
				product_pathname={props.match.params.pathname}
				category={product && product.category}
				title="Related Products"
				random={false}
			/>
			{product &&
			product.category !== 'accessories' && (
				<Carousel
					product_pathname={props.match.params.pathname}
					category={'accessories'}
					title="Accessories You May Need"
				/>
			)}
			<Carousel product_pathname={props.match.params.pathname} random={true} title="Suggested Products" />
		</div>
	);
};
export default ProductPage;
