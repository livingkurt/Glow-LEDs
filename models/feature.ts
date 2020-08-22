import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		glover_name: { type: String },
		instagram_handle: { type: String },
		facebook_name: { type: String },
		song_id: { type: String },
		quote: { type: String },
		video: { type: String },
		picture: { type: String }
	},
	{
		timestamps: true
	}
);

const featureModel = mongoose.model('Feature', featureSchema);

export default featureModel;

// module.exports = userModel;
