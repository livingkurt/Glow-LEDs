import { survey_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_surveys_s: async (query: any) => {
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
