import mongoose from 'mongoose';
export {};

const paycheck_schema = new mongoose.Schema(
	{
		affiliate: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
		amount: { type: Number },
		venmo: { type: String },
		paid: { type: Boolean },
		paid_at: { type: Date },
		reciept: { type: String },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const paycheck_model = mongoose.model('Paycheck', paycheck_schema);

export default paycheck_model;
