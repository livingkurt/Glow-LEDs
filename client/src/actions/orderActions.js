import axios from "axios";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_SHIPPING_REQUEST, ORDER_SHIPPING_SUCCESS, ORDER_SHIPPING_FAIL, ORDER_DELIVERY_REQUEST, ORDER_DELIVERY_SUCCESS, ORDER_DELIVERY_FAIL
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  console.log({ createOrder: order })
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userLogin: { userInfo } } = getState();
    const { data: { data: newOrder } } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    axios.post("/api/emails/order", order);
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.get("/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.get("/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}

const shipOrder = (order, shippingResult) => async (dispatch, getState) => {
  console.log({ ...order, isShipped: shippingResult })
  try {
    dispatch({ type: ORDER_SHIPPING_REQUEST, payload: shippingResult });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.put("/api/orders/" + order._id + "/shipping", {
      ...order,
      isShipped: shippingResult,
      shippedAt: shippingResult ? Date.now() : ""
    }, {
      headers:
        { Authorization: 'Bearer ' + userInfo.accessToken }
    });
    console.log({ data })
    dispatch({ type: ORDER_SHIPPING_SUCCESS, payload: data })
    // axios.post("/api/emails/shipping", data);
  } catch (error) {
    dispatch({ type: ORDER_SHIPPING_FAIL, payload: error.message });
  }
}


const deliverOrder = (order, deliveryResult) => async (dispatch, getState) => {
  console.log({ ...order, isDelivered: deliveryResult })
  try {
    dispatch({ type: ORDER_DELIVERY_REQUEST, payload: deliveryResult });
    const { userLogin: { userInfo } } = getState();
    const { data } = await axios.put("/api/orders/" + order._id + "/delivery", {
      ...order,
      isDelivered: deliveryResult,
      deliveredAt: deliveryResult ? Date.now() : ""
    }, {
      headers:
        { Authorization: 'Bearer ' + userInfo.accessToken }
    });
    console.log({ data })
    dispatch({ type: ORDER_DELIVERY_SUCCESS, payload: data })
    // axios.post("/api/emails/delivery", data);
  } catch (error) {
    dispatch({ type: ORDER_DELIVERY_FAIL, payload: error.message });
  }
}
export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder, shipOrder, deliverOrder };