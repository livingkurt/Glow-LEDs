import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFeatures, deleteFeature } from '../../actions/featureActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const FeaturesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const featureList = useSelector((state) => state.featureList);
	const { loading, features, error } = featureList;

	const featureSave = useSelector((state) => state.featureSave);
	const { success: successSave } = featureSave;

	const featureDelete = useSelector((state) => state.featureDelete);
	const { success: successDelete } = featureDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listFeatures());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listFeatures(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listFeatures(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listFeatures(category, searchKeyword, sortOrder));
		},
		[ category, searchKeyword, sortOrder, stableDispatch ]
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

	return (
		<div className="main_container">
			<Helmet>
				<title>Admin Features | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/editfeature">
					<button className="button primary" style={{ width: '160px' }}>
						Create Feature
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Features</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{features && (
					<div className="feature-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>user</th>
									<th>Release Date</th>
									<th>glover name</th>
									<th>instagram handle</th>
									<th>facebook name</th>
									<th>product</th>
									{/* <th>quote</th> */}
									<th>video</th>
									<th>song id</th>
									<th>picture</th>
								</tr>
							</thead>
							<tbody>
								{features.map((feature) => (
									<tr
										key={feature._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '5rem' }}>
											{feature.user}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{format_date(feature.release_date)}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.glover_name}
										</td>
										<td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.instagram_handle}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{feature.facebook_name}
										</td>
										<td className="p-10px" style={{ minWidth: '5rem' }}>
											{feature.product}
										</td>
										{/* <td className="p-10px" style={{ minWidth: '5rem' }}>{feature.quote}</td> */}
										<td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.video}
										</td>
										<td className="p-10px" style={{ minWidth: '50rem' }}>
											{feature.song_id}
										</td>
										<td className="p-10px" style={{ minWidth: '10rem' }}>
											{feature.picture}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editfeature/' + feature._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(feature)}>
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
