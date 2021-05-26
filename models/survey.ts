import mongoose from 'mongoose';
export {};

const question_answer_schema = {
	question: { type: String },
	answer: { type: String }
};

const survey_schema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
		// from_where: { type: String },
		// how_did_we_do: { type: String },
		// improvements: { type: String },
		question_answer: [ question_answer_schema ],
		rating: { type: Number },
		survey: { type: Boolean },
		active: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const survey_model = mongoose.model('Survey', survey_schema);

export default survey_model;
