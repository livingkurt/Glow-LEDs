import mongoose from "mongoose";
export {};

const slideshow_schema = {
  label: { type: String },
  image: { type: String },
  image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  link: { type: String },
};

const home_page_schema = {
  h1: { type: String },
  image: { type: String },
  images: { type: Array },
  image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  slideshow: [slideshow_schema],
  video: { type: String },
  banner_image: { type: String },
  banner_image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  show_image: { type: Boolean, default: true },
  show_video: { type: Boolean, default: false },
  h2: { type: String },
  p: { type: String },
  button: { type: String },
  link: { type: String },
};

const banner_schema = {
  label: { type: String },
  button: { type: String },
  link: { type: String },
};

const links_schema = {
  label: { type: String },
  link: { type: String },
  icon: { type: String },
};

const contentSchema = new mongoose.Schema(
  {
    home_page: home_page_schema,
    banner: banner_schema,
    links: [links_schema],
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
