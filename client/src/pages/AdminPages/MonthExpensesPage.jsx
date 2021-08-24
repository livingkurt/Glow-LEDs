import React, { useEffect, useRef, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

// import { Chart, CategoryScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { hslToHex, humanize, toCapitalize } from '../../utils/helper_functions';
import { API_Orders, API_Products } from '../../utils';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/UtilityComponents';

const MonthExpensesPage = (props) => {
	const this_year = props.match.params.year;
	const this_month = toCapitalize(props.match.params.month);

	const monthly_income_chart_ref = useRef();

	const [ monthly_income, set_monthly_income ] = useState([]);

	const [ supplies, set_supplies ] = useState({});
	const [ entertainment, set_entertainment ] = useState({});
	const [ website, set_website ] = useState({});
	const [ shipping, set_shipping ] = useState({});
	const [ equipment, set_equipment ] = useState({});
	const [ categories, set_categories ] = useState([]);

	const dates_in_year = [
		{ month: 'january', number_of_days: 31, start_date: this_year + '-01-01', end_date: this_year + '-01-31' },
		{ month: 'february', number_of_days: 28, start_date: this_year + '-02-01', end_date: this_year + '-02-28' },
		{ month: 'march', number_of_days: 31, start_date: this_year + '-03-01', end_date: this_year + '-03-31' },
		{ month: 'april', number_of_days: 30, start_date: this_year + '-04-01', end_date: this_year + '-04-30' },
		{ month: 'may', number_of_days: 31, start_date: this_year + '-05-01', end_date: this_year + '-05-31' },
		{ month: 'june', number_of_days: 30, start_date: this_year + '-06-01', end_date: this_year + '-06-30' },
		{ month: 'july', number_of_days: 31, start_date: this_year + '-07-01', end_date: this_year + '-07-31' },
		{ month: 'august', number_of_days: 31, start_date: this_year + '-08-01', end_date: this_year + '-08-31' },
		{ month: 'september', number_of_days: 30, start_date: this_year + '-09-01', end_date: this_year + '-09-30' },
		{ month: 'october', number_of_days: 31, start_date: this_year + '-10-01', end_date: this_year + '-10-31' },
		{ month: 'november', number_of_days: 30, start_date: this_year + '-11-01', end_date: this_year + '-11-30' },
		{ month: 'december', number_of_days: 31, start_date: this_year + '-12-01', end_date: this_year + '-12-31' }
	];
	const [ expenses, set_expenses ] = useState([]);
	const [ orders, set_orders ] = useState([]);
	const [ month, set_month ] = useState(props.match.params.month);
	const [ year, set_year ] = useState(this_year);

	useEffect(
		() => {
			calculate_expenses(props.match.params.month);

			return () => {};
		},
		[ props.match.params.month ]
	);
	useEffect(() => {
		calculate_expenses(props.match.params.month);
		get_all_categories();
		return () => {};
	}, []);

	const get_all_categories = async () => {
		const { data } = await API_Products.get_all_categories();
		// console.log({ data });
		set_categories(data.filter((category) => category.length > 0));
	};

	const calculate_expenses = (new_month) => {
		console.log({ new_month });
		set_expenses([]);
		set_orders([]);
		const start_date = dates_in_year.find((month) => month.month === new_month).start_date;
		const end_date = dates_in_year.find((month) => month.month === new_month).end_date;
		console.log('Hello');
		if (start_date && end_date) {
			get_month_income(start_date, end_date);
		}
	};

	const get_month_income = async (start_date, end_date) => {
		const { data: orders } = await API_Orders.monthly_income(start_date, end_date);
		const { data: expenses } = await API_Orders.monthly_expenses(start_date, end_date);

		set_expenses(expenses);
		set_orders(orders);
		// console.log({ orders });
		// let calc = [];
		// categories &&
		// 	categories.forEach((category) =>
		// 		orders.forEach(
		// 			(order) => (calc = [ ...calc, order.orderItems.filter((item) => item.category === category) ])
		// 		)
		// 	);
		// // if (orders) {
		// // 	const calc = orders.map((order) => order.orderItems.map());
		// // }
		// console.log({ calc });
		// // const calc = categories.map((category) =>
		// // 	orders.forEach((order) =>
		// // 		order.orderItems
		// // 			.map((item) => item.category === category)
		// // 			.reduce((a, c) => parseFloat(a) + parseFloat(c.totalPrice) - parseFloat(c.taxPrice), 0)
		// // 	)
		// // );
	};
	const expenses_pie_multiplier = 360 / 5;
	let num_1 = -expenses_pie_multiplier;

	const expenses_pie_data = {
		labels: [ 'Supplies', 'Entertainment', 'Website', 'Shipping', 'Equipment' ],
		datasets: [
			{
				label: 'Income',
				data: [ 'Supplies', 'Entertainment', 'Website', 'Shipping', 'Equipment' ].map((category) =>
					expenses
						.filter((expense) => expense.category === category)
						.reduce((a, c) => parseFloat(a) + parseFloat(c.amount), 0)
				),
				borderWidth: 1,
				fill: true,
				borderColor: '#3e4c6d',
				backgroundColor: [ 'Supplies', 'Entertainment', 'Website', 'Shipping', 'Equipment' ].map((item) => {
					num_1 += expenses_pie_multiplier;
					let color = hslToHex(num_1, 100, 50);
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
		labels: categories.map((category) => toCapitalize(category)),
		datasets: [
			{
				label: 'Income',
				data: categories.map((category) =>
					orders
						.map((order) => order.orderItems)
						.flat(1)
						.filter((item) => item.category === category)
						.reduce((a, c) => parseFloat(a) + parseFloat(c.price), 0)
						.toFixed(2)
				),
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
		calculate_expenses(e.target.value.toLowerCase());
		get_all_categories();
	};
	const switch_year = (e) => {
		e.preventDefault();
		set_year(e.target.value);
		history.push('/secure/glow/controlpanel/monthly_expenes/' + e.target.value + '/' + month);
		calculate_expenses(month);
		get_all_categories();
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>
					Admin {this_month} {this_year} Breakdown | Glow LEDs
				</title>
			</Helmet>
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
						{/* <Link to={'/secure/glow/controlpanel/monthly_expenes/' + year + '/' + month}>
							<button className="btn primary">Go</button>
						</Link> */}
					</div>
				</div>
			</div>
			{orders &&
			orders.length > 0 && (
				<div className="jc-b">
					<div>
						<h2>{year} Income</h2>
						<div className="fs-30px">
							${orders && orders.length > 0 ? (
								orders
									.filter((order) => order.isPaid)
									.reduce(
										(a, c) => parseFloat(a) + parseFloat(c.totalPrice) - parseFloat(c.taxPrice),
										0
									)
									.toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>{year} Expenses</h2>
						<div className="fs-30px">
							${expenses && expenses.length > 0 ? (
								expenses.reduce((a, c) => parseFloat(a) + parseFloat(c.amount), 0).toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
					<div>
						<h2>{year} Profit</h2>
						<div className="fs-30px">
							${monthly_income && monthly_income.length > 0 ? (
								(orders
									.filter((order) => order.isPaid)
									.reduce(
										(a, c) => parseFloat(a) + parseFloat(c.totalPrice) - parseFloat(c.taxPrice),
										0
									) - expenses.reduce((a, c) => parseFloat(a) + parseFloat(c.amount), 0)).toFixed(2)
							) : (
								'0.00'
							)}
						</div>
					</div>
				</div>
			)}
			<Loading loading={orders.length === 0} />
			{orders &&
			orders.length > 0 && (
				<div>
					<h2 className="ta-c w-100per jc-c">
						{this_month} {this_year} Income
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
										{categories.map((category, index) => (
											<tr
												key={index}
												style={{
													backgroundColor: '#626262',
													fontSize: '1.4rem',
													height: '50px'
												}}
											>
												<th style={{ padding: '15px' }}>{toCapitalize(humanize(category))}</th>
												<th style={{ padding: '15px' }}>
													{console.log({
														orderItems: orders
															.map((order) => order.orderItems)
															.flat(1)
															.filter((item) => item.category === category)
													})}
													${orders && orders.length > 0 ? (
														orders
															.map((order) => order.orderItems)
															.flat(1)
															.filter((item) => item.category === category)
															.reduce((a, c) => parseFloat(a) + parseFloat(c.price), 0)
															.toFixed(2)
													) : (
														'0.00'
													)}
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
			<Loading loading={expenses.length === 0} />
			{expenses &&
			expenses.length > 0 && (
				<div>
					<h2 className="ta-c w-100per jc-c">
						{this_month} {this_year} Expenses
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
										{[
											'Supplies',
											'Entertainment',
											'Website',
											'Shipping',
											'Equipment'
										].map((category) => (
											<tr
												style={{
													backgroundColor: '#626262',
													fontSize: '1.4rem',
													height: '50px'
												}}
											>
												<th style={{ padding: '15px' }}>{toCapitalize(category)}</th>
												<th style={{ padding: '15px' }}>
													${expenses && expenses.length > 0 ? (
														expenses
															.filter((expense) => expense.category === category)
															.reduce((a, c) => parseFloat(a) + parseFloat(c.amount), 0)
															.toFixed(2)
													) : (
														'0.00'
													)}
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

			{/* <Loading loading={orders.length === 0} /> */}
			{/* {orders.length > 0 && (
				<div className="">
					<div className="jc-b">
						{categories &&
							categories.map((category) => (
								<div>
									<h2>{toCapitalize(humanize(category))}</h2>
									<div className="fs-30px">
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
		</div>
	);
};
export default MonthExpensesPage;
