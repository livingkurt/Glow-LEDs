import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSurvey, detailsSurvey } from '../../actions/surveyActions';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { listOrders } from '../../actions/orderActions';
import { format_date, snake_case, unformat_date } from '../../utils/helper_functions';

const EditSurveyPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ question_1, set_question_1 ] = useState('');
	const [ question_2, set_question_2 ] = useState('');
	const [ question_3, set_question_3 ] = useState('');
	const [ question_4, set_question_4 ] = useState('');
	const [ question_5, set_question_5 ] = useState('');
	const [ answer_1, set_answer_1 ] = useState('');
	const [ answer_2, set_answer_2 ] = useState('');
	const [ answer_3, set_answer_3 ] = useState('');
	const [ answer_4, set_answer_4 ] = useState('');
	const [ answer_5, set_answer_5 ] = useState('');
	const [ user, set_user ] = useState('');
	const [ survey_questions, set_survey_questions ] = useState('');
	const [ order, set_order ] = useState('');
	const [ is_survey, set_is_survey ] = useState('');
	const [ active, set_active ] = useState('');
	const [ rating, set_rating ] = useState(null);

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const surveyDetails = useSelector((state) => state.surveyDetails);
	const { survey, loading, error } = surveyDetails;

	const userList = useSelector((state) => state.userList);
	const { loading: loading_users, users, error: error_users } = userList;

	const orderList = useSelector((state) => state.orderList);
	const { orders, loading: loading_orders, error: error_orders } = orderList;
	console.log({ orders });

	const set_state = () => {
		set_id(survey._id);
		set_question_1(survey.question_1);
		set_question_2(survey.question_2);
		set_question_3(survey.question_3);
		set_question_4(survey.question_4);
		set_question_5(survey.question_5);
		set_answer_1(survey.answer_1);
		set_answer_2(survey.answer_2);
		set_answer_3(survey.answer_3);
		set_answer_4(survey.answer_4);
		set_answer_5(survey.answer_5);
		set_user(survey.user);
		set_order(survey.order);
		set_is_survey(survey.is_survey);
		set_active(survey.active);
		set_rating(survey.rating);
	};
	const unset_state = () => {
		set_question_1('');
		set_question_2('');
		set_question_3('');
		set_question_4('');
		set_question_5('');
		set_answer_1('');
		set_answer_2('');
		set_answer_3('');
		set_answer_4('');
		set_answer_5('');
		set_user('');
		set_order('');
		set_is_survey('');
		set_active('');
		set_rating('');
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);
	const stable_set_state = useCallback(set_state, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsSurvey(props.match.params.id));
				stableDispatch(detailsSurvey(props.match.params.id));
			} else {
				stableDispatch(detailsSurvey(''));
			}
			stableDispatch(listUsers(''));
			stableDispatch(listOrders(''));
			stable_set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id, stable_set_state ]
	);

	useEffect(
		() => {
			if (survey) {
				console.log('Set');
				stable_set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ survey ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveSurvey({
				_id: id,
				question_1,
				question_2,
				question_3,
				question_4,
				question_5,
				answer_1,
				answer_2,
				answer_3,
				answer_4,
				answer_5,
				user,
				order,
				rating,
				is_survey,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/surveys');
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Survey' : 'Create Survey'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{/* {survey && ( */}
						<div>
							<Helmet>
								<title>Edit Survey | Glow LEDs</title>
							</Helmet>

							<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
								<div className="row wrap">
									<div className="column w-228px m-10px">
										{/* {users && (
											<div className="ai-c h-25px mv-10px mb-30px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"
														onChange={(e) => set_user(e.target.value)}
													>
														<option key={1} defaultValue="">
															---Choose User---
														</option>
														{users.map((user, index) => (
															<option key={index} value={user._id}>
																{user.first_name} {user.last_name}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										)}
										<li>
											<label htmlFor="user">User</label>
											<input
												type="text"
												name="user"
												value={user}
												id="user"
												onChange={(e) => set_user(e.target.value)}
											/>
										</li>
										{orders && (
											<div className="ai-c h-25px mv-10px mb-30px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"
														onChange={(e) => set_order(e.target.value)}
													>
														<option key={1} defaultValue="">
															---Choose Order---
														</option>
														{orders.orders.map((order, index) => (
															<option key={index} value={order._id}>
																{order.shipping.first_name} {order.shipping.last_name}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										)}
										<li>
											<label htmlFor="order">Order</label>
											<input
												type="text"
												name="order"
												value={order}
												id="order"
												onChange={(e) => set_order(e.target.value)}
											/>
										</li> */}
										<li>
											<label htmlFor="question_1">Question 1</label>
											<input
												type="text"
												name="question_1"
												value={question_1}
												id="question_1"
												onChange={(e) => set_question_1(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="answer_1">Answer 1</label>
											<input
												type="text"
												name="answer_1"
												value={answer_1}
												id="answer_1"
												onChange={(e) => set_answer_1(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="question_2">Question 2</label>
											<input
												type="text"
												name="question_2"
												value={question_2}
												id="question_2"
												onChange={(e) => set_question_2(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="answer_2">Answer 2</label>
											<input
												type="text"
												name="answer_2"
												value={answer_2}
												id="answer_2"
												onChange={(e) => set_answer_2(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="question_3">Question 3</label>
											<input
												type="text"
												name="question_3"
												value={question_3}
												id="question_3"
												onChange={(e) => set_question_3(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="answer_3">Answer 3</label>
											<input
												type="text"
												name="answer_3"
												value={answer_3}
												id="answer_3"
												onChange={(e) => set_answer_3(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="question_4">Question 4</label>
											<input
												type="text"
												name="question_4"
												value={question_4}
												id="question_4"
												onChange={(e) => set_question_4(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="answer_4">Answer 4</label>
											<input
												type="text"
												name="answer_4"
												value={answer_4}
												id="answer_4"
												onChange={(e) => set_answer_4(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="question_5">Question 5</label>
											<input
												type="text"
												name="question_5"
												value={question_5}
												id="question_5"
												onChange={(e) => set_question_5(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="answer_5">Answer 5</label>
											<input
												type="text"
												name="answer_5"
												value={answer_5}
												id="answer_5"
												onChange={(e) => set_answer_5(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="rating">Rating</label>
											<input
												type="text"
												name="rating"
												defaultValue={rating}
												id="rating"
												onChange={(e) => set_rating(e.target.value)}
											/>
										</li>

										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<li>
												<label htmlFor="is_survey">Is Survey</label>
												<input
													type="checkbox"
													name="is_survey"
													defaultChecked={is_survey}
													id="is_survey"
													onChange={(e) => {
														set_is_survey(e.target.checked);
													}}
												/>
											</li>
										)}
										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<li>
												<label htmlFor="active">Active</label>
												<input
													type="checkbox"
													name="active"
													defaultChecked={active}
													id="active"
													onChange={(e) => {
														set_active(e.target.checked);
													}}
												/>
											</li>
										)}
									</div>
								</div>
								<li>
									<button type="submit" className="btn primary">
										{id ? 'Update' : 'Create'}
									</button>
								</li>
								<li>
									<button className="btn secondary" onClick={(e) => e.preventDefault()}>
										<Link to="/secure/glow/surveys">Back to Surveys</Link>
									</button>
								</li>
							</ul>
						</div>
						{/* )} */}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditSurveyPage;
