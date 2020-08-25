import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { listOrders } from '../../actions/orderActions';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';
// import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import { occurrence } from '../../utils/helper_functions';

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

	useEffect(() => {
		dispatch(listOrders());
		dispatch(listExpenses());
		dispatch(listProducts());
		dispatch(listUsers());
	}, []);

	useEffect(
		() => {
			initialize_chart();
			// console.log(occurrence(products));
			return () => {};
		},
		[ expenses ]
	);

	// const month= ["January","February","March","April","May","June","July",
	//           "August","September","October","November","December"];
	const month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

	const initialize_chart = () => {
		const expense_chartRef = chartRef.current.getContext('2d');

		new Chart(expense_chartRef, {
			type: 'line',
			data: {
				//Bring in data
				labels: expenses.map((expense) => expense.expense_name),
				datasets: [
					{
						label: 'Sales',
						data: expenses.map((expense) => expense.amount),
						fill: true,
						borderColor: 'black'
					}
				]
			},
			options: {
				// // Responsive Design
				// responsive: true,
				// maintainAspectRatio: false
				// // Customize the Layout
				// layout: {
				// 	padding: {
				// 		top: 5,
				// 		left: 15,
				// 		right: 15,
				// 		bottom: 15
				// 	}
				// }
			}
			// // Removing Data Ticks, Graph Lines, and Borders
			// scales: {
			// 	xAxes: [
			// 		{
			// 			ticks: { display: false },
			// 			gridLines: {
			// 				display: false,
			// 				drawBorder: false
			// 			}
			// 		}
			// 	],
			// 	yAxes: [
			// 		{
			// 			ticks: { display: false },
			// 			gridLines: {
			// 				display: false,
			// 				drawBorder: false
			// 			}
			// 		}
			// 	]
			// }
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
	return (
		<div class="main_container">
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</FlexContainer>
			<FlexContainer>
				{expenses &&
				orders && (
					<div className="order-list responsive_table">
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
				{/* {products && (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Category</th>
									<th>Number of Occurances</th>
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
				)} */}
			</FlexContainer>
			<canvas id="expense_chart" ref={chartRef} />
			<canvas id="expense_doughnut" ref={expense_doughnut_ref} />
		</div>
	);
};
export default ControlPanelPage;
