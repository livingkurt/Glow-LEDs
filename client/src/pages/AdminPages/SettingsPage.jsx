import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSettings, deleteSetting, saveSetting } from '../../actions/settingActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { API_Promos, API_Orders } from '../../utils';
import {
	promoter_revenue_upload,
	sponsor_revenue_upload,
	team_revenue_upload,
	top_code_usage_upload,
	top_earner_upload
} from '../../utils/google_sheets_upload';
import { listTeams } from '../../actions/teamActions';
import { listOrders } from '../../actions/orderActions';

const SettingsPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ loading_settings, set_loading_settings ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
	const category = props.match.params.category ? props.match.params.category : '';

	const settingList = useSelector((state) => state.settingList);
	const { loading, settings, error } = settingList;

	const settingSave = useSelector((state) => state.settingSave);
	const { success: successSave } = settingSave;

	const settingDelete = useSelector((state) => state.settingDelete);
	const { success: successDelete } = settingDelete;
	const dispatch = useDispatch();

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listSettings());
			stableDispatch(listAffiliates(''));
			stableDispatch(listTeams(''));
			stableDispatch(listOrders(''));
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listSettings(category, search, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listSettings(category, search, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listSettings(category, search, sortOrder));
		},
		[ stableDispatch, category, search, sortOrder ]
	);
	const deleteHandler = (setting) => {
		dispatch(deleteSetting(setting._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Paid', color: '#3e4c6d' }, { name: 'Not Paid', color: '#6f3c3c' } ];

	const determine_color = (setting) => {
		let result = '';
		if (setting.paid) {
			result = colors[0].color;
		}
		if (!setting.paid) {
			result = colors[1].color;
		}
		return result;
	};
	console.log({ settings });

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Settings | Glow LEDs</title>
			</Helmet>
			<Loading loading={loading_settings} error={error} />
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color, index) => {
						return (
							<div className="wrap jc-b  m-1rem" key={index}>
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
				<Link to="/secure/glow/editsetting">
					<button className="btn primary">Create Setting</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Settings</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{settings && (
					<div className="setting-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Active</th>
									{/* <th>Settings</th> */}
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{settings.map((setting, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(setting),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">
											{setting.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>

										{/* <td className="p-10px">{setting.settings}</td> */}

										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editsetting/' + setting._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												{/* <button className="btn icon" onClick={() => mark_paid(setting)}>
													<i class="fas fa-check-circle" />
												</button> */}
												<button className="btn icon" onClick={() => deleteHandler(setting)}>
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
export default SettingsPage;
