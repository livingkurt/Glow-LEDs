/* eslint-disable max-lines-per-function */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import axios from "axios";
import { errorMessage } from "../../helpers/sharedHelpers";

export const detailsProductPage = createAsyncThunk(
  "products/detailsProductPage",
  async ({ pathname, openEditModal }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${pathname}`);
      dispatch(showSuccess({ message: `Product Found` }));
      return { data, openEditModal };
    } catch (error) {
      dispatch(showError({ message: errorMessage(error) }));
      return rejectWithValue(error.response?.data);
    }
  }
);

const productPage = createSlice({
  name: "productPage",
  initialState: {
    name: "",
    description: "",
    facts: "",
    included_items: "",
    qty: 1,
    images: [],
    price: 0,
    wholesale_price: 0,
    previous_price: 0,
    sale_price: 0,
    size: "",
    quantity: 1,
    count_in_stock: 0,
    image: "",
    secondary_image: "",
    secondary_images: [],
    dimensions: {},
    color: "",
    secondary_color: "",
    color_code: "",
    secondary_color_code: "",
    color_product: null,
    color_products: [],
    secondary_color_product: null,
    secondary_color_products: [],
    option_product: null,
    option_products: [],
    secondary_product: null,
    secondary_products: [],
    preorder: false,
    secondary_product_name: "",
    option_product_name: "",
    color_product_object: {},
    secondary_color_product_object: {},
    option_product_object: {},
    secondary_product_object: {},
    show_add_on: false,
    add_on_price: 0,
    has_add_on: false,
    tabIndex: 0,
    review_modal: "none",
    rating: 5,
    comment: "",
    product: {},
    productPageLoading: true,
    customizedProduct: {
      name: "",
      description: "",
      images_object: [],
      facts: "",
      included_items: "",
      qty: 1,
      images: [],
      price: 0,
      previousPriceWithAddOn: 0,
      wholesale_price: 0,
      previous_price: 0,
      sale_price: 0,
      size: "",
      quantity: 1,
      count_in_stock: 0,
      image: "",
      secondary_image: "",
      secondary_images: [],
      dimensions: {},
      show_add_on: false,
      add_on_price: 0,
      setHasAddOn: false,
      tabIndex: 0,
      review_modal: "none",
      rating: 5,
      comment: "",
      selectedOptions: [],
    },
  },
  reducers: {
    setCustomizedProduct: (state, { payload }) => {
      const customizedProduct = payload;
      return {
        ...state,
        customizedProduct: { ...state.customizedProduct, ...customizedProduct },
      };
    },
    selectOption: (state, { payload }) => {
      const { selectedOption, index } = payload;

      if (Object.keys(selectedOption).length === 0) {
        state.customizedProduct.selectedOptions.splice(index, 1);
        const basePrice = state.product.price;
        // Calculate the additional cost from all selected options
        const additionalCost = state.customizedProduct.selectedOptions.reduce(
          (total, option) => total + (option?.additionalCost || 0),
          0
        );

        // Update the price with the base price and additional cost
        state.customizedProduct.price = basePrice + additionalCost;
      } else {
        state.customizedProduct.selectedOptions[index] = selectedOption;
        if (selectedOption?.product?.images_object.length > 0) {
          state.customizedProduct.images_object = selectedOption.product.images_object;
        }
        if (selectedOption?.product?.description) {
          state.customizedProduct.description = selectedOption.product.description;
        }
        if (selectedOption?.product?.facts) {
          state.customizedProduct.facts = selectedOption.product.facts;
        }
        // Handle price updates
        if (selectedOption?.replacePrice) {
          state.customizedProduct.price = selectedOption.product.price;
          state.customizedProduct.previousPriceWithAddOn = state.customizedProduct.price;
        } else {
          // Calculate the base price without additional costs
          const basePrice = state.product.price;

          // Initialize the previousPriceWithAddOn if it hasn't been set
          if (!state.customizedProduct.previousPriceWithAddOn) {
            state.customizedProduct.previousPriceWithAddOn = basePrice;
          }

          // Calculate the additional cost from all selected options
          const additionalCost = state.customizedProduct.selectedOptions.reduce(
            (total, option) => total + (option?.additionalCost || 0),
            0
          );

          // Update the price with the base price and additional cost
          state.customizedProduct.price = basePrice + additionalCost;
        }
        if (selectedOption?.product.qty || selectedOption?.product.quantity) {
          state.customizedProduct.quantity = selectedOption?.product.qty || selectedOption?.product.quantity;
        }
        if (selectedOption?.product.count_in_stock > 0) {
          state.customizedProduct.quantity = selectedOption?.product.count_in_stock;
        }
        if (selectedOption?.product.previous_price > 0) {
          state.customizedProduct.previous_price = selectedOption?.product.previous_price;
        }
      }
    },
    setHasAddOn: (state, { payload }) => {
      const { selectedOption, index } = payload;
      state.customizedProduct.selectedOptions[index] = selectedOption;
      state.setHasAddOn = payload;
    },
    set_name: (state, { payload }) => {
      state.name = payload;
    },
    setQty: (state, { payload }) => {
      state.qty = payload;
    },
    set_price: (state, { payload }) => {
      state.price = payload;
    },
    set_image: (state, { payload }) => {
      state.image = payload;
    },
    set_previous_price: (state, { payload }) => {
      state.previous_price = payload;
    },
    set_sale_price: (state, { payload }) => {
      state.sale_price = payload;
    },
    set_color_products: (state, { payload }) => {
      state.color_products = payload;
    },
    set_secondary_image: (state, { payload }) => {
      state.secondary_image = payload;
    },
    set_secondary_color_products: (state, { payload }) => {
      state.secondary_color_products = payload;
    },
    set_option_products: (state, { payload }) => {
      state.option_products = payload;
    },
    set_secondary_color: (state, { payload }) => {
      state.secondary_color = payload;
    },
    set_secondary_color_code: (state, { payload }) => {
      state.secondary_color_code = payload;
    },
    set_secondary_products: (state, { payload }) => {
      state.secondary_products = payload;
    },
    set_show_add_on: (state, { payload }) => {
      state.show_add_on = payload;
    },
    set_add_on_price: (state, { payload }) => {
      state.add_on_price = payload;
    },
    set_has_add_on: (state, { payload }) => {
      state.has_add_on = payload;
    },
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    setReviewModal: (state, { payload }) => {
      state.review_modal = payload;
    },
    setRating: (state, { payload }) => {
      state.rating = payload;
    },
    setComment: (state, { payload }) => {
      state.comment = payload;
    },
    update_color: (state, { payload }) => {
      const { color, color_code, images_object, _id, quantity, count_in_stock } = payload;
      state.color = color;
      state.color_code = color_code;
      if (images_object?.length > 0) {
        state.images = images_object || [];
        state.image = images_object?.[0]?.link || "";
      }
      state.color_product = _id;
      state.color_product_object = payload;
      state.quantity = quantity || state.quantity;
      state.count_in_stock = count_in_stock || state.count_in_stock;
    },
    update_secondary_color: (state, { payload }) => {
      const { option, product, has_add_on, show_add_on } = payload;
      state.secondary_color = option.color;
      state.secondary_color_code = option.color_code;
      state.secondary_image = option.images_object?.[0]?.link || "";
      state.secondary_images = option.images_object || [];
      state.secondary_color_product = option._id;
      state.secondary_color_product_object = option;
      state.quantity = option.quantity || state.quantity;
      state.count_in_stock = option.count_in_stock || state.count_in_stock;

      if (product.name === "CLOZD Omniskinz Sleds") {
        if (option.images_object?.length > 0) {
          state.image = option.images_object?.[0]?.link || "";
          state.images = option.images_object || [];
        }
      }

      if (has_add_on && show_add_on && product.name === "Capez") {
        state.add_on_price = option.price;
        state.price = option.price + product.price;
        state.sale_price = option.sale_price + product.price;
      }
    },
    update_option: (state, { payload }) => {
      const { option, current_user, has_add_on, show_add_on, add_on_price } = payload;
      state.size = option.size || state.size;
      state.preorder = option.count_in_stock === 0;
      state.quantity = option.quantity || state.quantity;
      state.count_in_stock = option.count_in_stock || state.count_in_stock;
      state.dimensions = {
        weight_pounds: option.weight_pounds,
        weight_ounces: option.weight_ounces,
        package_length: option.package_length,
        package_width: option.package_width,
        package_height: option.package_height,
        package_volume: option.package_volume,
      };
      state.option_product_object = option;
      state.option_product = option._id;
      state.option_product_name = option.name;

      if (option.subcategory !== "gloves") {
        if (option.images_object?.length > 0) {
          state.images = option.images_object || [];
          state.image = option.images_object?.[0]?.link || "";
        }
        state.description = option.description || state.description;
        state.facts = option.facts || state.facts;
        state.included_items = option.included_items || state.included_items;
      }

      if (option.price > 0) {
        if (current_user?.isWholesaler) {
          state.wholesale_price = option.wholesale_price;
        }
        state.price = has_add_on && show_add_on ? option.price + add_on_price : option.price;
        state.sale_price = has_add_on && show_add_on ? option.sale_price + add_on_price : option.sale_price;
      }
    },
    update_secondary: (state, { payload }) => {
      const { secondary, product, current_user } = payload;
      state.quantity = secondary.quantity || state.quantity;
      state.count_in_stock = secondary.count_in_stock || state.count_in_stock;
      state.secondary_product = secondary._id;
      state.secondary_product_name = secondary.name;
      state.secondary_product_object = secondary;

      if (secondary.subcategory !== "coin") {
        if (secondary.images_object?.length > 0) {
          state.images = secondary.images_object || [];
          state.image = secondary.images_object?.[0]?.link || "";
        }
        if (product.name !== "Diffuser Caps + Adapters Starter Kit V4" && product.name !== "CLOZD Omniskinz Sleds") {
          state.option_products = secondary.option_products || [];
        }
      }

      if (
        ["CLOZD Nanoskinz V2", "OPYN Nanoskinz V2", "Capez", "CLOZD Omniskinz", "CLOZD Omniskinz Sleds"].includes(
          product.name
        )
      ) {
        if (product.name !== "CLOZD Omniskinz Sleds") {
          state.color_products = secondary.color_products || [];
        }
        state.secondary_color_products = secondary.secondary_color_products || [];
      }

      if (product.category === "glowstringz") {
        if (current_user?.isWholesaler) {
          state.wholesale_price = secondary.wholesale_price;
        }
        state.price = secondary.price;
        state.sale_price = secondary.sale_price;
      }
    },
    update_color_product_state: (state, { payload }) => {
      const { color } = payload;
      state.color_product = color._id;
      state.color = color.color;
      state.color_code = color.color_code;
      state.color_product_object = color;
    },
    update_secondary_color_product_state: (state, { payload }) => {
      const { secondary_color } = payload;
      state.secondary_color_product = secondary_color._id;
      state.secondary_color = secondary_color.color;
      state.secondary_color_code = secondary_color.color_code;
      state.secondary_color_product_object = secondary_color;
    },
    update_option_product_state: (state, { payload }) => {
      const { option, current_user } = payload;
      state.size = option.size || state.size;
      state.secondary_color = option.secondary_color || state.secondary_color;
      state.preorder = option.count_in_stock === 0;
      state.quantity = option.quantity || state.quantity;
      state.count_in_stock = option.count_in_stock || state.count_in_stock;
      state.dimensions = {
        weight_pounds: option.weight_pounds,
        weight_ounces: option.weight_ounces,
        package_length: option.package_length,
        package_width: option.package_width,
        package_height: option.package_height,
        package_volume: option.package_volume,
      };
      state.option_product = option._id;
      state.option_product_name = option.name;
      state.option_product_object = option;

      if (option.price > 0) {
        if (current_user?.isWholesaler) {
          state.wholesale_price = option.wholesale_price;
        }
        state.price = option.price;
      }

      if (option.sale_price > 0) {
        state.sale_price = option.sale_price;
      }
    },
    update_secondary_product_state: (state, { payload }) => {
      const { secondary } = payload;
      state.secondary_product = secondary._id;
      state.secondary_product_name = secondary.name;
      state.secondary_product_object = secondary;
      state.quantity = secondary.quantity || state.quantity;
      state.count_in_stock = secondary.count_in_stock || state.count_in_stock;

      if (secondary.subcategory !== "batteries") {
        state.images = secondary.images_object || [];
        state.image = secondary.images_object?.[0]?.link || "";
      }
    },
    unset_state: state => {
      state.name = "";
      state.description = "";
      state.facts = "";
      state.included_items = "";
      state.qty = 1;
      state.images = [];
      state.price = 0;
      state.previous_price = 0;
      state.sale_price = 0;
      state.size = "";
      state.quantity = 1;
      state.count_in_stock = 0;
      state.image = "";
      state.secondary_image = "";
      state.secondary_images = [];
      state.dimensions = {};
      state.color = "";
      state.secondary_color = "";
      state.color_code = "";
      state.secondary_color_code = "";
      state.color_product = null;
      state.color_products = [];
      state.secondary_color_product = null;
      state.secondary_color_products = [];
      state.option_product = null;
      state.option_products = [];
      state.secondary_product = null;
      state.secondary_products = [];
      state.preorder = false;
      state.secondary_product_name = "";
      state.option_product_name = "";
      state.color_product_object = {};
      state.secondary_color_product_object = {};
      state.option_product_object = {};
      state.secondary_product_object = {};
      state.show_add_on = true;
      state.add_on_price = 0;
      state.has_add_on = false;
    },
    update_universal_state: (state, { payload }) => {
      const { item, current_user } = payload;
      state.previous_price = 0;
      state.image = item?.images_object?.[0]?.link || "";
      state.images = item?.images_object || [];
      state.quantity = item?.quantity || state.quantity;
      state.count_in_stock = item?.count_in_stock || state.count_in_stock;
      state.preorder = item?.count_in_stock === 0;
      state.name = item?.name || "";
      state.description = item?.description || "";
      state.facts = item?.facts || "";
      state.color = item?.color || "";
      state.secondary_color = item?.secondary_color || "";
      state.color_products = item?.color_products || [];
      state.secondary_color_products = item?.secondary_color_products || [];
      state.option_products = item?.option_products || [];
      state.secondary_products = item?.secondary_products || [];
      state.included_items = item?.included_items || "";
      state.has_add_on = item?.has_add_on || false;
      state.dimensions = {
        weight_pounds: item?.weight_pounds || 0,
        weight_ounces: item?.weight_ounces || 0,
        package_length: item?.package_length || 0,
        package_width: item?.package_width || 0,
        package_height: item?.package_height || 0,
        package_volume: item?.package_volume || 0,
      };
      state.size = item?.size || "";

      if (item?.price > 0) {
        if (current_user?.isWholesaler) {
          state.wholesale_price = item.wholesale_price;
        }
        state.price = item.price;
      }

      if (item?.sale_price > 0) {
        state.sale_price = item.sale_price;
      }

      if (item?.hasOwnProperty("previous_price") && item.previous_price > 0) {
        state.previous_price = item.previous_price;
      }
    },
    toggle_show_add_on: (state, { payload }) => {
      const { show_add_on, product, secondary_color_product_object } = payload;
      if (show_add_on) {
        state.secondary_color = "";
        state.secondary_color_code = "";
        state.secondary_image = "";
        state.price = product.price;
        state.sale_price = product.sale_price;
      } else {
        state.price = secondary_color_product_object.price + product.price;
        state.sale_price = secondary_color_product_object.sale_price + product.sale_price;
        if (secondary_color_product_object.sale_price > 0) {
          state.add_on_price = secondary_color_product_object.sale_price;
        } else {
          state.add_on_price = secondary_color_product_object.price;
        }
      }
      state.show_add_on = !show_add_on;
    },
  },
  extraReducers: {
    [detailsProductPage.pending]: (state, { payload }) => {
      state.productPageLoading = true;
    },
    [detailsProductPage.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      console.log({ options: payload?.options });
      return {
        ...state,
        productPageLoading: false,
        product: data,
        customizedProduct: {
          name: data.name,
          description: data.description,
          images_object: data.images_object,
          facts: data.facts,
          included_items: data.included_items,
          qty: data.qty,
          images: data.images,
          price: data.price,
          wholesale_price: data.wholesale_price,
          previous_price: data.previous_price,
          sale_price: data.sale_price,
          size: data.size,
          quantity: data.quantity,
          count_in_stock: data.count_in_stock,
          image: data.image,
          secondary_image: data.secondary_image,
          secondary_images: data.secondary_images,
          dimensions: data.dimensions,
          show_add_on: data.show_add_on,
          add_on_price: data.add_on_price,
          has_add_on: data.has_add_on,
          tabIndex: data.tabIndex,
          review_modal: data.review_modal,
          rating: data.rating,
          comment: data.comment,
          selectedOptions: data?.options?.map(option => ({
            isAddOn: option.isAddOn,
            ...option.values.find(value => value.isDefault),
          })),
        },
      };
    },
    [detailsProductPage.rejected]: (state, { payload }) => {
      state.productPageLoading = false;
      state.error = payload;
    },
  },
});

export const {
  set_name,

  setQty,
  toggle_show_add_on,
  set_price,
  set_image,
  set_previous_price,
  set_sale_price,

  set_secondary_image,
  set_color_products,
  set_secondary_color,
  set_secondary_color_products,
  set_option_products,
  set_secondary_color_code,

  set_secondary_products,

  set_show_add_on,
  set_add_on_price,
  set_has_add_on,
  setTabIndex,
  setReviewModal,
  setRating,
  setComment,
  update_color,
  update_secondary_color,
  update_option,
  update_secondary,
  update_color_product_state,
  update_secondary_color_product_state,
  update_option_product_state,
  update_secondary_product_state,
  unset_state,
  update_universal_state,
  setCustomizedProduct,
  selectOption,
  setHasAddOn,
} = productPage.actions;
export default productPage.reducer;
