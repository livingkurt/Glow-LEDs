import { Survey } from '../models';
import { log_error, log_request, make_private_code, isAuth, isAdmin } from '../util';
// const { isAuth, isAdmin } = require('../util');

// Defining methods for the booksController
export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						facebook_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (req.query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { name: 1 };
			}

			const surveys = await Survey.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user')
				.populate('affiliate');
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Survey',
				data: surveys,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(surveys);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Survey',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Surveys' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const survey = await Survey.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
			console.log({ survey });
			console.log(req.params.id);
			if (survey) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ survey ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(survey);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ survey ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Survey Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Survey',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Survey' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newSurvey = await Survey.create(req.body);
			if (newSurvey) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ newSurvey ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Survey Created', data: newSurvey });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ newSurvey ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Survey.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Survey',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Survey' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			// console.log({ survey_routes_put: req.body });
			console.log('Hello');
			const survey_id = req.params.id;
			const survey: any = await Survey.findById(survey_id);
			if (survey) {
				const updatedSurvey = await Survey.updateOne({ _id: survey_id }, req.body);
				console.log({ updatedSurvey });
				if (updatedSurvey) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Survey',
						data: [ survey ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Survey Updated', data: updatedSurvey });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ survey ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Survey.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Survey',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Survey' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Survey Deleted' };
			const deleted_survey = await Survey.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_survey) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ deleted_survey ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Survey',
					data: [ deleted_survey ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send('Error in Deletion.');
			}
		} catch (error) {
			log_error({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Survey',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Survey' });
		}
	}
};
