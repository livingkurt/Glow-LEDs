import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { listOrders } from '../../actions/orderActions';
import { listExpenses } from '../../actions/expenseActions';
import { listUsers } from '../../actions/userActions';

const colors = {
	hidden: '#333333'
};

const ControlPanelPage = (props) => {
	const dispatch = useDispatch();
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

	return (
		<div class="main_container">
			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Control Panel</h1>
			</FlexContainer>
			{expenses &&
			orders && (
				<div className="order-list responsive_table">
					<table className="table" style={{ width: '50%' }}>
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
					<table className="table" style={{ width: '50%' }}>
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
		</div>
	);
};
export default ControlPanelPage;
