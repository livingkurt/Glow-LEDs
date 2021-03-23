import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { detailsTeam, listTeams } from '../../actions/teamActions';
import { humanize } from '../../utils/helper_functions';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

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
						{/* <button className="btn secondary" onClick={() => history.goBack()}>
							Back to Teams
						</button> */}
						<Link to="/secure/glow/teams">
							<button className="btn secondary">Back to Teams</button>
						</Link>
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
						<h2 style={{ textAlign: 'center' }}>{team.artist_name}</h2>
					</div>
					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						{team.description}
					</p>
					{team.video && (
						<div className="jc-c pos-rel">
							<div className="iframe-container">
								<iframe
									width="996"
									height="560"
									style={{ borderRadius: '20px' }}
									src={`https://www.youtube.com/embed/${team.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
									frameborder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen="1"
								/>
							</div>
						</div>
					)}
					<div className="products">
						{team.images &&
							team.images.map((image) => {
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
						Check out {team.artist_name} with the {team.product && humanize(team.product)}!
					</p> */}

					<p className="p_descriptions" style={{ textAlign: 'center' }}>
						Follow {team.facebook_name} on Facebook and @{team.instagram_handle} on Instagram
					</p>
					{team.song_id && (
						<p className="p_descriptions" style={{ textAlign: 'center' }}>
							Song ID: {team.song_id}
						</p>
					)}

					<div className="p_descriptions" style={{ textAlign: 'center' }}>
						<a
							rel="noreferrer"
							className="jc-c w-100per"
							href={team.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button className="btn primary " style={{ margin: 'auto', marginBottom: '10px' }}>
								{team.product ? humanize(team.product) : `See More from ${team.artist_name}`}
							</button>
						</a>
					</div>
				</div>
			)}
		</div>
	);
};
export default TeamPage;
