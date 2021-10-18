import {
	LOG_LIST_REQUEST,
	LOG_LIST_SUCCESS,
	LOG_LIST_FAIL,
	LOG_DETAILS_REQUEST,
	LOG_DETAILS_SUCCESS,
	LOG_DETAILS_FAIL,
	LOG_SAVE_REQUEST,
	LOG_SAVE_SUCCESS,
	LOG_SAVE_FAIL,
	LOG_DELETE_REQUEST,
	LOG_DELETE_SUCCESS,
	LOG_DELETE_FAIL
} from '../constants/logConstants';

export const logListReducer = (state = { logs: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case LOG_LIST_REQUEST:
			return { loading: true, logs: [] };
		case LOG_LIST_SUCCESS:
			return { loading: false, logs: action.payload, message: 'Logs Found' };
		case LOG_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const logDetailsReducer = (state = { log: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case LOG_DETAILS_REQUEST:
			return { loading: true };
		case LOG_DETAILS_SUCCESS:
			return { loading: false, log: action.payload, message: 'Log Found' };
		case LOG_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const logDeleteReducer = (state = { log: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case LOG_DELETE_REQUEST:
			return { loading: true };
		case LOG_DELETE_SUCCESS:
			return { loading: false, log: action.payload, success: true, message: 'Log Deleted' };
		case LOG_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const logSaveReducer = (state = { log: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case LOG_SAVE_REQUEST:
			return { loading: true };
		case LOG_SAVE_SUCCESS:
			return { loading: false, success: true, log: action.payload, message: 'Log Saved' };
		case LOG_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
