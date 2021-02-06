import mongoose from 'mongoose';
export {};

const chip_dimensions_schema = {
	chip_height: { type: Number },
	chip_width: { type: Number },
	chip_length: { type: Number }
};

const chip_schema = new mongoose.Schema(
	{
		name: { type: String },
		company: { type: String },
		category: { type: String },
		programmmable: { type: Boolean },
		number_of_modes: { type: Number },
		characteristics: { type: String },
		pathname: { type: String },
		image: { type: String },
		dimensions: chip_dimensions_schema,
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const chip_model = mongoose.model('Chip', chip_schema);

export default chip_model;

// module.exports = userModel;
