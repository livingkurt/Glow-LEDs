import mongoose from 'mongoose';
export {};

const affiliateSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],
		chips: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Chip' } ],
		artist_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		percentage_off: { type: Number },
		promo_code: { type: String },
		location: { type: String },
		years: { type: String },
		bio: { type: String },
		picture: { type: String },
		video: { type: String },
		style: { type: String },
		inspiration: { type: String },
		link: { type: String },
		promoter: { type: Boolean, default: true },
		team: { type: Boolean, default: false },
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
