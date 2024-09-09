import mongoose from "mongoose";

const ticket_schema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    title: { type: String },
    ticket_type: { type: String },
    price: { type: Number },
    fact: { type: String },
    color: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    count_in_stock: { type: Number },
    short_description: { type: String },
    pathname: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticket_schema);

export default Ticket;
