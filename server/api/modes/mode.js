import mongoose from "mongoose";
import { microlight_color_schema, microlight_flashing_pattern_schema } from "../microlights/microlight.js";

const mode_color_schema = new mongoose.Schema({
  hue: microlight_color_schema,
  saturation: { type: Number },
  brightness: { type: Number },
});

const mode_schema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    colors: [mode_color_schema],
    microlight: { type: mongoose.Schema.Types.ObjectId, ref: "Microlight" },
    flashing_pattern: microlight_flashing_pattern_schema,
    visibility: { type: String, enum: ["public", "private"] },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Mode = mongoose.model("Mode", mode_schema);

export default Mode;
