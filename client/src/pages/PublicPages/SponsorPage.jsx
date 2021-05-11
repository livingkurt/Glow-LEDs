import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsAffiliate, listAffiliates } from '../../actions/affiliateActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LazyImage } from '../../components/UtilityComponents';
import { Product, ProductSimple, ProductSimpleSmallScreen } from '../../components/SpecialtyComponents';
import { listTeams } from '../../actions/teamActions';
import { API_Users } from '../../utils';

const SponsorPage = (props) => {
	const [ teams, set_teams ] = useState([]);
	const history = useHistory();
	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate } = affiliateDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const teamList = useSelector((state) => state.teamList);
	// const { teams, loading, error } = teamList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsAffiliate(props.match.params.promo_code));
		// dispatch(detailsTeam('inky_bois'));
		// dispatch(listTeams(''));
		// find_team();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (affiliate && affiliate._id) {
				find_team();
			}

			return () => {};
		},
		[ affiliate ]
	);

	// const teamDetails = useSelector((state) => state.teamDetails);
	// const { team } = teamDetails;

	const find_team = async () => {
		console.log({ affiliate: affiliate._id });
		const { data } = await API_Users.get_teams(affiliate._id);
		set_teams(data);
		// const team = teams.map((team) => team.affiliates.find((member) => member._id === affiliate._id));
		console.log({ data });
	};

	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			{affiliate && (
				<Helmet>
					<title>{affiliate.artist_name + ' | Glow LEDs'}</title>
					<meta property="og:title" content={affiliate.artist_name + ' | Glow LEDs'} />
					<meta name="twitter:title" content={affiliate.artist_name + ' | Glow LEDs'} />
					<link
						rel="canonical"
						href={'https://www.glow-leds.com/collections/all/sponsors/' + affiliate.pathname}
					/>
					<meta
						property="og:url"
						content={'https://www.glow-leds.com/collections/all/sponsors/' + affiliate.pathname}
					/>
					<meta name="description" content={affiliate.bio} />
					<meta property="og:description" content={affiliate.bio} />
					<meta name="twitter:description" content={affiliate.bio} />
				</Helmet>
			)}

			{affiliate && (
				<div className="">
					<div className="jc-b">
						<button className="btn secondary" onClick={() => history.goBack()}>
							Back
						</button>
						{userInfo &&
						userInfo.isAdmin && (
							<Link to={'/secure/glow/editaffiliate/' + props.match.params.pathname}>
								<button className="btn secondary" style={{ width: '156px' }}>
									Edit Affiliate
								</button>
							</Link>
						)}
					</div>

					<div className="column jc-c">
						<h2 style={{ textAlign: 'center' }}>{affiliate.artist_name}</h2>
					</div>
					<div className="">
						<LazyImage
							look="sponsor-image sponsor_image_small"
							alt={affiliate.artist_name}
							title="Sponsor Image"
							size={{
								height: 'auto',
								width: '100%',
								display: 'none',
								maxWidth: 'unset',
								maxHeight: 'unset'
							}}
							effect="blur"
							src={affiliate.picture} // use normal <img> attributes as props
						/>
					</div>
					<div className="jc-b">
						<div className="column" style={{ flex: '1 1 70%' }}>
							<div>
								<h3 className="">Who be this</h3>
								<p className="p_descriptions">
									{affiliate.user && affiliate.user.first_name}{' '}
									{affiliate.user && affiliate.user.last_name}
								</p>
							</div>
							<div>
								<h3 className="">Gloving for</h3>
								<p className="p_descriptions">{affiliate.years} Years</p>
							</div>
							<div>
								<h3 className="">Chillin in </h3>
								<p className="p_descriptions">{affiliate.location}</p>
							</div>
							<div>
								<h3 className="">Bio</h3>
								<p className="p_descriptions">{affiliate.bio}</p>
							</div>
							{affiliate.inspiration && (
								<div>
									<h3 className="">Inspired by</h3>
									<p className="p_descriptions">{affiliate.inspiration}</p>
								</div>
							)}
							{/* <div>
								<h3 className="">Team</h3>
								{console.log({ teams })}
								{teams.map((team) => {
									return (
										<Link to={'/collections/all/teams/' + teams.pathname} className=" pos-rel">
											<LazyImage
												look="sponsor-image w-200px"
												alt={team.name}
												title="Sponsor Image"
												size={{ height: 'auto', width: '100%' }}
												effect="blur"
												src={team.picture} // use normal <img> attributes as props
											/>
											<h3
												className="pos-abs fs-30px"
												style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
											>
												{affiliate.artist_name != 'Koztic' && affiliate.artist_name}
											</h3>
										</Link>
									);
								})}
							</div> */}
							<div>
								<h3 className="">Team{teams > 1 && "'s"}</h3>
								{teams.map((team) => {
									return (
										<Link to={'/collections/all/teams/' + team.pathname} className="pos-rel">
											<img
												className="m-1rem br-10px h-auto max-h-200px max-w-200px ta-c responsive_img "
												src={team.picture}
											/>
											<h3
												className="pos-abs fs-30px w-200px"
												style={{ top: '34px', left: '50%', transform: 'translate(-80%, 100%)' }}
											>
												{team.team_name != 'Koztic' && team.team_name}
											</h3>
										</Link>
									);
								})}
							</div>
							<div>
								<h3 className="">Follow {affiliate.artist_name} </h3>
								<div className="mt-2rem wrap  ">
									<div className="fs-30px jc-fs w-100per max-w-500px ai-c">
										<div className="fs-40px">
											<a
												href={'https://www.facebook.com/' + affiliate.facebook_name}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-facebook zoom" />
											</a>
										</div>
										<div className="ml-10px fs-40px">
											<a
												href={'https://www.facebook.com/' + affiliate.instagram_handle}
												target="_blank"
												rel="noopener noreferrer"
											>
												<i className="fab fa-instagram zoom" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="">
							<LazyImage
								look="sponsor-image sponsor_image_big"
								alt={affiliate.name}
								title="Sponsor Image"
								size={{ height: 'auto', width: '100%' }}
								effect="blur"
								src={affiliate.picture} // use normal <img> attributes as props
							/>
						</div>
					</div>
					<div className="column jc-c">
						<h3 style={{ textAlign: 'center' }}>Watch {affiliate.artist_name} Throw Down</h3>
					</div>
					{affiliate.video && (
						<div className="jc-c pos-rel mt-2rem max-w-75rem m-auto">
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
					<h3 className=""> {affiliate.artist_name}'s Glow Gear</h3>
					{/* <div className="product_big_screen">
						<div className="products jc-b m-auto">
							{console.log({ products: affiliate.products })}
							{affiliate.products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{affiliate.products.map((product, index) => (
										<ProductSimple
											size="300px"
											key={index}
											product={product}
											// product_occurrences={product_occurrences}
										/>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className="product_small_screen none">
						<div className="products jc-b m-auto">
							{console.log({ products: affiliate.products })}
							{affiliate.products && (
								<ul className="products" style={{ marginTop: 0 }}>
									{affiliate.products.map((product, index) => (
										<ProductSimpleSmallScreen
											size="300px"
											key={index}
											product={product}
											// product_occurrences={product_occurrences}
										/>
									))}
								</ul>
							)}
						</div>
					</div> */}
					{affiliate.products && (
						<div>
							<div className="product_big_screen">
								{affiliate.products && (
									<ul className="products" style={{ marginTop: 0 }}>
										{affiliate.products.map((product, index) => (
											<ProductSimple
												size="300px"
												key={index}
												product={product}
												// product_occurrences={product_occurrences}
											/>
										))}
									</ul>
								)}
							</div>

							<div className="product_small_screen none">
								{affiliate.products && (
									<ul className="products" style={{ marginTop: 0 }}>
										{affiliate.products.map((product, index) => (
											<ProductSimpleSmallScreen
												size="300px"
												key={index}
												product={product}
												// product_occurrences={product_occurrences}
											/>
										))}
									</ul>
								)}
							</div>
						</div>
					)}
					{/* <div className="products jc-c m-auto">
						{affiliate.products &&
							affiliate.products.map((product) => {
								return (
									<Link to={'/collections/all/products/' + product.pathname} className="pos-rel">
										<img
											className="m-1rem br-10px h-auto max-h-300px max-w-300px ta-c responsive_img "
											src={product.images[0]}
										/>
										<h3
											className="pos-abs m-1rem w-300px ta-c"
											style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
										>
											{product.name}
										</h3>
									</Link>
								);
							})}
					</div> */}
					{/* <div className="p_descriptions" style={{ textAlign: 'center' }}>
						<a
							rel="noreferrer"
							className="jc-c w-100per"
							href={affiliate.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
								See More from ${affiliate.artist_name}
							</button>
						</a>
					</div> */}
				</div>
			)}
		</div>
	);
};
export default SponsorPage;
