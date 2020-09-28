import mongoose from 'mongoose';
export {};

const settingsSchema = {
	brightness: { type: Number, default: 255 },
	motion_speed: { type: Number, default: 30 },
	strobe: { type: Number },
	gap: { type: Number },
	blank: { type: Number },
	autoplay_pattern: { type: Boolean, default: true },
	autoplay_pattern_duration: { type: Number, default: 40 },
	random_pattern: { type: Boolean, default: false },
	palette: { type: Number },
	blend_palette: { type: Boolean, default: true },
	autoplay_palette: { type: Boolean, default: false },
	autoplay_palette_duration: { type: Number, default: 40 },
	random_palette: { type: Boolean, default: false },
	color_density: { type: Number },
	color_speed: { type: Number },
	color_fade: { type: Number }
};

const deviceSettingsSchema = {
	power: { type: Boolean },
	strobe_settings: settingsSchema,
	pulse_settings: settingsSchema,
	sparkle_settings: settingsSchema,
	shooting_star_settings: settingsSchema,
	cycling_desaturated_settings: settingsSchema,
	color_waves_settings: settingsSchema,
	beat_settings: settingsSchema,
	juggle_settings: settingsSchema,
	twinkle_settings: settingsSchema,
	hsv_settings: settingsSchema
};

const deviceSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		device_name: { type: String },
		query_url: { type: String },
		location: { type: String },
		pathname: { type: String },
		device_settings: deviceSettingsSchema,
		pattern_order: { type: Array },
		palette_order: { type: Array },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const deviceModel = mongoose.model('Device', deviceSchema);

export default deviceModel;
