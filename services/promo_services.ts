import { affiliate_db, order_db, promo_db } from '../db';
import {
	determine_filter,
	determine_promoter_code_tier,
	determine_sponsor_code_tier,
	make_private_code,
	month_dates
} from '../util';

export default {
	findAll_promos_s: async (query: any) => {
		try {
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
			console.log({ sort_query });
			let sort: any = { _id: -1 };
			if (sort_query === 'admin only') {
				sort = { admin_only: -1 };
			} else if (sort_query === 'affiliate only') {
				sort = { affiliate_only: -1 };
			} else if (sort_query === 'active') {
				sort = { active: -1 };
			} else if (sort_query === 'newest') {
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
	update_affiliate_codes_promos_s: async (params: any, query: any) => {
		try {
			let o_filter = {};
			if (params.month && params.month.length > 0) {
				console.log('Month True');
				const start_date = month_dates(params.month, params.year).start_date;
				const end_date = month_dates(params.month, params.year).end_date;
				o_filter = {
					deleted: false,
					isPaid: true,
					createdAt: {
						$gte: new Date(start_date),
						$lte: new Date(end_date)
					}
				};
			} else if (params.year && params.year.length > 0) {
				console.log('Year True');
				const start_date = params.year + '-01-01';
				const end_date = params.year + '-12-31';
				o_filter = {
					deleted: false,
					isPaid: true,
					createdAt: {
						$gte: new Date(start_date),
						$lte: new Date(end_date)
					}
				};
			} else {
				console.log('No True');
				o_filter = { deleted: false, isPaid: true };
			}
			let a_filter: any = { deleted: false, active: true };
			if (query.position === 'promoter') {
				a_filter = { deleted: false, active: true, promoter: true };
			} else if (query.position === 'sponsor') {
				a_filter = { deleted: false, active: true, sponsor: true };
			}
			console.log({ o_filter, a_filter });

			const limit = 0;
			const page = 1;
			const orders = await order_db.findAll_orders_db(o_filter, {}, limit, page);
			const affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {});
			affiliates
				.filter((affiliate: any) => affiliate.active)
				.filter((affiliate: any) => affiliate.private_code)
				.filter((affiliate: any) => !affiliate)
				.filter((affiliate: any) => !affiliate.rave_mob)
				.forEach(async (affiliate: any) => {
					const code_usage = orders.filter(
						(order: any) =>
							order.promo_code &&
							order.promo_code.toLowerCase() === affiliate.public_code.promo_code &&
							affiliate.public_code.promo_code.toLowerCase()
					).length;
					const percentage_off =
						!affiliate.team && affiliate.promoter
							? determine_promoter_code_tier(code_usage)
							: determine_sponsor_code_tier(code_usage);
					const promo = await promo_db.findById_promos_db(affiliate.private_code._id);
					promo.percentage_off = percentage_off;
					await promo.save();
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
			if (promo.single_use) {
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
			}
			return promo;
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
