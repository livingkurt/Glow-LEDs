import {
  affiliateSlice,
  cartSlice,
  microlightSlice,
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
  glowLedsSlice,
  surveySlice,
  teamSlice,
  userSlice,
  wholesalerSlice,
  tutorialSlice,
  shippingSlice,
  snackbarSlice,
  eventSlice,
  ticketSlice,
} from "./slices";

import tagSlice from "./slices/tagSlice";
import modeSlice from "./slices/modeSlice";
import { dashboardApi } from "./pages/DashboardPage/dashboardApi";
import { placeOrderApi } from "./pages/PlaceOrderPage/placeOrderApi";
import { allRecordsApi } from "./api/allRecordsApi";
import glTableReducer from "./shared/GlowLEDsComponents/GLTableV2/reducers/glTableReducer";
import dashboardSlice from "./pages/DashboardPage/dashboardSlice";
import { combineReducers } from "redux";
import imageSlice from "./slices/imageSlice";
import giftCardSlice from "./slices/giftCardSlice2";
import productPageSlice from "./pages/ProductPage/productPageSlice";
import placeOrderSlice from "./pages/PlaceOrderPage/placeOrderSlice";
import { affiliateApi, contentApi } from "./api";
import productsGridPageSlice from "./pages/ProductsGridPage/productsGridPageSlice";
import tutorialsGridPageSlice from "./pages/TutorialsGridPage/tutorialsGridPageSlice";
import articleSlice from "./slices/articleSlice";
import articlesGridPageSlice from "./pages/ArticlesGridPage/articlesGridPageSlice";
import productBundlesGridPageSlice from "./pages/ProductBundlesGridPage/productBundlesGridPageSlice";

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
    productBundlesGridPage: productBundlesGridPageSlice,
  }),
  tags: combineReducers({
    tagPage: tagSlice,
    tagTable: glTableReducer("tagTable", {
      sorting: [0, "desc"],
    }),
  }),
  microlights: combineReducers({
    microlightPage: microlightSlice,
    microlightTable: glTableReducer("microlightTable", {}),
  }),
  modes: combineReducers({
    modePage: modeSlice,
    modeTable: glTableReducer("modeTable", {
      sorting: [4, "desc"],
    }),
  }),
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
  events: combineReducers({
    eventPage: eventSlice,
    eventTable: glTableReducer("eventTable", {}),
    ticketHolders: glTableReducer("ticketHolders", {
      searchBy: (row, search) => row.firstName.toLowerCase().includes(search.toLowerCase()),
    }),
  }),
  tickets: combineReducers({
    ticketPage: ticketSlice,
    ticketTable: glTableReducer("ticketTable", {}),
  }),
  expenses: combineReducers({
    expensePage: expenseSlice,
    expenseTable: glTableReducer("expenseTable", {}),
  }),
  features: combineReducers({
    featurePage: featureSlice,
    featureTable: glTableReducer("featureTable", {}),
  }),
  filaments: combineReducers({
    filamentPage: filamentSlice,
    filamentTable: glTableReducer("filamentTable", { sorting: [0, "desc"] }),
  }),
  giftCards: combineReducers({
    giftCardPage: giftCardSlice,
    giftCardTable: glTableReducer("giftCardTable", {}),
  }),
  orders: combineReducers({
    orderPage: orderSlice,
    orderTable: glTableReducer("orderTable", {
      nonTagFilters: ["order_status", "shipping"],
    }),
  }),
  palettes: combineReducers({
    palettePage: paletteSlice,
    paletteTable: glTableReducer("paletteTable", {}),
  }),
  parcels: combineReducers({
    parcelPage: parcelSlice,
    parcelTable: glTableReducer("parcelTable", { sorting: [5, "asc"] }),
  }),
  paychecks: combineReducers({
    paycheckPage: paycheckSlice,
    paycheckTable: glTableReducer("paycheckTable", { sorting: [0, "asc"] }),
  }),
  images: combineReducers({
    imagePage: imageSlice,
    imageTable: glTableReducer("imageTable", {}),
  }),
  products: combineReducers({
    productsPage: productsPageSlice,
    productPage: productPageSlice,
    productsGridPage: productsGridPageSlice,
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
  glowLeds: glowLedsSlice,
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
  teams: combineReducers({
    teamPage: teamSlice,
    teamTable: glTableReducer("teamTable", {}),
  }),
  users: combineReducers({
    userPage: userSlice,
    userTable: glTableReducer("userTable", {
      sorting: [0, "asc"],
      nonTagFilters: ["affiliates", "guests", "employees", "admins", "wholesalers"],
    }),
  }),
  [allRecordsApi.reducerPath]: allRecordsApi.reducer,
  [affiliateApi.reducerPath]: affiliateApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [placeOrderApi.reducerPath]: placeOrderApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  snackbar: snackbarSlice,
  dashboards: dashboardSlice,
  wholesalers: combineReducers({
    wholesalerPage: wholesalerSlice,
    wholesalerTable: glTableReducer("wholesalerTable", {}),
  }),
  tutorials: combineReducers({
    tutorialPage: tutorialSlice,
    tutorialsGridPage: tutorialsGridPageSlice,
    tutorialTable: glTableReducer("tutorialTable", {
      sorting: [3, "desc"],
    }),
  }),
  articles: combineReducers({
    articlePage: articleSlice,
    articlesGridPage: articlesGridPageSlice,
    articleTable: glTableReducer("articleTable", {
      sorting: [3, "desc"],
    }),
  }),
};

export default reducers;
