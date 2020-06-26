import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_CONTACT_REQUEST, USER_CONTACT_SUCCESS, USER_CONTACT_FAIL, USER_PASSWORD_RESET_SUCCESS, USER_PASSWORD_RESET_FAIL, USER_PASSWORD_RESET_REQUEST, USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL, USER_VERIFY_REQUEST, USER_VERIFY_SUCCESS, USER_VERIFY_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("/api/users/update/" + userId,
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

const password_reset = (email) => async (dispatch) => {
  console.log({ password_reset: email })
  dispatch({ type: USER_PASSWORD_RESET_REQUEST, payload: { email } });
  try {
    const { data } = await axios.post("/api/users/passwordreset", { email });
    dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data });
    axios.post("/api/emails/passwordreset", data);
  } catch (error) {
    dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: error.message });
  }
}

const reset_password = (user_id, password, repassword) => async (dispatch) => {
  console.log({ user_id, password, repassword })
  dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: { user_id, password, repassword } });
  try {
    const { data } = await axios.put("/api/users/resetpassword", { user_id, password, repassword });
    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
    // axios.post("/api/emails/passwordreset", { email });
  } catch (error) {
    dispatch({ type: USER_RESET_PASSWORD_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    axios.post("/api/emails/verify", data);
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}


const verify = (user_id) => async (dispatch) => {
  console.log({ user_id })
  dispatch({ type: USER_VERIFY_REQUEST, payload: { user_id } });
  try {
    const { data } = await axios.put("/api/users/verify/" + user_id);
    dispatch({ type: USER_VERIFY_SUCCESS, payload: data });
    console.log({ verify: data })
    axios.post("/api/emails/verified", data);
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_VERIFY_FAIL, payload: error.message });
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
export { login, register, logout, update, contact, password_reset, reset_password, verify };