import { chip_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_chips_s: async (query: any) => {
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
				sort = { name: 1 };
			}
			return await chip_db.findAll_chips_db(filter, sort);
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
	findByName_chips_s: async (params: any) => {
		try {
			return await chip_db.findByName_chips_db(params.name);
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
