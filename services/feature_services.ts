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

			let sortOrder = {};
			if (query.sortOrder === 'glover name') {
				sortOrder = { artist_name: 1 };
			} else if (query.sortOrder === 'facebook name') {
				sortOrder = { facebook_name: 1 };
			} else if (query.sortOrder === 'newest' || query.sortOrder === '') {
				sortOrder = { release_date: -1 };
			}

			return await feature_db.findAll_features_db(category, search, sortOrder);
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
		const sortOrder = { _id: -1 };
		try {
			return await feature_db.findAll_features_db(category, '', sortOrder);
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
