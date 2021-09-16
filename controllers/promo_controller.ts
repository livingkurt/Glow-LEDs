import { Promo } from '../models';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			const searchKeyword = req.query.searchKeyword
				? {
						facebook_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'admin only') {
				sortOrder = { admin_only: -1 };
			} else if (req.query.sortOrder === 'affiliate only') {
				sortOrder = { affiliate_only: -1 };
			} else if (req.query.sortOrder === 'active') {
				sortOrder = { active: -1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}

			const promos = await Promo.find({ deleted: false, ...category, ...searchKeyword }).sort(sortOrder);

			res.send(promos);
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promos' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const promo = await Promo.findOne({ _id: req.params.id }).populate('sponsor').populate('user');
			// console.log({ promo });
			// console.log(req.params.id);
			if (promo) {
				res.send(promo);
			} else {
				res.status(404).send({ message: 'Promo Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	find_by_code: async (req: any, res: any) => {
		try {
			const promo = await Promo.findOne({ promo_code: req.params.promo_code })
				.populate('sponsor')
				.populate('user');
			// console.log({ promo });
			// console.log({ promo });
			// console.log(req.params.promo_code);
			if (promo) {
				res.send(promo);
			} else {
				res.status(404).send({ message: 'Promo Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const newPromo = await Promo.create(req.body);
			if (newPromo) {
				return res.status(201).send({ message: 'New Promo Created', data: newPromo });
			} else {
				return res.status(500).send({ message: ' Error in Creating Promo.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Promo' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ promo_routes_put: req.body });
			const promo_id = req.params.id;
			const promo: any = await Promo.findById(promo_id);
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo_id }, req.body);
				if (updatedPromo) {
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Promo Deleted' };
			const deleted_promo = await Promo.updateOne({ _id: req.params.id }, { deleted: true });
			if (deleted_promo) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Deleting Promo' });
		}
	},
	update_discount: async (req: any, res: any) => {
		try {
			console.log({ percentage_off: req.body.percentage_off });
			console.log({ private_code_id: req.body.private_code_id });
			console.log('update_discount');
			const promo: any = await Promo.findOne({ _id: req.body.private_code_id });
			promo.percentage_off = req.body.percentage_off;
			// console.log({ promo });
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);

				if (updatedPromo) {
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	},
	mark_code_used: async (req: any, res: any) => {
		try {
			console.log({ used: req.params.promo_code });
			console.log('Promo_Routes');
			const promo: any = await Promo.findOne({ promo_code: req.params.promo_code.toLowerCase() });
			promo.used_once = true;
			console.log({ mark_code_used: promo });
			if (promo) {
				const updatedPromo = await Promo.updateOne({ _id: promo._id }, promo);
				console.log({ updatedPromo });
				if (updatedPromo) {
					return res.status(200).send({ message: 'Promo Updated', data: updatedPromo });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Promo.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Promo' });
		}
	}
};
