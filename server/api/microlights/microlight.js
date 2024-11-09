import mongoose from "mongoose";

const microlight_dimensions_schema = {
  height: { type: Number },
  width: { type: Number },
  length: { type: Number },
};
const microlight_color_schema = {
  name: { type: String },
  color: { type: String },
};

const microlight_schema = new mongoose.Schema(
  {
    name: { type: String },
    company: { type: String },
    category: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    programmable: { type: Boolean },
    number_of_modes: { type: Number },
    characteristics: { type: String },
    colors_per_mode: { type: Number },
    colors: [microlight_color_schema],
    pathname: { type: String },
    image: { type: String },
    image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    dimensions: microlight_dimensions_schema,
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Microlight = mongoose.model("Microlight", microlight_schema);

export default Microlight;
