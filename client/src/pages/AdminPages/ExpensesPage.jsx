import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listExpenses, deleteExpense } from '../../actions/expenseActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

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
				{/* <Link to="/editexpense">
					<button className="button primary" style={{ width: '160px' }}>
						Create Expense
					</button>
				</Link> */}
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{expenses && (
					<div className="expense-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Hidden</th>
									<th>Name</th>
									<th>Price</th>
									<th>Category</th>
									<th>Brand</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{/* {expenses.map((expense) => (
									<tr
										key={expense._id}
										style={{ backgroundColor: expense.hidden ? colors.hidden : '#626262' }}
									>
										<td>{expense._id}</td>
										<td>
											{expense.hidden ? (
												<i className="fas fa-eye-slash" />
											) : (
												<i className="fas fa-eye" />
											)}
										</td>
										<td style={{ minWidth: '420px' }}>{expense.name}</td>
										<td style={{ minWidth: '225px' }}>{sale_price_switch(expense)}</td>
										<td>{expense.category}</td>
										<td style={{ minWidth: '111px' }}>{expense.brand}</td>
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
								))} */}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default ExpensesPage;
