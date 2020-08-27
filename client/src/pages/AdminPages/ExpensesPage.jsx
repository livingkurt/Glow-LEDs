import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listExpenses, deleteExpense } from '../../actions/expenseActions';
import { useHistory } from 'react-router-dom';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Search, Sort } from '../../components/SpecialtyComponents/index';
import MetaTags from 'react-meta-tags';
import { format_date_display_expenses } from '../../utils/helper_functions';

const colors = {
	hidden: '#333333'
};

const ExpensesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const history = useHistory();

	const category = props.match.params.category ? props.match.params.category : '';

	const expenseList = useSelector((state) => state.expenseList);
	const { loading, expenses, error } = expenseList;

	const expenseSave = useSelector((state) => state.expenseSave);
	const { success: successSave } = expenseSave;

	const expenseDelete = useSelector((state) => state.expenseDelete);
	const { success: successDelete } = expenseDelete;
	const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		// if (
	// 		// 	[
	// 		// 		'caps',
	// 		// 		'infinity_mirrors',
	// 		// 		'accessories',
	// 		// 		'frosted_diffusers',
	// 		// 		'diffuser_adapters',
	// 		// 		'string_lights'
	// 		// 	].includes(category)
	// 		// ) {
	// 			dispatch(listExpenses(category));
	// 		} else {
	// 			// history.push('/collections/all/products');
	// 			dispatch(listExpenses(''));
	// 		}
	// 	},
	// 	[ category ]
	// );

	useEffect(
		() => {
			dispatch(listExpenses(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listExpenses(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listExpenses(category, searchKeyword, e.target.value));
	};

	// useEffect(() => {
	// 	dispatch(listExpenses());
	// 	return () => {
	// 		//
	// 	};
	// }, []);
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

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (expense) => {
		let result = '';
		if (expense.category === 'Supplies') {
			result = colors[0].color;
		}
		if (expense.category === 'Website') {
			result = colors[1].color;
		}
		if (expense.category === 'Shipping') {
			result = colors[2].color;
		}
		if (expense.category === 'Business') {
			result = colors[3].color;
		}
		if (expense.category === 'Equipment') {
			result = colors[4].color;
		}
		// console.log(result);
		return result;
	};

	// const sort_options = [ 'All Expenses', 'Supplies', 'Website', 'Shipping', 'Business', 'Equipment' ];
	// const sort_options = [ 'All Expenses', 'Supplies', 'Website', 'Shipping', 'Business', 'Equipment' ];
	const sort_options = [ 'Date', 'Category', 'Application', 'Newest', 'Lowest', 'Highest' ];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Expenses | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{colors.map((color) => {
						return (
							<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</FlexContainer>
						);
					})}
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
			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{expenses && (
					<div className="expense-list responsive_table">
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
											${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}
										</label>
									</td>
									<td>
										<label>
											${expenses
												.filter((expense) => expense.category === 'Supplies')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td>
										<label>
											${expenses
												.filter((expense) => expense.category === 'Website')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td>
										<label>
											${expenses
												.filter((expense) => expense.category === 'Shipping')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td>
										<label>
											${expenses
												.filter((expense) => expense.category === 'Business')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
								</tr>
							</tbody>
						</table>
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
											backgroundColor: determine_color(expense),
											fontSize: '1.4rem'
										}}
									>
										<td>{expense._id}</td>
										<td style={{ minWidth: '300px' }}>{expense.expense_name}</td>
										<td>{format_date_display_expenses(expense.date_of_purchase)}</td>
										<td>{expense.category}</td>
										<td>${expense.amount ? expense.amount.toFixed(2) : expense.amount}</td>
										<td>{expense.card}</td>
										<td style={{ minWidth: '150px' }}>{expense.place_of_purchase}</td>
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
