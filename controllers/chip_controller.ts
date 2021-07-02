import { Chip } from '../models';
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

			const chips = await Chip.find({ deleted: false, ...category, ...searchKeyword })
				.sort(sortOrder)
				.populate('user');
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Chip',
				data: chips,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(chips);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Chip',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Chips' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const chip = await Chip.findOne({ _id: req.params.id }).populate('user');
			console.log({ chip });
			console.log(req.params.id);
			if (chip) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ chip ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(chip);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ chip ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Chip Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Chip',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Chip' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newChip = await Chip.create(req.body);
			if (newChip) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ newChip ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Chip Created', data: newChip });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ newChip ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Chip.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Chip',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Chip' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ chip_routes_put: req.body });
			const chip_id = req.params.id;
			const chip: any = await Chip.findById(chip_id);
			if (chip) {
				const updatedChip = await Chip.updateOne({ _id: chip_id }, req.body);
				if (updatedChip) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Chip',
						data: [ chip ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Chip Updated', data: updatedChip });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ chip ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Chip.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Chip',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Chip' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Chip Deleted' };
			const deleted_chip = await Chip.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_chip) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ deleted_chip ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Chip',
					data: [ deleted_chip ],
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
				collection: 'Chip',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Chip' });
		}
	}
};
