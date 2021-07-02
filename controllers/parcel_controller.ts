import { Parcel } from '../models';
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

			const parcels = await Parcel.find({ deleted: false });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Parcel',
				data: parcels,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(parcels);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Parcel',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Parcels' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const parcel = await Parcel.findOne({ _id: req.params.id });
			console.log({ parcel });
			console.log(req.params.id);
			if (parcel) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ parcel ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(parcel);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ parcel ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Parcel Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Parcel',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Parcel' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ parcel: req.body });
			const newParcel = await Parcel.create(req.body);
			if (newParcel) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ newParcel ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Parcel Created', data: newParcel });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ newParcel ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Parcel.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Parcel',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Parcel' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ parcel_routes_put: req.body });
			const parcel_id = req.params.id;
			const parcel: any = await Parcel.findById(parcel_id);
			if (parcel) {
				const updatedParcel = await Parcel.updateOne({ _id: parcel_id }, req.body);
				if (updatedParcel) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Parcel',
						data: [ parcel ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Parcel Updated', data: updatedParcel });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ parcel ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Parcel.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Parcel',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Parcel' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Parcel Deleted' };
			const deleted_parcel = await Parcel.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_parcel = await Parcel.deleteOne({ _id: req.params.id });
			if (deleted_parcel) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ deleted_parcel ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Parcel',
					data: [ deleted_parcel ],
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
				collection: 'Parcel',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Parcel' });
		}
	}
};
