import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsAffiliate, listAffiliates } from '../../actions/affiliateActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const AffiliatedPage = (props) => {
	const history = useHistory();
	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate } = affiliateDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsAffiliate(props.match.params.promo_code));
		console.log(props.match.params.promo_code);
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Affiliated | Glow LEDs</title>
				<meta property="og:title" content="Affiliated" />
				<meta name="twitter:title" content="Affiliated" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/affiliated" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/affiliated" />
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

			{affiliate && (
				<div className="">
					<div className="jc-b">
						{/* <button className="btn secondary" onClick={() => history.goBack()}>
							Back to Affiliates
						</button> */}
						<Link to="/secure/glow/affiliates">
							<button className="btn secondary">Back to Affiliates</button>
						</Link>
						{userInfo &&
						userInfo.isAdmin && (
							<Link to={'/secure/glow/editaffiliate/' + props.match.params.promo_code}>
								<button className="btn secondary" style={{ width: '156px' }}>
									Edit Affiliate
								</button>
							</Link>
						)}
					</div>
					<div className="column jc-c">
						<h2 style={{ textAlign: 'center' }}>{affiliate.artist_name}</h2>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						{affiliate.description}
					</p>
					{affiliate.video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${affiliate.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}
					<div className="products">
						{affiliate.images &&
							affiliate.images.map((image) => {
								return (
									<Zoom className="m-auto">
										{/* <div className="responsive_container"> */}
										<img className="m-1rem br-15px  h-auto ta-c responsive_img" src={image} />
										{/* </div> */}
									</Zoom>
								);
							})}
					</div>

					{/* <p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out {affiliate.artist_name} with the {affiliate.product && humanize(affiliate.product)}!
					</p> */}

					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow {affiliate.facebook_name} on Facebook and @{affiliate.instagram_handle} on Instagram
					</p>
					{affiliate.song_id && (
						<p className="p_descriptions" style={{ textAlign: 'center' }}>
							Song ID: {affiliate.song_id}
						</p>
					)}

					<div className="p_descriptions" style={{ textAlign: 'center' }}>
						<a
							rel="noreferrer"
							className="jc-c w-100per"
							href={affiliate.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
								{affiliate.product ? (
									humanize(affiliate.product)
								) : (
									`See More from ${affiliate.artist_name}`
								)}
							</button>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};
export default AffiliatedPage;
