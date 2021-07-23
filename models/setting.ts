import mongoose from 'mongoose';
export {};

const settings_schema = {
	load_orders: { type: Boolean, default: true }
};

const setting_schema = new mongoose.Schema(
	{
		settings: settings_schema,
		active: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const setting_model = mongoose.model('Setting', setting_schema);

export default setting_model;
