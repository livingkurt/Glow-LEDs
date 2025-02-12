import mongoose from "mongoose";

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
  active: { type: Boolean, default: true },
});

export const optionSchema = new mongoose.Schema({
  name: { type: String }, // e.g., "Color", "Size"
  values: [optionValueSchema],
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  optionType: { type: String },
  replacePrice: { type: Boolean, default: false },
  isAddOn: { type: Boolean, default: false },
  additionalCost: { type: Number, default: 0 },
  details: { type: String },
  active: { type: Boolean, default: true },
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
    max_display_quantity: { type: Number, default: 30, required: true },
    max_quantity: { type: Number, default: 30, required: true },
    count_in_stock: { type: Number, default: 30, required: true },
    finite_stock: { type: Boolean, default: false },

    options: [optionSchema], // Embed the options schema here

    pathname: { type: String },

    isPreOrder: { type: Boolean, default: false },
    preOrderReleaseDate: { type: Date },
    preOrderQuantity: { type: Number, default: 0 },

    hero_video: {
      title: { type: String },
      description: { type: String },
      video: { type: String },
      hidden: { type: Boolean, default: false },
    },
    hero_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },

    icon_specs: [
      {
        icon: { type: String },
        description: { type: String },
      },
    ],
    icon_specs_hidden: { type: Boolean, default: false },
    navigation: {
      navigation_buttons: [
        {
          label: { type: String },
          target: { type: String },
          hidden: { type: Boolean, default: false },
        },
      ],
      hidden: { type: Boolean, default: false },
    },
    title_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    themed_logo: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    line_break: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    pattern_tile: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    corner_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    subtitle_text: { type: String },

    primary_color: { type: String },
    secondary_color: { type: String },
    background_color: { type: String },
    header_text_color: { type: String },
    text_color: { type: String },
    navigation_buttons_hidden: { type: Boolean, default: true },
    features: {
      image_grid_1: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          text_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          button_text: { type: String },
          link: { type: String },
        },
      ],
      image_grid_1_hidden: { type: Boolean, default: false },
      hero_image_1: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
      hero_fact_1: {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        hidden: { type: Boolean, default: false },
      },
      image_grid_2: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          text_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          button_text: { type: String },
          link: { type: String },
        },
      ],
      image_grid_2_hidden: { type: Boolean, default: false },

      hero_fact_2: {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        hidden: { type: Boolean, default: false },
      },
      hero_image_2: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
      lifestyle_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
      lifestyle_images_hidden: { type: Boolean, default: false },
      hero_fact_3: {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        hidden: { type: Boolean, default: false },
      },
      hero_image_3: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
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
    featured_modes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mode" }],

    product_support: {
      quick_guide: { type: String },
      manual: { type: String },
      support_link: { type: String },
      tutorial_video: { type: String },
      hidden: { type: Boolean, default: false },
    },

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

    category: { type: String },
    subcategory: { type: String },
    product_collection: { type: String },

    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: "5f2d7c0e9005a57059801ce8" }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    release_date: { type: Date },

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
      processing_time: [{ type: Number }],
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
    set_of: { type: Number },

    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    microlights: [{ type: mongoose.Schema.Types.ObjectId, ref: "Microlight" }],
    isPasswordProtected: { type: Boolean, default: false },
    passwordProtection: {
      password: String,
      expirationDate: Date,
    },
    deleted: { type: Boolean, default: false },
    filament: { type: mongoose.Schema.Types.ObjectId, ref: "Filament" },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ pathname: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
