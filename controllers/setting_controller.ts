import { Setting } from '../models';
import { log_error, log_request } from '../util';

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
				sortOrder = { _id: -1 };
			}

			const settings = await Setting.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user')
				.populate('affiliate')
				.populate('team');
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Setting',
				data: settings,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(settings);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Settings' });
		}
	},
	get_my_settings: async (req: any, res: any) => {
		console.log('get_my_settings');
		console.log({ affiliate: req.user.affiliate });
		try {
			const settings = await Setting.find({ deleted: false, affiliate: req.user.affiliate._id })
				.sort({ _id: -1 })
				.populate('affiliate');
			console.log({ settings });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Setting',
				data: settings,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(settings);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Your Settings' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const setting = await Setting.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
			console.log({ setting });
			console.log(req.params.id);
			if (setting) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ setting ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(setting);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ setting ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Setting Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Setting' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ setting: req.body });
			const newSetting = await Setting.create(req.body);
			if (newSetting) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ newSetting ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Setting Created', data: newSetting });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ newSetting ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Setting.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Setting' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ setting_routes_put: req.body });
			const setting_id = req.params.id;
			const setting: any = await Setting.findById(setting_id);
			if (setting) {
				const updatedSetting = await Setting.updateOne({ _id: setting_id }, req.body);
				if (updatedSetting) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Setting',
						data: [ setting ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Setting Updated', data: updatedSetting });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ setting ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Setting.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Setting' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Setting Deleted' };
			const deleted_setting = await Setting.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_setting = await Setting.deleteOne({ _id: req.params.id });
			if (deleted_setting) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ deleted_setting ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Setting',
					data: [ deleted_setting ],
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
				collection: 'Setting',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Setting' });
		}
	}
};
