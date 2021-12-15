import { setting_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_settings_s: async (query: any) => {
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

			return await setting_db.findAll_settings_db(filter, sort);
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
