import { REGISTRATION_EMAIL_REQUEST, REGISTRATION_EMAIL_SUCCESS, REGISTRATION_EMAIL_FAIL, ORDER_EMAIL_REQUEST, ORDER_EMAIL_SUCCESS, ORDER_EMAIL_FAIL, SHIPPING_EMAIL_REQUEST, SHIPPING_EMAIL_SUCCESS, SHIPPING_EMAIL_FAIL, DELIVERY_EMAIL_REQUEST, DELIVERY_EMAIL_SUCCESS, DELIVERY_EMAIL_FAIL } from "../constants/emailContraints";

function email_registration_reducer(state = { details: [] }, action) {

  switch (action.type) {
    case REGISTRATION_EMAIL_REQUEST:
      return { loading: true, details: [] };
    case REGISTRATION_EMAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case REGISTRATION_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function email_order_reducer(state = { details: {} }, action) {

  switch (action.type) {
    case ORDER_EMAIL_REQUEST:
      return { loading: true };
    case ORDER_EMAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case ORDER_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function email_shipping_reducer(state = { details: {} }, action) {

  switch (action.type) {
    case SHIPPING_EMAIL_REQUEST:
      return { loading: true };
    case SHIPPING_EMAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case SHIPPING_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function email_delivery_reducer(state = { details: {} }, action) {

  switch (action.type) {
    case DELIVERY_EMAIL_REQUEST:
      return { loading: true };
    case DELIVERY_EMAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case DELIVERY_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export { email_registration_reducer, email_order_reducer, email_shipping_reducer, email_delivery_reducer }