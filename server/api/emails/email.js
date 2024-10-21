import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "text", "image", "button", etc.
  content: mongoose.Schema.Types.Mixed, // Content varies based on module type
});

const emailSchema = new mongoose.Schema(
  {
    modules: [moduleSchema],
    subject: { type: String },
    header_footer_color: { type: String, default: "#333333" },
    background_color: { type: String, default: "#7d7c7c" },
    module_color: { type: String, default: "#585858" },
    button_color: { type: String, default: "#4c4f60" },
    button_text_color: { type: String, default: "#ffffff" },
    text_color: { type: String, default: "#ffffff" },
    title_color: { type: String, default: "#ffffff" },
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
