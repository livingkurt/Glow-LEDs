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
  FILAMENT_DELETE_SUCCESS,
  FILAMENT_DELETE_FAIL,
  FILAMENT_DELETE_REQUEST,
  MY_FILAMENT_LIST_REQUEST,
  MY_FILAMENT_LIST_SUCCESS,
  MY_FILAMENT_LIST_FAIL
} from "../constants/filamentConstants";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import { IDispatch, IGetState } from "../types/reduxTypes";

export const listFilaments = (query: any) => async (dispatch: (arg0: IDispatch) => void) => {
  try {
    dispatch({ type: FILAMENT_LIST_REQUEST });
    const { data } = await axios.get("/api/filaments?" + create_query(query));
    dispatch({ type: FILAMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FILAMENT_LIST_FAIL, payload: error });
  }
};

export const listMyFilament = () => async (dispatch: (arg0: IDispatch) => void, getState: () => IGetState) => {
  try {
    dispatch({ type: MY_FILAMENT_LIST_REQUEST });
    const {
      userLogin: { userInfo }
    } = getState();
    const { data } = await axios.get("/api/filaments/get_mine", {
      headers: { Authorization: "Bearer " + userInfo.access_token }
    });

    dispatch({ type: MY_FILAMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_FILAMENT_LIST_FAIL, payload: error });
  }
};

export const saveFilament = (filament: any) => async (dispatch: (arg0: IDispatch) => void, getState: () => IGetState) => {
  try {
    dispatch({ type: FILAMENT_SAVE_REQUEST, payload: filament });
    const {
      userLogin: { userInfo }
    } = getState();
    if (!filament._id) {
      const { data } = await axios.post("/api/filaments", filament, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      });
      dispatch({ type: FILAMENT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put("/api/filaments/" + filament._id, filament, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      });
      dispatch({ type: FILAMENT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: FILAMENT_SAVE_FAIL, payload: error });
  }
};

export const detailsFilament = (pathname: string) => async (dispatch: (arg0: IDispatch) => void) => {
  try {
    dispatch({ type: FILAMENT_DETAILS_REQUEST, payload: pathname });
    const { data } = await axios.get("/api/filaments/" + pathname);
    dispatch({ type: FILAMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FILAMENT_DETAILS_FAIL, payload: error });
  }
};

export const deleteFilament = (filamentId: string) => async (dispatch: (arg0: IDispatch) => void, getState: () => IGetState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState();
    dispatch({ type: FILAMENT_DELETE_REQUEST, payload: filamentId });
    const { data } = await axios.delete("/api/filaments/" + filamentId, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    dispatch({ type: FILAMENT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: FILAMENT_DELETE_FAIL, payload: error });
  }
};
