import Affiliate from '../models/affiliate';
import { Promo } from '../models';
import { make_private_code } from '../util';

export default {
	findAll: async (req: any, res: any) => {
		try {
			const category = req.query.category ? { category: req.query.category } : {};
			let sponsor = {};
			let promoter = {};
			// console.log(category);
			if (req.query.category === 'sponsored_glovers') {
				sponsor = { sponsor: true };
			} else if (req.query.category === 'affiliated_glovers') {
				promoter = { promoter: true };
			}
			// console.log(sponsor, promoter);
			const searchKeyword = req.query.searchKeyword
				? {
						facebook_name: {
							$regex: req.query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (req.query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (req.query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (req.query.sortOrder === 'sponsor') {
				sortOrder = { sponsor: -1 };
			} else if (req.query.sortOrder === 'promoter') {
				sortOrder = { promoter: -1 };
			} else if (req.query.sortOrder === 'active') {
				sortOrder = { active: -1 };
			} else if (req.query.sortOrder === 'newest' || req.query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}

			const affiliates = await Affiliate.find({
				deleted: false,
				// ...category,
				...searchKeyword,
				// sponsor: true
				// promoter: true
				...sponsor,
				...promoter
			})
				.sort(sortOrder)
				.populate('user')
				.populate('products')
				.populate('public_code')
				.populate('private_code')
				.populate('chips');

			res.send(affiliates);
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Getting Affiliates' });
		}
	},
	findById: async (req: any, res: any) => {
		try {
			console.log({ pathname: req.params.pathname });
			console.log('hello');
			const affiliate = await Affiliate.findOne({ pathname: req.params.pathname })
				.populate('user')
				.populate('chips')
				.populate('products')
				.populate('public_code')
				.populate('private_code');
			console.log({ affiliate });
			console.log(req.params.pathname);
			if (affiliate) {
				res.send(affiliate);
			} else {
				res.status(404).send({ message: 'Affiliate Not Found.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Affiliate' });
		}
	},
	create: async (req: any, res: any) => {
		try {
			const public_code = await Promo.create({
				promo_code: req.body.artist_name.toLowerCase(),
				admin_only: false,
				affiliate_only: false,
				single_use: false,
				used_once: false,
				excluded_categories: [],
				excluded_products: [],
				percentage_off: 10,
				free_shipping: false,
				time_limit: false,
				start_date: '2021-01-01',
				end_date: '2021-01-01',
				active: true
			});
			console.log({ public_code });
			if (public_code) {
				const private_code = await Promo.create({
					promo_code: make_private_code(6),
					admin_only: false,
					affiliate_only: true,
					single_use: false,
					used_once: false,
					excluded_categories: [],
					excluded_products: [],
					percentage_off: 20,
					free_shipping: false,
					time_limit: false,
					start_date: '2021-01-01',
					end_date: '2021-01-01',
					active: true
				});
				console.log({ private_code });
				if (private_code) {
					const newAffiliate: any = await Affiliate.create({
						...req.body,
						public_code: public_code._id,
						private_code: private_code._id
					});
					console.log({ newAffiliate });
					if (newAffiliate) {
						return res.status(201).send({ message: 'New Affiliate Created', data: newAffiliate });
					} else {
						return res.status(500).send({ message: ' Error in Creating Affiliate.' });
					}
				}
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Creating Affiliate' });
		}
	},
	update: async (req: any, res: any) => {
		try {
			console.log({ affiliate_routes_put: req.body });
			const pathname = req.params.pathname;
			const affiliate: any = await Affiliate.findOne({ pathname: pathname });
			if (affiliate) {
				const updatedAffiliate = await Affiliate.updateOne({ pathname: pathname }, req.body);
				if (updatedAffiliate) {
					return res.status(200).send({ message: 'Affiliate Updated', data: updatedAffiliate });
				}
			} else {
				return res.status(500).send({ message: ' Error in Updating Affiliate.' });
			}
		} catch (error) {
			console.log({ error });

			res.status(500).send({ error, message: 'Error Getting Affiliate' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const message: any = { message: 'Affiliate Deleted' };
			const deleted_affiliate = await Affiliate.updateOne({ pathname: req.params.pathname }, { deleted: true });
			if (deleted_affiliate) {
				res.send(message);
			} else {
				res.send('Error in Deletion.');
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Deleting Affiliate' });
		}
	}
};
