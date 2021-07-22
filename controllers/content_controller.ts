import { Content } from '../models';
import { log_error, log_request, make_private_code, isAuth, isAdmin } from '../util';
// const { isAuth, isAdmin } = require('../util');

// Defining methods for the booksController
export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						p: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			const sortOrder = { _id: -1 };

			const contents = await Content.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Content',
				data: contents,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(contents);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Content',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Contents' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			// console.log({ findById: req.params.id });
			const content = await Content.findOne({ _id: req.params.id });

			// console.log({ content });
			if (content) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Content',
					data: [ content ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(content);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Content',
					data: [ content ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Content Not Found.' });
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Content',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Content' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newContent = await Content.create(req.body);
			if (newContent) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Content',
					data: [ newContent ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(201).send({ message: 'New Content Created', data: newContent });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Content',
					data: [ newContent ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Content.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Content',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Content' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			// console.log({ content_routes_put: req.body });
			const content_id = req.params.id;
			const content: any = await Content.findById(content_id);
			if (content) {
				const updatedContent = await Content.updateOne({ _id: content_id }, req.body);
				if (updatedContent) {
					log_request({
						method: 'PUT',
						path: req.originalUrl,
						collection: 'Content',
						data: [ content ],
						status: 200,
						success: true,
						ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
					});
					return res.status(200).send({ message: 'Content Updated', data: updatedContent });
				}
			} else {
				log_error({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Content',
					data: [ content ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Updating Content.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Content',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Content' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Content Deleted' };
			const deleted_content = await Content.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_content) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Affiliate',
					data: [ deleted_content ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Affiliate',
					data: [ deleted_content ],
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
				collection: 'Content',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Content' });
		}
	}
};
