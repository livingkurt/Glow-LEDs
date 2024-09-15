import mongoose from "mongoose";

const ticket_schema = new mongoose.Schema(
  {
    title: { type: String },
    ticket_type: { type: String },
    price: { type: Number },
    fact: { type: String },
    color: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    count_in_stock: { type: Number },
    max_display_quantity: { type: Number },
    max_quantity: { type: Number },
    finite_stock: { type: Boolean, default: false },
    short_description: { type: String },
    pathname: { type: String },
    backup_ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticket_schema);

export default Ticket;
