import {
	PALETTE_LIST_REQUEST,
	PALETTE_LIST_SUCCESS,
	PALETTE_LIST_FAIL,
	PALETTE_DETAILS_REQUEST,
	PALETTE_DETAILS_SUCCESS,
	PALETTE_DETAILS_FAIL,
	PALETTE_SAVE_REQUEST,
	PALETTE_SAVE_SUCCESS,
	PALETTE_SAVE_FAIL,
	PALETTE_DELETE_REQUEST,
	PALETTE_DELETE_SUCCESS,
	PALETTE_DELETE_FAIL,
	MY_PALETTE_LIST_REQUEST,
	MY_PALETTE_LIST_SUCCESS,
	MY_PALETTE_LIST_FAIL
} from '../constants/paletteConstants';

export const paletteListReducer = (state = { palettes: [] }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PALETTE_LIST_REQUEST:
			return { loading: true, palettes: [] };
		case PALETTE_LIST_SUCCESS:
			return { loading: false, palettes: action.payload, message: 'Palettes Found' };
		case PALETTE_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const myPaletteListReducer = (
	state = {
		palettes: []
	},
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case MY_PALETTE_LIST_REQUEST:
			return { loading: true };
		case MY_PALETTE_LIST_SUCCESS:
			return { loading: false, palettes: action.payload, message: 'Palettes Found' };
		case MY_PALETTE_LIST_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paletteDetailsReducer = (state = { palette: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PALETTE_DETAILS_REQUEST:
			return { loading: true };
		case PALETTE_DETAILS_SUCCESS:
			return { loading: false, palette: action.payload, message: 'Palette Found' };
		case PALETTE_DETAILS_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paletteDeleteReducer = (state = { palette: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PALETTE_DELETE_REQUEST:
			return { loading: true };
		case PALETTE_DELETE_SUCCESS:
			return { loading: false, palette: action.payload, success: true, message: 'Palette Deleted' };
		case PALETTE_DELETE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};

export const paletteSaveReducer = (state = { palette: {} }, action: { type: any; payload: any }) => {
	switch (action.type) {
		case PALETTE_SAVE_REQUEST:
			return { loading: true };
		case PALETTE_SAVE_SUCCESS:
			return { loading: false, success: true, palette: action.payload, message: 'Palette Saved' };
		case PALETTE_SAVE_FAIL:
			return { loading: false, error: action.payload.error, message: action.payload.message };
		default:
			return state;
	}
};
