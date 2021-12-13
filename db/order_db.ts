import Order from '../models/order';

export default {
	findAll_orders_db: async (filter: any, sort: any, limit = 10, page = 1) => {
		try {
			return await Order.find(filter)
				.sort(sort)
				.populate('user')
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.sort(sort)
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();
		} catch (error) {
			console.log({ findAll_orders_db_error: error });
			throw new Error(error.message);
		}
	},

	findById_orders_db: async (id: string) => {
		try {
			return await Order.findOne({ _id: id })
				.populate('user')
				.populate('orderItems.product')
				.populate('orderItems.secondary_product');
		} catch (error) {
			console.log({ findById_orders_db_error: error });
			throw new Error(error.message);
		}
	},
	create_orders_db: async (body: any) => {
		try {
			return await Order.create(body);
		} catch (error) {
			console.log({ create_orders_db_error: error });
			throw new Error(error.message);
		}
	},
	update_orders_db: async (id: string, body: any) => {
		try {
			const order: any = await Order.findOne({ _id: id });
			if (order) {
				return await Order.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_orders_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_orders_db: async (id: string) => {
		try {
			const order: any = await Order.findOne({ _id: id });
			if (order) {
				return await Order.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_orders_db_error: error });
			throw new Error(error.message);
		}
	},
	count_orders_db: async (filter: any) => {
		try {
			return await Order.countDocuments(filter);
		} catch (error) {
			console.log({ remove_order_db_error: error });
			throw new Error(error.message);
		}
	}
};
