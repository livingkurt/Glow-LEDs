import { Paycheck } from '../models';
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
				sortOrder = { _id: -1 };
			}

			const paychecks = await Paycheck.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user')
				.populate('affiliate')
				.populate('team');
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Paycheck',
				data: paychecks,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(paychecks);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Paychecks' });
		}
	},
	get_my_paychecks: async (req: any, res: any) => {
		console.log('get_my_paychecks');
		console.log({ affiliate: req.user.affiliate });
		try {
			const paychecks = await Paycheck.find({ deleted: false, affiliate: req.user.affiliate._id })
				.sort({ _id: -1 })
				.populate('affiliate');
			console.log({ paychecks });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Paycheck',
				data: paychecks,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(paychecks);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Your Paychecks' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const paycheck = await Paycheck.findOne({ _id: req.params.id }).populate('user').populate('affiliate');
			console.log({ paycheck });
			console.log(req.params.id);
			if (paycheck) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ paycheck ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(paycheck);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ paycheck ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Paycheck Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Paycheck' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ paycheck: req.body });
			const newPaycheck = await Paycheck.create(req.body);
			if (newPaycheck) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ newPaycheck ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Paycheck Created', data: newPaycheck });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ newPaycheck ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Paycheck.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Paycheck' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ paycheck_routes_put: req.body });
			const paycheck_id = req.params.id;
			const paycheck: any = await Paycheck.findById(paycheck_id);
			if (paycheck) {
				const updatedPaycheck = await Paycheck.updateOne({ _id: paycheck_id }, req.body);
				if (updatedPaycheck) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Paycheck',
						data: [ paycheck ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Paycheck Updated', data: updatedPaycheck });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ paycheck ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Paycheck.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Paycheck' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Paycheck Deleted' };
			const deleted_paycheck = await Paycheck.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_paycheck = await Paycheck.deleteOne({ _id: req.params.id });
			if (deleted_paycheck) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ deleted_paycheck ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Paycheck',
					data: [ deleted_paycheck ],
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
				collection: 'Paycheck',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Paycheck' });
		}
	}
};
