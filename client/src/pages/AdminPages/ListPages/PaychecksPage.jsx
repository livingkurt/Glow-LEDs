import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPaychecks, deletePaycheck, savePaycheck } from '../../../actions/paycheckActions';
import { Link } from 'react-router-dom';
import { Loading, Notification } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../../components/SpecialtyComponents';
import { format_date } from '../../../utils/helper_functions';
import { listAffiliates } from '../../../actions/affiliateActions';
import { API_Orders } from '../../../utils';
import {
	promoter_revenue_upload,
	sponsor_revenue_upload,
	team_revenue_upload,
	top_code_usage_upload,
	top_earner_upload
} from '../../../utils/google_sheets_upload';
import { listTeams } from '../../../actions/teamActions';
import { listOrders } from '../../../actions/orderActions';

const PaychecksPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
	const [ last_months_orders, set_last_months_orders ] = useState([]);
	const [ total_orders, set_total_orders ] = useState([]);
	const [ loading_paychecks, set_loading_paychecks ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
	const [ create_paychecks, set_create_paychecks ] = useState(true);
	const category = props.match.params.category ? props.match.params.category : '';
	const paycheckList = useSelector((state) => state.paycheckList);
	const { loading, paychecks, message, error } = paycheckList;

	const paycheckSave = useSelector((state) => state.paycheckSave);
	const { success: successSave } = paycheckSave;

	const paycheckDelete = useSelector((state) => state.paycheckDelete);
	const { success: successDelete } = paycheckDelete;
	const dispatch = useDispatch();

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const teamList = useSelector((state) => state.teamList);
	const { teams } = teamList;

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listPaychecks({}));
				dispatch(listAffiliates({}));
				dispatch(listTeams({}));
				dispatch(listOrders({}));
				get_last_months_orders();
				get_total_orders();
			}
			return () => (clean = false);
		},
		[ successSave, successDelete, dispatch ]
	);

	const get_last_months_orders = async () => {
		const { data } = await API_Orders.last_months_orders();
		console.log({ data });
		set_last_months_orders(data.filter((order) => order.deleted === false));
	};
	const get_total_orders = async () => {
		const { data } = await API_Orders.findAll_orders_a();
		console.log({ data: data.length });
		set_total_orders(data.filter((order) => order.deleted === false));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPaychecks({ category, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPaychecks({ category, search, sort: e.target.value }));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listPaychecks({ category, search, sort }));
			}
			return () => (clean = false);
		},
		[ dispatch, category, search, sort ]
	);
	const deleteHandler = (paycheck) => {
		dispatch(deletePaycheck(paycheck._id));
	};

	const date = new Date();

	const today = date.toISOString();

	const mark_paid = (paycheck) => {
		dispatch(
			savePaycheck({
				...paycheck,
				paid: true,
				paid_at: format_date(today)
			})
		);
		dispatch(listPaychecks({}));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Paid', color: '#3e4c6d' }, { name: 'Not Paid', color: '#6f3c3c' } ];

	const determine_color = (paycheck) => {
		let result = '';
		if (paycheck.paid) {
			result = colors[0].color;
		}
		if (!paycheck.paid) {
			result = colors[1].color;
		}
		return result;
	};
	console.log({ paychecks });

	const create_promoter_paychecks = async () => {
		set_loading_paychecks(true);
		if (create_paychecks) {
			affiliates.filter((affiliate) => affiliate.promoter).forEach((affiliate) => {
				dispatch(
					savePaycheck({
						affiliate: affiliate._id,
						amount: last_months_orders
							.filter(
								(order) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
							.toFixed(2),

						venmo: affiliate.venmo
					})
				);
			});
		}
		console.log({ affiliates, total_orders, last_months_orders });
		await promoter_revenue_upload(affiliates, total_orders, last_months_orders);
		set_loading_paychecks(false);
	};

	const create_sponsor_paychecks = async () => {
		set_loading_paychecks(true);
		if (create_paychecks) {
			affiliates.filter((affiliate) => affiliate.sponsor).forEach((affiliate) => {
				dispatch(
					savePaycheck({
						affiliate: affiliate._id,
						amount:
							affiliate.sponsor &&
							last_months_orders
								.filter(
									(order) =>
										order.promo_code &&
										order.promo_code.toLowerCase() ===
											affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
								.toFixed(2),
						venmo: affiliate.venmo
					})
				);
			});
		}

		await sponsor_revenue_upload(affiliates, total_orders, last_months_orders);
		set_loading_paychecks(false);
	};

	const create_team_paychecks = async () => {
		set_loading_paychecks(true);
		if (create_paychecks) {
			teams.forEach((team) => {
				dispatch(
					savePaycheck({
						team: team._id,
						amount: (team &&
							last_months_orders
								.filter(
									(order) => order.promo_code && order.promo_code.toLowerCase() === team.promo_code
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0))
							.toFixed(2),
						venmo: team.venmo
					})
				);
			});
		}

		await team_revenue_upload(teams, total_orders, last_months_orders);
		set_loading_paychecks(false);
	};

	const top_earner_creator = async () => {
		set_loading_paychecks(true);
		await top_earner_upload(affiliates, total_orders, last_months_orders);
		set_loading_paychecks(false);
	};

	const top_code_uses_creator = async () => {
		set_loading_paychecks(true);
		await top_code_usage_upload(affiliates, total_orders, last_months_orders);
		set_loading_paychecks(false);
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Paychecks | Glow LEDs</title>
			</Helmet>
			<Notification message={message} />
			<Loading loading={loading_paychecks} error={error} />
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
				<Link to="/secure/glow/editpaycheck">
					<button className="btn primary">Create Paycheck</button>
				</Link>

				<button className="btn primary" onClick={create_promoter_paychecks}>
					Create Promoter Paychecks
				</button>
				<button className="btn primary" onClick={create_sponsor_paychecks}>
					Create Sponsor Paychecks
				</button>
				<button className="btn primary" onClick={create_team_paychecks}>
					Create Team Paychecks
				</button>
				<button className="btn primary" onClick={top_earner_creator}>
					Top Earner
				</button>
				<button className="btn primary" onClick={top_code_uses_creator}>
					Top Code Uses
				</button>
				{loading_checkboxes ? (
					<div>Loading...</div>
				) : (
					<div>
						<label htmlFor="create_paychecks">Create Paychecks</label>
						<input
							type="checkbox"
							name="create_paychecks"
							defaultChecked={create_paychecks}
							id="create_paychecks"
							onChange={(e) => {
								set_create_paychecks(e.target.checked);
							}}
						/>
					</div>
				)}
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Paychecks</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<div>Total Payout ${paychecks && paychecks.reduce((a, paycheck) => a + paycheck.amount, 0).toFixed(2)}</div>
			<Loading loading={loading} error={error}>
				{paychecks && (
					<div className="paycheck-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Date Paid</th>
									<th>Affiliate</th>
									<th>Amount</th>
									<th>Venmo</th>
									<th>Receipt</th>
									<th>Paid</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{paychecks.map((paycheck, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(paycheck),
											fontSize: '16px'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{paycheck.paid_at && format_date(paycheck.paid_at)}
										</td>
										<td className="p-10px">
											{paycheck.affiliate ? (
												paycheck.affiliate.artist_name
											) : (
												paycheck.team && paycheck.team.team_name
											)}
										</td>
										<td className="p-10px">${paycheck.amount}</td>
										<td className="p-10px">{paycheck.venmo}</td>
										<td className="p-10px">{paycheck.receipt}</td>
										<td className="p-10px">
											{paycheck.paid ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editpaycheck/' + paycheck._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => mark_paid(paycheck)}>
													<i className="fas fa-check-circle" />
												</button>
												<button className="btn icon" onClick={() => deleteHandler(paycheck)}>
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
export default PaychecksPage;
