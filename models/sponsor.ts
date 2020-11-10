import mongoose from 'mongoose';
export {};

const sponsorSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		glover_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		percentage_off: { type: Number },
		promo_code: { type: String },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const sponsorModel = mongoose.model('Sponsor', sponsorSchema);

export default sponsorModel;
