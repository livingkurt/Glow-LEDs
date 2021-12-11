import Product from '../models/product';

export default {
	findAll_products_db: async (filter: any, sort: any, limit: any, page: any) => {
		try {
			return await Product.find(filter)
				.sort(sort)
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();
		} catch (error) {
			console.log({ findAll_products_db_error: error });
			throw new Error(error.message);
		}
	},
	findById_products_db: async (id: string) => {
		try {
			return await Product.findOne({ _id: id })
				.populate('color_products')
				.populate('secondary_color_products')
				.populate('secondary_products')
				.populate('option_products')
				.populate('categorys')
				.populate('subcategorys');
		} catch (error) {
			console.log({ findById_products_db_error: error });
			throw new Error(error.message);
		}
	},
	create_products_db: async (body: any) => {
		try {
			return await Product.create(body);
		} catch (error) {
			console.log({ create_products_db_error: error });
			throw new Error(error.message);
		}
	},
	update_products_db: async (id: string, body: any) => {
		try {
			const product: any = await Product.findOne({ _id: id });
			if (product) {
				return await Product.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_products_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_products_db: async (id: string) => {
		try {
			const product: any = await Product.findOne({ _id: id });
			if (product) {
				return await Product.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_products_db_error: error });
			throw new Error(error.message);
		}
	}
};
