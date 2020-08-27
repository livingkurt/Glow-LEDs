import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveExpense, detailsExpense, listExpenses } from '../../actions/expenseActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date_display, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditExpensePage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ expense_name, set_expense_name ] = useState('');
	const [ application, set_application ] = useState('');
	const [ url, set_url ] = useState('');
	const [ place_of_purchase, set_place_of_purchase ] = useState('');
	const [ date_of_purchase, set_date_of_purchase ] = useState('');
	const [ category, set_category ] = useState('');
	const [ card, set_card ] = useState('');
	const [ amount, set_amount ] = useState('');
	const [ loading_data, set_loading_data ] = useState(true);

	const history = useHistory();

	const expenseDetails = useSelector((state) => state.expenseDetails);
	const { expense, loading, error } = expenseDetails;

	const expenseSave = useSelector((state) => state.expenseSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = expenseSave;

	const expenseDelete = useSelector((state) => state.expenseDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = expenseDelete;

	// const expenseReviewDelete = useSelector((state) => state.expenseReviewDelete);
	// const { success: expenseDeleteSuccess } = expenseReviewDelete;
	const expenseList = useSelector((state) => state.expenseList);
	const { expenses } = expenseList;

	const dispatch = useDispatch();
	const expense_id = props.match.params.id ? props.match.params.id : '';

	console.log({ expense });

	// console.log({ ID: props.match.params.id })

	// useEffect(() => {
	// 	// dispatch(detailsExpense(expense_id));
	// 	dispatch(listExpenses());
	// 	if (expense) {
	// 		// console.log({ expense })
	// 		set_id(expense._id);
	// 		set_expense_name(expense.expense_name);
	// 		set_application(expense.application);
	// 		set_url(expense.url);
	// 		set_place_of_purchase(expense.place_of_purchase);
	// 		set_date_of_purchase(format_date_display(expense.date_of_purchase));
	// 		set_category(expense.category);
	// 		set_card(expense.card);
	// 		set_amount(expense.amount);
	// 	} else {
	// 		set_id('');
	// 		set_expense_name('');
	// 		set_application('');
	// 		set_url('');
	// 		set_place_of_purchase('');
	// 		set_date_of_purchase('');
	// 		set_category('');
	// 		set_card('');
	// 		set_amount('');
	// 	}
	// 	return () => {};
	// }, []);

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsExpense(props.match.params.id));
			dispatch(detailsExpense(props.match.params.id));
		} else {
			dispatch(detailsExpense(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (expense) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ expense ]
	);

	const set_state = () => {
		set_id(expense._id);
		set_expense_name(expense.expense_name);
		set_application(expense.application);
		set_url(expense.url);
		set_place_of_purchase(expense.place_of_purchase);
		set_date_of_purchase(format_date_display(expense.date_of_purchase));
		set_category(expense.category);
		set_card(expense.card);
		set_amount(expense.amount);
	};
	const unset_state = () => {
		set_id('');
		set_expense_name('');
		set_application('');
		set_url('');
		set_place_of_purchase('');
		set_date_of_purchase('');
		set_category('');
		set_card('');
		set_amount('');
	};

	// useEffect(
	// 	() => {
	// 		set_id(expense._id);
	// 		set_expense_name(expense.expense_name);
	// 		set_application(expense.application);
	// 		set_url(expense.url);
	// 		set_place_of_purchase(expense.place_of_purchase);
	// 		set_date_of_purchase(format_date_display(expense.date_of_purchase));
	// 		set_category(expense.category);
	// 		set_card(expense.card);
	// 		set_amount(expense.amount);
	// 		return () => {
	// 			//
	// 		};
	// 	},
	// 	[ successSave, successDelete ]
	// );

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(unformat_date(date_of_purchase));
		console.log(date_of_purchase);
		// console.log({ id });
		dispatch(
			saveExpense({
				_id: id,
				expense_name,
				application,
				url,
				place_of_purchase,
				date_of_purchase: unformat_date(date_of_purchase),
				category,
				card,
				amount
			})
		);
		e.target.reset();
		set_id('');
		set_expense_name('');
		set_application('');
		set_url('');
		set_place_of_purchase('');
		set_date_of_purchase('');
		set_category('');
		set_card('');
		set_amount('');
		// if (id) {
		// 	history.push('/collections/all/expenses/' + id);
		// } else {
		history.push('/secure/glow/expenses');
		// }
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Expense' : 'Create Expense'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{expense && (
							<div>
								<MetaTags>
									<title>Edit {expense.name} | Glow LEDs</title>
								</MetaTags>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Expense' : expense.name}
									</h1>

									<FlexContainer row wrap>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="expense_name">Expense</label>
												<input
													type="text"
													name="expense_name"
													value={expense_name}
													id="expense_name"
													onChange={(e) => set_expense_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="application">Application</label>
												<input
													type="text"
													name="application"
													value={application}
													id="application"
													onChange={(e) => set_application(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="url">URL</label>
												<input
													type="text"
													name="url"
													value={url}
													id="url"
													onChange={(e) => set_url(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="category">Category</label>
												<input
													type="text"
													name="category"
													value={category}
													id="category"
													onChange={(e) => set_category(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="place_of_purchase">Place of Purchase</label>
												<input
													type="text"
													name="place_of_purchase"
													value={place_of_purchase}
													id="place_of_purchase"
													onChange={(e) => set_place_of_purchase(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="date_of_purchase">Date of Purchase</label>
												<input
													type="text"
													name="date_of_purchase"
													value={date_of_purchase}
													id="date_of_purchase"
													onChange={(e) => set_date_of_purchase(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="card">Card</label>
												<input
													type="text"
													name="card"
													value={card}
													id="card"
													onChange={(e) => set_card(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="amount">Amount</label>
												<input
													type="text"
													name="amount"
													value={amount}
													id="amount"
													onChange={(e) => set_amount(e.target.value)}
												/>
											</li>
										</FlexContainer>
									</FlexContainer>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/expenses">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Expense
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/expenses">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Expenses
												</button>
											</Link>
										)}
									</li>
									{/* <li> */}
									{/* {expense.reviews.map((review) => {
									return (
										<li
											key={review._id}
											style={{
												listStyleType: 'none',
												background: '#616161',
												padding: '5px',
												borderRadius: '15px',
												boxShadow:
													'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
											}}
										>
											<div>
												<div>{review.name}</div>
												<div>
													<Rating value={review.rating} />
												</div>
												<div>{format_date_display(review.createdAt.substring(0, 10))}</div>
												<div>{review.comment}</div>
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
													onClick={() => delete_review(review._id)}
												>
													X
												</button>
											</div>
										</li>
									);
								})} */}
									{/* </li> */}
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditExpensePage;
