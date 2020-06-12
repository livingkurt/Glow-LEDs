import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_CONTACT_REQUEST, USER_CONTACT_SUCCESS, USER_CONTACT_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
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
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    axios.post("/api/emails/register", { name, email, password });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const contact = (user_name, user_email, order_number, reason_for_contact, message) => async (dispatch) => {
  dispatch({ type: USER_CONTACT_REQUEST, payload: { user_name, user_email, order_number, reason_for_contact, message } });
  try {
    const { data } = await axios.post("/api/emails/contact", { user_name, user_email, order_number, reason_for_contact, message });
    dispatch({ type: USER_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_CONTACT_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { login, register, logout, update, contact };