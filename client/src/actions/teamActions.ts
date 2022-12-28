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
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
  TEAM_DELETE_REQUEST
} from "../constants/teamConstants";
import axios from "axios";
import { create_query } from "../utils/helper_functions";
import { IDispatch, IGetState } from "../types/reduxTypes";

export const listTeams = (query: any) => async (dispatch: (arg0: IDispatch) => void) => {
  try {
    dispatch({ type: TEAM_LIST_REQUEST });
    const { data } = await axios.get("/api/teams?" + create_query(query));

    dispatch({ type: TEAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEAM_LIST_FAIL, payload: error });
  }
};

export const saveTeam = (team: any) => async (dispatch: (arg0: IDispatch) => void, getState: () => IGetState) => {
  try {
    dispatch({ type: TEAM_SAVE_REQUEST, payload: team });
    const {
      userLogin: { userInfo }
    } = getState();
    if (!team._id) {
      const { data } = await axios.post("/api/teams", team, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      });
      dispatch({ type: TEAM_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put("/api/teams/" + team._id, team, {
        headers: {
          Authorization: "Bearer " + userInfo.access_token
        }
      });
      dispatch({ type: TEAM_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: TEAM_SAVE_FAIL, payload: error });
  }
};

export const detailsTeam = (pathname: string) => async (dispatch: (arg0: IDispatch) => void) => {
  try {
    dispatch({ type: TEAM_DETAILS_REQUEST, payload: {} });
    if (pathname) {
      const { data } = await axios.get("/api/teams/" + pathname);
      dispatch({ type: TEAM_DETAILS_SUCCESS, payload: data });
    } else {
      dispatch({ type: TEAM_DETAILS_SUCCESS, payload: {} });
    }
  } catch (error) {
    dispatch({ type: TEAM_DETAILS_FAIL, payload: error });
  }
};

export const deleteTeam = (teamId: string) => async (dispatch: (arg0: IDispatch) => void, getState: () => IGetState) => {
  try {
    const {
      userLogin: { userInfo }
    } = getState();
    dispatch({ type: TEAM_DELETE_REQUEST, payload: teamId });
    const { data } = await axios.delete("/api/teams/" + teamId, {
      headers: {
        Authorization: "Bearer " + userInfo.access_token
      }
    });
    dispatch({ type: TEAM_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: TEAM_DELETE_FAIL, payload: error });
  }
};
