import mongoose from 'mongoose';
export {};

const promoSchema = new mongoose.Schema(
	{
		sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
		promo_code: { type: String },
		for_customer: { type: Boolean },
		excluded_categories: { type: Array },
		excluded_products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],
		percentage_off: { type: Number },
		number_of_uses: { type: Number },
		funds_generated: { type: Number },
		number_of_orders: { type: Number },
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const promoModel = mongoose.model('Promo', promoSchema);

export default promoModel;
