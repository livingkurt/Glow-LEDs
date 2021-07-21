import mongoose from 'mongoose';
export {};

const categorySchema = new mongoose.Schema(
	{
		name: String,
		pathname: String,
		nest_level: Number,
		display_order: Number,
		subcategorys: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } ],
		display: { type: Boolean, default: true },
		meta_title: String,
		meta_description: String,
		meta_keywords: String,
		deleted: { type: Boolean, default: false },
		masthead: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
