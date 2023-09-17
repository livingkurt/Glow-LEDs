import mongoose from "mongoose";

const token_schema = new mongoose.Schema(
  {
    token: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", token_schema);

export default Token;
