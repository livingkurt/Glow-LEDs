import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { listOrders } from '../../actions/orderActions';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';
// import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import { occurrence, hslToHex, unformat_date } from '../../utils/helper_functions';
import API from '../../utils/API';
import { listSponsors } from '../../actions/sponsorActions';
import { listPromos } from '../../actions/promoActions';
import { Helmet } from 'react-helmet';

const colors = {
	hidden: '#333333'
};

const ControlPanelPage = (props) => {
	const dispatch = useDispatch();

	const chartRef = useRef();
	const expense_doughnut_ref = useRef();

	const expenseList = useSelector((state) => state.expenseList);
	const { loading: loading_expenses, expenses, error: error_expenses } = expenseList;

	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const productList = useSelector((state) => state.productList);
	const { loading: loading_products, products, error: error_products } = productList;

	const userList = useSelector((state) => state.userList);
	const { loading: loading_users, users, error: error_users } = userList;

	const sponsorList = useSelector((state) => state.sponsorList);
	const { loading: loading_sponsors, sponsors, error: error_sponsors } = sponsorList;

	const promoList = useSelector((state) => state.promoList);
	const { loading: loading_promos, promos, error: error_promos } = promoList;

	const [ product_occurrences, set_product_occurrences ] = useState([]);
	const [ daily_orders, set_daily_orders ] = useState([]);
	const [ weekly_orders, set_weekly_orders ] = useState([]);
	const [ monthly_orders, set_monthly_orders ] = useState([]);

	useEffect(() => {
		dispatch(listOrders());
		dispatch(listExpenses());
		dispatch(listProducts());
		dispatch(listUsers());
		dispatch(listSponsors());
		dispatch(listPromos());
		get_income();
	}, []);

	// useEffect(
	// 	() => {
	// 		// initialize_chart();
	// 		return () => {};
	// 	},
	// 	[ expenses ]
	// );
	useEffect(
		() => {
			// initialize_chart();
			get_occurrences();
			return () => {};
		},
		[ orders ]
	);

	const get_income = async () => {
		const { data: daily } = await API.get_daily_income();
		console.log({ daily });
		set_daily_orders(daily);
		const { data: weekly } = await API.get_weekly_income();
		console.log({ weekly });
		set_weekly_orders(weekly);
		const { data: monthly } = await API.get_monthly_income();
		console.log({ monthly });
		set_monthly_orders(monthly);
	};

	// const month= ["January","February","March","April","May","June","July",
	//           "August","September","October","November","December"];
	const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

	// const initialize_chart = () => {
	// 	const expense_chartRef = chartRef.current.getContext('2d');

	// 	new Chart(expense_chartRef, {
	// 		type: 'line',
	// 		data: {
	// 			//Bring in data
	// 			labels: expenses.map((expense) => expense.expense_name),
	// 			datasets: [
	// 				{
	// 					label: 'Sales',
	// 					data: expenses.map((expense) => expense.amount),
	// 					fill: true,
	// 					borderColor: 'black'
	// 				}
	// 			]
	// 		},
	// 		options: {
	// 			// // Responsive Design
	// 			// responsive: true,
	// 			// maintainAspectRatio: false
	// 			// // Customize the Layout
	// 			// layout: {
	// 			// 	padding: {
	// 			// 		top: 5,
	// 			// 		left: 15,
	// 			// 		right: 15,
	// 			// 		bottom: 15
	// 			// 	}
	// 			// }
	// 		}
	// 		// // Removing Data Ticks, Graph Lines, and Borders
	// 		// scales: {
	// 		// 	xAxes: [
	// 		// 		{
	// 		// 			ticks: { display: false },
	// 		// 			gridLines: {
	// 		// 				display: false,
	// 		// 				drawBorder: false
	// 		// 			}
	// 		// 		}
	// 		// 	],
	// 		// 	yAxes: [
	// 		// 		{
	// 		// 			ticks: { display: false },
	// 		// 			gridLines: {
	// 		// 				display: false,
	// 		// 				drawBorder: false
	// 		// 			}
	// 		// 		}
	// 		// 	]
	// 		// }
	// 	});
	// 	// const expense_doughnut_chart = expense_doughnut_ref.current.getContext('2d');
	// 	// new Chart(expense_doughnut_chart, {
	// 	// 	type: 'doughnut',
	// 	// 	data: [
	// 	// 		expenses.filter((expense) => expense === 'Supplies').map((expense) => expense.amount),
	// 	// 		expenses.filter((expense) => expense === 'Business').map((expense) => expense.amount),
	// 	// 		expenses.filter((expense) => expense === 'Website').map((expense) => expense.amount)
	// 	// 	],
	// 	// 	labels: [ 'Supplies', 'Business', 'Website' ],
	// 	// 	options: {}
	// 	// });
	// };

	const duration_of_opening = () => {
		const current_date = new Date();
		const start_date = new Date('2020-08-10');
		var difference_in_time = current_date.getTime() - start_date.getTime();
		var difference_in_day = difference_in_time / (1000 * 3600 * 24);
		// console.log({ difference_in_day });
		return difference_in_day;
	};

	const initialize_occurrence_chart = (occurrences) => {
		const expense_chartRef = chartRef.current.getContext('2d');
		const multiplier = 360 / occurrences.length;

		let num = -multiplier;
		// console.log(
		// 	occurrences.map((item) => {
		// 		num += multiplier;
		// 		// return `hsl(${num}, 100%, 50%)`;
		// 		let color = hslToHex(num, 100, 50);
		// 		return color;
		// 	})
		// );
		new Chart(expense_chartRef, {
			type: 'bar',
			data: {
				//Bring in data
				labels: occurrences.map((product) => product.name),
				datasets: [
					{
						label: 'Product',
						data: occurrences.map((product) => product.occurrence),
						fill: true,
						borderColor: '#3e4c6d',
						// backgroundColor: '#333333',
						// backgroundColor: [ 'red', 'blue', 'green', 'blue', 'red', 'blue' ],
						backgroundColor: occurrences.map((item) => {
							num += multiplier;
							let color = hslToHex(num, 100, 50);
							// return `hsl(${num}, 50%, 100%)`;
							return color;
						}),
						color: 'white'
					}
				]
			},
			options: {
				// Responsive Design
				responsive: true,
				maintainAspectRatio: true,
				// Customize the Layout
				layout: {
					padding: {
						top: 5,
						left: 15,
						right: 15,
						bottom: 15
					}
				},
				legend: {
					labels: {
						display: true,
						fontColor: 'white'
					}
				},
				title: {
					display: false,
					fontColor: 'white',
					text: 'Occurrences'
				},
				scales: {
					xAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					],
					yAxes: [
						{
							ticks: {
								display: true,
								fontColor: 'white'
							},
							gridLines: {
								display: true,
								// drawBorder: false,
								fontColor: 'white'
							}
						}
					]
				}
			}
			// // Removing Data Ticks, Graph Lines, and Borders
		});
		// const expense_doughnut_chart = expense_doughnut_ref.current.getContext('2d');
		// new Chart(expense_doughnut_chart, {
		// 	type: 'doughnut',
		// 	data: [
		// 		expenses.filter((expense) => expense === 'Supplies').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Business').map((expense) => expense.amount),
		// 		expenses.filter((expense) => expense === 'Website').map((expense) => expense.amount)
		// 	],
		// 	labels: [ 'Supplies', 'Business', 'Website' ],
		// 	options: {}
		// });
	};
	const get_occurrences = async () => {
		const { data: occurrences } = await API.get_occurrences();
		set_product_occurrences(occurrences);
		initialize_occurrence_chart(occurrences);
	};

	const dates_in_year = [
		{ month: 'January', number_of_days: 31 },
		{ month: 'February', number_of_days: 28 },
		{ month: 'March', number_of_days: 31 },
		{ month: 'April', number_of_days: 30 },
		{ month: 'May', number_of_days: 31 },
		{ month: 'June', number_of_days: 30 },
		{ month: 'July', number_of_days: 31 },
		{ month: 'August', number_of_days: 31 },
		{ month: 'September', number_of_days: 30 },
		{ month: 'October', number_of_days: 31 },
		{ month: 'November', number_of_days: 30 },
		{ month: 'December', number_of_days: 31 }
	];

	return (
		<div class="main_container">
			<Helmet>
				<title>Admin Control Panel | Glow LEDs</title>8
			</Helmet>
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</FlexContainer>
			<div className="jc-b">
				<Link to="/secure/glow/orders">
					<button className="button primary">Orders</button>
				</Link>
				<Link to="/secure/glow/products">
					<button className="button primary"> Products</button>
				</Link>
				<Link to="/secure/glow/users">
					<button className="button primary"> Users</button>
				</Link>
				<Link to="/secure/glow/expenses">
					<button className="button primary"> Expenses</button>
				</Link>
				<Link to="/secure/glow/features">
					<button className="button primary"> Features</button>
				</Link>
				<Link to="/secure/glow/sponsors">
					<button className="button primary"> Sponsors</button>
				</Link>
				<Link to="/secure/glow/promos">
					<button className="button primary">Promos</button>
				</Link>
				<Link to="/secure/glow/carts">
					<button className="button primary">Carts</button>
				</Link>
				<Link to="/secure/glow/contents">
					<button className="button primary">Contents</button>
				</Link>
				<Link to="/secure/glow/emails">
					<button className="button primary">Emails</button>
				</Link>
			</div>
			<div className="jc-b">
				{expenses &&
				orders && (
					<div className="order-list responsive_table">
						<h1 className="ta-c w-100per jc-c">Expenses</h1>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Expense</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total Expenses</th>
									<th style={{ padding: '15px' }}>
										${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Income</th>
									<th style={{ padding: '15px' }}>
										${orders
											.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
											.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Taxes Collected</th>
									<th style={{ padding: '15px' }}>
										${orders.reduce((a, order) => a + order.taxPrice, 0).toFixed(2)}
									</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Profit</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) +
											expenses.reduce((a, order) => a + order.amount, 0)).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Days Open</th>
									<th style={{ padding: '15px' }}>{duration_of_opening().toFixed(0)}</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{expenses &&
				orders &&
				weekly_orders &&
				daily_orders &&
				monthly_orders && (
					<div className="order-list responsive_table">
						<h1 className="ta-c w-100per jc-c">Income</h1>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Expense</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Daily Income</th>
									<th style={{ padding: '15px' }}>
										${daily_orders &&
											daily_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Weekly Income</th>
									<th style={{ padding: '15px' }}>
										${weekly_orders &&
											weekly_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Monthly Income</th>
									<th style={{ padding: '15px' }}>
										${monthly_orders &&
											monthly_orders
												.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
												.toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Daily Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											duration_of_opening()).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Weekly Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											(duration_of_opening() / 7)).toFixed(2)}
									</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Average Monthly Income</th>
									<th style={{ padding: '15px' }}>
										${(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) /
											(duration_of_opening() / 30)).toFixed(2)}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{expenses &&
				orders &&
				products &&
				users && (
					<div className="order-list responsive_table">
						<h1 className="ta-c w-100per jc-c">Metrics</h1>
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Count</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total Products</th>
									<th style={{ padding: '15px' }}>{products.length}</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Orders</th>
									<th style={{ padding: '15px' }}>{orders.length}</th>
								</tr>

								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Users</th>
									<th style={{ padding: '15px' }}>{users.length}</th>
								</tr>
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
								>
									<th style={{ padding: '15px' }}>Total Expenses</th>
									<th style={{ padding: '15px' }}>{expenses.length}</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				{orders &&
				promos &&
				sponsors && (
					<div className="order-list responsive_table">
						<h1 className="ta-c w-100per jc-c">Sponsor Revenue</h1>
						<table className="table">
							<thead>
								<tr>
									<th>Sponsor</th>
									<th>Number of Uses</th>
									<th>Revenue</th>
								</tr>
							</thead>
							<tbody>
								{sponsors.map((sponsor) => {
									return (
										<tr
											style={{
												backgroundColor: '#626262',
												fontSize: '1.4rem',
												height: '50px'
											}}
											className=""
										>
											<th style={{ padding: '15px' }}>{sponsor.glover_name}</th>
											<th style={{ padding: '15px' }}>
												{
													orders.filter((order) => {
														return order.promo_code === sponsor.glover_name;
													}).length
												}
											</th>
											<th style={{ padding: '15px' }}>
												${orders
													.filter((order) => order.promo_code === sponsor.glover_name)
													.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
													.toFixed(2)}
											</th>
										</tr>
									);
								})}
								<tr
									style={{
										backgroundColor: '#626262',
										fontSize: '1.4rem',
										height: '50px'
									}}
									className=""
								>
									<th style={{ padding: '15px' }}>Total</th>
									<th style={{ padding: '15px' }}>
										{
											orders.filter((order) => {
												return sponsors
													.map((sponsor) => sponsor.glover_name)
													.includes(order.promo_code);
											}).length
										}
									</th>
									<th style={{ padding: '15px' }}>
										${orders
											.filter((order) =>
												sponsors
													.map((sponsor) => sponsor.glover_name)
													.includes(order.promo_code)
											)
											.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
											.toFixed(2)}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			<h1 className="ta-c w-100per jc-c">Occurrences</h1>
			<canvas id="expense_chart" ref={chartRef} />
			{product_occurrences && (
				<div className="order-list responsive_table">
					<table className="table">
						<thead>
							<tr>
								<th>Category</th>
								<th>Number of Occurrences</th>
							</tr>
						</thead>
						<tbody>
							{product_occurrences.map((item, index) => {
								return (
									<tr
										key={index}
										style={{
											backgroundColor: '#626262',
											fontSize: '1.4rem',
											height: '50px'
										}}
										className=""
									>
										<th style={{ padding: '15px' }}>{item.name}</th>
										<th style={{ padding: '15px' }}>{item.occurrence}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			{orders && (
				<div className="order-list responsive_table">
					<table className="table">
						<thead>
							<tr>
								<th>Category</th>
								<th>Number of Occurrences</th>
							</tr>
						</thead>
						<tbody>
							{dates_in_year.map((month, month_number) => {
								return [ ...Array(month.number_of_days).keys() ].map((day, index) => {
									return (
										<tr
											key={index}
											style={{
												backgroundColor: '#626262',
												fontSize: '1.4rem',
												height: '50px'
											}}
											className=""
										>
											<th style={{ padding: '15px' }}>
												{month_number + 1 < 10 ? `0${month_number + 1}` : month_number + 1}/{day + 1}/2020
											</th>
											<th style={{ padding: '15px' }}>
												{unformat_date(
													`${month_number + 1 < 10
														? `0${month_number + 1}`
														: month_number + 1}/${day + 1}/2020`
												)}
											</th>
										</tr>
									);
								});
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
export default ControlPanelPage;
