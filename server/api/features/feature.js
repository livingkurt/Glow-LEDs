import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    artist_name: { type: String },
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    instagram_handle: { type: String },
    facebook_name: { type: String },
    product: { type: String },
    song_id: { type: String },
    quote: { type: String },
    video: { type: String },
    images: { type: Array },
    link: { type: String },
    logo: { type: String },
    category: { type: String },
    pathname: { type: String },
    description: { type: String },
    release_date: { type: Date },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;
