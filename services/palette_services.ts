import { palette_db } from '../db';

export default {
	findAll_palettes_s: async (query: any) => {
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

			let sortOrder = {};
			if (query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { name: 1 };
			}

			return await palette_db.findAll_palettes_db(category, search, sortOrder);
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
