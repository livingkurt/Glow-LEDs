import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPaychecks, deletePaycheck, savePaycheck } from '../../actions/paycheckActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { API_Revenue } from '../../utils';
import { promoter_revenue_upload, sponsor_revenue_upload, team_revenue_upload } from '../../utils/google_sheets_upload';

const PaychecksPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ last_month_orders, set_last_month_orders ] = useState([]);
	const [ loading_paychecks, set_loading_paychecks ] = useState(false);
	const category = props.match.params.category ? props.match.params.category : '';
	const paycheckList = useSelector((state) => state.paycheckList);
	const { loading, paychecks, error } = paycheckList;

	const paycheckSave = useSelector((state) => state.paycheckSave);
	const { success: successSave } = paycheckSave;

	const paycheckDelete = useSelector((state) => state.paycheckDelete);
	const { success: successDelete } = paycheckDelete;
	const dispatch = useDispatch();

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listPaychecks());
			stableDispatch(listAffiliates(''));
			get_last_months_orders();
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);

	const get_last_months_orders = async () => {
		const { data } = await API_Revenue.last_months_orders();
		console.log({ data });
		set_last_month_orders(data);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPaychecks(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPaychecks(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listPaychecks(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (paycheck) => {
		dispatch(deletePaycheck(paycheck._id));
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

	const create_all_paychecks = () => {
		set_loading_paychecks(true);
		affiliates.forEach((affiliate) => {
			dispatch(
				savePaycheck({
					affiliate: affiliate._id,
					amount: affiliate.promoter
						? last_month_orders
								.filter(
									(order) =>
										order.promo_code &&
										order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
								.toFixed(2)
						: last_month_orders
								.filter(
									(order) =>
										order.promo_code &&
										order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
								.toFixed(2),
					venmo: affiliate.venmo
				})
			);
		});
		set_loading_paychecks(false);
	};

	const create_promoter_paychecks = async () => {
		set_loading_paychecks(true);
		affiliates.filter((affiliate) => affiliate.promoter).forEach((affiliate) => {
			dispatch(
				savePaycheck({
					affiliate: affiliate._id,
					amount: affiliate.promoter
						? last_month_orders
								.filter(
									(order) =>
										order.promo_code &&
										order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
								.toFixed(2)
						: last_month_orders
								.filter(
									(order) =>
										order.promo_code &&
										order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
								.toFixed(2),
					venmo: affiliate.venmo
				})
			);
		});
		await promoter_revenue_upload();
		set_loading_paychecks(false);
	};

	const create_sponsor_paychecks = async () => {
		set_loading_paychecks(true);
		affiliates.filter((affiliate) => affiliate.sponsor).forEach((affiliate) => {
			dispatch(
				savePaycheck({
					affiliate: affiliate._id,
					amount:
						affiliate.sponsor &&
						last_month_orders
							.filter(
								(order) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							)
							.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
							.toFixed(2),
					venmo: affiliate.venmo
				})
			);
		});
		await sponsor_revenue_upload();
		set_loading_paychecks(false);
	};

	const create_team_paychecks = async () => {
		set_loading_paychecks(true);
		affiliates.filter((affiliate) => affiliate.team).forEach((affiliate) => {
			dispatch(
				savePaycheck({
					affiliate: affiliate._id,
					amount: ((affiliate.team &&
						last_month_orders
							.filter((order) => order.promo_code && order.promo_code.toLowerCase() === 'inkybois')
							.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)) /
						affiliates.filter((affiliate) => affiliate.team).length).toFixed(2),
					venmo: affiliate.venmo
				})
			);
		});
		await team_revenue_upload();
		set_loading_paychecks(false);
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Paychecks | Glow LEDs</title>
			</Helmet>
			<Loading loading={loading_paychecks} error={error} />
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color) => {
						return (
							<div className="wrap jc-b  m-1rem">
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
				<button className="btn primary" onClick={create_all_paychecks}>
					Create All Paycheck
				</button>
				<button className="btn primary" onClick={create_promoter_paychecks}>
					Create Promoter Paychecks
				</button>
				<button className="btn primary" onClick={create_sponsor_paychecks}>
					Create Sponsor Paychecks
				</button>
				<button className="btn primary" onClick={create_team_paychecks}>
					Create Team Paychecks
				</button>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Paychecks</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
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
								{paychecks.map((paycheck) => (
									<tr
										key={paycheck._id}
										style={{
											backgroundColor: determine_color(paycheck),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{paycheck.paid_at && format_date(paycheck.paid_at)}
										</td>
										<td className="p-10px">{paycheck.affiliate.artist_name}</td>
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
