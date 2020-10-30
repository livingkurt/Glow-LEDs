import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { listFeatures } from '../../actions/featureActions';
import { humanize } from '../../utils/helper_functions';

const FeaturedPage = (props) => {
	const featureList = useSelector((state) => state.featureList);
	const { loading, features, error } = featureList;

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading: loading_products, error: error_products } = productDetails;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listFeatures());
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div class="main_container">
			<Helmet>
				<title>Featured | Glow LEDs</title>
				<meta property="og:title" content="Featured | Glow LEDs" />
				<meta name="twitter:title" content="Featured | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/featured" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/featured" />
				<meta
					name="description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					property="og:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
				<meta
					name="twitter:description"
					content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
				/>
			</Helmet>
			<FlexContainer h_center>
				<h1> Featured</h1>
			</FlexContainer>

			<p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here is an archive of the lightshows and product reviews that you have so graciously given to us. We
				appreciate each and every one of you.
			</p>
			{features &&
				features.filter((feature) => feature.release_date <= today).map((feature) => {
					return (
						<div className="home_page_divs">
							<FlexContainer h_center column>
								<h1 style={{ textAlign: 'center' }}>{feature.glover_name} Light Show</h1>
								<p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
									Check out {feature.glover_name} with the {humanize(feature.product)}!
								</p>
								<p className="p_descriptions" style={{ textAlign: 'center' }}>
									Follow him @ {feature.facebook_name} on Facebook and @{feature.instagram_handle} on
									Instagram
								</p>
								<Link to={`/collections/all/products/${feature.product}`}>
									<FlexContainer h_center column>
										<div className="p_descriptions" style={{ textAlign: 'center' }}>
											<button
												className="button primary "
												style={{ margin: 'auto', marginBottom: '10px' }}
											>
												{humanize(feature.product)}
											</button>
										</div>
									</FlexContainer>
								</Link>
							</FlexContainer>
							<FlexContainer h_center styles={{ position: 'relative' }}>
								<div className="iframe-container">
									<iframe
										width="996"
										height="560"
										style={{ borderRadius: '20px' }}
										src={`https://www.youtube.com/embed/${feature.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
										frameborder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen="1"
									/>
								</div>
							</FlexContainer>

							<p className="p_descriptions" style={{ textAlign: 'center' }}>
								{feature.song_id}
							</p>
							<p className="p_descriptions" style={{ textAlign: 'center' }}>
								For Information on how to become featured on our pages. Check our Frequently Asked
								Questions page.
							</p>
							<Link to="/pages/faq">
								<FlexContainer h_center>
									<button
										className="button primary "
										style={{ margin: 'auto', marginBottom: '10px' }}
									>
										Frequently Asked Questions
									</button>
								</FlexContainer>
							</Link>
						</div>
					);
				})}
		</div>
	);
};
export default FeaturedPage;
