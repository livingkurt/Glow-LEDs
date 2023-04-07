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
import glTableReducer from "./shared/GlowLEDsComponents/GLTableV2/reducers/glTableReducer";
import dashboardSlice from "./pages/DashboardPage/dashboardSlice";
import { combineReducers } from "redux";

const reducers = {
  affiliateSlice: combineReducers({
    affiliatePage: affiliateSlice,
    affiliateTable: glTableReducer("affiliateTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.first_name} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  cartSlice: combineReducers({
    cartPage: cartSlice,
    cartTable: glTableReducer("cartTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.first_name} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
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
  paycheckSlice: combineReducers({
    paycheckPage: paycheckSlice,
    paycheckTable: glTableReducer("paycheckTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.artist} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  productSlice: productSlice,
  promoSlice: promoSlice,
  settingSlice: settingSlice,
  surveySlice: surveySlice,
  teamSlice: teamSlice,
  userSlice: combineReducers({
    userPage: userSlice,
    userTable: glTableReducer("userTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.first_name} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  [allRecordsApi.reducerPath]: allRecordsApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [placeOrderApi.reducerPath]: placeOrderApi.reducer,
  dashboardSlice: dashboardSlice,
  wholesalerSlice: wholesalerSlice,
  tutorialSlice: combineReducers({
    tutorialPage: tutorialSlice,
    tutorialTable: glTableReducer("tutorialTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = row.title;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  })
};

export default reducers;
