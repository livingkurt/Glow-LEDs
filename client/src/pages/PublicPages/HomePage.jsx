import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { listContents } from '../../actions/contentActions';
import { ReadMore, HomeSlideshow } from '../../components/SpecialtyComponents';
import { categories, homepage_videos, humanize, subcategories } from '../../utils/helper_functions';
import { API_Products } from '../../utils';
import useWindowDimensions from '../../components/Hooks/windowDimensions';
import { Loading } from '../../components/UtilityComponents';

const HomePage = (props) => {
	const history = useHistory();

	const [ display, setDisplay ] = useState(false);
	const [ loading, set_loading ] = useState(false);
	const [ options, set_options ] = useState([]);
	const [ products, set_products ] = useState([]);
	const [ slideshow, set_slideshow ] = useState([]);
	const [ search, set_search ] = useState('');
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

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		get_all_products();
		return () => {};
	}, []);
	useEffect(
		() => {
			if (contents) {
				if (contents[0]) {
					if (contents[0].home_page && contents[0].home_page.slideshow) {
						console.log({ slideshow: contents[0].home_page.slideshow });
						set_slideshow(contents[0].home_page.slideshow);
					}
				}
			}

			return () => {};
		},
		[ contents ]
	);

	const get_all_products = async () => {
		set_loading(true);
		const { data } = await API_Products.get_all_products();
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
			<Loading loading={slideshow.length === 0} />
			{/* <div className="carousel-wrapper pos-rel w-100per"> */}
			{/* <div className="skeleton-img-container "> */}

			{/* </div> */}
			{/* </div> */}
			<div>
				{width > 1019 && (
					<div>
						{console.log({ slideshow })}
						{slideshow.length > 0 ? (
							<div className="carousel-wrapper pos-rel">
								{<HomeSlideshow slideshow={slideshow} />}
								{/* {start !== 0 && <HomeSlideshow products={products} start={start} />} */}

								<div
									className="pos-abs max-w-900px m-auto p-10px ph-20px br-10px w-100per"
									style={{
										backgroundColor: '#6a6c8091',
										top: '100px',
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
													{display && (
														<div className="pos-abs bg-primary br-10px">
															{options
																.filter(
																	({ name }) =>
																		name
																			.toLowerCase()
																			.indexOf(search.toLowerCase()) > -1
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
						) : (
							<div className="carousel-wrapper pos-rel">
								<div className="skeleton-img skeleton" />
								<div
									className="pos-abs max-w-900px m-auto p-10px ph-20px br-10px w-100per"
									style={{
										backgroundColor: '#6a6c8091',
										top: '100px',
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
													{display && (
														<div className="pos-abs bg-primary br-10px">
															{options
																.filter(
																	({ name }) =>
																		name
																			.toLowerCase()
																			.indexOf(search.toLowerCase()) > -1
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
					</div>
				)}
				{width < 1019 && (
					<div>
						{slideshow.length > 0 ? (
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
													{display && (
														<div className="pos-abs bg-primary br-10px z-pos-2">
															{options
																.filter(
																	({ name }) =>
																		name
																			.toLowerCase()
																			.indexOf(search.toLowerCase()) > -1
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
								{/* {start > 0 && <HomeSlideshow products={products} start={start} />} */}
								{<HomeSlideshow slideshow={slideshow} />}
							</div>
						) : (
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
												{display && (
													<div className="pos-abs bg-primary br-10px z-pos-2">
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
						)}
					</div>
				)}
			</div>

			<div style={{ marginTop: slideshow.length === 0 ? 0 : '-25%' }}>
				<ReadMore width={1000} className="p_descriptions paragraph_font ta-c " length={100}>
					Here at Glow LEDs we offer a wide variety of Gloving and Flow Art accessories. Including EXO
					Diffusers, Glow Casings and our most popular product Glowskins! We are based in Austin, TX ran by a
					small team of people that are dedicated to creating new and innovated technology for flow artists
					everywhere. The majority of our products are made by hand to order, so you know you're getting a
					quality product every time! If you have an idea you want us to try please do not hesitate to reach
					out via our contact page or at info.glowleds@gmail.com
				</ReadMore>
			</div>
			<div className={`${width > 1019 ? 'jc-b' : 'jc-c'} wrap`}>
				{contents &&
					contents
						.filter((content) => content.active === true)
						.slice(0, width > 1473 ? 3 : width > 1019 ? 2 : 1)
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
										<h4 className="fs-20px mv-8px ta-c jc-c title_font lh-30px">{home_page.h1}</h4>
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
															className={'w-100per br-20px m-auto image_' + (index + 1)}
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
											<h4 className="fs-18px mb-0px ta-c title_font lh-30px">{home_page.h2}</h4>
										</div>
										<div className="jc-c w-100per m-auto">
											<ReadMore
												width={5000}
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

			<div className={`small_home_page_cards ${width > 1019 ? 'jc-b' : 'jc-c'} wrap`}>
				{homepage_videos.map((card, index) => {
					return (
						<div
							className={`container ${width > 1473
								? 'max-w-450px'
								: width > 1019 ? `w-49per ${index === 0 ? 'mr-1rem' : ''}` : 'w-100per'} jc-b column`}
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
								<ReadMore width={3000} className="p_descriptions paragraph_font " length={100}>
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
	);
};
export default HomePage;
