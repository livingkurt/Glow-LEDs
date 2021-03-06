import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listParcels, deleteParcel, saveParcel } from '../../actions/parcelActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { API_Promos, API_Revenue } from '../../utils';
import {
	promoter_revenue_upload,
	sponsor_revenue_upload,
	team_revenue_upload,
	top_earner_upload
} from '../../utils/google_sheets_upload';
import { listTeams } from '../../actions/teamActions';
import { listOrders } from '../../actions/orderActions';

const ParcelsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ last_months_orders, set_last_months_orders ] = useState([]);
	const [ total_orders, set_total_orders ] = useState([]);
	const [ loading_parcels, set_loading_parcels ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
	const [ create_parcels, set_create_parcels ] = useState(true);
	const category = props.match.params.category ? props.match.params.category : '';
	const parcelList = useSelector((state) => state.parcelList);
	const { loading, parcels, error } = parcelList;

	const parcelSave = useSelector((state) => state.parcelSave);
	const { success: successSave } = parcelSave;

	const parcelDelete = useSelector((state) => state.parcelDelete);
	const { success: successDelete } = parcelDelete;
	const dispatch = useDispatch();

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const teamList = useSelector((state) => state.teamList);
	const { teams } = teamList;

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listParcels());
			stableDispatch(listAffiliates(''));
			stableDispatch(listTeams(''));
			stableDispatch(listOrders(''));
			get_last_months_orders();
			get_total_orders();
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);

	const get_last_months_orders = async () => {
		const { data } = await API_Revenue.last_months_orders();
		console.log({ data });
		set_last_months_orders(data);
	};
	const get_total_orders = async () => {
		const { data } = await API_Revenue.total_orders();
		console.log({ data });
		set_total_orders(data);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listParcels(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listParcels(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listParcels(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (parcel) => {
		dispatch(deleteParcel(parcel._id));
	};

	const date = new Date();

	const today = date.toISOString();

	const mark_paid = (parcel) => {
		dispatch(
			saveParcel({
				...parcel,
				paid: true,
				paid_at: format_date(today)
			})
		);
		stableDispatch(listParcels());
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Box', color: '#44648c' }, { name: 'Bubble Mailer', color: '#448c89' } ];

	const determine_color = (parcel) => {
		let result = '';
		if (parcel.type === 'bubble_mailer') {
			result = colors[0].color;
		}
		if (parcel.type === 'box') {
			result = colors[1].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Parcels | Glow LEDs</title>
			</Helmet>
			<Loading loading={loading_parcels} error={error} />
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
				<Link to="/secure/glow/editparcel">
					<button className="btn primary">Create Parcel</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Parcels</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{parcels && (
					<div className="parcel-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Length</th>
									<th>Width</th>
									<th>Height</th>
									<th>Volume</th>
									<th>Count In Stock</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{parcels.map((parcel, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(parcel),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{parcel.type === 'bubble_mailer' ? (
												`${parcel.length} X ${parcel.width}`
											) : (
												`${parcel.length} X ${parcel.width} X ${parcel.height}`
											)}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{parcel.type}
										</td>
										<td className="p-10px">{parcel.length}</td>
										<td className="p-10px">{parcel.width}</td>
										<td className="p-10px">{parcel.height}</td>
										<td className="p-10px">{parcel.volume}</td>
										<td className="p-10px">{parcel.count_in_stock}</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editparcel/' + parcel._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(parcel)}>
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
export default ParcelsPage;
