import mongoose from 'mongoose';
export {};

const promoSchema = new mongoose.Schema(
	{
		sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		promo_code: { type: String },
		for_customer: { type: Boolean },
		excluded_categories: { type: Array },
		excluded_products: { type: Array },
		percentage_off: { type: Number },
		free_shipping: { type: Boolean },
		amount_off: { type: Number },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const promoModel = mongoose.model('Promo', promoSchema);

export default promoModel;
