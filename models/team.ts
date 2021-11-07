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
		public_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' },
		private_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' },
		years: { type: String },
		bio: { type: String },
		picture: { type: String },
		map: { type: String },
		images: { type: Array },
		pathname: { type: String },
		video: { type: String },
		link: { type: String },
		venmo: { type: String },
		promoter: { type: Boolean },
		rave_mob: { type: Boolean },
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
