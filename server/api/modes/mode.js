import mongoose from "mongoose";
import { microlight_flashing_pattern_schema } from "../microlights/microlight.js";

const mode_color_schema = new mongoose.Schema({
  name: { type: String },
  colorCode: { type: String },
  saturation: { type: Number },
  brightness: { type: Number },
});

const mode_schema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    author: { type: String },
    video: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    colors: [mode_color_schema],
    microlight: { type: mongoose.Schema.Types.ObjectId, ref: "Microlight" },
    flashing_pattern: microlight_flashing_pattern_schema,
    visibility: { type: String, enum: ["public", "private"] },
    pathname: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Mode = mongoose.model("Mode", mode_schema);

export default Mode;
