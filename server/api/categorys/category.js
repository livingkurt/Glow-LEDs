import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: String,
    subcategorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    type: String,
    pathname: String,
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
