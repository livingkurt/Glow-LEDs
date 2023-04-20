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
import imageSlice from "./slices/imageSlice";

const reducers = {
  affiliates: combineReducers({
    affiliatePage: affiliateSlice,
    affiliateTable: glTableReducer("affiliateTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.first_name} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  carts: combineReducers({
    cartPage: cartSlice,
    cartTable: glTableReducer("cartTable", {
      sorting: [1, "asc"],
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.first_name} ${row.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  categorys: combineReducers({
    categoryPage: categorySlice,
    categoryTable: glTableReducer("categoryTable", {
      sorting: [0, "desc"],
      searchBy: (row: any, search: string) => {
        const searchableText = row.name;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  chips: chipSlice,
  contents: contentSlice,
  emails: emailSlice,
  expenses: expenseSlice,
  features: featureSlice,
  filaments: filamentSlice,
  orders: combineReducers({
    orderPage: orderSlice,
    orderTable: glTableReducer("orderTable", {
      sorting: [0, "asc"],
      nonTagFilters: ["order_status", "international"],
      availableFilters: {
        order_status: ["isPaid", "isManufactured", "isShipped", "isDelivered", "isPaused"],
        international: ["Yes", "No"]
      },
      searchBy: (row: any, search: string) => {
        const searchableText = `${row.shipping.first_name} ${row.shipping.last_name} ${row._id}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  palettes: paletteSlice,
  parcels: parcelSlice,
  paychecks: combineReducers({
    paycheckPage: paycheckSlice,
    paycheckTable: glTableReducer("paycheckTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = row.affiliate;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  images: combineReducers({
    imagePage: imageSlice,
    imageTable: glTableReducer("imageTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = row.album;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  products: combineReducers({
    productPage: productSlice,
    productTable: glTableReducer("productTable", {
      sorting: [3, "desc"],
      searchBy: (row: any, search: string) => {
        const searchableText = row.name;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  promos: promoSlice,
  settings: settingSlice,
  surveys: surveySlice,
  teams: teamSlice,
  users: combineReducers({
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
  dashboards: dashboardSlice,
  wholesalers: combineReducers({
    wholesalerPage: wholesalerSlice,
    wholesalerTable: glTableReducer("wholesalerTable", {
      searchBy: (row: any, search: string) => {
        const searchableText = `${row?.user?.first_name} ${row?.user?.last_name}}`;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  }),
  tutorials: combineReducers({
    tutorialPage: tutorialSlice,
    tutorialTable: glTableReducer("tutorialTable", {
      sorting: [3, "desc"],
      searchBy: (row: any, search: string) => {
        const searchableText = row.title;
        return searchableText.toLowerCase().includes(search.toLowerCase());
      }
    })
  })
};

export default reducers;
