import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";
import { applyAmountOff, applyFreeShipping, applyPercentageOff, calculateNewItemsPrice } from "./placeOrderHelpers";

const initialState = {
  shipping_rates: {},
  current_shipping_speed: { rate: { list_rate: "", rate: "", speed: "" }, freeShipping: false },
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
  loadingPayment: false,
  itemsPrice: 0,
  tax_rate: 0,
  taxPrice: 0,
  taxRate: 0,
  totalPrice: 0,
  activePromoCodeIndicator: "",
  orderCompleted: false,
  shipping_choice: true,
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
  loadingShipping: false,
  loading_tax_rates: false,
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
  showSaveShippingModal: false,
  preOrderShippingPrice: 0,
  nonPreOrderShippingPrice: 0,
  environment: "production",
  shippingSaved: false,
  modalText: false,
  shippingValidations: {
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone_number: "",
  },
  splitOrder: false,
  showSplitOrderModal: false,
  isPreOrder: false,
  preOrderShippingRate: {},
  nonPreOrderShippingRate: {},
  currentPreOrderShippingSpeed: {},
  currentNonPreOrderShippingSpeed: {},
};

const placeOrder = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    set_hide_pay_button: (state, { payload }) => {
      state.hide_pay_button = payload;
    },

    set_paymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    set_create_account: (state, { payload }) => {
      state.create_account = payload;
    },

    set_show_shipping: (state, { payload }) => {
      state.show_shipping = payload;
    },

    set_is_guest: (state, { payload }) => {
      state.is_guest = payload;
    },

    set_shipping_completed: (state, { payload }) => {
      state.shipping_completed = payload;
    },
    set_shipping_choice: (state, { payload }) => {
      state.shipping_choice = payload;
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

    set_promo_code: (state, { payload }) => {
      state.promo_code = payload;
    },
    setLoadingPayment: (state, { payload }) => {
      state.loadingPayment = payload;
    },
    setItemsPrice: (state, { payload }) => {
      state.itemsPrice = payload;
    },

    setTaxPrice: (state, { payload }) => {
      state.taxPrice = payload;
    },
    setTotalPrice: (state, { payload }) => {
      state.totalPrice = payload;
    },

    set_user: (state, { payload }) => {
      state.user = payload;
    },

    set_tip: (state, { payload }) => {
      state.tip = payload;
    },

    set_error: (state, { payload }) => {
      state.error = payload;
      state.loadingPayment = false;
    },

    set_paid: (state, { payload }) => {
      state.paid = payload;
    },

    set_order_note: (state, { payload }) => {
      state.order_note = payload;
    },
    set_production_note: (state, { payload }) => {
      state.production_note = payload;
    },
    setLoadingShipping: (state, { payload }) => {
      state.loadingShipping = payload;
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

    openSaveShippingModal: (state, { payload }) => {
      state.showSaveShippingModal = true;
    },
    closeSaveShippingModal: (state, { payload }) => {
      state.showSaveShippingModal = false;
      state.shippingSaved = true;
    },
    setShippingSaved: (state, { payload }) => {
      state.shippingSaved = false;
    },
    setModalText: (state, { payload }) => {
      state.modalText = payload;
    },
    openProcessingTimeModal: (state, { payload }) => {
      state.shipping_rate = payload.rate;
      state.modalShown = true;
      state.open = true;
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
        state.show_promo_code = true;
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
      state.taxRate = parseFloat(tax_rate);
      state.shippingPrice = shippingPrice;
      state.totalPrice =
        tip === 0 || tip === "" || isNaN(tip)
          ? items_price + shippingPrice + state.taxPrice
          : items_price + shippingPrice + state.taxPrice + parseInt(tip);
      state.free_shipping_message = "------";
      state.activePromoCodeIndicator = "";
      if (shipping) {
        state.shippingPrice = previousShippingPrice;
      }
      state.show_promo_code_input_box = true;
    },
    activatePromo: (state, { payload }) => {
      const { tax_rate, activePromoCodeIndicator, validPromo, cartItems, current_user } = payload;

      const totalEligibleForDiscount = calculateNewItemsPrice({
        cartItems,
        validPromo,
        isWholesaler: current_user?.isWholesaler,
      });

      if (validPromo) {
        if (activePromoCodeIndicator) {
          state.promo_code_validations = "Can only use one promo code at a time";
        } else {
          if (validPromo.percentage_off) {
            applyPercentageOff(state, totalEligibleForDiscount, validPromo, tax_rate);
          } else if (validPromo.amount_off) {
            applyAmountOff(state, totalEligibleForDiscount, validPromo, tax_rate);
          }

          if (validPromo.free_shipping) {
            applyFreeShipping(state, validPromo);
          }

          state.show_promo_code_input_box = false;
        }
      } else {
        state.promo_code_validations = "Promo Code Not Found";
      }
    },

    re_choose_shipping_rate: (state, { payload }) => {
      const { splitOrder, isPreOrder } = payload || {};

      if (splitOrder) {
        if (isPreOrder) {
          state.preOrderShippingPrice = 0;
          state.preOrderShippingRate = null;
        } else {
          state.nonPreOrderShippingPrice = 0;
          state.nonPreOrderShippingRate = null;
        }
        state.shippingPrice = (state.preOrderShippingPrice || 0) + (state.nonPreOrderShippingPrice || 0);
      } else {
        state.shippingPrice = 0;
        state.previousShippingPrice = 0;
        state.shipping_rate = {};
      }

      state.hide_pay_button = true;
      state.free_shipping_message = "------";
      state.show_payment = false;
    },
    setShippingValidation: (state, { payload }) => {
      const { errors } = payload;
      state.shippingValidations = errors;
    },
    setTempShippingRate: (state, { payload }) => {
      state.shipping_rate = payload;
    },
    setFreeShipping: (state, { payload }) => {
      state.hide_pay_button = false;
      state.shippingPrice = 0;
      state.free_shipping_message = "Free";
      state.loadingShipping = false;
      state.show_shipping_complete = true;
    },
    chooseShippingRateBasic: (state, { payload }) => {
      const { rate, freeShipping, shipping, isPreOrder, friendlyCarrierService } = payload;

      console.log({ friendlyCarrierService });
      if (freeShipping) {
        state.shippingPrice = 0;
        state.free_shipping_message = "Free";
        state.loadingShipping = false;
        state.show_shipping_complete = true;
      } else {
        const shippingPrice = parseFloat(shipping.international ? rate.rate : rate.list_rate || rate.rate);
        if (state.splitOrder) {
          if (isPreOrder) {
            state.preOrderShippingPrice = shippingPrice;
            state.preOrderShippingRate = rate;
            state.currentPreOrderShippingSpeed = { rate, freeShipping, friendlyCarrierService };
          } else {
            state.nonPreOrderShippingPrice = shippingPrice;
            state.nonPreOrderShippingRate = rate;
            state.currentNonPreOrderShippingSpeed = { rate, freeShipping, friendlyCarrierService };
          }
          state.shippingPrice = (state.preOrderShippingPrice || 0) + (state.nonPreOrderShippingPrice || 0);
        } else {
          state.shippingPrice = shippingPrice;
        }
        state.previousShippingPrice = state.shippingPrice;
      }

      if (!state.splitOrder || (state.preOrderShippingRate && state.nonPreOrderShippingRate)) {
        state.hide_pay_button = false;
        state.show_shipping_complete = true;
        state.current_shipping_speed = { rate, freeShipping };
        state.shipping_rate = rate;
      }
    },
    chooseShippingRateWithPromo: (state, { payload }) => {
      const { promo_code_storage } = payload;
      state.promo_code = promo_code_storage.toLowerCase();
      state.show_promo_code = true;
      state.activePromoCodeIndicator = promo_code_storage;
      state.show_promo_code_input_box = false;
    },
    setPreOrderShippingRate: (state, { payload }) => {
      state.preOrderShippingRate = payload;
    },
    setNonPreOrderShippingRate: (state, { payload }) => {
      state.nonPreOrderShippingRate = payload;
    },
    finalizeShippingRate: state => {
      if (state.splitOrder) {
        if (state.preOrderShippingRate && state.nonPreOrderShippingRate) {
          state.shippingPrice =
            parseFloat(state.preOrderShippingRate.rate) + parseFloat(state.nonPreOrderShippingRate.rate);
          state.hide_pay_button = false;
          state.show_shipping_complete = true;
        }
      } else {
        state.hide_pay_button = false;
        state.show_shipping_complete = true;
      }
    },
    hiddenCheckoutButton: state => {
      state.hideCheckoutButton = true;
    },
    setPaymentValidations: (state, { payload }) => {
      state.paymentValidations = payload;
      state.loadingPayment = false;
    },
    clearValidations: (state, { payload }) => {
      state.paymentValidations = "";
      state.loadingPayment = false;
      state.error = null;
      state.hideCheckoutButton = false;
    },
    clearShippingRates: (state, { payload }) => {
      state.shipping_rates = {};
      state.shipment_id = "";
      state.parcel = "";
      state.current_shipping_speed = { rate: { list_rate: "", rate: "", speed: "" }, freeShipping: false };
    },
    initializePlaceOrderPage: state => {
      return initialState;
    },
    setServiceFee: (state, { payload }) => {
      state.serviceFee = payload;
    },
    setSplitOrder: (state, { payload }) => {
      state.splitOrder = payload;
    },
    openSplitOrderModal: (state, { payload }) => {
      state.showSplitOrderModal = true;
    },
    closeSplitOrderModal: (state, { payload }) => {
      state.showSplitOrderModal = false;
    },
  },
  extraReducers: {
    [API.shippingRates.pending]: (state, { payload }) => {
      state.loadingShipping = true;
    },
    [API.shippingRates.fulfilled]: (state, { payload }) => {
      const { splitOrder, data } = payload;
      if (splitOrder) {
        state.preOrderRates = data.preOrderRates;
        state.nonPreOrderRates = data.nonPreOrderRates;
      } else {
        state.shipping_rates = data.shipment;
        state.shipment_id = data.shipment?.id;
        state.parcel = data.parcel?._id;
      }
      state.loadingShipping = false;
    },
    [API.shippingRates.rejected]: (state, { payload, error }) => {
      state.loadingShipping = false;
      state.error_shipping = payload ? payload.error : error.message;
      state.error_happened = true;
    },
    [API.getTaxRates.pending]: state => {
      state.loading_tax_rates = true;
      state.taxPrice = 0;
    },
    [API.getTaxRates.fulfilled]: (state, { payload }) => {
      state.loading_tax_rates = false;
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
    [API.getTaxRates.rejected]: (state, { payload, error }) => {
      state.loading_tax_rates = false;
      state.error = payload ? payload.error : error.message;
    },

    [API.placeOrder.pending]: (state, { payload }) => {
      state.loadingPayment = true;
      state.hideCheckoutButton = true;
    },
    [API.placeOrder.fulfilled]: (state, { payload }) => {
      state.loadingPayment = false;
      state.orderCompleted = true;
      state.paymentValidations = payload.message;
    },
    [API.placeOrder.rejected]: (state, { payload, error }) => {
      state.loadingPayment = false;
    },
    [API.validatePromoCode.fulfilled]: (state, { payload }) => {
      state.promo_code_validations = payload.errors.promo_code;
    },

    [API.sendCodeUsedEmail.fulfilled]: (state, { payload }) => {
      state.promo_code = "";
    },
  },
});

