import React, { useEffect, useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// import { Chart, CategoryScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {
	hslToHex,
	humanize,
	toCapitalize,
	categories,
	subcategories,
	dates_in_year
} from '../../utils/helper_functions';
import { API_Orders, API_Products } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/UtilityComponents';
import Overflow from 'react-overflow-indicator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { listAffiliates } from '../../actions/affiliateActions';
import { listPromos } from '../../actions/promoActions';

const MonthExpensesPage = (props) => {
	const this_year = props.match.params.year;
	const this_month = toCapitalize(props.match.params.month);

	const monthly_income_chart_ref = useRef();

	const [ canScroll, setCanScroll ] = useState(false);
	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates, loading: loading_affiliates, error_affiliates } = affiliateList;
	const promoList = useSelector((state) => state.promoList);
	const { promos, loading: loading_promos, error_promos } = promoList;

	const [ expenses, set_expenses ] = useState([]);
	const [ orders, set_orders ] = useState([]);
	const [ monthly_income, set_monthly_income ] = useState([]);
	const [ affiliate_earnings, set_affiliate_earnings ] = useState([]);
	const [ month, set_month ] = useState(props.match.params.month);
	const [ year, set_year ] = useState(this_year);
	const [ loading, set_loading ] = useState(false);
	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				// calculate_expenses(props.match.params.month);
				if (props.match.params.month) {
					get_monthly_income(year, props.match.params.month);
				}
				// promo_code_usage(year, props.match.params.mont);
			}
			return () => (clean = false);
		},
		[ props.match.params.month ]
	);

	useEffect(() => {
		let clean = true;
		if (clean) {
			// calculate_expenses(props.match.params.month);
			if (props.match.params.month) {
				get_monthly_income(year, props.match.params.month);
			}
			promo_code_usage(year, props.match.params.month);
			dispatch(listPromos({}));
		}
		return () => (clean = false);
	}, []);

	const promo_code_usage = async (year, month) => {
		set_loading(true);
		const { data } = await API_Orders.promo_code_usage_orders_a(year, month);
		console.log({ promo_code_usage: data });
		set_affiliate_earnings(data);
		set_loading(false);
	};

	const get_monthly_income = async (year, month) => {
		set_loading(true);
		const { data } = await API_Orders.income(year, month);
		console.log({ get_monthly_income: data });
		if (data) {
			set_monthly_income(data);
		}
		set_loading(false);
	};

	const expenses_pie_multiplier = 360 / 5;
	let exenses_pie_num = -expenses_pie_multiplier;

	const expenses_pie_data = {
		labels:
			monthly_income.macro_income &&
			monthly_income.macro_income.category_expenses.map((item) => toCapitalize(item.category)),
		datasets: [
			{
				label: 'Income',
				data:
					monthly_income.macro_income &&
					monthly_income.macro_income.category_expenses.map((item) => item.expense.toFixed(2)),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: [ 'Supplies', 'Entertainment', 'Website', 'Shipping', 'Equipment' ].map((item) => {
					exenses_pie_num += expenses_pie_multiplier;
					let color = hslToHex(exenses_pie_num, 100, 50);
					return color;
				}),
				color: 'white'
			}
		]
	};

	const expenses_pie_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};

	const income_pie_multiplier = 360 / categories.length;
	let income_pie_num = -income_pie_multiplier;

	const income_pie_data = {
		labels:
			monthly_income.macro_income &&
			monthly_income.macro_income.category_income.map((item) => toCapitalize(item.category)),
		datasets: [
			{
				label: 'Income',
				data:
					monthly_income.macro_income &&
					monthly_income.macro_income.category_income.map((item) => item.income.toFixed(2)),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: categories.map((item) => {
					income_pie_num += income_pie_multiplier;
					let color = hslToHex(income_pie_num, 100, 50);
					return color;
				}),
				color: 'white'
			}
		]
	};
	const income_pie_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const history = useHistory();

	const switch_month = (e) => {
		e.preventDefault();
		set_month(e.target.value);
		history.push('/secure/glow/controlpanel/monthly_expenes/' + year + '/' + e.target.value);
		// calculate_expenses(e.target.value.toLowerCase());
		get_monthly_income(year, e.target.value.toLowerCase());
	};
	const switch_year = (e) => {
		e.preventDefault();
		set_year(e.target.value);
		history.push('/secure/glow/controlpanel/monthly_expenes/' + e.target.value + '/' + month);
		// calculate_expenses(month);
		get_monthly_income(year, month);
	};

	const [ affiliate_colors, set_affiliate_colors ] = useState([]);
	const [ promo_colors, set_promo_colors ] = useState([]);
	const [ affiliate_code_usage, set_affiliate_code_usage ] = useState([]);
	const affiliate_multiplier = 360 / [ ...affiliates, { promo_code: 'inkybois' } ].length;
	let affiliate_num = -affiliate_multiplier;
	const promo_multiplier = 360 / promos.length;
	let promo_num = -promo_multiplier;

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (affiliates) {
					determine_affiliate_colors();
				}
			}
			return () => (clean = false);
		},
		[ affiliates ]
	);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (promos) {
					determine_promo_colors();
				}
			}
			return () => (clean = false);
		},
		[ promos ]
	);
	const determine_affiliate_colors = () => {
		const colors = [ ...affiliates, { promo_code: 'inkybois' } ].map((item) => {
			affiliate_num += affiliate_multiplier;
			let color = hslToHex(affiliate_num, 25, 50);
			return color;
		});
		set_affiliate_colors(colors);
	};

	const determine_promo_colors = () => {
		const colors = [ ...promos, { promo_code: 'inkybois' } ].map((item) => {
			promo_num += promo_multiplier;
			let color = hslToHex(promo_num, 25, 50);
			return color;
		});
		set_promo_colors(colors);
	};

	const [ total_affiliate_revenue, set_total_affiliate_revenue ] = useState();
	const [ total_affiliate_promo_code_usage, set_total_affiliate_promo_code_usage ] = useState();
	const [ total_affiliate_earned, set_total_affiliate_earned ] = useState();

	const get_total = () => {
		const uses = affiliates.map((affiliate) => {
			return orders.filter((order) => {
				return (
					order.promo_code &&
					order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				);
			}).length;
		});
		set_total_affiliate_promo_code_usage(uses.reduce((a, c) => a + c, 0));
		console.log({ uses });
		const revenue = affiliates.map((affiliate) => {
			return orders
				.filter(
					(order) =>
						order.promo_code &&
						order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				)
				.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2);
		});
		set_total_affiliate_revenue(revenue.reduce((a, c) => parseFloat(a) + parseFloat(c), 0));
		console.log({ revenue });
		const earned = affiliates.map((affiliate) => {
			return affiliate.promoter
				? orders
						.filter(
							(order) =>
								order.promo_code &&
								order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
						)
						.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.1, 0)
						.toFixed(2)
				: orders
						.filter(
							(order) =>
								order.promo_code &&
								order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
						)
						.reduce((a, order) => a + (order.totalPrice - order.taxPrice) * 0.15, 0)
						.toFixed(2);
		});
		set_total_affiliate_earned(earned.reduce((a, c) => parseFloat(a) + parseFloat(c), 0));
		console.log({ earned });
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (orders && affiliates) {
					get_total();
				}
			}
			return () => (clean = false);
		},
		[ affiliates, orders ]
	);

	const [ total_promo_revenue, set_total_promo_revenue ] = useState();
	const [ total_promo_promo_code_usage, set_total_promo_promo_code_usage ] = useState();

	const get_total_promos = () => {
		const uses = promos.map((promo) => {
			return orders.filter((order) => {
				return order.promo_code && order.promo_code.toLowerCase() === promo.promo_code.toLowerCase();
			}).length;
		});
		set_total_promo_promo_code_usage(uses.reduce((a, c) => a + c, 0));
		console.log({ uses });
		const revenue = promos.map((promo) => {
			return orders
				.filter(
					(order) => order.promo_code && order.promo_code.toLowerCase() === promo.promo_code.toLowerCase()
				)
				.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
				.toFixed(2);
		});
		set_total_promo_revenue(revenue.reduce((a, c) => parseFloat(a) + parseFloat(c), 0));
		console.log({ revenue });
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (orders && promos) {
					get_total_promos();
				}
			}
			return () => (clean = false);
		},
		[ promos, orders ]
	);

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>
					Admin {this_month} {this_year} Breakdown | Glow LEDs
				</title>
			</Helmet>
			{/* <Notification message={message} /> */}
			<Loading loading={loading} />
			<div className="">
				<Link to="/secure/glow/controlpanel">
					<button className="btn primary">Back to Control Panel</button>
				</Link>
				<Link to={'/secure/glow/controlpanel/monthly_expenes/' + year}>
					<button className="btn primary">Back to {year} Monthly Expenses</button>
				</Link>
			</div>
			<h2 className="ta-c w-100per jc-c">
				{this_month} {this_year} Breakdown
			</h2>
			<div className="row">
				<div className="mv-2rem mr-2rem">
					<h2 className="mr-1rem">Choose Year</h2>
					<div className="row">
						<div className="custom-select ">
							<select
								defaultValue={this_year}
								className="qty_select_dropdown"
								onChange={(e) => {
									switch_year(e);
								}}
							>
								<option value="">---Choose Year---</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
							</select>
							<span className="custom-arrow" />
						</div>
						{/* <Link to={'/secure/glow/controlpanel/monthly_expenes/' + year + '/' + month}>
							<button className="btn primary">Go</button>
						</Link> */}
					</div>
				</div>

				<div className="mv-2rem">
					<h2 className="mr-1rem">Choose Month</h2>
					<div className="row">
						<div className="custom-select ">
							<select
								defaultValue={props.match.params.month}
								className="qty_select_dropdown"
								onChange={(e) => {
									switch_month(e);
								}}
							>
								<option value="">---Choose Month---</option>
								{dates_in_year(year).map((month) => (
									<option value={month.month}>{toCapitalize(month.month)}</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
						{/* <Link to={'/secure/glow/controlpanel/monthly_expenes/' + year + '/' + month}>
							<button className="btn primary">Go</button>
						</Link> */}
					</div>
				</div>
			</div>
			{monthly_income &&
			Object.keys(monthly_income).length > 0 && (
				<div className="jc-b mb-1rem">
					<div>
						<h2>
							{this_month} {year} Income
						</h2>
						<div className="fs-25px">
							${monthly_income.macro_income.income ? (
								monthly_income.macro_income.income.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>
							{this_month} {year} Expenses
						</h2>
						<div className="fs-25px">
							${monthly_income.macro_income.expenses ? (
								monthly_income.macro_income.expenses.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>
							{this_month} {year} Profit
						</h2>
						<div className="fs-25px">
							${monthly_income.macro_income.profit ? (
								monthly_income.macro_income.profit.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
				</div>
			)}

			{/* <Loading loading={orders.length === 0} /> */}
			{/* {orders.length > 0 && (
				<div className="">
					<div className="jc-b">
						{categories &&
							categories.map((category) => (
								<div>
									<h2>{toCapitalize(humanize(category))}</h2>
									<div className="fs-25px">
										${orders
											.map((order) => order.orderItems)
											.filter((item) => item.category === category)
											.reduce((a, c) => parseFloat(a) + parseFloat(c.amount), 0)
											.toFixed(2) || '0.00'}
									</div>
								</div>
							))}
					</div>
				</div>
			)} */}
			<Tabs>
				<Overflow onStateChange={(state) => setCanScroll(state.canScroll.right)}>
					<Overflow.Content>
						<TabList>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Income
							</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Expenses
							</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Top Code Revenue
							</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Top Code Earned
							</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Top Code Usage
							</Tab>
							<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
								{this_month} {year} Promo Code Usage
							</Tab>
						</TabList>
					</Overflow.Content>
					{canScroll && (
						<div className="tab_indicator bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
							{'>'}
						</div>
					)}
				</Overflow>
				<TabPanel>
					{monthly_income &&
					Object.keys(monthly_income).length > 0 && (
						<div>
							<h2 className="ta-c w-100per jc-c">
								{this_month} {this_year} Category Income
							</h2>
							<div className="row ">
								<div className="w-50per">
									<div className="order-list responsive_table">
										<table className="styled-table">
											<thead>
												<tr>
													<th>Category</th>
													<th>Expense</th>
												</tr>
											</thead>
											<tbody>
												{monthly_income.macro_income.category_income &&
													monthly_income.macro_income.category_income.map((item, index) => (
														<tr
															key={index}
															style={{
																backgroundColor: '#2f3244',
																fontSize: '16px',
																height: '50px'
															}}
														>
															<th style={{ padding: '15px' }}>
																{toCapitalize(humanize(item.category))}
															</th>
															<th style={{ padding: '15px' }}>
																${item.income ? item.income.toFixed(2) : '0.00'}
															</th>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
								<div className="order-list responsive_table w-50per">
									<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px jc-b ">
										<Pie data={income_pie_data} options={income_pie_options} />
									</div>
								</div>
							</div>
						</div>
					)}
					{monthly_income &&
					Object.keys(monthly_income).length > 0 && (
						<div>
							<h2 className="ta-c w-100per jc-c">
								{this_month} {this_year} Subcategory Income
							</h2>
							<div className="row ">
								<div className="w-50per">
									<div className="order-list responsive_table">
										<table className="styled-table">
											<thead>
												<tr>
													<th>Subcategory</th>
													<th>Expense</th>
												</tr>
											</thead>
											<tbody>
												{monthly_income.macro_income.subcategory_income &&
													monthly_income.macro_income.subcategory_income.map(
														(item, index) => (
															<tr
																key={index}
																style={{
																	backgroundColor: '#2f3244',
																	fontSize: '16px',
																	height: '50px'
																}}
															>
																<th style={{ padding: '15px' }}>
																	{toCapitalize(humanize(item.subcategory))}
																</th>
																<th style={{ padding: '15px' }}>
																	${item.income ? item.income.toFixed(2) : '0.00'}
																</th>
															</tr>
														)
													)}
											</tbody>
										</table>
									</div>
								</div>
								<div className="order-list responsive_table w-50per">
									<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px jc-b ">
										<Pie data={income_pie_data} options={income_pie_options} />
									</div>
								</div>
							</div>
						</div>
					)}
				</TabPanel>
				<TabPanel>
					{monthly_income &&
					Object.keys(monthly_income).length > 0 && (
						<div>
							<h2 className="ta-c w-100per jc-c">
								{this_month} {this_year} Expenses Income
							</h2>
							<div className="row ">
								<div className="w-50per">
									<div className="order-list responsive_table">
										<table className="styled-table">
											<thead>
												<tr>
													<th>Category</th>
													<th>Expense</th>
												</tr>
											</thead>
											<tbody>
												{monthly_income.macro_income.category_expenses &&
													monthly_income.macro_income.category_expenses.map((item, index) => (
														<tr
															key={index}
															style={{
																backgroundColor: '#2f3244',
																fontSize: '16px',
																height: '50px'
															}}
														>
															<th style={{ padding: '15px' }}>
																{toCapitalize(humanize(item.category))}
															</th>
															<th style={{ padding: '15px' }}>
																${item.expense ? item.expense.toFixed(2) : '0.00'}
															</th>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
								<div className="order-list responsive_table w-50per">
									<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px jc-b ">
										<Pie data={expenses_pie_data} options={expenses_pie_options} />
									</div>
								</div>
							</div>
						</div>
					)}
				</TabPanel>
				<TabPanel>
					{/* <Loading loading={expenses.length === 0} /> */}
					{console.log({ affiliate_earnings })}
					<div>
						<h2 className="ta-c w-100per jc-c">
							{this_month} {this_year} Top Code Revenue
						</h2>
						<div className="">
							<div className="">
								<div className="order-list responsive_table">
									<table className="styled-table">
										<thead>
											<tr>
												<th>Promo Code</th>
												<th>Uses</th>
												<th>Revenue</th>
												<th>Earned</th>
											</tr>
										</thead>
										<tbody>
											{affiliate_earnings &&
												affiliate_earnings.revenue &&
												affiliate_earnings.revenue.affiliates.map((affiliate, index) => (
													<tr
														style={{
															backgroundColor: '#2f3244',
															fontSize: '1.6rem',
															height: '50px'
														}}
													>
														<th style={{ padding: '15px' }}>{affiliate['Promo Code']}</th>
														<th style={{ padding: '15px' }}>{affiliate.Uses}</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Revenue ? parseInt(affiliate.Revenue) : '0.00'}
														</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Earned ? parseInt(affiliate.Earned) : '0.00'}
														</th>
													</tr>
												))}
										</tbody>
										{affiliate_earnings.revenue && (
											<tfoot>
												<tr>
													<th>Total</th>
													<th>{affiliate_earnings.revenue.uses}</th>
													<th>
														${affiliate_earnings.revenue.revenue &&
															affiliate_earnings.revenue.revenue}
													</th>

													<th>
														${affiliate_earnings.revenue.earned &&
															affiliate_earnings.revenue.earned}
													</th>
												</tr>
											</tfoot>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <Loading loading={expenses.length === 0} /> */}
					{console.log({ affiliate_earnings })}
					<div>
						<h2 className="ta-c w-100per jc-c">
							{this_month} {this_year} Top Code Earned
						</h2>
						<div className="">
							<div className="">
								<div className="order-list responsive_table">
									<table className="styled-table">
										<thead>
											<tr>
												<th>Promo Code</th>
												<th>Uses</th>
												<th>Revenue</th>
												<th>Earned</th>
											</tr>
										</thead>
										<tbody>
											{affiliate_earnings &&
												affiliate_earnings.earned &&
												affiliate_earnings.earned.affiliates.map((affiliate, index) => (
													<tr
														style={{
															backgroundColor: '#2f3244',
															fontSize: '1.6rem',
															height: '50px'
														}}
													>
														<th style={{ padding: '15px' }}>{affiliate['Promo Code']}</th>
														<th style={{ padding: '15px' }}>{affiliate.Uses}</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Revenue ? parseInt(affiliate.Revenue) : '0.00'}
														</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Earned ? parseInt(affiliate.Earned) : '0.00'}
														</th>
													</tr>
												))}
										</tbody>
										{affiliate_earnings.earned && (
											<tfoot>
												<tr>
													<th>Total</th>
													<th>{affiliate_earnings.earned.uses}</th>
													<th>
														${affiliate_earnings.earned.revenue &&
															affiliate_earnings.earned.revenue}
													</th>

													<th>
														${affiliate_earnings.earned.earned &&
															affiliate_earnings.earned.earned}
													</th>
												</tr>
											</tfoot>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <Loading loading={expenses.length === 0} /> */}
					{console.log({ affiliate_earnings })}
					<div>
						<h2 className="ta-c w-100per jc-c">
							{this_month} {this_year} Top Code Usage
						</h2>
						<div className="">
							<div className="">
								<div className="order-list responsive_table">
									<table className="styled-table">
										<thead>
											<tr>
												<th>Promo Code</th>
												<th>Uses</th>
												<th>Revenue</th>
												<th>Earned</th>
											</tr>
										</thead>
										<tbody>
											{affiliate_earnings &&
												affiliate_earnings.uses &&
												affiliate_earnings.uses.affiliates.map((affiliate, index) => (
													<tr
														style={{
															backgroundColor: '#2f3244',
															fontSize: '1.6rem',
															height: '50px'
														}}
													>
														<th style={{ padding: '15px' }}>{affiliate['Promo Code']}</th>
														<th style={{ padding: '15px' }}>{affiliate.Uses}</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Revenue ? parseInt(affiliate.Revenue) : '0.00'}
														</th>
														<th style={{ padding: '15px' }}>
															${affiliate.Earned ? parseInt(affiliate.Earned) : '0.00'}
														</th>
													</tr>
												))}
										</tbody>
										{affiliate_earnings.uses && (
											<tfoot>
												<tr>
													<th>Total</th>
													<th>{affiliate_earnings.uses.uses}</th>
													<th>
														${affiliate_earnings.uses.revenue &&
															affiliate_earnings.uses.revenue}
													</th>

													<th>
														${affiliate_earnings.uses.earned &&
															affiliate_earnings.uses.earned}
													</th>
												</tr>
											</tfoot>
										)}
									</table>
								</div>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <Loading loading={expenses.length === 0} /> */}
					{promos &&
					promos.length > 0 && (
						<div>
							<h2 className="ta-c w-100per jc-c">
								{this_month} {this_year} Promo Code Usage
							</h2>
							<div className="">
								<div className="">
									<div className="order-list responsive_table">
										<table className="styled-table">
											<thead>
												<tr>
													<th>Promo Code</th>
													<th>Uses</th>
													<th>Revenue</th>
												</tr>
											</thead>
											<tbody>
												{promos
													.filter(
														(promo) =>
															!affiliates
																.map((affiliate) => affiliate.public_code.promo_code)
																.includes(promo.promo_code.toLowerCase())
													)
													.map((promo, index) => (
														<tr
															style={{
																backgroundColor: '#2f3244',
																height: '50px'
															}}
															// className="title_font"
														>
															<th style={{ padding: '15px' }}>
																{toCapitalize(promo.promo_code)}
															</th>
															<th style={{ padding: '15px' }}>
																{
																	orders.filter((order) => {
																		return (
																			order.promo_code &&
																			order.promo_code.toLowerCase() ===
																				promo.promo_code.toLowerCase()
																		);
																	}).length
																}
															</th>
															<th style={{ padding: '15px' }}>
																${orders
																	.filter(
																		(order) =>
																			order.promo_code &&
																			order.promo_code.toLowerCase() ===
																				promo.promo_code.toLowerCase()
																	)
																	.reduce(
																		(a, order) =>
																			a + order.totalPrice - order.taxPrice,
																		0
																	)
																	.toFixed(2)}
															</th>
														</tr>
													))}
											</tbody>
											<tfoot>
												<tr>
													<th>Total</th>
													<th>{total_promo_promo_code_usage}</th>
													<th>
														${total_promo_revenue > 0 && total_promo_revenue.toFixed(2)}
													</th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}
				</TabPanel>
			</Tabs>
		</div>
	);
};
export default MonthExpensesPage;
