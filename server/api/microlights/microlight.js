import mongoose from "mongoose";

const microlight_color_schema = new mongoose.Schema({
  name: { type: String },
  colorCode: { type: String },
});

const microlight_flashing_pattern_schema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
});

const microlight_schema = new mongoose.Schema(
  {
    name: { type: String },
    company: { type: String },
    category: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    programmable: { type: Boolean },
    power: { type: String, enum: ["rechargeable", "non-rechargeable"] },
    battery_life: { type: Number },
    number_of_leds: { type: Number },
    chip_to_chip: { type: Boolean },
    motion_reactive: { type: Boolean },
    computer_programmable: { type: Boolean },
    number_of_modes: { type: Number },
    characteristics: { type: String },
    colors_per_mode: { type: Number },
    colors: [microlight_color_schema],
    flashing_patterns: [microlight_flashing_pattern_schema],
    pathname: { type: String },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    dimensions: {
      height: { type: Number },
      width: { type: Number },
      length: { type: Number },
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Microlight = mongoose.model("Microlight", microlight_schema);

export default Microlight;
