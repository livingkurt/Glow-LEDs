import mongoose from "mongoose";

const article_schema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    short_description: { type: String },
    video: { type: String },
    content: { type: String },
    order: { type: Number },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    hide_image: { type: Boolean, default: false },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    pathname: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", article_schema);

export default Article;
