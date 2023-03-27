import {
  affiliateSlice,
  cartSlice,
  categorySlice,
  chipSlice,
  contentSlice,
  emailSlice,
  expenseSlice,
  featureSlice,
  filamentSlice,
  orderSlice,
  paletteSlice,
  parcelSlice,
  paycheckSlice,
  productSlice,
  promoSlice,
  settingSlice,
  surveySlice,
  teamSlice,
  userSlice,
  wholesalerSlice,
  tutorialSlice
} from "./slices";

import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import { allRecordsApi } from "./api/allRecordsApi";
import dashboardSlice from "./pages/DashboardPage/dashboardSlice";

const reducers = {
  affiliateSlice: affiliateSlice,
  cartSlice: cartSlice,
  categorySlice: categorySlice,
  chipSlice: chipSlice,
  contentSlice: contentSlice,
  emailSlice: emailSlice,
  expenseSlice: expenseSlice,
  featureSlice: featureSlice,
  filamentSlice: filamentSlice,
  orderSlice: orderSlice,
  paletteSlice: paletteSlice,
  parcelSlice: parcelSlice,
  paycheckSlice: paycheckSlice,
  productSlice: productSlice,
  promoSlice: promoSlice,
  settingSlice: settingSlice,
  surveySlice: surveySlice,
  teamSlice: teamSlice,
  userSlice: userSlice,
  [allRecordsApi.reducerPath]: allRecordsApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [placeOrderApi.reducerPath]: placeOrderApi.reducer,
  dashboardSlice: dashboardSlice,
  wholesalerSlice: wholesalerSlice,
  tutorialSlice: tutorialSlice
};

export default reducers;
