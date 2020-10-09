import mongoose from 'mongoose';
export {};

const announcement_schema = {
	h1: { type: String },
	image: { type: String },
	video: { type: String },
	show_image: { type: Boolean, default: true },
	show_video: { type: Boolean, default: false },
	h2: { type: String },
	p: { type: String },
	button: { type: String },
	link: { type: String }
};

const order_schema = {
	h1: { type: String },
	image: { type: String },
	video: { type: String },
	show_image: { type: Boolean, default: true },
	show_video: { type: Boolean, default: false },
	h2: { type: String },
	p: { type: String },
	button: { type: String },
	link: { type: String }
};

const verified_schema = {
	h1: { type: String },
	image: { type: String },
	video: { type: String },
	show_image: { type: Boolean, default: true },
	show_video: { type: Boolean, default: false },
	h2: { type: String },
	p: { type: String },
	button: { type: String },
	link: { type: String }
};

const emailSchema = new mongoose.Schema(
	{
		announcement: announcement_schema,
		order: order_schema,
		verified: verified_schema,
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const emailModel = mongoose.model('Email', emailSchema);

export default emailModel;
