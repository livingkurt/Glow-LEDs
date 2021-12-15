import Feature from '../models/feature';

export default {
	findAll_features_db: async (filter: any, sort: any) => {
		try {
			return await Feature.find(filter).sort(sort).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findAll_features_db_error: error });
			throw new Error(error.message);
		}
	},
	findByPathname_features_db: async (pathname: string) => {
		try {
			return await Feature.findOne({ pathname: pathname }).populate('user').populate('affiliate');
		} catch (error) {
			console.log({ findById_features_db_error: error });
			throw new Error(error.message);
		}
	},
	create_features_db: async (body: any) => {
		try {
			return await Feature.create(body);
		} catch (error) {
			console.log({ create_features_db_error: error });
			throw new Error(error.message);
		}
	},
	update_features_db: async (id: string, body: any) => {
		try {
			const feature: any = await Feature.findOne({ _id: id });
			if (feature) {
				return await Feature.updateOne({ _id: id }, body);
			}
		} catch (error) {
			console.log({ update_features_db_error: error });
			throw new Error(error.message);
		}
	},
	remove_features_db: async (id: string) => {
		try {
			const feature: any = await Feature.findOne({ _id: id });
			if (feature) {
				return await Feature.updateOne({ _id: id }, { deleted: true });
			}
		} catch (error) {
			console.log({ remove_features_db_error: error });
			throw new Error(error.message);
		}
	}
};
