import {
	FEATURE_LIST_REQUEST,
	FEATURE_LIST_SUCCESS,
	FEATURE_LIST_FAIL,
	FEATURE_DETAILS_REQUEST,
	FEATURE_DETAILS_SUCCESS,
	FEATURE_DETAILS_FAIL,
	FEATURE_SAVE_REQUEST,
	FEATURE_SAVE_SUCCESS,
	FEATURE_SAVE_FAIL,
	FEATURE_DELETE_REQUEST,
	FEATURE_DELETE_SUCCESS,
	FEATURE_DELETE_FAIL
} from '../constants/featureConstants';

export const featureListReducer = (state = { features: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FEATURE_LIST_REQUEST:
			return { loading: true, features: [] };
		case FEATURE_LIST_SUCCESS:
			return { loading: false, features: action.payload, message: 'Features Found' };
		case FEATURE_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const featureDetailsReducer = (state = { feature: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FEATURE_DETAILS_REQUEST:
			return { loading: true };
		case FEATURE_DETAILS_SUCCESS:
			return { loading: false, feature: action.payload, message: 'Feature Found' };
		case FEATURE_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const featureDeleteReducer = (state = { feature: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FEATURE_DELETE_REQUEST:
			return { loading: true };
		case FEATURE_DELETE_SUCCESS:
			return { loading: false, feature: action.payload, success: true, message: 'Feature Deleted' };
		case FEATURE_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const featureSaveReducer = (state = { feature: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case FEATURE_SAVE_REQUEST:
			return { loading: true };
		case FEATURE_SAVE_SUCCESS:
			return { loading: false, success: true, feature: action.payload, message: 'Feature Saved' };
		case FEATURE_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
