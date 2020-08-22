import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listExpenses, deleteExpense } from '../../actions/expenseActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date_display } from '../../utils/helper_functions';

const colors = {
	hidden: '#333333'
};

const ExpensesPage = (props) => {
	const expenseList = useSelector((state) => state.expenseList);
	const { loading, expenses, error } = expenseList;

	const expenseSave = useSelector((state) => state.expenseSave);
	const { success: successSave } = expenseSave;

	const expenseDelete = useSelector((state) => state.expenseDelete);
	const { success: successDelete } = expenseDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listExpenses());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (expense) => {
		dispatch(deleteExpense(expense._id));
	};

	const sale_price_switch = (expense) => {
		if (expense.sale_price !== 0) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white' }}>
							${expense.price ? expense.price.toFixed(2) : expense.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" /> ${expense.sale_price ? (
						expense.sale_price.toFixed(2)
					) : (
						expense.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (!expense.countInStock) {
			return (
				<label>
					<del style={{ color: 'red' }}>
						<label style={{ color: 'white', marginRight: '7px' }}>
							${expense.price ? expense.price.toFixed(2) : expense.price}
						</label>
					</del>{' '}
					<i class="fas fa-arrow-right" />
					<label style={{ marginLeft: '7px' }}>Sold Out</label>
				</label>
			);
		} else {
			return <label>${expense.price ? expense.price.toFixed(2) : expense.price}</label>;
		}
	};

	const decide_total = () => {};

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Expenses | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
					<label style={{ marginRight: '1rem' }}>Hidden</label>
					<div style={{ backgroundColor: '#333333', height: '20px', width: '60px', borderRadius: '5px' }} />
				</FlexContainer>
				<Link to="/secure/glow/editexpense">
					<button className="button primary" style={{ width: '160px' }}>
						Create Expense
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Expenses</h1>
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{expenses && (
					<div className="expense-list responsive_table">
						<FlexContainer wrap h_between>
							{/* <label>Total: ${expenses.reduce((expense, c) => expense + c.amount, 0).toFixed(2)}</label>
							<label>
								Total Shipping: ${expenses
									.filter((expense) => expense.category === 'Shipping')
									.reduce((expense, c) => expense + c.amount, 0)
									.toFixed(2)}
							</label>
							<label>
								Total Supplies: ${expenses
									.filter((expense) => expense.category === 'Supplies')
									.reduce((expense, c) => expense + c.amount, 0)
									.toFixed(2)}
							</label>
							<label>
								Total Business: ${expenses
									.filter((expense) => expense.category === 'Business')
									.reduce((expense, c) => expense + c.amount, 0)
									.toFixed(2)}
							</label>
							<label>
								Total Website: ${expenses
									.filter((expense) => expense.category === 'Website')
									.reduce((expense, c) => expense + c.amount, 0)
									.toFixed(2)}
							</label> */}
							<table className="table">
								<thead>
									<tr>
										<th>Total</th>
										<th>Supplies</th>
										<th>Website</th>
										<th>Shipping</th>
										<th>Business</th>
									</tr>
								</thead>
								<tbody>
									<tr
										// key={expense._id}
										style={{
											backgroundColor: '#626262',
											fontSize: '1.4rem'
										}}
									>
										<td>
											<label>
												${expenses.reduce((expense, c) => expense + c.amount, 0).toFixed(2)}
											</label>
										</td>
										<td>
											<label>
												${expenses
													.filter((expense) => expense.category === 'Supplies')
													.reduce((expense, c) => expense + c.amount, 0)
													.toFixed(2)}
											</label>
										</td>
										<td>
											<label>
												${expenses
													.filter((expense) => expense.category === 'Website')
													.reduce((expense, c) => expense + c.amount, 0)
													.toFixed(2)}
											</label>
										</td>
										<td>
											<label>
												${expenses
													.filter((expense) => expense.category === 'Shipping')
													.reduce((expense, c) => expense + c.amount, 0)
													.toFixed(2)}
											</label>
										</td>
										<td>
											<label>
												${expenses
													.filter((expense) => expense.category === 'Business')
													.reduce((expense, c) => expense + c.amount, 0)
													.toFixed(2)}
											</label>
										</td>
									</tr>
								</tbody>
							</table>
						</FlexContainer>
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>expense name</th>
									<th>date</th>
									<th>category</th>
									<th>amount</th>
									<th>card</th>
									<th>place</th>
									<th>application</th>
									<th>url</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{expenses.map((expense) => (
									<tr
										key={expense._id}
										style={{
											backgroundColor: expense.hidden ? colors.hidden : '#626262',
											fontSize: '1.4rem'
										}}
									>
										<td>{expense._id}</td>
										<td style={{ minWidth: '300px' }}>{expense.expense_name}</td>
										<td>{format_date_display(expense.date_of_purchase)}</td>
										<td>{expense.category}</td>
										<td>${expense.amount ? expense.amount.toFixed(2) : expense.amount}</td>
										<td>{expense.card}</td>
										<td>{expense.place_of_purchase}</td>
										<td style={{ minWidth: '200px' }}>{expense.application}</td>
										<td style={{ minWidth: '800px' }}>{expense.url}</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editexpense/' + expense._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(expense)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default ExpensesPage;
