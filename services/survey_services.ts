import { survey_db } from '../db';

export default {
	findAll_surveys_s: async (query: any) => {
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
			const filter = { deleted: false, ...category, ...searchKeyword };
			return await survey_db.findAll_surveys_db(filter, sortOrder);
		} catch (error) {
			console.log({ findAll_surveys_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_surveys_s: async (params: any) => {
		try {
			return await survey_db.findById_surveys_db(params.id);
		} catch (error) {
			console.log({ findById_surveys_s_error: error });
			throw new Error(error.message);
		}
	},
	create_surveys_s: async (body: any) => {
		try {
			return await survey_db.create_surveys_db(body);
		} catch (error) {
			console.log({ create_surveys_s_error: error });
			throw new Error(error.message);
		}
	},
	update_surveys_s: async (params: any, body: any) => {
		try {
			return await survey_db.update_surveys_db(params.id, body);
		} catch (error) {
			console.log({ update_surveys_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_surveys_s: async (params: any) => {
		try {
			return await survey_db.remove_surveys_db(params.id);
		} catch (error) {
			console.log({ remove_surveys_s_error: error });
			throw new Error(error.message);
		}
	}
};
