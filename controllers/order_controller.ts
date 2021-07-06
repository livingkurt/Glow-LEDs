export {};
import { Order, User } from '../models';
import { log_error, log_request, make_private_code, isAuth, isAdmin } from '../util';

const scraper = require('table-scraper');

const dates_in_year = [
	{ month: 1, number_of_days: 31 },
	{ month: 2, number_of_days: 28 },
	{ month: 3, number_of_days: 31 },
	{ month: 4, number_of_days: 30 },
	{ month: 5, number_of_days: 31 },
	{ month: 6, number_of_days: 30 },
	{ month: 7, number_of_days: 31 },
	{ month: 8, number_of_days: 31 },
	{ month: 9, number_of_days: 30 },
	{ month: 10, number_of_days: 31 },
	{ month: 11, number_of_days: 30 },
	{ month: 12, number_of_days: 31 }
];
const today = new Date();
// Defining methods for the booksController
export default {
	get_guest_order: async (req: any, res: any) => {
		try {
			console.log(req.params.id);
			const order = await Order.findOne({ _id: req.params.id })
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.populate('user');
			console.log({ order });
			if (order) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Order',
					data: order,
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(order);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Order',
					data: order,
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send('Order Not Found.');
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Order' });
		}
	},
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const page: any = req.query.page ? req.query.page : 1;
			const limit: any = req.query.limit ? req.query.limit : 10;
			console.log({ page });
			// let user: any;
			// let searchKeyword: any;
			// if (req.query.searchKeyword) {
			// 	const userSearchKeyword = req.query.searchKeyword
			// 		? {
			// 				user: {
			// 					$regex: req.query.searchKeyword,
			// 					$options: 'i'
			// 				}
			// 			}
			// 		: {};
			// 	user = await User.findOne({ ...userSearchKeyword });
			// 	searchKeyword = { user: user._id };
			// }
			const searchKeyword = req.query.searchKeyword ? { _id: req.query.searchKeyword } : {};
			// const searchKeyword = { _id: req.query.searchKeyword };
			console.log({ searchKeyword });
			let sortOrder = {};
			if (req.query.sortOrder === 'lowest') {
				sortOrder = { totalPrice: 1 };
			} else if (req.query.sortOrder === 'highest') {
				sortOrder = { totalPrice: -1 };
			} else if (req.query.sortOrder === 'date' || req.query.sortOrder === '') {
				sortOrder = { createdAt: -1 };
			} else if (req.query.sortOrder === 'paid') {
				sortOrder = { isPaid: -1, createdAt: -1 };
			} else if (req.query.sortOrder === 'manufactured') {
				sortOrder = { isManufactured: -1, createdAt: -1 };
			} else if (req.query.sortOrder === 'packaged') {
				sortOrder = { isPackaged: -1, createdAt: -1 };
			} else if (req.query.sortOrder === 'shipped') {
				sortOrder = { isShipped: -1, createdAt: -1 };
			} else if (req.query.sortOrder === 'delivered') {
				sortOrder = { isDelivered: -1, createdAt: -1 };
			}
			// execute query with page and limit values
			const orders = await Order.find({ deleted: false, ...category, ...searchKeyword })
				.populate('user')
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.sort(sortOrder)
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();

			// get total documents in the Posts collection
			const count = await Order.countDocuments();

			// return response with posts, total pages, and current page
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			console.log({ orders });
			res.json({
				orders,
				totalPages: Math.ceil(count / limit),
				currentPage: parseInt(page)
			});
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	get_my_orders: async (req: any, res: any) => {
		try {
			const orders = await Order.find({ deleted: false, user: req.user._id }).sort({ _id: -1 });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Your Orders' });
		}
	},
	get_user_orders: async (req: any, res: any) => {
		try {
			const orders = await Order.find({ deleted: false, user: req.params.id }).sort({ _id: -1 });
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.send(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Your Orders' });
		}
	},
	get_one_order: async (req: any, res: any) => {
		try {
			const order = await Order.findOne({ _id: req.params.id })
				.populate('orderItems.product')
				.populate('orderItems.secondary_product')
				.populate('user');
			if (order) {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Order',
					data: order,
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(order);
			} else {
				log_request({
					method: 'GET',
					path: req.originalUrl,
					collection: 'Order',
					data: order,
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send('Order Not Found.');
			}
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Order' });
		}
	},
	create_user_order: async (req: any, res: any) => {
		try {
			console.log({ user_create_one: req.body });
			console.log({ isPaid: req.body.isPaid });
			console.log({ paidAt: today });
			const newOrder = new Order({
				orderItems: req.body.orderItems,
				user: req.body.user ? req.body.user._id : req.user._id,
				shipping: req.body.shipping,
				payment: req.body.payment,
				itemsPrice: req.body.itemsPrice,
				taxPrice: req.body.taxPrice,
				shippingPrice: req.body.shippingPrice,
				totalPrice: req.body.totalPrice,
				order_note: req.body.order_note,
				promo_code: req.body.promo_code,
				parcel: req.body.parcel,
				isPaid: req.body.isPaid,
				paidAt: req.body.isPaid ? today : null,
				deleted: false
			});
			const newOrderCreated = await newOrder.save();
			if (newOrderCreated) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Order',
					data: [ newOrderCreated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Order',
					data: [ newOrderCreated ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Order.' });
			}
		} catch (error) {
			console.log({ error });
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Order' });
		}
	},
	create_guest_order: async (req: any, res: any) => {
		try {
			console.log({ body: req.body });
			const newOrderCreated = await Order.create({ ...req.body, guest: true });
			console.log({ newOrderCreated });

			if (newOrderCreated) {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Order',
					data: [ newOrderCreated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(201).send({ message: 'New Order Created', newOrder: newOrderCreated });
			} else {
				log_request({
					method: 'POST',
					path: req.originalUrl,
					collection: 'Order',
					data: [ newOrderCreated ],
					status: 500,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				return res.status(500).send({ message: ' Error in Creating Order.' });
			}
		} catch (error) {
			log_error({
				method: 'POST',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Creating Order' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			const updated_order = req.body;
			const updated = await Order.updateOne({ _id: req.params.id }, updated_order);
			if (updated) {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Order',
					data: [ updated ],
					status: 201,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(updated_order);
			} else {
				log_request({
					method: 'PUT',
					path: req.originalUrl,
					collection: 'Product',
					data: [ updated ],
					status: 404,
					success: false,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.status(404).send({ message: 'Order not Updated.' });
			}
		} catch (error) {
			log_error({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Updating Order' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Order Deleted' };
			const deleted_order = await Order.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_order) {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Order',
					data: [ deleted_order ],
					status: 200,
					success: true,
					ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
				});
				res.send(message);
			} else {
				log_request({
					method: 'DELETE',
					path: req.originalUrl,
					collection: 'Order',
					data: [ deleted_order ],
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
				collection: 'Order',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Deleting Order' });
		}
	},
	occurrences: async (req: any, res: any) => {
		const orders = await Order.find({ deleted: false }).populate('orderItems.secondary_product');
		const products: any = [];
		const ids: any = [];
		orders.forEach((order: any) => {
			order.orderItems.map((item: any) => {
				products.push(item.name);
				ids.push(item._id);
				if (item.secondary_product) {
					products.push(item.secondary_product.name);
					ids.push(item.secondary_product._id);
				}
			});
		});
		// console.log({ ids });
		const result: any = {};
		const ids_result: any = {};
		for (let i = 0; i < products.length; ++i) {
			if (!result[products[i]]) {
				result[products[i]] = 0;
				ids_result[ids[i]] = 0;
			}
			++result[products[i]];
			++ids_result[ids[i]];
		}
		// console.log({ ids_result });
		const final_result = [];
		for (const i in result) {
			const entry = { name: i, occurrence: result[i], id: ids_result[i] };
			final_result.push(entry);
		}
		final_result.sort((a, b) => (a.occurrence > b.occurrence ? -1 : 1));
		res.send(final_result);
	},
	code_usage: async (req: any, res: any) => {
		const orders = await Order.find({ deleted: false });
		const number_of_uses = orders.filter((order: any) => {
			return order.promo_code && order.promo_code.toLowerCase() === req.params.promo_code.toLowerCase();
		}).length;
		const revenue = orders
			.filter(
				(order: any) =>
					order.promo_code && order.promo_code.toLowerCase() === req.params.promo_code.toLowerCase()
			)
			.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
			.toFixed(2);

		console.log({ number_of_uses, revenue });
		res.send({ number_of_uses, revenue });
	},
	all_orders: async (req: any, res: any) => {
		const orders = await Order.find({ deleted: false })
			.populate('user')
			.populate('orderItems.product')
			.populate('orderItems.secondary_product');
		res.json(orders);
	},
	last_months_orders: async (req: any, res: any) => {
		const orders = await Order.find({
			createdAt: {
				$gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
			}
		})
			.sort({ date: -1 })
			.populate('user')
			.populate('orderItems.product')
			.populate('orderItems.secondary_product');
		res.json(orders);
	},
	total_orders: async (req: any, res: any) => {
		const orders = await Order.find({})
			.sort({ date: -1 })
			.populate('user')
			.populate('orderItems.product')
			.populate('orderItems.secondary_product');
		res.json(orders);
	},
	tax_rates: async (req: any, res: any) => {
		const updatedSalesTaxes = 'http://www.salestaxinstitute.com/resources/rates';
		const result: any = {};

		const tableData = await scraper.get(updatedSalesTaxes);

		const tempData = tableData[0];
		tempData.map((state: any) => {
			const percentage = state['State Rate'];
			result[state['State']] = percentage.slice(0, percentage.indexOf('%') + 1);
		});
		// console.log({ result });
		res.send(result);
	},
	promo_code_usage: async (req: any, res: any) => {
		try {
			const orders = await Order.find({ deleted: false })
				// .limit(100)
				.populate('user')
				.populate('orderItems.product')
				.populate('orderItems.secondary_product');
			res.send(orders);
		} catch (error) {
			// log_error({
			// 	method: 'GET',
			// 	path: req.originalUrl,
			// 	collection: 'Product',
			// 	error,
			// 	status: 500,
			// 	success: false
			// });
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	each_day_income: async (req: any, res: any) => {
		try {
			const date = req.params.date;
			const orders = await Order.find({
				deleted: false,
				createdAt: {
					$gt: new Date(<any>new Date(date).setHours(0, 0, 0)),
					$lt: new Date(<any>new Date(date).setHours(23, 59, 59))
				}
			});
			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.json(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	each_month_income: async (req: any, res: any) => {
		try {
			const start_date = req.params.date;
			const year = start_date.split('-')[0];
			const month = start_date.split('-')[1];
			const day = dates_in_year[parseInt(start_date.split('-')[1]) - 1].number_of_days;
			const end_date = year + '-' + month + '-' + day;
			console.log({ start_date, end_date });
			const orders = await Order.find({
				deleted: false,
				createdAt: {
					$gt: new Date(<any>new Date(start_date).setHours(0, 0, 0) - 30 * 60 * 60 * 24 * 1000),
					$lt: new Date(<any>new Date(end_date).setHours(23, 59, 59))
				}
			});

			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.json(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	daily_income: async (req: any, res: any) => {
		try {
			const orders = await Order.find({
				deleted: false,
				createdAt: {
					$gte: new Date(<any>new Date() - 1 * 60 * 60 * 24 * 1000)
				}
			});

			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.json(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	weekly_income: async (req: any, res: any) => {
		try {
			const orders = await Order.find({
				deleted: false,
				createdAt: {
					$gte: new Date(<any>new Date() - 7 * 60 * 60 * 24 * 1000)
				}
			});

			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.json(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	},
	monthly_income: async (req: any, res: any) => {
		try {
			const orders = await Order.find({
				deleted: false,
				createdAt: {
					$gte: new Date(<any>new Date() - 30 * 60 * 60 * 24 * 1000)
				}
			});

			log_request({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				data: orders,
				status: 200,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			res.json(orders);
		} catch (error) {
			log_error({
				method: 'GET',
				path: req.originalUrl,
				collection: 'Product',
				error,
				status: 500,
				success: false
			});
			res.status(500).send({ error, message: 'Error Getting Orders' });
		}
	}
};
