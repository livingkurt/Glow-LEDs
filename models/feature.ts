import mongoose from 'mongoose';
export {};

const featureSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		glover_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		product: { type: String },
		song_id: { type: String },
		quote: { type: String },
		video: { type: String },
		picture: { type: String },
		release_date: { type: Date },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const featureModel = mongoose.model('Feature', featureSchema);

export default featureModel;
