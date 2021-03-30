import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Team, TeamSmallScreen, Search, Sort } from '../../components/SpecialtyComponents/index';
import { Loading } from '../../components/UtilityComponents';
import { humanize } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { listTeams } from '../../actions/teamActions';

const AllTeamsPage = (props) => {
	const history = useHistory();
	const search = props.location.search.substring(8) ? props.location.search.substring(8) : '';
	// console.log({ search_outside: search });
	const [ searchKeyword, setSearchKeyword ] = useState(
		props.location.search.substring(8) ? props.location.search.substring(8) : ''
	);
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';

	// console.log({ subcategory });
	// console.log(props.match.params);
	const teamList = useSelector((state) => state.teamList);
	const { teams, loading, error } = teamList;
	const dispatch = useDispatch();

	useEffect(
		() => {
			// dispatch(listTeams(''));
			// dispatch(listTeams(''));
			// console.log({ search: search.substring(8) });
			dispatch(listTeams(category, subcategory, searchKeyword));
		},
		[ searchKeyword ]
	);

	// useEffect(
	// 	() => {
	// 		// dispatch(listTeams(''));
	// 		// dispatch(listTeams(''));
	// 		console.log(props.location);
	// 		// let params = new URLSearchParams(props.location);
	// 		// params.delete('search');

	// 		// let params = new URLSearchParams(props.location.pathmame + props.location.search);

	// 		// params.delete('searcj'); //Query string is now: 'bar=2'
	// 		setSearchKeyword('');
	// 		dispatch(listTeams(category, subcategory));
	// 		dispatch(listTeams(category, subcategory));
	// 	},
	// 	[ props.location.pathname ]
	// );

	useEffect(
		() => {
			console.log({ category });
			console.log({ subcategory });
			console.log({ searchKeyword });
			// console.log({ search });
			// if (
			// 	[
			// 		'diffuser_caps',
			// 		'infinity_mirrors',
			// 		'accessories',
			// 		'frosted_diffusers',
			// 		'diffuser_adapters',
			// 		'glow_strings',
			// 		'mega_diffuser_caps',
			// 		'mini_diffuser_adapters'
			// 	].includes(category)
			// ) {
			if (searchKeyword) {
				history.push({
					search: '?search=' + searchKeyword
				});
			}
			// else if (search) {
			// 	history.push({
			// 		search: '?search=' + search
			// 	});
			// }

			dispatch(listTeams(category, subcategory, searchKeyword));

			// } else {

			// 	dispatch(listTeams(''));
			// 	dispatch(listTeams(''));
			// }
		},
		[ category, subcategory, searchKeyword ]
	);

	useEffect(
		() => {
			dispatch(listTeams(category, subcategory, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		console.log({ searchKeyword });
		e.preventDefault();
		// history.push(
		// 	'/collections/all/teams/category' + category + '/subcategory/' + subcategory + '?search=' + searchKeyword
		// );
		history.push({
			search: '?search=' + searchKeyword
		});

		dispatch(listTeams(category, subcategory, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listTeams(category, subcategory, searchKeyword, e.target.value));
	};

	const descriptions = {
		teams:
			'Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Glowskins, and Glow Strings. Click to Shop.',
		frosted_diffusers:
			'Take your gloving light shows to the next level with our Frosted Dome Diffusers at Glow LEDs. Shop Dome Diffusers, Large Dome Diffusers, and Frosted Diffusers. Click to Shop.',
		diffuser_caps:
			'Take your gloving light shows to the next level with our Diffuser Caps at Glow LEDs. Shop Screw on LED Caps, Cap over Diffusers, and Diffuser filters. Click to Shop.',
		diffuser_adapters:
			'Take your gloving light shows to the next level with our Diffuser Adapters at Glow LEDs. Shop Screw On Diffusers, LED Adapters, and Diffuser Cap Adapters. Click to Shop.',
		glow_strings:
			'Decorate your home and festival with these stunning glow strings at Glow LEDs. Shop String Lights, LED Strips, and Addressable LEDs. Click to Shop.',
		glowskins:
			'Take your gloving light shows to the next level with our Glowskins at Glow LEDs. Shop Diffuser Skins, LED Skins, and Diffuser Casing Combo. Click to Shop.'
		// infinity_mirrors:
		// 	'Decorate your home and festival with these stunning Glowskins at Glow LEDs. Shop Addressable LED Mirrors, LED Mirrors, and Custom Glowskins. Click to Shop.'
	};

	const description_determination = () => {
		if (category === 'frosted_diffusers') {
			return descriptions.frosted_diffusers;
		}
		if (category === 'diffuser_adapters') {
			return descriptions.diffuser_adapters;
		}
		if (category.toLowerCase() === 'diffuser_caps') {
			return descriptions.diffuser_caps;
		}
		// if (category === 'infinity_mirrors') {
		// 	return descriptions.infinity_mirrors;
		// }
		if (category === 'glowskins') {
			return descriptions.glowskins;
		}
		if (category === 'glow_strings') {
			return descriptions.glow_strings;
		} else {
			return descriptions.teams;
		}
	};
	// console.log({ category });

	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest' ];

	const date = new Date();

	const today = date.toISOString();

	return (
		<div>
			<Helmet>
				<title>Teamd | Glow LEDs</title>
				<meta property="og:title" content="Teamd" />
				<meta name="twitter:title" content="Teamd" />
				<link rel="canonical" href="https://www.glow-leds.com/collections/all/teams" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/all/teams" />
				<meta name="description" content={description_determination()} />
				<meta property="og:description" content={description_determination()} />
				<meta name="twitter:description" content={description_determination()} />
			</Helmet>
			{/* <button className="btn secondary" onClick={() => history.goBack()}>
				Back to Menu
			</button> */}
			<div className="jc-fe">
				<Link to="/account/login?redirect=/secure/account/submit_team">
					<button className="btn secondary ">Submit Team</button>
				</Link>
			</div>
			<div className="jc-c">
				<div className="row">
					<h1>Sponsored Teams</h1>
					{/* <label style={{ color: '#d2cfcf', marginTop: '10px' }}>
						{category === 'diffuser_caps' ||
						category === 'diffuser_adapters' ||
						category === 'mega_diffuser_caps' ||
						category === 'mini_diffuser_adapters' ||
						category === 'glowskins' ||
						category === 'glow_strings' ? (
							'™'
						) : (
							''
						)}{' '}
					</label> */}
				</div>
			</div>

			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				{/* <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} /> */}
				{/* <Sort sortHandler={sortHandler} sort_options={sort_options} /> */}
			</div>
			{/* <div className="jc-c">
				<h1> Teamd</h1>
			</div> */}

			{/* <p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here is an archive of the lightshows and product reviews that you have so graciously given to us. We
				appreciate each and every one of you.
			</p> */}
			{teams && (
				<Loading loading={loading} error={error}>
					<div>
						<div className="product_big_screen">
							{teams && (
								<ul className="products" style={{ marginTop: 0, textDecoration: 'none' }}>
									{teams.map(
										(team, index) =>
											!team.hidden && (
												<Team
													size="300px"
													key={index}
													team={team}
													category={props.match.params.category}
												/>
											)
									)}
								</ul>
							)}
						</div>

						<div className="product_small_screen none">
							{teams && (
								<ul className="products" style={{ marginTop: 0, textDecoration: 'none' }}>
									{teams.map(
										(team, index) =>
											!team.hidden && (
												<TeamSmallScreen
													size="300px"
													key={index}
													team={team}
													category={props.match.params.category}
												/>
											)
									)}
								</ul>
							)}
						</div>
					</div>
					{teams.length === 0 && (
						<h2 style={{ textAlign: 'center' }}>Sorry we can't find anything wiht that name</h2>
					)}
				</Loading>
			)}
		</div>
	);
};
export default AllTeamsPage;