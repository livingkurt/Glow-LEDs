import { configureStore } from "@reduxjs/toolkit";
import { allRecordsApi } from "./api/allRecordsApi";
import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import reducer from "./reducer";
import { affiliateApi } from "./api";

const apiMiddleware = [
  dashboardApi.middleware,
  placeOrderApi.middleware,
  allRecordsApi.middleware,
  affiliateApi.middleware,
];

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(apiMiddleware),
  devTools: {
    maxAge: 10, // maximum allowed actions to be stored in the history tree
  },
});

export default store;
