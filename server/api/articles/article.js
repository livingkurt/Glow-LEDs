import mongoose from "mongoose";

const article_schema = new mongoose.Schema(
  {
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    title: { type: String },
    video: { type: String },
    description: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    level: { type: String },
    pathname: { type: String },
    order: { type: Number },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", article_schema);

export default Article;
