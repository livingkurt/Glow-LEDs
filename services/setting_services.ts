import { setting_db } from '../db';

export default {
	findAll_settings_s: async (query: any) => {
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

			let sort = {};
			if (query.sort === 'glover name') {
				sort = { artist_name: 1 };
			} else if (query.sort === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (query.sort === 'newest' || query.sort === '') {
				sort = { name: 1 };
			}

			return await setting_db.findAll_settings_db(category, search, sort);
		} catch (error) {
			console.log({ findAll_settings_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_settings_s: async (params: any) => {
		try {
			return await setting_db.findById_settings_db(params.id);
		} catch (error) {
			console.log({ findById_settings_s_error: error });
			throw new Error(error.message);
		}
	},
	create_settings_s: async (body: any) => {
		try {
			return await setting_db.create_settings_db(body);
		} catch (error) {
			console.log({ create_settings_s_error: error });
			throw new Error(error.message);
		}
	},
	update_settings_s: async (params: any, body: any) => {
		try {
			return await setting_db.update_settings_db(params.id, body);
		} catch (error) {
			console.log({ update_settings_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_settings_s: async (params: any) => {
		try {
			return await setting_db.remove_settings_db(params.id);
		} catch (error) {
			console.log({ remove_surveys_s_error: error });
			throw new Error(error.message);
		}
	}
};
