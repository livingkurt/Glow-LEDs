import mongoose from 'mongoose';
export {};

const paletteSchema = new mongoose.Schema(
	{
		name: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		chip: { type: mongoose.Schema.Types.ObjectId, ref: 'Chip' },
		colors: { type: Array },
		active: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const paletteModel = mongoose.model('Palette', paletteSchema);

export default paletteModel;
