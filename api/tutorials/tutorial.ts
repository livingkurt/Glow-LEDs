import mongoose from "mongoose";
export {};

const tutorial_schema = new mongoose.Schema(
  {
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    video: { type: String },
    description: { type: Number },
    categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    difficulty: { type: String },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Tutorial = mongoose.model("Tutorial", tutorial_schema);

export default Tutorial;
