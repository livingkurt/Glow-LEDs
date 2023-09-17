import mongoose from "mongoose";

const parcel_schema = new mongoose.Schema(
  {
    type: { type: String },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    volume: { type: Number },
    quantity_state: { type: Number },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Parcel = mongoose.model("Parcel", parcel_schema);

export default Parcel;
