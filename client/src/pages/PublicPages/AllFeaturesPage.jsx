import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Feature, FeatureSmallScreen, Search, Sort } from '../../components/SpecialtyComponents/index';
import { Loading } from '../../components/UtilityComponents';
import { humanize } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { listFeatures } from '../../actions/featureActions';

const AllFeaturesPage = (props) => {
	const history = useHistory();
	const [ search, set_search ] = useState(
		props.location.search.substring(8) ? props.location.search.substring(8) : ''
	);
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const subcategory = props.match.params.subcategory ? props.match.params.subcategory : '';

	const featureList = useSelector((state) => state.featureList);
	const { features, loading, error } = featureList;
	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listFeatures(category, subcategory, search));
			}
			return () => (clean = false);
		},
		[ search ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (search) {
					history.push({
						search: '?search=' + search
					});
				}

				dispatch(listFeatures(category, subcategory, search));
			}
			return () => (clean = false);
		},
		[ category, subcategory, search ]
	);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listFeatures(category, subcategory, search, sortOrder));
			}
			return () => (clean = false);
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		console.log({ search });
		e.preventDefault();
		// history.push(
		// 	'/collections/all/features/category' + category + '/' + subcategory + '?search=' + search
		// );
		history.push({
			search: '?search=' + search
		});
		dispatch(listFeatures(category, subcategory, search, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listFeatures(category, subcategory, search, e.target.value));
	};

	const descriptions = {
		features:
			'Take your rave and festival experience to the next level with our LED Accessories at Glow LEDs. Shop Diffuser Caps, Glowskins, and Glow Strings. Click to Shop.',
		diffusers:
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
		if (category === 'diffusers') {
			return descriptions.diffusers;
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
			return descriptions.features;
		}
	};
	// console.log({ category });

	const sort_options = [ 'Category', 'Newest', 'Lowest', 'Highest' ];

	const date = new Date();

	const today = date.toISOString();

	return (
		<div>
			<Helmet>
				<title>Featured | Glow LEDs</title>
				<meta property="og:title" content="Featured" />
				<meta name="twitter:title" content="Featured" />
				<link rel="canonical" href="https://www.glow-leds.com/collections/features" />
				<meta property="og:url" content="https://www.glow-leds.com/collections/features" />
				<meta name="description" content={description_determination()} />
				<meta property="og:description" content={description_determination()} />
				<meta name="twitter:description" content={description_determination()} />
			</Helmet>
			{/* <button className="btn secondary" onClick={() => history.goBack()}>
				Back to Menu
			</button> */}
			<div className="jc-fe">
				<Link to="/account/login?redirect=/account/submit_feature">
					<button className="btn secondary ">Submit Feature</button>
				</Link>
			</div>
			<div className="jc-c">
				<div className="row">
					<h1>{'Featured ' + humanize(category) || 'Featured'}</h1>
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
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				{/* <Sort sortHandler={sortHandler} sort_options={sort_options} /> */}
			</div>
			{/* <div className="jc-c">
				<h1> Featured</h1>
			</div> */}

			{/* <p className="p_descriptions" style={{ textAlign: 'center' }}>
				Here is an archive of the lightshows and product reviews that you have so graciously given to us. We
				appreciate each and every one of you.
			</p> */}
			<Loading loading={loading} error={error}>
				<div>
					<div className="product_big_screen">
						{features && (
							<ul className="products" style={{ marginTop: 0, textDecoration: 'none' }}>
								{features
									.filter((feature) => feature.release_date <= today && feature.category === category)
									.map(
										(feature, index) =>
											!feature.hidden && (
												<Feature
													size="300px"
													key={index}
													feature={feature}
													category={props.match.params.category}
												/>
											)
									)}
							</ul>
						)}
					</div>

					<div className="product_small_screen none">
						{features && (
							<ul className="products" style={{ marginTop: 0, textDecoration: 'none' }}>
								{features
									.filter((feature) => feature.release_date <= today && feature.category === category)
									.map(
										(feature, index) =>
											!feature.hidden && (
												<FeatureSmallScreen
													size="300px"
													key={index}
													feature={feature}
													category={props.match.params.category}
												/>
											)
									)}
							</ul>
						)}
					</div>
				</div>
				{features.length === 0 && (
					<h2 style={{ textAlign: 'center' }}>Sorry we can't find anything with that name</h2>
				)}
			</Loading>
		</div>
	);
};
export default AllFeaturesPage;
