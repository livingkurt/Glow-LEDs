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
	const [ batteries, set_batteries ] = useState({});

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
		get_monthly_income(year);
		return () => {};
	}, []);

	useEffect(
		() => {
			get_monthly_income(year);
			return () => {};
		},
		[ year ]
	);

	const [ january, set_january ] = useState({});
	const [ february, set_february ] = useState({});
	const [ march, set_march ] = useState({});
	const [ april, set_april ] = useState({});
	const [ may, set_may ] = useState({});
	const [ june, set_june ] = useState({});
	const [ july, set_july ] = useState({});
	const [ august, set_august ] = useState({});
	const [ september, set_september ] = useState({});
	const [ october, set_october ] = useState({});
	const [ november, set_november ] = useState({});
	const [ december, set_december ] = useState({});
	const [ month, set_month ] = useState();

	const update_income = (month, income, expenses, batteries) => {
		if (month === 'january') {
			set_january({
				month: 'january',
				income,
				expenses,
				profit: income + expenses,
				color: '#b33434',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1620: batteries.batteries_1620,
				batteries_1620_tot16: batteries.batteries_1620_tot16,
				batter16s_1225: batteries.batter16s_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'february') {
			set_february({
				month: 'february',
				income,
				expenses,
				profit: income + expenses,
				color: '#b9742f',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'march') {
			set_march({
				month: 'march',
				income,
				expenses,
				profit: income + expenses,
				color: '#bfbf26',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'april') {
			set_april({
				month: 'april',
				income,
				expenses,
				profit: income + expenses,
				color: '#7ccd2a',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'may') {
			set_may({
				month: 'may',
				income,
				expenses,
				profit: income + expenses,
				color: '#2bc92b',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'june') {
			set_june({
				month: 'june',
				income,
				expenses,
				profit: income + expenses,
				color: '#29c779',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'july') {
			set_july({
				month: 'july',
				income,
				expenses,
				profit: income + expenses,
				color: '#27bfbf',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'august') {
			set_august({
				month: 'august',
				income,
				expenses,
				profit: income + expenses,
				color: '#2873bd',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'september') {
			set_september({
				month: 'september',
				income,
				expenses,
				profit: income + expenses,
				color: '#2a2ab5',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'october') {
			set_october({
				month: 'october',
				income,
				expenses,
				profit: income + expenses,
				color: '#742bbd',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'november') {
			set_november({
				month: 'november',
				income,
				expenses,
				profit: income + expenses,
				color: '#bd28bd',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
		if (month === 'december') {
			set_december({
				month: 'december',
				income,
				expenses,
				profit: income + expenses,
				color: '#c12573',
				batteries_1620: batteries.batteries_1620,
				batteries_1620_total: batteries.batteries_1620_total,
				batteries_1616: batteries.batteries_1616,
				batteries_1616_total: batteries.batteries_1616_total,
				batteries_1225: batteries.batteries_1225,
				batteries_1225_total: batteries.batteries_1225_total
			});
		}
	};
	const empty_income = () => {
		set_january({});
		set_february({});
		set_march({});
		set_april({});
		set_may({});
		set_june({});
		set_july({});
		set_august({});
		set_september({});
		set_october({});
		set_november({});
		set_december({});
		set_monthly_income([]);
	};

	const get_monthly_income = async (year) => {
		empty_income();
		const income_each_month = await Promise.all(
			dates_in_year.map(async (month, month_number) => {
				const { data: orders } = await API_Orders.monthly_income(month.start_date, month.end_date);
				const { data: expenses } = await API_Orders.monthly_expenses(month.start_date, month.end_date);
				let batteries = get_batteries(orders);
				let income = 0;
				let total_expenses = 0;
				if (orders.length > 1) {
					income = orders.reduce((a, c) => a + c.totalPrice - c.taxPrice, 0);
					total_expenses = expenses.reduce((a, c) => a + c.amount, 0);
				}
				update_income(dates_in_year[month_number].month, income, total_expenses, batteries);
				return {
					month: dates_in_year[month_number].month,
					income,
					expenses: total_expenses,
					profit: income + total_expenses,
					batteries_1620: batteries.batteries_1620,
					batteries_1616: batteries.batteries_1616,
					batteries_1225: batteries.batteries_1225,
					batteries_1620_total: batteries.batteries_1620_total,
					batteries_1616_total: batteries.batteries_1616_total,
					batteries_1225_total: batteries.batteries_1225_total
				};
			})
		);
		console.log({ income_each_month });
		set_monthly_income(income_each_month);
		// initialize_monthly_income_chart(income_each_month);
	};

	const get_batteries = (data) => {
		const batt_1620 = data
			.map((order) => order.orderItems)
			.flat(1)
			.filter((item) => item.name === 'Bulk CR1620 Batteries');
		const batt_1616 = data
			.map((order) => order.orderItems)
			.flat(1)
			.filter((item) => item.name === 'Bulk CR1616 Batteries');
		const batt_1225 = data
			.map((order) => order.orderItems)
			.flat(1)
			.filter((item) => item.name === 'Bulk CR1225 Batteries');

		const batt_1620_options = batt_1620
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.size, 0);
		const batt_1616_options = batt_1616
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.size, 0);
		const batt_1225_options = batt_1225
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.size, 0);
		const batt_1620_size = batt_1620
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseInt(a) + parseInt(c.size), 0);
		const batt_1616_size = batt_1616
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseInt(a) + parseInt(c.size), 0);
		const batt_1225_size = batt_1225
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseInt(a) + parseInt(c.size), 0);
		const batt_1620_options_total = batt_1620
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.price, 0);
		const batt_1616_options_total = batt_1616
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.price, 0);
		const batt_1225_options_total = batt_1225
			.filter((item) => item.product_option)
			.reduce((a, c) => a + c.product_option.price, 0);
		const batt_1620_size_total = batt_1620
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseFloat(a) + parseFloat(c.price), 0);
		const batt_1616_size_total = batt_1616
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseFloat(a) + parseFloat(c.price), 0);
		const batt_1225_size_total = batt_1225
			.filter((item) => item.size > 0)
			.reduce((a, c) => parseFloat(a) + parseFloat(c.price), 0);
		return {
			batteries_1620: batt_1620_options + batt_1620_size,
			batteries_1616: batt_1616_options + batt_1616_size,
			batteries_1225: batt_1225_options + batt_1225_size,
			batteries_1620_total: batt_1620_options_total + batt_1620_size_total,
			batteries_1616_total: batt_1616_options_total + batt_1616_size_total,
			batteries_1225_total: batt_1225_options_total + batt_1225_size_total
		};
	};

	const multiplier = 360 / monthly_income.length;
	let num_1 = -multiplier;
	let num_2 = -multiplier;
	let num_3 = -multiplier;
	const bar_data = {
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
	const bar_options = {
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

	// const switch_year = (e) => {
	// 	// history('')
	// 	get_monthly_income();
	// 	// set_year(e.target.value);
	// };
	// const switch_month = (e) => {
	// 	// history('')
	// 	get_monthly_income();
	// 	// set_month(e.target.value);
	// };

	// const switch_month = (e) => {
	// 	e.preventDefault();
	// 	set_month(e.target.value);
	// 	calculate_expenses(e.target.value.toLowerCase());
	// 	get_all_categories();
	// };
	// const switch_year = (e) => {
	// 	e.preventDefault();
	// 	set_year(year);
	// 	get_monthly_income(year);
	// };

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
								<option value="january">{toCapitalize('january')}</option>
								<option value="february">{toCapitalize('february')}</option>
								<option value="march">{toCapitalize('march')}</option>
								<option value="april">{toCapitalize('april')}</option>
								<option value="may">{toCapitalize('may')}</option>
								<option value="june">{toCapitalize('june')}</option>
								<option value="july">{toCapitalize('july')}</option>
								<option value="august">{toCapitalize('august')}</option>
								<option value="september">{toCapitalize('september')}</option>
								<option value="october">{toCapitalize('october')}</option>
								<option value="november">{toCapitalize('november')}</option>
								<option value="december">{toCapitalize('december')}</option>
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
			<Loading loading={monthly_income.length === 0} />
			{monthly_income &&
			monthly_income.length > 0 && (
				<div className="jc-b">
					<div>
						<h2>{year} Income</h2>
						<div className="fs-30px">
							${monthly_income && monthly_income.length > 0 ? (
								monthly_income
									.filter((month) => month !== undefined)
									.reduce((a, c) => parseFloat(a) + parseFloat(c.income), 0)
									.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>{year} Expenses</h2>
						<div className="fs-30px">
							${monthly_income && monthly_income.length > 0 ? (
								monthly_income
									.filter((month) => month !== undefined)
									.reduce((a, c) => parseFloat(a) + parseFloat(c.expenses), 0)
									.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>{year} Profit</h2>
						<div className="fs-30px">
							${monthly_income && monthly_income.length > 0 ? (
								monthly_income
									.filter((month) => month !== undefined)
									.reduce((a, c) => parseFloat(a) + parseFloat(c.profit), 0)
									.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
				</div>
			)}
			{/* <h2 className="ta-c w-100per jc-c">{year} Monthly Income</h2> */}

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
									{year} Batteries Sold
								</Tab>
								<Tab style={{ padding: '10px', borderRadius: '10px 10px 0px 0px' }}>
									{year} Monthly Expense/Profit
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
								<tr
									style={{
										backgroundColor: january.color
									}}
									className=""
								>
									<th>January</th>
									<th>${january.income ? january.income.toFixed(2) : '0.00'}</th>
									<th>${january.expenses ? january.expenses.toFixed(2) : '0.00'}</th>
									<th>${january.profit ? january.profit.toFixed(2) : '0.00'}</th>
								</tr>

								<tr
									style={{
										backgroundColor: february.color
									}}
									className=""
								>
									<th>Feburary</th>
									<th>${february.income ? february.income.toFixed(2) : '0.00'}</th>
									<th>${february.expenses ? february.expenses.toFixed(2) : '0.00'}</th>
									<th>${february.profit ? february.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: march.color
									}}
									className=""
								>
									<th>March</th>
									<th>${march.income ? march.income.toFixed(2) : '0.00'}</th>
									<th>${march.expenses ? march.expenses.toFixed(2) : '0.00'}</th>
									<th>${march.profit ? march.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: april.color
									}}
									className=""
								>
									<th>April</th>
									<th>${april.income ? april.income.toFixed(2) : '0.00'}</th>
									<th>${april.expenses ? april.expenses.toFixed(2) : '0.00'}</th>
									<th>${april.profit ? april.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: may.color
									}}
									className=""
								>
									<th>May</th>
									<th>${may.income ? may.income.toFixed(2) : '0.00'}</th>
									<th>${may.expenses ? may.expenses.toFixed(2) : '0.00'}</th>
									<th>${may.profit ? may.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: june.color
									}}
									className=""
								>
									<th>June</th>
									<th>${june.income ? june.income.toFixed(2) : '0.00'}</th>
									<th>${june.expenses ? june.expenses.toFixed(2) : '0.00'}</th>
									<th>${june.profit ? june.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: july.color
									}}
									className=""
								>
									<th>July</th>
									<th>${july.income ? july.income.toFixed(2) : '0.00'}</th>
									<th>${july.expenses ? july.expenses.toFixed(2) : '0.00'}</th>
									<th>${july.profit ? july.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: august.color
									}}
									className=""
								>
									<th>August</th>
									<th>${august.income ? august.income.toFixed(2) : '0.00'}</th>
									<th>${august.expenses ? august.expenses.toFixed(2) : '0.00'}</th>
									<th>${august.profit ? august.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: september.color
									}}
									className=""
								>
									<th>September</th>
									<th>${september.income ? september.income.toFixed(2) : '0.00'}</th>
									<th>${september.expenses ? september.expenses.toFixed(2) : '0.00'}</th>
									<th>${september.profit ? september.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: october.color
									}}
									className=""
								>
									<th>October</th>
									<th>${october.income ? october.income.toFixed(2) : '0.00'}</th>
									<th>${october.expenses ? october.expenses.toFixed(2) : '0.00'}</th>
									<th>${october.profit ? october.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: november.color
									}}
									className=""
								>
									<th>November</th>
									<th>${november.income ? november.income.toFixed(2) : '0.00'}</th>
									<th>${november.expenses ? november.expenses.toFixed(2) : '0.00'}</th>
									<th>${november.profit ? november.profit.toFixed(2) : '0.00'}</th>
								</tr>
								<tr
									style={{
										backgroundColor: december.color
									}}
									className=""
								>
									<th>December</th>
									<th>${december.income ? december.income.toFixed(2) : '0.00'}</th>
									<th>${december.expenses ? december.expenses.toFixed(2) : '0.00'}</th>
									<th>${december.profit ? december.profit.toFixed(2) : '0.00'}</th>
								</tr>
							</tbody>

							<tfoot>
								<tr>
									<th>Total</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => parseFloat(a) + parseFloat(c.income), 0)
												.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => parseFloat(a) + parseFloat(c.expenses), 0)
												.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => parseFloat(a) + parseFloat(c.profit), 0)
												.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
							</tfoot>
						</table>
					</TabPanel>
					<TabPanel>
						<h2 className="ta-c w-100per jc-c">{year} Batteries Sold</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Bulk CR1620 Batteries</th>
									<th>Bulk CR1620 Batteries Total</th>
									<th>Bulk CR1616 Batteries</th>
									<th>Bulk CR1616 Batteries Total</th>
									<th>Bulk CR1225 Batteries</th>
									<th>Bulk CR1225 Batteries Total</th>
									<th>Bulk Batteries Amount</th>
									<th>Bulk Batteries Total</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: january.color
									}}
									className=""
								>
									<th>January</th>
									<th>{january.batteries_1620 ? january.batteries_1620 : '0'}</th>
									<th>
										${january.batteries_1620_total ? (
											january.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{january.batteries_1616 ? january.batteries_1616 : '0'}</th>
									<th>
										${january.batteries_1616_total ? (
											january.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{january.batteries_1225 ? january.batteries_1225 : '0'}</th>
									<th>
										${january.batteries_1225_total ? (
											january.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{january.batteries_1225 ? (
											january.batteries_1225 + january.batteries_1620 + january.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${january.batteries_1225_total ? (
											(january.batteries_1225_total +
												january.batteries_1620_total +
												january.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: february.color
									}}
									className=""
								>
									<th>Feburary</th>
									<th>{february.batteries_1620 ? february.batteries_1620 : '0'}</th>
									<th>
										${february.batteries_1620_total ? (
											february.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{february.batteries_1616 ? february.batteries_1616 : '0'}</th>
									<th>
										${february.batteries_1616_total ? (
											february.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{february.batteries_1225 ? february.batteries_1225 : '0'}</th>
									<th>
										${february.batteries_1225_total ? (
											february.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{february.batteries_1225 ? (
											february.batteries_1225 + february.batteries_1620 + february.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${february.batteries_1225_total ? (
											(february.batteries_1225_total +
												february.batteries_1620_total +
												february.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: march.color
									}}
									className=""
								>
									<th>March</th>
									<th>{march.batteries_1620 ? march.batteries_1620 : '0'}</th>
									<th>
										${march.batteries_1620_total ? march.batteries_1620_total.toFixed(2) : '0.00'}
									</th>
									<th>{march.batteries_1616 ? march.batteries_1616 : '0'}</th>
									<th>
										${march.batteries_1616_total ? march.batteries_1616_total.toFixed(2) : '0.00'}
									</th>
									<th>{march.batteries_1225 ? march.batteries_1225 : '0'}</th>
									<th>
										${march.batteries_1225_total ? march.batteries_1225_total.toFixed(2) : '0.00'}
									</th>
									<th>
										{march.batteries_1225 ? (
											march.batteries_1225 + march.batteries_1620 + march.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${march.batteries_1225_total ? (
											(march.batteries_1225_total +
												march.batteries_1620_total +
												march.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: april.color
									}}
									className=""
								>
									<th>April</th>
									<th>{april.batteries_1620 ? april.batteries_1620 : '0'}</th>
									<th>
										${april.batteries_1620_total ? april.batteries_1620_total.toFixed(2) : '0.00'}
									</th>
									<th>{april.batteries_1616 ? april.batteries_1616 : '0'}</th>
									<th>
										${april.batteries_1616_total ? april.batteries_1616_total.toFixed(2) : '0.00'}
									</th>
									<th>{april.batteries_1225 ? april.batteries_1225 : '0'}</th>
									<th>
										${april.batteries_1225_total ? april.batteries_1225_total.toFixed(2) : '0.00'}
									</th>
									<th>
										{april.batteries_1225 ? (
											april.batteries_1225 + april.batteries_1620 + april.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${april.batteries_1225_total ? (
											(april.batteries_1225_total +
												april.batteries_1620_total +
												april.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: may.color
									}}
									className=""
								>
									<th>May</th>
									<th>{may.batteries_1620 ? may.batteries_1620 : '0'}</th>
									<th>{may.batteries_1620_total ? may.batteries_1620_total.toFixed(2) : '0.00'}</th>
									<th>{may.batteries_1616 ? may.batteries_1616 : '0'}</th>
									<th>{may.batteries_1616_total ? may.batteries_1616_total.toFixed(2) : '0.00'}</th>
									<th>{may.batteries_1225 ? may.batteries_1225 : '0'}</th>
									<th>{may.batteries_1225_total ? may.batteries_1225_total.toFixed(2) : '0.00'}</th>
									<th>
										{may.batteries_1225 ? (
											may.batteries_1225 + may.batteries_1620 + may.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${may.batteries_1225_total ? (
											(may.batteries_1225_total +
												may.batteries_1620_total +
												may.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: june.color
									}}
									className=""
								>
									<th>June</th>
									<th>{june.batteries_1620 ? june.batteries_1620 : '0'}</th>
									<th>
										${june.batteries_1620_total ? june.batteries_1620_total.toFixed(2) : '0.00'}
									</th>
									<th>{june.batteries_1616 ? june.batteries_1616 : '0'}</th>
									<th>
										${june.batteries_1616_total ? june.batteries_1616_total.toFixed(2) : '0.00'}
									</th>
									<th>{june.batteries_1225 ? june.batteries_1225 : '0'}</th>
									<th>
										${june.batteries_1225_total ? june.batteries_1225_total.toFixed(2) : '0.00'}
									</th>

									<th>
										{june.batteries_1225 ? (
											june.batteries_1225 + june.batteries_1620 + june.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${june.batteries_1225_total ? (
											(june.batteries_1225_total +
												june.batteries_1620_total +
												june.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: july.color
									}}
									className=""
								>
									<th>July</th>
									<th>{july.batteries_1620 ? july.batteries_1620 : '0'}</th>
									<th>
										${july.batteries_1620_total ? july.batteries_1620_total.toFixed(2) : '0.00'}
									</th>
									<th>{july.batteries_1616 ? july.batteries_1616 : '0'}</th>
									<th>
										${july.batteries_1616_total ? july.batteries_1616_total.toFixed(2) : '0.00'}
									</th>
									<th>{july.batteries_1225 ? july.batteries_1225 : '0'}</th>
									<th>
										${july.batteries_1225_total ? july.batteries_1225_total.toFixed(2) : '0.00'}
									</th>
									<th>
										{july.batteries_1225 ? (
											july.batteries_1225 + july.batteries_1620 + july.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${july.batteries_1225_total ? (
											(july.batteries_1225_total +
												july.batteries_1620_total +
												july.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: august.color
									}}
									className=""
								>
									<th>August</th>
									<th>{august.batteries_1620 ? august.batteries_1620 : '0'}</th>
									<th>
										${august.batteries_1620_total ? august.batteries_1620_total.toFixed(2) : '0.00'}
									</th>
									<th>{august.batteries_1616 ? august.batteries_1616 : '0'}</th>
									<th>
										${august.batteries_1616_total ? august.batteries_1616_total.toFixed(2) : '0.00'}
									</th>
									<th>{august.batteries_1225 ? august.batteries_1225 : '0'}</th>
									<th>
										${august.batteries_1225_total ? august.batteries_1225_total.toFixed(2) : '0.00'}
									</th>
									<th>
										{august.batteries_1225 ? (
											august.batteries_1225 + august.batteries_1620 + august.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${august.batteries_1225_total ? (
											(august.batteries_1225_total +
												august.batteries_1620_total +
												august.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: september.color
									}}
									className=""
								>
									<th>September</th>
									<th>{september.batteries_1620 ? september.batteries_1620 : '0'}</th>
									<th>
										${september.batteries_1620_total ? (
											september.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{september.batteries_1616 ? september.batteries_1616 : '0'}</th>
									<th>
										${september.batteries_1616_total ? (
											september.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{september.batteries_1225 ? september.batteries_1225 : '0'}</th>
									<th>
										${september.batteries_1225_total ? (
											september.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{september.batteries_1225 ? (
											september.batteries_1225 +
											september.batteries_1620 +
											september.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${september.batteries_1225_total ? (
											(september.batteries_1225_total +
												september.batteries_1620_total +
												september.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: october.color
									}}
									className=""
								>
									<th>October</th>
									<th>{october.batteries_1620 ? october.batteries_1620 : '0'}</th>
									<th>
										${october.batteries_1620_total ? (
											october.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{october.batteries_1616 ? october.batteries_1616 : '0'}</th>
									<th>
										${october.batteries_1616_total ? (
											october.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{october.batteries_1225 ? october.batteries_1225 : '0'}</th>
									<th>
										${october.batteries_1225_total ? (
											october.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{october.batteries_1225 ? (
											october.batteries_1225 + october.batteries_1620 + october.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${october.batteries_1225_total ? (
											(october.batteries_1225_total +
												october.batteries_1620_total +
												october.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: november.color
									}}
									className=""
								>
									<th>November</th>
									<th>{november.batteries_1620 ? november.batteries_1620 : '0'}</th>
									<th>
										${november.batteries_1620_total ? (
											november.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{november.batteries_1616 ? november.batteries_1616 : '0'}</th>
									<th>
										${november.batteries_1616_total ? (
											november.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{november.batteries_1225 ? november.batteries_1225 : '0'}</th>
									<th>
										${november.batteries_1225_total ? (
											november.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{november.batteries_1225 ? (
											november.batteries_1225 + november.batteries_1620 + november.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${november.batteries_1225_total ? (
											(november.batteries_1225_total +
												november.batteries_1620_total +
												november.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: december.color
									}}
									className=""
								>
									<th>December</th>
									<th>{december.batteries_1620 ? december.batteries_1620 : '0'}</th>
									<th>
										${december.batteries_1620_total ? (
											december.batteries_1620_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{december.batteries_1616 ? december.batteries_1616 : '0'}</th>
									<th>
										${december.batteries_1616_total ? (
											december.batteries_1616_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>{december.batteries_1225 ? december.batteries_1225 : '0'}</th>
									<th>
										${december.batteries_1225_total ? (
											december.batteries_1225_total.toFixed(2)
										) : (
											'0.00'
										)}
									</th>
									<th>
										{december.batteries_1225 ? (
											december.batteries_1225 + december.batteries_1620 + december.batteries_1616
										) : (
											'0'
										)}
									</th>
									<th>
										${december.batteries_1225_total ? (
											(december.batteries_1225_total +
												december.batteries_1620_total +
												december.batteries_1616_total).toFixed(2)
										) : (
											'0.00'
										)}
									</th>
								</tr>
							</tbody>

							<tfoot>
								<tr>
									<th>Profit</th>
									<th />
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1620_total, 0) -
												monthly_income
													.filter((month) => month !== undefined)
													.reduce((a, c) => a + c.batteries_1620, 0) *
													0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1616_total, 0) -
												monthly_income
													.filter((month) => month !== undefined)
													.reduce((a, c) => a + c.batteries_1616, 0) *
													0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1225_total, 0) -
												monthly_income
													.filter((month) => month !== undefined)
													.reduce((a, c) => a + c.batteries_1225, 0) *
													0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce(
													(a, c) =>
														a +
														c.batteries_1225_total +
														c.batteries_1620_total +
														c.batteries_1616_total,
													0
												) -
												monthly_income
													.filter((month) => month !== undefined)
													.reduce(
														(a, c) =>
															a + c.batteries_1225 + c.batteries_1620 + c.batteries_1616,
														0
													) *
													0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
								</tr>
							</tfoot>
							<tfoot>
								<tr>
									<th>Total</th>
									<th>
										{monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1620, 0)
										) : (
											'0'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1620_total, 0)
												.toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th>
										{monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1616, 0)
										) : (
											'0'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1616_total, 0)
												.toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th>
										{monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1225, 0)
										) : (
											'0'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1225_total, 0)
												.toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th>
										{monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce(
													(a, c) =>
														a + c.batteries_1225 + c.batteries_1620 + c.batteries_1616,
													0
												)
										) : (
											'0'
										)}
									</th>
									<th>
										${monthly_income && monthly_income.length > 0 ? (
											monthly_income
												.filter((month) => month !== undefined)
												.reduce(
													(a, c) =>
														a +
														c.batteries_1225_total +
														c.batteries_1620_total +
														c.batteries_1616_total,
													0
												)
												.toFixed(2)
										) : (
											'0'
										)}
									</th>
								</tr>
							</tfoot>
							<tfoot>
								<tr>
									<th>Expense</th>
									<th />
									<th>
										-${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1620, 0) * 0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										-${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1616, 0) * 0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										-${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce((a, c) => a + c.batteries_1225, 0) * 0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
									<th />
									<th>
										-${monthly_income && monthly_income.length > 0 ? (
											(monthly_income
												.filter((month) => month !== undefined)
												.reduce(
													(a, c) =>
														a + c.batteries_1225 + c.batteries_1620 + c.batteries_1616,
													0
												) * 0.0685).toFixed(2)
										) : (
											'0'
										)}
									</th>
								</tr>
							</tfoot>
						</table>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Bar data={bar_data} options={bar_options} />
						</div>
					</TabPanel>
					<TabPanel>
						<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
							<Pie data={pie_data} options={pie_options} />
						</div>
					</TabPanel>
				</Tabs>
			)}
		</div>
	);
};
export default MonthlyExpensesPage;
