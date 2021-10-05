import { content_db } from '../db';

export default {
	findAll_contents_s: async (query: any) => {
		try {
			const category = query.category ? { category: query.category } : {};
			const searchKeyword = query.searchKeyword
				? {
						p: {
							$regex: query.searchKeyword,
							$options: 'i'
						}
					}
				: {};

			const sortOrder = { _id: -1 };
			const filter = { deleted: false, ...category, ...searchKeyword };
			return await content_db.findAll_contents_db(filter, sortOrder);
		} catch (error) {
			console.log({ findAll_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_contents_s: async (params: any) => {
		try {
			return await content_db.findById_contents_db(params.id);
		} catch (error) {
			console.log({ findById_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	create_contents_s: async (body: any) => {
		try {
			return await content_db.create_contents_db(body);
		} catch (error) {
			console.log({ create_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	update_contents_s: async (params: any, body: any) => {
		try {
			return await content_db.update_contents_db(params.id, body);
		} catch (error) {
			console.log({ update_contents_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_contents_s: async (params: any) => {
		try {
			return await content_db.remove_contents_db(params.id);
		} catch (error) {
			console.log({ remove_contents_s_error: error });
			throw new Error(error.message);
		}
	}
};
