import { promo_db } from '../db';
import {
	determine_filter,
	determine_promoter_code_tier,
	determine_sponsor_code_tier,
	make_private_code
} from '../util';

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
			const filter = determine_filter(query, search);
			const sort_query = query.sort && query.sort.toLowerCase();
			let sort = {};
			if (sort_query === 'admin only') {
				sort = { admin_only: -1 };
			} else if (sort_query === 'affiliate only') {
				sort = { affiliate_only: -1 };
			} else if (sort_query === 'active') {
				sort = { active: -1 };
			} else if (sort_query === 'newest' || sort_query === '') {
				sort = { _id: -1 };
			}
			return await promo_db.findAll_promos_db(filter, sort);
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
