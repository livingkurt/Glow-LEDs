import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFeatures, deleteFeature } from '../../actions/featureActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date_display_expenses } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

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

	useEffect(
		() => {
			dispatch(listFeatures());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
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
			dispatch(listFeatures(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (feature) => {
		dispatch(deleteFeature(feature._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (feature) => {
		let result = '';
		if (feature.category === 'Supplies') {
			result = colors[0].color;
		}
		if (feature.category === 'Website') {
			result = colors[1].color;
		}
		if (feature.category === 'Shipping') {
			result = colors[2].color;
		}
		if (feature.category === 'Business') {
			result = colors[3].color;
		}
		if (feature.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
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
		<div class="main_container">
			<MetaTags>
				<title>Admin Features | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{colors.map((color) => {
						return (
							<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</FlexContainer>
						);
					})}
				</FlexContainer>
				<Link to="/secure/glow/editfeature">
					<button className="button primary" style={{ width: '160px' }}>
						Create Feature
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Features</h1>
			</FlexContainer>
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</FlexContainer>
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
										<td style={{ minWidth: '5rem' }}>{feature.user}</td>
										<td style={{ minWidth: '15rem' }}>
											{format_date_display_expenses(feature.release_date)}
										</td>
										<td style={{ minWidth: '15rem' }}>{feature.glover_name}</td>
										<td style={{ minWidth: '10rem' }}>{feature.instagram_handle}</td>
										<td style={{ minWidth: '15rem' }}>{feature.facebook_name}</td>
										<td style={{ minWidth: '5rem' }}>{feature.product}</td>
										{/* <td style={{ minWidth: '5rem' }}>{feature.quote}</td> */}
										<td style={{ minWidth: '10rem' }}>{feature.video}</td>
										<td style={{ minWidth: '50rem' }}>{feature.song_id}</td>
										<td style={{ minWidth: '10rem' }}>{feature.picture}</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editfeature/' + feature._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(feature)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
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
