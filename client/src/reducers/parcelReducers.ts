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
	PARCEL_DELETE_FAIL,
	MY_PARCEL_LIST_REQUEST,
	MY_PARCEL_LIST_SUCCESS,
	MY_PARCEL_LIST_FAIL
} from '../constants/parcelConstants';

export const parcelListReducer = (state = { parcels: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_LIST_REQUEST:
			return { loading: true, parcels: [] };
		case PARCEL_LIST_SUCCESS:
			return { loading: false, parcels: action.payload };
		case PARCEL_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const myParcelListReducer = (
	state = {
		parcels: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_PARCEL_LIST_REQUEST:
			return { loading: true };
		case MY_PARCEL_LIST_SUCCESS:
			return { loading: false, parcels: action.payload };
		case MY_PARCEL_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const parcelDetailsReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_DETAILS_REQUEST:
			return { loading: true };
		case PARCEL_DETAILS_SUCCESS:
			return { loading: false, parcel: action.payload };
		case PARCEL_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const parcelDeleteReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_DELETE_REQUEST:
			return { loading: true };
		case PARCEL_DELETE_SUCCESS:
			return { loading: false, parcel: action.payload, success: true };
		case PARCEL_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const parcelSaveReducer = (state = { parcel: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PARCEL_SAVE_REQUEST:
			return { loading: true };
		case PARCEL_SAVE_SUCCESS:
			return { loading: false, success: true, parcel: action.payload };
		case PARCEL_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
