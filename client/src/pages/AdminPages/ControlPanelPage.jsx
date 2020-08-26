import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { listOrders } from '../../actions/orderActions';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';
// import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import { occurrence, hslToHex } from '../../utils/helper_functions';
import API from '../../utils/API';

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

	const [ product_occurances, set_product_occurances ] = useState([]);

	useEffect(() => {
		dispatch(listOrders());
		dispatch(listExpenses());
		dispatch(listProducts());
		dispatch(listUsers());
	}, []);

	useEffect(
		() => {
			// initialize_chart();
			return () => {};
		},
		[ expenses ]
	);
	useEffect(
		() => {
			// initialize_chart();
			get_product_names();
			return () => {};
		},
		[ orders ]
	);

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

	const initialize_occurance_chart = (occurrences) => {
		const expense_chartRef = chartRef.current.getContext('2d');
		const multiplier = 360 / occurrences.length;

		let num = 0;
		console.log(
			occurrences.map((item) => {
				num += multiplier;
				// return `hsl(${num}, 100%, 50%)`;
				let color = hslToHex(num, 100, 50);
				return color;
			})
		);
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
	const get_product_names = async () => {
		const array_of_ids = Object.keys(occurrence(orders));
		const { data: names } = await API.get_product_names(array_of_ids);
		let occurrences = [];
		for (let i = 0; i < names.length; i++) {
			Object.keys(occurrence(orders)).map((item) => {
				if (item === names[i]._id) {
					occurrences = [
						...occurrences,
						{ name: names[i].name, occurrence: occurrence(orders)[names[i]._id].length }
					];
				}
			});
		}
		console.log(occurrences);
		// occurrences.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
		console.log(occurrences.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1)));
		set_product_occurances(occurrences);
		initialize_occurance_chart(occurrences);
	};
	return (
		<div class="main_container">
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</FlexContainer>
			<FlexContainer>
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
										${orders.reduce((a, order) => a + order.totalPrice, 0).toFixed(2)}
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
										${(orders.reduce((a, expense) => a + expense.totalPrice, 0) -
											expenses.reduce((a, order) => a + order.amount, 0)).toFixed(2)}
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
			</FlexContainer>
			<h1 className="ta-c w-100per jc-c">Occurrences</h1>
			<canvas id="expense_chart" ref={chartRef} />
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
							{product_occurances.map((item, index) => {
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
			{/* <canvas id="expense_doughnut" ref={expense_doughnut_ref} /> */}
		</div>
	);
};
export default ControlPanelPage;
