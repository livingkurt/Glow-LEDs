import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    affiliates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" }],
    captain: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    team_name: { type: String },
    instagram_handle: { type: String },
    facebook_name: { type: String },
    youtube_link: { type: String },
    facebook_link: { type: String },
    instagram_link: { type: String },
    tiktok_link: { type: String },
    public_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    private_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    start_year: { type: String },
    bio: { type: String },
    picture: { type: String },
    map: { type: String },
    images: { type: Array },
    map_image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    profile_image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    profile_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    map: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    pathname: { type: String },
    video: { type: String },
    link: { type: String },
    venmo: { type: String },
    promoter: { type: Boolean },
    rave_mob: { type: Boolean },
    sponsor: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
