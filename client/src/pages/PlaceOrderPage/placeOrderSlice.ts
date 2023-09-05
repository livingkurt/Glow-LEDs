import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const initialState = {
  shipping_rates: {},
  current_shipping_speed: { rate: { retail_rate: "", rate: "", speed: "" }, speed: "", name: "" },
  shipment_id: "",
  shipping_rate: {},
  hide_pay_button: true,
  parcel: "",
  paymentMethod: "stripe",
  create_account: false,
  show_email: true,
  show_shipping: false,
  show_payment: false,
  is_guest: true,
  email_completed: false,
  shipping_completed: false,
  payment_completed: false,
  password: "",
  new_password: "",
  email_validations: "",
  password_validations: "",
  shippingPrice: 0,
  previousShippingPrice: 0,
  promo_code: "",
  loading_payment: false,
  itemsPrice: 0,
  tax_rate: 0,
  taxPrice: 0,
  totalPrice: 0,
  show_message: "",
  user: {},
  free_shipping_message: "------",
  loading: false,
  show_promo_code: false,
  show_promo_code_input_box: true,
  tip: 0,
  error_happened: false,
  error: null,
  error_shipping: null,
  paid: false,
  loading_checkboxes: true,
  order_note: "",
  production_note: "",
  loading_shipping: false,
  show_shipping_complete: false,
  promo_code_validations: "",
  email: "",
  value: "",
  open: false,
  modalShown: false,
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  international: false,
  save_user_shipping: false,
  first_name_validations: "",
  last_name_validations: "",
  address_validations: "",
  city_validations: "",
  state_validations: "",
  postal_code_validations: "",
  country_validations: "",
  international_validations: "",
  agree: false,
  show_modal: false,
  hideCheckoutButton: false,
  paymentValidations: "",
  shippingValidations: {
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};

const placeOrder = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    set_shipping_rates: (state, { payload }) => {
      state.shipping_rates = payload;
    },
    set_current_shipping_speed: (state, { payload }) => {
      state.current_shipping_speed = payload;
    },
    set_shipment_id: (state, { payload }) => {
      state.shipment_id = payload;
    },
    set_shipping_rate: (state, { payload }) => {
      state.shipping_rate = payload;
    },
    set_hide_pay_button: (state, { payload }) => {
      state.hide_pay_button = payload;
    },
    set_parcel: (state, { payload }) => {
      state.parcel = payload;
    },
    set_paymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    set_create_account: (state, { payload }) => {
      state.create_account = payload;
    },
    set_show_email: (state, { payload }) => {
      state.show_email = payload;
    },
    set_show_shipping: (state, { payload }) => {
      state.show_shipping = payload;
    },
    set_show_payment: (state, { payload }) => {
      state.show_payment = payload;
    },
    set_is_guest: (state, { payload }) => {
      state.is_guest = payload;
    },
    set_email_completed: (state, { payload }) => {
      state.email_completed = payload;
    },
    set_shipping_completed: (state, { payload }) => {
      state.shipping_completed = payload;
    },
    set_payment_completed: (state, { payload }) => {
      state.payment_completed = payload;
    },
    set_password: (state, { payload }) => {
      state.password = payload;
    },
    set_new_password: (state, { payload }) => {
      state.new_password = payload;
    },
    setEmailValidations: (state, { payload }) => {
      state.email_validations = payload;
    },
    setPasswordValidations: (state, { payload }) => {
      state.password_validations = payload;
    },
    setShippingPrice: (state, { payload }) => {
      state.shippingPrice = payload;
    },
    setPreviousShippingPrice: (state, { payload }) => {
      state.previousShippingPrice = payload;
    },
    set_promo_code: (state, { payload }) => {
      state.promo_code = payload;
    },
    set_loading_payment: (state, { payload }) => {
      state.loading_payment = payload;
    },
    setItemsPrice: (state, { payload }) => {
      state.itemsPrice = payload;
    },
    set_tax_rate: (state, { payload }) => {
      state.tax_rate = payload;
    },
    setTaxPrice: (state, { payload }) => {
      state.taxPrice = payload;
    },
    setTotalPrice: (state, { payload }) => {
      state.totalPrice = payload;
    },
    set_show_message: (state, { payload }) => {
      state.show_message = payload;
    },
    set_user: (state, { payload }) => {
      state.user = payload;
    },
    set_free_shipping_message: (state, { payload }) => {
      state.free_shipping_message = payload;
    },
    set_loading: (state, { payload }) => {
      state.loading = payload;
    },
    set_show_promo_code: (state, { payload }) => {
      state.show_promo_code = payload;
    },
    set_show_promo_code_input_box: (state, { payload }) => {
      state.show_promo_code_input_box = payload;
    },
    set_tip: (state, { payload }) => {
      state.tip = payload;
    },
    set_error_happened: (state, { payload }) => {
      state.error_happened = payload;
    },
    set_error: (state, { payload }) => {
      state.error = payload;
      state.loading_payment = false;
    },
    set_error_shipping: (state, { payload }) => {
      state.error_shipping = payload;
    },
    set_paid: (state, { payload }) => {
      state.paid = payload;
    },
    set_loading_checkboxes: (state, { payload }) => {
      state.loading_checkboxes = payload;
    },
    set_order_note: (state, { payload }) => {
      state.order_note = payload;
    },
    set_production_note: (state, { payload }) => {
      state.production_note = payload;
    },
    set_loading_shipping: (state, { payload }) => {
      state.loading_shipping = payload;
    },
    set_show_shipping_complete: (state, { payload }) => {
      state.show_shipping_complete = payload;
    },
    set_promo_code_validations: (state, { payload }) => {
      state.promo_code_validations = payload;
    },
    set_email: (state, { payload }) => {
      state.email = payload;
    },
    setValue: (state, { payload }) => {
      state.value = payload;
    },
    setOpen: (state, { payload }) => {
      state.open = payload;
    },
    setModalShown: (state, { payload }) => {
      state.modalShown = payload;
    },
    set_first_name: (state, { payload }) => {
      state.first_name = payload;
    },
    set_last_name: (state, { payload }) => {
      state.last_name = payload;
    },
    set_address_1: (state, { payload }) => {
      state.address_1 = payload;
    },
    set_address_2: (state, { payload }) => {
      state.address_2 = payload;
    },
    setCity: (state, { payload }) => {
      state.city = payload;
    },
    setState: (state, { payload }) => {
      state.state = payload;
    },
    setPostalCode: (state, { payload }) => {
      state.postalCode = payload;
    },
    setCountry: (state, { payload }) => {
      state.country = payload;
    },
    setInternational: (state, { payload }) => {
      state.international = payload;
    },
    set_save_user_shipping: (state, { payload }) => {
      state.save_user_shipping = payload;
    },
    set_show_modal: (state, { payload }) => {
      state.show_modal = payload;
    },
    set_first_name_validations: (state, { payload }) => {
      state.first_name_validations = payload;
    },
    set_last_name_validations: (state, { payload }) => {
      state.last_name_validations = payload;
    },
    set_address_validations: (state, { payload }) => {
      state.address_validations = payload;
    },
    set_city_validations: (state, { payload }) => {
      state.city_validations = payload;
    },
    set_state_validations: (state, { payload }) => {
      state.state_validations = payload;
    },
    set_postal_code_validations: (state, { payload }) => {
      state.postal_code_validations = payload;
    },
    set_country_validations: (state, { payload }) => {
      state.country_validations = payload;
    },
    set_international_validations: (state, { payload }) => {
      state.international_validations = payload;
    },
    set_agree: (state, { payload }) => {
      state.agree = payload;
    },
    nextStep: (state, { payload }) => {
      if (payload === "email") {
        state.show_email = true;
        state.show_shipping = false;
        state.show_payment = false;
        state.shipping_completed = true;
      }
      if (payload === "shipping") {
        state.show_shipping = true;
        state.show_email = false;
        state.show_payment = false;
        state.email_completed = true;
        state.shipping_completed = true;
        state.email_validations = "";
      }
      if (payload === "payment") {
        state.show_payment = true;
        state.show_shipping = false;
        state.show_email = false;
        state.shipping_completed = true;
        state.show_shipping_complete = false;
      }
      if (payload === "review") {
        state.show_payment = false;
        state.show_shipping = false;
        state.show_email = false;
        state.payment_completed = true;
      }
    },
    showHideSteps: (state, { payload }) => {
      if (payload === "email") {
        state.show_email = true;
        state.show_shipping = false;
        state.show_payment = false;
        state.shipping_completed = false;
        state.payment_completed = false;
      }
      if (payload === "shipping") {
        state.show_shipping = true;
        state.show_email = false;
        state.show_payment = false;
        state.payment_completed = false;
      }
      if (payload === "payment") {
        state.show_payment = true;
        state.show_shipping = false;
        state.show_email = false;
        state.shipping_completed = false;
        state.payment_completed = false;
      }
      if (payload === "review") {
        state.show_payment = false;
        state.show_shipping = false;
        state.show_email = false;
      }
    },
    removePromo: (state, { payload }) => {
      const { items_price, tax_rate, shippingPrice, tip, previousShippingPrice, shipping } = payload;

      state.itemsPrice = items_price;
      state.taxPrice = tax_rate * items_price;
      state.shippingPrice = shippingPrice;
      state.totalPrice =
        tip === 0 || tip === "" || isNaN(tip)
          ? items_price + shippingPrice + state.taxPrice
          : items_price + shippingPrice + state.taxPrice + parseInt(tip);
      state.free_shipping_message = "";
      state.show_message = "";
      if (shipping) {
        state.shippingPrice = previousShippingPrice;
      }
      state.show_promo_code_input_box = true;
    },
    activatePromo: (state, { payload }) => {
      const { items_price, tax_rate, promo_excluded, code, promos, show_message } = payload;
      const promo = promos.find((promo: any) => promo.promo_code === code.toLowerCase());

      if (promo) {
        if (show_message) {
          state.promo_code_validations = "Can only use one promo code at a time";
        } else {
          if (promo.percentage_off) {
            if (items_price === promo_excluded) {
              state.promo_code_validations = "All Items Excluded from Promo";
              return;
            }
            const newItemsPrice = items_price - (items_price - promo_excluded) * (promo.percentage_off / 100);
            state.itemsPrice = newItemsPrice;
            state.taxPrice = tax_rate * newItemsPrice;
            state.show_message = `${promo.promo_code.toUpperCase()} ${promo.percentage_off}% Off`;
          } else if (promo.amount_off) {
            if (promo.amount_off > items_price) {
              state.itemsPrice = 0;
              state.taxPrice = 0;
            } else {
              const newItemsPrice = items_price - promo.amount_off;
              state.itemsPrice = newItemsPrice;
              state.taxPrice = tax_rate * newItemsPrice;
            }
            state.show_message = `${promo.promo_code.toUpperCase()} $${promo.amount_off} Off`;
          }

          if (promo.free_shipping) {
            state.shippingPrice = 0;
            state.free_shipping_message = "Free";
            state.show_message = `${promo.promo_code.toUpperCase()} Free Shipping`;
          }

          state.show_promo_code_input_box = false;
        }
      }
    },
    choose_shipping_rate: (state, { payload }) => {
      const { rate, speed, name, promo_code_storage } = payload;

      state.shippingPrice = parseFloat(rate.retail_rate || rate.rate);
      state.previousShippingPrice = parseFloat(rate.retail_rate || rate.rate);
      state.hide_pay_button = false;
      state.shipping_rate = rate;
      state.current_shipping_speed = { rate, speed, name };
      state.show_promo_code = true;
      state.show_shipping_complete = true;

      if (promo_code_storage && promo_code_storage.length > 0) {
        state.promo_code = promo_code_storage.toLowerCase();
        state.show_promo_code = true;
        state.show_message = promo_code_storage;
        state.show_promo_code_input_box = false;
        // Call activatePromo logic here if needed
      }
    },
    re_choose_shipping_rate: state => {
      state.shippingPrice = 0;
      state.previousShippingPrice = 0;
      state.hide_pay_button = true;
      state.shipping_rate = {};
      state.show_payment = false;
    },
    // initializeShippingDetails: (state, { payload }) => {
    //   const { email, first_name, last_name, address_1, address_2, city, state, postalCode, country, international } = payload;
    //   state.email = email;
    //   state.first_name = first_name;
    //   state.last_name = last_name;
    //   state.address_1 = address_1;
    //   state.address_2 = address_2;
    //   state.city = city;
    //   state.state = state;
    //   state.postalCode = postalCode;
    //   state.country = country;
    //   state.international = international;
    //   if (international) {
    //     state.verify_shipping = false;
    //   }
    // },
    setShippingValidation: (state, { payload }) => {
      const { errors } = payload;
      state.shippingValidations = errors;
    },
    setFreeShipping: (state, { payload }) => {
      state.loading = false;
      state.hide_pay_button = false;
      state.shippingPrice = 0;
      state.free_shipping_message = "Free";
      state.loading_shipping = false;
      state.show_shipping_complete = true;
    },
    chooseShippingRateBasic: (state, { payload }) => {
      const { rate, speed, name } = payload;
      state.shippingPrice = parseFloat(rate.retail_rate || rate.rate);
      state.previousShippingPrice = parseFloat(rate.retail_rate || rate.rate);
      state.hide_pay_button = false;
      state.shipping_rate = rate;
      state.current_shipping_speed = { rate, speed, name };
    },
    chooseShippingRateWithPromo: (state, { payload }) => {
      const { promo_code_storage } = payload;
      state.promo_code = promo_code_storage.toLowerCase();
      state.show_promo_code = true;
      state.show_message = promo_code_storage;
      state.show_promo_code_input_box = false;
    },
    finalizeShippingRate: state => {
      state.show_promo_code = true;
      state.show_shipping_complete = true;
    },
    hiddenCheckoutButton: state => {
      state.hideCheckoutButton = true;
    },
    setPaymentValidations: (state, { payload }) => {
      state.paymentValidations = payload;
      state.loading_payment = false;
    },
    clearValidations: (state, { payload }) => {
      state.paymentValidations = "";
      state.loading_payment = false;
      state.error = null;
      state.hideCheckoutButton = false;
    },
  },
  extraReducers: {
    [API.shippingRates.pending as any]: (state: any, { payload }: any) => {
      state.loading_shipping = true;
    },
    [API.shippingRates.fulfilled as any]: (state: any, { payload }: any) => {
      state.loading_shipping = false;
      state.shipping_rates = payload.shipment;
      state.shipment_id = payload.shipment.id;
      state.parcel = payload.parcel._id;
    },
    [API.shippingRates.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading_shipping = false;
      state.error_shipping = payload ? payload.error : error.message;
      state.error_happened = true;
    },
    [API.getTaxRates.pending as any]: state => {
      state.loading = true;
      state.taxPrice = 0;
    },
    [API.getTaxRates.fulfilled as any]: (state, { payload }) => {
      state.loading = false;
      const { tax_rate, shipping, itemsPrice } = payload;
      state.tax_rate = tax_rate;
      if (!isNaN(tax_rate)) {
        if (shipping.international) {
          state.taxPrice = 0;
        } else {
          state.taxPrice = tax_rate * itemsPrice;
        }
      }
    },
    [API.getTaxRates.rejected as any]: (state, { payload, error }) => {
      state.loading = false;
      state.error = payload ? payload.error : error.message;
    },

    [API.createPayOrder.fulfilled as any]: (state: any, { payload }: any) => {
      return initialState;
    },
    [API.createPayOrder.rejected as any]: (state: any, { payload, error }: any) => {
      state.loading = false;
      state.paymentValidations = payload.message;
    },
  },
});

