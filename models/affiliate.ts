import mongoose from 'mongoose';
export {};

const affiliateSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		glover_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		percentage_off: { type: Number },
		promo_code: { type: String },
		promoter: { type: Boolean, default: true },
		sponsor: { type: Boolean, default: false },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const affiliateModel = mongoose.model('Affiliate', affiliateSchema);

export default affiliateModel;
