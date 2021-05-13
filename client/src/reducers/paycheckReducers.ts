import {
	PAYCHECK_LIST_REQUEST,
	PAYCHECK_LIST_SUCCESS,
	PAYCHECK_LIST_FAIL,
	PAYCHECK_DETAILS_REQUEST,
	PAYCHECK_DETAILS_SUCCESS,
	PAYCHECK_DETAILS_FAIL,
	PAYCHECK_SAVE_REQUEST,
	PAYCHECK_SAVE_SUCCESS,
	PAYCHECK_SAVE_FAIL,
	PAYCHECK_DELETE_REQUEST,
	PAYCHECK_DELETE_SUCCESS,
	PAYCHECK_DELETE_FAIL
} from '../constants/paycheckConstants';

export const paycheckListReducer = (state = { paychecks: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_LIST_REQUEST:
			return { loading: true, paychecks: [] };
		case PAYCHECK_LIST_SUCCESS:
			return { loading: false, paychecks: action.payload };
		case PAYCHECK_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const paycheckDetailsReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_DETAILS_REQUEST:
			return { loading: true };
		case PAYCHECK_DETAILS_SUCCESS:
			return { loading: false, paycheck: action.payload };
		case PAYCHECK_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const paycheckDeleteReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_DELETE_REQUEST:
			return { loading: true };
		case PAYCHECK_DELETE_SUCCESS:
			return { loading: false, paycheck: action.payload, success: true };
		case PAYCHECK_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const paycheckSaveReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_SAVE_REQUEST:
			return { loading: true };
		case PAYCHECK_SAVE_SUCCESS:
			return { loading: false, success: true, paycheck: action.payload };
		case PAYCHECK_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
