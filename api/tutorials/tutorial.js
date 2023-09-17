import mongoose from "mongoose";

const tutorial_schema = new mongoose.Schema(
  {
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    title: { type: String },
    video: { type: String },
    description: { type: String },
    categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    level: { type: String },
    pathname: { type: String },
    order: { type: Number },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Tutorial = mongoose.model("Tutorial", tutorial_schema);

export default Tutorial;
