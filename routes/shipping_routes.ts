export {};
const express = require('express');
import Order from '../models/order';
import { determine_parcel, log_error, log_request } from '../util';
import { Parcel } from '../models';
const { isAuth, isAdmin } = require('../util');

const easy_post_api = require('@easypost/api');

require('dotenv').config();

const router = express.Router();

router.get('/all_shipping', async (req: any, res: any) => {
	const orders = await Order.find({ deleted: false });
	let all_shipping: any = [];
	orders.forEach((order: any) => {
		all_shipping = [ order.shipping, ...all_shipping ];
	});
	res.send(all_shipping);
});

router.put('/create_label', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;

		const toAddress = new EasyPost.Address({
			name: order.shipping.first_name + ' ' + order.shipping.last_name,
			street1: order.shipping.address_1,
			street2: order.shipping.address_2,
			city: order.shipping.city,
			state: order.shipping.state,
			zip: order.shipping.postalCode,
			country: order.shipping.country
		});
		const fromAddress = new EasyPost.Address({
			street1: '404 Kenniston Dr',
			street2: 'Apt D',
			city: 'Austin',
			state: 'TX',
			zip: '78752',
			country: 'United States',
			company: 'Glow LEDs',
			phone: '906-284-2208',
			email: 'info.glowleds@gmail.com'
		});
		const package_length = order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0);
		const package_width = order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0);
		const package_height = order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0);

		const cube_root_volume = Math.cbrt(package_length * package_width * package_height);

		// const parcel_size = determine_parcel(order.orderItems);

		let weight = 0;
		order.orderItems.forEach((item: any, index: number) => {
			if (item.weight_pounds) {
				weight += item.weight_pounds * 16 + item.weight_ounces;
			} else {
				weight += item.weight_ounces;
			}
		});

		// const parcel = new EasyPost.Parcel({
		// 	length: cube_root_volume,
		// 	width: cube_root_volume,
		// 	height: cube_root_volume,
		// 	weight
		// });
		const parcels = await Parcel.find({ deleted: false });
		const parcel_size = determine_parcel(order.orderItems, parcels);
		const parcel = new EasyPost.Parcel({
			length: parcel_size.length,
			width: parcel_size.width,
			height: parcel_size.height,
			weight
		});
		let customsInfo = {};
		if (order.shipping.international) {
			const customs_items = order.orderItems.map((item: any) => {
				const customs_item = new EasyPost.CustomsItem({
					description: '3D Printed Accessories',
					quantity: item.qty,
					value: item.price,
					weight: item.weight,
					origin_country: 'US'
				});
				return customs_item;
			});

			customsInfo = new EasyPost.CustomsInfo({
				eel_pfc: 'NOEEI 30.37(a)',
				customs_certify: true,
				customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
				contents_type: 'merchandise',
				restriction_type: 'none',
				non_delivery_option: 'return',
				customs_items
			});
		}

		const shipment = new EasyPost.Shipment({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			customsInfo: order.shipping.international ? customsInfo : {}
		});
		const saved_shipment = await shipment.save();
		const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
		const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
		res.send(label);
	} catch (err) {
		console.log(err);
	}
});

router.put('/create_return_label', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;

		const toAddress = new EasyPost.Address({
			street1: '404 Kenniston Dr',
			street2: 'Apt D',
			city: 'Austin',
			state: 'TX',
			zip: '78752',
			country: 'United States',
			company: 'Glow LEDs',
			phone: '906-284-2208',
			email: 'info.glowleds@gmail.com'
		});

		const fromAddress = new EasyPost.Address({
			name: order.shipping.first_name + ' ' + order.shipping.last_name,
			street1: order.shipping.address_1,
			street2: order.shipping.address_2,
			city: order.shipping.city,
			state: order.shipping.state,
			zip: order.shipping.postalCode,
			country: order.shipping.country
		});

		// const cube_root_volume = Math.cbrt(
		// 	order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0) *
		// 		order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0) *
		// 		order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0)
		// );
		const package_length = order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0);
		const package_width = order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0);
		const package_height = order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0);

		const cube_root_volume = Math.cbrt(package_length * package_width * package_height);

		// const parcel_size = determine_parcel(order.orderItems);
		let weight = 0;
		order.orderItems.forEach((item: any, index: number) => {
			if (item.weight_pounds) {
				weight += item.weight_pounds * 16 + item.weight_ounces;
			} else {
				weight += item.weight_ounces;
			}
		});
		// const parcel = new EasyPost.Parcel({
		// 	length: cube_root_volume,
		// 	width: cube_root_volume,
		// 	height: cube_root_volume,
		// 	weight
		// });
		const parcels = await Parcel.find({ deleted: false });
		const parcel_size = determine_parcel(order.orderItems, parcels);
		const parcel = new EasyPost.Parcel({
			length: parcel_size.length,
			width: parcel_size.width,
			height: parcel_size.height,
			weight
		});
		let customsInfo = {};
		if (order.shipping.international) {
			const customs_items = order.orderItems.map((item: any) => {
				const customs_item = new EasyPost.CustomsItem({
					description: '3D Printed Accessories',
					quantity: item.qty,
					value: item.price,
					weight: item.weight,
					origin_country: 'US'
				});
				return customs_item;
			});

			customsInfo = new EasyPost.CustomsInfo({
				eel_pfc: 'NOEEI 30.37(a)',
				customs_certify: true,
				customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
				contents_type: 'merchandise',
				restriction_type: 'none',
				non_delivery_option: 'return',
				customs_items
			});
		}

		const shipment = new EasyPost.Shipment({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			customsInfo: order.shipping.international ? customsInfo : {}
		});
		const saved_shipment = await shipment.save();
		// console.log({ saved_shipment });
		const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
		const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
		// console.log({ label });
		res.send(label);
	} catch (err) {
		console.log(err);
	}
});

