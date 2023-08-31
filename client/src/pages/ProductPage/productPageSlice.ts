/* eslint-disable max-lines-per-function */

import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
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
      state.images = images_object || [];
      state.image = images_object?.[0]?.link || "";
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
        state.image = option.images_object?.[0]?.link || "";
        state.images = option.images_object || [];
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
        state.images = option.images_object || [];
        state.image = option.images_object?.[0]?.link || "";
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
        state.images = secondary.images_object || [];
        state.image = secondary.images_object?.[0]?.link || "";
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
  },
  extraReducers: {},
});

export const {
  set_name,

  setQty,

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
} = productPage.actions;
export default productPage.reducer;
