import {
	SURVEY_LIST_REQUEST,
	SURVEY_LIST_SUCCESS,
	SURVEY_LIST_FAIL,
	SURVEY_DETAILS_REQUEST,
	SURVEY_DETAILS_SUCCESS,
	SURVEY_DETAILS_FAIL,
	SURVEY_SAVE_REQUEST,
	SURVEY_SAVE_SUCCESS,
	SURVEY_SAVE_FAIL,
	SURVEY_DELETE_SUCCESS,
	SURVEY_DELETE_FAIL,
	SURVEY_DELETE_REQUEST,
	SURVEY_REMOVE_STATE
} from '../constants/surveyConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listSurveys = (query: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
	try {
		dispatch({ type: SURVEY_LIST_REQUEST });
		const { data } = await axios.get('/api/surveys?' + create_query(query));
		dispatch({ type: SURVEY_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: SURVEY_LIST_FAIL, payload: error });
	}
};

export const saveSurvey = (survey: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ surveyActions: survey });
	try {
		dispatch({ type: SURVEY_SAVE_REQUEST, payload: survey });
		const { userLogin: { userInfo } } = getState();
		if (!survey._id) {
			const { data } = await axios.post('/api/surveys', survey, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: SURVEY_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/surveys/' + survey._id, survey, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: SURVEY_SAVE_SUCCESS, payload: data });
			dispatch({ type: SURVEY_REMOVE_STATE, payload: {} });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: SURVEY_SAVE_FAIL, payload: error });
	}
};

export const detailsSurvey = (id: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: SURVEY_DETAILS_REQUEST, payload: id });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/surveys/' + id, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: SURVEY_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: SURVEY_DETAILS_FAIL, payload: error });
	}
};

export const deleteSurvey = (surveyId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: SURVEY_DELETE_REQUEST, payload: surveyId });
		const { data } = await axios.delete('/api/surveys/' + surveyId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: SURVEY_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: SURVEY_DELETE_FAIL, payload: error });
	}
};
