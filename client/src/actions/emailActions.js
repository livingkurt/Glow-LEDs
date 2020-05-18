import { REGISTRATION_EMAIL_REQUEST, REGISTRATION_EMAIL_SUCCESS, REGISTRATION_EMAIL_FAIL, ORDER_EMAIL_REQUEST, ORDER_EMAIL_SUCCESS, ORDER_EMAIL_FAIL, SHIPPING_EMAIL_REQUEST, SHIPPING_EMAIL_SUCCESS, SHIPPING_EMAIL_FAIL, DELIVERY_EMAIL_REQUEST, DELIVERY_EMAIL_SUCCESS, DELIVERY_EMAIL_FAIL } from "../constants/emailContraints"
import axios from 'axios';

const email_registration = (name, email, password) => async (dispatch) => {
  try {

    dispatch({ type: REGISTRATION_EMAIL_REQUEST });
    const { data } = await axios.post("/api/emails/register", { name, email, password });
    dispatch({ type: REGISTRATION_EMAIL_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: REGISTRATION_EMAIL_FAIL, payload: error.message });
  }
}

const email_order = (order) => async (dispatch) => {
  try {

    dispatch({ type: ORDER_EMAIL_REQUEST });
    const { data } = await axios.post("/api/emails/order", order);
    dispatch({ type: ORDER_EMAIL_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: ORDER_EMAIL_FAIL, payload: error.message });
  }
}

const email_shipping = (details) => async (dispatch) => {
  try {

    dispatch({ type: SHIPPING_EMAIL_REQUEST });
    const { data } = await axios.post("/api/emails/shipping", details);
    dispatch({ type: SHIPPING_EMAIL_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: SHIPPING_EMAIL_FAIL, payload: error.message });
  }
}

const email_delivery = (details) => async (dispatch) => {
  try {

    dispatch({ type: DELIVERY_EMAIL_REQUEST });
    const { data } = await axios.post("/api/emails/delivery", details);
    dispatch({ type: DELIVERY_EMAIL_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: DELIVERY_EMAIL_FAIL, payload: error.message });
  }
}

export { email_registration, email_order, email_shipping, email_delivery }