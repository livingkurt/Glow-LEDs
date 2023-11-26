import mongoose from "mongoose";

const chip_dimensions_schema = {
  height: { type: Number },
  width: { type: Number },
  length: { type: Number },
};
const chip_color_schema = {
  name: { type: String },
  color: { type: String },
};

const chip_schema = new mongoose.Schema(
  {
    name: { type: String },
    company: { type: String },
    category: { type: String },
    category_object: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    programmmable: { type: Boolean },
    number_of_modes: { type: Number },
    characteristics: { type: String },
    colors_per_mode: { type: Number },
    colors: [chip_color_schema],
    pathname: { type: String },
    image: { type: String },
    image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    dimensions: chip_dimensions_schema,
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Chip = mongoose.model("Chip", chip_schema);

export default Chip;
