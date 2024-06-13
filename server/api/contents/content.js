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
        fact: { type: String },
      },
      discover_more: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        link: { type: String },
      },
      get_more_out_of: {
        title: { type: String },
        description: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        link: { type: String },
      },
      support_banner: {
        title: { type: String },
        subtitle: { type: String },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        button_text: { type: String },
        link: { type: String },
      },

      video: { type: String },
    },
    banner: {
      label: { type: String },
      button: { type: String },
      link: { type: String },
    },
    links: [
      {
        label: { type: String },
        link: { type: String },
        icon: { type: String },
      },
    ],
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
