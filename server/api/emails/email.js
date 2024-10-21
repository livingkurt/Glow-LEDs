import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  heading: { type: String },
  subheading: { type: String },
  body: { type: String },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  buttonText: { type: String },
  buttonLink: { type: String },
  html: { type: String },
  line_break: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  divider: { type: String },
  spacer: { type: Boolean, default: false },
  styling: { type: String },
});

const moduleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: contentSchema,
});
const emailSchema = new mongoose.Schema(
  {
    modules: [moduleSchema],
    email_type: { type: String, default: "Announcements" },
    header_footer_color: { type: String, default: "#333333" },
    background_color: { type: String, default: "#7d7c7c" },
    module_color: { type: String, default: "#585858" },
    button_color: { type: String, default: "#4c4f60" },
    button_text_color: { type: String, default: "#ffffff" },
    text_color: { type: String, default: "#ffffff" },
    title_color: { type: String, default: "#ffffff" },
    subject: { type: String },
    scheduled_at: { type: Date },
    status: { type: String, default: "Draft" },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
