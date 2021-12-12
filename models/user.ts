import mongoose from 'mongoose';
export {};

const shippingSchema = {
	first_name: { type: String },
	last_name: { type: String },
	address_1: { type: String },
	address_2: { type: String },
	city: { type: String },
	state: { type: String },
	postalCode: { type: String },
	international: { type: Boolean },
	country: { type: String }
};

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String },
		last_name: { type: String },
		email: {
			type: String,
			required: true
			// unique: true,
			// index: true
			// dropDups: true
		},
		shipping: shippingSchema,
		password: { type: String },

		isAdmin: { type: Boolean, required: true, default: false },
		isVerified: { type: Boolean, required: true, default: false },
		is_affiliated: { type: Boolean, required: true, default: false },
		palettes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Palette' } ],
		cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
		affiliate: { type: mongoose.Schema.Types.ObjectId, ref: 'Affiliate' },
		email_subscription: { type: Boolean, default: true },
		guest: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
