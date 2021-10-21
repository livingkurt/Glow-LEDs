import mongoose from 'mongoose';
export {};

const token_schema = new mongoose.Schema(
	{
		token: { type: String },
		active: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const token_model = mongoose.model('Token', token_schema);

export default token_model;
