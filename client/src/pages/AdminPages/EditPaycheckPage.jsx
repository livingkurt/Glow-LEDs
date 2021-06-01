import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePaycheck, detailsPaycheck } from '../../actions/paycheckActions';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { format_date, snake_case, unformat_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { listTeams } from '../../actions/teamActions';

const EditPaycheckPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ affiliate, set_affiliate ] = useState('');
	const [ team, set_team ] = useState('');
	const [ amount, set_amount ] = useState('');
	const [ venmo, set_venmo ] = useState('');
	const [ paid, set_paid ] = useState('');
	const [ reciept, set_reciept ] = useState('');
	const [ paid_at, set_paid_at ] = useState('');

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const paycheckDetails = useSelector((state) => state.paycheckDetails);
	const { paycheck, loading, error } = paycheckDetails;

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const teamList = useSelector((state) => state.teamList);
	const { teams } = teamList;

	const set_state = () => {
		set_id(paycheck._id);
		set_affiliate(paycheck.affiliate);
		set_team(paycheck.team);
		set_amount(paycheck.amount);
		set_venmo(paycheck.venmo);
		set_paid(paycheck.paid);
		set_reciept(paycheck.reciept);
		if (paycheck.paid_at) {
			set_paid_at(format_date(paycheck.paid_at));
		}
	};
	const unset_state = () => {
		set_id('');
		set_affiliate('');
		set_team('');
		set_amount('');
		set_venmo('');
		set_paid('');
		set_reciept('');
		set_paid_at('');
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsPaycheck(props.match.params.id));
				stableDispatch(detailsPaycheck(props.match.params.id));
			} else {
				stableDispatch(detailsPaycheck(''));
			}
			stableDispatch(listAffiliates(''));
			stableDispatch(listTeams(''));
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (paycheck) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ paycheck ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			savePaycheck({
				_id: id,
				affiliate: affiliate && affiliate._id,
				team: team && team._id,
				amount,
				venmo,
				paid,
				reciept,
				paid_at: paid_at ? paid_at : paid && format_date(today)
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/paychecks');
	};

	const update_fields = (e) => {
		e.preventDefault();
		const data = JSON.parse(e.target.value);
		set_affiliate(data._id);
		set_venmo(data.venmo);
		console.log({ venmo: data.venmo });
	};
	const date = new Date();

	const today = date.toISOString();
	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Paycheck' : 'Create Paycheck'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{/* {paycheck && ( */}
						<div>
							<Helmet>
								<title>Edit Paycheck| Glow LEDs</title>
							</Helmet>

							<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
								<div className="row wrap">
									<div className="column w-228px m-10px">
										{affiliates && (
											<div className="ai-c h-25px mv-10px mb-30px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"
														// defaultValue={{
														// 	label: user.first_name + ' ' + user.last_name,
														// 	value: user._id
														// }}
														onChange={(e) => update_fields(e)}
													>
														<option key={1} defaultValue="">
															---Choose Affiliate---
														</option>
														{affiliates.map((affiliate, index) => (
															<option key={index} value={JSON.stringify(affiliate)}>
																{affiliate.artist_name}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										)}
										{teams && (
											<div className="ai-c h-25px mv-10px mb-30px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"
														// defaultValue={{
														// 	label: user.first_name + ' ' + user.last_name,
														// 	value: user._id
														// }}
														onChange={(e) => update_fields(e)}
													>
														<option key={1} defaultValue="">
															---Choose Team---
														</option>
														{teams.map((team, index) => (
															<option key={index} value={JSON.stringify(team)}>
																{team.team_name}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										)}

										<li>
											<label htmlFor="amount">Amount</label>
											<input
												type="text"
												name="amount"
												value={amount}
												id="amount"
												onChange={(e) => set_amount(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="venmo">Venmo</label>
											<input
												type="text"
												name="venmo"
												value={venmo}
												id="venmo"
												onChange={(e) => set_venmo(e.target.value)}
											/>
										</li>
										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<li>
												<label htmlFor="paid">Paid</label>
												<input
													type="checkbox"
													name="paid"
													defaultChecked={paid}
													id="paid"
													onChange={(e) => {
														set_paid(e.target.checked);
													}}
												/>
											</li>
										)}
										<li>
											<label htmlFor="paid_at">Paid At</label>
											<input
												type="text"
												name="paid_at"
												value={paid_at ? paid_at : paid ? format_date(today) : ''}
												id="paid_at"
												onChange={(e) => set_paid_at(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="reciept">Receipt</label>
											<input
												type="text"
												name="reciept"
												defaultValue={reciept}
												id="reciept"
												onChange={(e) => set_reciept(e.target.value)}
											/>
										</li>
									</div>
								</div>
								<li>
									<button type="submit" className="btn primary">
										{id ? 'Update' : 'Create'}
									</button>
								</li>
								<li>
									<button className="btn secondary" onClick={(e) => e.preventDefault()}>
										<Link to="/secure/glow/paychecks">Back to Paychecks</Link>
									</button>
								</li>
							</ul>
						</div>
						{/* )} */}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditPaycheckPage;
