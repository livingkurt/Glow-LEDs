import mongoose from "mongoose";

const sponsorTaskSchema = new mongoose.Schema(
  {
    taskName: { type: String },
    points: { type: Number },
    completedAt: { type: Date },
    isFullLightshow: { type: Boolean, default: false },
    month: { type: String },
    year: { type: Number },
    jiraLink: { type: String },
    driveLink: { type: String },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const productBundleSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    short_description: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  },
  {
    timestamps: true,
  }
);

const affiliateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    product_bundles: [productBundleSchema],
    bundles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    microlights: [{ type: mongoose.Schema.Types.ObjectId, ref: "Microlight" }],
    modes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mode" }],
    chips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chip" }],
    artist_name: { type: String },
    social_media: [
      {
        platform: { type: String },
        link: { type: String },
      },
    ],
    percentage_off: { type: Number },
    sponsorTasks: [sponsorTaskSchema],
    public_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    private_code: { type: mongoose.Schema.Types.ObjectId, ref: "Promo" },
    location: { type: String },
    start_year: { type: String },
    bio: { type: String },
    picture: { type: String },
    video: { type: String },
    videos: [
      {
        title: { type: String },
        video: { type: String },
      },
    ],
    style: { type: String },
    glove_size: { type: String },
    t_shirt_size: { type: String },
    inspiration: { type: String },
    link: { type: String },
    venmo: { type: String },
    pathname: { type: String },
    answers: { type: Array },
    teamCaptain: { type: Boolean, default: false },
    promoter: { type: Boolean, default: true },
    rave_mob: { type: Boolean, default: false },
    team: { type: Boolean, default: false },
    sponsor: { type: Boolean, default: false },
    sponsorTeamCaptain: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Affiliate = mongoose.model("Affiliate", affiliateSchema);

export default Affiliate;
