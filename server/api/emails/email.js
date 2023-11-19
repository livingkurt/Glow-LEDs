import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    email_type: { type: String, default: "Announcments" },
    header_footer_color: { type: String },
    background_color: { type: String },
    module_color: { type: String },
    button_color: { type: String },
    text_color: { type: String },
    title_color: { type: String },
    subject: { type: String },
    h1: { type: String },
    image: { type: String },
    images: { type: Array },
    image_object: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    images_object: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    show_image: { type: Boolean, default: true },
    h2: { type: String },
    p: { type: String },
    button: { type: String },
    link: { type: String },
    html: { type: String },
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
