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
		survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
		question_1: { type: String },
		question_2: { type: String },
		question_3: { type: String },
		question_4: { type: String },
		question_5: { type: String },
		answer_1: { type: String },
		answer_2: { type: String },
		answer_3: { type: String },
		answer_4: { type: String },
		answer_5: { type: String },
		question_answer: [ question_answer_schema ],
		rating: { type: Number },
		is_survey: { type: Boolean },
		active: { type: Boolean },
		deleted: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

const survey_model = mongoose.model('Survey', survey_schema);

export default survey_model;
