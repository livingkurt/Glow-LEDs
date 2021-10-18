import {
	PARCEL_LIST_REQUEST,
	PARCEL_LIST_SUCCESS,
	PARCEL_LIST_FAIL,
	PARCEL_DETAILS_REQUEST,
	PARCEL_DETAILS_SUCCESS,
	PARCEL_DETAILS_FAIL,
	PARCEL_SAVE_REQUEST,
	PARCEL_SAVE_SUCCESS,
	PARCEL_SAVE_FAIL,
	PARCEL_DELETE_REQUEST,
	PARCEL_DELETE_SUCCESS,
	PARCEL_DELETE_FAIL
} from '../constants/parcelConstants';

export const parcelListReducer = (state = { parcels: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_LIST_REQUEST:
			return { loading: true, parcels: [] };
		case PARCEL_LIST_SUCCESS:
			return { loading: false, parcels: action.payload, message: 'Parcels Found' };
		case PARCEL_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const parcelDetailsReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_DETAILS_REQUEST:
			return { loading: true };
		case PARCEL_DETAILS_SUCCESS:
			return { loading: false, parcel: action.payload, message: 'Parcel Found' };
		case PARCEL_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const parcelDeleteReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_DELETE_REQUEST:
			return { loading: true };
		case PARCEL_DELETE_SUCCESS:
			return { loading: false, parcel: action.payload, success: true, message: 'Parcel Deleted' };
		case PARCEL_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const parcelSaveReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_SAVE_REQUEST:
			return { loading: true };
		case PARCEL_SAVE_SUCCESS:
			return { loading: false, success: true, parcel: action.payload, message: 'Parcel Saved' };
		case PARCEL_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
