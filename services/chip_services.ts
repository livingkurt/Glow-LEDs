import { chip_db } from '../db';

export default {
	findAll_chips_s: async (query: any) => {
		try {
			const category = query.category ? { category: query.category } : {};
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
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { name: 1 };
			}
			return await chip_db.findAll_chips_db(searchKeyword, sortOrder);
		} catch (error) {
			console.log({ findAll_chips_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_chips_s: async (params: any) => {
		try {
			return await chip_db.findById_chips_db(params.id);
		} catch (error) {
			console.log({ findById_chips_s_error: error });
			throw new Error(error.message);
		}
	},
	create_chips_s: async (body: any) => {
		try {
			return await chip_db.create_chips_db(body);
		} catch (error) {
			console.log({ create_chips_s_error: error });
			throw new Error(error.message);
		}
	},
	update_chips_s: async (params: any, body: any) => {
		try {
			return await chip_db.update_chips_db(params.id, body);
		} catch (error) {
			console.log({ update_chips_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_chips_s: async (params: any) => {
		try {
			return await chip_db.remove_chips_db(params.id);
		} catch (error) {
			console.log({ remove_chips_s_error: error });
			throw new Error(error.message);
		}
	}
};
