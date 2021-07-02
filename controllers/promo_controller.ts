import { Promo } from '../models';
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
			if (req.query.sortOrder === 'admin only') {
				sortOrder = { admin_only: -1 };
			} else if (req.query.sortOrder === 'affiliate only') {
				sortOrder = { affiliate_only: -1 };
			} else if (req.query.sortOrder === 'active') {
				sortOrder = { active: -1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}

			const promos = await Promo.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				data: promos,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(promos);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promos' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const promo = await Promo.findOne({ _id: req.params.id }).populate('sponsor').populate('user');
			console.log({ promo });
			console.log(req.params.id);
			if (promo) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(promo);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Promo Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	find_by_code: async (req: any, res: any) => {
		try {
			const promo = await Promo.findOne({ promo_code: req.params.promo_code })
				.populate('sponsor')
				.populate('user');
			console.log({ promo });
			console.log(req.params.promo_code);
			if (promo) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(promo);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Promo Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newPromo = await Promo.create(req.body);
			if (newPromo) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ newPromo ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Promo Created', data: newPromo });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ newPromo ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Promo.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Promo' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ promo_routes_put: req.body });
			const promo_id = req.params.id;
			const promo: any = await Promo.findById(promo_id);
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo_id }, req.body);
				if (updatedPromo) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Promo',
						data: [ promo ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Promo Deleted' };
			const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_promo) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ deleted_promo ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ deleted_promo ],
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
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Promo' });
		}
	},
	update_discount: async (req: any, res: any) => {
		try {
			console.log({ percentage_off: req.body.percentage_off });
			console.log({ private_code_id: req.body.private_code_id });
			console.log('update_discount');
			const promo: any = await Promo.findOne({ _id: req.body.private_code_id });
			promo.percentage_off = req.body.percentage_off;
			console.log({ promo });
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);

				if (updatedPromo) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Promo',
						data: [ promo ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	used: async (req: any, res: any) => {
		try {
			console.log({ used: req.body.promo_code });
			console.log('Promo_Routes');
			const promo: any = await Promo.findOne({ promo_code: req.body.promo_code.toLowerCase() });
			promo.used_once = true;
			console.log({ promo });
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);

				if (updatedPromo) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Promo',
						data: [ promo ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Promo',
					data: [ promo ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Promo',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	}
};
