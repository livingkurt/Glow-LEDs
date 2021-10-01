import Affiliate from '../models/affiliate';
import { Promo } from '../models';
import { make_private_code } from '../util';
import { affiliate_db } from '../db';

export default {
	findAll_affiliates_s: async (query: any) => {
		try {
			let sponsor = {};
			let promoter = {};
			if (query.category === 'sponsored_glovers') {
				sponsor = { sponsor: true };
			} else if (query.category === 'affiliated_glovers') {
				promoter = { promoter: true };
			}

			const searchKeyword = query.searchKeyword
				? {
						facebook_name: {
							$regex: query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			let sortOrder = {};
			if (query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (query.sortOrder === 'sponsor') {
				sortOrder = { sponsor: -1 };
			} else if (query.sortOrder === 'promoter') {
				sortOrder = { promoter: -1 };
			} else if (query.sortOrder === 'active') {
				sortOrder = { active: -1 };
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { _id: -1 };
			}
			return await affiliate_db.findAll_affiliates_db(searchKeyword, sponsor, promoter, sortOrder);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	findById: async (req: any, res: any) => {
		try {
			const affiliate = await Affiliate.findOne({ pathname: req.params.pathname })
				.populate('user')
				.populate('chips')
				.populate('products')
				.populate('public_code')
				.populate('private_code');
			if (affiliate) {
				res.send(affiliate);
			} else {
				res.status(404).send({ message: 'Affiliate Not Found' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Finding Affiliate' });
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
				if (private_code) {
					const newAffiliate: any = await Affiliate.create({
						...req.body,
						public_code: public_code._id,
						private_code: private_code._id
					});
					if (newAffiliate) {
						return res.status(201).send({ message: 'New Affiliate Created', data: newAffiliate });
					} else {
						return res.status(500).send({ message: 'Error Creating Affiliate' });
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
			const affiliate: any = await Affiliate.findOne({ pathname: req.params.pathname });
			if (affiliate) {
				const updatedAffiliate = await Affiliate.updateOne({ pathname: req.params.pathname }, req.body);
				if (updatedAffiliate) {
					return res.status(200).send({ message: 'Affiliate Updated', data: updatedAffiliate });
				}
			} else {
				return res.status(500).send({ message: 'Error Updating Affiliate' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Updating Affiliate' });
		}
	},
	remove: async (req: any, res: any) => {
		try {
			const deleted_affiliate = await Affiliate.updateOne({ pathname: req.params.pathname }, { deleted: true });
			if (deleted_affiliate) {
				return res.status(200).send({ message: 'Affiliate Deleted' });
			} else {
				res.send('Error Deletion');
				return res.status(500).send({ message: 'Error Deleting Affiliate' });
			}
		} catch (error) {
			console.log({ error });
			res.status(500).send({ error, message: 'Error Deleting Affiliate' });
		}
	}
};