export const {
  set_shipping_rates,
  set_current_shipping_speed,
  set_shipment_id,
  set_shipping_rate,
  set_hide_pay_button,
  set_parcel,
  set_paymentMethod,
  set_create_account,
  set_show_email,
  set_show_shipping,
  set_show_payment,
  set_is_guest,
  set_email_completed,
  set_shipping_completed,
  set_payment_completed,
  set_password,
  set_new_password,
  setEmailValidations,
  setPasswordValidations,
  setShippingPrice,
  setPreviousShippingPrice,
  set_promo_code,
  set_loading_payment,
  setItemsPrice,
  set_tax_rate,
  setTaxPrice,
  setTotalPrice,
  set_show_message,
  set_user,
  set_free_shipping_message,
  set_loading,
  set_show_promo_code,
  set_show_promo_code_input_box,
  set_tip,
  set_error_happened,
  set_error,
  set_error_shipping,
  set_paid,
  set_loading_checkboxes,
  set_order_note,
  set_production_note,
  set_loading_shipping,
  set_show_shipping_complete,
  set_promo_code_validations,
  set_email,
  setValue,
  setOpen,
  setModalShown,
  set_first_name,
  set_last_name,
  set_address_1,
  set_address_2,
  setCity,
  setState,
  setPostalCode,
  setCountry,
  setInternational,
  set_save_user_shipping,
  set_show_modal,
  set_first_name_validations,
  set_last_name_validations,
  set_address_validations,
  set_city_validations,
  set_state_validations,
  set_postal_code_validations,
  set_country_validations,
  set_international_validations,
  set_agree,
  nextStep,
  showHideSteps,
  removePromo,
  activatePromo,
  choose_shipping_rate,
  re_choose_shipping_rate,
  setShippingValidation,
  setFreeShipping,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  hiddenCheckoutButton,
  setPaymentValidations,
  clearValidations,
} = placeOrder.actions;

export default placeOrder.reducer;
