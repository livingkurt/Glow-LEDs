import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveSurvey, detailsSurvey, listSurveys } from '../../actions/surveyActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { StarRating } from '../../components/SpecialtyComponents';
import { detailsOrderPublic } from '../../actions/orderActions';

const Survey = (props) => {
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
	const [ loading_checkboxes, set_loading_checkboxes ] = useState();
	const [ loading_submit, set_loading_submit ] = useState();
	const [ finished, set_finished ] = useState(false);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);
	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log(users);
	// setTimeout(() => {
	// 	set_loading_checkboxes(false);
	// }, 500);

	const history = useHistory();

	const orderDetailsPublic = useSelector((state) => state.orderDetailsPublic);
	const { order: user_order } = orderDetailsPublic;

	const surveyDetails = useSelector((state) => state.surveyDetails);
	const { survey, loading, error } = surveyDetails;

	const surveySave = useSelector((state) => state.surveySave);
	const { survey: survey_saved, loading: loading_saved, success } = surveySave;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const surveyList = useSelector((state) => state.surveyList);
	const { surveys } = surveyList;

	const dispatch = useDispatch();

	console.log({ survey });

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			const active_survey = surveys.find((survey) => survey.is_survey === true && survey.active === true);
			if (active_survey) {
				stableDispatch(detailsSurvey(active_survey._id));
				set_survey_questions(active_survey._id);
			}
			dispatch(detailsOrderPublic(props.order_id));
			return () => {};
		},
		[ surveys, stableDispatch ]
	);

	useEffect(
		() => {
			if (props.order_id) {
			}
			return () => {};
		},
		[ props.order_id ]
	);

	useEffect(() => {
		// if (props.pathname) {
		// 	console.log('Is ID');
		// 	stableDispatch(detailsSurvey(props.pathname));
		// 	stableDispatch(detailsSurvey(props.pathname));
		// } else {
		// 	stableDispatch(detailsSurvey(''));
		// }
		stableDispatch(listProducts(''));
		stableDispatch(listSurveys(''));
		stableDispatch(listUsers(''));

		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (survey) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ survey ]
	);

	const set_state = () => {
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

	const submitHandler = (e) => {
		set_loading_submit(true);
		e.preventDefault();
		dispatch(
			saveSurvey({
				user: user_order ? user_order.user._id : userInfo && userInfo._id,
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
				order: user_order && user_order._id,
				survey: survey_questions,
				is_survey: false,
				active,
				rating
			})
		);
		// e.target.reset();
		unset_state();
		set_loading_submit(false);
		// history.push('/collections/surveys/category/' + category.toLowerCase());
		// history.push('/secure/account/submission_complete');
	};

	useEffect(
		() => {
			if (success && survey_saved) {
				console.log({ survey_saved });
				// history.push('/account/survey/receipt/' + survey_saved.data.pathname + '/survey/true');
				set_finished(true);
			}
		},
		[ success ]
	);

	const categories = [ 'Glovers', 'Artists', 'Producers', 'VFX' ];

	const [ hovered, setHovered ] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	const determine_rating_word = () => {
		switch (rating) {
			case 1:
				return '1 Star Poor';
			case 2:
				return '2 Stars Ok';
			case 3:
				return '3 Stars Good';
			case 4:
				return '4 Stars Great!';
			case 5:
				return '5 Stars Excellent!';
			default:
				return;
		}
	};

	return (
		<div className="main_container p-20px">
			{survey &&
			!finished && <h1 style={{ textAlign: 'center' }}>{props.pathname ? 'Edit Survey' : 'Submit Survey'}</h1>}

			<div className="form">
				<form style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						<Loading loading={loading_submit} />
						{survey && !finished ? (
							<div>
								<Helmet>
									<title>Survey | Glow LEDs</title>
								</Helmet>
								<ul className="edit-form-container" style={{ maxWidth: '60rem' }}>
									<div>
										<label htmlFor="description">{question_1}</label>
										<StarRating set_rating={set_rating} rating={rating} />
										<p className="ta-c">{rating && determine_rating_word(rating)}</p>
										<div className="ai-c mv-2rem jc-c">
											{/* <h3 className="mr-1rem">{question_2}</h3> */}

											<div className="custom-select">
												<select
													defaultValue={answer_2}
													className="qty_select_dropdown"
													onChange={(e) => {
														set_answer_2(e.target.value);
													}}
												>
													<option value="">---{question_2}---</option>
													<option value="google_search">Google Search</option>
													<option value="facebook">Facebook</option>
													<option value="instagram">Instagram</option>
													<option value="tiktok">TikTok</option>
													<option value="youtube">YouTube</option>
													<option value="glovers_lounge">Glovers Lounge</option>
													<option value="friend">Friend</option>
													{/* <option value="other">Other</option> */}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
										{question_3 && (
											<li>
												<label htmlFor="where">{question_3}</label>
												<input
													type="text"
													name="where"
													value={answer_3}
													id="where"
													onChange={(e) => set_answer_3(e.target.value)}
												/>
											</li>
										)}
										{question_4 && (
											<li>
												<label htmlFor="where">{question_4}</label>
												<input
													type="text"
													name="where"
													value={answer_4}
													id="where"
													onChange={(e) => set_answer_4(e.target.value)}
												/>
											</li>
										)}
										{question_5 && (
											<li>
												<label htmlFor="where">{question_5}</label>
												<input
													type="text"
													name="where"
													value={answer_5}
													id="where"
													onChange={(e) => set_answer_5(e.target.value)}
												/>
											</li>
										)}
									</div>

									<li>
										<button className="btn primary" onClick={(e) => submitHandler(e)}>
											Submit
										</button>
									</li>
								</ul>
							</div>
						) : (
							<div>
								{/* <img src="https://thumbs2.imgbox.com/43/80/kQtikgYi_t.jpeg" alt="hearts" /> */}
								<img
									src="https://thumbs2.imgbox.com/43/80/kQtikgYi_t.jpeg"
									alt="Hearts"
									title="Diffuser Caps Heart"
									style={{
										textAlign: 'center',
										width: '100%',
										borderRadius: '20px'
									}}
								/>
								<div
									className=" ta-c p-10px br-10px mt-5px max-w-600px m-auto fs-20px"
									style={{ backgroundColor: '#272727', color: 'white' }}
								>
									{finished && (
										<div>
											<div>Thank you for Taking the Time to Give us Feedback!</div>{' '}
											<div>We Greatly Appreciate it! 💙</div>
											<br />
											<div>Follow us on Social Media</div>
											<div className="mt-2rem wrap jc-c ">
												<div className="ml-10px fs-30px jc-b w-100per max-w-500px">
													<div className="ml-10px fs-40px">
														<a
															href="https://www.facebook.com/Glow-LEDscom-100365571740684"
															target="_blank"
															rel="noopener noreferrer"
														>
															<i className="fab fa-facebook zoom" />
														</a>
													</div>
													<div className="ml-10px fs-40px">
														<a
															href="https://www.instagram.com/glow_leds/"
															target="_blank"
															rel="noopener noreferrer"
														>
															<i className="fab fa-instagram zoom" />
														</a>
													</div>
													<div className="ml-10px fs-40px">
														<a
															href="https://www.tiktok.com/@glow_leds?lang=en"
															target="_blank"
															rel="noopener noreferrer"
														>
															<i className="fab fa-tiktok zoom" />
														</a>
													</div>
													<div className="mh-10px fs-40px">
														<a
															href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1?sub_confirmation=1"
															target="_blank"
															rel="noopener noreferrer"
														>
															<i className="fab fa-youtube zoom" />
														</a>
													</div>
													<div className="mr-10px fs-40px">
														<a
															href="https://soundcloud.com/ntre/tracks"
															target="_blank"
															rel="noopener noreferrer"
														>
															<i className="fab fa-soundcloud" />
														</a>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
								{/* {userInfo ? (
									<div className="jc-c m-auto wrap">
										{props.order_id && (
											<Link to={'/checkout/order/' + props.order_id}>
												<button className="btn primary mh-10px">View Order</button>
											</Link>
										)}

										<Link to="/secure/account/orders">
											<button className="btn primary mh-10px">Your Orders</button>
										</Link>
										<Link to="/collections/all/products">
											<button className="btn primary mh-10px">Products</button>
										</Link>
										<Link to="/pages/featured">
											<button className="btn primary mh-10px">Featured Videos</button>
										</Link>
										<Link to="/pages/music">
											<button className="btn primary mh-10px">NTRE Music</button>
										</Link>
									</div>
								) : (
									<div className="w-1000px jc-c m-auto">
										{props.order_id && (
											<Link to={'/checkout/order/' + props.order_id}>
												<button className="btn primary mh-10px">View Order</button>
											</Link>
										)}
										<Link to="/collections/all/products">
											<button className="btn primary mh-10px">Products</button>
										</Link>
										<Link to="/pages/featured">
											<button className="btn primary mh-10px">Featured Videos</button>
										</Link>
										<Link to="/pages/music">
											<button className="btn primary mh-10px">NTRE Music</button>
										</Link>
								
									</div>
								)} */}
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default Survey;
