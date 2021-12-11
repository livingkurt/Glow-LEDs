import { survey_db } from '../db';

export default {
	findAll_surveys_s: async (query: any) => {
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
			const filter = { deleted: false, ...category, ...search };
			return await survey_db.findAll_surveys_db(filter, sort);
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
