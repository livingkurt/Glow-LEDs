import mongoose from "mongoose";
export {};

const filamentSchema = new mongoose.Schema(
  {
    type: { type: String },
    color: { type: String },
    color_code: { type: String },
    active: { type: Boolean },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Filament = mongoose.model("Filament", filamentSchema);

export default Filament;
