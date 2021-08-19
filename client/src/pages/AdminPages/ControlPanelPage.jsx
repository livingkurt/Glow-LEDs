import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';
import { hslToHex } from '../../utils/helper_functions';
import { API_Revenue, API_Products, API_Orders } from '../../utils';
import { listAffiliates } from '../../actions/affiliateActions';
import { listPromos } from '../../actions/promoActions';
import { Helmet } from 'react-helmet';
import { Bar } from 'react-chartjs-2';

const ControlPanelPage = (props) => {
	const dispatch = useDispatch();

	const expenseList = useSelector((state) => state.expenseList);
	const { expenses } = expenseList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;

	const [ product_occurrences, set_product_occurrences ] = useState([]);
	const [ daily_orders, set_daily_orders ] = useState([]);
	const [ orders, set_orders ] = useState([]);
	const [ weekly_orders, set_weekly_orders ] = useState([]);
	const [ monthly_orders, set_monthly_orders ] = useState([]);
	const [ yesterday_income, set_yesterday_income ] = useState([]);
	const [ monthly_income, set_monthly_income ] = useState([]);
	const [ total_affiliate_revenue, set_total_affiliate_revenue ] = useState([]);
	const [ total_promo_code_usage, set_total_promo_code_usage ] = useState([]);
	const [ yearly_income, set_yearly_income ] = useState([]);

	const [ year_2020, set_year_2020 ] = useState({});
	const [ year_2021, set_year_2021 ] = useState({});
	const [ year_2022, set_year_2022 ] = useState({});
	const [ year_2023, set_year_2023 ] = useState({});
	const [ year_2024, set_year_2024 ] = useState({});
	const [ year_2025, set_year_2025 ] = useState({});
	const [ year_2026, set_year_2026 ] = useState({});
	const [ year_2027, set_year_2027 ] = useState({});
	const [ year_2028, set_year_2028 ] = useState({});
	const [ year_2029, set_year_2029 ] = useState({});
	const [ year_2030, set_year_2030 ] = useState({});
	const [ year_2031, set_year_2031 ] = useState({});

	const get_orders = async () => {
		const { data } = await API_Orders.total_orders();
		console.log({ data });
		set_orders(data);
	};

	useEffect(() => {
		// dispatch(listOrders('', '', '', 1, 10));
		get_orders();
		dispatch(listExpenses());
		dispatch(listProducts());
		dispatch(listUsers());
		dispatch(listAffiliates());
		dispatch(listPromos());
		get_income();
	}, []);

	useEffect(
		() => {
			get_occurrences();
			// if (order_data) {
			// 	set_orders(order_data.orders);
			// }

			return () => {};
		},
		[ orders ]
	);

	useEffect(
		() => {
			if (orders && affiliates) {
				get_total();
			}

			return () => {};
		},
		[ affiliates, orders ]
	);

	const get_total = () => {
		const uses = affiliates.map((affiliate) => {
			return orders.filter((order) => {
				return (
					order.promo_code &&
					order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				);
			}).length;
		});
		set_total_promo_code_usage(uses.reduce((a, c) => a + c, 0));
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
	};

	const duration_of_opening = () => {
		const current_date = new Date();
		const start_date = new Date('2020-08-10');
		const difference_in_time = current_date.getTime() - start_date.getTime();
		const difference_in_day = difference_in_time / (1000 * 3600 * 24);
		return difference_in_day;
	};

	const get_occurrences = async () => {
		const { data: occurrences } = await API_Products.get_occurrences();
		set_product_occurrences(occurrences);
		// initialize_occurrence_chart(occurrences);
	};

	const get_income = async () => {
		const { data: daily } = await API_Revenue.get_yesterday_income();
		set_daily_orders(daily);
		const { data: weekly } = await API_Revenue.get_last_week_income();
		set_weekly_orders(weekly);
		const { data: monthly } = await API_Revenue.get_last_month_income();
		set_monthly_orders(monthly);
	};

	const multiplier = 360 / product_occurrences.filter((product) => product.occurrence > 10).length;

	let num = -multiplier;
	const data = {
		labels: product_occurrences.filter((product) => product.occurrence > 10).map((product) => product.name),
		datasets: [
			{
				label: 'Product',
				data: product_occurrences
					.filter((product) => product.occurrence > 1)
					.map((product) => product.occurrence),
				fill: true,
				borderColor: '#3e4c6d',
				// backgroundColor: '#333333',
				// backgroundColor: [ 'red', 'blue', 'green', 'blue', 'red', 'blue' ],
				backgroundColor: product_occurrences.map((item) => {
					num += multiplier;
					let color = hslToHex(num, 100, 50);
					// return `hsl(${num}, 50%, 100%)`;
					return color;
				}),
				color: 'white'
			}
		]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		fontColor: '#000000'
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Control Panel | Glow LEDs</title>8
			</Helmet>

			<div className="jc-b">
				<Link to="/secure/glow/controlpanel/monthly_expenes/2020">
					<button className="btn primary">2020 Monthly Expenses</button>
				</Link>
				<Link to="/secure/glow/controlpanel/monthly_expenes/2021">
					<button className="btn primary">2021 Monthly Expenses</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</div>
			<div className="jc-b">
				<div>
					<h2>Total Income</h2>
					<div className="fs-30px">
						${orders && orders.length > 0 ? (
							orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0).toFixed(2)
						) : (
							'0.00'
						)}
					</div>
				</div>
				<div>
					<h2>Total Expenses</h2>
					<div className="fs-30px">
						${expenses && expenses.length > 0 ? (
							expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)
						) : (
							'0.00'
						)}
					</div>
				</div>
				<div>
					<h2>Total Profit</h2>
					<div className="fs-30px">
						${orders && orders.length > 0 && expenses && expenses.length > 0 ? (
							(orders.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0) +
								expenses.reduce((a, expense) => a + expense.amount, 0)).toFixed(2)
						) : (
							'0.00'
						)}
					</div>
				</div>
				<div>
					<h2>Total Taxes</h2>
					<div className="fs-30px">
						${orders && orders.length > 0 && expenses && expenses.length > 0 ? (
							orders.reduce((a, order) => a + order.taxPrice, 0).toFixed(2)
						) : (
							'0.00'
						)}
					</div>
				</div>
				<div>
					<h2>Total Days Open</h2>
					<div className="fs-30px">{duration_of_opening().toFixed(0)}</div>
				</div>
			</div>
			<div className="jc-b">
				{expenses &&
				orders &&
				weekly_orders &&
				daily_orders &&
				monthly_orders && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Income</h2>
						<table className="styled-table">
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
									<th style={{ padding: '15px' }}>Yesterdays Income</th>
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
									<th style={{ padding: '15px' }}>Last Weeks Income</th>
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
									<th style={{ padding: '15px' }}>Last Month Income</th>
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
						<h2 className="ta-c w-100per jc-c">Metrics</h2>
						<table className="styled-table">
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
				{console.log({ orders })}
				{orders &&
				promos &&
				affiliates && (
					<div className="order-list responsive_table">
						<h2 className="ta-c w-100per jc-c">Affiliate Revenue</h2>
						<table className="styled-table">
							<thead>
								<tr>
									<th>Affiliate</th>
									<th>Number of Uses</th>
									<th>Revenue</th>
								</tr>
							</thead>
							<tbody>
								{affiliates.map((affiliate) => {
									return (
										<tr
											style={{
												backgroundColor: '#626262',
												fontSize: '1.4rem',
												height: '50px'
											}}
											className=""
										>
											<th style={{ padding: '15px' }}>{affiliate.public_code.promo_code}</th>
											<th style={{ padding: '15px' }}>
												{
													orders.filter((order) => {
														return (
															order.promo_code &&
															order.promo_code.toLowerCase() ===
																affiliate.public_code.promo_code.toLowerCase()
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
																affiliate.public_code.promo_code.toLowerCase()
													)
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
										{/* {
											orders.filter((order) => {
												return affiliates
													.map((affiliate) => affiliate.artist_name)
													.includes(order.promo_code);
											}).length
										} */}

										{total_promo_code_usage}
									</th>
									<th style={{ padding: '15px' }}>
										${total_affiliate_revenue > 0 && total_affiliate_revenue.toFixed(2)}
										{/* ${orders
											.filter((order) =>
												affiliates
													.map((affiliate) => affiliate.artist_name)
													.includes(order.promo_code)
											)
											.reduce((a, order) => a + order.totalPrice - order.taxPrice, 0)
											.toFixed(2)} */}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
			<h2 className="ta-c w-100per jc-c">Product Occurences</h2>
			<div style={{ backgroundColor: 'white' }} className="p-1rem br-10px">
				<Bar data={data} options={options} />
			</div>
			{/* <canvas id="occurrence_chart" ref={occurrence_chart_ref} /> */}
			{/* {product_occurrences && (
				<div className="order-list responsive_table">
					<table className="styled-table">
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
			)} */}
			<h2 className="ta-c w-100per jc-c">Monthly Income</h2>
			{/* <canvas id="monthly_income_chart" ref={monthly_income_chart_ref} /> */}
			{monthly_income.length > 1 && (
				<div className="order-list responsive_table">
					<table className="styled-table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Daily Income</th>
							</tr>
						</thead>
						<tbody>
							{monthly_income.map((month, index) => {
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
										<th style={{ padding: '15px' }}>{month.month}</th>
										<th style={{ padding: '15px' }}>${month.income.toFixed(2)}</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
export default ControlPanelPage;
