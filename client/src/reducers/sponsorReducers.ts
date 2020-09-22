import {
	SPONSOR_LIST_REQUEST,
	SPONSOR_LIST_SUCCESS,
	SPONSOR_LIST_FAIL,
	SPONSOR_DETAILS_REQUEST,
	SPONSOR_DETAILS_SUCCESS,
	SPONSOR_DETAILS_FAIL,
	SPONSOR_SAVE_REQUEST,
	SPONSOR_SAVE_SUCCESS,
	SPONSOR_SAVE_FAIL,
	SPONSOR_DELETE_REQUEST,
	SPONSOR_DELETE_SUCCESS,
	SPONSOR_DELETE_FAIL
} from '../constants/sponsorConstants';

const sponsorListReducer = (state = { sponsors: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SPONSOR_LIST_REQUEST:
			return { loading: true, sponsors: [] };
		case SPONSOR_LIST_SUCCESS:
			return { loading: false, sponsors: action.payload };
		case SPONSOR_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const sponsorDetailsReducer = (state = { sponsor: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SPONSOR_DETAILS_REQUEST:
			return { loading: true };
		case SPONSOR_DETAILS_SUCCESS:
			return { loading: false, sponsor: action.payload };
		case SPONSOR_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const sponsorDeleteReducer = (state = { sponsor: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SPONSOR_DELETE_REQUEST:
			return { loading: true };
		case SPONSOR_DELETE_SUCCESS:
			return { loading: false, sponsor: action.payload, success: true };
		case SPONSOR_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const sponsorSaveReducer = (state = { sponsor: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case SPONSOR_SAVE_REQUEST:
			return { loading: true };
		case SPONSOR_SAVE_SUCCESS:
			return { loading: false, success: true, sponsor: action.payload };
		case SPONSOR_SAVE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export { sponsorListReducer, sponsorDetailsReducer, sponsorSaveReducer, sponsorDeleteReducer };
