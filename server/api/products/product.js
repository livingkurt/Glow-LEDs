const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    first_name: { type: String },
    last_name: { type: String },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const optionValueSchema = new mongoose.Schema({
  name: { type: String }, // e.g., "Blue", "Large"
  colorCode: { type: String },
  filament: { type: mongoose.Schema.Types.ObjectId, ref: "Filament" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Link to product variations
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Link to product variations
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  isDefault: { type: Boolean, default: false },
  additionalCost: { type: Number, default: 0 },
});

export const optionSchema = new mongoose.Schema({
  name: { type: String }, // e.g., "Color", "Size"
  values: [optionValueSchema],
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  optionType: { type: String },
  replacePrice: { type: Boolean, default: false },
  isAddOn: { type: Boolean, default: false },
  details: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    name: { type: String, required: true },
    fact: { type: String },

    price: { type: Number },

    wholesale_price: { type: Number },
    wholesale_product: { type: Boolean, default: false },
    previous_price: { type: Number },
    short_description: { type: String },
    max_quantity: { type: Number, default: 30, required: true },
    count_in_stock: { type: Number, default: 30, required: true },
    finite_stock: { type: Boolean, default: false },

    options: [optionSchema], // Embed the options schema here

    restock_status: { type: String },
    pathname: { type: String },

    hero_video: {
      title: { type: String },
      description: { type: String },
      video: { type: String },
      hidden: { type: Boolean, default: false },
    },

    icon_specs: [
      {
        icon: { type: String },
        description: { type: String },
      },
    ],
    icon_specs_hidden: { type: Boolean, default: false },
    navigation_buttons_hidden: { type: Boolean, default: false },

    features: {
      image_grid_1: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          button_text: { type: String },
          link: { type: String },
        },
      ],
      image_grid_1_hidden: { type: Boolean, default: false },
      hero_image_1: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
      hero_fact_1: {
        title: { type: String },
        description: { type: String },
        hidden: { type: Boolean, default: false },
      },
      image_grid_2: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          button_text: { type: String },
          link: { type: String },
        },
      ],
      image_grid_2_hidden: { type: Boolean, default: false },
      hero_image_2: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
      hero_fact_2: {
        title: { type: String },
        description: { type: String },
        hidden: { type: Boolean, default: false },
      },
      lifestyle_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
      lifestyle_images_hidden: { type: Boolean, default: false },
    },

    not_sure: {
      title: { type: String },
      button_text: { type: String },
      link: { type: String },
      hidden: { type: Boolean, default: false },
    },
    tech_specs: {
      title: { type: String },
      navigation: [
        {
          title: { type: String },
          values: [
            {
              title: { type: String },
              description: { type: String },
            },
          ],
        },
      ],
      hidden: { type: Boolean, default: false },
    },
    in_the_box: {
      title: { type: String },
      items: [
        {
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          description: { type: String },
        },
      ],
      hidden: { type: Boolean, default: false },
    },
    elevate_your_experience: {
      title: { type: String },
      description: { type: String },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      hidden: { type: Boolean, default: false },
    },

    product_support: {
      quick_guide: { type: String },
      manual: { type: String },
      support_link: { type: String },
      tutorial_video: { type: String },
      hidden: { type: Boolean, default: false },
    },

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    category: { type: String, required: true },
    subcategory: { type: String },
    product_collection: { type: String },

    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5f2d7c0e9005a57059801ce8" }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],

    hidden: { type: Boolean, default: false },
    sale: {
      price: { type: Number, default: 0 },
      start_date: { type: Date },
      end_date: { type: Date },
    },

    seo: {
      meta_title: { type: String },
      meta_description: { type: String },
      meta_keywords: { type: String },
    },

    dimensions: {
      package_length: { type: Number },
      package_width: { type: Number },
      package_height: { type: Number },
      package_volume: { type: Number },
      product_length: { type: Number },
      product_width: { type: Number },
      product_height: { type: Number },
      weight_pounds: { type: Number },
      weight_ounces: { type: Number },
    },
    meta_data: {
      processing_time: { type: Array },
      material_cost: { type: Number },
      filament_used: { type: Number },
      printing_time: { type: Number },
      assembly_time: { type: Number },
    },
    order: { type: Number },

    // Is Variation
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null }, // Reference to parent product, if this is a variation
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isVariation: { type: Boolean, default: false }, // Flag to indicate if this is a variation
    color_object: {
      name: { type: String },
      code: { type: String },
      is_filament_color: { type: Boolean },
      filament: { type: mongoose.Schema.Types.ObjectId, ref: "Filament" },
    },
    size: { type: String },

    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    deleted: { type: Boolean, default: false },

    // ---------------------------
    // Depreciated
    // ---------------------------

    quantity: { type: Number, default: 30, required: true },
    sizing: { type: String },
    has_add_on: { type: Boolean, default: false },

    contributers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5f2d7c0e9005a57059801ce8" }],

    brand: { type: String, required: true },

    sale_price: { type: Number, default: 0 },
    sale_start_date: { type: Date },
    sale_end_date: { type: Date },

    facts: { type: String },

    description: { type: String },

    preorder: { type: Boolean, default: false },
    sold_out: { type: Boolean, default: false },

    meta_title: { type: String },
    meta_description: { type: String },
    meta_keywords: { type: String },

    processing_time: { type: Array },
    material_cost: { type: Number },
    filament_used: { type: Number },
    printing_time: { type: Number },
    assembly_time: { type: Number },

    color: { type: String },
    color_code: { type: String },

    secondary_images_object: { type: Array },

    images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    color_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    secondary_color_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    option_images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    item_group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    filament: { type: mongoose.Schema.Types.ObjectId, ref: "Filament" },
    has_add_on: { type: Boolean, default: false },

    color: { type: String },
    color_code: { type: String },
    size: { type: String },
    sizing: { type: String },
    // Depreciated
    item_group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // color_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    // secondary_color_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    // option_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    color_images: { type: Array },
    secondary_color_images: { type: Array },
    option_images: { type: Array },
    secondary_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],

    color_product_group: { type: Boolean, default: false },
    color_group_name: { type: String },
    color_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    secondary_color_product_group: { type: Boolean, default: false },
    secondary_color_group_name: { type: String },
    secondary_color_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    secondary_product_group: { type: Boolean, default: false },
    secondary_group_name: { type: String },
    secondary_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    option_product_group: { type: Boolean, default: false },
    option_group_name: { type: String },
    option_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    default_option: { type: Boolean, default: false },
    option: { type: Boolean, default: false },
    macro_product: { type: Boolean, default: false },
    extra_cost: { type: Number },

    package_length: { type: Number },
    package_width: { type: Number },
    package_height: { type: Number },
    package_volume: { type: Number },
    product_length: { type: Number },
    product_width: { type: Number },
    product_height: { type: Number },
    weight_pounds: { type: Number },
    weight_ounces: { type: Number },

    included_items: { type: String },

    categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subcategorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    video: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
