import { configureStore } from "@reduxjs/toolkit";
import { allRecordsApi } from "./api/allRecordsApi";
import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import reducer from "./reducer";

const apiMiddleware = [dashboardApi.middleware, placeOrderApi.middleware, allRecordsApi.middleware];

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiMiddleware)
});

export default store;
