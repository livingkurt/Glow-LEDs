import mongoose from "mongoose";

const event_schema = new mongoose.Schema(
  {
    name: { type: String },
    fact: { type: String },
    short_description: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    venue: { type: String },
    thumbnail_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    background_image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
    scanned_tickets_count: { type: Number, default: 0 },
    address: {
      address_1: { type: String },
      address_2: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
    },
    pathname: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", event_schema);

export default Event;
