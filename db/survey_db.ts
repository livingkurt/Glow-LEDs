import Survey from '../models/survey';

export default {
	findAll_surveys_db: async (category: any, searchKeyword: any, sortOrder: any) => {
		try {
			return await Survey.find({
				deleted: false,
				...category,
				...searchKeyword
			})
				.sort(sortOrder)
				.populate('user')
				.populate('affiliate');
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	findById_surveys_db: async (id: string) => {
		try {
			return await Survey.findOne({ _id: id }).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	create_surveys_db: async (body: any) => {
		try {
			return await Survey.create(body);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	update_surveys_db: async (id: string, body: any) => {
		try {
			const survey: any = await Survey.findOne({ _id: id });
			if (survey) {
				return await Survey.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	remove_surveys_db: async (id: string) => {
		try {
			const survey: any = await Survey.findOne({ _id: id });
			if (survey) {
				return await Survey.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
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
