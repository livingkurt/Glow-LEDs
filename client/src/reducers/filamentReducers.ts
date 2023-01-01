import {
  FILAMENT_LIST_REQUEST,
  FILAMENT_LIST_SUCCESS,
  FILAMENT_LIST_FAIL,
  FILAMENT_DETAILS_REQUEST,
  FILAMENT_DETAILS_SUCCESS,
  FILAMENT_DETAILS_FAIL,
  FILAMENT_SAVE_REQUEST,
  FILAMENT_SAVE_SUCCESS,
  FILAMENT_SAVE_FAIL,
  FILAMENT_DELETE_REQUEST,
  FILAMENT_DELETE_SUCCESS,
  FILAMENT_DELETE_FAIL
} from "../constants/filamentConstants";
import { IAction } from "../types/reduxTypes";

export const filamentListReducer = (state = { filaments: [] }, action: IAction) => {
  switch (action.type) {
    case FILAMENT_LIST_REQUEST:
      return { loading: true, filaments: [] };
    case FILAMENT_LIST_SUCCESS:
      return {
        loading: false,
        filaments: action.payload,
        message: "Filaments Found"
      };
    case FILAMENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export const filamentDetailsReducer = (state = { filament: {} }, action: IAction) => {
  switch (action.type) {
    case FILAMENT_DETAILS_REQUEST:
      return { loading: true };
    case FILAMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        filament: action.payload,
        message: "Filament Found"
      };
    case FILAMENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export const filamentDeleteReducer = (state = { filament: {} }, action: IAction) => {
  switch (action.type) {
    case FILAMENT_DELETE_REQUEST:
      return { loading: true };
    case FILAMENT_DELETE_SUCCESS:
      return {
        loading: false,
        filament: action.payload,
        success: true,
        message: "Filament Deleted"
      };
    case FILAMENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export const filamentSaveReducer = (state = { filament: {} }, action: IAction) => {
  switch (action.type) {
    case FILAMENT_SAVE_REQUEST:
      return { loading: true };
    case FILAMENT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        filament: action.payload,
        message: "Filament Saved"
      };
    case FILAMENT_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};
