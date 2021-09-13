import { Palette } from '../models';
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

			const palettes = await Palette.find({ deleted: false });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Palette',
				data: palettes,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(palettes);
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Palette',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Palettes' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const palette = await Palette.findOne({ _id: req.params.id });
			console.log({ palette });
			console.log(req.params.id);
			if (palette) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ palette ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(palette);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ palette ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Palette Not Found.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Palette',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Palette' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ palette: req.body });
			const newPalette = await Palette.create(req.body);
			if (newPalette) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ newPalette ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Palette Created', data: newPalette });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ newPalette ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Palette.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Palette',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Palette' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ palette_routes_put: req.body });
			const palette_id = req.params.id;
			const palette: any = await Palette.findById(palette_id);
			if (palette) {
				const updatedPalette = await Palette.updateOne({ _id: palette_id }, req.body);
				if (updatedPalette) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Palette',
						data: [ palette ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Palette Updated', data: updatedPalette });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ palette ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Palette.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Palette',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Palette' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Palette Deleted' };
			const deleted_palette = await Palette.updateOne({ _id: req.params.id }, { deleted: true });
			// const deleted_palette = await Palette.deleteOne({ _id: req.params.id });
			if (deleted_palette) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ deleted_palette ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Palette',
					data: [ deleted_palette ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'DELETE',
				path: req.originalUrl,
				collection: 'Palette',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Palette' });
		}
	}
};
