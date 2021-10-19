import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import { ReadMore, Search, Slideshow } from '../../components/SpecialtyComponents';
import { listProducts } from '../../actions/productActions';
import { homepage_videos, humanize, prnt, toCapitalize } from '../../utils/helper_functions';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { API_Products } from '../../utils';
import useWindowDimensions from '../../components/Hooks/windowDimensions';
import BackgroundPictureChooser from 'react-background-slideshow';
import { Loading } from '../../components/UtilityComponents';

const HomePage = (props) => {
	const history = useHistory();

	const [ display, setDisplay ] = useState(false);
	const [ loading, set_loading ] = useState(false);
	const [ options, set_options ] = useState([]);
	const [ products, set_products ] = useState([]);
	const [ search, set_search ] = useState('');
	const [ start, set_start ] = useState(Math.floor(Math.random() * products.length));
	// const [ end, set_end ] = useState(1);
	const wrapperRef = useRef(null);

	const { height, width } = useWindowDimensions();

	useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	});

	const handleClickOutside = (event) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(event.target)) {
			setDisplay(false);
		}
	};

	const update_list = (product) => {
		set_search(product);
		setDisplay(false);
		history.push('/collections/all/products?search=' + product);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		history.push('/collections/all/products?search=' + search);
	};

	// useEffect(() => {
	// 	setInterval(() => {
	// 		set_start((start) => start + 1);
	// 		set_end((end) => end + 1);
	// 	}, 10000);
	// 	return () => {};
	// }, []);

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		get_all_products();

		// set_start(Math.floor(Math.random() * products.length));
		return () => {};
	}, []);

	const categories = [
		'accessories',
		'casings',
		'decals',
		'diffuser_caps',
		'diffusers',
		'exo_diffusers',
		'gift_card',
		'glow_casings',
		'glow_strings',
		'glowskins',
		'mega_diffuser_caps',
		'options'
	];
	const subcategories = [
		'battery_storage',
		'batteries',
		'stickers',
		'clips',
		'casings',
		'universal',
		'batman',
		'outline',
		'patterns',
		'abstract',
		'shapes',
		'diffuser_adapters',
		'geometric',
		'starter_kit',
		'sacred_geometry',
		'imperfect',
		'domes',
		'closed_hole',
		'fisheye',
		'open_hole',
		'polygons',
		'cylinders',
		'polyhedrons',
		'gift_card',
		'nova',
		'classics',
		'novaskins',
		'alt_novaskins',
		'symbols',
		'emoji',
		'mega_diffuser_adapters',
		'custom',
		'colors',
		'sizes',
		'secondary_colors'
	];

	const get_all_products = async () => {
		set_loading(true);
		const { data } = await API_Products.get_all_products();
		console.log({ data });
		set_products(
			data
				.filter((product) => !product.option)
				.filter((product) => !product.hidden)
				.sort((a, c) => a.order > c.order, 0)
		);
		set_start(Math.floor(Math.random() * data.length));
		set_options([
			...categories.map((category) => {
				return { name: humanize(category) };
			}),
			...subcategories.map((category) => {
				return { name: humanize(category) };
			}),
			...data.filter((product) => !product.option).filter((product) => !product.hidden)
		]);
		set_loading(false);
	};

	return (
		<div className="main_container">
			<Helmet>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>

				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</Helmet>
			<Loading loading={products.length === 0} />
			{products.length > 0 && (
				<div>
					{products &&
					width > 1019 && (
						<div className="carousel-wrapper pos-rel">
							{start !== 0 && <Slideshow products={products} start={start} />}

							<div
								className="pos-abs max-w-900px m-auto p-10px ph-20px br-10px w-100per"
								style={{
									backgroundColor: '#6a6c8091',
									top: '10px',
									left: '50%',
									transform: 'translate(-50%, 50%)'
								}}
							>
								<div className="jc-c">
									<h1 className="welcome_text mb-1rem ta-c" style={{ fontSize: '4rem' }}>
										Welcome to Glow-LEDs
									</h1>
								</div>
								<div className="jc-c">
									<h2 className="mb-1rem ta-c title_font" style={{ fontSize: '2rem' }}>
										Innovators of Gloving and Flow Art Technology
									</h2>
								</div>

								<div className="jc-c">
									<form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
										<div className="jc-b ai-c search_container w-100per max-w-600px">
											<div
												ref={wrapperRef}
												className="flex-container flex-column pos-rel w-100per max-w-600px"
											>
												<input
													id="auto"
													autoComplete="off"
													onClick={() => setDisplay(true)}
													className="form_input search mv-0px w-100per fs-20px"
													placeholder="Find Your Glow Here"
													value={search}
													onChange={(e) => set_search(e.target.value)}
												/>
												{prnt({ options })}
												{display && (
													<div className="pos-abs bg-primary br-10px">
														{options
															.filter(
																({ name }) =>
																	name.toLowerCase().indexOf(search.toLowerCase()) >
																	-1
															)
															.slice(0, 20)
															.map((value, i) => {
																return (
																	<div
																		onClick={() => update_list(value.name)}
																		className="auto-option ai-c jc-b w-600px p-5px"
																		key={i}
																		tabIndex="0"
																	>
																		<span
																			className="fs-20px"
																			style={{ color: 'white' }}
																		>
																			{value.name}
																		</span>
																	</div>
																);
															})}
													</div>
												)}
											</div>
											<button type="submit" className="btn primary w-50px fs-20px mb-0px">
												<i className="fas fa-search" />
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}
					{products &&
					width < 1019 && (
						<div className="carousel-wrapper ">
							<div
								className="max-w-900px m-auto p-10px ph-20px br-10px w-100per mb-2rem"
								style={{
									// backgroundColor: '#6a6c8091'
								}}
							>
								<div className="jc-c">
									<h1 className="welcome_text mb-1rem ta-c" style={{ fontSize: '4rem' }}>
										Welcome to Glow-LEDs
									</h1>
								</div>
								<div className="jc-c">
									<h2 className="mb-1rem ta-c title_font" style={{ fontSize: '2rem' }}>
										Innovators of Gloving and Flow Art Technology
									</h2>
								</div>

								<div className="jc-c">
									<form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
										<div className="jc-b ai-c search_container w-100per max-w-600px">
											<div
												ref={wrapperRef}
												className="flex-container flex-column pos-rel w-100per max-w-600px"
											>
												<input
													id="auto"
													autoComplete="off"
													onClick={() => setDisplay(true)}
													className="form_input search mv-0px w-100per fs-20px"
													placeholder="Find Your Glow Here"
													value={search}
													onChange={(e) => set_search(e.target.value)}
												/>
												{prnt({ options })}
												{display && (
													<div className="pos-abs bg-primary br-10px">
														{options
															.filter(
																({ name }) =>
																	name.toLowerCase().indexOf(search.toLowerCase()) >
																	-1
															)
															.slice(0, 20)
															.map((value, i) => {
																return (
																	<div
																		onClick={() => update_list(value.name)}
																		className="auto-option ai-c jc-b w-600px p-5px"
																		key={i}
																		tabIndex="0"
																	>
																		<span
																			className="fs-20px"
																			style={{ color: 'white' }}
																		>
																			{value.name}
																		</span>
																	</div>
																);
															})}
													</div>
												)}
											</div>
											<button type="submit" className="btn primary w-50px fs-20px mb-0px">
												<i className="fas fa-search" />
											</button>
										</div>
									</form>
								</div>
							</div>
							{start > 0 && <Slideshow products={products} start={start} />}
						</div>
					)}
					<div style={{ marginTop: '-50%' }}>
						<ReadMore width={1000} className="p_descriptions paragraph_font ta-c " length={100}>
							Here at Glow LEDs we offer a wide variety of Gloving and Flow Art accessories. Including EXO
							Diffusers, Glow Casings and our most popular product Glowskins! We are based in Austin, TX
							ran by a small team of people that are dedicated to creating new and innovated technology
							for flow artists everywhere. The majority of our products are made by hand to order, so you
							know you're getting a quality product every time! If you have an idea you want us to try
							please do not hesitate to reach out via our contact page or at info.glowleds@gmail.com
						</ReadMore>
					</div>
					{/* <ReadMore width={1000} className="p_descriptions paragraph_font ta-c " length={100}>
				We are here for you and for the love of the art of flowing and creating. 
			</ReadMore> */}
					{/* Make it Glow with Glow LEDs! The best place to get all of your flow art needs.
			If you have an idea that you think we could do. Please you can get EXO Diffuser Diffuser Caps, Glowskins, Frosted Diffusers, and Glow Strings! Innovation Always!

				
				Glow LEDs represents what Glovers/Flow Artist truly need Flow Art company. A reliable If you’re going
				to create, why not try to innovate, or at least make it a little better haha. Most of our products are
				handmade in Austin, TX, with the ideas we got from you and what you need We create thing that seem Here
				at Glow-LEDs.com we strive */}
					<div className={`${width > 1019 ? 'jc-b' : 'jc-c'} wrap`}>
						{contents &&
							contents
								.slice(0, width > 1473 ? 3 : width > 1019 ? 2 : 1)
								.filter((content) => content.active === true)
								.map(({ home_page }, index) => {
									return (
										<div
											className={`container ${width > 1473
												? 'max-w-450px'
												: width > 1019
													? `w-49per ${index === 0 ? 'mr-1rem' : ''}`
													: 'w-100per'} jc-b column bg-secondary`}
										>
											<div>
												<h4 className="fs-20px mv-8px ta-c jc-c title_font lh-30px">
													{home_page.h1}
												</h4>
												{home_page.show_image &&
												home_page.images && (
													<div className="m-auto jc-c max-w-300px">
														<Link to={home_page.link}>
															<img
																style={{ borderRadius: '20px', width: '100%' }}
																src={home_page.images[0]}
																className="max-w-300px jc-c m-auto"
																alt="Promo"
																title="Promo Image"
															/>
														</Link>
													</div>
												)}

												<div className="m-auto jc-c max-w-300px">
													{!home_page.show_image &&
													home_page.images && (
														<Link to={home_page.link} className="home_page_pictures">
															{home_page.images.map((image, index) => (
																<img
																	src={image}
																	className={
																		'w-100per br-20px m-auto image_' + (index + 1)
																	}
																	alt="Promo"
																	title="Promo Image"
																/>
															))}
														</Link>
													)}
												</div>
												{home_page.show_video && (
													<div className="jc-c pos-rel">
														<div className="iframe-container">
															<iframe
																title="Content Video"
																width="996"
																height="560"
																style={{ borderRadius: '20px' }}
																src={`https://www.youtube.com/embed/${home_page.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
																frameborder="0"
																allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
																allowfullscreen="1"
															/>
														</div>
													</div>
												)}

												<div className="jc-c">
													<h4 className="fs-18px mb-0px ta-c title_font lh-30px">
														{home_page.h2}
													</h4>
												</div>
												<div className="jc-c w-100per m-auto">
													<ReadMore
														width={2000}
														className="p_descriptions paragraph_font"
														length={100}
														pre={true}
													>
														{home_page.p}
													</ReadMore>
												</div>
											</div>
											<div className="jc-c">
												<Link to={home_page.link}>
													<button className="btn primary bob">{home_page.button}</button>
												</Link>
											</div>
										</div>
									);
								})}
					</div>
					<div className="jc-c">
						{/* <h2 className="ta-c phrase_font">From a Glover that just wants the world to stay lit 🔥 </h2> */}
						{/* <h2 className="ta-c phrase_font">Lighting up your world one LED at a time </h2> */}
					</div>
					{/* <p className="p_descriptions paragraph_font ta-c home_page_description">
			
			</p> */}

					{/* <div className="big_home_page_cards">
				{homepage_videos.map((card, index) => {
					return (
						<div className="container max-h-69rem" style={{ backgroundColor: card.color }} key={index}>
							<div className="jc-c">
								<h4 className="ta-c fs-25px title_font mt-0px">{card.name}</h4>
							</div>
							<div className="row">
								<div className="iframe-container-big">
									<iframe
										title={`${card.name} Promo Video`}
										width="996"
										height="560"
										className="br-20px"
										src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen="1"
									/>
								</div>
								<div className="ml-2rem">
									<p className="p_descriptions paragraph_font w-50rem">{card.description}</p>
									<div className="jc-c">
										<Link className="w-100per" to={`/collections/all/products/${card.category}`}>
											<button className="btn primary w-100per">Shop {card.name}</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div> */}
					<div className={`small_home_page_cards ${width > 1019 ? 'jc-b' : 'jc-c'} wrap`}>
						{homepage_videos.map((card, index) => {
							return (
								<div
									className={`container ${width > 1473
										? 'max-w-450px'
										: width > 1019
											? `w-49per ${index === 0 ? 'mr-1rem' : ''}`
											: 'w-100per'} jc-b column`}
									style={{ backgroundColor: card.color }}
									key={index}
								>
									<div className="">
										<div className="jc-c">
											<h2 className="ta-c">{card.name}</h2>
										</div>
										<div className="jc-c pos-rel mb-1rem">
											<div className="iframe-container">
												<iframe
													title={`${card.name} Promo Video`}
													style={{ borderRadius: '20px' }}
													src={`https://www.youtube.com/embed/${card.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
													frameborder="0"
													allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
													allowfullscreen="1"
												/>
											</div>
										</div>
										<ReadMore width={1000} className="p_descriptions paragraph_font " length={100}>
											{card.description}
										</ReadMore>
									</div>
									<div className="jc-c">
										<Link className="w-100per" to={`/collections/all/products/${card.category}`}>
											<button className="btn primary w-100per">Shop {card.name}</button>
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
export default HomePage;
