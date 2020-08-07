import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: { type: String },
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
		isVerified: { type: Boolean, required: true, default: false }
	},
	{
		timestamps: true
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;

// module.exports = userModel;
