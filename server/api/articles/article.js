import mongoose from "mongoose";

const article_schema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    short_description: { type: String },
    content: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
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
