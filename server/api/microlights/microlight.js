import mongoose from "mongoose";

export const microlight_color_schema = new mongoose.Schema({
  name: { type: String },
  colorCode: { type: String },
});

export const microlight_flashing_pattern_schema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
});

const microlight_schema = new mongoose.Schema(
  {
    name: { type: String },
    company: { type: String },
    category: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

    colors: [microlight_color_schema],
    flashing_patterns: [microlight_flashing_pattern_schema],
    number_of_modes: { type: Number },
    colors_per_mode: { type: Number },
    number_of_leds: { type: Number },
    brightness_control: { type: Boolean },
    brightness_levels: { type: Number },
    saturation_control: { type: Boolean },
    saturation_levels: { type: Number },

    global_brightness_control: { type: Boolean },
    power: { type: String, enum: ["rechargeable", "non-rechargeable"] },
    programmable: { type: Boolean },
    battery_life: { type: Number },
    chip_to_chip: { type: Boolean },
    motion_reactive: { type: Boolean },
    computer_programmable: { type: Boolean },
    characteristics: { type: String },
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
