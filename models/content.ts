import mongoose from 'mongoose';
export {};

const slideshow_schema = {
	label: { type: String },
	image: { type: String },
	link: { type: String }
};

const home_page_schema = {
	h1: { type: String },
	image: { type: String },
	images: { type: Array },
	slideshow: [ slideshow_schema ],
	video: { type: String },
	show_image: { type: Boolean, default: true },
	show_video: { type: Boolean, default: false },
	h2: { type: String },
	p: { type: String },
	button: { type: String },
	link: { type: String }
};

const banner_schema = {
	label: { type: String },
	button: { type: String },
	link: { type: String }
};

const links_schema = {
	label: { type: String },
	link: { type: String },
	icon: { type: String }
};

const contentSchema = new mongoose.Schema(
	{
		home_page: home_page_schema,
		banner: banner_schema,
		links: [ links_schema ],
		active: { type: Boolean, default: true },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const contentModel = mongoose.model('Content', contentSchema);

export default contentModel;