export const {
  set_hide_pay_button,
  set_paymentMethod,
  set_create_account,
  set_show_shipping,
  set_is_guest,
  set_shipping_completed,
  set_password,
  set_new_password,
  setEmailValidations,
  setPasswordValidations,
  set_promo_code,
  setLoadingPayment,
  setItemsPrice,
  setTaxPrice,
  setTotalPrice,
  setServiceFee,
  set_user,
  set_tip,
  set_error,
  set_paid,
  set_order_note,
  set_production_note,
  setLoadingShipping,
  set_promo_code_validations,
  set_email,
  setValue,
  setOpen,
  setModalShown,
  openSaveShippingModal,
  closeSaveShippingModal,
  nextStep,
  showHideSteps,
  removePromo,
  activatePromo,
  re_choose_shipping_rate,
  setShippingValidation,
  setFreeShipping,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  hiddenCheckoutButton,
  setPaymentValidations,
  clearValidations,
  setShippingSaved,
  setModalText,
  setTempShippingRate,
  openProcessingTimeModal,
  clearShippingRates,
  initializePlaceOrderPage,
  set_shipping_choice,
  setSplitOrder,
  openSplitOrderModal,
  closeSplitOrderModal,
  setPreOrderShippingRate,
  setNonPreOrderShippingRate,
} = placeOrder.actions;

export default placeOrder.reducer;