router.put('/get_shipping_rates', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;

		const toAddress = new EasyPost.Address({
			name: order.shipping.first_name + ' ' + order.shipping.last_name,
			street1: order.shipping.address_1,
			street2: order.shipping.address_2,
			city: order.shipping.city,
			state: order.shipping.state,
			zip: order.shipping.postalCode,
			country: order.shipping.country
		});
		const fromAddress = new EasyPost.Address({
			street1: '404 Kenniston Dr',
			street2: 'Apt D',
			city: 'Austin',
			state: 'TX',
			zip: '78752',
			country: 'United States',
			company: 'Glow LEDs',
			phone: '906-284-2208',
			email: 'info.glowleds@gmail.com'
		});
		// const cube_root_volume = Math.cbrt(
		// 	order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0) *
		// 		order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0) *
		// 		order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0)
		// );
		const package_length = order.orderItems.reduce((a: any, c: { package_length: any }) => a + c.package_length, 0);
		const package_width = order.orderItems.reduce((a: any, c: { package_width: any }) => a + c.package_width, 0);
		const package_height = order.orderItems.reduce((a: any, c: { package_height: any }) => a + c.package_height, 0);

		const cube_root_volume = Math.cbrt(package_length * package_width * package_height);
		const parcels = await Parcel.find({ deleted: false });
		// console.log({ parcels });

		let weight = 0;
		order.orderItems.forEach((item: any, index: number) => {
			if (item.weight_pounds) {
				weight += item.weight_pounds * 16 + item.weight_ounces;
			} else {
				weight += item.weight_ounces;
			}
		});
		console.log({ weight });
		// const parcel = new EasyPost.Parcel({
		// 	length: cube_root_volume,
		// 	width: cube_root_volume,
		// 	height: cube_root_volume,
		// 	weight
		// });
		const parcel_size = determine_parcel(order.orderItems, parcels);
		const parcel = new EasyPost.Parcel({
			length: parcel_size.length,
			width: parcel_size.width,
			height: parcel_size.height,
			weight
		});
		let customsInfo = {};
		if (order.shipping.international) {
			const customs_items = order.orderItems.map((item: any) => {
				const customs_item = new EasyPost.CustomsItem({
					description: '3D Printed Accessories',
					quantity: item.qty,
					value: item.price,
					weight: item.weight,
					origin_country: 'US'
				});
				return customs_item;
			});

			customsInfo = new EasyPost.CustomsInfo({
				eel_pfc: 'NOEEI 30.37(a)',
				customs_certify: true,
				customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
				contents_type: 'merchandise',
				restriction_type: 'none',
				non_delivery_option: 'return',
				customs_items
			});
		}

		const shipment = new EasyPost.Shipment({
			to_address: toAddress,
			from_address: fromAddress,
			parcel: parcel,
			customsInfo: order.shipping.international ? customsInfo : {}
		});
		const saved_shipment = await shipment.save();
		res.send({ shipment: saved_shipment, parcel: parcel_size });
	} catch (err) {
		console.log(err);
	}
});
router.put('/buy_label', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = req.body.order;
		const created_shipment = await EasyPost.Shipment.retrieve(order.shipping.shipment_id);
		const label = await created_shipment.buy(order.shipping.shipping_rate, 0);
		res.send(label);
	} catch (err) {
		console.log(err);
	}
});

router.put('/tracking_number', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = await Order.findById(req.body.order._id);
		if (order) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ order ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			// console.log({ tracker: req.body.label.tracker.id });
			const tracker = await EasyPost.Tracker.retrieve(req.body.label.tracker.id);
			// const tracker = new EasyPost.Tracker.retrieve(req.body.label.tracker.id);
			console.log({ tracker });
			console.log({ tracker: tracker.tracking_details });

			// console.log({req.body})
			order.shipping.shipment_tracking = req.body.tracker;
			order.tracking_number = req.body.tracking_number;
			order.shipping.shipping_label = req.body.label;
			const updated = await Order.updateOne({ _id: req.body.order._id }, order);
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
				res.send(updated);
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
		res.status(500).send({ error, message: 'Error Refunding Order' });
	}
});
router.put('/return_tracking_number', async (req: any, res: any) => {
	try {
		const EasyPost = new easy_post_api(process.env.EASY_POST);
		const order = await Order.findById(req.body.order._id);
		if (order) {
			log_request({
				method: 'PUT',
				path: req.originalUrl,
				collection: 'Order',
				data: [ order ],
				status: 201,
				success: true,
				ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
			});
			const tracker = await EasyPost.Tracker.retrieve(req.body.label.tracker.id);
			// const tracker = new EasyPost.Tracker.retrieve(req.body.label.tracker.id);
			console.log({ tracker });
			console.log({ tracker: tracker.tracking_details });
			console.log({ body: req.body });

			console.log({ order });
			order.shipping.return_shipment_tracking = req.body.tracker;
			order.return_tracking_number = req.body.tracking_number;
			order.shipping.return_shipping_label = req.body.label;
			console.log({ order });
			const updated = await Order.updateOne({ _id: req.body.order._id }, order);

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
				res.send(updated);
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
		res.status(500).send({ error, message: 'Error Return Shipment' });
	}
});

export default router;
