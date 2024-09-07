import mongoose from "mongoose";

const event_schema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    location: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", event_schema);

export default Event;
