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
  productsPageSlice,
  promoSlice,
  settingSlice,
  surveySlice,
  teamSlice,
  userSlice,
  wholesalerSlice,
  tutorialSlice,
  shippingSlice,
  snackbarSlice,
} from "./slices";

import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import { allRecordsApi } from "./api/allRecordsApi";
import glTableReducer from "./shared/GlowLEDsComponents/GLTableV2/reducers/glTableReducer";
import dashboardSlice from "./pages/DashboardPage/dashboardSlice";
import { combineReducers } from "redux";
import imageSlice from "./slices/imageSlice";
import productPageSlice from "./pages/ProductPage/productPageSlice";
import placeOrderSlice from "./pages/PlaceOrderPage/placeOrderSlice";

const reducers = {
  affiliates: combineReducers({
    affiliatePage: affiliateSlice,
    affiliateTable: glTableReducer("affiliateTable", {}),
  }),
  carts: combineReducers({
    cartPage: cartSlice,
    cartTable: glTableReducer("cartTable", {
      sorting: [1, "asc"],
    }),
  }),
  categorys: combineReducers({
    categoryPage: categorySlice,
    categoryTable: glTableReducer("categoryTable", {
      sorting: [0, "desc"],
    }),
  }),
  chips: chipSlice,
  contents: combineReducers({
    contentPage: contentSlice,
    contentTable: glTableReducer("contentTable", {}),
  }),
  emails: combineReducers({
    emailPage: emailSlice,
    emailTable: glTableReducer("emailTable", {
      sorting: [0, "asc"],
    }),
  }),
  expenses: combineReducers({
    expensePage: expenseSlice,
    expenseTable: glTableReducer("expenseTable", {}),
  }),
  features: featureSlice,
  filaments: combineReducers({
    filamentPage: filamentSlice,
    filamentTable: glTableReducer("filamentTable", {}),
  }),
  orders: combineReducers({
    orderPage: orderSlice,
    orderTable: glTableReducer("orderTable", {
      sorting: [0, "asc"],
      nonTagFilters: ["order_status", "shipping"],
    }),
  }),
  palettes: paletteSlice,
  parcels: parcelSlice,
  paychecks: combineReducers({
    paycheckPage: paycheckSlice,
    paycheckTable: glTableReducer("paycheckTable", {}),
  }),
  images: combineReducers({
    imagePage: imageSlice,
    imageTable: glTableReducer("imageTable", {}),
  }),
  products: combineReducers({
    productsPage: productsPageSlice,
    productPage: productPageSlice,
    productTable: glTableReducer("productTable", {
      sorting: [3, "desc"],
      nonTagFilters: ["category", "subcategory", "collection"],
    }),
  }),
  placeOrder: placeOrderSlice,
  promos: combineReducers({
    promoPage: promoSlice,
    promoTable: glTableReducer("promoTable", {}),
  }),
  settings: settingSlice,
  shipping: combineReducers({
    shippingPage: shippingSlice,
    shippingTable: glTableReducer("shippingTable", {
      sorting: [0, "desc"],
      searchBy: (row, search) => {
        const searchableText = row?.buyer_address.name || row?.buyer_address.company;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      },
    }),
  }),
  surveys: combineReducers({
    surveyPage: surveySlice,
    surveyTable: glTableReducer("surveyTable", {}),
  }),
  teams: teamSlice,
  users: combineReducers({
    userPage: userSlice,
    userTable: glTableReducer("userTable", {
      sorting: [0, "asc"],
      nonTagFilters: ["affiliates", "guests", "employees", "admins", "wholesalers"],
    }),
  }),
  [allRecordsApi.reducerPath]: allRecordsApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [placeOrderApi.reducerPath]: placeOrderApi.reducer,
  snackbar: snackbarSlice,
  dashboards: dashboardSlice,
  wholesalers: combineReducers({
    wholesalerPage: wholesalerSlice,
    wholesalerTable: glTableReducer("wholesalerTable", {}),
  }),
  tutorials: combineReducers({
    tutorialPage: tutorialSlice,
    tutorialTable: glTableReducer("tutorialTable", {
      sorting: [3, "desc"],
    }),
  }),
};

export default reducers;
