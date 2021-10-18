import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_DETAILS_REQUEST,
	CATEGORY_DETAILS_SUCCESS,
	CATEGORY_DETAILS_FAIL,
	CATEGORY_SAVE_REQUEST,
	CATEGORY_SAVE_SUCCESS,
	CATEGORY_SAVE_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_DELETE_FAIL
} from '../constants/categoryConstants';

export const categoryListReducer = (state = { categorys: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return { loading: true, categorys: [] };
		case CATEGORY_LIST_SUCCESS:
			return { loading: false, categorys: action.payload, message: 'Categorys Found' };
		case CATEGORY_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const categoryDetailsReducer = (state = { category: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CATEGORY_DETAILS_REQUEST:
			return { loading: true };
		case CATEGORY_DETAILS_SUCCESS:
			return { loading: false, category: action.payload, message: 'Category Found' };
		case CATEGORY_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const categoryDeleteReducer = (state = { category: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CATEGORY_DELETE_REQUEST:
			return { loading: true };
		case CATEGORY_DELETE_SUCCESS:
			return { loading: false, category: action.payload, success: true, message: 'Category Deleted' };
		case CATEGORY_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const categorySaveReducer = (state = { category: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case CATEGORY_SAVE_REQUEST:
			return { loading: true };
		case CATEGORY_SAVE_SUCCESS:
			return { loading: false, success: true, category: action.payload, message: 'Category Saved' };
		case CATEGORY_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
