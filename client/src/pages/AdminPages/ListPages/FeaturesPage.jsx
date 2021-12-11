import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFeatures, deleteFeature } from '../../../actions/featureActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date } from '../../../utils/helper_functions';
import { Search, Sort } from '../../../components/SpecialtyComponents';

const FeaturesPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const featureList = useSelector((state) => state.featureList);
	const { loading, features, error } = featureList;

	const featureSave = useSelector((state) => state.featureSave);
	const { success: successSave } = featureSave;

	const featureDelete = useSelector((state) => state.featureDelete);
	const { success: successDelete } = featureDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listFeatures({}));
			}
			return () => (clean = false);
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listFeatures({ category, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listFeatures({ category, search, sort: e.target.value }));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listFeatures({ category, search, sort }));
			}
			return () => (clean = false);
		},
		[ category, search, sort, dispatch ]
	);
	const deleteHandler = (feature) => {
		dispatch(deleteFeature(feature._id));
	};

	const sort_options = [
		'Release Date',
		'Glover Name',
		'Facebook Name',
		'Instagram Handle',
		'Product',
		'Song ID',
		'Newest'
	];
	const colors = [
		{ name: 'Glovers', color: '#3e4c6d' },
		{ name: 'Producers', color: '#4b7188' },
		{ name: 'Artists', color: '#6f5f7d' },
		{ name: 'VFX', color: '#408184' },
		{ name: 'Unreleased', color: '#636363' }
		// { name: 'Refunded', color: '#a9a9a9' }
	];

	const determine_color = (feature) => {
		let result = '';
		if (feature.category === 'glovers') {
			result = colors[0].color;
		}
		if (feature.category === 'producers') {
			result = colors[1].color;
		}
		if (feature.category === 'artists') {
			result = colors[2].color;
		}

		if (feature.category === 'vfx') {
			result = colors[3].color;
		}
		if (!feature.release_date) {
			result = colors[4].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Features | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/editfeature">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Feature
					</button>
				</Link>
			</div>
			<div className="wrap jc-b">
				{colors.map((color, index) => {
					return (
						<div className="wrap jc-b w-18rem m-1rem" key={index}>
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Features</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{features && (
					<div className="feature-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									{/* <th>user</th> */}
									<th>Release Date</th>
									<th>Category</th>
									<th>Artist Name</th>

									{/* <th>Pathname</th> */}
									<th>Instagram handle</th>
									<th>Facebook name</th>
									{/* <th>product</th> */}
									{/* <th>quote</th> */}
									<th>video</th>
									{/* <th>song id</th> */}
									{/* <th>picture</th> */}
								</tr>
							</thead>
							<tbody>
								{features.map((feature, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(feature),
											fontSize: '16px'
										}}
									>
										{/* <td className="p-10px" style={{ minWidth: '5rem' }}>
											{feature.user}
										</td> */}
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.release_date && format_date(feature.release_date)}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.category}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.artist_name}
										</td>

										{/* <td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.pathname}
										</td> */}
										<td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.instagram_handle}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.facebook_name}
										</td>
										{/* <td className="p-10px" style={{ minWidth: '5rem' }}>
											{feature.product}
										</td> */}
										{/* <td className="p-10px" style={{ minWidth: '5rem' }}>{feature.quote}</td> */}
										<td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.video}
										</td>
										{/* <td className="p-10px" style={{ minWidth: '50rem' }}>
											{feature.song_id}
										</td> */}
										{/* <td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.picture}
										</td> */}
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editfeature/' + feature.pathname}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(feature)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default FeaturesPage;
