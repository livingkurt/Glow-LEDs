import mongoose from "mongoose";
export {};

const sponsorCheckinSchema = new mongoose.Schema(
  {
    month: { type: String },
    year: { type: Number },
    questionsConcerns: { type: String },
    numberOfContent: { type: Number }
  },
  {
    timestamps: true
  }
);

const affiliateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    artist_name: { type: String },
    instagram_handle: { type: String },
    facebook_name: { type: String },
    youtube_link: { type: String },
    facebook_link: { type: String },
    instagram_link: { type: String },
    tiktok_link: { type: String },
    tiktok: { type: String },
    percentage_off: { type: Number },
    sponsorMonthlyCheckins: [sponsorCheckinSchema],
    public_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    private_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    location: { type: String },
    years: { type: String },
    start_year: { type: String },
    bio: { type: String },
    picture: { type: String },
    video: { type: String },
    style: { type: String },
    glove_size: { type: String },
    t_shirt_size: { type: String },
    inspiration: { type: String },
    link: { type: String },
    venmo: { type: String },
    pathname: { type: String },
    answers: { type: Array },
    promoter: { type: Boolean, default: true },
    rave_mob: { type: Boolean, default: false },
    team: { type: Boolean, default: false },
    sponsor: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Affiliate = mongoose.model("Affiliate", affiliateSchema);

export default Affiliate;
