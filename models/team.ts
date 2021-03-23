import mongoose from 'mongoose';
export {};

const teamSchema = new mongoose.Schema(
	{
		affiliates: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' } ],
		team_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		percentage_off: { type: Number },
		promo_code: { type: String },
		years: { type: String },
		bio: { type: String },
		picture: { type: String },
		pathname: { type: String },
		video: { type: String },
		link: { type: String },
		promoter: { type: Boolean, default: true },
		sponsor: { type: Boolean, default: false },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const teamModel = mongoose.model('Team', teamSchema);

export default teamModel;
