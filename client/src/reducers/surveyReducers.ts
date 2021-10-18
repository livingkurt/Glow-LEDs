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
	SURVEY_DELETE_REQUEST,
	SURVEY_DELETE_SUCCESS,
	SURVEY_DELETE_FAIL,
	SURVEY_REMOVE_STATE
} from '../constants/surveyConstants';

export const surveyListReducer = (state = { surveys: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SURVEY_LIST_REQUEST:
			return { loading: true, surveys: [] };
		case SURVEY_LIST_SUCCESS:
			return { loading: false, surveys: action.payload, message: 'Surveys Found' };
		case SURVEY_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const surveyDetailsReducer = (state = { survey: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SURVEY_DETAILS_REQUEST:
			return { loading: true };
		case SURVEY_DETAILS_SUCCESS:
			return { loading: false, survey: action.payload, message: 'Survey Found' };
		case SURVEY_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const surveyDeleteReducer = (state = { survey: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SURVEY_DELETE_REQUEST:
			return { loading: true };
		case SURVEY_DELETE_SUCCESS:
			return { loading: false, survey: action.payload, success: true, message: 'Survey Deleted' };
		case SURVEY_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const surveySaveReducer = (state = { survey: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SURVEY_SAVE_REQUEST:
			return { loading: true };
		case SURVEY_SAVE_SUCCESS:
			return { loading: false, success: true, survey: action.payload, message: 'Survey Saved' };
		case SURVEY_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		case SURVEY_REMOVE_STATE:
			return { loading: false, success: false };
		default:
			return state;
	}
};
