import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    subcategorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    type: { type: String },
    pathname: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
