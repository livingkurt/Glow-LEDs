import {
	CHIP_LIST_REQUEST,
	CHIP_LIST_SUCCESS,
	CHIP_LIST_FAIL,
	CHIP_DETAILS_REQUEST,
	CHIP_DETAILS_SUCCESS,
	CHIP_DETAILS_FAIL,
	CHIP_SAVE_REQUEST,
	CHIP_SAVE_SUCCESS,
	CHIP_SAVE_FAIL,
	CHIP_DELETE_REQUEST,
	CHIP_DELETE_SUCCESS,
	CHIP_DELETE_FAIL
} from '../constants/chipConstants';

export const chipListReducer = (state = { chips: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHIP_LIST_REQUEST:
			return { loading: true, chips: [] };
		case CHIP_LIST_SUCCESS:
			return { loading: false, chips: action.payload, message: 'Chips Found' };
		case CHIP_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const chipDetailsReducer = (state = { chip: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHIP_DETAILS_REQUEST:
			return { loading: true };
		case CHIP_DETAILS_SUCCESS:
			return { loading: false, chip: action.payload, message: 'Chip Found' };
		case CHIP_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const chipDeleteReducer = (state = { chip: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHIP_DELETE_REQUEST:
			return { loading: true };
		case CHIP_DELETE_SUCCESS:
			return { loading: false, chip: action.payload, success: true, message: 'Chip Deleted' };
		case CHIP_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const chipSaveReducer = (state = { chip: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CHIP_SAVE_REQUEST:
			return { loading: true };
		case CHIP_SAVE_SUCCESS:
			return { loading: false, success: true, chip: action.payload, message: 'Chip Saved' };
		case CHIP_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
