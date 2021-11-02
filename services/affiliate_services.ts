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
			const search = query.search
				? {
						facebook_name: {
							$regex: query.search,
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
			const filter = { deleted: false, ...search, ...sponsor, ...promoter };
			return await affiliate_db.findAll_affiliates_db(filter, sortOrder);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	findById_affiliates_s: async (params: any) => {
		try {
			return await affiliate_db.findById_affiliates_db(params.pathname);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	create_affiliates_s: async (body: any) => {
		const public_code = {
			promo_code: body.artist_name.toLowerCase(),
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
		};
		const private_code = {
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
		};
		try {
			return await affiliate_db.create_affiliates_db(body, public_code, private_code);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	update_affiliates_s: async (params: any, body: any) => {
		try {
			return await affiliate_db.update_affiliates_db(params, body);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	},
	remove_affiliates_s: async (params: any) => {
		try {
			return await affiliate_db.remove_affiliates_db(params);
		} catch (error) {
			console.log({ error });
			throw new Error(error.message);
		}
	}
};
