import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
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

const expenseModel = mongoose.model('Expense', expenseSchema);

export default expenseModel;

// module.exports = userModel;
