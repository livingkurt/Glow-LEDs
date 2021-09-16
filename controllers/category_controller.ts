import { Category } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const categorys = await Category.find({}).populate('subcategorys');
			res.send(categorys);
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Getting Categorys' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const category = await Category.findOne({ _id: req.params.id }).populate('subcategorys');

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
			const category: any = await Category.findById(req.params.id);
			if (category) {
				const updatedCategory = await Category.updateOne({ _id: req.params.id }, req.body);
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
			const deleted_category = await Category.updateOne({ _id: req.params.id }, { deleted: true });
			console.log({ deleted_category });
			if (deleted_category) {
				res.send({ message: 'Category Deleted' });
			} else {
				res.send({ message: 'Error Deleting Category' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Deleting Category' });
		}
	}
};
