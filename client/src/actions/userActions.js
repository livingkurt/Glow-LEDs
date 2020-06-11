import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_TOKEN_REQUEST, USER_TOKEN_SUCCESS, USER_TOKEN_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  console.log({ userId, name, email, password })
  const { userLogin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.accessToken
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", { name, email, password });
    console.log({ userActions: data })
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => async (dispatch, getState) => {
  console.log("delete cookies")
  const { userLogin: { userInfo } } = getState();
  const token = userInfo.refreshToken.toString()
  const { data } = await axios.post("/api/users/logout", { token });
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

const token2 = (refreshToken) => async (dispatch) => {
  dispatch({ type: USER_TOKEN_REQUEST, payload: refreshToken });
  try {
    const { data } = await axios.post("/api/users/token", refreshToken);
    console.log({ userActions: data })
    dispatch({ type: USER_TOKEN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_TOKEN_FAIL, payload: error.message });
  }
}

const token = () => async (dispatch, getState) => {
  // console.log({ userActions_info: info })
  const { userLogin: { userInfo } } = getState();
  console.log({ userActions_userInfo: userInfo })
  dispatch({ type: USER_TOKEN_REQUEST, payload: userInfo });
  try {
    const { data } = await axios.post("/api/users/token", userInfo, {
      headers: {
        Authorization: 'Bearer ' + userInfo.accessToken
      }
    });
    // const { data } = await axios.post("/api/users/token", userInfo);
    console.log({ userActions: data })
    dispatch({ type: USER_TOKEN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_TOKEN_FAIL, payload: error.message });
  }
}

export { login, register, logout, update, token };