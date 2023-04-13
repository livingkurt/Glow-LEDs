import mongoose from "mongoose";
export {};

const image_schema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    album: { type: String },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Image = mongoose.model("Image", image_schema);

export default Image;
