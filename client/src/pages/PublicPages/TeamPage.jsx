import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsTeam, listTeams } from '../../actions/teamActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LazyImage } from '../../components/UtilityComponents';

const TeamPage = (props) => {
	const history = useHistory();
	const teamDetails = useSelector((state) => state.teamDetails);
	const { team } = teamDetails;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(detailsTeam(props.match.params.pathname));
		console.log(props.match.params.pathname);
		return () => {};
	}, []);

	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Team | Glow LEDs</title>
				<meta property="og:title" content="Team" />
				<meta name="twitter:title" content="Team" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/teamd" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/teamd" />
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

			{team && (
				<div className="">
					<div className="jc-b">
						<button className="btn secondary" onClick={() => history.goBack()}>
							Back
						</button>
						{/* <Link to="/collections/all/teams">
							<button className="btn secondary">Back to Teams</button>
						</Link> */}
						{userInfo &&
						userInfo.isAdmin && (
							<Link to={'/secure/glow/editteam/' + props.match.params.pathname}>
								<button className="btn secondary" style={{ width: '156px' }}>
									Edit Team
								</button>
							</Link>
						)}
					</div>
					<div className="column jc-c">
						<h2 style={{ textAlign: 'center' }}>{team.team_name}</h2>
					</div>
					<div className="">
						<LazyImage
							look="sponsor-image sponsor_image_small"
							alt={team.team_name}
							title="Sponsor Image"
							size={{
								height: 'auto',
								width: '100%',
								display: 'none',
								maxWidth: 'unset',
								maxHeight: 'unset'
							}}
							effect="blur"
							src={team.picture} // use normal <img> attributes as props
						/>
					</div>
					{team.video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									width="996"
									height="560"
                  title="Team Video"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${team.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}

					{/* <p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out {team.team_name} with the {team.product && humanize(team.product)}!
					</p> */}
					{/* <div className="mt-2rem">
						<LazyImage
							look="sponsor-image"
							alt={team.name}
							title="Sponsor Image"
							size={{ height: 'auto', width: '100%' }}
							effect="blur"
							src={team.picture} // use normal <img> attributes as props
						/>
					</div> */}
					<div className="jc-b ">
						<div className="" style={{ flex: '1 1 70%' }}>
							<h3 className="">Bio</h3>
							<p className="p_descriptions ">{team.bio}</p>
							<h3 className="">Follow {team.team_name} </h3>
							<div className="mt-2rem wrap  ">
								<div className="fs-30px jc-fs w-100per max-w-500px ai-c">
									<div className="fs-40px">
                    {team.facebook_name && 
										<a
											href={'https://www.facebook.com/' + team.facebook_name}
											target="_blank"
											rel="noopener noreferrer"
										>
											<i className="fab fa-facebook zoom" />
										</a>
                    }
									</div>
									<div className="ml-10px fs-40px">
                  {team.instagram_handle && 
										<a
											href={'https://www.instagram.com/' + team.instagram_handle}
											target="_blank"
											rel="noopener noreferrer"
										>
											<i className="fab fa-instagram zoom" />
										</a>}
									</div>
								</div>
							</div>
						</div>
						<div className="mt-2rem">
							<LazyImage
								look="sponsor-image sponsor_image_big"
								alt={team.name}
								title="Sponsor Image"
								size={{ height: 'auto', width: '100%' }}
								effect="blur"
								src={team.picture} // use normal <img> attributes as props
							/>
						</div>
					</div>
					<h3 className=""> {team.team_name} Team Members</h3>
					<div className="products">
						{team.affiliates &&
							team.affiliates.map((affiliate, index) => {
								return (
									<Link to={'/collections/all/sponsors/' + affiliate.pathname} className="pos-rel" key={index}>
										<img
											className="m-1rem br-10px h-auto max-h-200px max-w-200px ta-c responsive_img "
                      alt="Team Mate"
											src={affiliate.picture}
										/>
										<h3
											className="pos-abs fs-30px"
											style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
										>
											{affiliate.artist_name}
										</h3>
									</Link>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
};
export default TeamPage;
