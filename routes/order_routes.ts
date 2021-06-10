export {};
import express from 'express';
import { User } from '../models';
import Order from '../models/order';
import { log_error, log_request } from '../util';
const { isAuth, isAdmin } = require('../util');
const scraper = require('table-scraper');

require('dotenv').config();

const router = express.Router();

router.get('/get_one_guest/:id', async (req: any, res: any) => {
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
});

router.get('/get_all', async (req: any, res: any) => {
	try {
		const category = req.query.category ? { category: req.query.category } : {};
		const page: any = req.query.page ? req.query.page : 1;
		const limit: any = req.query.limit ? req.query.limit : 10;
		console.log({ page });
		let user: any;
		let searchKeyword: any;
		if (req.query.searchKeyword) {
			const userSearchKeyword = req.query.searchKeyword
				? {
						user: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};
			user = await User.findOne({ ...userSearchKeyword });
			searchKeyword = { user: user._id };
		}
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
});

router.get('/get_mine', isAuth, async (req: any, res: any) => {
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
});
router.get('/get_user/:id', isAuth, async (req: any, res: any) => {
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
});

router.get('/get_one/:id', isAuth, async (req: any, res: any) => {
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
});

router.post('/user_create_one', isAuth, async (req: any, res: any) => {
	try {
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
});

router.post('/guest_create_one', async (req: any, res: any) => {
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
});

router.put('/update_one/:id', async (req: any, res: any) => {
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
});

router.delete('/delete_one/:id', isAuth, isAdmin, async (req: any, res: any) => {
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
});

router.get('/occurrences', async (req: any, res: any) => {
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
});

router.get('/code_usage/:promo_code', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false });
	const number_of_uses = orders.filter((order: any) => {
		return order.promo_code && order.promo_code.toLowerCase() === req.params.promo_code.toLowerCase();
	}).length;
	const revenue = orders
		.filter(
			(order: any) => order.promo_code && order.promo_code.toLowerCase() === req.params.promo_code.toLowerCase()
		)
		.reduce((a: any, order: any) => a + order.totalPrice - order.taxPrice, 0)
		.toFixed(2);

	console.log({ number_of_uses, revenue });
	res.send({ number_of_uses, revenue });
});

router.get('/all_orders', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false })
		.populate('user')
		.populate('orderItems.product')
		.populate('orderItems.secondary_product');
	res.json(orders);
});

router.get('/last_months_orders', async (req: any, res: any) => {
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
});
router.get('/total_orders', async (req: any, res: any) => {
	const orders = await Order.find({})
		.sort({ date: -1 })
		.populate('user')
		.populate('orderItems.product')
		.populate('orderItems.secondary_product');
	res.json(orders);
});

router.get('/tax_rates', async (req: any, res: any) => {
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
});

router.get('/promo_code_usage', async (req: any, res: any) => {
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
});

router.get('/each_day_income/:date', async (req: any, res: any) => {
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
});

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
router.get('/each_month_income/:date', async (req: any, res: any) => {
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
});

router.get('/daily_income', async (req: any, res: any) => {
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
});
router.get('/weekly_income', async (req: any, res: any) => {
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
});
router.get('/monthly_income', async (req: any, res: any) => {
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
});

// router.put('/addproduct', async (req: any, res: any) => {
// 	try {
// 		const order_id = req.body.order._id;
// 		const product_id = req.body.product;
// 		const order = await Order.findById(order_id)
// 			.populate('orderItems.product')
// 			.populate('orderItems.secondary_product')
// 			.populate('user');
// 		order.orderItems.product._id = product_id;
// 		const updated = await Order.updateOne({ _id: order_id }, order);
// 		res.send(updated);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// router.put('/addsecondaryproduct', async (req: any, res: any) => {
// 	try {
// 		const order_id = req.body.order._id;
// 		const product_id = req.body.secondary_product;
// 		const order = await Order.findById(order_id)
// 			.populate('orderItems.product')
// 			.populate('orderItems.secondary_product')
// 			.populate('user');
// 		for (let item of order.orderItems) {
// 			if (
// 				item.name === 'Mega Diffuser Caps + Adapters Starter Kit' ||
// 				item.name === 'Diffuser Caps + Adapters Starter Kit'
// 			) {
// 				item.secondary_product = product_id;
// 			}
// 		}
// 		console.log({ order });

// 		const updated = await Order.updateOne({ _id: order_id }, order);
// 		res.send(updated);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

export default router;
