import { promo_db } from '../db';
import { determine_promoter_code_tier, determine_sponsor_code_tier, make_private_code } from '../util';

export default {
	findAll_promos_s: async (query: any) => {
		try {
			const category = query.category ? { category: query.category } : {};
			const search = query.search
				? {
						facebook_name: {
							$regex: query.search,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (query.sortOrder === 'admin only') {
				sortOrder = { admin_only: -1 };
			} else if (query.sortOrder === 'affiliate only') {
				sortOrder = { affiliate_only: -1 };
			} else if (query.sortOrder === 'active') {
				sortOrder = { active: -1 };
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}
			return await promo_db.findAll_promos_db(category, search, sortOrder);
		} catch (error) {
			console.log({ findAll_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_promos_s: async (params: any) => {
		try {
			return await promo_db.findById_promos_db(params.id);
		} catch (error) {
			console.log({ findById_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	findByCode_promos_s: async (params: any) => {
		try {
			return await promo_db.findByCode_promos_db(params.promo_code);
		} catch (error) {
			console.log({ findById_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	create_promos_s: async (body: any) => {
		try {
			return await promo_db.create_promos_db(body);
		} catch (error) {
			console.log({ create_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	create_one_time_use_code_promos_s: async (body: any) => {
		const private_code = {
			promo_code: make_private_code(6),
			admin_only: false,
			affiliate_only: false,
			single_use: true,
			used_once: false,
			excluded_categories: [],
			excluded_products: [],
			percentage_off: 10,
			free_shipping: false,
			time_limit: false,
			start_date: '2021-01-01',
			end_date: '2021-01-01',
			active: true
		};
		console.log({ private_code });
		try {
			return await promo_db.create_promos_db(private_code);
		} catch (error) {
			console.log({ create_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	update_promos_s: async (params: any, body: any) => {
		try {
			return await promo_db.update_promos_db(params.id, body);
		} catch (error) {
			console.log({ update_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	update_affiliate_codes_promos_s: async (params: any, body: any) => {
		const { affiliates, orders } = body;
		// console.log({ orders });
		try {
			affiliates
				.filter((affiliate: any) => affiliate.active)
				.filter((affiliate: any) => affiliate.private_code)
				.forEach(async (affiliate: any) => {
					const code_usage = orders.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code &&
							affiliate.public_code.promo_code.toLowerCase()
					).length;
					if (affiliate.promoter) {
						console.log({ promoter: code_usage });
						const updatedPromo = await promo_db.update_promos_db(affiliate.private_code._id, {
							...affiliate.private_code,
							percentage_off: determine_promoter_code_tier(code_usage)
						});
						return updatedPromo;
					} else if (affiliate.sponsor) {
						console.log({ sponsor: code_usage });
						const updatedPromo = await promo_db.update_promos_db(affiliate.private_code._id, {
							...affiliate.private_code,
							percentage_off: determine_sponsor_code_tier(code_usage)
						});
						return updatedPromo;
					}
				});
			return 'Success';
		} catch (error) {
			console.log({ update_code_used_promos_s_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	update_code_used_promos_s: async (params: any, body: any) => {
		try {
			const promo: any = await promo_db.findByCode_promos_db(params.promo_code.toLowerCase());
			promo.used_once = true;
			console.log({ promo });
			if (promo) {
				try {
					const updatedPromo = await promo_db.update_promos_db(promo._id, promo);
					if (updatedPromo) {
						return updatedPromo;
					}
				} catch (error) {
					throw new Error(error.message);
				}
			} else {
				throw new Error('No Promo Code Found');
			}
		} catch (error) {
			console.log({ update_code_used_promos_s_promos_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_promos_s: async (params: any) => {
		try {
			return await promo_db.remove_promos_db(params.id);
		} catch (error) {
			console.log({ remove_promos_s_error: error });
			throw new Error(error.message);
		}
	}
};

// import { Promo } from '../models';

// export default {
// 	findAll: async (req: any, res: any) => {
// 		try {
// const category = req.query.category ? { category: req.query.category } : {};
// const search = req.query.search
// 	? {
// 			facebook_name: {
// 				$regex: req.query.search,
// 				$options: 'i'
// 			}
// 		}
// 	: {};

// let sortOrder = {};
// if (req.query.sortOrder === 'admin only') {
// 	sortOrder = { admin_only: -1 };
// } else if (req.query.sortOrder === 'affiliate only') {
// 	sortOrder = { affiliate_only: -1 };
// } else if (req.query.sortOrder === 'active') {
// 	sortOrder = { active: -1 };
// } else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
// 	sortOrder = { _id: -1 };
// }

// 			const promos = await Promo.find({ deleted: false, ...category, ...search }).sort(sortOrder);

// 			res.send(promos);
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Promos' });
// 		}
// 	},
// 	findById: async (req: any, res: any) => {
// 		try {
// 			const promo = await Promo.findOne({ _id: req.params.id }).populate('sponsor').populate('user');
// 			// console.log({ promo });
// 			// console.log(req.params.id);
// 			if (promo) {
// 				res.send(promo);
// 			} else {
// 				res.status(404).send({ message: 'Promo Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Promo' });
// 		}
// 	},
// 	find_by_code: async (req: any, res: any) => {
// 		try {
// 			const promo = await Promo.findOne({ promo_code: req.params.promo_code })
// 				.populate('sponsor')
// 				.populate('user');
// 			// console.log({ promo });
// 			// console.log({ promo });
// 			// console.log(req.params.promo_code);
// 			if (promo) {
// 				res.send(promo);
// 			} else {
// 				res.status(404).send({ message: 'Promo Not Found.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Promo' });
// 		}
// 	},
// 	create: async (req: any, res: any) => {
// 		try {
// 			const newPromo = await Promo.create(req.body);
// 			if (newPromo) {
// 				return res.status(201).send({ message: 'New Promo Created', data: newPromo });
// 			} else {
// 				return res.status(500).send({ message: ' Error in Creating Promo.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Creating Promo' });
// 		}
// 	},
// 	update: async (req: any, res: any) => {
// 		try {
// 			console.log({ promo_routes_put: req.body });
// 			const promo_id = req.params.id;
// 			const promo: any = await Promo.findById(promo_id);
// 			if (promo) {
// 				const updatedPromo = await Promo.updateOne({ _id: promo_id }, req.body);
// 				if (updatedPromo) {
// 					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Promo.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Promo' });
// 		}
// 	},
// 	remove: async (req: any, res: any) => {
// 		try {
// 			const message: any = { message: 'Promo Deleted' };
// 			const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
// 			if (deleted_promo) {
// 				res.send(message);
// 			} else {
// 				res.send('Error in Deletion.');
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Deleting Promo' });
// 		}
// 	},
// 	update_discount: async (req: any, res: any) => {
// try {
// 	console.log({ percentage_off: req.body.percentage_off });
// 	console.log({ private_code_id: req.body.private_code_id });
// 	console.log('update_discount');
// 	const promo: any = await Promo.findOne({ _id: req.body.private_code_id });
// 	promo.percentage_off = req.body.percentage_off;
// 	// console.log({ promo });
// 	if (promo) {
// 		const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);

// 		if (updatedPromo) {
// 			return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
// 		}
// 	} else {
// 		return res.status(500).send({ message: ' Error in Updating Promo.' });
// 	}
// } catch (error) {
// 	console.log({ error });

// 	res.status(500).send({ error, message: 'Error Getting Promo' });
// }
// 	},
// 	mark_code_used: async (req: any, res: any) => {
// 		try {
// 			console.log({ used: req.params.promo_code });
// 			console.log('Promo_Routes');
// 			const promo: any = await Promo.findOne({ promo_code: req.params.promo_code.toLowerCase() });
// 			promo.used_once = true;
// 			console.log({ mark_code_used: promo });
// 			if (promo) {
// 				const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);
// 				console.log({ updatedPromo });
// 				if (updatedPromo) {
// 					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
// 				}
// 			} else {
// 				return res.status(500).send({ message: ' Error in Updating Promo.' });
// 			}
// 		} catch (error) {
// 			console.log({ error });

// 			res.status(500).send({ error, message: 'Error Getting Promo' });
// 		}
// 	}
// };
