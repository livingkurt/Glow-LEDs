import { paycheck_db } from '../db';

export default {
	findAll_paychecks_s: async (query: any) => {
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

			const sort_query = query.sort && query.sort.toLowerCase();
			let sort = {};
			if (sort_query === 'glover name') {
				sort = { artist_name: 1 };
			} else if (sort_query === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (sort_query === 'newest' || sort_query === '') {
				sort = { _id: -1 };
			}
			const filter = { deleted: false, ...category, ...search };
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
