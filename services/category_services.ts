import { category_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_categorys_s: async (query: any) => {
		try {
			const filter = determine_filter(query, {});
			const sort = {};
			return await category_db.findAll_categorys_db(filter, sort);
		} catch (error) {
			console.log({ findAll_categorys_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_categorys_s: async (params: any) => {
		try {
			return await category_db.findById_categorys_db(params.id);
		} catch (error) {
			console.log({ findById_categorys_s_error: error });
			throw new Error(error.message);
		}
	},
	create_categorys_s: async (body: any) => {
		try {
			return await category_db.create_categorys_db(body);
		} catch (error) {
			console.log({ create_categorys_s_error: error });
			throw new Error(error.message);
		}
	},
	update_categorys_s: async (params: any, body: any) => {
		try {
			return await category_db.update_categorys_db(params.id, body);
		} catch (error) {
			console.log({ update_categorys_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_categorys_s: async (params: any) => {
		try {
			return await category_db.remove_categorys_db(params.id);
		} catch (error) {
			console.log({ remove_categorys_s_error: error });
			throw new Error(error.message);
		}
	}
};
