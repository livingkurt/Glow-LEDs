import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import { ReadMore, Search } from '../../components/SpecialtyComponents';
import { listProducts } from '../../actions/productActions';
import { homepage_videos } from '../../utils/helper_functions';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { API_Products } from '../../utils';

const HomePage = (props) => {
	const [ content_1, set_content_1 ] = useState({});
	const [ content_2, set_content_2 ] = useState({});
	const [ content_3, set_content_3 ] = useState({});
	const [ filtered_products, set_filtered_products ] = useState([]);
	const history = useHistory();

	const [ display, setDisplay ] = useState(false);
	const [ options, setOptions ] = useState([]);
	const [ search, setSearch ] = useState('');
	const wrapperRef = useRef(null);

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

	const updatePokeDex = (poke) => {
		setSearch(poke);
		setDisplay(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		history.push('/collections/all/products?search=' + search);
	};

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;
	const [ inactive, set_inactive ] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		get_all_products();
		return () => {};
	}, []);

	const get_all_products = async () => {
		const { data } = await API_Products.get_all_products();
		console.log({ data });
		setOptions(data.filter((product) => !product.option).filter((product) => !product.hidden));
	};
	// useEffect(
	// 	() => {
	// 		if (products && products.length > 0) {
	// 			set_filtered_products(products.map((product) => product.name));
	// 			setOptions(products.filter((product) => !product.option));
	// 		}
	// 		return () => {};
	// 	},
	// 	[ products ]
	// );

	useEffect(
		() => {
			// const active_content = contents.find((content) => content.active === true);
			const active_contents = contents.filter((content) => content.active === true);
			console.log({ active_contents });
			if (active_contents && active_contents[0]) {
				set_content_1(active_contents[0]);
			}
			if (active_contents && active_contents[1]) {
				set_content_2(active_contents[1]);
			}
			if (active_contents && active_contents[2]) {
				set_content_3(active_contents[2]);
			}
			return () => {};
		},
		[ contents ]
	);

	return (
		<div className="main_container p-20px">
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

			<div className="jc-c">
				<h1 className="welcome_text mb-1rem ta-c" style={{ fontSize: '4rem' }}>
					Welcome to Glow-LEDs
				</h1>
			</div>

			<div className="jc-c ">
				<form onSubmit={submitHandler} className="jc-c w-100per mv-20px">
					<div className="jc-b ai-c search_container w-100per max-w-600px">
						<div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
							<input
								id="auto"
								onClick={() => setDisplay(!display)}
								className="form_input search mv-0px w-100per fs-20px"
								placeholder="Find Your Glow Here"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							{display && (
								<div className="pos-abs bg-primary br-10px">
									{options
										.filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
										.map((value, i) => {
											return (
												<div
													onClick={() => updatePokeDex(value.name)}
													className="auto-option ai-c jc-b w-500px p-5px"
													key={i}
													tabIndex="0"
												>
													<span className="fs-20px" style={{ color: 'white' }}>
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

			{content_1 &&
			inactive &&
			content_1.home_page && (
				<div className="home_page_divs">
					<h4 className="fs-25px mt-8px ta-c title_font">{content_1.home_page.h1}</h4>
					{content_1.home_page.show_image &&
					content_1.home_page.images && (
						<div className="m-auto jc-c max-w-600px">
							<Link to={content_1.home_page.link}>
								<img
									style={{ borderRadius: '20px', width: '100%' }}
									src={content_1.home_page.images[0]}
									className="max-w-800px jc-c m-auto"
									alt="Promo"
									title="Promo Image"
								/>
							</Link>
						</div>
					)}

					<div className="m-auto jc-c max-w-800px">
						{!content_1.home_page.show_image &&
						content_1.home_page.images && (
							<Link to={content_1.home_page.link} className="home_page_pictures">
								{content_1.home_page.images.map((image, index) => (
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
					{content_1.home_page.show_video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									title="Content Video"
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${content_1.home_page
										.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					<div className="jc-c">
						<h4 className="fs-18px mb-0px ta-c title_font">{content_1.home_page.h2}</h4>
					</div>
					<div className="max-w-800px jc-c w-100per m-auto">
						<ReadMore width={1000} className="p_descriptions paragraph_font" length={100} pre={true}>
							{content_1.home_page.p}
						</ReadMore>
					</div>
					<div className="jc-c">
						<Link to={content_1.home_page.link}>
							<button className="btn primary bob">{content_1.home_page.button}</button>
						</Link>
					</div>
				</div>
			)}
			{content_2 &&
			inactive &&
			content_2.home_page && (
				<div className="home_page_divs">
					<h4 className="fs-25px mt-8px ta-c title_font">{content_2.home_page.h1}</h4>
					{content_2.home_page.show_image &&
					content_2.home_page.images && (
						<div className="m-auto jc-c max-w-600px">
							<Link to={content_2.home_page.link}>
								<img
									style={{ borderRadius: '20px', width: '100%' }}
									src={content_2.home_page.images[0]}
									className="max-w-800px jc-c m-auto"
									alt="Promo"
									title="Promo Image"
								/>
							</Link>
						</div>
					)}

					<div className="m-auto jc-c max-w-800px">
						{!content_2.home_page.show_image &&
						content_2.home_page.images && (
							<Link to={content_2.home_page.link} className="home_page_pictures">
								{content_2.home_page.images.map((image, index) => (
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
					{content_2.home_page.show_video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									title="Content Video"
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${content_2.home_page
										.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					<div className="jc-c">
						<h4 className="fs-18px mb-0px ta-c title_font">{content_2.home_page.h2}</h4>
					</div>
					<div className="max-w-800px jc-c w-100per m-auto">
						<ReadMore width={1000} className="p_descriptions paragraph_font" length={100} pre={true}>
							{content_2.home_page.p}
						</ReadMore>
					</div>
					<div className="jc-c">
						<Link to={content_2.home_page.link}>
							<button className="btn primary bob">{content_2.home_page.button}</button>
						</Link>
					</div>
				</div>
			)}
			{content_3 &&
			inactive &&
			content_3.home_page && (
				<div className="home_page_divs">
					<h4 className="fs-25px mt-8px ta-c title_font">{content_3.home_page.h1}</h4>
					{content_3.home_page.show_image &&
					content_3.home_page.images && (
						<div className="m-auto jc-c max-w-600px">
							<Link to={content_3.home_page.link}>
								<img
									style={{ borderRadius: '20px', width: '100%' }}
									src={content_3.home_page.images[0]}
									className="max-w-800px jc-c m-auto"
									alt="Promo"
									title="Promo Image"
								/>
							</Link>
						</div>
					)}

					<div className="m-auto jc-c max-w-800px">
						{!content_3.home_page.show_image &&
						content_3.home_page.images && (
							<Link to={content_3.home_page.link} className="home_page_pictures">
								{content_3.home_page.images.map((image, index) => (
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
					{content_3.home_page.show_video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									title="Content Video"
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${content_3.home_page
										.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					<div className="jc-c">
						<h4 className="fs-18px mb-0px ta-c title_font">{content_3.home_page.h2}</h4>
					</div>
					<div className="max-w-800px jc-c w-100per m-auto">
						<ReadMore width={1000} className="p_descriptions paragraph_font" length={100} pre={true}>
							{content_3.home_page.p}
						</ReadMore>
					</div>
					<div className="jc-c">
						<Link to={content_3.home_page.link}>
							<button className="btn primary bob">{content_3.home_page.button}</button>
						</Link>
					</div>
				</div>
			)}
			<div className="jc-c">
				{/* <h2 className="ta-c phrase_font">From a Glover that just wants the world to stay lit 🔥 </h2> */}
				{/* <h2 className="ta-c phrase_font">Lighting up your world one LED at a time </h2> */}
			</div>
			{/* <p className="p_descriptions paragraph_font ta-c home_page_description">
			
			</p> */}
			<ReadMore width={1000} className="p_descriptions paragraph_font ta-c" length={100}>
				Here at Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are
				handmade at my home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with
				the intention of turning your home into a glowing rainbow dreamland with infinite hours of
				entertainment. You don’t need a party to enjoy our products (although parties are definitely
				encouraged). The beautiful colors have the ability to turn your home into the next best festival or into
				a relaxing retreat, you decide.
			</ReadMore>
			<div className="big_home_page_cards">
				{homepage_videos.map((card, index) => {
					return (
						<div className="home_page_divs max-h-69rem" style={{ backgroundColor: card.color }} key={index}>
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
										<Link
											className="w-100per"
											to={`/collections/all/products/category/${card.category}`}
										>
											<button className="btn primary w-100per">Shop {card.name}</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="small_home_page_cards none">
				{homepage_videos.map((card, index) => {
					return (
						<div className="home_page_divs" style={{ backgroundColor: card.color }} key={index}>
							<div className="jc-c">
								<h2 className="ta-c">{card.name}</h2>
							</div>
							<div className="jc-c pos-rel mb-2rem">
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
							{/* <p className="p_descriptions paragraph_font home_page_description">
									{card.description}
								</p> */}
							<ReadMore width={1000} className="p_descriptions paragraph_font" length={100}>
								{card.description}
							</ReadMore>
							<div className="jc-c">
								<Link className="w-100per" to={`/collections/all/products/category/${card.category}`}>
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
