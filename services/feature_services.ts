import { feature_db } from '../db';

export default {
	findAll_features_s: async (query: any) => {
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

			const sort_query = query.sort.toLowerCase();
			let sort = {};
			if (sort_query === 'glover name') {
				sort = { artist_name: 1 };
			} else if (sort_query === 'facebook name') {
				sort = { facebook_name: 1 };
			} else if (sort_query === 'newest' || sort_query === '') {
				sort = { release_date: -1 };
			}

			return await feature_db.findAll_features_db(category, search, sort);
		} catch (error) {
			console.log({ findAll_features_s_error: error });
			throw new Error(error.message);
		}
	},
	findByPathname_features_s: async (params: any) => {
		try {
			return await feature_db.findByPathname_features_db(params.id);
		} catch (error) {
			console.log({ findById_features_s_error: error });
			throw new Error(error.message);
		}
	},
	findByCategory_features_s: async (query: any) => {
		const category = query.category ? { category: query.category } : {};
		const sort = { _id: -1 };
		try {
			return await feature_db.findAll_features_db(category, '', sort);
		} catch (error) {
			console.log({ findById_features_s_error: error });
			throw new Error(error.message);
		}
	},
	create_features_s: async (body: any) => {
		try {
			return await feature_db.create_features_db(body);
		} catch (error) {
			console.log({ create_features_s_error: error });
			throw new Error(error.message);
		}
	},
	update_features_s: async (params: any, body: any) => {
		try {
			return await feature_db.update_features_db(params.id, body);
		} catch (error) {
			console.log({ update_features_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_features_s: async (params: any) => {
		try {
			return await feature_db.remove_features_db(params.id);
		} catch (error) {
			console.log({ remove_features_s_error: error });
			throw new Error(error.message);
		}
	}
};
