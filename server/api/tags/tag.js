import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: { type: String },
    pathname: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
