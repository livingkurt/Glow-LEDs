import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsFeature, listFeatures } from '../../actions/featureActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';

const FeaturedPage = (props) => {
	const history = useHistory();
	const featureDetails = useSelector((state) => state.featureDetails);
	console.log({ featureDetails });
	const { feature } = featureDetails;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsFeature(props.match.params.pathname));
		console.log(props.match.params.pathname);
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Featured | Glow LEDs</title>
				<meta property="og:title" content="Featured" />
				<meta name="twitter:title" content="Featured" />
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

			{feature && (
				<div className="">
					<button className="btn secondary" onClick={() => history.goBack()}>
						Back to Features
					</button>
					<div className="column jc-c">
						<h2 style={{ textAlign: 'center' }}>{feature.glover_name} Light Show</h2>
					</div>
					<div className="jc-c pos-rel">
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								style={{ borderRadius: '20px' }}
								src={`https://www.youtube.com/embed/${feature.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out {feature.glover_name} with the {feature.product && humanize(feature.product)}!
					</p>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow him @ {feature.facebook_name} on Facebook and @{feature.instagram_handle} on Instagram
					</p>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Song ID: {feature.song_id}
					</p>
					<Link to={`/collections/all/products/${feature.product}`}>
						<div className="column jc-c">
							<div className="p_descriptions" style={{ textAlign: 'center' }}>
								<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
									{feature.product && humanize(feature.product)}
								</button>
							</div>
						</div>
					</Link>
				</div>
			)}
		</div>
	);
};
export default FeaturedPage;
