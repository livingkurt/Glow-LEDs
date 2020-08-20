import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			dropDups: true
		},
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		isVerified: { type: Boolean, required: true, default: false },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const featureModel = mongoose.model('Feature', featureSchema);

export default featureModel;

// module.exports = userModel;
