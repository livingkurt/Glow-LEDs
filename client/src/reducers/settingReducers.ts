import {
	SETTING_LIST_REQUEST,
	SETTING_LIST_SUCCESS,
	SETTING_LIST_FAIL,
	SETTING_DETAILS_REQUEST,
	SETTING_DETAILS_SUCCESS,
	SETTING_DETAILS_FAIL,
	SETTING_SAVE_REQUEST,
	SETTING_SAVE_SUCCESS,
	SETTING_SAVE_FAIL,
	SETTING_DELETE_REQUEST,
	SETTING_DELETE_SUCCESS,
	SETTING_DELETE_FAIL,
	SHOW_SEARCH_BAR,
	HIDE_SEARCH_BAR
} from '../constants/settingConstants';

export const settingListReducer = (state = { settings: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SETTING_LIST_REQUEST:
			return { loading: true, settings: [] };
		case SETTING_LIST_SUCCESS:
			return { loading: false, settings: action.payload, message: 'Settings Found' };
		case SETTING_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const settingDetailsReducer = (state = { setting: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SETTING_DETAILS_REQUEST:
			return { loading: true };
		case SETTING_DETAILS_SUCCESS:
			return { loading: false, setting: action.payload, message: 'Setting Found' };
		case SETTING_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const showHideSearchBarReducer = (state = { setting: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SHOW_SEARCH_BAR:
			return { show: action.payload };
		case HIDE_SEARCH_BAR:
			return { show: action.payload };
		default:
			return state;
	}
};

export const settingDeleteReducer = (state = { setting: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SETTING_DELETE_REQUEST:
			return { loading: true };
		case SETTING_DELETE_SUCCESS:
			return { loading: false, setting: action.payload, success: true, message: 'Setting Deleted' };
		case SETTING_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const settingSaveReducer = (state = { setting: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SETTING_SAVE_REQUEST:
			return { loading: true };
		case SETTING_SAVE_SUCCESS:
			return { loading: false, success: true, setting: action.payload, message: 'Setting Saved' };
		case SETTING_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
