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
	PAYCHECK_DELETE_FAIL,
	MY_PAYCHECK_LIST_REQUEST,
	MY_PAYCHECK_LIST_SUCCESS,
	MY_PAYCHECK_LIST_FAIL
} from '../constants/paycheckConstants';

export const paycheckListReducer = (state = { paychecks: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_LIST_REQUEST:
			return { loading: true, paychecks: [] };
		case PAYCHECK_LIST_SUCCESS:
			return { loading: false, paychecks: action.payload, message: 'Paychecks Found' };
		case PAYCHECK_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const myPaycheckListReducer = (
	state = {
		paychecks: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_PAYCHECK_LIST_REQUEST:
			return { loading: true };
		case MY_PAYCHECK_LIST_SUCCESS:
			return { loading: false, paychecks: action.payload, message: 'Paychecks Found' };
		case MY_PAYCHECK_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paycheckDetailsReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_DETAILS_REQUEST:
			return { loading: true };
		case PAYCHECK_DETAILS_SUCCESS:
			return { loading: false, paycheck: action.payload, message: 'Paycheck Found' };
		case PAYCHECK_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paycheckDeleteReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_DELETE_REQUEST:
			return { loading: true };
		case PAYCHECK_DELETE_SUCCESS:
			return { loading: false, paycheck: action.payload, success: true, message: 'Paycheck Deleted' };
		case PAYCHECK_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paycheckSaveReducer = (state = { paycheck: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PAYCHECK_SAVE_REQUEST:
			return { loading: true };
		case PAYCHECK_SAVE_SUCCESS:
			return { loading: false, success: true, paycheck: action.payload, message: 'Paycheck Saved' };
		case PAYCHECK_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
