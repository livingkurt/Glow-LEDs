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
    set_description: (state, { payload }) => {
      state.description = payload;
    },
    set_facts: (state, { payload }) => {
      state.facts = payload;
    },
    set_included_items: (state, { payload }) => {
      state.included_items = payload;
    },
    setQty: (state, { payload }) => {
      state.qty = payload;
    },
    set_images: (state, { payload }) => {
      state.images = payload;
    },
    set_price: (state, { payload }) => {
      state.price = payload;
    },
    set_wholesale_price: (state, { payload }) => {
      state.wholesale_price = payload;
    },
    set_previous_price: (state, { payload }) => {
      state.previous_price = payload;
    },
    set_sale_price: (state, { payload }) => {
      state.sale_price = payload;
    },
    set_size: (state, { payload }) => {
      state.size = payload;
    },
    set_quantity: (state, { payload }) => {
      state.quantity = payload;
    },
    set_count_in_stock: (state, { payload }) => {
      state.count_in_stock = payload;
    },
    set_image: (state, { payload }) => {
      state.image = payload;
    },
    set_secondary_image: (state, { payload }) => {
      state.secondary_image = payload;
    },
    set_secondary_images: (state, { payload }) => {
      state.secondary_images = payload;
    },
    set_dimensions: (state, { payload }) => {
      state.dimensions = payload;
    },
    set_color: (state, { payload }) => {
      state.color = payload;
    },
    set_secondary_color: (state, { payload }) => {
      state.secondary_color = payload;
    },
    set_color_code: (state, { payload }) => {
      state.color_code = payload;
    },
    set_secondary_color_code: (state, { payload }) => {
      state.secondary_color_code = payload;
    },
    set_color_product: (state, { payload }) => {
      state.color_product = payload;
    },
    set_color_products: (state, { payload }) => {
      state.color_products = payload;
    },
    set_secondary_color_product: (state, { payload }) => {
      state.secondary_color_product = payload;
    },
    set_secondary_color_products: (state, { payload }) => {
      state.secondary_color_products = payload;
    },
    set_option_product: (state, { payload }) => {
      state.option_product = payload;
    },
    set_option_products: (state, { payload }) => {
      state.option_products = payload;
    },
    set_secondary_product: (state, { payload }) => {
      state.secondary_product = payload;
    },
    set_secondary_products: (state, { payload }) => {
      state.secondary_products = payload;
    },
    set_preorder: (state, { payload }) => {
      state.preorder = payload;
    },
    set_secondary_product_name: (state, { payload }) => {
      state.secondary_product_name = payload;
    },
    set_option_product_name: (state, { payload }) => {
      state.option_product_name = payload;
    },
    set_color_product_object: (state, { payload }) => {
      state.color_product_object = payload;
    },
    set_secondary_color_product_object: (state, { payload }) => {
      state.secondary_color_product_object = payload;
    },
    set_option_product_object: (state, { payload }) => {
      state.option_product_object = payload;
    },
    set_secondary_product_object: (state, { payload }) => {
      state.secondary_product_object = payload;
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
  },
  extraReducers: {},
});

export const {
  set_name,
  set_description,
  set_facts,
  set_included_items,
  setQty,
  set_images,
  set_price,
  set_wholesale_price,
  set_previous_price,
  set_sale_price,
  set_size,
  set_quantity,
  set_count_in_stock,
  set_image,
  set_secondary_image,
  set_secondary_images,
  set_dimensions,
  set_color,
  set_secondary_color,
  set_color_code,
  set_secondary_color_code,
  set_color_product,
  set_color_products,
  set_secondary_color_product,
  set_secondary_color_products,
  set_option_product,
  set_option_products,
  set_secondary_product,
  set_secondary_products,
  set_preorder,
  set_secondary_product_name,
  set_option_product_name,
  set_color_product_object,
  set_secondary_color_product_object,
  set_option_product_object,
  set_secondary_product_object,
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
} = productPage.actions;
export default productPage.reducer;
