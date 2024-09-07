import mongoose from "mongoose";

const ticket_schema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ticket_type: { type: String },
    price: { type: Number },
    fact: { type: String },
    short_description: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticket_schema);

export default Ticket;
