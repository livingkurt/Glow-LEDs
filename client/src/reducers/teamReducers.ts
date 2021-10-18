import {
	TEAM_LIST_REQUEST,
	TEAM_LIST_SUCCESS,
	TEAM_LIST_FAIL,
	TEAM_DETAILS_REQUEST,
	TEAM_DETAILS_SUCCESS,
	TEAM_DETAILS_FAIL,
	TEAM_SAVE_REQUEST,
	TEAM_SAVE_SUCCESS,
	TEAM_SAVE_FAIL,
	TEAM_DELETE_REQUEST,
	TEAM_DELETE_SUCCESS,
	TEAM_DELETE_FAIL
} from '../constants/teamConstants';

export const teamListReducer = (state = { teams: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case TEAM_LIST_REQUEST:
			return { loading: true, teams: [] };
		case TEAM_LIST_SUCCESS:
			return { loading: false, teams: action.payload, message: 'Teams Found' };
		case TEAM_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const teamDetailsReducer = (state = { team: { reviews: [] } }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case TEAM_DETAILS_REQUEST:
			return { loading: true };
		case TEAM_DETAILS_SUCCESS:
			return { loading: false, team: action.payload, message: 'Team Found' };
		case TEAM_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const teamDeleteReducer = (state = { team: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case TEAM_DELETE_REQUEST:
			return { loading: true };
		case TEAM_DELETE_SUCCESS:
			return { loading: false, team: action.payload, success: true, message: 'Team Deleted' };
		case TEAM_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const teamSaveReducer = (state = { team: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case TEAM_SAVE_REQUEST:
			return { loading: true };
		case TEAM_SAVE_SUCCESS:
			return { loading: false, success: true, team: action.payload, message: 'Team Saved' };
		case TEAM_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
