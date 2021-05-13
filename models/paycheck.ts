import mongoose from 'mongoose';
export {};

const paycheck_schema = new mongoose.Schema(
	{
		affiliate: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		amount: { type: Number },
		venmo: { type: Number },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const paycheck_model = mongoose.model('Paycheck', paycheck_schema);

export default paycheck_model;
