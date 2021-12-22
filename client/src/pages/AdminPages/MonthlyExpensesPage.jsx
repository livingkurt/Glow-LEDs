import React, { useEffect, useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// import { Chart, CategoryScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { hslToHex, toCapitalize } from '../../utils/helper_functions';
import { API_Orders } from '../../utils';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/UtilityComponents';
import Overflow from 'react-overflow-indicator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const MonthlyExpensesPage = (props) => {
	const this_year = props.match.params.year;

	const monthly_income_chart_ref = useRef();

	const [ monthly_income, set_monthly_income ] = useState([]);
	const [ yearly_income, set_yearly_income ] = useState({});
	const [ month, set_month ] = useState();
	const [ loading, set_loading ] = useState(false);

	const [ year, set_year ] = useState(this_year);
	const [ canScroll, setCanScroll ] = useState(false);

	const dates_in_year = [
		{ month: 'january', number_of_days: 31, start_date: year + '-01-01', end_date: year + '-01-31' },
		{ month: 'february', number_of_days: 28, start_date: year + '-02-01', end_date: year + '-02-28' },
		{ month: 'march', number_of_days: 31, start_date: year + '-03-01', end_date: year + '-03-31' },
		{ month: 'april', number_of_days: 30, start_date: year + '-04-01', end_date: year + '-04-30' },
		{ month: 'may', number_of_days: 31, start_date: year + '-05-01', end_date: year + '-05-31' },
		{ month: 'june', number_of_days: 30, start_date: year + '-06-01', end_date: year + '-06-30' },
		{ month: 'july', number_of_days: 31, start_date: year + '-07-01', end_date: year + '-07-31' },
		{ month: 'august', number_of_days: 31, start_date: year + '-08-01', end_date: year + '-08-31' },
		{ month: 'september', number_of_days: 30, start_date: year + '-09-01', end_date: year + '-09-30' },
		{ month: 'october', number_of_days: 31, start_date: year + '-10-01', end_date: year + '-10-31' },
		{ month: 'november', number_of_days: 30, start_date: year + '-11-01', end_date: year + '-11-30' },
		{ month: 'december', number_of_days: 31, start_date: year + '-12-01', end_date: year + '-12-31' }
	];

	useEffect(() => {
		let clean = true;
		if (clean) {
			get_monthly_income(year);
			get_yearly_income(year);
		}
		return () => (clean = false);
	}, []);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				get_monthly_income(year);
				get_yearly_income(year);
			}
			return () => (clean = false);
		},
		[ year ]
	);

	const colors = [
		'#b33434',
		'#b9742f',
		'#bfbf26',
		'#7ccd2a',
		'#2bc92b',
		'#29c779',
		'#27bfbf',
		'#2873bd',
		'#2a2ab5',
		'#742bbd',
		'#bd28bd',
		'#c12573'
	];

	const get_monthly_income = async (year) => {
		set_loading(true);
		const income_each_month = await Promise.all(
			dates_in_year.map(async (month, month_number) => {
				console.log({ month: month.month, year });
				const { data } = await API_Orders.income(year, month.month);
				if (data) {
					return { ...data, color: colors[month_number], month: month.month };
				}
			})
		);
		console.log({ income_each_month });
		set_monthly_income(income_each_month);
		// initialize_monthly_income_chart(income_each_month);
		set_loading(false);
	};
	const get_yearly_income = async (year) => {
		set_loading(true);
		const { data } = await API_Orders.income(year);
		if (data) {
			console.log({ get_yearly_income: data });
			set_yearly_income(data);
			set_loading(false);
		}
	};

	const multiplier = 360 / monthly_income.length;
	let num_1 = -multiplier;
	let num_2 = -multiplier;
	let num_3 = -multiplier;
	const bar_income_expenses_profit_data = {
		labels: monthly_income.map((month) => toCapitalize(month.month)),
		datasets: [
			{
				label: 'Income',
				data: monthly_income.map((month) => month.income),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					// num_1 += multiplier;
					let color = hslToHex(150, 100, 50);
					return color;
				}),
				color: 'white'
			},
			{
				label: 'Expenses',
				data: monthly_income.map((month) => month.expenses),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					// num_2 += multiplier;
					let color = hslToHex(360, 100, 50);
					return color;
				}),
				color: 'white'
			},
			{
				label: 'Profit',
				data: monthly_income.map((month) => month.profit),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					if (item.profit > 0) {
						// num_3 += multiplier;
						let color = hslToHex(0, 100, 100);
						return color;
					} else {
						// num_3 += multiplier;
						let color = hslToHex(0, 0, 0);
						return color;
					}
				}),
				color: 'white'
			}
		]
	};
	const bar_income_expenses_profit_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const bar_income_data = {
		labels: monthly_income.map((month) => toCapitalize(month.month)),
		datasets: [
			{
				label: 'Income',
				data: monthly_income.map((month) => month.income),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					// num_1 += multiplier;
					let color = hslToHex(150, 100, 50);
					return color;
				}),
				color: 'white'
			}
		]
	};
	const bar_income_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const bar_expenses_data = {
		labels: monthly_income.map((month) => toCapitalize(month.month)),
		datasets: [
			{
				label: 'Expenses',
				data: monthly_income.map((month) => month.expenses),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					// num_2 += multiplier;
					let color = hslToHex(360, 100, 50);
					return color;
				}),
				color: 'white'
			}
		]
	};
	const bar_expenses_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const bar_profit_data = {
		labels: monthly_income.map((month) => toCapitalize(month.month)),
		datasets: [
			{
				label: 'Profit',
				data: monthly_income.map((month) => month.profit),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					if (item.profit > 0) {
						// num_3 += multiplier;
						let color = hslToHex(0, 100, 100);
						return color;
					} else {
						// num_3 += multiplier;
						let color = hslToHex(0, 0, 0);
						return color;
					}
				}),
				color: 'white'
			}
		]
	};
	const bar_profit_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const pie_data = {
		labels: monthly_income.map((month) => toCapitalize(month.month)),
		datasets: [
			{
				label: 'Income',
				data: monthly_income.map((month) => month.income),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: monthly_income.map((item) => {
					num_1 += multiplier;
					let color = hslToHex(num_1, 100, 50);
					return color;
				}),
				color: 'white'
			}
		]
	};
	const pie_options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};
	const history = useHistory();

	const switch_year = (e) => {
		e.preventDefault();
		set_year(e.target.value);
		get_monthly_income(e.target.value);
		history.push('/secure/glow/controlpanel/monthly_expenes/' + e.target.value);
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin {year} Monthly Income | Glow LEDs</title>8
			</Helmet>
			<div className="">
				<Link to="/secure/glow/controlpanel">
					<button className="btn primary">Back to Control Panel</button>
				</Link>
			</div>
			<div className="row">
				<div className="mv-2rem mr-2rem">
					<h2 className="mr-1rem">Choose Year</h2>
					<div className="row">
						<div className="custom-select ">
							<select
								defaultValue={year}
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
						{/* <Link to={'/secure/glow/controlpanel/monthly_expenes/' + year}>
						<button className="btn primary">
							Go
						</button>
					</Link> */}
					</div>
				</div>

				<div className="mv-2rem">
					<h2 className="mr-1rem">Choose Month</h2>
					<div className="row">
						<div className="custom-select ">
							<select
								defaultValue={month}
								className="qty_select_dropdown"
								onChange={(e) => {
									set_month(e.target.value);
								}}
							>
								<option value="">---Choose Month---</option>
								{dates_in_year.map((month) => (
									<option value="january">{toCapitalize(month.month)}</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
						<Link to={'/secure/glow/controlpanel/monthly_expenes/' + year + '/' + month}>
							<button className="btn primary">Go</button>
						</Link>
					</div>
				</div>
			</div>
			<h2 className="ta-c w-100per jc-c">{year} Monthly Breakdown</h2>
			<Loading loading={loading} />
			{console.log({ yearly_income })}
			{yearly_income &&
			Object.keys(yearly_income).length > 0 && (
				<div className="jc-b mb-1rem">
					<div>
						<h2>{year} Income</h2>
						<div className="fs-25px">
							${yearly_income.macro_income.income ? yearly_income.macro_income.income.toFixed(2) : '0.00'}
						</div>
					</div>
					<div>
						<h2>{year} Expenses</h2>
						<div className="fs-25px">
							${yearly_income.macro_income.expenses ? (
								yearly_income.macro_income.expenses.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>{year} Profit</h2>
						<div className="fs-25px">
							${yearly_income.macro_income.profit ? yearly_income.macro_income.profit.toFixed(2) : '0.00'}
						</div>
					</div>
				</div>
			)}
			{monthly_income &&
			monthly_income.length > 0 && (
				<Tabs>
					<Overflow onStateChange={(state) => setCanScroll(state.canScroll.right)}>
						<Overflow.Content>
							<TabList>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Expenses
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Whites Sold
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Batteries Sold
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Decals Sold
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Income/Expenses/Profit
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Income
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Expenses
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Profit
								</Tab>
							</TabList>
						</Overflow.Content>
						{canScroll && (
							<div className="tab_indicator bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
								{'>'}
							</div>
						)}
					</Overflow>
					<TabPanel style={{ borderRadius: '0px 10px 10px 10px' }}>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Income</th>
									<th>Expenses</th>
									<th>Profit</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>
											${month.macro_income.income ? month.macro_income.income.toFixed(2) : '0.00'}
										</th>
										<th>
											${month.macro_income.expenses ? (
												month.macro_income.expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.macro_income.profit ? month.macro_income.profit.toFixed(2) : '0.00'}
										</th>
									</tr>
								))}
							</tbody>
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											${yearly_income.macro_income.income ? (
												yearly_income.macro_income.income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.macro_income.expenses ? (
												yearly_income.macro_income.expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.macro_income.profit ? (
												yearly_income.macro_income.profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
					</TabPanel>
					<TabPanel>
						<h2 className="ta-c w-100per jc-c">{year} Whites Sold</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Income</th>
									<th>Expenses</th>
									<th>Profit</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>
											${month.whites.total_income ? month.whites.total_income.toFixed(2) : '0.00'}
										</th>
										<th>
											${month.whites.total_expenses ? (
												month.whites.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>

										<th>
											${month.whites.total_profit ? month.whites.total_profit.toFixed(2) : '0.00'}
										</th>
									</tr>
								))}
							</tbody>

							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											${yearly_income.whites.total_income ? (
												yearly_income.whites.total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.total_expenses ? (
												yearly_income.whites.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>

										<th>
											${yearly_income.whites.total_profit ? (
												yearly_income.whites.total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
						<h2 className="ta-c w-100per jc-c">{year} Whites Income By Size</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>S Income</th>
									<th>M Income</th>
									<th>L Income</th>
									<th>XL Income</th>
									<th>Total Income</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>
											${month.whites.s_total_income ? (
												month.whites.s_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.whites.m_total_income ? (
												month.whites.m_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.whites.l_total_income ? (
												month.whites.l_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.whites.xl_total_income ? (
												month.whites.xl_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.whites.total_income ? month.whites.total_income.toFixed(2) : '0.00'}
										</th>
									</tr>
								))}
							</tbody>
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Profit</th>
										<th>
											${yearly_income.whites.s_total_profit ? (
												yearly_income.whites.s_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.m_total_profit ? (
												yearly_income.whites.m_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.l_total_profit ? (
												yearly_income.whites.l_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.xl_total_profit ? (
												yearly_income.whites.xl_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.total_profit ? (
												yearly_income.whites.total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											${yearly_income.whites.s_total_income ? (
												yearly_income.whites.s_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.m_total_income ? (
												yearly_income.whites.m_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.l_total_income ? (
												yearly_income.whites.l_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.xl_total_income ? (
												yearly_income.whites.xl_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.total_income ? (
												yearly_income.whites.total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Expenses</th>
										<th>
											${yearly_income.whites.s_total_expenses ? (
												yearly_income.whites.s_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.m_total_expenses ? (
												yearly_income.whites.m_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.l_total_expenses ? (
												yearly_income.whites.l_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.xl_total_expenses ? (
												yearly_income.whites.xl_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.whites.total_expenses ? (
												yearly_income.whites.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
						<h2 className="ta-c w-100per jc-c">{year} Whites Sold</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>S Qty</th>
									<th>M Qty</th>
									<th>L Qty</th>
									<th>XL Qty</th>
									<th>Total Qty</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>{month.whites.s_qty_sold ? month.whites.s_qty_sold : '0'}</th>
										<th>{month.whites.m_qty_sold ? month.whites.m_qty_sold : '0'}</th>
										<th>{month.whites.l_qty_sold ? month.whites.l_qty_sold : '0'}</th>
										<th>{month.whites.xl_qty_sold ? month.whites.xl_qty_sold : '0'}</th>
										<th>{month.whites.total_qty_sold ? month.whites.total_qty_sold : '0'}</th>
									</tr>
								))}
							</tbody>
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											{yearly_income.whites.s_qty_sold ? yearly_income.whites.s_qty_sold : '0'}
										</th>
										<th>
											{yearly_income.whites.m_qty_sold ? yearly_income.whites.m_qty_sold : '0'}
										</th>
										<th>
											{yearly_income.whites.l_qty_sold ? yearly_income.whites.l_qty_sold : '0'}
										</th>
										<th>
											{yearly_income.whites.xl_qty_sold ? yearly_income.whites.xl_qty_sold : '0'}
										</th>
										<th>
											{yearly_income.whites.total_qty_sold ? (
												yearly_income.whites.total_qty_sold
											) : (
												'0'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
					</TabPanel>
					<TabPanel>
						<h2 className="ta-c w-100per jc-c">{year} Batteries Income</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>CR1620 Income</th>
									<th>CR1616 Income</th>
									<th>CR1225 Income</th>
									<th>Batteries Income</th>
									<th>Batteries Expenses</th>
									<th>Batteries Profit</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>
											${month.batteries.batt_1620_total_income ? (
												month.batteries.batt_1620_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>

										<th>
											${month.batteries.batt_1616_total_income ? (
												month.batteries.batt_1616_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>

										<th>
											${month.batteries.batt_1225_total_income ? (
												month.batteries.batt_1225_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.batteries.total_income ? (
												month.batteries.total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.batteries.total_expenses ? (
												month.batteries.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${month.batteries.total_profit ? (
												month.batteries.total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								))}
							</tbody>
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Profit</th>
										<th>
											${yearly_income.batteries.batt_1620_total_profit ? (
												yearly_income.batteries.batt_1620_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1616_total_profit ? (
												yearly_income.batteries.batt_1616_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1225_total_profit ? (
												yearly_income.batteries.batt_1225_total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.total_profit ? (
												yearly_income.batteries.total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th />
										<th />
									</tr>
								</tfoot>
							)}
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Expenses</th>
										<th>
											${yearly_income.batteries.batt_1620_total_expenses ? (
												yearly_income.batteries.batt_1620_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1616_total_expenses ? (
												yearly_income.batteries.batt_1616_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1225_total_expenses ? (
												yearly_income.batteries.batt_1225_total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.total_expenses ? (
												yearly_income.batteries.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th />
										<th />
									</tr>
								</tfoot>
							)}
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											${yearly_income.batteries.batt_1620_total_income ? (
												yearly_income.batteries.batt_1620_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1616_total_income ? (
												yearly_income.batteries.batt_1616_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.batt_1225_total_income ? (
												yearly_income.batteries.batt_1225_total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.total_income ? (
												yearly_income.batteries.total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.total_expenses ? (
												yearly_income.batteries.total_expenses.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
										<th>
											${yearly_income.batteries.total_profit ? (
												yearly_income.batteries.total_profit.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
						<h2 className="ta-c w-100per jc-c">{year} Batteries Sold</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>CR1620 Qty Sold </th>
									<th>CR1616 Qty Sold </th>
									<th>CR1225 Qty Sold </th>
									<th>Batteries Qty</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>
											{month.batteries.batt_1620_qty_sold ? (
												month.batteries.batt_1620_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>
											{month.batteries.batt_1616_qty_sold ? (
												month.batteries.batt_1616_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>
											{month.batteries.batt_1225_qty_sold ? (
												month.batteries.batt_1225_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>{month.batteries.total_qty_sold ? month.batteries.total_qty_sold : '0'}</th>
									</tr>
								))}
							</tbody>
							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>
										<th>
											{yearly_income.batteries.batt_1620_qty_sold ? (
												yearly_income.batteries.batt_1620_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>
											{yearly_income.batteries.batt_1616_qty_sold ? (
												yearly_income.batteries.batt_1616_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>
											{yearly_income.batteries.batt_1225_qty_sold ? (
												yearly_income.batteries.batt_1225_qty_sold
											) : (
												'0'
											)}
										</th>
										<th>
											{yearly_income.batteries.total_qty_sold ? (
												yearly_income.batteries.total_qty_sold
											) : (
												'0'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
					</TabPanel>

					<TabPanel>
						<h2 className="ta-c w-100per jc-c">{year} Decals Sold</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Individual</th>
									<th>Sets</th>
									<th>Income</th>
								</tr>
							</thead>
							<tbody>
								{monthly_income.map((month) => (
									<tr
										style={{
											backgroundColor: month.color
										}}
										className=""
									>
										<th>{month.month}</th>
										<th>{month.decals.qty_sold ? month.decals.qty_sold : '0'}</th>
										<th>{month.decals.sets ? month.decals.sets : '0'}</th>
										<th>
											${month.decals.total_income ? month.decals.total_income.toFixed(2) : '0.00'}
										</th>
									</tr>
								))}
							</tbody>

							{yearly_income &&
							Object.keys(yearly_income).length > 0 && (
								<tfoot>
									<tr>
										<th>Total</th>

										<th>{yearly_income.decals.qty_sold ? yearly_income.decals.qty_sold : '0'}</th>
										<th>{yearly_income.decals.sets ? yearly_income.decals.sets : '0'}</th>
										<th>
											${yearly_income.decals.total_income ? (
												yearly_income.decals.total_income.toFixed(2)
											) : (
												'0.00'
											)}
										</th>
									</tr>
								</tfoot>
							)}
						</table>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Bar data={bar_income_expenses_profit_data} options={bar_income_expenses_profit_options} />
						</div>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Bar data={bar_income_data} options={bar_income_options} />
						</div>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Bar data={bar_expenses_data} options={bar_expenses_options} />
						</div>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Bar data={bar_profit_data} options={bar_profit_options} />
						</div>
					</TabPanel>
					{/* <TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Pie data={pie_data} options={pie_options} />
						</div>
					</TabPanel> */}
				</Tabs>
			)}
		</div>
	);
};
export default MonthlyExpensesPage;
