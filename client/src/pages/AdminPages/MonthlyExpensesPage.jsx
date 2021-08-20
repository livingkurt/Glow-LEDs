import React, { useEffect, useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// import { Chart, CategoryScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { hslToHex, toCapitalize } from '../../utils/helper_functions';
import { API_Orders } from '../../utils';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/UtilityComponents';

const MonthlyExpensesPage = (props) => {
	const this_year = props.match.params.year;

	const monthly_income_chart_ref = useRef();

	const [ monthly_income, set_monthly_income ] = useState([]);

	const [ year, set_year ] = useState(this_year);

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

	const update_income = (month, income, expenses) => {
		if (month === 'january') {
			set_january({ month: 'january', income, expenses, profit: income + expenses, color: '#b33434' });
		}
		if (month === 'february') {
			set_february({ month: 'february', income, expenses, profit: income + expenses, color: '#b9742f' });
		}
		if (month === 'march') {
			set_march({ month: 'march', income, expenses, profit: income + expenses, color: '#bfbf26' });
		}
		if (month === 'april') {
			set_april({ month: 'april', income, expenses, profit: income + expenses, color: '#7ccd2a' });
		}
		if (month === 'may') {
			set_may({ month: 'may', income, expenses, profit: income + expenses, color: '#2bc92b' });
		}
		if (month === 'june') {
			set_june({ month: 'june', income, expenses, profit: income + expenses, color: '#29c779' });
		}
		if (month === 'july') {
			set_july({ month: 'july', income, expenses, profit: income + expenses, color: '#27bfbf' });
		}
		if (month === 'august') {
			set_august({ month: 'august', income, expenses, profit: income + expenses, color: '#2873bd' });
		}
		if (month === 'september') {
			set_september({ month: 'september', income, expenses, profit: income + expenses, color: '#2a2ab5' });
		}
		if (month === 'october') {
			set_october({ month: 'october', income, expenses, profit: income + expenses, color: '#742bbd' });
		}
		if (month === 'november') {
			set_november({ month: 'november', income, expenses, profit: income + expenses, color: '#bd28bd' });
		}
		if (month === 'december') {
			set_december({ month: 'december', income, expenses, profit: income + expenses, color: '#c12573' });
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
				let income = 0;
				let total_expenses = 0;
				if (orders.length > 1) {
					income = orders.reduce((a, c) => a + c.totalPrice - c.taxPrice, 0);
					total_expenses = expenses.reduce((a, c) => a + c.amount, 0);
				}
				update_income(dates_in_year[month_number].month, income, total_expenses);
				return {
					month: dates_in_year[month_number].month,
					income,
					expenses: total_expenses,
					profit: income + total_expenses
				};
			})
		);
		console.log({ income_each_month });
		set_monthly_income(income_each_month);
		// initialize_monthly_income_chart(income_each_month);
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
				<div className="order-list responsive_table">
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

					{/* <canvas id="monthly_income_chart" ref={monthly_income_chart_ref} /> */}
					{/* <Pie data={data} /> */}
					{/* <h2 className="ta-c w-100per jc-c">{year} Monthly Breakdown</h2> */}
					<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
						<Bar data={bar_data} options={bar_options} />
					</div>
					<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
						<Pie data={pie_data} options={pie_options} />
					</div>
				</div>
			)}
		</div>
	);
};
export default MonthlyExpensesPage;
