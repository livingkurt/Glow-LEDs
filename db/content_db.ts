import Content from '../models/content';

export default {
	findAll_contents_db: async (filter: any, sortOrder: any) => {
		try {
			return await Content.find(filter).sort(sortOrder).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findAll_contents_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_contents_db: async (id: string) => {
		try {
			return await Content.findOne({ _id: id }).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findById_contents_db_error: error });
			throw new Error(error.message);
		}
	},
	create_contents_db: async (body: any) => {
		try {
			return await Content.create(body);
		} catch (error) {
			console.log({ create_contents_db_error: error });
			throw new Error(error.message);
		}
	},
	update_contents_db: async (id: string, body: any) => {
		try {
			const content: any = await Content.findOne({ _id: id });
			if (content) {
				return await Content.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_contents_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_contents_db: async (id: string) => {
		try {
			const content: any = await Content.findOne({ _id: id });
			if (content) {
				return await Content.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_contents_db_error: error });
			throw new Error(error.message);
		}
	}
};

// import { Content } from '../models';

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// 			const category = req.query.category ? { category: req.query.category } : {};
// 			const searchKeyword = req.query.searchKeyword
// 				? {
// 						p: {
// 							$regex: req.query.searchKeyword,
// 							$options: 'i'
// 						}
// 					}
// 				: {};

// 			const sortOrder = { _id: -1 };

// 			const contents = await Content.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);

// 			res.send(contents);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Contents' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			// console.log({ findById: req.params.id });
// 			const content = await Content.findOne({ _id: req.params.id });

// 			// console.log({ content });
// 			if (content) {
// 				res.send(content);
// 			} else {
// 				res.status(404).send({ message: 'Content Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Content' });
// 		}
// 	},
// 	create: async (req: any, res: any) => {
// 		try {
// 			const newContent = await Content.create(req.body);
// 			if (newContent) {
// 				return res.status(201).send({ message: 'New Content Created', data: newContent });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Content.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Creating Content' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			// console.log({ content_routes_put: req.body });
// 			const content_id = req.params.id;
// 			const content: any = await Content.findById(content_id);
// 			if (content) {
// 				const updatedContent = await Content.updateOne({ _id: content_id }, req.body);
// 				if (updatedContent) {
// 					return res.status(200).send({ message: 'Content Updated', data: updatedContent });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Content.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Content' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Content Deleted' };
// 			const deleted_content = await Content.updateOne({ _id: req.params.id }, { deleted: true });
// 			if (deleted_content) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Content' });
// 		}
// 	}
// };
