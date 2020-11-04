import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listExpenses, deleteExpense } from '../../actions/expenseActions';
import { useHistory } from 'react-router-dom';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Search, Sort } from '../../components/SpecialtyComponents/index';
import { Helmet } from 'react-helmet';
import { format_date, unformat_date } from '../../utils/helper_functions';
import API from '../../utils/API';
import CSVReader from 'react-csv-reader';

const colors = {
	hidden: '#333333'
};

const ExpensesPage = (props) => {
	// const user_data = props.userinfo;
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ card_type, set_card_type ] = useState('GL AMEX');
	const history = useHistory();

	const category = props.match.params.category ? props.match.params.category : '';

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const expenseList = useSelector((state) => state.expenseList);
	const { loading, expenses, error } = expenseList;

	const expenseSave = useSelector((state) => state.expenseSave);
	const { success: successSave } = expenseSave;

	const expenseDelete = useSelector((state) => state.expenseDelete);
	const { success: successDelete } = expenseDelete;
	const dispatch = useDispatch();

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

	const sort_options = [ 'Date', 'Category', 'Application', 'Newest', 'Lowest', 'Highest' ];

	const handle_csv_expenses = async (data, fileInfo, properties, card) => {
		// const properties = [ 'date', 'receipt', 'place', 'amount' ];
		const expenses = [];
		for (let line = 1; line < data.length; line++) {
			const object = {};
			for (let i = 0; i < data[line].length; i++) {
				object[properties[i]] = data[line][i];
			}
			expenses.push(object);
		}
		expenses.forEach(async (expense) => {
			// console.log({ date: unformat_date(expense.date) });
			expense = { ...expense, date: unformat_date(expense.date) };
			console.log({ expense });
			const post_expense = await API.post_expense(expense, userInfo, card);
			console.log({ post_expense });
		});
		// expenses.forEach((expense) => {
		// console.log({ expense: expenses[0] });

		// const expense = { ...expenses[0], date: unformat_date(expenses[0].date) };
		// console.log({ expense });
		// const post_expense = await API.post_expense(expense, userInfo);
		// console.log({ post_expense });
		// });
		console.log({ expenses });
		dispatch(listExpenses(category, searchKeyword, sortOrder));
	};
	// const handle_chase_csv_expenses = async (data, fileInfo) => {
	// 	const properties = [ 'date', 'post_date', 'place', 'category', 'type', 'amount' ];
	// 	const expenses = [];
	// 	for (let line = 1; line < data.length; line++) {
	// 		const object = {};
	// 		for (let i = 0; i < data[line].length; i++) {
	// 			object[properties[i]] = data[line][i];
	// 		}
	// 		expenses.push(object);
	// 	}
	// 	expenses.forEach(async (expense) => {
	// 		// console.log({ date: unformat_date(expense.date) });
	// 		expense = { ...expense, date: unformat_date(expense.date) };
	// 		console.log({ expense });
	// 		const post_expense = await API.post_expense(expense, userInfo);
	// 		console.log({ post_expense });
	// 	});
	// 	console.log({ expenses });
	// 	dispatch(listExpenses(category, searchKeyword, sortOrder));
	// };
	// const handle_fidelity_csv_expenses = async (data, fileInfo) => {
	// 	const properties = [ 'date', 'transaction', 'place', 'memo', 'amount' ];
	// 	const expenses = [];
	// 	for (let line = 1; line < data.length; line++) {
	// 		const object = {};
	// 		for (let i = 0; i < data[line].length; i++) {
	// 			object[properties[i]] = data[line][i];
	// 		}
	// 		expenses.push(object);
	// 	}
	// 	expenses.forEach(async (expense) => {
	// 		// console.log({ date: unformat_date(expense.date) });
	// 		expense = { ...expense, date: unformat_date(expense.date) };
	// 		console.log({ expense });
	// 		const post_expense = await API.post_expense(expense, userInfo);
	// 		console.log({ post_expense });
	// 	});
	// 	// expenses.forEach((expense) => {
	// 	// console.log({ expense: expenses[0] });

	// 	// const expense = { ...expenses[0], date: unformat_date(expenses[0].date) };
	// 	// console.log({ expense });
	// 	// const post_expense = await API.post_expense(expense, userInfo);
	// 	// console.log({ post_expense });
	// 	// });
	// 	console.log({ expenses });
	// 	dispatch(listExpenses(category, searchKeyword, sortOrder));
	// };

	const card_types = [ 'FID', 'GL AMEX', 'AMZNK' ];

	const determine_card_type = (data, fileInfo) => {
		let properties = [];
		switch (card_type) {
			case 'FID':
				properties = [ 'date', 'transaction', 'place', 'memo', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'FID');
			case 'GL AMEX':
				properties = [ 'date', 'receipt', 'place', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'GL AMEX');
			case 'AMZNK':
				properties = [ 'date', 'post_date', 'place', 'category', 'type', 'amount' ];
				return handle_csv_expenses(data, fileInfo, properties, 'AMZNK');
		}
	};

	return (
		<div className="main_container">
			<Helmet>
				<title>Admin Expenses | Glow LEDs</title>
			</Helmet>

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
			<div className="ai-c w-325px jc-b">
				<div className="">
					<div className="custom-select">
						<select
							className="qty_select_dropdown"
							onChange={(e) => set_card_type(e.target.value)}
							value={card_type}
						>
							<option key={1} defaultValue="">
								---Card Type---
							</option>
							{card_types.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
				</div>
				<label className="button primary">
					Upload CSV
					<CSVReader onFileLoaded={(data, fileInfo) => determine_card_type(data, fileInfo)} />
				</label>
			</div>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Expenses</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
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
									<td className="p-10px">
										<label>
											${expenses.reduce((a, expense) => a + expense.amount, 0).toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Supplies')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Website')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
										<label>
											${expenses
												.filter((expense) => expense.category === 'Shipping')
												.reduce((a, expense) => a + expense.amount, 0)
												.toFixed(2)}
										</label>
									</td>
									<td className="p-10px">
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
										<td className="p-10px">{expense._id}</td>
										<td className="p-10px min-w-300px">{expense.expense_name}</td>
										<td className="p-10px">{format_date(expense.date_of_purchase)}</td>
										<td className="p-10px">{expense.category}</td>
										<td className="p-10px">
											${expense.amount ? expense.amount.toFixed(2) : expense.amount}
										</td>
										<td className="p-10px min-w-100px">{expense.card}</td>
										<td className="p-10px min-w-150px">{expense.place_of_purchase}</td>
										<td className="p-10px min-w-200px">{expense.application}</td>
										<td className="p-10px min-w-800px">{expense.url}</td>
										<td className="p-10px">
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
