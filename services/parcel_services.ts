import { parcel_db } from '../db';
import { determine_filter } from '../util';

export default {
	findAll_parcels_s: async (query: any) => {
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
			return await parcel_db.findAll_parcels_db(filter, sort);
		} catch (error) {
			console.log({ findAll_parcels_s_error: error });
			throw new Error(error.message);
		}
	},
	findById_parcels_s: async (params: any) => {
		try {
			return await parcel_db.findById_parcels_db(params.id);
		} catch (error) {
			console.log({ findById_parcels_s_error: error });
			throw new Error(error.message);
		}
	},
	create_parcels_s: async (body: any) => {
		try {
			return await parcel_db.create_parcels_db(body);
		} catch (error) {
			console.log({ create_parcels_s_error: error });
			throw new Error(error.message);
		}
	},
	update_parcels_s: async (params: any, body: any) => {
		try {
			return await parcel_db.update_parcels_db(params.id, body);
		} catch (error) {
			console.log({ update_parcels_s_error: error });
			throw new Error(error.message);
		}
	},
	remove_parcels_s: async (params: any) => {
		try {
			return await parcel_db.remove_parcels_db(params.id);
		} catch (error) {
			console.log({ remove_parcels_s_error: error });
			throw new Error(error.message);
		}
	}
};
