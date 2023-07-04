import mongoose from "mongoose";
export {};

const VersionSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Version = mongoose.model("Version", VersionSchema);

export default Version;
