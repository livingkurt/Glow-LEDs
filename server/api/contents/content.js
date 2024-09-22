import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    name: { type: String },
    home_page: {
      slideshow: [
        {
          label: { type: String },
          fact: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          link: { type: String },
          button_text: { type: String },
        },
      ],
      slideshow_hidden: { type: Boolean, default: false },
      featured_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      learn_more_products: [
        {
          label: { type: String },
          fact: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          link: { type: String },
          button_text: { type: String },
        },
      ],
      learn_more_products_hidden: { type: Boolean, default: false },
      learn_highlights: {
        title: { type: String },
        description: { type: String },
        images_data: [
          {
            image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
            link: { type: String },
            label: { type: String },
          },
        ],
        link: { type: String },
        button_text: { type: String },
        hidden: { type: Boolean, default: false },
        fact: { type: String },
      },
      discover_more: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        hidden: { type: Boolean, default: false },
        link: { type: String },
      },
      get_more_out_of: {
        title: { type: String },
        description: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        hidden: { type: Boolean, default: false },
        link: { type: String },
      },
      support_banner: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        hidden: { type: Boolean, default: false },
        link: { type: String },
      },
      product_protection_details: [
        {
          title: { type: String },
          description: { type: String },
        },
      ],
      product_protection_details_hidden: { type: Boolean, default: false },

      hero_video: { type: String },
      hero_video_hidden: { type: Boolean },
    },
    banner: {
      label: { type: String },
      button: { type: String },
      link: { type: String },
      hidden: { type: Boolean, default: false },
    },
    about_page: {
      title: { type: String },
      subtitle: { type: String },
      video: { type: String },
      sections: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        },
      ],
      footer_title: { type: String },
    },
    products_grid_page: {
      title: { type: String },
      subtitle: { type: String },
      our_picks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      category_banners: [
        {
          title: { type: String },
          subtitle: { type: String },
          short_description: { type: String },
          fact: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          background_color: { type: String },
          tag: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        },
      ],
    },
    faq_page: {
      title: { type: String },
      sections: [
        {
          title: { type: String },
          subtitle: { type: String },
          description: { type: String },
          video: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          button_text: { type: String },
          button_link: { type: String },
          subsections: [
            {
              title: { type: String },
              description: { type: String },
              image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
              button_text: { type: String },
              button_link: { type: String },
            },
          ],
        },
      ],
    },
    links: [
      {
        label: { type: String },
        link: { type: String },
        icon: { type: String },
      },
    ],
    menus: [
      {
        name: { type: String },
        menu_items: [
          {
            label: { type: String },
            description: { type: String },
            image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
            link: { type: String },
          },
        ],
        pathname: { type: String },
      },
    ],
    free_shipping_minimum_amount: { type: Number },
    feature_flags: [
      {
        feature: { type: String },
        active: { type: Boolean, default: false },
      },
    ],
    active: { type: Boolean, default: true },
    learn: {
      articles: [
        {
          author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          title: { type: String },
          short_description: { type: String },
          content: { type: String },
          image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
          pathname: { type: String },
        },
      ],
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
