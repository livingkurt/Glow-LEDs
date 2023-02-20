import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import reducer from "./reducer";

let cartItems: any;
const cart_string: any = localStorage.getItem("cartItems");
//
if (cart_string) {
  cartItems = JSON.parse(cart_string);
} else {
  cartItems = [];
}

let shippingAddress: any;
const shipping_string: any = sessionStorage.getItem("shippingAddress");
//
if (shipping_string) {
  shippingAddress = JSON.parse(shipping_string);
} else {
  shippingAddress = {};
}

const initialState: object = {
  cart: { cartItems, shipping: shippingAddress, payment: {} },
  userLogin: { userInfo: {} },
  showHideSearchBar: { show: true }
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([dashboardApi.middleware, placeOrderApi.middleware]),
  preloadedState: initialState
});

export default store;
