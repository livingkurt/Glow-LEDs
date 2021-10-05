import { survey_services } from '../services';

export default {
	findAll_surveys_c: async (req: any, res: any) => {
		const { query } = req;
		try {
			const surveys = await survey_services.findAll_surveys_s(query);
			if (surveys) {
				return res.status(200).send({ message: 'Surveys Found', data: surveys });
			}
			return res.status(404).send({ message: 'Surveys Not Found' });
		} catch (error) {
			console.log({ findAll_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Surveys' });
		}
	},
	findById_surveys_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const survey = await survey_services.findById_surveys_s(params);
			console.log({ survey });
			if (survey) {
				return res.status(200).send({ message: 'Survey Found', data: survey });
			}
			return res.status(404).send({ message: 'Survey Not Found' });
		} catch (error) {
			console.log({ findById_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Finding Survey' });
		}
	},
	create_surveys_c: async (req: any, res: any) => {
		const { body } = req;
		try {
			const survey = await survey_services.create_surveys_s(body);
			if (survey) {
				return res.status(201).send({ message: 'New Survey Created', data: survey });
			}
			return res.status(500).send({ message: 'Error Creating Survey' });
		} catch (error) {
			console.log({ create_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Creating Survey' });
		}
	},
	update_surveys_c: async (req: any, res: any) => {
		const { params, body } = req;
		try {
			const survey = await survey_services.update_surveys_s(params, body);
			if (survey) {
				return res.status(200).send({ message: 'Survey Updated', data: survey });
			}
			return res.status(500).send({ message: 'Error Updating Survey' });
		} catch (error) {
			console.log({ update_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Updating Survey' });
		}
	},
	remove_surveys_c: async (req: any, res: any) => {
		const { params } = req;
		try {
			const survey = await survey_services.remove_surveys_s(params);
			if (survey) {
				return res.status(204).send({ message: 'Survey Deleted' });
			}
			return res.status(500).send({ message: 'Error Deleting Survey' });
		} catch (error) {
			console.log({ remove_surveys_c_error: error });
			res.status(500).send({ error, message: 'Error Deleting Survey' });
		}
	}
};

// import { Survey } from '../models';

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// 			const category = req.query.category ? { category: req.query.category } : {};
// 			const searchKeyword = req.query.searchKeyword
// 				? {
// 						facebook_name: {
// 							$regex: req.query.searchKeyword,
// 							$options: 'i'
// 						}
// 					}
// 				: {};

// 			let sortOrder = {};
// 			if (req.query.sortOrder === 'glover name') {
// 				sortOrder = { artist_name: 1 };
// 			} else if (req.query.sortOrder === 'facebook name') {
// 				sortOrder = { facebook_name: 1 };
// 			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
// 				sortOrder = { name: 1 };
// 			}

// 			const surveys = await Survey.find({ deleted: false, ...category, ...searchKeyword })
// 				.sort(sortOrder)
// 				.populate('user')
// 				.populate('affiliate');
// 			res.send(surveys);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Surveys' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			const survey = await Survey.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
// 			console.log({ survey });
// 			console.log(req.params.id);
// 			if (survey) {
// 				res.send(survey);
// 			} else {
// 				res.status(404).send({ message: 'Survey Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Survey' });
// 		}
// 	},
// 	create: async (req: any, res: any) => {
// 		try {
// 			const newSurvey = await Survey.create(req.body);
// 			if (newSurvey) {
// 				return res.status(201).send({ message: 'New Survey Created', data: newSurvey });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Survey.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });
// 			res.status(500).send({ error, message: 'Error Creating Survey' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			// console.log({ survey_routes_put: req.body });
// 			console.log('Hello');
// 			const survey_id = req.params.id;
// 			const survey: any = await Survey.findById(survey_id);
// 			if (survey) {
// 				const updatedSurvey = await Survey.updateOne({ _id: survey_id }, req.body);
// 				console.log({ updatedSurvey });
// 				if (updatedSurvey) {
// 					return res.status(200).send({ message: 'Survey Updated', data: updatedSurvey });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Survey.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Survey' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Survey Deleted' };
// 			const deleted_survey = await Survey.updateOne({ _id: req.params.id }, { deleted: true });
// 			if (deleted_survey) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Survey' });
// 		}
// 	}
// };
