import { configureStore } from "@reduxjs/toolkit";
import { allRecordsApi } from "./api/allRecordsApi";
import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import reducer from "./reducer";
import { check_authentication } from "./utils/react_helper_functions";

let my_cart: any;
const cart_string: any = localStorage.getItem("my_cart");

if (cart_string) {
  my_cart = JSON.parse(cart_string);
} else {
  my_cart = [];
}

let shippingAddress: any;
const shipping_string: any = sessionStorage.getItem("shippingAddress");

if (shipping_string) {
  shippingAddress = JSON.parse(shipping_string);
} else {
  shippingAddress = {};
}

const initialState: object = {
  cartSlice: { my_cart, shipping: shippingAddress },
  userSlice: { current_user: {} },
  showHideSearchBar: { show: true }
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      dashboardApi.middleware,
      placeOrderApi.middleware,
      allRecordsApi.middleware
    ]),
  preloadedState: initialState
});

export default store;
