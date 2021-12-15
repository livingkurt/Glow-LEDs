import { palette_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_palettes_s: async (query: any) => {
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

			return await palette_db.findAll_palettes_db(filter, sort);
		} catch (error) {
			console.log({ findAll_palettes_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_palettes_s: async (params: any) => {
		try {
			return await palette_db.findById_palettes_db(params.id);
		} catch (error) {
			console.log({ findById_palettes_s_error: error });
			throw new Error(error.message);
		}
	},
	findMy_palettes_s: async (params: any) => {
		try {
			return await palette_db.findMy_palettes_db(params.id);
		} catch (error) {
			console.log({ findById_palettes_s_error: error });
			throw new Error(error.message);
		}
	},
	create_palettes_s: async (body: any) => {
		try {
			return await palette_db.create_palettes_db(body);
		} catch (error) {
			console.log({ create_palettes_s_error: error });
			throw new Error(error.message);
		}
	},
	update_palettes_s: async (params: any, body: any) => {
		try {
			return await palette_db.update_palettes_db(params.id, body);
		} catch (error) {
			console.log({ update_palettes_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_palettes_s: async (params: any) => {
		try {
			return await palette_db.remove_palettes_db(params.id);
		} catch (error) {
			console.log({ remove_palettes_s_error: error });
			throw new Error(error.message);
		}
	}
};
