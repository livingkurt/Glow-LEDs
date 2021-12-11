import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSurveys, deleteSurvey } from '../../../actions/surveyActions';
import { Link } from 'react-router-dom';
import { Loading, Notification } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../../components/SpecialtyComponents';
import { format_date } from '../../../utils/helper_functions';
import { listAffiliates } from '../../../actions/affiliateActions';

import { listTeams } from '../../../actions/teamActions';
import { listOrders } from '../../../actions/orderActions';

const SurveysPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');

	const [ loading_surveys, set_loading_surveys ] = useState(false);
	const category = props.match.params.category ? props.match.params.category : '';
	const surveyList = useSelector((state) => state.surveyList);
	const { loading, surveys, message, error } = surveyList;

	const surveySave = useSelector((state) => state.surveySave);
	const { success: successSave } = surveySave;

	const surveyDelete = useSelector((state) => state.surveyDelete);
	const { success: successDelete } = surveyDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listSurveys({}));
				dispatch(listAffiliates({}));
				dispatch(listTeams({}));
				dispatch(listOrders({}));
			}
			return () => (clean = false);
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listSurveys({ category, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listSurveys({ category, search, sort: e.target.value }));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listSurveys({ category, search, sort }));
			}
			return () => (clean = false);
		},
		[ dispatch, category, search, sort ]
	);
	const deleteHandler = (survey) => {
		dispatch(deleteSurvey(survey._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [
		{ name: 'Survey', color: '#3e4c6d' },
		{ name: 'Answers', color: '#6f3c3c' },
		{ name: '1 Rating', color: '#8a2e2e' },
		{ name: '2 Rating', color: '#8a502e' },
		{ name: '3 Rating', color: '#898a2e' },
		{ name: '4 Rating', color: '#2e8a42' },
		{ name: '5 Rating', color: '#2e578a' }
	];

	const determine_color = (survey) => {
		let result = '';
		if (survey.is_survey) {
			result = colors[0].color;
		}
		if (!survey.is_survey) {
			result = colors[1].color;
		}
		if (survey.rating === 1) {
			result = colors[2].color;
		}
		if (survey.rating === 2) {
			result = colors[3].color;
		}
		if (survey.rating === 3) {
			result = colors[4].color;
		}
		if (survey.rating === 4) {
			result = colors[5].color;
		}
		if (survey.rating === 5) {
			result = colors[6].color;
		}

		return result;
	};
	console.log({ surveys });

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Surveys | Glow LEDs</title>
			</Helmet>
			<Notification message={message} />
			<Loading loading={loading_surveys} error={error} />
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color, index) => {
						return (
							<div className="wrap jc-b  m-1rem" key={index}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div>
				<Link to="/secure/glow/editsurvey">
					<button className="btn primary">Create Survey</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Surveys</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{surveys && (
					<div className="survey-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Date Paid</th>
									<th>Is Survey</th>
									<th>Rating</th>
									<th>Q/A 1</th>
									<th>Q/A 2</th>
									<th>Q/A 3</th>
									<th>Q/A 4</th>
									<th>Q/A 5</th>
									<th>Active</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{surveys.map((survey, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(survey),
											fontSize: '16px'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{survey.createdAt && format_date(survey.createdAt)}
										</td>
										<td className="p-10px">
											{survey.is_survey ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">{survey.rating}</td>
										<td className="p-10px">
											{survey.is_survey ? survey.question_1 : survey.answer_1}
										</td>
										<td className="p-10px">
											{survey.is_survey ? survey.question_2 : survey.answer_2}
										</td>
										<td className="p-10px">
											{survey.is_survey ? survey.question_3 : survey.answer_3}
										</td>
										<td className="p-10px">
											{survey.is_survey ? survey.question_4 : survey.answer_4}
										</td>
										<td className="p-10px">
											{survey.is_survey ? survey.question_5 : survey.answer_5}
										</td>
										<td className="p-10px">
											{survey.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editsurvey/' + survey._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(survey)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
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
export default SurveysPage;
