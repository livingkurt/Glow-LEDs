import { Category } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						category_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			// let sortOrder = {};
			// if (req.query.sortOrder === 'lowest') {
			// 	sortOrder = { amount: 1 };
			// } else if (req.query.sortOrder === 'highest') {
			// 	sortOrder = { amount: -1 };
			// } else if (req.query.sortOrder === 'newest') {
			// 	sortOrder = { _id: -1 };
			// } else if (req.query.sortOrder === 'date' || req.query.sortOrder === '') {
			// 	sortOrder = { date_of_purchase: -1 };
			// } else if (req.query.sortOrder === 'category') {
			// 	sortOrder = { category: 1, createdAt: -1 };
			// } else if (req.query.sortOrder === 'application') {
			// 	sortOrder = { application: 1, createdAt: -1 };
			// }

			// const categorys = await Category.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);
			const categorys = await Category.find({}).populate('subcategorys');
			console.log({ categorys });
			res.send(categorys);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Categorys' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const category = await Category.findOne({ _id: req.params.id }).populate('subcategorys');
			console.log({ category });
			console.log(req.params.id);
			if (category) {
				res.send(category);
			} else {
				res.status(404).send({ message: 'Category Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Category' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			console.log({ create: req.body });
			const newCategory = await Category.create(req.body);
			if (newCategory) {
				return res.status(201).send({ message: 'New Category Created', data: newCategory });
			} else {
				return res.status(500).send({ message: ' Error in Creating Category.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Category' });
		}
	},

	update: async (req: any, res: any) => {
		try {
			console.log({ category_routes_put: req.body });
			const category_id = req.params.id;
			const category: any = await Category.findById(category_id);
			if (category) {
				const updatedCategory = await Category.updateOne({ _id: category_id }, req.body);
				if (updatedCategory) {
					return res.status(200).send({ message: 'Category Updated', data: updatedCategory });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Category.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Category' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Category Deleted' };

			const deleted_category = await Category.updateOne({ _id: req.params.id }, { deleted: true });
			console.log({ deleted_category });
			if (deleted_category) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Category' });
		}
	}
};
