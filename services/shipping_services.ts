import { order_db, parcel_db } from '../db';
import { determine_parcel } from '../util';

const easy_post_api = require('@easypost/api');

export default {
	all_shipping_shipping_s: async () => {
		try {
			const orders = await order_db.findAll_orders_db({ deleted: false }, {}, 0, 1);
			let all_shipping: any = [];
			orders.forEach((order: any) => {
				all_shipping = [ order.shipping, ...all_shipping ];
			});
			return all_shipping;
		} catch (error) {
			console.log({ findAll_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	create_label_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const order = body.order;

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

			let weight = 0;
			order.orderItems.forEach((item: any, index: number) => {
				if (item.weight_pounds) {
					weight += item.weight_pounds * 16 + item.weight_ounces;
				} else {
					weight += item.weight_ounces;
				}
			});
			const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {});
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
			return label;
		} catch (error) {
			console.log({ findById_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	buy_label_shipping_s: async (body: any) => {
		const { shipping_rate, shipment_id } = body;
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const created_shipment = await EasyPost.Shipment.retrieve(shipment_id);
			const label = await created_shipment.buy(shipping_rate, 0);
			return label;
		} catch (error) {
			console.log({ create_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	get_custom_shipping_rates_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const to_shipping = body.data.to_shipping;
			const from_shipping = body.data.from_shipping;
			const package_dimensions = body.data.package_dimensions;
			const toAddress = new EasyPost.Address({
				name: to_shipping.company ? '' : to_shipping.first_name + ' ' + to_shipping.last_name,
				street1: to_shipping.address_1,
				street2: to_shipping.address_2,
				city: to_shipping.city,
				state: to_shipping.state,
				zip: to_shipping.postalCode,
				country: to_shipping.country,
				company: to_shipping.company,
				phone: to_shipping.phone,
				email: to_shipping.email
			});
			const fromAddress = new EasyPost.Address({
				name: from_shipping.company ? '' : from_shipping.first_name + ' ' + from_shipping.last_name,
				street1: from_shipping.address_1,
				street2: from_shipping.address_2,
				city: from_shipping.city,
				state: from_shipping.state,
				zip: from_shipping.postalCode,
				country: from_shipping.country,
				company: from_shipping.company,
				phone: from_shipping.phone,
				email: from_shipping.email
			});

			let weight = 0;
			if (parseInt(package_dimensions.weight_pounds)) {
				weight += parseInt(package_dimensions.weight_pounds) * 16 + parseInt(package_dimensions.weight_ounces);
			} else {
				weight += parseInt(package_dimensions.weight_ounces);
			}

			const parcel = new EasyPost.Parcel({
				length: package_dimensions.package_length,
				width: package_dimensions.package_width,
				height: package_dimensions.package_height,
				weight
			});

			const shipment = new EasyPost.Shipment({
				to_address: toAddress,
				from_address: fromAddress,
				parcel: parcel
			});
			const saved_shipment = await shipment.save();
			return { shipment: saved_shipment, parcel: package_dimensions };
		} catch (error) {
			console.log({ update_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	create_return_label_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const order = body.order;

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

			let weight = 0;
			order.orderItems.forEach((item: any, index: number) => {
				if (item.weight_pounds) {
					weight += item.weight_pounds * 16 + item.weight_ounces;
				} else {
					weight += item.weight_ounces;
				}
			});
			const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {});
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
			return label;
		} catch (error) {
			console.log({ remove_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	get_shipping_rates_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const order = body.order;

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
			const package_length = order.orderItems.reduce(
				(a: any, c: { package_length: any }) => a + c.package_length,
				0
			);
			const package_width = order.orderItems.reduce(
				(a: any, c: { package_width: any }) => a + c.package_width,
				0
			);
			const package_height = order.orderItems.reduce(
				(a: any, c: { package_height: any }) => a + c.package_height,
				0
			);

			const cube_root_volume = Math.cbrt(package_length * package_width * package_height);
			const parcels = await parcel_db.findAll_parcels_db({ deleted: false }, {});
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
			if (saved_shipment.rates.length > 0) {
				return { shipment: saved_shipment, parcel: parcel_size };
			} else {
				return {
					message: 'Shipping Failed',
					solution: 'Please double check your shipping address for incorrect formatting'
				};
			}
		} catch (error) {
			console.log({ remove_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	tracking_number_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const order = await order_db.findById_orders_db(body.order._id);
			if (order) {
				// console.log({ tracker: body.label.tracker.id });
				const tracker = await EasyPost.Tracker.retrieve(body.label.tracker.id);
				// const tracker = new EasyPost.Tracker.retrieve(body.label.tracker.id);
				console.log({ tracker });
				console.log({ tracker: tracker.tracking_details });

				// console.log({body})
				order.shipping.shipment_tracking = body.tracker;
				order.tracking_number = body.tracking_number;
				order.shipping.shipping_label = body.label;
				const updated = await order_db.update_orders_db(body.order._id, order);
				if (updated) {
					return updated;
				} else {
					throw new Error('Order not Updated.');
				}
			}
		} catch (error) {
			console.log({ remove_shipping_s_error: error });
			throw new Error(error.message);
		}
	},
	return_tracking_number_shipping_s: async (body: any) => {
		try {
			const EasyPost = new easy_post_api(process.env.EASY_POST);
			const order = await order_db.findById_orders_db(body.order._id);
			if (order) {
				const tracker = await EasyPost.Tracker.retrieve(body.label.tracker.id);
				// const tracker = new EasyPost.Tracker.retrieve(body.label.tracker.id);
				console.log({ tracker });
				console.log({ tracker: tracker.tracking_details });
				console.log({ body: body });

				console.log({ order });
				order.shipping.return_shipment_tracking = body.tracker;
				order.return_tracking_number = body.tracking_number;
				order.shipping.return_shipping_label = body.label;
				console.log({ order });
				const updated = await order_db.update_orders_db(body.order._id, order);

				if (updated) {
					return updated;
				} else {
					throw new Error('Order not Updated.');
				}
			}
		} catch (error) {
			console.log({ remove_shipping_s_error: error });
			throw new Error(error.message);
		}
	}
};

// import { Order, Parcel } from '../models';
// import { determine_parcel } from '../util';

// const easy_post_api = require('@easypost/api');

// require('dotenv').config();

// export default {
// 	all_shipping: async (req: any, res: any) => {
// const orders = await Order.find({ deleted: false });
// let all_shipping: any = [];
// orders.forEach((order: any) => {
// 	all_shipping = [ order.shipping, ...all_shipping ];
// });
// 		res.send(all_shipping);
// 	},
// 	create_label: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const order = req.body.order;

// const toAddress = new EasyPost.Address({
// 	name: order.shipping.first_name + ' ' + order.shipping.last_name,
// 	street1: order.shipping.address_1,
// 	street2: order.shipping.address_2,
// 	city: order.shipping.city,
// 	state: order.shipping.state,
// 	zip: order.shipping.postalCode,
// 	country: order.shipping.country
// });
// const fromAddress = new EasyPost.Address({
// 	street1: '404 Kenniston Dr',
// 	street2: 'Apt D',
// 	city: 'Austin',
// 	state: 'TX',
// 	zip: '78752',
// 	country: 'United States',
// 	company: 'Glow LEDs',
// 	phone: '906-284-2208',
// 	email: 'info.glowleds@gmail.com'
// });

// let weight = 0;
// order.orderItems.forEach((item: any, index: number) => {
// 	if (item.weight_pounds) {
// 		weight += item.weight_pounds * 16 + item.weight_ounces;
// 	} else {
// 		weight += item.weight_ounces;
// 	}
// });
// const parcels = await Parcel.find({ deleted: false });
// const parcel_size = determine_parcel(order.orderItems, parcels);
// const parcel = new EasyPost.Parcel({
// 	length: parcel_size.length,
// 	width: parcel_size.width,
// 	height: parcel_size.height,
// 	weight
// });
// let customsInfo = {};
// if (order.shipping.international) {
// 	const customs_items = order.orderItems.map((item: any) => {
// 		const customs_item = new EasyPost.CustomsItem({
// 			description: '3D Printed Accessories',
// 			quantity: item.qty,
// 			value: item.price,
// 			weight: item.weight,
// 			origin_country: 'US'
// 		});
// 		return customs_item;
// 	});

// 	customsInfo = new EasyPost.CustomsInfo({
// 		eel_pfc: 'NOEEI 30.37(a)',
// 		customs_certify: true,
// 		customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
// 		contents_type: 'merchandise',
// 		restriction_type: 'none',
// 		non_delivery_option: 'return',
// 		customs_items
// 	});
// }

// const shipment = new EasyPost.Shipment({
// 	to_address: toAddress,
// 	from_address: fromAddress,
// 	parcel: parcel,
// 	customsInfo: order.shipping.international ? customsInfo : {}
// });
// const saved_shipment = await shipment.save();
// const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
// const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
// res.send(label);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	},

// 	buy_label: async (req: any, res: any) => {
// 		try {
// 			const EasyPost = new easy_post_api(process.env.EASY_POST);
// 			const shipping_rate = req.body.shipping_rate;
// 			const shipment_id = req.body.shipment_id;
// 			console.log({ shipping_rate, shipment_id });
// 			const created_shipment = await EasyPost.Shipment.retrieve(shipment_id);
// 			const label = await created_shipment.buy(shipping_rate, 0);
// 			res.send(label);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	},
// 	different_shipping_rates: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const shipping_rate = req.body.data.shipping_rate;
// const shipment_id = req.body.data.shipment_id;
// console.log({ shipping_rate, shipment_id });
// const created_shipment = await EasyPost.Shipment.retrieve(shipment_id);
// // const label = await created_shipment.buy(shipping_rate, 0);
// res.send(created_shipment);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	},
// 	get_custom_shipping_rates: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const to_shipping = req.body.data.to_shipping;
// const from_shipping = req.body.data.from_shipping;
// const package_dimensions = req.body.data.package_dimensions;
// const toAddress = new EasyPost.Address({
// 	name: to_shipping.company ? '' : to_shipping.first_name + ' ' + to_shipping.last_name,
// 	street1: to_shipping.address_1,
// 	street2: to_shipping.address_2,
// 	city: to_shipping.city,
// 	state: to_shipping.state,
// 	zip: to_shipping.postalCode,
// 	country: to_shipping.country,
// 	company: to_shipping.company,
// 	phone: to_shipping.phone,
// 	email: to_shipping.email
// });
// const fromAddress = new EasyPost.Address({
// 	name: from_shipping.company ? '' : from_shipping.first_name + ' ' + from_shipping.last_name,
// 	street1: from_shipping.address_1,
// 	street2: from_shipping.address_2,
// 	city: from_shipping.city,
// 	state: from_shipping.state,
// 	zip: from_shipping.postalCode,
// 	country: from_shipping.country,
// 	company: from_shipping.company,
// 	phone: from_shipping.phone,
// 	email: from_shipping.email
// });

// let weight = 0;
// if (parseInt(package_dimensions.weight_pounds)) {
// 	weight += parseInt(package_dimensions.weight_pounds) * 16 + parseInt(package_dimensions.weight_ounces);
// } else {
// 	weight += parseInt(package_dimensions.weight_ounces);
// }

// const parcel = new EasyPost.Parcel({
// 	length: package_dimensions.package_length,
// 	width: package_dimensions.package_width,
// 	height: package_dimensions.package_height,
// 	weight
// });

// const shipment = new EasyPost.Shipment({
// 	to_address: toAddress,
// 	from_address: fromAddress,
// 	parcel: parcel
// });
// const saved_shipment = await shipment.save();
// res.send({ shipment: saved_shipment, parcel: package_dimensions });
// 		} catch (err) {
// 			console.log(err);
// 			res.send({ shipment: {}, parcel: {}, error: err });
// 		}
// 	},
// 	create_return_label: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const order = req.body.order;

// const toAddress = new EasyPost.Address({
// 	street1: '404 Kenniston Dr',
// 	street2: 'Apt D',
// 	city: 'Austin',
// 	state: 'TX',
// 	zip: '78752',
// 	country: 'United States',
// 	company: 'Glow LEDs',
// 	phone: '906-284-2208',
// 	email: 'info.glowleds@gmail.com'
// });

// const fromAddress = new EasyPost.Address({
// 	name: order.shipping.first_name + ' ' + order.shipping.last_name,
// 	street1: order.shipping.address_1,
// 	street2: order.shipping.address_2,
// 	city: order.shipping.city,
// 	state: order.shipping.state,
// 	zip: order.shipping.postalCode,
// 	country: order.shipping.country
// });

// let weight = 0;
// order.orderItems.forEach((item: any, index: number) => {
// 	if (item.weight_pounds) {
// 		weight += item.weight_pounds * 16 + item.weight_ounces;
// 	} else {
// 		weight += item.weight_ounces;
// 	}
// });
// const parcels = await Parcel.find({ deleted: false });
// const parcel_size = determine_parcel(order.orderItems, parcels);
// const parcel = new EasyPost.Parcel({
// 	length: parcel_size.length,
// 	width: parcel_size.width,
// 	height: parcel_size.height,
// 	weight
// });
// let customsInfo = {};
// if (order.shipping.international) {
// 	const customs_items = order.orderItems.map((item: any) => {
// 		const customs_item = new EasyPost.CustomsItem({
// 			description: '3D Printed Accessories',
// 			quantity: item.qty,
// 			value: item.price,
// 			weight: item.weight,
// 			origin_country: 'US'
// 		});
// 		return customs_item;
// 	});

// 	customsInfo = new EasyPost.CustomsInfo({
// 		eel_pfc: 'NOEEI 30.37(a)',
// 		customs_certify: true,
// 		customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
// 		contents_type: 'merchandise',
// 		restriction_type: 'none',
// 		non_delivery_option: 'return',
// 		customs_items
// 	});
// }

// const shipment = new EasyPost.Shipment({
// 	to_address: toAddress,
// 	from_address: fromAddress,
// 	parcel: parcel,
// 	customsInfo: order.shipping.international ? customsInfo : {}
// });
// const saved_shipment = await shipment.save();
// const created_shipment = await EasyPost.Shipment.retrieve(saved_shipment.id);
// const label = await created_shipment.buy(created_shipment.lowestRate(), 0);
// 			res.send(label);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	},
// 	get_shipping_rates: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const order = req.body.order;

// const toAddress = new EasyPost.Address({
// 	name: order.shipping.first_name + ' ' + order.shipping.last_name,
// 	street1: order.shipping.address_1,
// 	street2: order.shipping.address_2,
// 	city: order.shipping.city,
// 	state: order.shipping.state,
// 	zip: order.shipping.postalCode,
// 	country: order.shipping.country
// });
// const fromAddress = new EasyPost.Address({
// 	street1: '404 Kenniston Dr',
// 	street2: 'Apt D',
// 	city: 'Austin',
// 	state: 'TX',
// 	zip: '78752',
// 	country: 'United States',
// 	company: 'Glow LEDs',
// 	phone: '906-284-2208',
// 	email: 'info.glowleds@gmail.com'
// });
// const package_length = order.orderItems.reduce(
// 	(a: any, c: { package_length: any }) => a + c.package_length,
// 	0
// );
// const package_width = order.orderItems.reduce(
// 	(a: any, c: { package_width: any }) => a + c.package_width,
// 	0
// );
// const package_height = order.orderItems.reduce(
// 	(a: any, c: { package_height: any }) => a + c.package_height,
// 	0
// );

// const cube_root_volume = Math.cbrt(package_length * package_width * package_height);
// const parcels = await Parcel.find({ deleted: false });
// // console.log({ parcels });

// let weight = 0;
// order.orderItems.forEach((item: any, index: number) => {
// 	if (item.weight_pounds) {
// 		weight += item.weight_pounds * 16 + item.weight_ounces;
// 	} else {
// 		weight += item.weight_ounces;
// 	}
// });
// console.log({ weight });
// // const parcel = new EasyPost.Parcel({
// // 	length: cube_root_volume,
// // 	width: cube_root_volume,
// // 	height: cube_root_volume,
// // 	weight
// // });
// const parcel_size = determine_parcel(order.orderItems, parcels);
// const parcel = new EasyPost.Parcel({
// 	length: parcel_size.length,
// 	width: parcel_size.width,
// 	height: parcel_size.height,
// 	weight
// });
// let customsInfo = {};
// if (order.shipping.international) {
// 	const customs_items = order.orderItems.map((item: any) => {
// 		const customs_item = new EasyPost.CustomsItem({
// 			description: '3D Printed Accessories',
// 			quantity: item.qty,
// 			value: item.price,
// 			weight: item.weight,
// 			origin_country: 'US'
// 		});
// 		return customs_item;
// 	});

// 	customsInfo = new EasyPost.CustomsInfo({
// 		eel_pfc: 'NOEEI 30.37(a)',
// 		customs_certify: true,
// 		customs_signer: order.shipping.first_name + ' ' + order.shipping.last_name,
// 		contents_type: 'merchandise',
// 		restriction_type: 'none',
// 		non_delivery_option: 'return',
// 		customs_items
// 	});
// }

// const shipment = new EasyPost.Shipment({
// 	to_address: toAddress,
// 	from_address: fromAddress,
// 	parcel: parcel,
// 	customsInfo: order.shipping.international ? customsInfo : {}
// });
// const saved_shipment = await shipment.save();
// if (saved_shipment.rates.length > 0) {
// 	res.send({ shipment: saved_shipment, parcel: parcel_size });
// } else {
// 	res.send({
// 		message: 'Shipping Failed',
// 		solution: 'Please double check your shipping address for incorrect formatting'
// 	});
// }
// 		} catch (err) {
// 			console.log(err);
// 			res.send({ shipment: {}, parcel: {}, error: err });
// 		}
// 	},
// 	// buy_label: async (req: any, res: any) => {
// 	// 	try {
// 	// 		const EasyPost = new easy_post_api(process.env.EASY_POST);
// 	// 		const order = req.body.order;
// 	// 		const created_shipment = await EasyPost.Shipment.retrieve(order.shipping.shipment_id);
// 	// 		const label = await created_shipment.buy(order.shipping.shipping_rate, 0);
// 	// 		res.send(label);
// 	// 	} catch (err) {
// 	// 		console.log(err);
// 	// 	}
// 	// },
// 	tracking_number: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const order = await Order.findById(req.body.order._id);
// if (order) {
// 	// console.log({ tracker: req.body.label.tracker.id });
// 	const tracker = await EasyPost.Tracker.retrieve(req.body.label.tracker.id);
// 	// const tracker = new EasyPost.Tracker.retrieve(req.body.label.tracker.id);
// 	console.log({ tracker });
// 	console.log({ tracker: tracker.tracking_details });

// 	// console.log({req.body})
// 	order.shipping.shipment_tracking = req.body.tracker;
// 	order.tracking_number = req.body.tracking_number;
// 	order.shipping.shipping_label = req.body.label;
// 	const updated = await Order.updateOne({ _id: req.body.order._id }, order);
// 	if (updated) {
// 		res.send(updated);
// 	} else {
// 		res.status(404).send({ message: 'Order not Updated.' });
// 	}
// }
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Refunding Order' });
// 		}
// 	},
// 	return_tracking_number: async (req: any, res: any) => {
// 		try {
// const EasyPost = new easy_post_api(process.env.EASY_POST);
// const order = await Order.findById(req.body.order._id);
// if (order) {
// 	const tracker = await EasyPost.Tracker.retrieve(req.body.label.tracker.id);
// 	// const tracker = new EasyPost.Tracker.retrieve(req.body.label.tracker.id);
// 	console.log({ tracker });
// 	console.log({ tracker: tracker.tracking_details });
// 	console.log({ body: req.body });

// 	console.log({ order });
// 	order.shipping.return_shipment_tracking = req.body.tracker;
// 	order.return_tracking_number = req.body.tracking_number;
// 	order.shipping.return_shipping_label = req.body.label;
// 	console.log({ order });
// 	const updated = await Order.updateOne({ _id: req.body.order._id }, order);

// 	if (updated) {
// 		res.send(updated);
// 	} else {
// 		res.status(404).send({ message: 'Order not Updated.' });
// 	}
// }
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Return Shipment' });
// 		}
// 	}
// };
