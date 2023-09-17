import mongoose, { Schema } from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expense_name: { type: String, required: true },
    application: { type: String },
    invoice_url: { type: String },
    place_of_purchase: { type: String },
    date_of_purchase: { type: Date },
    category: { type: String },
    card: { type: String },
    amount: { type: Number },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    airtable_id: { type: String },
    airtable_invoice_links: { type: Array },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
