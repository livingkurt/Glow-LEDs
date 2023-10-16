import mongoose from "mongoose";

const filamentSchema = new mongoose.Schema(
  {
    type: { type: String },
    color: { type: String },
    color_code: { type: String },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    active: { type: Boolean },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Filament = mongoose.model("Filament", filamentSchema);

export default Filament;
