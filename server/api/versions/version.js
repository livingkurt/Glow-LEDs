import mongoose from "mongoose";

const VersionSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Version = mongoose.model("Version", VersionSchema);

export default Version;
