import { affiliate_db, order_db, paycheck_db, team_db } from '../db';
import { determine_filter, month_dates } from '../util';

export default {
	findAll_paychecks_s: async (query: any) => {
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
			let sort: any = { _id: -1 };
			if (sort_query === 'glover name') {
				sort = { artist_name: 1 };
			} else if (sort_query === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (sort_query === 'newest') {
				sort = { _id: -1 };
			}
			return await paycheck_db.findAll_paychecks_db(filter, sort);
		} catch (error) {
			console.log({ findAll_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_paychecks_s: async (params: any) => {
		try {
			return await paycheck_db.findById_paychecks_db(params.id);
		} catch (error) {
			console.log({ findById_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	findMy_paychecks_s: async (params: any) => {
		try {
			return await paycheck_db.findMy_paychecks_db(params.id);
		} catch (error) {
			console.log({ findById_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	create_paychecks_s: async (body: any) => {
		try {
			return await paycheck_db.create_paychecks_db(body);
		} catch (error) {
			console.log({ create_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	create_affiliate_paychecks_s: async (params: any) => {
		try {
			let a_filter = {};
			let o_filter = {};
			let t_filter = {};
			let discount = 0.1;
			console.log({ params });
			if (params.position === 'promoter') {
				a_filter = { deleted: false, active: true, promoter: true };
				discount = 0.1;
			} else if (params.position === 'sponsor') {
				a_filter = { deleted: false, active: true, sponsor: true };
				discount = 0.15;
			}
			if (params.position === 'team') {
				t_filter = { deleted: false, active: true, rave_mob: false };
				discount = 0.15;
			}
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
			let affiliates = [];
			let teams = [];
			if (params.position !== 'team') {
				affiliates = await affiliate_db.findAll_affiliates_db(a_filter, {});
			} else {
				teams = await team_db.findAll_teams_db(t_filter, {});
			}
			const orders = await order_db.findAll_orders_db(o_filter, {}, 0, 1);
			let paychecks = [];
			if (params.position !== 'team') {
				paychecks = await Promise.all(
					affiliates.map(async (affiliate: any) => {
						return await paycheck_db.create_paychecks_db({
							affiliate: affiliate._id,
							amount: orders
								.filter(
									(order: any) =>
										order.promo_code &&
										order.promo_code.toLowerCase() ===
											affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce(
									(a: any, order: any) =>
										a +
										(order.totalPrice -
											order.taxPrice -
											(order.payment.refund
												? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100
												: 0)) *
											discount,
									0
								)
								.toFixed(2),
							venmo: affiliate.venmo,
							promo_code: affiliate.public_code.promo_code.toLowerCase(),
							revenue: orders
								.filter(
									(order: any) =>
										order.promo_code &&
										order.promo_code.toLowerCase() ===
											affiliate.public_code.promo_code.toLowerCase()
								)
								.reduce(
									(a: any, order: any) =>
										a +
										(order.totalPrice -
											order.taxPrice -
											(order.payment.refund
												? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100
												: 0)),
									0
								)
								.toFixed(2),
							uses: orders.filter(
								(order: any) =>
									order.promo_code &&
									order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
							).length
						});
					})
				);
			} else {
				paychecks = await Promise.all(
					teams.map(async (team: any) => {
						return await paycheck_db.create_paychecks_db({
							team: team._id,
							amount: orders
								.filter(
									(order: any) =>
										order.promo_code && order.promo_code.toLowerCase() === team.promo_code
								)
								.reduce(
									(a: any, order: any) =>
										a +
										(order.totalPrice -
											order.taxPrice -
											(order.payment.refund
												? order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100
												: 0)) *
											discount,
									0
								)
								.toFixed(2),
							venmo: team.venmo,
							promo_code: team.promo_code,
							revenue: orders
								.filter(
									(order: any) =>
										order.promo_code && order.promo_code.toLowerCase() === team.promo_code
								)
								.reduce(
									(a: any, order: any) =>
										a +
										(order.totalPrice -
											order.taxPrice -
											(order.refundAmmount
												? order.refundAmmount.reduce((a: any, c: any) => a + c, 0) / 100
												: 0)),
									0
								)
								.toFixed(2),
							uses: orders.filter(
								(order: any) => order.promo_code && order.promo_code.toLowerCase() === team.promo_code
							).length
						});
					})
				);
			}

			console.log({ paychecks });
			return paychecks;
		} catch (error) {
			console.log({ create_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	update_paychecks_s: async (params: any, body: any) => {
		try {
			return await paycheck_db.update_paychecks_db(params.id, body);
		} catch (error) {
			console.log({ update_paychecks_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_paychecks_s: async (params: any) => {
		try {
			return await paycheck_db.remove_paychecks_db(params.id);
		} catch (error) {
			console.log({ remove_paychecks_s_error: error });
			throw new Error(error.message);
		}
	}
};
