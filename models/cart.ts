import mongoose from 'mongoose';
export {};
// const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		cartItems: { type: Array },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: true
	}
);

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;

// module.exports = userModel;
